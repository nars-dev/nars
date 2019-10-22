open Struct.Google_mirror.Protobuf;

let rec convert = (json): Value.t => {
  switch (Js.Json.classify(json)) {
  | Js.Json.JSONArray(array) =>
    `List_value(
      {
        array |> Js.Array.map(convert) |> Array.to_list;
      },
    )
  | Js.Json.JSONFalse => `Bool_value(false)
  | Js.Json.JSONNull => `Null_value(NullValue.NULL_VALUE)
  | Js.Json.JSONNumber(n) => `Number_value(n)
  | Js.Json.JSONObject(dict) => `Struct_value(convertObject(dict))
  | Js.Json.JSONString(str) => `String_value(str)
  | Js.Json.JSONTrue => `Bool_value(true)
  };
}
and convertObject = (dict): Struct.t => {
  dict
  |> Js.Dict.entries
  |> Array.map(((key, value)) => {(key, Some(convert(value)))})
  |> Array.to_list;
};

let convertExn = json => {
  convertObject(json);
};
