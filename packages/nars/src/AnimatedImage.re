open Schema.ReactElement;

[@genType]
let name = "AnimatedImage";

[@genType]
type props = {
  .
  "style": option(AnimatedStyle.t),
  "source": string,
  "idGenerator": unit => int,
};

external toProps: Js.t('a) => props = "%identity";

let encoder =
    (
      ~key,
      ~props as Instance.Props(props),
      ~bridge as {Instance.updateAnimatedValue},
      ~children as _,
    ) => {
  let props = toProps(props);
  {
    key,
    value:
      `AnimatedImage({
        style:
          ProtoEncoders.encodeAnimatedStyleOptional(
            ~updateAnimatedValue,
            props,
          ),
        sourceURLString: props##source,
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
