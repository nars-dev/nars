import { google_mirror as Schema } from "./Schema";
export declare const toValue: (value: unknown) => Schema.protobuf.IValue;
export declare const toStruct: (value: object) => Schema.protobuf.IStruct;
declare type UnknownObject = {
    [k: string]: DecodedValue;
};
interface DecodedValueArray extends Array<DecodedValue> {
}
declare type DecodedValue = undefined | null | number | string | boolean | UnknownObject | DecodedValueArray;
export declare const ofValue: (value: Schema.protobuf.IValue) => DecodedValue;
export declare const ofStruct: (struct: Schema.protobuf.IStruct) => {
    [k: string]: DecodedValue;
};
export {};
//# sourceMappingURL=StructCoders.d.ts.map