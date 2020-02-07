[@genType.opaque]
type t('args) =
  | Rpc('args => unit)
  | ClientSide(string, RpcInterface.t => RpcInterface.arg);

let map = (~f, t) =>
  switch (t) {
  | Rpc(callback) => Rpc(args => callback(f(args)))
  | ClientSide(id, appliedArgs) => ClientSide(id, appliedArgs)
  };

[@genType]
let makeRpc = callback => {
  Rpc(callback);
};

[@genType.import ("./TsTypes", "TypeScriptAny")]
type any_;

[@genType]
let makeClientSide = (key, encoder): t(any_) => {
  ClientSide(key, encoder);
};
