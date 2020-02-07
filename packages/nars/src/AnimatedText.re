[@genType]
let name = "AnimatedText";

[@genType]
type props = {
  .
  "style": option(AnimatedStyle.t),
  "idGenerator": unit => int,
};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (
      ~key,
      ~props as Instance.Props(props),
      ~rpcInterface as {RpcInterface.updateAnimatedValue},
      ~children,
    ) => {
  let props = props_unsafe_cast(props);
  Schema.ReactElement.{
    key,
    value:
      `AnimatedText({
        style:
          ProtoEncoders.encodeAnimatedStyleOptional(
            ~updateAnimatedValue,
            props,
          ),
        children: Array.to_list(children),
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
