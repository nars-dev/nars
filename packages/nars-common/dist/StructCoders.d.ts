import { google } from "./Schema";
export declare const toValue: (value: unknown) => google.protobuf.IValue;
export declare const toStruct: (value: object) => google.protobuf.IStruct;
declare type UnknownObject = {
    [k: string]: DecodedValue;
};
interface DecodedValueArray extends Array<DecodedValue> {
}
declare type DecodedValue = undefined | null | number | string | boolean | UnknownObject | DecodedValueArray;
export declare const ofValue: (value: google.protobuf.IValue) => DecodedValue;
export declare const ofStruct: (struct: google.protobuf.IStruct) => {
    [k: string]: DecodedValue;
};
export {};
//# sourceMappingURL=StructCoders.d.ts.map