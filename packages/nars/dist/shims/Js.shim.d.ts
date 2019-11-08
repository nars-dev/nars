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
export {};
//# sourceMappingURL=Js.shim.d.ts.map