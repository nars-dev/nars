import { TextStyle, StyleProp, ColorValue } from "./StyleSheet";
import * as React from "react";
export interface Props {
    style?: StyleProp<TextStyle>;
    placeholderTextColor: ColorValue;
    placeholder: string;
    value: string | undefined;
    onValueChange?: (newValue: string) => void;
}
declare const _default: (props: Props) => React.ReactElement<Props, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
//# sourceMappingURL=TextInput.d.ts.map