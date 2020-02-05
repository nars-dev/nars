[@genType]
let name = "TouchableOpacity";

[@genType]
type props = {. "onPress": option(Callback.t(unit))};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder = (~key, ~props as Instance.Props(props), ~bridge, ~children) => {
  let props = props_unsafe_cast(props);
  let onPress =
    ProtoEncoders.encodeCallbackOptional(
      ~bridge,
      ~callback=
        Js.Option.map(
          (. callback) => Callback.map(~f=_ => (), callback),
          props##onPress,
        ),
    );
  Schema.ReactElement.{
    key,
    value:
      `TouchableOpacity(
        Schema.TouchableOpacity.{
          onPress,
          localProps: [],
          children: Array.to_list(children),
        },
      ),
  };
};

ComponentRegistry.add(~name, ~encoder);
