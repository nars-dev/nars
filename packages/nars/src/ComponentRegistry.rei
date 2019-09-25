[@genType.import ("./TsTypes", "OpaqueProp")]
type opaqueProp;

type opaqueProps = Js.Dict.t(opaqueProp);

[@genType]
type createEncoder = (string, opaqueProps) => Instance.encoder;

let get: (~name: string) => option(createEncoder);

[@genType]
let add: (~name: string, ~createEncoder: createEncoder) => unit;

[@genType]
let registerRawTextEncodedReactElementInitializer:
  (string => Instance.encodedReactElement) => unit;

[@genType]
let createRawTextEncodedReactElement: string => Instance.encodedReactElement;
