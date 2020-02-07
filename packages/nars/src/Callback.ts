import { InputProp, isSuccess } from "nars-common";
import {
  t as Callback_t,
  makeRpc,
  makeClientSide,
} from "./Callback.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { toJs, fromJsRpcArgs } from "./RpcInterface.gen";
import { clientSideCallbackArgsEncodingError } from "./Error";

export type Callback<T> = Callback_t<T>;

export function rpc<T>(callback: (_: T) => void): Callback<T> {
  return makeRpc(callback);
}

export interface ClientSideCallback<LocalArg, T> extends LocalProp {
  arg: InputProp<T>;
  // This is passed to the callback on the client
  ""?: LocalArg;
}

export function clientSide<LocalArg, ServerArg>(
  callable: ClientSideCallback<LocalArg, ServerArg>,
  appliedArgs: ServerArg
): Callback<LocalArg> {
  return makeClientSide(callable.key, rpcInterface => {
    const encoded = callable.arg.encode(appliedArgs, toJs(rpcInterface));
    if (isSuccess(encoded)) {
      return fromJsRpcArgs(encoded.value);
    }
    throw clientSideCallbackArgsEncodingError(callable.key);
  });
}
