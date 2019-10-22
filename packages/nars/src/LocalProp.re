[@genType]
type t = {. "key": string};

external propsToDict:
  option(Js.t('a)) => option(Js.Dict.t(t)) =
  "%identity";
