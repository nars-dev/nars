[@genType.import ("./StyleSheet", "AnyAnimatedStyleProp")]
type t;
[@genType.import ("./ReasonAnimatedUtils", "nodeClass")]
type animatedNode;
type jsFunction;

module ProtobufAnimated = Nars_animated.Nars.Animated;
module Style = ProtobufAnimated.Style;
module Value = ProtobufAnimated.ValueOrAnimatedNode;
module Struct = Struct.Google_mirror.Protobuf;
module Node = ProtobufAnimated.Node;

type classification =
  | Object(Js.Dict.t(t))
  | Array(Js.Array.t(t))
  | Null
  | String(string)
  | Boolean(bool)
  | Number(float)
  | Function(jsFunction)
  | Undefined
  | Animated(animatedNode);

external to_nullable: t => Js.Null.t(t) = "%identity";
external to_object: t => Js.Dict.t(t) = "%identity";
external to_array: t => Js.Array.t(t) = "%identity";
external to_boolean: t => bool = "%identity";
external to_string: t => string = "%identity";
external to_number: t => float = "%identity";
external to_function: t => jsFunction = "%identity";
external to_animatedNode: t => animatedNode = "%identity";

[@bs.module "./ReasonAnimatedUtils"]
external isAnimatedNode: t => bool = "isAnimatedNode";

[@bs.module "./ReasonAnimatedUtils"]
external getProtobufNode: (unit => int, animatedNode) => Node.t =
  "getProtobufNode";

let classify = x =>
  switch (Js.typeof(x)) {
  | "object" =>
    switch (x |> to_nullable |> Js.Null.toOption) {
    | None => Null
    | Some(x) =>
      if (Js.Array.isArray(x)) {
        Array(x |> to_array);
      } else if (isAnimatedNode(x)) {
        Animated(x |> to_animatedNode);
      } else {
        Object(x |> to_object);
      }
    }
  | "boolean" => Boolean(x |> to_boolean)
  | "string" => String(x |> to_string)
  | "number" => Number(x |> to_number)
  | "function" => Function(x |> to_function)
  | "undefined" => Undefined
  | _ => assert(false)
  };

let rec dictToStruct = (idGenerator, dict) => {
  dict
  |> Js.Dict.entries
  |> Js.Array.map(((key, value)) =>
       (key, Some(toValue(idGenerator, value)))
     )
  |> Array.to_list;
}
and toValue = (idGenerator, t): Value.t =>
  switch (classify(t)) {
  | Null => `Null_value(Struct.NullValue.NULL_VALUE)
  | Boolean(b) => `Bool_value(b)
  | String(s) => `String_value(s)
  | Number(n) => `Number_value(n)
  | Undefined => `Undefined_value(Struct.UndefinedValue.UNDEFINED_VALUE)
  | Object(dict) => `Style_value(dictToStruct(idGenerator, dict))
  | Array(array) =>
    `List_value(Js.Array.map(toValue(idGenerator), array) |> Array.to_list)
  | Function(_) => assert(false)
  | Animated(animatedNode) =>
    `Node({
      node: Some(getProtobufNode(idGenerator, animatedNode)),
      __nodeID: idGenerator(),
    })
  };

external tToDict: t => Js.Dict.t(t) = "%identity";
let tToStruct = (idGenerator, t) => {
  dictToStruct(idGenerator, tToDict(t));
};
