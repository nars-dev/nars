import { RPCInterface, CallbackID } from "./Rpc";
import { Result, error, success, isSuccess } from "./Result";

export * from "./Rpc";
export * from "./Result";

export interface InputProp<T> {
  type: PropType.Input;
  decode: (obj: unknown, rpcInterface: RPCInterface) => Result<T>;
  encode: (obj: T, rpcInterface: RPCInterface) => Result<unknown>;
  optional?: boolean;
}

export enum PropType {
  Local,
  Input,
}

export enum LocalPropType {
  Opaque,
  Callable,
}

export type LocalPropRequired = "optional" | "required";

export interface OpaqueLocalProp<
  Component,
  Key,
  IsRequired extends LocalPropRequired
> {
  type: PropType.Local;
  localPropType: LocalPropType.Opaque;
  component: Component;
  key: Key;
  isRequired: IsRequired;
}

export interface CallableLocalProp<
  LocalArg,
  ServerArgConfig extends ArgumentsConfig
> {
  type: PropType.Local;
  localPropType: LocalPropType.Callable;
  localArg: InputProp<LocalArg>;
  serverArgs: ServerArgConfig;
}

export type LocalProp =
  | OpaqueLocalProp<any, any, any>
  | CallableLocalProp<any, any>;

export type Prop = LocalProp | InputProp<any>;

export type Props = {
  [K: string]: Prop;
};

export type ComponentConfig = { [k: string]: Props };

export type ExtractInputPropType<T> = T extends InputProp<infer ParsedType>
  ? ParsedType
  : never;

export type ArgumentsConfig = { [k: string]: InputProp<any> };

export type Arguments<T extends ArgumentsConfig> = {
  [K in keyof T]: T[K] extends InputProp<infer X> ? X : never;
};

export function sanitizeAndEncode<T extends ArgumentsConfig>(
  config: T,
  args: Arguments<ArgumentsConfig>,
  rpc: RPCInterface
) {
  let output: { [k: string]: unknown } = {};
  for (const key in config) {
    const inputProp = config[key];
    if (key in args) {
      const encoded = inputProp.encode(args[key], rpc);
      if (isSuccess(encoded)) {
        output[key] = encoded.value;
      } else {
        return error;
      }
    } else if (!inputProp.optional) {
      return error;
    }
  }
  return success(output);
}

export function sanitizeAndDecode<T extends ArgumentsConfig>(
  config: T,
  args: { [k: string]: unknown },
  rpc: RPCInterface
): Result<Arguments<T>> {
  let output = {} as Arguments<T>;
  for (const key in config) {
    const inputProp = config[key];
    if (key in args) {
      let decoded = inputProp.decode(args[key], rpc);
      if (isSuccess(decoded)) {
        output[key] = decoded.value;
      } else {
        return error;
      }
    } else if (!inputProp.optional) {
      return error;
    }
  }
  return success(output);
}

interface EncodedCallback {
  id: CallbackID;
}

export const InputProp = {
  string: {
    type: PropType.Input as const,
    decode: (obj: unknown) => (typeof obj === "string" ? success(obj) : error),
    encode: (obj: string) => (typeof obj === "string" ? success(obj) : error),
  },
  boolean: {
    type: PropType.Input as const,
    decode: (obj: unknown) => (typeof obj === "boolean" ? success(obj) : error),
    encode: (obj: boolean) => (typeof obj === "boolean" ? success(obj) : error),
  },
  number: {
    type: PropType.Input as const,
    decode: (obj: unknown): Result<number> =>
      typeof obj === "number" ? success(obj) : error,
    encode: (obj: number) => (typeof obj === "number" ? success(obj) : error),
  },
  optional: <T>(prop: InputProp<T>): InputProp<T | undefined> => ({
    type: PropType.Input as const,
    decode: (obj: unknown, rpcInterface): Result<T | undefined> => {
      if (typeof obj !== "undefined") {
        return prop.decode(obj, rpcInterface);
      } else {
        return success(undefined);
      }
    },
    encode: (obj: T | undefined, rpcInterface) => {
      if (typeof obj !== "undefined") {
        return prop.encode(obj, rpcInterface);
      } else {
        return success(undefined);
      }
    },
    optional: true,
  }),
  function: <T extends ArgumentsConfig>(
    config: T
  ): InputProp<(_: Arguments<T>) => void> => ({
    type: PropType.Input as const,
    decode: (obj: unknown, rpc: RPCInterface) => {
      if (typeof obj === "object" && obj && "id" in obj) {
        return success(args => {
          const encoded = sanitizeAndEncode(config, args, rpc);
          if (isSuccess(encoded)) {
            rpc.rpcCall((obj as EncodedCallback).id, encoded.value);
          }
        });
      }
      return error;
    },
    encode: (callback: (_: Arguments<T>) => void, rpc: RPCInterface) => {
      if (typeof callback === "function") {
        return success({
          id: rpc.registerCallback(args => {
            const encoded = sanitizeAndDecode(config, args, rpc);
            if (isSuccess(encoded)) {
              callback(encoded.value);
            }
          }),
        });
      }
      return error;
    },
  }),
  void: {
    type: PropType.Input as const,
    decode: (_: unknown): Result<void> => success(undefined),
    encode: (_: void) => success(undefined),
  },
};

export function localProp<
  IsRequired extends LocalPropRequired,
  A extends string,
  B extends string
>(isRequired: IsRequired, a: A, b: B): OpaqueLocalProp<A, B, IsRequired> {
  return {
    component: a,
    key: b,
    isRequired,
    localPropType: LocalPropType.Opaque,
    type: PropType.Local,
  };
}

export function localCallback<LocalArg, AppliedConfig extends ArgumentsConfig>(
  localArg: InputProp<LocalArg>,
  serverArgs: AppliedConfig
): CallableLocalProp<LocalArg, AppliedConfig> {
  return {
    type: PropType.Local,
    localPropType: LocalPropType.Callable,
    localArg,
    serverArgs,
  };
}
