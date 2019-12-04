[@genType]
let name = "AnimatedView";

[@genType]
type props = {
  .
  "style": option(AnimatedStyle.t),
  "idGenerator": (unit) => int
};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (
      ~key,
      ~props as Instance.Props(props),
      ~registerCallback as _,
      ~children,
    ) => {
  let props = props_unsafe_cast(props);
  Schema.ReactElement.{
    key,
    value:
      `AnimatedView(
        Schema.AnimatedView.{
          style: ProtoEncoders.encodeAnimatedStyleOptional(props),
          children: Array.to_list(children),
        },
      ),
  };
};

ComponentRegistry.add(~name, ~encoder);
