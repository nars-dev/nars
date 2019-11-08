[@genType.import ("./StyleSheet", "AnyStyleProp")]
type t;

external tToJSONDict: t => Js.Dict.t(Js.Json.t) = "%identity";
