import { RPCInterface, CallbackID } from "./Rpc";
import { Result, error, success, isSuccess } from "./Result";
import { encodingArgError, decodingArgError } from "./Error";

export * from "./Rpc";
export * from "./Result";
export { CommonUserError, CommonUserErrorT } from "./Error";

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

export interface CallableLocalProp<LocalArg, ServerArg> {
  type: PropType.Local;
  localPropType: LocalPropType.Callable;
  localArg: InputProp<LocalArg>;
  serverArg: InputProp<ServerArg>;
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

export type ObjectInputProp = { [k: string]: InputProp<any> };
export type ExtractObjectInputPropType<T extends ObjectInputProp> = {
  [K in keyof T]: T[K] extends InputProp<infer X> ? X : never;
};

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
  function: <T>(config: InputProp<T>): InputProp<(_: T) => void> => ({
    type: PropType.Input as const,
    decode: (obj: unknown, rpc: RPCInterface) => {
      if (typeof obj === "object" && obj && "id" in obj) {
        return success(arg => {
          const encoded = config.encode(arg, rpc);
          if (isSuccess(encoded)) {
            rpc.rpcCall((obj as EncodedCallback).id, encoded.value);
          } else {
            throw decodingArgError();
          }
        });
      }
      return error;
    },
    encode: (callback: (_: T) => void, rpc: RPCInterface) => {
      if (typeof callback === "function") {
        return success({
          id: rpc.registerCallback(args => {
            const encoded = config.decode(args, rpc);
            if (isSuccess(encoded)) {
              callback(encoded.value);
            } else {
              throw encodingArgError();
            }
          }),
        });
      }
      return error;
    },
  }),
  void: {
    type: PropType.Input as const,
    name: "VOID",
    decode: (_: unknown): Result<void> => success(undefined),
    encode: (_: void) => success(undefined),
  },
  object: <Config extends ObjectInputProp>(
    config: Config
  ): InputProp<ExtractObjectInputPropType<Config>> => ({
    type: PropType.Input as const,
    decode: (obj: unknown, rpc: RPCInterface) => {
      if (typeof obj === "object" && obj !== null) {
        let output = {} as ExtractObjectInputPropType<Config>;
        for (const key in config) {
          const inputProp = config[key];
          if (key in obj) {
            let decoded = inputProp.decode(obj[key as keyof typeof obj], rpc);
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
      return error;
    },
    encode: (object, rpc: RPCInterface) => {
      let output: { [k: string]: unknown } = {};
      for (const key in config) {
        const inputProp = config[key];
        if (key in object) {
          const encoded = inputProp.encode(object[key], rpc);
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
    },
  }),
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

export function localCallback<LocalArg, ServerArg>(
  localArg: InputProp<LocalArg>,
  serverArg: InputProp<ServerArg>
): CallableLocalProp<LocalArg, ServerArg> {
  return {
    type: PropType.Local,
    localPropType: LocalPropType.Callable,
    localArg,
    serverArg,
  };
}
