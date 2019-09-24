import { LocalProps, Schema } from "nars-common";

type Struct = Schema.google.protobuf.IStruct;

export const encodeLocalProps = (
  localPropsObject: LocalProps<string> | null | undefined
) => {
  const localProps = [] as Schema.ILocalProp[];
  if (localPropsObject) {
    for (const key in localPropsObject) {
      localProps.push({
        localKey: localPropsObject[key].key,
        propKey: key,
      });
    }
  }
  return localProps;
};

export const encodeArityZeroCallback = (
  registerCallback: (callback: () => void) => number,
  callback: unknown
) => {
  return callback && typeof callback === "function"
    ? {
        callId: registerCallback(() => {
          callback();
        }),
      }
    : undefined;
};

export const encodeArityOneCallback = <T>(
  extractArg: (arg: Struct) => T,
  registerCallback: (callback: (arg: Struct) => void) => number,
  callback: unknown
) => {
  return callback && typeof callback === "function"
    ? {
        callId: registerCallback((args: Struct) => {
          callback(extractArg(args));
        }),
      }
    : undefined;
};

export const encodeInt32Value = (num: unknown) => {
  return typeof num === "number"
    ? {
        value: num,
      }
    : undefined;
};
