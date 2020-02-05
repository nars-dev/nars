[@genType]
let name = "TextInput";

[@genType]
type props = {
  .
  "style": option(Style.t),
  "placeholderTextColor": option(Js.null(string)),
  "placeholder": option(string),
  "value": string,
  "onValueChange": option(Callback.t(string)),
};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (~key, ~props as Instance.Props(props), ~bridge, ~children as _) => {
  let props = props_unsafe_cast(props);
  Schema.ReactElement.{
    value:
      `TextInput(
        ProtoEncoders.{
          Schema.TextInput.style: encodeStyleOptional(props),
          placeholderTextColor:
            encodeOptional(props##placeholderTextColor, value =>
              encodeNullable(value, encodeString)
            )
            |> optionFlatten,
          placeholder: encodeOptional(props##placeholder, encodeString),
          value: props##value,
          onValueChange:
            encodeOptional(props##onValueChange, callback =>
              encodeCallback(
                ~bridge,
                ~callback=
                  Callback.map(
                    ~f=StructDecoders.(getValueField(getString)),
                    callback,
                  ),
              )
            ),
          localProps: [],
        },
      ),
    key,
  };
};

ComponentRegistry.add(~name, ~encoder);
