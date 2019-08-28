import { google } from "./Schema";

export const toValue = (value: unknown): google.protobuf.IValue => {
  switch (typeof value) {
    case "object":
      if (value === null) {
        return {
          nullValue: 0
        };
      } else if (Array.isArray(value)) {
        return {
          listValue: {
            values: value.map(toValue)
          }
        };
      } else {
        return {
          structValue: toStruct(value)
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

type Fields = NonNullable<google.protobuf.IStruct["fields"]>;

export const toStruct = (value: object): google.protobuf.IStruct => {
  const fields = {} as Fields;
  Object.entries(value).forEach(([key, value]) => {
    fields[key] = toValue(value);
  });
  return {
    fields: fields
  };
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

export const ofValue = (value: google.protobuf.IValue): DecodedValue => {
  if (value.hasOwnProperty("numberValue")) {
    return Number(value.numberValue);
  } else if (value.hasOwnProperty("nullValue")) {
    return null;
  } else if (value.hasOwnProperty("stringValue")) {
    return String(value.stringValue);
  } else if (value.hasOwnProperty("boolValue")) {
    return Boolean(value.boolValue);
  } else if (value.hasOwnProperty("structValue") && value.structValue) {
    return ofStruct(value.structValue);
  } else if (
    value.hasOwnProperty("listValue") &&
    Array.isArray(value.listValue)
  ) {
    return value.listValue.map(ofValue);
  } else {
    return undefined;
  }
};

export const ofStruct = (
  struct: google.protobuf.IStruct
): { [k: string]: DecodedValue } => {
  if (struct.fields) {
    const fields = {} as UnknownObject;
    Object.entries(struct.fields).forEach(([key, value]) => {
      fields[key] = ofValue(value);
    });
    return fields;
  }
  return {};
};
