import { Value, Struct } from "./struct_pb";
export declare const toValue: (value: unknown) => Value;
export declare const toStruct: (value: object) => Struct;
declare type UnknownObject = {
    [k: string]: DecodedValue;
};
interface DecodedValueArray extends Array<DecodedValue> {
}
declare type DecodedValue = undefined | null | number | string | boolean | UnknownObject | DecodedValueArray;
export declare const ofValue: (value: Value) => DecodedValue;
export declare const ofStruct: (struct: Struct | undefined) => {
    [k: string]: DecodedValue;
};
export {};
//# sourceMappingURL=StructCoders.d.ts.map