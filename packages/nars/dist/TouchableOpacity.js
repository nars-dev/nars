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
const ComponentRegistry = __importStar(require("./ComponentRegistry.gen"));
const nars_common_1 = require("nars-common");
const ProtoEncoders_1 = require("./ProtoEncoders");
const name = "Nars_TouchableOpacity";
exports.default = (props) => {
    return React.createElement(name, props, props.children);
};
ComponentRegistry.add({
    name,
    createEncoder: (props) => ({ registerCallback, children }) => {
        return nars_common_1.Schema.ReactElement.create({
            touchableOpacity: {
                onPress: ProtoEncoders_1.encodeArityZeroCallback(registerCallback, props.onPress),
                localProps: ProtoEncoders_1.encodeLocalProps(props.localProps),
                children
            }
        });
    }
});
