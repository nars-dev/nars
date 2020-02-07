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
import { requiredPropMissing, badPropType, localPropMissing } from "./Error";

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

interface RemoteComponentProps {
  LoadingComponent?: React.ComponentType;
  ErrorComponent?: React.ComponentType;
}

function getInputPropEncoder<T extends Props>(
  config: T & Props,
  component: string,
  propsIn: ExtractPropTypes<T>
): PropEncoder {
  return rpcInterface => {
    let encodedProps: PropsObject = {};
    for (const propKey in config) {
      const propDefinition = config[propKey];
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

function encodeLocalProps<T extends Props>(
  config: T & Props,
  component: string,
  propsIn: ExtractPropTypes<T>
): PropsObject {
  let encodedProps: PropsObject = {};
  for (const propKey in config) {
    const propDefinition = config[propKey];
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

export type Components<T extends ComponentConfig> = {
  [P in keyof T]: React.ComponentType<
    ExtractPropTypes<T[P]> & RemoteComponentProps
  >;
};

function createRemoteComponentWithSocketLikeOrUrl<T extends ComponentConfig>(
  socketLikeOrUrl: SocketLike | string,
  config: T
): Components<T> {
  const components = {} as Components<T>;
  const useSocketLikeOrUrl = () => {
    return typeof socketLikeOrUrl === "string"
      ? useWebSocket(socketLikeOrUrl, true)
      : () => socketLikeOrUrl;
  };
  for (const componentName in config) {
    const Component: React.ComponentType<
      ExtractPropTypes<T[typeof componentName]> & RemoteComponentProps
    > = props => {
      const webSocket = useSocketLikeOrUrl();
      const localProps = encodeLocalProps(
        config[componentName],
        componentName,
        props
      );
      const encoder = getInputPropEncoder(
        config[componentName],
        componentName,
        props
      );
      const { ErrorComponent, LoadingComponent } = props;

      return (
        <RemoteComponent
          webSocket={webSocket}
          name={String(componentName)}
          inputProps={encoder}
          localProps={localProps}
          renderLoading={
            LoadingComponent ? () => <LoadingComponent /> : undefined
          }
          renderError={ErrorComponent ? () => <ErrorComponent /> : undefined}
        />
      );
    };
    Component.displayName = componentName;
    components[componentName] = Component;
  }
  return components;
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

export type ComponentsWithWebSocket<T extends ComponentConfig> = {
  [P in keyof T]: React.ComponentType<
    ExtractPropTypes<T[P]> & RemoteComponentProps & { webSocket: SocketLike }
  >;
};

export function createRemoteComponent<T extends ComponentConfig>(
  config: T
): ComponentsWithWebSocket<T> {
  const components = {} as ComponentsWithWebSocket<T>;
  for (const componentName in config) {
    const Component: ComponentsWithWebSocket<
      T
    >[typeof componentName] = props => {
      const { ErrorComponent, LoadingComponent, webSocket } = props;
      const localProps = encodeLocalProps(
        config[componentName],
        componentName,
        props
      );
      const encoder = getInputPropEncoder(
        config[componentName],
        componentName,
        props
      );
      return (
        <RemoteComponent
          webSocket={webSocket}
          name={componentName}
          inputProps={encoder}
          localProps={localProps}
          renderLoading={
            LoadingComponent ? () => <LoadingComponent /> : undefined
          }
          renderError={ErrorComponent ? () => <ErrorComponent /> : undefined}
        />
      );
    };
    Component.displayName = componentName;
    components[componentName] = Component;
  }
  return components;
}
