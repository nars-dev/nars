export type CallbackID = number;

export interface RPCInterface {
  registerCallback: (
    callback: (_: { [k: string]: unknown }) => void
  ) => CallbackID;
  rpcCall: (id: CallbackID, encodedArgs: { [k: string]: unknown }) => void;
}
