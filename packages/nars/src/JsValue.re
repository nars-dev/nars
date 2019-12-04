type t;
type jsFunction;

module Struct = Struct.Google_mirror.Protobuf;
module Value = Struct.Value;

type classification =
  | Object(Js.Dict.t(t))
  | Array(Js.Array.t(t))
  | Null
  | String(string)
  | Boolean(bool)
  | Number(float)
  | Function(jsFunction)
  | Undefined;

external to_nullable: t => Js.Null.t(t) = "%identity";
external to_object: t => Js.Dict.t(t) = "%identity";
external to_array: t => Js.Array.t(t) = "%identity";
external to_boolean: t => bool = "%identity";
external to_string: t => string = "%identity";
external to_number: t => float = "%identity";
external to_function: t => jsFunction = "%identity";

let classify = x =>
  switch (Js.typeof(x)) {
  | "object" =>
    switch (x |> to_nullable |> Js.Null.toOption) {
    | None => Null
    | Some(x) =>
      Js.Array.isArray(x) ? Array(x |> to_array) : Object(x |> to_object)
    }
  | "boolean" => Boolean(x |> to_boolean)
  | "string" => String(x |> to_string)
  | "number" => Number(x |> to_number)
  | "function" => Function(x |> to_function)
  | "undefined" => Undefined
  | _ => assert(false)
  };

let rec dictToStruct = dict => {
  dict
  |> Js.Dict.entries
  |> Js.Array.map(((key, value)) => (key, Some(toValue(value))))
  |> Array.to_list;
}
and toValue = (t): Value.t =>
  switch (classify(t)) {
  | Null => `Null_value(Struct.NullValue.NULL_VALUE)
  | Boolean(b) => `Bool_value(b)
  | String(s) => `String_value(s)
  | Number(n) => `Number_value(n)
  | Undefined => `Undefined_value(Struct.UndefinedValue.UNDEFINED_VALUE)
  | Object(dict) => `Struct_value(dictToStruct(dict))
  | Array(array) =>
    `List_value(Js.Array.map(toValue, array) |> Array.to_list)
  | Function(_) => assert(false)
  };

[@bs.val] external null: t = "null";
[@bs.val] external undefined: t = "undefined";
external boolToT: bool => t = "%identity";
external stringToT: string => t = "%identity";
external numberToT: float => t = "%identity";
external dictToT: Js.Dict.t(t) => t = "%identity";
external arrayToT: Js.Array.t(t) => t = "%identity";

let rec valueToT = (value: Value.t) =>
  switch (value) {
  | `Null_value(_) => null
  | `Bool_value(b) => boolToT(b)
  | `String_value(b) => stringToT(b)
  | `Number_value(b) => numberToT(b)
  | `Undefined_value(_) => undefined
  | `Struct_value(s) => dictToT(structToDict(s))
  | `List_value(l) => arrayToT(List.map(valueToT, l) |> Array.of_list)
  }
and structToDict = structDict => {
  let result = Js.Dict.empty();
  structDict
  |> List.iter(((key, value)) => {
       switch (value) {
       | None => ()
       | Some(value) => Js.Dict.set(result, key, valueToT(value))
       }
     });
  result;
};

let concatStyle = (styleDict, value) => {
  switch (value) {
  | Object(d) =>
    Js.Dict.entries(d)
    |> Js.Array.forEach(((key, value)) => {
         Js.Dict.set(styleDict, key, value)
       })
  | _ => assert(false)
  };
};

let tToStruct = (t) => {
  switch (classify(t)) {
  | Object(o) => dictToStruct(o)
  | Array(a) =>
    let styles = Js.Dict.empty();
    Js.Array.map(classify, a)
    |> Js.Array.forEach(concatStyle(styles));
    dictToStruct(styles);
  | _ => assert(false)
  };
};
