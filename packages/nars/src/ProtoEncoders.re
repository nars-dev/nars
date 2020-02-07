let opt_map = Js.Option.map;

let encodeOptional = (value, decoder) => {
  opt_map((. value) => decoder(value), value);
};

let encodeCallback = (~rpcInterface, ~callback) => {
  switch (callback) {
  | Callback.Rpc(callback) =>
    `Remote(
      rpcInterface.RpcInterface.registerCallback(callback),
    )
  | Callback.ClientSide(localKey, encodeArgs) =>
    `Local({
      Schema.LocalCallback.localKey,
      arg: Some(encodeArgs(rpcInterface))
    })
  };
};

let encodeCallbackOptional = (~rpcInterface, ~callback) =>
  encodeOptional(callback, callback =>
    encodeCallback(~rpcInterface, ~callback)
  );

let encodeLocalProp = (~localKey, ~propKey) =>
  Schema.LocalProp.{localKey, propKey};

let encodeOptionalLocalProps = dict => {
  switch (dict) {
  | None => []
  | Some(dict) =>
    dict
    |> Js.Dict.entries
    |> Js.Array.filter(((_, value)) => Belt.Option.isSome(value))
    |> Js.Array.map(((key, value)) =>
         encodeLocalProp(
           ~localKey=Belt.Option.getExn(value)##key,
           ~propKey=key,
         )
       )
    |> Array.to_list
  };
};

let encodeStyleOptional = props => {
  encodeOptional(props##style, x => {
    x |> Style.tToJsValue |> JsValue.tToStruct
  });
};

let encodeAnimatedStyleOptional = (~updateAnimatedValue as updater, props) => {
  encodeOptional(props##style, x => {
    x |> AnimatedStyle.tToStruct(props##idGenerator, updater)
  });
};

let encodeNullable = (value, decoder) => {
  encodeOptional(Js.Null.toOption(value), decoder);
};

let encodeString = value => value;

let optionFlatten =
  fun
  | Some(Some(x)) => Some(x)
  | _ => None;
