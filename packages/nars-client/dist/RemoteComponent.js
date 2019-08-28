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
const nars_common_1 = require("nars-common");
const DecodeElement_1 = require("./DecodeElement");
exports.useNars = (wsOrAddress, name, props, localPropsOptional) => {
    const [renderedElement, setRenderedElement] = React.useState("Loading");
    const localProps = localPropsOptional ? localPropsOptional : {};
    const [instanceId] = React.useState(() => new Date().getUTCMilliseconds());
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
        const renderMessage = nars_common_1.Schema.ClientToServer.encode(nars_common_1.Schema.ClientToServer.create({
            render: {
                name,
                props: nars_common_1.toStruct(props),
                localProps: Object.keys(localProps)
            },
            rootId: instanceId
        })).finish();
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(renderMessage);
        }
        else {
            ws.onopen = () => {
                ws.send(renderMessage);
                ws.onopen = null;
            };
        }
    }, [name, props, localProps]);
    React.useEffect(() => {
        websocket().onmessage = bytes => {
            const message = nars_common_1.Schema.ServerToClient.decode(new Uint8Array(bytes.data));
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
                            websocket().send(nars_common_1.Schema.ClientToServer.encode(nars_common_1.Schema.ClientToServer.create({
                                call: {
                                    messageId,
                                    args
                                },
                                rootId: instanceId
                            })).finish());
                        }, key => {
                            return localProps[key];
                        }, elem))
                    });
                }
            }
        };
        return () => {
            websocket().send(nars_common_1.Schema.ClientToServer.encode(nars_common_1.Schema.ClientToServer.create({
                unmount: {},
                rootId: instanceId
            })).finish());
        };
    }, []);
    return renderedElement;
};
exports.RemoteComponent = (props) => {
    const renderedElement = exports.useNars(props.webSocket, props.name, props.props, props.localProps);
    if (renderedElement === "Error" && props.renderError) {
        return props.renderError();
    }
    else if (typeof renderedElement === "object" &&
        renderedElement.type === "Rendered") {
        return React.createElement(React.Fragment, null, renderedElement.element);
    }
    else if (props.renderLoading) {
        return props.renderLoading();
    }
    return null;
};
