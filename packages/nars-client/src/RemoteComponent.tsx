import * as React from "react";
import Animated from "react-native-reanimated";
import { SocketLike } from "./SocketLike";
import { RpcInterface, useRpcInterface } from "./RpcInterface";
import { RetainedInstances, updateAnimatedValue } from "./AnimatedCoders";
import { ServerToClient, ClientToServer, Unmount, Render } from "./schema_pb";
import { toStruct, ofStruct } from "./StructCoders";
import { ofEncodedReactElement } from "./DecodeElement";

class InstanceCounter {
  private freed: Array<number> = [];
  private current: number = 1;
  next(): number {
    const value = this.freed.pop();
    if (value) {
      return value;
    } else {
      const id = this.current;
      this.current += 1;
      return id;
    }
  }
  free(id: number) {
    this.freed.push(id);
  }
}

const instanceCounter = new InstanceCounter();

const createRetainedInstanceContainer = (): RetainedInstances => {
  const clocks = new Map<number, Animated.Clock>();
  const values = new Map<number, Animated.Value<any>>();
  const nodes = new Map<number, Animated.Node<any>>();

  return {
    getClock: n => {
      return clocks.get(n.getNodeid());
    },
    setClock: (n, clock: Animated.Clock) => {
      return clocks.set(n.getNodeid(), clock);
    },
    getValue: n => {
      return values.get(n.getNodeid());
    },
    setValue: (node, value: Animated.Value<any>) => {
      return values.set(node.getNodeid(), value);
    },
    getNode: n => {
      return nodes.get(n.getNodeid());
    },
    setNode: (n, value: Animated.Node<any>) => {
      nodes.set(n.getNodeid(), value);
    },
    clear: () => {
      nodes.clear();
      values.clear();
      clocks.clear();
    },
  };
};

const reactElementFromMessage = (
  message: ServerToClient,
  localProps: PropsObject,
  rpc: RpcInterface,
  retainedInstances: RetainedInstances
) => {
  return message
    .getUpdate()!
    .getElementList()
    .map(elem =>
      ofEncodedReactElement(
        (messageId, args) => {
          rpc.rpcCall(messageId, args ? args : {});
        },
        key => {
          return localProps[key];
        },
        elem,
        retainedInstances
      )
    );
};

type UpdateKind =
  | { type: "RemoteRender" }
  | { type: "LocalReRender" }
  | { type: "Reconnect"; oldWs: SocketLike | undefined }
  | undefined;

type ComputedProps = {
  localPropsRef: { current: PropsObject };
  inputProps: PropsObject;
  ws: SocketLike;
};

const useRemoteUpdateState = (
  webSocket: Lazy<SocketLike>,
  name: string,
  inputProps: PropEncoder,
  localProps: PropsObject,
  rpcInterface: RpcInterface
) => {
  let updateKind: UpdateKind = undefined;
  const localPropsRef = React.useRef<{ [k: string]: unknown }>({});
  const memoizedWebSocket = React.useRef<SocketLike | undefined>(undefined);
  const memoizedProps = React.useRef<PropsObject>({});
  React.useEffect(() => {
    updateKind = { type: "RemoteRender" };
  }, [name]);
  React.useEffect(() => {
    const nextProps = inputProps(rpcInterface);
    let changed = false;
    // Poor man's shallow compare
    const keys = [
      ...Object.keys(memoizedProps.current),
      ...Object.keys(nextProps),
    ];
    keys.forEach(key => {
      if (memoizedProps.current[key] !== nextProps[key]) {
        changed = true;
      }
    });
    if (changed) {
      updateKind = { type: "RemoteRender" };
    }
    memoizedProps.current = nextProps;
  }, [inputProps]);
  React.useEffect(() => {
    localPropsRef.current = localProps;
    if (!updateKind) {
      updateKind = { type: "LocalReRender" };
    }
  }, [localProps]);
  React.useEffect(() => {
    const ws = webSocket();
    if (memoizedWebSocket.current !== ws) {
      updateKind = {
        type: "Reconnect",
        oldWs: memoizedWebSocket.current,
      };
      memoizedWebSocket.current = ws;
    }
  });
  return {
    updateKind: () => updateKind,
    computedProps: (): ComputedProps => ({
      ws: memoizedWebSocket.current!,
      localPropsRef: localPropsRef,
      inputProps: memoizedProps.current,
    }),
  };
};

const connect = (
  ws: SocketLike,
  instanceId: number,
  onMessage: (message: ServerToClient) => void
) => {
  const eventListener = (event: { data: ArrayBuffer }) => {
    const message = ServerToClient.deserializeBinary(
      new Uint8Array(event.data)
    );
    if (message.getRootid() === instanceId) {
      onMessage(message);
    }
  };
  ws.addEventListener("message", eventListener);
  return () => {
    if (ws.readyState === WebSocket.OPEN) {
      const msg = new ClientToServer();
      msg.setUnmount(new Unmount());
      msg.setRootid(instanceId);
      ws.send(msg.serializeBinary());
    }
    ws.removeEventListener("message", eventListener);
  };
};

const useInstanceId = () => {
  const instanceId = React.useRef(0);
  React.useEffect(() => {
    instanceId.current = instanceCounter.next();
    return () => {
      instanceCounter.free(instanceId.current);
    };
  }, []);
  return () => instanceId.current;
};

