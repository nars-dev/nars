[@genType]
let name = "FlatList";

[@genType]
type props = {
  .
  "keys": array(string),
  "style": option(Style.t),
  "onEndReached": option(Callback.t(unit)),
  "onEndReachedThreshold": option(float),
};

external toProps: Js.t('a) => props = "%identity";

module FL = Schema.FlatList;

let opt_map = Js.Option.map;

let encoder =
    (~key, ~props as Instance.Props(props), ~rpcInterface, ~children)
    : Schema.ReactElement.t => {
  let props = toProps(props);
  let children =
    Js.Array.mapi(
      (key, i) => Schema.ReactElement.{...children[i], key: Some(key)},
      props##keys,
    )
    |> Array.to_list;

  {
    Schema.ReactElement.key,
    value:
      `FlatList(
        FL.{
          children,
          style: ProtoEncoders.encodeStyleOptional(props),
          onEndReached:
            ProtoEncoders.encodeOptional(props##onEndReached, onEndReached =>
              ProtoEncoders.encodeCallback(
                ~rpcInterface,
                ~callback=Callback.map(~f=ignore, onEndReached),
              )
            ),
          onEndReachedThreshold:
            opt_map(
              (. threshold) => int_of_float(threshold),
              props##onEndReachedThreshold,
            ),
          localProps: [],
        },
      ),
  };
};

ComponentRegistry.add(~name, ~encoder);
