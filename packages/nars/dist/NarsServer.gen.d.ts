/// <reference types="react" />
import { Messages_v1_componentDescription as NarsCommon_Messages_v1_componentDescription } from '../src/shims/NarsCommon.shim';
import { Server_t as Ws_Server_t } from './Ws.gen';
export declare type componentDescription = NarsCommon_Messages_v1_componentDescription;
export declare type t = Ws_Server_t;
export declare const startListening: (_1: t, _2: {
    readonly render: ((_1: {
        readonly componentDescription: componentDescription;
    }) => JSX.Element);
}) => void;
//# sourceMappingURL=NarsServer.gen.d.ts.map