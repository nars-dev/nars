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
        clear: () => {
            nodes.clear();
            values.clear();
            clocks.clear();
        },
    };
};
const reactElementFromMessage = (message, localProps, instanceId, ws, retainedInstances) => {
    return message
        .getUpdate()
        .getElementList()
        .map(elem => {
        const x = DecodeElement_1.ofEncodedReactElement((messageId, args) => {
            const msg = new schema_pb_1.ClientToServer();
            const call = new schema_pb_1.Call();
            call.setMessageid(messageId);
            call.setArgs(args);
            msg.setCall(call);
            msg.setRootid(instanceId);
            ws.send(msg.serializeBinary());
        }, key => {
            return localProps[key];
        }, elem, retainedInstances);
        if (x && x.hasOwnProperty("type") && x.type === undefined) {
            console.log(elem);
        }
        ;
        return x;
    });
};
const connect = (ws, instanceId, onMessage) => {
    const eventListener = (event) => {
        const message = schema_pb_1.ServerToClient.deserializeBinary(new Uint8Array(event.data));
        if (message.getRootid() === instanceId) {
            onMessage(message);
        }
    };
    ws.addEventListener("message", eventListener);
    return () => {
        if (ws.readyState === WebSocket.OPEN) {
            const msg = new schema_pb_1.ClientToServer();
            msg.setUnmount(new schema_pb_1.Unmount());
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
const useLocalPropsRef = (localProps) => {
    const props = localProps ? localProps : {};
    const ref = React.useRef(props);
    React.useEffect(() => {
        ref.current = props;
    }, [localProps]);
    return ref;
};
const sendRender = (ws, name, props, localProps, instanceId) => {
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
};
const useRemoteUpdateState = () => {
    let updateKind = undefined;
    const memoizedWebSocket = React.useRef(undefined);
    return {
        updateWebsocket(ws) {
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
exports.useNars = (webSocket, name, props, localPropsOptional) => {
    const instanceId = useInstanceId();
    const [renderedElement, updateRenderedElement] = React.useState("Loading");
    const [retainedInstances] = React.useState(() => createRetainedInstanceContainer());
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
    const disconnect = React.useRef(undefined);
    const lastRenderMessage = React.useRef(undefined);
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
                    disconnect.current = connect(ws, instanceId(), message => {
                        if (message.hasError()) {
                            updateRenderedElement(currentValue => {
                                if (currentValue === "Loading") {
                                    return "Error";
                                }
                                else {
                                    return currentValue;
                                }
                            });
                        }
                        else if (message.hasUpdate()) {
                            updateRenderedElement({
                                type: "Rendered",
                                element: reactElementFromMessage(message, localPropsRef.current, instanceId(), ws, retainedInstances),
                            });
                            lastRenderMessage.current = message;
                        }
                        else if (message.hasAnimatedvalueupdate()) {
                            const update = message.getAnimatedvalueupdate();
                            const value = update.getValue();
                            const toValue = update.getTovalue();
                            AnimatedCoders_1.updateAnimatedValue(value, toValue, retainedInstances);
                        }
                    });
                    sendRender(ws, name, props, localPropsRef.current, instanceId());
                    break;
                case "LocalReRender":
                    if (lastRenderMessage.current) {
                        updateRenderedElement({
                            type: "Rendered",
                            element: reactElementFromMessage(lastRenderMessage.current, localPropsRef.current, instanceId(), ws, retainedInstances),
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
exports.useWebSocket = (url, shouldReconnect) => {
    const [ref, setRef] = React.useState({ current: null });
    const removeErrorListenerRef = React.useRef();
    return () => {
        if (ref.current) {
            return ref.current;
        }
        else {
            const ws = new WebSocket(url);
            if (shouldReconnect) {
                const handler = () => {
                    setTimeout(function () {
                        setRef(x => (x.current === ws ? { current: null } : x));
                    }, 200);
                };
                ws.addEventListener("close", handler);
                removeErrorListenerRef.current = () => {
                    ws.removeEventListener("close", handler);
                };
            }
            else if (removeErrorListenerRef.current) {
                removeErrorListenerRef.current();
            }
            ref.current = ws;
            return ws;
        }
    };
};
exports.RemoteComponent = (props) => {
    const ws = props.webSocket;
    const renderedElement = exports.useNars(typeof ws === "function" ? ws : () => ws, props.name, props.props, props.localProps);
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
