import * as React from "react";
import { ComponentConfig, ExtractInputPropTypes } from "nars-common";
import { server as Server } from "./NarsServer.gen";
import { t as LocalProp } from "./LocalProp.gen";
import { Dict_t, Json_t } from "./shims/Js.shim";
export declare type MapLocalProps<T> = {
    [K in keyof T]: LocalProp;
};
export declare type ComponentDefinitions<T extends ComponentConfig> = {
    readonly [P in keyof T]: React.ComponentType<{
        props: ExtractInputPropTypes<T[P]["props"]>;
        localProps: MapLocalProps<T[P]["localProps"]>;
    }>;
};
declare type Router<N> = (name: N | string, props: Dict_t<Json_t>, localProps: string[]) => React.ReactElement | undefined;
export declare function createRouter<T extends ComponentConfig, MaybeKey extends keyof T>(config: T, definitions: ComponentDefinitions<T>): Router<MaybeKey>;
export declare function attatchListener<T>(server: Server, router: Router<T>): void;
export {};
//# sourceMappingURL=Static.d.ts.map