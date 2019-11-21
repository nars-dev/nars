[@genType]
let name = "TouchableOpacity";

[@genType]
type props = {
  .
  "onPress": option(unit => unit),
  "localProps": option({. "onPress": option(LocalProp.t)}),
};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (~key, ~props as Instance.Props(props), ~registerCallback, ~children) => {
  let props = props_unsafe_cast(props);
  let onPress =
    ProtoEncoders.encodeArityZeroCallbackOptional(
      ~registerCallback,
      ~callback=props##onPress,
    );
  Schema.ReactElement.{
    key,
    value:
      `TouchableOpacity(
        Schema.TouchableOpacity.{
          onPress,
          localProps:
            ProtoEncoders.encodeOptionalLocalProps(
              LocalProp.propsToDict(props##localProps),
            ),
          children: Array.to_list(children),
        },
      ),
  };
};

ComponentRegistry.add(~name, ~encoder);
