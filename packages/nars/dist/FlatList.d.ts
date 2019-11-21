import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import { t as LocalProp } from "./LocalProp.gen";
export interface Props<T> {
    style?: StyleProp<ViewStyle>;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    data: Iterable<T>;
    keyExtractor: (obj: {
        item: T;
        index: number;
    }) => string | number;
    renderItem: (obj: {
        item: T;
        index: number;
    }) => React.ReactElement | null;
    localProps?: {
        onEndReached?: LocalProp;
    };
}
declare const _default: <T>(props: Props<T>) => React.ReactElement<unknown, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
//# sourceMappingURL=FlatList.d.ts.map