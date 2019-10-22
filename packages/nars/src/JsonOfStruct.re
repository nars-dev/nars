open Js.Json;

let rec convert = value => {
  switch (value) {
  | `Null_value(_) => null
  | `String_value(s) => string(s)
  | `Bool_value(b) => boolean(b)
  | `Number_value(n) => number(n)
  | `List_value(values) =>
    array(values |> Array.of_list |> Js.Array.map(convert))
  | `Struct_value(struct_) => convertStruct(struct_) |> Js.Json.object_
  };
}
and convertStruct = struct_ => {
  struct_
  |> List.map(((key, value)) =>
       Js.Option.(
         key,
         map((. value) => convert(value), value) |> getWithDefault(null),
       )
     )
  |> Js.Dict.fromList;
};
