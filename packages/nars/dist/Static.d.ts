import * as React from "react";
import { ComponentConfig, ExtractInputPropType, LocalPropKey } from "nars-common";
import { server as Server } from "./NarsServer.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { Dict_t, Json_t } from "./shims/Js.shim";
export declare type ExtractPropTypes<T> = {
    [K in keyof T]: K extends string ? T[K] extends LocalPropKey<any, any, any> ? LocalProp : ExtractInputPropType<T[K]> : never;
};
export declare type ComponentDefinitions<T extends ComponentConfig> = {
    readonly [P in keyof T]: React.ComponentType<ExtractPropTypes<T[P]>>;
};
declare type Router<N> = (name: N | string, props: Dict_t<Json_t>, localProps: string[]) => React.ReactElement | undefined;
export declare function createRouter<T extends ComponentConfig>(config: T, definitions: ComponentDefinitions<T>): Router<keyof T & string>;
export declare function attatchListener<T>(server: Server, router: Router<T>): void;
export {};
//# sourceMappingURL=Static.d.ts.map