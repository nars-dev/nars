"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputProp = {
    string: {
        decode: (obj) => String(obj),
        encode: (obj) => obj,
    },
    optional: ({ encode, decode, }) => ({
        decode: (obj) => (obj ? decode(obj) : undefined),
        encode: (obj) => (obj ? encode(obj) : undefined),
        optional: true,
    }),
};
function localProp(a, b) {
    return { component: a, key: b };
}
exports.localProp = localProp;
