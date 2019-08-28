import { Server } from "ws";
import * as protobuf from "protobufjs/minimal";
import { Schema } from "nars-common";
import * as NarsReconciler from "./NarsReconciler.gen";

export const startListening = (
  server: Server,
  render: (component: Schema.IRender) => JSX.Element
) => {
  server.on("connection", socket => {
    socket.binaryType = "arraybuffer";
    const containers = new Map<number, NarsReconciler.container>();
    socket.on("message", (data: ArrayBuffer) => {
      try {
        const decoded = Schema.ClientToServer.decode(new Uint8Array(data));
        let container = containers.get(decoded.rootId);
        switch (decoded.value) {
          case "render":
            if (!container) {
              container = NarsReconciler.createContainer({
                flushUpdates: reactElements => {
                  const message = Schema.ServerToClient.encode(
                    Schema.ServerToClient.create({
                      update: {
                        element: reactElements
                      },
                      rootId: decoded.rootId
                    })
                  ).finish();
                  socket.send(message);
                }
              });
              containers.set(decoded.rootId, container);
            }
            NarsReconciler.updateContainer({
              element: render(decoded.render as Schema.IRender),
              container
            });
            break;
          case "unmount":
            if (container) {
              containers.delete(decoded.rootId);
              // from: https://github.com/facebook/react/blob/c80678c7606b1895573c23182bfb9a418e2ad31e/packages/react-dom/src/client/ReactDOM.js#L754
              const update = {
                /* element is of type JSX.Element and not React.element.
                 * Fixed in the new versions of genType
                 */
                element: null as any,
                container
              };
              NarsReconciler.unbatchedUpdates(() => {
                NarsReconciler.updateContainer(update);
              });
            }
            break;
          case "call":
            if (
              container &&
              decoded.call &&
              typeof decoded.call.messageId === "number"
            ) {
              NarsReconciler.invokeCallback({
                container,
                messageId: decoded.call.messageId,
                args: decoded.call.args ? decoded.call.args : {}
              });
            }
            break;
          default:
            console.error("Unreachable");
            break;
        }
      } catch (e) {
        if (e instanceof protobuf.util.ProtocolError) {
          // e.instance holds the so far decoded message with missing required fields
        } else {
          // wire format is invalid
        }
      }
    });
  });
};
