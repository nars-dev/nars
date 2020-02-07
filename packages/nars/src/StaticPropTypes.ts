import {
  ComponentConfig,
  Props,
  ExtractInputPropType,
  OpaqueLocalProp,
  CallableLocalProp as CallableLocalPropConfig,
  RPCInterface,
} from "nars-common";
import { Dict_t } from "./shims/Js.shim";
import { t as JsValue_t } from "./JsValue.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { ClientSideCallback } from "./Callback";

export type ExtractPropType<
  T extends Props,
  K extends keyof T
> = T[K] extends OpaqueLocalProp<any, any, any>
  ? LocalProp
  : T[K] extends CallableLocalPropConfig<infer LocalArg, infer ServerArg>
  ? ClientSideCallback<LocalArg, ServerArg>
  : ExtractInputPropType<T[K]>;

export type ExtractPropTypes<T extends Props> = {
  [K in keyof T]: ExtractPropType<T, K>;
};

export type ComponentDefinitions<T extends ComponentConfig> = {
  readonly [P in keyof T]: React.ComponentType<ExtractPropTypes<T[P]>>;
};

export type Decoder<T extends ComponentConfig, P extends keyof T> = (
  props: Dict_t<JsValue_t>,
  localPropKeys: string[],
  rpcInterface: RPCInterface
) => ExtractPropTypes<T[P]>;
