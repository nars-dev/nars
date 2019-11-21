let add: (~name: string, ~encoder: Instance.encoder) => unit;

let createInstance:
  (~name: string, ~key: option(string), ~props: Js.t('a)) => Instance.t;