const sendRender = (
  ws: SocketLike,
  name: string,
  props: object,
  localProps: PropsObject,
  instanceId: number
) => {
  const msg = new ClientToServer();
  const payload = new Render();
  payload.setName(name);
  payload.setProps(toStruct(props));
  payload.setLocalpropsList(Object.keys(localProps));
  msg.setRootid(instanceId);
  msg.setRender(payload);
  const renderMessage = msg.serializeBinary();
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(renderMessage);
  } else {
    const handler = () => {
      ws.send(renderMessage);
      ws.removeEventListener("open", handler);
    };
    ws.addEventListener("open", handler);
  }
};

export type PropsObject = { [k: string]: unknown };

export type PropEncoder = (rpcInterface: RpcInterface) => PropsObject;

export type State =
  | "Loading"
  | "Error"
  | { type: "Rendered"; element: (React.ReactChild | null)[] };

export interface Lazy<T> {
  (): T;
}

export const useNars = (
  webSocket: Lazy<SocketLike>,
  name: string,
  inputProps: PropEncoder,
  localProps: PropsObject
): State => {
  const instanceId = useInstanceId();
  const [renderedElement, updateRenderedElement] = React.useState<State>(
    "Loading"
  );
  const rpcInterface = useRpcInterface(instanceId, webSocket);
  const [retainedInstances] = React.useState(() =>
    createRetainedInstanceContainer()
  );
  const disconnect = React.useRef<(() => void) | undefined>(undefined);

  // It internally stores the latest reference to webSocket
  // So that we can determine if the webSocket we're using
  // has changed.
  const remoteUpdateState = useRemoteUpdateState(
    webSocket,
    name,
    inputProps,
    localProps,
    rpcInterface
  );
  // A ref is used so that the asynchrnous callbacks from the server
  // use the latest localProps (it happens when the state updates on
  // the server but there were no state transitions on the client.
  const lastRenderMessage = React.useRef<ServerToClient | undefined>(undefined);
  React.useEffect(() => {
    const update = remoteUpdateState.updateKind();
    if (update) {
      const props = remoteUpdateState.computedProps();
      switch (update.type) {
        case "RemoteRender":
          sendRender(
            props.ws,
            name,
            props.inputProps,
            props.localPropsRef.current,
            instanceId()
          );
          break;
        case "Reconnect":
          if (disconnect.current) {
            disconnect.current();
            retainedInstances.clear();
          }
          disconnect.current = connect(
            props.ws,
            instanceId(),
            message => {
              if (message.hasError()) {
                updateRenderedElement(currentValue => {
                  if (currentValue === "Loading") {
                    return "Error";
                  } else {
                    return currentValue;
                  }
                });
              } else if (message.hasUpdate()) {
                updateRenderedElement({
                  type: "Rendered",
                  element: reactElementFromMessage(
                    message,
                    props.localPropsRef.current,
                    rpcInterface,
                    retainedInstances
                  ),
                });
                lastRenderMessage.current = message;
              } else if (message.hasAnimatedvalueupdate()) {
                const update = message.getAnimatedvalueupdate()!;
                const value = update.getValue();
                const toValue = update.getTovalue();
                updateAnimatedValue(value, toValue, retainedInstances);
              } else if (message.hasCall()) {
                const call = message.getCall()!;
                const messageId = call.getMessageid();
                const args = call.getArgs();
                rpcInterface.executeRpcCall(messageId, ofStruct(args));
              }
            }
          );
          sendRender(
            props.ws,
            name,
            props.inputProps,
            props.localPropsRef.current,
            instanceId()
          );
          break;
        case "LocalReRender":
          if (lastRenderMessage.current) {
            updateRenderedElement({
              type: "Rendered",
              element: reactElementFromMessage(
                lastRenderMessage.current,
                props.localPropsRef.current,
                rpcInterface,
                retainedInstances
              ),
            });
          }
          break;
      }
    }
  });
  React.useEffect(() => {
    // Disconnect on unmount
    return () => {
      if (disconnect.current) {
        disconnect.current();
      }
    };
  }, []);
  return renderedElement;
};

type Props = {
  webSocket: SocketLike | Lazy<SocketLike>;
  name: string;
  inputProps: PropEncoder;
  localProps: PropsObject;
  renderError?: () => React.ReactElement<any>;
  renderLoading?: () => React.ReactElement<any>;
};

export const RemoteComponent = (props: Props) => {
  const ws = props.webSocket;
  const renderedElement: State = useNars(
    typeof ws === "function" ? ws : () => ws,
    props.name,
    props.inputProps,
    props.localProps
  );
  if (renderedElement === "Error" && props.renderError) {
    return props.renderError();
  } else if (
    typeof renderedElement === "object" &&
    renderedElement.type === "Rendered"
  ) {
    return React.createElement(React.Fragment, {}, ...renderedElement.element);
  } else if (props.renderLoading) {
    return props.renderLoading();
  }
  return null;
};

export const useWebSocket = (
  url: string,
  shouldReconnect?: boolean
): Lazy<WebSocket> => {
  const [ref, setRef_] = React.useState<
    React.MutableRefObject<WebSocket | null>
  >({ current: null });
  const setRef: typeof setRef_ = x => {
    setRef_(x);
  };
  const removeErrorListenerRef = React.useRef<(() => void) | undefined>();
  return () => {
    if (ref.current) {
      return ref.current;
    } else {
      const ws = new WebSocket(url);
      if (shouldReconnect) {
        const handler = () => {
          setTimeout(function() {
            setRef(x => (x.current === ws ? { current: null } : x));
          }, 200);
        };
        ws.addEventListener("close", handler);
        removeErrorListenerRef.current = () => {
          ws.removeEventListener("close", handler);
        };
      } else if (removeErrorListenerRef.current) {
        removeErrorListenerRef.current();
      }
      ref.current = ws;
      return ws;
    }
  };
};
