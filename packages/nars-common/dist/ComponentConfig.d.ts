import { google } from "./Schema";
declare type Value = google.protobuf.Value;
declare const Value: typeof google.protobuf.Value;
declare type IValue = google.protobuf.IValue;
export declare type InputPropType<T> = {
    decode: (obj: IValue) => T | undefined;
    encode: (obj: T) => Value | undefined;
    optional?: boolean;
};
export interface LocalPropType<T> {
    readonly __phantom_type?: T;
}
export declare type InputPropTypes<T> = T extends {
    [K in keyof T]: T[K] extends InputPropType<infer ParsedType> ? InputPropType<ParsedType> : never;
} ? T : never;
export declare type LocalPropTypes<T> = T extends {
    [K in keyof T]: T[K] extends LocalPropType<infer ParsedType> ? LocalPropType<ParsedType> : never;
} ? T : never;
export declare type PropTypes<P, LP> = {
    props: InputPropTypes<P>;
    localProps?: LocalPropTypes<LP>;
};
export declare type ComponentConfig = {
    [k: string]: PropTypes<any, any>;
};
export declare type ExtractInputPropTypes<T> = {
    [K in keyof T]: T[K] extends InputPropType<infer ParsedType> ? ParsedType : never;
};
export declare type ExtractLocalPropTypes<T> = {
    [K in keyof T]: T[K] extends LocalPropType<infer ParsedType> ? ParsedType : never;
};
export declare const InputProp: {
    string: {
        decode: (obj: google.protobuf.IValue) => string | null | undefined;
        encode: (obj: string) => google.protobuf.Value;
    };
    optional: <T>({ encode, decode }: InputPropType<T>) => InputPropType<T | undefined>;
};
export {};
//# sourceMappingURL=ComponentConfig.d.ts.map