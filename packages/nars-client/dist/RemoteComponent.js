"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const Schema_1 = __importDefault(require("./Schema"));
const StructCoders_1 = require("./StructCoders");
const DecodeElement_1 = require("./DecodeElement");
class InstanceCounter {
    constructor() {
        this.freed = [];
        this.current = 1;
    }
    next() {
        const value = this.freed.pop();
        if (value) {
            return value;
        }
        else {
            const id = this.current;
            this.current += 1;
            return id;
        }
    }
    free(id) {
        this.freed.push(id);
    }
}
const instanceCounter = new InstanceCounter();
exports.useNars = (wsOrAddress, name, props, localPropsOptional) => {
    const [renderedElement, setRenderedElement] = React.useState("Loading");
    const localProps = localPropsOptional ? localPropsOptional : {};
    const [instanceId] = React.useState(() => instanceCounter.next());
    const ws = React.useRef(null);
    const websocket = () => {
        if (ws.current) {
            return ws.current;
        }
        else if (typeof wsOrAddress === "string") {
            ws.current = new WebSocket(wsOrAddress);
            ws.current.binaryType = "arraybuffer";
            return ws.current;
        }
        else {
            return wsOrAddress;
        }
    };
    React.useEffect(() => {
        const ws = websocket();
        ws.addEventListener("message", event => {
            if (typeof event.data !== "string") {
                throw "Bad binary format";
            }
            const message = Schema_1.default.ServerToClient.decode(Uint8Array.from(event.data, x => x.charCodeAt(0)));
            if (message.rootId === instanceId) {
                if (message.error) {
                    setRenderedElement(currentValue => {
                        if (currentValue === "Loading") {
                            return "Error";
                        }
                        else {
                            return currentValue;
                        }
                    });
                }
                else if (message.update && message.update.element) {
                    setRenderedElement({
                        type: "Rendered",
                        element: message.update.element.map(elem => DecodeElement_1.ofEncodedReactElement((messageId, args) => {
                            ws.send(Schema_1.default.ClientToServer.encode(Schema_1.default.ClientToServer.create({
                                call: {
                                    messageId,
                                    args,
                                },
                                rootId: instanceId,
                            })).finish());
                        }, key => {
                            return localProps[key];
                        }, elem)),
                    });
                }
            }
        });
        return () => {
            instanceCounter.free(instanceId);
            ws.send(Schema_1.default.ClientToServer.encode(Schema_1.default.ClientToServer.create({
                unmount: {},
                rootId: instanceId,
            })).finish());
        };
    }, []);
    React.useEffect(() => {
        const ws = websocket();
        const renderMessage = Schema_1.default.ClientToServer.encode(Schema_1.default.ClientToServer.create({
            render: {
                name,
                props: StructCoders_1.toStruct(props),
                localProps: Object.keys(localProps),
            },
            rootId: instanceId,
        })).finish();
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(renderMessage);
        }
        else {
            const handler = () => {
                ws.send(renderMessage);
                ws.removeEventListener("open", handler);
            };
            ws.addEventListener("open", handler);
        }
    }, [name, props, localProps]);
    return renderedElement;
};
exports.RemoteComponent = (props) => {
    const renderedElement = exports.useNars(props.webSocket, props.name, props.props, props.localProps);
    if (renderedElement === "Error" && props.renderError) {
        return props.renderError();
    }
    else if (typeof renderedElement === "object" &&
        renderedElement.type === "Rendered") {
        return React.createElement(React.Fragment, {}, ...renderedElement.element);
    }
    else if (props.renderLoading) {
        return props.renderLoading();
    }
    return null;
};
