import * as React from "react";
import {
  ComponentConfig,
  ExtractInputPropType,
  LocalPropType,
  Props,
  OpaqueLocalProp,
  isSuccess,
  PropType,
  LocalProp,
  InputProp,
  CallableLocalProp,
} from "nars-common";
import {
  RemoteComponent,
  useWebSocket,
  PropEncoder,
  PropsObject,
} from "./RemoteComponent";
import { PropTypes as LocalPropTypes } from "./LocalPropTypes";
import { SocketLike } from "./SocketLike";
import {
  unknownComponent,
  requiredPropMissing,
  badPropType,
  localPropMissing,
} from "./Error";

// Extract the type visible for the user from the config
type ExtractLocalPropType<T> = T extends OpaqueLocalProp<
  infer Component,
  infer Key,
  infer IsRequired
>
  ? Component extends keyof LocalPropTypes
    ? Key extends keyof LocalPropTypes[Component]
      ? IsRequired extends "optional"
        ? LocalPropTypes[Component][Key] | undefined
        : LocalPropTypes[Component][Key]
      : never
    : never
  : T extends CallableLocalProp<infer LocalArg, infer ServerArg>
  ? (localArg: LocalArg, remoteArg: ServerArg) => void
  : never;

// This type extracts local props from a props object
export type ExtractLocalPropKeys<T extends Props> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends LocalProp ? string : never;
  }[keyof T]
>;

export type ExtractPropTypes<T extends Props> = {
  [K in keyof T]: K extends string
    ? T[K] extends InputProp<any>
      ? ExtractInputPropType<T[K]>
      : ExtractLocalPropType<T[K]>
    : never;
};

export interface RemoteComponentProps<
  T extends ComponentConfig,
  P extends keyof T
> {
  name: P;
  props: ExtractPropTypes<T[P]>;
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType;
}

export type Client<T extends ComponentConfig> = React.ComponentType<
  RemoteComponentProps<T, keyof T>
>;

function getInputPropEncoder<T extends ComponentConfig, P extends keyof T>(
  config: T,
  component: P,
  propsIn: ExtractPropTypes<T[P]>
): PropEncoder {
  if (!(component in config)) {
    throw unknownComponent(component);
  }
  const definition: T[P] & Props = config[component];
  return rpcInterface => {
    let encodedProps: PropsObject = {};
    for (const propKey in definition) {
      const propDefinition = definition[propKey];
      const prop = propsIn[propKey];
      switch (propDefinition.type) {
        case PropType.Input:
          if (!propsIn.hasOwnProperty(propKey) && !propDefinition.optional) {
            throw requiredPropMissing(propKey, component);
          }
          const result = propDefinition.encode(prop, rpcInterface);
          if (isSuccess(result)) {
            encodedProps[propKey] = result.value;
          } else {
            throw badPropType(propKey, prop, component);
          }
          break;
      }
    }
    return encodedProps;
  };
}

function encodeLocalProps<T extends ComponentConfig, P extends keyof T>(
  config: T,
  component: P,
  propsIn: ExtractPropTypes<T[P]>
): PropsObject {
  if (!(component in config)) {
    throw unknownComponent(component);
  }
  const definition: T[P] & Props = config[component];
  let encodedProps: PropsObject = {};
  for (const propKey in definition) {
    const propDefinition = definition[propKey];
    const prop = propsIn[propKey];
    switch (propDefinition.type) {
      case PropType.Local:
        const localPropKey = propKey;
        encodedProps[localPropKey] = prop;
        if (
          propDefinition.localPropType === LocalPropType.Opaque &&
          propDefinition.isRequired !== "optional" &&
          typeof prop === "undefined"
        ) {
          throw localPropMissing(propKey, component);
        }
        break;
    }
  }
  return encodedProps;
}

function createRemoteComponentWithSocketLikeOrUrl<
  T extends ComponentConfig,
  P extends keyof T
>(socketLikeOrUrl: SocketLike | string, config: T) {
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
  }: RemoteComponentProps<T, P>) => {
    const webSocket = useSocketLikeOrUrl();
    const localProps = encodeLocalProps(config, name, props);
    const encoder = getInputPropEncoder(config, name, props);

    return (
      <RemoteComponent
        webSocket={webSocket}
        name={String(name)}
        inputProps={encoder}
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
  const comp = ({
    name,
    props,
    LoadingComponent,
    ErrorComponent,
    webSocket,
  }: RemoteComponentProps<T, keyof T> & { webSocket: SocketLike }) => {
    const localProps = encodeLocalProps(config, name, props);
    const encoder = getInputPropEncoder(config, name, props);
    return (
      <RemoteComponent
        webSocket={webSocket}
        name={String(name)}
        inputProps={encoder}
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
