import * as React from "react";
import { ComponentConfig, ExtractInputPropType, LocalPropKey, PropTypes, LocalPropRequired } from "nars-common";
import { SocketLike } from "./RemoteComponent";
import { PropTypes as LocalPropTypes } from "./LocalPropTypes";
declare type ExtractLocalProp<Component, Key, IsRequired extends LocalPropRequired> = Component extends keyof LocalPropTypes ? Key extends keyof LocalPropTypes[Component] ? IsRequired extends "optional" ? LocalPropTypes[Component][Key] | undefined : LocalPropTypes[Component][Key] : never : never;
export declare type ExtractLocalPropKeys<T extends PropTypes> = {
    [K in keyof T]: T[K] extends LocalPropKey<infer Component, infer Key, LocalPropRequired> ? ExtractLocalProp<Component, Key, any> : never;
}[keyof T];
export declare type ExtractLocalPropTypes<T extends PropTypes> = Pick<T, ExtractLocalPropKeys<T>>;
export declare type ExtractPropTypes<T extends PropTypes> = {
    [K in keyof T]: K extends string ? T[K] extends LocalPropKey<infer Component, infer Key, infer IsRequired> ? ExtractLocalProp<Component, Key, IsRequired> : ExtractInputPropType<T[K]> : never;
};
export interface RemoteComponentProps<T extends ComponentConfig, P extends keyof T = keyof T> {
    name: P extends string ? P : never;
    props: ExtractPropTypes<T[P extends string ? string & P : never]>;
    LoadingComponent?: React.ComponentType;
    ErrorComponent?: React.ComponentType;
}
export declare type Client<T extends ComponentConfig> = React.ComponentType<RemoteComponentProps<T, keyof T>>;
export declare function createRemoteComponentWithUrl<T extends ComponentConfig>(url: string, config: T): ({ name, props, LoadingComponent, ErrorComponent, }: RemoteComponentProps<T, keyof T>) => JSX.Element;
export declare function createRemoteComponentWithWebSocket<T extends ComponentConfig>(webSocket: SocketLike, config: T): ({ name, props, LoadingComponent, ErrorComponent, }: RemoteComponentProps<T, keyof T>) => JSX.Element;
export declare function createRemoteComponent<T extends ComponentConfig>(config: T): ({ name, props, LoadingComponent, ErrorComponent, webSocket, }: RemoteComponentProps<T, keyof T> & {
    webSocket: SocketLike;
}) => JSX.Element;
export {};
//# sourceMappingURL=Client.d.ts.map