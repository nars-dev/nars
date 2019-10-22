import * as React from "react";
import Schema from "./Schema";
import { toStruct } from "./StructCoders";
import { ofEncodedReactElement } from "./DecodeElement";

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
    ws.addEventListener("message", event => {
      if (typeof event.data !== "string") {
        throw "Bad binary format";
      }
      const message = Schema.ServerToClient.decode(
        Uint8Array.from(event.data, x => x.charCodeAt(0))
      );
      if (message.rootId === instanceId) {
        if (message.error) {
          setRenderedElement(currentValue => {
            if (currentValue === "Loading") {
              return "Error";
            } else {
              return currentValue;
            }
          });
        } else if (message.update && message.update.element) {
          setRenderedElement({
            type: "Rendered",
            element: message.update.element.map(elem =>
              ofEncodedReactElement(
                (messageId, args) => {
                  ws.send(
                    Schema.ClientToServer.encode(
                      Schema.ClientToServer.create({
                        call: {
                          messageId,
                          args,
                        },
                        rootId: instanceId,
                      })
                    ).finish()
                  );
                },
                key => {
                  return localProps[key];
                },
                elem
              )
            ),
          });
        }
      }
    });
    return () => {
      instanceCounter.free(instanceId);
      ws.send(
        Schema.ClientToServer.encode(
          Schema.ClientToServer.create({
            unmount: {},
            rootId: instanceId,
          })
        ).finish()
      );
    };
  }, []);
  React.useEffect(() => {
    const ws = websocket();
    const renderMessage = Schema.ClientToServer.encode(
      Schema.ClientToServer.create({
        render: {
          name,
          props: toStruct(props),
          localProps: Object.keys(localProps),
        },
        rootId: instanceId,
      })
    ).finish();
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
