"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = require("./Schema");
const Value = Schema_1.google.protobuf.Value;
exports.InputProp = {
    string: {
        decode: (obj) => obj.stringValue,
        encode: (obj) => Value.create({
            stringValue: obj
        })
    },
    optional: ({ encode, decode }) => ({
        decode: (obj) => (obj ? decode(obj) : undefined),
        encode: (obj) => (obj ? encode(obj) : undefined),
        optional: true,
    })
};
