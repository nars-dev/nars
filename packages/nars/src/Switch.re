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
    (~key, ~props as Instance.Props(props), ~bridge, ~children as _) => {
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
              ~bridge=bridge,
              ~callback=
                Callback.map(
                  ~f=(struct_) => StructDecoders.(getValueField(getBool, struct_)),
                  props##onValueChange,
                ),
            ),
          ),
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
