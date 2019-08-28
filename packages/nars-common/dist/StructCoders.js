"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toValue = (value) => {
    switch (typeof value) {
        case "object":
            if (value === null) {
                return {
                    nullValue: 0
                };
            }
            else if (Array.isArray(value)) {
                return {
                    listValue: {
                        values: value.map(exports.toValue)
                    }
                };
            }
            else {
                return {
                    structValue: exports.toStruct(value)
                };
            }
        case "number":
            return {
                numberValue: value
            };
        case "string":
            return {
                stringValue: value
            };
        case "boolean":
            return {
                boolValue: value
            };
        default:
            return {};
    }
};
exports.toStruct = (value) => {
    const fields = {};
    Object.entries(value).forEach(([key, value]) => {
        fields[key] = exports.toValue(value);
    });
    return {
        fields: fields
    };
};
exports.ofValue = (value) => {
    if (value.hasOwnProperty("numberValue")) {
        return Number(value.numberValue);
    }
    else if (value.hasOwnProperty("nullValue")) {
        return null;
    }
    else if (value.hasOwnProperty("stringValue")) {
        return String(value.stringValue);
    }
    else if (value.hasOwnProperty("boolValue")) {
        return Boolean(value.boolValue);
    }
    else if (value.hasOwnProperty("structValue") && value.structValue) {
        return exports.ofStruct(value.structValue);
    }
    else if (value.hasOwnProperty("listValue") &&
        Array.isArray(value.listValue)) {
        return value.listValue.map(exports.ofValue);
    }
    else {
        return undefined;
    }
};
exports.ofStruct = (struct) => {
    if (struct.fields) {
        const fields = {};
        Object.entries(struct.fields).forEach(([key, value]) => {
            fields[key] = exports.ofValue(value);
        });
        return fields;
    }
    return {};
};
