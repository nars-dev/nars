import { google } from "./Schema";

type Value = google.protobuf.Value;
const Value = google.protobuf.Value;
type IValue = google.protobuf.IValue;

export type InputPropType<T> = {
  decode: (obj: IValue) => T | undefined;
  encode: (obj: T) => Value | undefined;
  optional?: boolean;
};

export interface LocalPropType<T> {
  readonly __phantom_type?: T;
}

export type InputPropTypes<T> = T extends {
  [K in keyof T]: T[K] extends InputPropType<infer ParsedType>
    ? InputPropType<ParsedType>
    : never;
}
  ? T
  : never;

export type LocalPropTypes<T> = T extends {
  [K in keyof T]: T[K] extends LocalPropType<infer ParsedType>
    ? LocalPropType<ParsedType>
    : never;
}
  ? T
  : never;

export type PropTypes<P, LP> = {
  props: InputPropTypes<P>;
  localProps?: LocalPropTypes<LP>;
};

export type ComponentConfig = { [k: string]: PropTypes<any, any> };

export type ExtractInputPropTypes<T> = {
  [K in keyof T]: T[K] extends InputPropType<infer ParsedType>
    ? ParsedType
    : never;
};

export type ExtractLocalPropTypes<T> = {
  [K in keyof T]: T[K] extends LocalPropType<infer ParsedType>
    ? ParsedType
    : never;
};

export const InputProp = {
  string: {
    decode: (obj: IValue) => obj.stringValue,
    encode: (obj: string) =>
      Value.create({
        stringValue: obj
      })
  },
  optional: <T>({
    encode,
    decode
  }: InputPropType<T>): InputPropType<T | undefined> => ({
    decode: (obj: IValue) => (obj ? decode(obj) : undefined),
    encode: (obj: T | undefined) => (obj ? encode(obj) : undefined),
    optional: true,
  })
};
