import * as React from "react";
import { ComponentConfig, ExtractInputPropTypes } from "nars-common";
import { startListening, server as Server } from "./NarsServer.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { Dict_t, Json_t } from "./shims/Js.shim";

export type MapLocalProps<T> = { [K in keyof T]: LocalProp };

export type ComponentDefinitions<T extends ComponentConfig> = {
  readonly [P in keyof T]: React.ComponentType<{
    props: ExtractInputPropTypes<T[P]["props"]>;
    localProps: MapLocalProps<T[P]["localProps"]>;
  }>;
};

type Decoder<T extends ComponentConfig> = {
  readonly [P in keyof T]: (
    props: Dict_t<Json_t> | undefined,
    localPropKeys: string[]
  ) =>
    | {
        props: ExtractInputPropTypes<T[P]["props"]>;
        localProps: MapLocalProps<T[P]["localProps"]>;
      }
    | undefined;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

function createDecoders<T extends ComponentConfig>(config: T): Decoder<T> {
  let res = {} as Writeable<Decoder<T>>;
  for (const config_component in config) {
    const definition: T[Extract<keyof T, string>] = config[config_component];
    const component: keyof Writeable<Decoder<T>> = config_component;
    res[component] = (
      propsIn: Dict_t<Json_t> | undefined,
      localPropKeys: string[]
    ) => {
      type LocalProps = MapLocalProps<T[keyof T]["localProps"]>;
      type Props = ExtractInputPropTypes<T[keyof T]["props"]>;
      type ParsedProps = { props: Props; localProps: LocalProps };
      let parsedProps: Props = {} as Props;
      if (propsIn) {
        for (const propKey in propsIn) {
          const prop = propsIn[propKey];
          const decoder = definition.props[propKey];
          if (decoder) {
            parsedProps[propKey as keyof Props] = decoder.decode(prop);
          } else {
            console.warn("Unknown prop: " + propKey + " passed in");
          }
        }
        return {
          props: parsedProps,
          localProps: localPropKeys.reduce(
            (acc, key) => ({
              ...acc,
              [key]: { key: key },
            }),
            {} as LocalProps
          ),
        } as ParsedProps;
      } else {
        let allPropsOptional = true;
        for (const def in definition.props) {
          if (!definition.props[def].optional) {
            allPropsOptional = false;
          }
        }
        if (allPropsOptional) {
          return { props: {}, localProps: {} } as ParsedProps;
        } else {
          throw "Missing required props";
        }
      }
    };
  }
  return res as Decoder<T>;
}

type Router<N> = (
  name: N | string,
  props: Dict_t<Json_t>,
  localProps: string[]
) => React.ReactElement | undefined;

export function createRouter<
  T extends ComponentConfig,
  MaybeKey extends keyof T
>(config: T, definitions: ComponentDefinitions<T>): Router<MaybeKey> {
  const parsers = createDecoders(config);
  return (
    name: MaybeKey | string,
    props: Dict_t<Json_t> | undefined,
    localProps: string[]
  ) => {
    if (name in definitions && name in parsers) {
      const Component = definitions[name];
      const parsedProps = parsers[name](props, localProps);
      if (parsedProps) {
        return React.createElement(Component, parsedProps);
      }
    }
    return undefined;
  };
}

export function attatchListener<T>(server: Server, router: Router<T>): void {
  startListening(server, componentDescription => {
    if (componentDescription.name) {
      const element = router(
        componentDescription.name,
        componentDescription.props,
        componentDescription.localProps ? componentDescription.localProps : []
      );
      if (element) {
        return element;
      }
      return (null as unknown) as JSX.Element;
    } else {
      return (null as unknown) as JSX.Element;
    }
  });
}
