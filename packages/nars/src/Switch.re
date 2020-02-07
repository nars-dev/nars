open Schema.ReactElement;

[@genType]
let name = "Switch";

[@genType]
type props = {
  .
  "style": option(Style.t),
  "value": bool,
  "onValueChange": Callback.t(bool),
};

external toProps: Js.t('a) => props = "%identity";

let encoder =
    (~key, ~props as Instance.Props(props), ~rpcInterface, ~children as _) => {
  let props = toProps(props);
  {
    key,
    value:
      `Switch({
        style: ProtoEncoders.encodeStyleOptional(props),
        value: props##value,
        onValueChange:
          Some(
            ProtoEncoders.encodeCallback(
              ~rpcInterface=rpcInterface,
              ~callback=
                Callback.map(
                  ~f=StructDecoders.getBool,
                  props##onValueChange,
                ),
            ),
          ),
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
