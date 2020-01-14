import * as React from "react";
import { toStruct } from "./StructCoders";
import { ofEncodedReactElement } from "./DecodeElement";
import Animated from "react-native-reanimated";
import { RetainedInstances, updateAnimatedValue } from "./AnimatedCoders";
import {
  ServerToClient,
  ClientToServer,
  Call,
  Unmount,
  Render,
} from "./schema_pb";

export type State =
  | "Loading"
  | "Error"
  | { type: "Rendered"; element: (React.ReactChild | null)[] };

export interface SocketLike {
  binaryType: "arraybuffer" | "blob";
  readyState: number;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: SocketLike, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: SocketLike, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
}

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
  localProps: LocalProps,
  instanceId: number,
  ws: SocketLike,
  retainedInstances: RetainedInstances
) => {
  return message
    .getUpdate()!
    .getElementList()
    .map(elem => {
      const x = ofEncodedReactElement(
        (messageId, args) => {
          const msg = new ClientToServer();
          const call = new Call();
          call.setMessageid(messageId);
          call.setArgs(args);
          msg.setCall(call);
          msg.setRootid(instanceId);
          ws.send(msg.serializeBinary());
        },
        key => {
          return localProps[key];
        },
        elem,
        retainedInstances
      );
      if (x && x.hasOwnProperty("type") && (x as React.ReactElement).type === undefined) {
              console.log(elem)
      };
      return x;
});
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

const useLocalPropsRef = (localProps: { [k: string]: unknown } | undefined) => {
  const props = localProps ? localProps : {};
  const ref = React.useRef(props);
  React.useEffect(() => {
    ref.current = props;
  }, [localProps]);
  return ref;
};

const sendRender = (
  ws: SocketLike,
  name: string,
  props: object,
  localProps: LocalProps,
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

type UpdateKind =
  | { type: "RemoteRender" }
  | { type: "LocalReRender" }
  | { type: "Reconnect"; oldWs: SocketLike | undefined }
  | undefined;

const useRemoteUpdateState = () => {
  let updateKind: UpdateKind | undefined = undefined;
  const memoizedWebSocket = React.useRef<SocketLike | undefined>(undefined);
  return {
    updateWebsocket(ws: SocketLike) {
      if (memoizedWebSocket.current !== ws) {
        updateKind = {
          type: "Reconnect",
          oldWs: memoizedWebSocket.current,
        };
        memoizedWebSocket.current = ws;
      }
    },
    updatedParams() {
      if (!(updateKind && updateKind.type == "Reconnect")) {
        updateKind = { type: "RemoteRender" };
      }
    },
    updatedLocalProps() {
      if (!updateKind) {
        updateKind = { type: "LocalReRender" };
      }
    },
    updateKind: () => updateKind,
  };
};

type LocalProps = { [k: string]: unknown };

export const useNars = (
  webSocket: () => SocketLike,
  name: string,
  props: object,
  localPropsOptional?: LocalProps
) => {
  const instanceId = useInstanceId();
  const [renderedElement, updateRenderedElement] = React.useState<State>(
    "Loading"
  );
  const [retainedInstances] = React.useState(() =>
    createRetainedInstanceContainer()
  );

  // It internally stores the latest reference to webSocket
  // So that we can determine if the webSocket we're using
  // has changed.
  const remoteUpdateState = useRemoteUpdateState();
  React.useEffect(() => {
    remoteUpdateState.updatedParams();
  }, [name, props]);
  React.useEffect(() => {
    remoteUpdateState.updatedLocalProps();
  }, [localPropsOptional]);

  // A ref is used so that the asynchrnous callbacks from the server
  // use the latest localProps (it happens when the state updates on
  // the server but there were no state transitions on the client.
  const localPropsRef = useLocalPropsRef(localPropsOptional);
  const disconnect = React.useRef<(() => void) | undefined>(undefined);
  const lastRenderMessage = React.useRef<ServerToClient | undefined>(undefined);
  React.useEffect(() => {
    const ws = webSocket();
    remoteUpdateState.updateWebsocket(ws);
    const update = remoteUpdateState.updateKind();
    if (update) {
      switch (update.type) {
        case "RemoteRender":
          sendRender(ws, name, props, localPropsRef.current, instanceId());
          break;
        case "Reconnect":
          if (disconnect.current) {
            disconnect.current();
            retainedInstances.clear();
          }
          disconnect.current = connect(
            ws,
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
                    localPropsRef.current,
                    instanceId(),
                    ws,
                    retainedInstances
                  ),
                });
                lastRenderMessage.current = message;
              } else if (message.hasAnimatedvalueupdate()) {
                const update = message.getAnimatedvalueupdate()!;
                const value = update.getValue();
                const toValue = update.getTovalue();
                updateAnimatedValue(value, toValue, retainedInstances);
              }
            }
          );
          sendRender(ws, name, props, localPropsRef.current, instanceId());
          break;
        case "LocalReRender":
          if (lastRenderMessage.current) {
            updateRenderedElement({
              type: "Rendered",
              element: reactElementFromMessage(
                lastRenderMessage.current,
                localPropsRef.current,
                instanceId(),
                ws,
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

export interface Lazy<T> {
  (): T;
}

type Props = {
  webSocket: SocketLike | Lazy<SocketLike>;
  name: string;
  props: { [k: string]: unknown };
  localProps?: { [k: string]: unknown };
  renderError?: () => React.ReactElement<any>;
  renderLoading?: () => React.ReactElement<any>;
};

export const useWebSocket = (
  url: string,
  shouldReconnect?: boolean
): Lazy<WebSocket> => {
  const [ref, setRef] = React.useState<
    React.MutableRefObject<WebSocket | null>
  >({ current: null });
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
        }
      } else if (removeErrorListenerRef.current) {
        removeErrorListenerRef.current();
      }
      ref.current = ws;
      return ws;
    }
  };
};

export const RemoteComponent = (props: Props) => {
  const ws = props.webSocket;
  const renderedElement = useNars(
    typeof ws === "function" ? ws : () => ws,
    props.name,
    props.props,
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
