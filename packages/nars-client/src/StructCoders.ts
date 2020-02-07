import { Value, ListValue, Struct } from "./struct_pb";

export const toValue = (value: unknown): Value => {
  const pbValue = new Value();
  switch (typeof value) {
    case "object":
      if (value === null) {
        pbValue.setNullValue(0);
      } else if (Array.isArray(value)) {
        const listValues = new ListValue();
        listValues.setValuesList(value.map(toValue));
        pbValue.setListValue(listValues);
      } else {
        pbValue.setStructValue(toStruct(value));
      }
      break;
    case "number":
      pbValue.setNumberValue(value as number);
      break;
    case "string":
      pbValue.setStringValue(value as string);
      break;
    case "boolean":
      pbValue.setBoolValue(value as boolean);
      break;
    case "undefined":
    default:
      pbValue.setUndefinedValue(0);
  }
  return pbValue;
};

export const toStruct = (value: object): Struct => {
  const struct = new Struct();
  const fields = struct.getFieldsMap();
  Object.entries(value).forEach(([key, value]) => {
    if (typeof value !== "undefined") {
      fields.set(key, toValue(value));
    }
  });
  return struct;
};

type UnknownObject = { [k: string]: DecodedValue };
// https://stackoverflow.com/a/45999529
interface DecodedValueArray extends Array<DecodedValue> {}
type DecodedValue =
  | undefined
  | null
  | number
  | string
  | boolean
  | UnknownObject
  | DecodedValueArray;

export const ofValue = (value: Value | undefined): DecodedValue => {
  if (typeof value === "undefined") {
    return undefined;
  } else if (value.hasNumberValue()) {
    return Number(value.getNumberValue());
  } else if (value.hasNullValue()) {
    return null;
  } else if (value.hasStringValue()) {
    return String(value.getStringValue());
  } else if (value.hasBoolValue()) {
    return Boolean(value.getBoolValue());
  } else if (value.hasStructValue()) {
    return ofStruct(value.getStructValue());
  } else if (value.hasListValue()) {
    const list = value.getListValue();
    return list ? list.getValuesList().map(ofValue) : [];
  } else if (value.hasUndefinedValue()) {
    return undefined;
  } else {
    return undefined;
  }
};

export const ofStruct = (
  struct: Struct | undefined
): { [k: string]: DecodedValue } => {
  if (struct) {
    const fields = {} as UnknownObject;
    struct.getFieldsMap().forEach((value, key) => {
      fields[key] = ofValue(value);
    });
    return fields;
  }
  return {};
};
