import { RPCInterface, isSuccess, Result } from "nars-common";
import {
  t as Callback_t,
  rpc as rpcGen,
  clientSide as clientSideGen,
} from "./Callback.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { toJs, fromJsRpcArgs } from "./RpcInterface.gen";
import { Dict_t } from "./shims/Js.shim";

export type Callback<T> = Callback_t<T>;

export function rpc<T>(callback: (_: T) => void): Callback<T> {
  return rpcGen(callback);
}

export interface ClientSideCallback<LocalArg, T> extends LocalProp {
  encode: (args: T, rpcInterface: RPCInterface) => Result<Dict_t<unknown>>;
  // This is passed to the callback on the client
  ""?: LocalArg;
}

export function clientSide<LocalArg, ServerArgs>(
  callable: ClientSideCallback<LocalArg, ServerArgs>,
  appliedArgs: ServerArgs
): Callback<LocalArg> {
  return clientSideGen(callable.key, rpcInterface => {
    const encoded = callable.encode(appliedArgs, toJs(rpcInterface));
    if (isSuccess(encoded)) {
      return fromJsRpcArgs(encoded.value);
    }
    throw "Couldn't encode args";
  });
}
