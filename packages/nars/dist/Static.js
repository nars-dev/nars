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
const NarsServer_1 = require("./NarsServer");
/* TODO: TEST */
function createDecoders(config) {
    let res = {};
    for (const component in config) {
        const definition = config[component];
        // @ts-ignore
        res[component] = (propsIn, localPropKeys) => {
            let parsedProps = {};
            if (propsIn && propsIn.fields) {
                for (const propKey in propsIn.fields) {
                    const prop = propsIn.fields[propKey];
                    const decoder = definition.props[propKey];
                    if (decoder) {
                        parsedProps[propKey] = decoder.decode(prop);
                    }
                    else {
                        console.warn("Unknown prop: " + propKey + " passed in");
                    }
                }
                localPropKeys.forEach(localPropKey => {
                    parsedProps[localPropKey] = { key: localPropKey };
                });
                return parsedProps;
            }
            else {
                let allPropsOptional = true;
                for (const def in definition.props) {
                    if (!definition.props[def].optional) {
                        allPropsOptional = false;
                    }
                }
                if (allPropsOptional) {
                    return {};
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
            return React.createElement(Component, parsedProps);
        }
        return undefined;
    };
}
exports.createRouter = createRouter;
function attatchListener(server, router) {
    NarsServer_1.startListening(server, componentDescription => {
        if (componentDescription.name) {
            const element = router(componentDescription.name, componentDescription.props, componentDescription.localProps ? componentDescription.localProps : []);
            if (element) {
                return element;
            }
            return null;
        }
        else {
            /* TODO: Fix the type definition there */
            return null;
        }
    });
}
exports.attatchListener = attatchListener;
