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
  | Component(componentInstance)
  | Wait;

type result('a) =
  | Suspended
  | Encoded('a);

let rec encode = (instance, ~registerCallback, ~updateAnimatedValue) => {
  switch (instance) {
  | RawText(string) =>
    Encoded({Schema.ReactElement.value: `RawText(string), key: None})
  | Component(inst) =>
    let children =
      encodeArray(inst.children, ~registerCallback, ~updateAnimatedValue);
    switch (children) {
    | Encoded(children) =>
      let bridge = {registerCallback, updateAnimatedValue};
      Encoded(
        inst.encode(~key=inst.key, ~props=inst.props, ~bridge, ~children),
      );
    | Suspended => Suspended
    };
  | Wait => Suspended
  };
}
and encodeArray = (instances, ~registerCallback, ~updateAnimatedValue) => {
  let length = Js.Array.length(instances);
  let resultArray = Belt.Array.makeUninitializedUnsafe(length);
  let rec aux = (index, tail) =>
    if (index === length) {
      Encoded(resultArray);
    } else {
      let current = instances[index];
      switch (encode(current, ~registerCallback, ~updateAnimatedValue)) {
      | Encoded(encoded) =>
        resultArray[index] = encoded;
        aux(index + 1, tail);
      | Suspended => Suspended
      };
    };
  aux(0, instances);
};

let waitComponentName = "Wait";
