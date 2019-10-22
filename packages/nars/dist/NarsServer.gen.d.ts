import { Dict_t as Js_Dict_t } from '../src/shims/Js.shim';
import { Internal_meth as Js_Internal_meth } from '../src/shims/Js.shim';
import { Json_t as Js_Json_t } from '../src/shims/Js.shim';
import { reactElement as ReactReconciler_reactElement } from '../src/shims/ReactReconciler.shim';
export declare abstract class Socket_data {
    protected opaque: any;
}
export declare type Socket_t = {
    readonly on: Js_Internal_meth<{
        tag: "Arity_2";
        value: [string, (_1: Socket_data) => void];
    }, void>;
    binaryType: string;
    readonly send: Js_Internal_meth<{
        tag: "Arity_1";
        value: Socket_data;
    }, void>;
};
export declare type socket = Socket_t;
export declare type Server_t = {
    readonly on: Js_Internal_meth<{
        tag: "Arity_2";
        value: [string, (_1: socket) => void];
    }, void>;
};
export declare type server = Server_t;
export declare type componentSpec = {
    readonly name: string;
    readonly localProps: string[];
    readonly props: Js_Dict_t<Js_Json_t>;
};
export declare const startListening: (_1: server, _2: ((_1: componentSpec) => ReactReconciler_reactElement)) => void;
//# sourceMappingURL=NarsServer.gen.d.ts.map