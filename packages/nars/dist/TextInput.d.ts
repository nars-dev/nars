import * as React from "react";
import { TextStyle, StyleProp, ColorValue } from "./StyleSheet";
import { props } from "./TextInput.gen";
export interface Props extends props {
    style?: StyleProp<TextStyle>;
    placeholderTextColor?: ColorValue;
    placeholder?: string;
    value: string;
    onValueChange?: (newValue: string) => void;
}
declare const _default: React.ComponentType<Props>;
export default _default;
//# sourceMappingURL=TextInput.d.ts.map