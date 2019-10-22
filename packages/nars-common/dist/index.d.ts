export declare type InputPropType<T> = {
    decode: (obj: unknown) => T | undefined;
    encode: (obj: T) => unknown | undefined;
    optional?: boolean;
};
export interface LocalProp<Component, Key> {
    component: Component;
    key: Key;
}
export declare type InputPropTypes<T> = T extends {
    [K in keyof T]: T[K] extends InputPropType<infer ParsedType> ? InputPropType<ParsedType> : never;
} ? T : never;
export declare type LocalPropTypes<T> = T extends {
    [K in keyof T]: T[K] extends LocalProp<infer Component, infer Key> ? LocalProp<Component, Key> : never;
} ? T : never;
export declare type PropTypes<P, LP> = {
    props: InputPropTypes<P>;
    localProps: LocalPropTypes<LP>;
};
export declare type ComponentConfig = {
    [k: string]: PropTypes<any, any>;
};
export declare type ExtractInputPropTypes<T> = {
    [K in keyof T]: T[K] extends InputPropType<infer ParsedType> ? ParsedType : never;
};
export declare const InputProp: {
    string: {
        decode: (obj: unknown) => string;
        encode: (obj: string) => string;
    };
    optional: <T>({ encode, decode, }: InputPropType<T>) => InputPropType<T | undefined>;
};
export declare function localProp<A extends string, B extends string>(a: A, b: B): LocalProp<A, B>;
//# sourceMappingURL=index.d.ts.map