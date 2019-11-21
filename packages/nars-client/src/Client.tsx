import * as React from "react";
import {
  ComponentConfig,
  ExtractInputPropType,
  LocalPropKey,
  PropTypes,
  LocalPropRequired,
} from "nars-common";
import { RemoteComponent } from "./RemoteComponent";
import { PropTypes as LocalPropTypes } from "./LocalPropTypes";

type ExtractLocalProp<
  Component,
  Key,
  IsRequired extends LocalPropRequired
> = Component extends keyof LocalPropTypes
  ? Key extends keyof LocalPropTypes[Component]
    ? IsRequired extends "optional"
      ? LocalPropTypes[Component][Key] | undefined
      : LocalPropTypes[Component][Key]
    : never
  : never;

export type ExtractLocalPropKeys<T extends PropTypes> = {
  [K in keyof T]: T[K] extends LocalPropKey<
    infer Component,
    infer Key,
    LocalPropRequired
  >
    ? ExtractLocalProp<Component, Key, any>
    : never;
}[keyof T];

export type ExtractLocalPropTypes<T extends PropTypes> = Pick<
  T,
  ExtractLocalPropKeys<T>
>;

export type ExtractPropTypes<T extends PropTypes> = {
  [K in keyof T]: K extends string
    ? T[K] extends LocalPropKey<infer Component, infer Key, infer IsRequired>
      ? ExtractLocalProp<Component, Key, IsRequired>
      : ExtractInputPropType<T[K]>
    : never;
};

export interface RemoteComponentProps<
  T extends ComponentConfig,
  P extends keyof T = keyof T
> {
  name: P extends string ? P : never;
  props: ExtractPropTypes<T[P extends string ? string & P : never]>;
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType;
}

export type Client<T extends ComponentConfig> = React.ComponentType<
  RemoteComponentProps<T, keyof T>
>;

type UnknownObject = { [k: string]: unknown };

type EncodedProps<T extends PropTypes> = {
  props: UnknownObject;
  localProps: ExtractLocalPropTypes<T>;
};

type Encoder<T extends ComponentConfig> = {
  readonly [P in keyof T]: (
    props: ExtractPropTypes<T[P]>
  ) => EncodedProps<T[P]>;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

function createEncoders<T extends ComponentConfig>(config: T): Encoder<T> {
  let res = {} as Writeable<Encoder<T>>;
  for (const component in config) {
    type ComponentProps = T[Extract<keyof T, string>] & PropTypes;
    const definition: ComponentProps = config[component];
    res[component] = propsIn => {
      let encodedProps = { props: {}, localProps: {} } as EncodedProps<
        ComponentProps
      >;
      for (const propKey in definition) {
        const propDefinition = definition[propKey];
        const prop = propsIn[propKey];
        if (!("local" in propDefinition)) {
          if (!prop && !propDefinition.optional) {
            throw `Prop '${propKey}' has not been passed to <${component} />`;
          }
          encodedProps.props[propKey] = propDefinition.encode(prop);
        } else {
          if (
            propDefinition.isRequired !== "optional" &&
            typeof prop === "undefined"
          ) {
            throw `Local Prop '${propKey}' has not been passed to <${component} />`;
          } else {
            const localPropKey = propKey as keyof EncodedProps<
              ComponentProps
            >["localProps"];
            encodedProps.localProps[
              localPropKey
            ] = (prop as unknown) as NonNullable<typeof prop>;
          }
        }
      }
      return encodedProps;
    };
  }
  return res;
}

export function createRemoteComponent<T extends ComponentConfig>(
  webSocket: WebSocket | string,
  config: T
) {
  const encoders = createEncoders(config);

  return ({
    name,
    props,
    LoadingComponent,
    ErrorComponent,
  }: RemoteComponentProps<T>) => {
    if (!(name in encoders)) {
      throw `Unknown component <${name} />`;
    }
    const encoded = React.useMemo(() => {
      return encoders[name](props);
    }, [name, props]);

    const encodedProps = encoded.props;
    const localProps = encoded.localProps;

    return (
      <RemoteComponent
        webSocket={webSocket}
        name={name}
        props={encodedProps}
        localProps={localProps}
        renderLoading={
          LoadingComponent ? () => <LoadingComponent /> : undefined
        }
        renderError={ErrorComponent ? () => <ErrorComponent /> : undefined}
      />
    );
  };
}
