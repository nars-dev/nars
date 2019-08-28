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
const StyleEncoding_1 = require("./StyleEncoding");
const ProtoEncoders_1 = require("./ProtoEncoders");
const name = "Nars_TextInput";
exports.default = (props) => React.createElement(name, props);
ComponentRegistry.add({
    name,
    createEncoder: (props) => ({ registerCallback }) => {
        return nars_common_1.Schema.ReactElement.create({
            textInput: {
                style: StyleEncoding_1.encodeTextStyleInProps(props),
                onValueChange: ProtoEncoders_1.encodeArityZeroCallback(registerCallback, props.onValueChange),
                value: props.value ? String(props.value) : "",
                placeholder: props.placeholder
                    ? {
                        value: String(props.placeholder)
                    }
                    : undefined,
                placeholderTextColor: props.placeholderTextColor
                    ? {
                        value: String(props.placeholderTextColor)
                    }
                    : undefined
            }
        });
    }
});
