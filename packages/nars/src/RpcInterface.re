module Protobuf = Struct.Google_mirror.Protobuf;

[@genType.opaque]
type arg = Protobuf.Value.t;

[@genType]
type messageId = int;
module CallbackRegistry = {
  module HashMap = Belt.HashMap.Int;
  type t = {
    mutable counter: int,
    registry: HashMap.t(arg => unit),
  };

  let make = () => {counter: 0, registry: HashMap.make(~hintSize=50)};

  let add = (t, callback) => {
    let id = t.counter;
    t.counter = id + 1;
    HashMap.set(t.registry, id, callback);
    id;
  };

  let clear = t => {
    HashMap.clear(t.registry);
    t.counter = 0;
  };

  let invokeCallback = (t, ~messageId, ~args) => {
    switch (HashMap.get(t.registry, messageId)) {
    | Some(callback) => callback(args)
    | None => ()
    };
  };
};

[@genType]
type t = {
  rpcCall: (messageId, arg) => unit,
  registerCallback: (arg => unit) => messageId,
  executeRpcCall: (messageId, arg) => unit,
  updateAnimatedValue:
    (~value: Animated.animatedValue, ~toValue: Animated.adaptable) => unit,
  clear: unit => unit
};

[@genType]
let toJs = (t: t) => {
  "rpcCall": (messageId, args) =>
    t.rpcCall(messageId, JsValue.toValue(args)),
  "registerCallback": callback => {
    t.registerCallback(args => {callback(JsValue.valueToT(args))});
  },
};

[@genType]
let fromJsRpcArgs = (arg: JsValue.t): arg => {
  arg |> JsValue.toValue;
};

let make = (~rpcCall, ~updateAnimatedValue) => {
  let registry = CallbackRegistry.make();
  {
    rpcCall,
    executeRpcCall: (messageId, args) =>
      CallbackRegistry.invokeCallback(registry, ~messageId, ~args),
    registerCallback: CallbackRegistry.add(registry),
    updateAnimatedValue,
    clear: () => CallbackRegistry.clear(registry)
  };
};
