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

// In reality we must realize that the code below should be tested in principle, too.
// We are not testing the real behavior. We are testing the behavior in this
// simulated enviornment which is vastly more predictable than the network conditions.
export type TestSocketLike = Client.SocketLike & {
  setServerSocketIn: (_: (data: Server.Socket_data) => any) => void;
  clientSocketIn: () => (ev: MessageEvent) => any;
};

export const testSocket: () => TestSocketLike = () => {
  let serverSocketIn: (data: Server.Socket_data) => any;
  let clientSocketIn: (ev: MessageEvent) => any;
  return {
    clientSocketIn: () => clientSocketIn,
    setServerSocketIn(x) {
      serverSocketIn = x;
    },
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
    removeEventListener: () => {},
  };
};

export const testSocketWithMessageSpy = (
  socket: TestSocketLike,
  eventHandlerSpy: (ev: MessageEvent) => any,
  messageSendSpy: (m: unknown) => void
): TestSocketLike => {
  const handler = socket.clientSocketIn;
  return {
    ...socket,
    clientSocketIn: () => ev => {
      eventHandlerSpy(ev);
      return handler()(ev);
    },
    send(d) {
      messageSendSpy(d);
      socket.send(d);
    },
  };
};

const server: (_: TestSocketLike) => Server.server = socket => ({
  on(event, handler) {
    if (event === "connection") {
      handler({
        on(event, handler) {
          if (event === "message") {
            socket.setServerSocketIn(handler);
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
          if (socket.clientSocketIn()) {
            socket.clientSocketIn()({ data: msg });
          }
        },
      });
    }
  },
});

export const createRemoteComponentWithDefaultSocket = <
  T extends ComponentConfig
>(
  config: T,
  components: Static.ComponentDefinitions<T>
) => {
  const ws = testSocket();
  Static.attatchListener(server(ws), Static.createRouter(config, components));
  return Client.createRemoteComponentWithWebSocket(ws, config);
};

export const createRemoteComponent = <T extends ComponentConfig>(
  config: T,
  components: Static.ComponentDefinitions<T>
) => {
  return [
    Client.createRemoteComponent(config),
    (socket: TestSocketLike) =>
      Static.attatchListener(
        server(socket),
        Static.createRouter(config, components)
      ),
  ] as const;
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
