/*
[@genType]
module ValidatedProp = {
  [@genType]
  type t;
  [@genType]
  external ofChildren: array(React.element) => t = "%identity";
};
type opaqueProp;
type componentDefinition = {
  name: string,
  rnComponent: React.component(Js.Dict.t(ValidatedProp.t)),
  parseAndValidateProps:
    (~localProps: Js.Dict.t(opaqueProp), ~props: Js.Json.t) =>
    Belt.Result.t((Js.Dict.t(ValidatedProp.t), array(instance)), unit),
}
and instance =
  | Text(string)
  | Component({
      component: componentDefinition,
      props: Js.Json.t,
      localProps: array(string),
      children: array(instance),
    });

let extractLocalProps = (localPropKeys, localPropsDict) => {
  Array.map(
    key => {
      switch (Js.Dict.get(localPropsDict, key)) {
      | Some(prop) => (key, prop)
      | None => raise(Invalid_argument("Fatal Error: local prop not found"))
      }
    },
    localPropKeys,
  )
  |> Js.Dict.fromArray;
};

[@genType]
let rec renderInstance = (localProps: Js.Dict.t(opaqueProp), instance) => {
  switch (instance) {
  | Text(string) => React.string(string)
  | Component(componentInstance) =>
    let {rnComponent, parseAndValidateProps} = componentInstance.component;
    switch (
      parseAndValidateProps(
        ~localProps=extractLocalProps(componentInstance.localProps, localProps),
        ~props=componentInstance.props,
      )
    ) {
    | Belt.Result.Ok((props, children)) =>
      Js.Dict.set(
        props,
        "children",
        Array.map(renderInstance(localProps), children)
        |> ValidatedProp.ofChildren,
      );
      React.createElement(rnComponent, props);
    | Belt.Result.Error () =>
      raise(Invalid_argument("Fatal Error, cannot validate props"))
    };
  };
};
*/
