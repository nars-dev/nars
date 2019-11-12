export interface InputPropType<T> {
  decode: (obj: unknown) => T | undefined;
  encode: (obj: T) => unknown | undefined;
  optional?: boolean;
};

export interface LocalPropKey<Component, Key> {
  component: Component;
  key: Key;
  local: true;
}

export type PropType = LocalPropKey<any, any> | InputPropType<any>;

export type PropTypes = {
  [K: string]: PropType;
};

export type ComponentConfig = { [k: string]: PropTypes };

export type ExtractInputPropType<T> = T extends InputPropType<infer ParsedType>
  ? ParsedType
  : never;

export const InputProp = {
  string: {
    decode: (obj: unknown) => String(obj),
    encode: (obj: string) => obj,
  },
  optional: <T>({
    encode,
    decode,
  }: InputPropType<T>): InputPropType<T | undefined> => ({
    decode: (obj: unknown) => (obj ? decode(obj) : undefined),
    encode: (obj: T | undefined) => (obj ? encode(obj) : undefined),
    optional: true,
  }),
};

export function localProp<A extends string, B extends string>(
  a: A,
  b: B
): LocalPropKey<A, B> {
  return { component: a, key: b, local: true };
}
