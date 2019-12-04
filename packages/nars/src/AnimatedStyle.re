[@genType.import ("./StyleSheet", "AnyAnimatedStyleProp")]
type t;
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
  | AnimatedValue(Animated.AnimatedValue.internal)
  | AnimatedNode(Animated.AnimatedNode.internal);

external to_nullable: t => Js.Null.t(t) = "%identity";
external to_object: t => Js.Dict.t(t) = "%identity";
external to_array: t => Js.Array.t(t) = "%identity";
external to_boolean: t => bool = "%identity";
external to_string: t => string = "%identity";
external to_number: t => float = "%identity";
external to_function: t => jsFunction = "%identity";

[@bs.module "./ReasonAnimatedUtils"]
external getAnimatedValue: t => option(Animated.AnimatedValue.internal) =
  "getAnimatedValue";
[@bs.module "./ReasonAnimatedUtils"]
external getAnimatedNode: t => option(Animated.AnimatedNode.internal) =
  "getAnimatedNode";

let classify = x =>
  switch (Js.typeof(x)) {
  | "object" =>
    switch (x |> to_nullable |> Js.Null.toOption) {
    | None => Null
    | Some(x) =>
      if (Js.Array.isArray(x)) {
        Array(x |> to_array);
      } else {
        switch (getAnimatedValue(x), getAnimatedNode(x)) {
        | (Some(value), _) =>
          AnimatedValue(value);
        | (None, Some(node)) =>
          AnimatedNode(node);
        | _ => Object(x |> to_object)
        };
      }
    }
  | "boolean" => Boolean(x |> to_boolean)
  | "string" => String(x |> to_string)
  | "number" => Number(x |> to_number)
  | "function" => Function(x |> to_function)
  | "undefined" => Undefined
  | _ => assert(false)
  };

let rec dictToStruct = (idGenerator, updater, dict) => {
  dict
  |> Js.Dict.entries
  |> Js.Array.map(((key, value)) =>
       (key, Some(toValue(idGenerator, updater, value)))
     )
  |> Array.to_list;
}
and toValue = (idGenerator, updater, t): Value.t => {
  let rec bridge = {
    Animated.AnimatedNode.updateValue: (value, toValue) => {
      let value = value({ idGenerator, bridge } );
      let toValue = toValue({ idGenerator, bridge });
      updater(~value, ~toValue);
    },
  };
  let encodingContext = { Animated.AnimatedNode.idGenerator, bridge };
  switch (classify(t)) {
  | Null => `Null_value(Struct.NullValue.NULL_VALUE)
  | Boolean(b) => `Bool_value(b)
  | String(s) => `String_value(s)
  | Number(n) => `Number_value(n)
  | Undefined => `Undefined_value(Struct.UndefinedValue.UNDEFINED_VALUE)
  | Object(dict) => `Style_value(dictToStruct(idGenerator, updater, dict))
  | Array(array) =>
    `List_value(
      Js.Array.map(toValue(idGenerator, updater), array) |> Array.to_list,
    )
  | Function(_) => assert(false)
  | AnimatedNode(animatedNode) =>
    `Node({
      node: Some(animatedNode.getNode(encodingContext)),
      __nodeID: encodingContext.idGenerator(),
    })
  | AnimatedValue(animatedValue) =>
    let value = animatedValue.getValue(encodingContext);
    `Node({node: Some(`Value(value)), __nodeID: encodingContext.idGenerator()});
  };
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

let tToStruct = (idGenerator, updater, t) => {
  switch (classify(t)) {
  | Object(o) => dictToStruct(idGenerator, updater, o)
  | Array(a) =>
    let styles = Js.Dict.empty();
    Js.Array.map(classify, a) |> Js.Array.forEach(concatStyle(styles));
    dictToStruct(idGenerator, updater, styles);
  | _ => assert(false)
  };
};
