import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
export interface Props {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
declare const _default: (props: Props) => React.ReactElement<Props, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
//# sourceMappingURL=View.d.ts.map