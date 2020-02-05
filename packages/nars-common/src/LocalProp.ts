export enum LocalPropType {
  Opaque,
  Callable,
}

export enum LocalPropRequired {
  Optional, 
  Required
};

export interface OpaqueLocalProp<
  Component,
  Key,
  IsRequired extends LocalPropRequired
> {
  component: Component;
  key: Key;
  isRequired: IsRequired;
  type: LocalPropType.Opaque;
}

export interface CallableLocalProp {
  config: {};
  type: LocalPropType.Callable;
}

export type LocalPropDefinition = OpaqueLocalProp<any, any, any> | CallableLocalProp;

export interface LocalProp<T extends LocalPropDefinition> {
  type: "local",
  definition: T
};
