import * as React from "react";
import {
  LocalProp,
  ComponentConfig,
  ExtractInputPropTypes,
  Schema
} from "nars-common";
import { startListening } from "./NarsServer";
import { Server } from "ws";

export type MapLocalProps<T> = { [K in keyof T]: LocalProp };

export type ComponentDefinitions<T extends ComponentConfig> = {
  readonly [P in keyof T]: React.ComponentType<
    ExtractInputPropTypes<T[P]["props"]> & MapLocalProps<T[P]["localProps"]>
  >;
};

type IStruct = Schema.google.protobuf.IStruct;

type Decoder<T extends ComponentConfig> = {
  readonly [P in keyof T]: (
    props: IStruct | null | undefined,
    localPropKeys: string[]
  ) =>
    | ExtractInputPropTypes<T[P]["props"]> & MapLocalProps<T[P]["localProps"]>
    | undefined;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

/* TODO: TEST */
function createDecoders<T extends ComponentConfig>(config: T): Decoder<T> {
  let res = {} as Writeable<Decoder<T>>;
  for (const component in config) {
    const definition: T[Extract<keyof T, string>] = config[component];
    // @ts-ignore
    res[component] = (
      propsIn: IStruct | null | undefined,
      localPropKeys: string[]
    ) => {
      let parsedProps: { [key: string]: unknown } = {};
      if (propsIn && propsIn.fields) {
        for (const propKey in propsIn.fields) {
          const prop = propsIn.fields[propKey];
          const decoder = definition.props[propKey];
          if (decoder) {
            parsedProps[propKey] = decoder.decode(prop);
          } else {
            console.warn("Unknown prop: " + propKey + " passed in");
          }
        }
        localPropKeys.forEach(localPropKey => {
          parsedProps[localPropKey] = { key: localPropKey };
        });
        return parsedProps;
      } else {
        let allPropsOptional = true;
        for (const def in definition.props) {
          if (!definition.props[def].optional) {
            allPropsOptional = false;
          }
        }
        if (allPropsOptional) {
          return {};
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
  props: Schema.google.protobuf.IStruct | null | undefined,
  localProps: string[]
) => React.ReactElement | undefined;

export function createRouter<
  T extends ComponentConfig,
  MaybeKey extends keyof T
>(config: T, definitions: ComponentDefinitions<T>): Router<MaybeKey> {
  const parsers = createDecoders(config);
  return (
    name: MaybeKey | string,
    props: Schema.google.protobuf.IStruct | null | undefined,
    localProps: string[]
  ) => {
    if (name in definitions && name in parsers) {
      const Component = definitions[name];
      const parsedProps = parsers[name](props, localProps);
      return React.createElement(Component, parsedProps);
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
      /* TODO: Fix the type definition there */
      return (null as unknown) as JSX.Element;
    }
  });
}
