import * as React from "react";
import { ComponentConfig, ExtractInputPropTypes, LocalProp } from "nars-common";
import { PropTypes as LocalPropTypes } from "./LocalPropTypes";
export declare type ExtractLocalPropTypes<T> = {
    [K in keyof T]: T[K] extends LocalProp<infer Component, infer Key> ? Component extends keyof LocalPropTypes ? Key extends keyof LocalPropTypes[Component] ? LocalPropTypes[Component][Key] : never : never : never;
};
export declare type RawPropTypes<T extends ComponentConfig, P extends keyof T> = {
    props: ExtractInputPropTypes<T[P]["props"]>;
    localProps: ExtractLocalPropTypes<T[P]["localProps"]>;
};
export interface RemoteComponentProps<T extends ComponentConfig, P extends keyof T = keyof T> {
    name: P extends string ? P : never;
    props: RawPropTypes<T, P>;
    LoadingComponent?: React.ComponentType;
    ErrorComponent?: React.ComponentType;
}
export declare type Client<T extends ComponentConfig> = React.ComponentType<RemoteComponentProps<T, keyof T>>;
export declare function createRemoteComponent<T extends ComponentConfig>(webSocket: WebSocket | string, config: T): React.ComponentType<RemoteComponentProps<T, keyof T>>;
//# sourceMappingURL=Client.d.ts.map