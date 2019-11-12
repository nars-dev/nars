export interface InputPropType<T> {
    decode: (obj: unknown) => T | undefined;
    encode: (obj: T) => unknown | undefined;
    optional?: boolean;
}
export declare type LocalPropRequired = "optional" | "required";
export interface LocalPropKey<Component, Key, IsRequired extends LocalPropRequired> {
    component: Component;
    key: Key;
    local: true;
    isRequired: IsRequired;
}
export declare type PropType = LocalPropKey<any, any, LocalPropRequired> | InputPropType<any>;
export declare type PropTypes = {
    [K: string]: PropType;
};
export declare type ComponentConfig = {
    [k: string]: PropTypes;
};
export declare type ExtractInputPropType<T> = T extends InputPropType<infer ParsedType> ? ParsedType : never;
export declare const InputProp: {
    string: {
        decode: (obj: unknown) => string;
        encode: (obj: string) => string;
    };
    optional: <T>({ encode, decode, }: InputPropType<T>) => InputPropType<T | undefined>;
};
export declare function localProp<IsRequired extends LocalPropRequired, A extends string, B extends string>(isRequired: IsRequired, a: A, b: B): LocalPropKey<A, B, IsRequired>;
//# sourceMappingURL=index.d.ts.map