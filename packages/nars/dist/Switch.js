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
const ComponentRegistry = __importStar(require("./ComponentRegistry.gen"));
const StyleEncoding_1 = require("./StyleEncoding");
const ProtoEncoders_1 = require("./ProtoEncoders");
const name = "Nars_Switch";
exports.default = (props) => {
    return React.createElement(name, props);
};
ComponentRegistry.add({
    name,
    createEncoder: (key, props) => ({ registerCallback }) => {
        return nars_common_1.Schema.ReactElement.create({
            switch: {
                style: StyleEncoding_1.encodeViewStyleInProps(props),
                value: Boolean(props.value),
                onValueChange: ProtoEncoders_1.encodeArityOneCallback((args) => {
                    return !!(args.fields &&
                        args.fields.value &&
                        args.fields.value.boolValue);
                }, registerCallback, props.onValueChange)
            },
            key
        });
    }
});
