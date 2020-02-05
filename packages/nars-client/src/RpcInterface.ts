import * as React from "react";
import {
  ClientToServer,
  Call,
} from "./schema_pb";
import { RPCInterface, CallbackID, Arguments } from "nars-common";
import { SocketLike } from "./SocketLike";
import { toStruct } from "./StructCoders";

export interface RpcInterface extends RPCInterface {
  executeRpcCall: (
    id: CallbackID,
    encodedArgs: { [k: string]: unknown }
  ) => void;
}

export const useRpcInterface = (rootId: () => number, ws: () => SocketLike): RpcInterface => {
  const [map] = React.useState(() => new Map<number, (_: Arguments<any>) => void>());
  let counter = 0;
  return {
    registerCallback: callback => {
      counter = +1;
      map.set(counter, callback);
      return counter;
    },
    executeRpcCall: (id, encodedArgs) => {
      const callback = map.get(id);
      if (callback) {
        callback(encodedArgs);
      }
    },
    rpcCall: (messageId, args) => {
      const msg = new ClientToServer();
      const call = new Call();
      call.setMessageid(messageId);
      call.setArgs(toStruct(args));
      msg.setCall(call);
      msg.setRootid(rootId());
      ws().send(msg.serializeBinary());
    },
  };
};
