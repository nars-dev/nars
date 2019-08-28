import * as React from "react";
import {
  ComponentConfig,
  ExtractInputPropTypes,
  ExtractLocalPropTypes
} from "nars-common";
import { RemoteComponent } from "./RemoteComponent";

type RawPropTypes<
  T extends ComponentConfig,
  P extends keyof T
> = ExtractInputPropTypes<T[P]["props"]> &
  ExtractLocalPropTypes<T[P]["localProps"]>;

interface RemoteComponentProps<
  T extends ComponentConfig,
  P extends keyof T = keyof T
> {
  name: P extends string ? P : never;
  props: RawPropTypes<T, P>;
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType;
}

type Client<T extends ComponentConfig> = React.ComponentType<
  RemoteComponentProps<T, keyof T>
>;

type UnknownObject = { [k: string]: unknown };

type EncodedProps = { props: UnknownObject; localProps: UnknownObject };

type Encoder<T extends ComponentConfig> = {
  readonly [P in keyof T]: (
    props: RawPropTypes<T, P>
  ) => EncodedProps | undefined;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

function createEncoders<T extends ComponentConfig>(config: T): Encoder<T> {
  let res = {} as Writeable<Encoder<T>>;
  for (const component in config) {
    const definition = config[component];
    res[component] = (propsIn: RawPropTypes<any, any>) => {
      let encodedProps = { props: {}, localProps: {} } as EncodedProps;
      for (const propKey in definition.props) {
        const encoded = definition.props[propKey].encode(propsIn[propKey]);
        if (encoded) {
          encodedProps.props[propKey] = encoded;
        } else {
          throw "Bad prop type in " + component;
        }
      }
      if (definition.localProps) {
        for (const propKey in definition.localProps) {
          encodedProps.localProps[propKey] = propsIn[propKey];
        }
      }
      return encodedProps;
    };
  }
  return res as Encoder<T>;
}

export function createRemoteComponent<T extends ComponentConfig>(
  webSocket: WebSocket | string,
  config: T
) {
  const encoders = createEncoders(config);
  return (({
    name,
    props,
    LoadingComponent,
    ErrorComponent
  }: RemoteComponentProps<T>) => {
    if (!(name in encoders)) {
      throw "Unknown component " + name;
    }
    const encoded = React.useMemo(() => {
      return encoders[name](props);
    }, [name, props]);

    if (!encoded) {
      throw "Unknown component named " + name;
    }
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
  }) as Client<T>;
}
