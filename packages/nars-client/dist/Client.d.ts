import * as React from 'react';
import { ComponentConfig, ExtractInputPropTypes, ExtractLocalPropTypes } from 'nars-common';
declare type RawPropTypes<T extends ComponentConfig, P extends keyof T> = ExtractInputPropTypes<T[P]['props']> & ExtractLocalPropTypes<T[P]['localProps']>;
interface RemoteComponentProps<T extends ComponentConfig, P extends keyof T = keyof T> {
    name: P extends string ? P : never;
    props: RawPropTypes<T, P>;
    LoadingComponent?: React.ComponentType;
    ErrorComponent?: React.ComponentType;
}
export declare function createRemoteComponent<T extends ComponentConfig>(webSocket: WebSocket | string, config: T): React.ComponentType<RemoteComponentProps<T, keyof T>>;
export {};
//# sourceMappingURL=Client.d.ts.map