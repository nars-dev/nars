[@genType.opaque]
type encoded = Schema.ReactElement.t;

type props =
  | Props(Js.t('props)): props;

type encoder =
  (
    ~key: option(Schema.StringValue.t),
    ~props: props,
    ~rpcInterface: RpcInterface.t,
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
  | RawText(ref(string))
  | Component(componentInstance)
  | Wait;

type result('a) =
  | Suspended
  | Encoded('a);

let rec encode = (instance, ~rpcInterface) => {
  switch (instance) {
  | RawText(string) =>
    Encoded({Schema.ReactElement.value: `RawText(string^), key: None})
  | Component(inst) =>
    let children =
      encodeArray(
        inst.children,
        ~rpcInterface,
      );
    switch (children) {
    | Encoded(children) =>
      Encoded(
        inst.encode(~key=inst.key, ~props=inst.props, ~rpcInterface, ~children),
      );
    | Suspended => Suspended
    };
  | Wait => Suspended
  };
}
and encodeArray =
    (instances, ~rpcInterface) => {
  let length = Js.Array.length(instances);
  let resultArray = Belt.Array.makeUninitializedUnsafe(length);
  let rec aux = (index, tail) =>
    if (index === length) {
      Encoded(resultArray);
    } else {
      let current = instances[index];
      switch (
        encode(current, ~rpcInterface)
      ) {
      | Encoded(encoded) =>
        resultArray[index] = encoded;
        aux(index + 1, tail);
      | Suspended => Suspended
      };
    };
  aux(0, instances);
};

let waitComponentName = "Wait";
