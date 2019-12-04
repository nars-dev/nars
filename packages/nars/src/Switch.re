open Schema.ReactElement;

[@genType]
let name = "Switch";

[@genType]
type props = {
  .
  "style": option(Style.t),
  "value": bool,
  "onValueChange": bool => unit,
};

external toProps: Js.t('a) => props = "%identity";

let encoder =
    (
      ~key,
      ~props as Instance.Props(props),
      ~bridge,
      ~children as _,
    ) => {
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
              ~registerCallback=bridge.Instance.registerCallback,
              ~callback=args => {
                let callback = props##onValueChange;
                callback(
                  StructDecoders.(getFieldExn("value", args, getBool)),
                );
              },
            ),
          ),
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
