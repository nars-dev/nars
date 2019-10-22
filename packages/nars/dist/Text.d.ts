import * as React from "react";
import { TextStyle, StyleProp } from "./StyleSheet";
import { props } from "./Text.gen";
export interface Props extends props {
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
}
declare const _default: React.ComponentType<Props>;
export default _default;
//# sourceMappingURL=Text.d.ts.map