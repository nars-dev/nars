[@genType.opaque]
type t('args) =
  | Rpc('args => unit)
  | ClientSide(string, RpcInterface.t => RpcInterface.args);

let map = (~f, t) =>
  switch (t) {
  | Rpc(callback) => Rpc(args => callback(f(args)))
  | ClientSide(id, appliedArgs) => ClientSide(id, appliedArgs)
  };

[@genType]
let rpc = callback => {
  Rpc(callback);
};

[@genType.import ("./TsTypes", "TypeScriptAny")]
type any_;

[@genType]
let clientSide = (key, encoder): t(any_) => {
  ClientSide(key, encoder);
};
