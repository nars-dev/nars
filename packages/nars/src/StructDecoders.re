let getFieldExn = (key, decoder, struct_) => {
  List.assoc(key, struct_) |> Js.Option.getExn |> decoder;
};

let getBool =
  fun
  | `Bool_value((bool: bool)) => bool
  | _ => invalid_arg("Expected bool value");

let getString =
  fun
  | `String_value((str: string)) => str
  | _ => invalid_arg("Expected string value");

let getValueField = (decoder, args) => getFieldExn("value", decoder, args);
