import * as React from "react";
import { Schema, toStruct } from "nars-common";
import { ofEncodedReactElement } from "./DecodeElement";

export type State =
  | "Loading"
  | "Error"
  | { type: "Rendered"; element: (React.ReactChild | null)[] };

export const useNars = (
  wsOrAddress: WebSocket | string,
  name: string,
  props: object,
  localPropsOptional?: { [k: string]: unknown }
) => {
  const [renderedElement, setRenderedElement] = React.useState<State>(
    "Loading"
  );
  const localProps = localPropsOptional ? localPropsOptional : {};
  const [instanceId] = React.useState(() => new Date().getUTCMilliseconds());
  const ws = React.useRef<WebSocket | null>(null);
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
    const renderMessage = Schema.ClientToServer.encode(
      Schema.ClientToServer.create({
        render: {
          name,
          props: toStruct(props),
          localProps: Object.keys(localProps)
        },
        rootId: instanceId
      })
    ).finish();
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(renderMessage);
    } else {
      ws.onopen = () => {
        ws.send(renderMessage);
        ws.onopen = null;
      };
    }
  }, [name, props, localProps]);
  React.useEffect(() => {
    websocket().onmessage = bytes => {
      const message = Schema.ServerToClient.decode(new Uint8Array(bytes.data));
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
                  websocket().send(
                    Schema.ClientToServer.encode(
                      Schema.ClientToServer.create({
                        call: {
                          messageId,
                          args
                        },
                        rootId: instanceId
                      })
                    ).finish()
                  );
                },
                key => {
                  return localProps[key];
                },
                elem
              )
            )
          });
        }
      }
    };
    return () => {
      websocket().send(
        Schema.ClientToServer.encode(
          Schema.ClientToServer.create({
            unmount: {},
            rootId: instanceId
          })
        ).finish()
      );
    };
  }, []);
  return renderedElement;
};

type Props = {
  webSocket: WebSocket | string;
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
    return <React.Fragment>{renderedElement.element}</React.Fragment>;
  } else if (props.renderLoading) {
    return props.renderLoading();
  }
  return null;
};
