import * as React from "react";
import { ClientToServer, RpcCall } from "./schema_pb";
import { Value } from "./struct_pb";
import { RPCInterface, CallbackID, ExtractInputPropType } from "nars-common";
import { SocketLike } from "./SocketLike";
import { toValue, ofValue } from "./StructCoders";
import { badIncomingRpcCallId } from "./Error";

export interface RpcInterface extends RPCInterface {
  executeIncomingRpcCall: (
    id: CallbackID,
    encodedArgs: Value | undefined
  ) => void;
}

export const useRpcInterface = (
  rootId: () => number,
  ws: () => SocketLike
): RpcInterface => {
  const [map] = React.useState(
    () => new Map<number, (_: ExtractInputPropType<any>) => void>()
  );
  let counter = 0;
  return {
    registerCallback: callback => {
      counter = +1;
      map.set(counter, callback);
      return counter;
    },
    executeIncomingRpcCall: (id, encodedArgs) => {
      const callback = map.get(id);
      if (callback) {
        callback(ofValue(encodedArgs));
      } else {
        throw badIncomingRpcCallId(id);
      }
    },
    rpcCall: (messageId, args) => {
      const msg = new ClientToServer();
      const call = new RpcCall();
      call.setMessageid(messageId);
      call.setArg(toValue(args));
      msg.setRpccall(call);
      msg.setRootid(rootId());
      ws().send(msg.serializeBinary());
    },
  };
};
