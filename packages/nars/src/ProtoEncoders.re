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
    |> Js.Array.map(((key, value)) =>
         encodeLocalProp(~localKey=value##key, ~propKey=key)
       )
    |> Array.to_list
  };
};

let encodeStyleOptional = props => {
  encodeOptional(props##style, JsonToStruct.convertExn);
};

let encodeNullable = (value, decoder) => {
  encodeOptional(Js.Null.toOption(value), decoder);
};

let encodeString = value => value;

let optionFlatten =
  fun
  | Some(Some(x)) => Some(x)
  | _ => None;
