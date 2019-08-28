import * as React from "react";
import { LocalProp, ComponentConfig, ExtractInputPropTypes, Schema } from "nars-common";
import { Server } from "ws";
export declare type MapLocalProps<T> = {
    [K in keyof T]: LocalProp;
};
export declare type ComponentDefinitions<T extends ComponentConfig> = {
    readonly [P in keyof T]: React.ComponentType<ExtractInputPropTypes<T[P]["props"]> & MapLocalProps<T[P]["localProps"]>>;
};
declare type Router<N> = (name: N | string, props: Schema.google.protobuf.IStruct | null | undefined, localProps: string[]) => React.ReactElement | undefined;
export declare function createRouter<T extends ComponentConfig, MaybeKey extends keyof T>(config: T, definitions: ComponentDefinitions<T>): Router<MaybeKey>;
export declare function attatchListener<T>(server: Server, router: Router<T>): void;
export {};
//# sourceMappingURL=Static.d.ts.map