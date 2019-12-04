module Struct = Struct.Google_mirror.Protobuf.Struct;

type args = option(Struct.t);

[@genType.opaque]
type encoded = Schema.ReactElement.t;

type messageId = int;

type props =
  | Props(Js.t('props)): props;

type bridge = {
  registerCallback: (args => unit) => messageId,
  updateAnimatedValue:
    (~value: Animated.animatedValue, ~toValue: Animated.adaptable) => unit,
};

type encoder =
  (
    ~key: option(Schema.StringValue.t),
    ~props: props,
    ~bridge: bridge,
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

let rec encode = (instance, ~registerCallback, ~updateAnimatedValue) => {
  switch (instance) {
  | RawText(string) => {
      Schema.ReactElement.value: `RawText(string),
      key: None,
    }
  | Component(inst) =>
    let bridge = {registerCallback, updateAnimatedValue};
    let children =
      Js.Array.map(
        encode(~registerCallback, ~updateAnimatedValue),
        inst.children,
      );
    inst.encode(~key=inst.key, ~props=inst.props, ~bridge, ~children);
  };
};
