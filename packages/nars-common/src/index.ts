export type InputPropType<T> = {
  decode: (obj: unknown) => T | undefined;
  encode: (obj: T) => unknown | undefined;
  optional?: boolean;
};

export interface LocalProp<Component, Key> {
  component: Component;
  key: Key;
}

export type InputPropTypes<T> = T extends {
  [K in keyof T]: T[K] extends InputPropType<infer ParsedType>
    ? InputPropType<ParsedType>
    : never;
}
  ? T
  : never;

export type LocalPropTypes<T> = T extends {
  [K in keyof T]: T[K] extends LocalProp<infer Component, infer Key>
    ? LocalProp<Component, Key>
    : never;
}
  ? T
  : never;

export type PropTypes<P, LP> = {
  props: InputPropTypes<P>;
  localProps: LocalPropTypes<LP>;
};

export type ComponentConfig = { [k: string]: PropTypes<any, any> };

export type ExtractInputPropTypes<T> = {
  [K in keyof T]: T[K] extends InputPropType<infer ParsedType>
    ? ParsedType
    : never;
};

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
): LocalProp<A, B> {
  return { component: a, key: b };
}
