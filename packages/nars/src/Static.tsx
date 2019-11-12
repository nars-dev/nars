import * as React from "react";
import {
  ComponentConfig,
  ExtractInputPropType,
  LocalPropKey,
  PropType,
} from "nars-common";
import { startListening, server as Server } from "./NarsServer.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { Dict_t, Json_t } from "./shims/Js.shim";

export type ExtractPropTypes<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends LocalPropKey<any, any, any>
      ? LocalProp
      : ExtractInputPropType<T[K]>
    : never;
};

export type ComponentDefinitions<T extends ComponentConfig> = {
  readonly [P in keyof T]: React.ComponentType<ExtractPropTypes<T[P]>>;
};

type Decoder<T extends ComponentConfig> = {
  readonly [P in keyof T]: (
    props: Dict_t<Json_t> | undefined,
    localPropKeys: string[]
  ) => ExtractPropTypes<T[P]>;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

function createDecoders<T extends ComponentConfig>(config: T): Decoder<T> {
  let res = {} as Writeable<Decoder<T>>;
  for (const config_component in config) {
    const definition: T[Extract<keyof T, string>] = config[config_component];
    const component: keyof Writeable<Decoder<T>> = config_component;
    res[component] = (
      propsIn: Dict_t<Json_t> | undefined = {},
      localPropKeys: string[]
    ) => {
      type Props = ExtractPropTypes<T[keyof T]>;
      const parsedProps = {} as Props;
      for (const propKey in definition) {
        const prop = propsIn[propKey];
        const decoder: PropType = definition[propKey];
        if (!("local" in decoder)) {
          if (prop) {
            parsedProps[propKey as keyof Props] = decoder.decode(prop);
          } else if (!decoder.optional) {
            throw `Required prop: ${propKey} has not been passed to component ${component}`;
          }
        } else {
          const index = localPropKeys.indexOf(propKey);
          if (index === -1) {
            throw "Local Prop is not found";
          } else {
            parsedProps[propKey as keyof Props] = {
              key: propKey,
            } as Props[keyof Props];
          }
        }
      }
      return parsedProps;
    };
  }
  return res as Decoder<T>;
}

type Router<N> = (
  name: N | string,
  props: Dict_t<Json_t>,
  localProps: string[]
) => React.ReactElement | undefined;

export function createRouter<T extends ComponentConfig>(
  config: T,
  definitions: ComponentDefinitions<T>
): Router<keyof T & string> {
  const parsers = createDecoders(config);
  return function<K extends keyof T>(
    name: K,
    props: Dict_t<Json_t> | undefined,
    localProps: string[]
  ): React.ReactElement | undefined {
    if (name in definitions && name in parsers) {
      const Component: ComponentDefinitions<T>[K] = definitions[name];
      const parsedProps = parsers[name](props, localProps);
      if (parsedProps) {
        return React.createElement(
          Component as React.ComponentType<any>,
          parsedProps
        );
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
