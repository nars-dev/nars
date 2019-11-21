[@genType]
type t;

let toValue: t => Struct.Google_mirror.Protobuf.Value.t;
let dictToStruct: Js.Dict.t(t) => Struct.Google_mirror.Protobuf.Struct.t;
let structToDict: Struct.Google_mirror.Protobuf.Struct.t => Js.Dict.t(t);
