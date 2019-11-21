[@genType]
let name = "Text";

[@genType]
type props = {. "style": option(Style.t)};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (
      ~key,
      ~props as Instance.Props(props),
      ~registerCallback as _,
      ~children,
    ) =>
  Schema.ReactElement.{
    key,
    value:
      `Text({
        style: ProtoEncoders.encodeStyleOptional(props_unsafe_cast(props)),
        children: children |> Array.to_list,
      }),
  };

ComponentRegistry.add(~name, ~encoder);
