[@genType.import ("./TsTypes", "ArgsMap")]
type args;

[@genType.import ("./TsTypes", "EncodedReactElement")]
type encodedReactElement;

[@genType]
type messageId = int;

[@genType]
type encoder =
  (
    ~registerCallback: (args => unit) => messageId,
    ~children: array(encodedReactElement)
  ) =>
  encodedReactElement;

type componentInstance = {
  mutable encode: encoder,
  key: string,
  children: array(t),
}
and t =
  | RawText(unit => encodedReactElement)
  | Component(componentInstance);

let rec encode = (instance, ~registerCallback) => {
  switch (instance) {
  | RawText(init) => init()
  | Component(inst) =>
    inst.encode(
      ~registerCallback,
      ~children=Js.Array.map(encode(~registerCallback), inst.children),
    )
  };
};
