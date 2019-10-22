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
const NarsServer_gen_1 = require("./NarsServer.gen");
function createDecoders(config) {
    let res = {};
    for (const config_component in config) {
        const definition = config[config_component];
        const component = config_component;
        res[component] = (propsIn, localPropKeys) => {
            let parsedProps = {};
            if (propsIn) {
                for (const propKey in propsIn) {
                    const prop = propsIn[propKey];
                    const decoder = definition.props[propKey];
                    if (decoder) {
                        parsedProps[propKey] = decoder.decode(prop);
                    }
                    else {
                        console.warn("Unknown prop: " + propKey + " passed in");
                    }
                }
                return {
                    props: parsedProps,
                    localProps: localPropKeys.reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: { key: key } })), {}),
                };
            }
            else {
                let allPropsOptional = true;
                for (const def in definition.props) {
                    if (!definition.props[def].optional) {
                        allPropsOptional = false;
                    }
                }
                if (allPropsOptional) {
                    return { props: {}, localProps: {} };
                }
                else {
                    throw "Missing required props";
                }
            }
        };
    }
    return res;
}
function createRouter(config, definitions) {
    const parsers = createDecoders(config);
    return (name, props, localProps) => {
        if (name in definitions && name in parsers) {
            const Component = definitions[name];
            const parsedProps = parsers[name](props, localProps);
            if (parsedProps) {
                return React.createElement(Component, parsedProps);
            }
        }
        return undefined;
    };
}
exports.createRouter = createRouter;
function attatchListener(server, router) {
    NarsServer_gen_1.startListening(server, componentDescription => {
        if (componentDescription.name) {
            const element = router(componentDescription.name, componentDescription.props, componentDescription.localProps ? componentDescription.localProps : []);
            if (element) {
                return element;
            }
            return null;
        }
        else {
            return null;
        }
    });
}
exports.attatchListener = attatchListener;
