import * as React from "react";
import { toStruct } from "./StructCoders";
import { ofEncodedReactElement } from "./DecodeElement";
import Animated from "react-native-reanimated";
import { RetainedInstances } from "./AnimatedCoders";
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
  };
};

export const useNars = (
  wsOrAddress: SocketLike | string,
  name: string,
  props: object,
  localPropsOptional?: { [k: string]: unknown }
) => {
  const [renderedElement, setRenderedElement] = React.useState<State>(
    "Loading"
  );
  const localProps = localPropsOptional ? localPropsOptional : {};
  const [instanceId] = React.useState(() => instanceCounter.next());
  const [retainedInstances] = React.useState(() =>
    createRetainedInstanceContainer()
  );
  const ws = React.useRef<SocketLike | null>(null);
  const websocket = () => {
    if (ws.current) {
      return ws.current;
    } else if (typeof wsOrAddress === "string") {
      ws.current = new WebSocket(wsOrAddress);
      ws.current.binaryType = "arraybuffer";
      return ws.current;
    } else {
      return wsOrAddress;
    }
  };
  React.useEffect(() => {
    const ws = websocket();
    ws.addEventListener("message", (event: { data: ArrayBuffer }) => {
      const message = ServerToClient.deserializeBinary(
        new Uint8Array(event.data)
      );
      if (message.getRootid() === instanceId) {
        if (message.hasError()) {
          setRenderedElement(currentValue => {
            if (currentValue === "Loading") {
              return "Error";
            } else {
              return currentValue;
            }
          });
        } else if (message.hasUpdate()) {
          setRenderedElement({
            type: "Rendered",
            element: message
              .getUpdate()!
              .getElementList()
              .map(elem =>
                ofEncodedReactElement(
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
                )
              ),
          });
        }
      }
    });
    return () => {
      instanceCounter.free(instanceId);
      const msg = new ClientToServer();
      msg.setUnmount(new Unmount());
      msg.setRootid(instanceId);
      ws.send(msg.serializeBinary());
    };
  }, []);
  React.useEffect(() => {
    const ws = websocket();
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
  }, [name, props, localProps]);

  return renderedElement;
};

type Props = {
  webSocket: SocketLike | string;
  name: string;
  props: { [k: string]: unknown };
  localProps?: { [k: string]: unknown };
  renderError?: () => React.ReactElement<any>;
  renderLoading?: () => React.ReactElement<any>;
};

export const RemoteComponent = (props: Props) => {
  const renderedElement = useNars(
    props.webSocket,
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
