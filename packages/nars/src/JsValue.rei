module Protobuf = Struct.Google_mirror.Protobuf;

[@genType.import ("./TsTypes", "TypeScriptUnknown")]
type t;

let toValue: t => Protobuf.Value.t;
let dictToStruct: Js.Dict.t(t) => Protobuf.Struct.t;
let tToStruct: t => Protobuf.Struct.t;
let structToDict: Protobuf.Struct.t => Js.Dict.t(t);
let valueToT: Protobuf.Value.t => t;
