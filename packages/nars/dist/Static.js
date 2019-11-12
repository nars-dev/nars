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
        res[component] = (propsIn = {}, localPropKeys) => {
            const parsedProps = {};
            for (const propKey in definition) {
                const prop = propsIn[propKey];
                const decoder = definition[propKey];
                if (!("local" in decoder)) {
                    if (prop) {
                        parsedProps[propKey] = decoder.decode(prop);
                    }
                    else if (!decoder.optional) {
                        throw `Required prop: ${propKey} has not been passed to component ${component}`;
                    }
                }
                else {
                    const index = localPropKeys.indexOf(propKey);
                    if (index === -1) {
                        throw "Local Prop is not found";
                    }
                    else {
                        parsedProps[propKey] = {
                            key: propKey,
                        };
                    }
                }
            }
            return parsedProps;
        };
    }
    return res;
}
function createRouter(config, definitions) {
    const parsers = createDecoders(config);
    return function (name, props, localProps) {
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
