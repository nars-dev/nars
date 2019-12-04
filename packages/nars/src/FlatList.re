[@genType]
let name = "FlatList";

[@genType]
type props = {
  .
  "keys": array(string),
  "style": option(Style.t),
  "onEndReached": option(unit => unit),
  "onEndReachedThreshold": option(float),
  "localProps": option({. "onEndReached": option(LocalProp.t)}),
};

external toProps: Js.t('a) => props = "%identity";
external localPropsToDict:
  option(Js.t('a)) => option(Js.Dict.t(option(LocalProp.t))) =
  "%identity";

module FL = Schema.FlatList;

let opt_map = Js.Option.map;

let encoder =
    (~key, ~props as Instance.Props(props), ~bridge, ~children)
    : Schema.ReactElement.t => {
  open Schema;
  let props = toProps(props);
  let children =
    Js.Array.mapi(
      (key, i) => ReactElement.{...children[i], key: Some(key)},
      props##keys,
    )
    |> Array.to_list;

  {
    ReactElement.key,
    value:
      `FlatList(
        FL.{
          children,
          style: ProtoEncoders.encodeStyleOptional(props),
          onEndReached:
            ProtoEncoders.encodeArityZeroCallbackOptional(
              ~registerCallback=bridge.Instance.registerCallback,
              ~callback=props##onEndReached,
            ),
          onEndReachedThreshold:
            opt_map(
              (. threshold) => int_of_float(threshold),
              props##onEndReachedThreshold,
            ),
          localProps:
            ProtoEncoders.encodeOptionalLocalProps(
              localPropsToDict(props##localProps),
            ),
        },
      ),
  };
};

ComponentRegistry.add(~name, ~encoder);
