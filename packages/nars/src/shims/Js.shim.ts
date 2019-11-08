export type Dict_t<T> = { [k: string]: T };

type JsonPrimitive = string | number | boolean | null;
export interface JsonMap {
  [member: string]: JsonPrimitive | JsonArray | JsonMap;
}
interface JsonArray extends Array<JsonPrimitive | JsonArray | JsonMap> {}
export type Json_t = JsonPrimitive | JsonMap | JsonArray;

export type t = unknown;
