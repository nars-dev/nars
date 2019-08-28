module HashMap = Belt.HashMap.String;

[@genType.import ("./TsTypes", "OpaqueProp")]
type opaqueProp;

type opaqueProps = Js.Dict.t(opaqueProp);

type createEncoder = opaqueProps => Instance.encoder;

type t = HashMap.t(createEncoder);

let rawTextInitializer: ref(option(string => Instance.encodedReactElement)) =
  ref(None);

let registry: t = HashMap.make(~hintSize=6);

[@genType]
let add = (~name, ~createEncoder) =>
  if (!HashMap.has(registry, name)) {
    HashMap.set(registry, name, createEncoder);
  } else {
    raise(Invalid_argument("Component with this name exists: " ++ name));
  };

let get = (~name) => HashMap.get(registry, name);

[@genType]
let registerRawTextEncodedReactElementInitializer = init => {
  rawTextInitializer := Some(init);
};

[@genType]
let createRawTextEncodedReactElement = (text) => {
  Belt.Option.getExn(rawTextInitializer^)(text);
};
