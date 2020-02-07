import * as React from "react";
import {
  Prop,
  ComponentConfig,
  Props,
  PropType,
  isSuccess,
  RPCInterface,
  LocalPropType,
} from "nars-common";
import { startListening, server as Server } from "./NarsServer.gen";
import { Dict_t } from "./shims/Js.shim";
import { t as JsValue_t } from "./JsValue.gen";
import {
  ExtractPropType,
  ExtractPropTypes,
  Decoder,
  ComponentDefinitions
} from "./StaticPropTypes";
import { toJs } from "./RpcInterface.gen";
import { requiredPropMissing, localPropMissing } from "./Error";
export { ComponentDefinitions } from "./StaticPropTypes";

function decodePropsObject<
  T extends Props,
  Mapper extends <K extends keyof T & string>(
    prop: T[K],
    value: JsValue_t,
    key: K
  ) => ExtractPropType<T, K>
>(f: Mapper, definition: T, props: Dict_t<JsValue_t>): ExtractPropTypes<T> {
  const result: Partial<ExtractPropTypes<T>> = {};
  for (const prop in definition) {
    const mapped = f(definition[prop], props[prop], prop);
    result[prop] = mapped;
  }
  return result as ExtractPropTypes<T>;
}

// Typescript lost its shit in this function. It is not properly checked.
// The types below are for information purposes only. No static guarantees given.
function getDecoder<T extends ComponentConfig, P extends keyof T>(
  config: T,
  component: P
): Decoder<T, P> {
  const definition = config[component];
  return (propsIn, localPropKeys, rpcInterface) => {
    return decodePropsObject((decoder: Prop, prop, propKey) => {
      switch (decoder.type) {
        case PropType.Input:
          if (!prop && decoder.optional) {
            return undefined;
          }
          const parsed = decoder.decode(prop, rpcInterface);
          if (isSuccess(parsed)) {
            return parsed.value;
          }
          throw requiredPropMissing(propKey, component);
          break;
        case PropType.Local:
          switch (decoder.localPropType) {
            case LocalPropType.Opaque:
              const index = localPropKeys.indexOf(propKey);
              if (index === -1) {
          throw localPropMissing(propKey, component);
          //throw ;
              } else {
                return {
                  key: propKey,
                };
              }
              break;
            case LocalPropType.Callable:
              return {
                key: propKey,
                arg: decoder.serverArg,
              };
          }
      }
    }, definition, propsIn);
  };
}

type Router<N> = (
  name: N | string,
  props: Dict_t<JsValue_t>,
  localProps: string[],
  rpcInterface: RPCInterface
) => React.ReactElement | undefined;

export function createRouter<T extends ComponentConfig>(
  config: T,
  definitions: ComponentDefinitions<T>
): Router<keyof T & string> {
  return function<K extends keyof T>(
    name: K,
    props: Dict_t<JsValue_t>,
    localProps: string[],
    rpcInterface: RPCInterface
  ): React.ReactElement | undefined {
    const decoder = getDecoder(config, name);
    const Component: ComponentDefinitions<T>[K] = definitions[name];
    const parsedProps = decoder(props, localProps, rpcInterface);
    if (parsedProps) {
      return React.createElement(
        Component as React.ComponentType<any>,
        parsedProps
      );
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
        componentDescription.localProps ? componentDescription.localProps : [],
        toJs(componentDescription.rpcInterface)
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
