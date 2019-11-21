[@genType]
type t = {. "key": string};

/* Returns Js.Dict.t(option(t)) because local props might be set to undefined explicitely*/
external propsToDict: option(Js.t('a)) => option(Js.Dict.t(option(t))) =
  "%identity";
