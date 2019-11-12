let opt_map = Js.Option.map;

let encodeOptional = (value, decoder) => {
  opt_map((. value) => decoder(value), value);
};

let encodeArityZeroCallback = (~registerCallback, ~callback) => {
  registerCallback(_ => {callback()});
};

let encodeArityZeroCallbackOptional = (~registerCallback, ~callback) =>
  encodeOptional(callback, callback => {registerCallback(_ => {callback()})});

let encodeCallback = (~registerCallback, ~callback) => {
  registerCallback(args => {callback(Js.Option.getExn(args))});
};

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
         encodeLocalProp(~localKey=Belt.Option.getExn(value)##key, ~propKey=key)
       )
    |> Array.to_list
  };
};

let encodeStyleOptional = props => {
  encodeOptional(props##style, x =>
    x |> Style.tToJSONDict |> JsonToStruct.convertExn
  );
};

let encodeNullable = (value, decoder) => {
  encodeOptional(Js.Null.toOption(value), decoder);
};

let encodeString = value => value;

let optionFlatten =
  fun
  | Some(Some(x)) => Some(x)
  | _ => None;
