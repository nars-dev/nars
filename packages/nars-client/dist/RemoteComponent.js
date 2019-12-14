"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const StructCoders_1 = require("./StructCoders");
const DecodeElement_1 = require("./DecodeElement");
const AnimatedCoders_1 = require("./AnimatedCoders");
const schema_pb_1 = require("./schema_pb");
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
const createRetainedInstanceContainer = () => {
    const clocks = new Map();
    const values = new Map();
    const nodes = new Map();
    return {
        getClock: n => {
            return clocks.get(n.getNodeid());
        },
        setClock: (n, clock) => {
            return clocks.set(n.getNodeid(), clock);
        },
        getValue: n => {
            return values.get(n.getNodeid());
        },
        setValue: (node, value) => {
            return values.set(node.getNodeid(), value);
        },
        getNode: n => {
            return nodes.get(n.getNodeid());
        },
        setNode: (n, value) => {
            nodes.set(n.getNodeid(), value);
        },
    };
};
exports.useNars = (wsOrAddress, name, props, localPropsOptional) => {
    const [renderedElement, setRenderedElement] = React.useState("Loading");
    const localProps = localPropsOptional ? localPropsOptional : {};
    const [instanceId] = React.useState(() => instanceCounter.next());
    const [retainedInstances] = React.useState(() => createRetainedInstanceContainer());
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
        ws.addEventListener("message", (event) => {
            const message = schema_pb_1.ServerToClient.deserializeBinary(new Uint8Array(event.data));
            if (message.getRootid() === instanceId) {
                if (message.hasError()) {
                    setRenderedElement(currentValue => {
                        if (currentValue === "Loading") {
                            return "Error";
                        }
                        else {
                            return currentValue;
                        }
                    });
                }
                else if (message.hasUpdate()) {
                    setRenderedElement({
                        type: "Rendered",
                        element: message
                            .getUpdate()
                            .getElementList()
                            .map(elem => DecodeElement_1.ofEncodedReactElement((messageId, args) => {
                            const msg = new schema_pb_1.ClientToServer();
                            const call = new schema_pb_1.Call();
                            call.setMessageid(messageId);
                            call.setArgs(args);
                            msg.setCall(call);
                            msg.setRootid(instanceId);
                            ws.send(msg.serializeBinary());
                        }, key => {
                            return localProps[key];
                        }, elem, retainedInstances)),
                    });
                }
                else if (message.hasAnimatedvalueupdate()) {
                    console.log("UPDATEP");
                    const update = message.getAnimatedvalueupdate();
                    const value = update.getValue();
                    const toValue = update.getTovalue();
                    AnimatedCoders_1.updateAnimatedValue(value, toValue, retainedInstances);
                }
            }
        });
        return () => {
            instanceCounter.free(instanceId);
            const msg = new schema_pb_1.ClientToServer();
            msg.setUnmount(new schema_pb_1.Unmount());
            msg.setRootid(instanceId);
            ws.send(msg.serializeBinary());
        };
    }, []);
    React.useEffect(() => {
        const ws = websocket();
        const msg = new schema_pb_1.ClientToServer();
        const payload = new schema_pb_1.Render();
        payload.setName(name);
        payload.setProps(StructCoders_1.toStruct(props));
        payload.setLocalpropsList(Object.keys(localProps));
        msg.setRootid(instanceId);
        msg.setRender(payload);
        const renderMessage = msg.serializeBinary();
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
