import * as React from "react";
import { ViewStyle, StyleProp } from "./StyleSheet";
import { props } from "./View.gen";
export interface Props extends props {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
declare const _default: React.ComponentType<Props>;
export default _default;
//# sourceMappingURL=View.d.ts.map