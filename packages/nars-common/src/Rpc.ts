export type CallbackID = number;

export interface RPCInterface {
  registerCallback: (
    callback: (_: unknown) => void
  ) => CallbackID;
  rpcCall: (id: CallbackID, encodedArg: unknown) => void;
}
