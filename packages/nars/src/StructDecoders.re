let getFieldExn = (key, fields, decoder) => {
  List.assoc(key, fields) |> Js.Option.getExn |> decoder;
};

let getBool =
  fun
  | `Bool_value(bool) => bool
  | _ => invalid_arg("Expected bool value");

let getString =
  fun
  | `String_value(str) => str
  | _ => invalid_arg("Expected string value");
