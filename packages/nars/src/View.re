[@genType]
let name = "View";

[@genType]
type props = {. "style": option(Style.t)};

external props_unsafe_cast: Js.t('a) => props = "%identity";

let encoder =
    (
      ~key,
      ~props as Instance.Props(props),
      ~rpcInterface as _,
      ~children,
    ) => {
  let props = props_unsafe_cast(props);
  Schema.ReactElement.{
    key,
    value:
      `View(
        Schema.View.{
          style: ProtoEncoders.encodeStyleOptional(props),
          children: Array.to_list(children),
        },
      ),
  };
};

ComponentRegistry.add(~name, ~encoder);
