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
        res[component] = (propsIn) => {
            let encodedProps = { props: {}, localProps: {} };
            for (const propKey in definition.props) {
                const encoded = definition.props[propKey].encode(propsIn.props[propKey]);
                if (encoded) {
                    encodedProps.props[propKey] = encoded;
                }
                else {
                    throw "Bad prop type in " + component;
                }
            }
            if (definition.localProps) {
                for (const propKey in definition.localProps) {
                    encodedProps.localProps[propKey] = propsIn.localProps[propKey];
                }
            }
            return encodedProps;
        };
    }
    return res;
}
function createRemoteComponent(webSocket, config) {
    const encoders = createEncoders(config);
    return (({ name, props, LoadingComponent, ErrorComponent, }) => {
        if (!(name in encoders)) {
            throw "Unknown component " + name;
        }
        const encoded = React.useMemo(() => {
            return encoders[name](props);
        }, [name, props]);
        if (!encoded) {
            throw "Unknown component named " + name;
        }
        const encodedProps = encoded.props;
        const localProps = encoded.localProps;
        return (React.createElement(RemoteComponent_1.RemoteComponent, { webSocket: webSocket, name: name, props: encodedProps, localProps: localProps, renderLoading: LoadingComponent ? () => React.createElement(LoadingComponent, null) : undefined, renderError: ErrorComponent ? () => React.createElement(ErrorComponent, null) : undefined }));
    });
}
exports.createRemoteComponent = createRemoteComponent;
