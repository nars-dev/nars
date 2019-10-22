export declare type Dict_t<T> = {
    [k: string]: T;
};
declare type JsonPrimitive = string | number | boolean | null;
export interface JsonMap {
    [member: string]: JsonPrimitive | JsonArray | JsonMap;
}
interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {
}
export declare type Json_t = JsonPrimitive | JsonMap | JsonArray;
export declare type t = unknown;
declare type Method_Arity_X<A> = {
    tag: string;
    value: A;
};
export declare type Internal_meth<T extends Method_Arity_X<any>, Ret> = T extends Method_Arity_X<infer A> ? A extends any[] ? (...args: A) => Ret : (_: A) => Ret : never;
export {};
//# sourceMappingURL=Js.shim.d.ts.map