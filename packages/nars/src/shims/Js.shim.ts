export type Dict_t<T> = { [k: string]: T };

type JsonPrimitive = string | number | boolean | null;
export interface JsonMap {
  [member: string]: JsonPrimitive | JsonArray | JsonMap;
}
interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {}
export type Json_t = JsonPrimitive | JsonMap | JsonArray;

export type t = unknown;

type Method_Arity_X<A> = {
  tag: string;
  value: A;
};

export type Internal_meth<
  T extends Method_Arity_X<any>,
  Ret
> = T extends Method_Arity_X<infer A>
  ? A extends any[]
    ? (...args: A) => Ret
    : (_: A) => Ret
  : never;
