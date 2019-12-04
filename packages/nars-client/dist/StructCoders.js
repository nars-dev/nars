"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const struct_pb_1 = require("./struct_pb");
exports.toValue = (value) => {
    const pbValue = new struct_pb_1.Value();
    switch (typeof value) {
        case "object":
            if (value === null) {
                pbValue.setNullValue(0);
            }
            else if (Array.isArray(value)) {
                const listValues = new struct_pb_1.ListValue();
                listValues.setValuesList(value.map(exports.toValue));
                pbValue.setListValue(listValues);
            }
            else {
                pbValue.setStructValue(exports.toStruct(value));
            }
            break;
        case "number":
            pbValue.setNumberValue(value);
            break;
        case "string":
            pbValue.setStringValue(value);
            break;
        case "boolean":
            pbValue.setBoolValue(value);
            break;
        case "undefined":
        default:
            pbValue.setUndefinedValue(0);
    }
    return pbValue;
};
exports.toStruct = (value) => {
    const struct = new struct_pb_1.Struct();
    const fields = struct.getFieldsMap();
    Object.entries(value).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
            fields.set(key, exports.toValue(value));
        }
    });
    return struct;
};
exports.ofValue = (value) => {
    if (value.hasNumberValue()) {
        return Number(value.getNumberValue());
    }
    else if (value.hasNullValue()) {
        return null;
    }
    else if (value.hasStringValue()) {
        return String(value.getStringValue());
    }
    else if (value.hasBoolValue()) {
        return Boolean(value.getBoolValue());
    }
    else if (value.hasStructValue()) {
        return exports.ofStruct(value.getStructValue());
    }
    else if (value.hasListValue()) {
        const list = value.getListValue();
        return list ? list.getValuesList().map(exports.ofValue) : [];
    }
    else if (value.hasUndefinedValue()) {
        return undefined;
    }
    else {
        return undefined;
    }
};
exports.ofStruct = (struct) => {
    if (struct) {
        const fields = {};
        struct.getFieldsMap().forEach((value, key) => {
            fields[key] = exports.ofValue(value);
        });
        return fields;
    }
    return {};
};
