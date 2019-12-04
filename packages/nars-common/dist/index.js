"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputProp = {
    string: {
        decode: (obj) => String(obj),
        encode: (obj) => obj,
    },
    boolean: {
        decode: (obj) => Boolean(obj),
        encode: (obj) => obj,
    },
    optional: ({ encode, decode, }) => ({
        decode: (obj) => (obj ? decode(obj) : undefined),
        encode: (obj) => (obj ? encode(obj) : undefined),
        optional: true,
    }),
    number: {
        decode: (obj) => Number(obj),
        encode: (obj) => obj,
    }
};
function localProp(isRequired, a, b) {
    return { component: a, key: b, local: true, isRequired };
}
exports.localProp = localProp;
