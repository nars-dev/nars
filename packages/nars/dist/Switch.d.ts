import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
export interface Props {
    style?: StyleProp<ViewStyle>;
    value: boolean;
    onValueChange: (_: boolean) => void;
}
declare const _default: (props: Props) => React.ReactElement<Props, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
//# sourceMappingURL=Switch.d.ts.map