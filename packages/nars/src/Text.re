[@genType]
let name = "Text";

[@genType]
type props = {
  .
  "numberOfLines": option(int),
  "style": option(Style.t),
};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (~key, ~props as Instance.Props(props), ~bridge as _, ~children) => {
  let castProps = props_unsafe_cast(props);
  Schema.ReactElement.{
    key,
    value:
      `Text({
        style: ProtoEncoders.encodeStyleOptional(castProps),
        numberOfLines: castProps##numberOfLines,
        children: children |> Array.to_list,
      }),
  };
};

ComponentRegistry.add(~name, ~encoder);
