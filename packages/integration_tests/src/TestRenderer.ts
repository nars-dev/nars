import * as Client from "nars-client";
import WebSocket from "ws";
import {
  create,
  act,
  ReactTestRenderer,
  ReactTestInstance,
} from "react-test-renderer";
import { Static, Server, ComponentConfig } from "nars";

interface MessageEvent {
  readonly data: any;
}

let serverSocketIn: (data: Server.Socket_data) => any;
let clientSocketIn: (ev: MessageEvent) => any;

const socket: Client.SocketLike = {
  readyState: WebSocket.OPEN,
  send(message) {
    if (serverSocketIn) {
      serverSocketIn((message as unknown) as Server.Socket_data);
    }
  },
  binaryType: "arraybuffer",
  addEventListener: (type, listener) => {
    if (type === "message") {
      clientSocketIn = listener;
    } else {
      throw "Unhandled event handler added in tests for type: " + type;
    }
  },
  removeEventListener: () => {
    console.log("Removing event listener");
  },
};

const server: Server.server = {
  on(event, handler) {
    if (event === "connection") {
      handler({
        on(event, handler) {
          if (event === "message") {
            serverSocketIn = handler;
          } else {
            throw "Unhandled event received: " + event;
          }
        },
        set binaryType(b) {
          socket.binaryType = b;
        },
        get binaryType() {
          return socket.binaryType;
        },
        send: msg => {
          if (clientSocketIn) {
            clientSocketIn({ data: msg });
          }
        },
      });
    }
  },
};

export const createRemoteComponent = <T extends ComponentConfig>(
  config: T,
  components: Static.ComponentDefinitions<T>
) => {
  Static.attatchListener(server, Static.createRouter(config, components));
  return Client.createRemoteComponent(socket, config);
};

export const render = (element: React.ReactElement): ReactTestRenderer => {
  let component: ReactTestRenderer;
  act(() => {
    component = create(element);
  });
  return component;
};

export const getChildren = (rendered: ReactTestRenderer) => {
  return (rendered.root.children[0] as ReactTestInstance).children;
};
