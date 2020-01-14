import * as React from "react";
import {
  ComponentConfig,
  ExtractInputPropType,
  LocalPropKey,
  PropTypes,
  LocalPropRequired,
} from "nars-common";
import { RemoteComponent, useWebSocket, SocketLike } from "./RemoteComponent";
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
    oldProps: EncodedProps<any> | undefined,
    props: ExtractPropTypes<T[P]>
  ) => EncodedProps<T[P]>;
};

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

function createEncoders<T extends ComponentConfig>(config: T): Encoder<T> {
  let res = {} as Writeable<Encoder<T>>;
  for (const component in config) {
    type ComponentProps = T[Extract<keyof T, string>] & PropTypes;
    const definition: ComponentProps = config[component];
    res[component] = (prevProps, propsIn) => {
      let propsChanged = prevProps === undefined;
      let localPropsChanged = prevProps === undefined;
      let encodedProps = { props: {}, localProps: {} } as EncodedProps<
        ComponentProps
      >;
      for (const propKey in definition) {
        const propDefinition = definition[propKey];
        const prop = propsIn[propKey];
        if (!("local" in propDefinition)) {
          if (!propsIn.hasOwnProperty(propKey) && !propDefinition.optional) {
            throw `Required prop '${propKey}' has not been passed to <${component} />`;
          }
          encodedProps.props[propKey] = propDefinition.encode(prop);
          if (!propsChanged && prevProps) {
            propsChanged =
              prevProps.props[propKey] !== encodedProps.props[propKey];
          }
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
            if (!localPropsChanged && prevProps) {
              localPropsChanged =
                localPropsChanged[localPropKey] !==
                encodedProps.localProps[localPropKey];
            }
          }
        }
      }
      return {
        props: propsChanged ? encodedProps.props : prevProps!.props,
        localProps: localPropsChanged
          ? encodedProps.localProps
          : prevProps!.localProps,
      };
    };
  }
  return res;
}

function useMemoizedProps<T extends ComponentConfig>(
  name: RemoteComponentProps<T>["name"],
  encoders: Encoder<T>,
  props: RemoteComponentProps<T>["props"]
) {
  if (!(name in encoders)) {
    throw `Unknown component <${name} />`;
  }
  const prevEncodedProps = React.useRef<any>(undefined);
  const encoded = encoders[name](prevEncodedProps.current, props);
  React.useEffect(() => {
    prevEncodedProps.current = encoded;
  });
  return encoded;
}

function createRemoteComponentWithSocketLikeOrUrl<T extends ComponentConfig>(
  socketLikeOrUrl: SocketLike | string,
  config: T
) {
  const encoders = createEncoders(config);
  const useSocketLikeOrUrl = () => {
    return typeof socketLikeOrUrl === "string"
      ? useWebSocket(socketLikeOrUrl, true)
      : () => socketLikeOrUrl;
  };
  const comp = ({
    name,
    props,
    LoadingComponent,
    ErrorComponent,
  }: RemoteComponentProps<T>) => {
    const webSocket = useSocketLikeOrUrl();
    const encoded = useMemoizedProps(name, encoders, props);

    return (
      <RemoteComponent
        webSocket={webSocket}
        name={name}
        props={encoded.props}
        localProps={encoded.localProps}
        renderLoading={
          LoadingComponent ? () => <LoadingComponent /> : undefined
        }
        renderError={ErrorComponent ? () => <ErrorComponent /> : undefined}
      />
    );
  };
  comp.displayName = "RemoteComponent";
  return comp;
}

export function createRemoteComponentWithUrl<T extends ComponentConfig>(
  url: string,
  config: T
) {
  return createRemoteComponentWithSocketLikeOrUrl(url, config);
}

export function createRemoteComponentWithWebSocket<T extends ComponentConfig>(
  webSocket: SocketLike,
  config: T
) {
  return createRemoteComponentWithSocketLikeOrUrl(webSocket, config);
}

export function createRemoteComponent<T extends ComponentConfig>(config: T) {
  const encoders = createEncoders(config);
  const comp = ({
    name,
    props,
    LoadingComponent,
    ErrorComponent,
    webSocket,
  }: RemoteComponentProps<T> & { webSocket: SocketLike }) => {
    const encoded = useMemoizedProps(name, encoders, props);

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
  comp.displayName = "RemoteComponent";
  return comp;
}
