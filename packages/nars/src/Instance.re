module Struct = Struct.Google_mirror.Protobuf.Struct;

type args = option(Struct.t);

[@genType.opaque]
type encoded = Schema.ReactElement.t;

type messageId = int;

type props =
  | Props(Js.t('props)): props;

type encoder =
  (
    ~key: option(Schema.StringValue.t),
    ~props: props,
    ~registerCallback: (args => unit) => messageId,
    ~children: array(encoded)
  ) =>
  encoded;

type componentInstance = {
  mutable props,
  encode: encoder,
  children: array(t),
  key: option(string),
}
and t =
  | RawText(string)
  | Component(componentInstance);

let rec encode = (instance, ~registerCallback) => {
  switch (instance) {
  | RawText(string) => {
      Schema.ReactElement.value: `RawText(string),
      key: None,
    }
  | Component(inst) =>
    let children = Js.Array.map(encode(~registerCallback), inst.children);
    inst.encode(
      ~key=inst.key,
      ~props=inst.props,
      ~registerCallback,
      ~children,
    );
  };
};
