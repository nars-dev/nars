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
const RemoteComponent_1 = require("./RemoteComponent");
function createEncoders(config) {
    let res = {};
    for (const component in config) {
        const definition = config[component];
        res[component] = (prevProps, propsIn) => {
            let propsChanged = prevProps === undefined;
            let localPropsChanged = prevProps === undefined;
            let encodedProps = { props: {}, localProps: {} };
            for (const propKey in definition) {
                const propDefinition = definition[propKey];
                const prop = propsIn[propKey];
                if (!("local" in propDefinition)) {
                    if (!propsIn.hasOwnProperty(propKey) && !propDefinition.optional) {
                        throw `Required prop '${propKey}' has not been passed to <${component} />`;
                    }
                    encodedProps.props[propKey] = propDefinition.encode(prop);
                    if (!propsChanged && prevProps) {
                        propsChanged =
                            prevProps.props[propKey] !== encodedProps.props[propKey];
                    }
                }
                else {
                    if (propDefinition.isRequired !== "optional" &&
                        typeof prop === "undefined") {
                        throw `Local Prop '${propKey}' has not been passed to <${component} />`;
                    }
                    else {
                        const localPropKey = propKey;
                        encodedProps.localProps[localPropKey] = prop;
                        if (!localPropsChanged && prevProps) {
                            localPropsChanged =
                                localPropsChanged[localPropKey] !==
                                    encodedProps.localProps[localPropKey];
                        }
                    }
                }
            }
            return {
                props: propsChanged ? encodedProps.props : prevProps.props,
                localProps: localPropsChanged
                    ? encodedProps.localProps
                    : prevProps.localProps,
            };
        };
    }
    return res;
}
function useMemoizedProps(name, encoders, props) {
    if (!(name in encoders)) {
        throw `Unknown component <${name} />`;
    }
    const prevEncodedProps = React.useRef(undefined);
    const encoded = encoders[name](prevEncodedProps.current, props);
    React.useEffect(() => {
        prevEncodedProps.current = encoded;
    });
    return encoded;
}
function createRemoteComponentWithSocketLikeOrUrl(socketLikeOrUrl, config) {
    const encoders = createEncoders(config);
    const useSocketLikeOrUrl = () => {
        return typeof socketLikeOrUrl === "string"
            ? RemoteComponent_1.useWebSocket(socketLikeOrUrl, true)
            : () => socketLikeOrUrl;
    };
    return ({ name, props, LoadingComponent, ErrorComponent, }) => {
        const webSocket = useSocketLikeOrUrl();
        const encoded = useMemoizedProps(name, encoders, props);
        return (React.createElement(RemoteComponent_1.RemoteComponent, { webSocket: webSocket, name: name, props: encoded.props, localProps: encoded.localProps, renderLoading: LoadingComponent ? () => React.createElement(LoadingComponent, null) : undefined, renderError: ErrorComponent ? () => React.createElement(ErrorComponent, null) : undefined }));
    };
}
function createRemoteComponentWithUrl(url, config) {
    return createRemoteComponentWithSocketLikeOrUrl(url, config);
}
exports.createRemoteComponentWithUrl = createRemoteComponentWithUrl;
function createRemoteComponentWithWebSocket(webSocket, config) {
    return createRemoteComponentWithSocketLikeOrUrl(webSocket, config);
}
exports.createRemoteComponentWithWebSocket = createRemoteComponentWithWebSocket;
function createRemoteComponent(config) {
    const encoders = createEncoders(config);
    return ({ name, props, LoadingComponent, ErrorComponent, webSocket, }) => {
        const encoded = useMemoizedProps(name, encoders, props);
        const encodedProps = encoded.props;
        const localProps = encoded.localProps;
        return (React.createElement(RemoteComponent_1.RemoteComponent, { webSocket: webSocket, name: name, props: encodedProps, localProps: localProps, renderLoading: LoadingComponent ? () => React.createElement(LoadingComponent, null) : undefined, renderError: ErrorComponent ? () => React.createElement(ErrorComponent, null) : undefined }));
    };
}
exports.createRemoteComponent = createRemoteComponent;
