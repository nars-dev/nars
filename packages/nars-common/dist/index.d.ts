export interface InputPropType<T> {
    decode: (obj: unknown) => T | undefined;
    encode: (obj: T) => unknown | undefined;
    optional?: boolean;
}
export interface LocalPropKey<Component, Key> {
    component: Component;
    key: Key;
    local: true;
}
export declare type PropType = LocalPropKey<any, any> | InputPropType<any>;
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
export declare function localProp<A extends string, B extends string>(a: A, b: B): LocalPropKey<A, B>;
//# sourceMappingURL=index.d.ts.map