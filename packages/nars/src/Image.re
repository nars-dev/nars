open Schema.ReactElement;
open Schema.Image;

[@genType]
let name = "Image";

[@genType]
type props = {
  .
  "style": option(Style.t),
  "source": string,
};

external toProps: Js.t('a) => props = "%identity";

let encoder =
    (~key, ~props as Instance.Props(props), ~bridge as _, ~children as _) => {
  let props = toProps(props);
  {
    key,
    value:
      `Image({
        style: ProtoEncoders.encodeStyleOptional(props),
        sourceURLString: props##source,
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
