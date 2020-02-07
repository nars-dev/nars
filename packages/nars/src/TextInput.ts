import * as React from "react";
import { TextStyle, StyleProp, ColorValue } from "./StyleSheet";
import { Callback } from "./Callback";
import { name, props } from "./TextInput.gen";

export interface Props extends props {
  style?: StyleProp<TextStyle>;
  placeholderTextColor?: ColorValue;
  placeholder?: string;
  value: string;
  onValueChange?: Callback<string>;
}

export default (name as unknown) as React.ComponentType<Props>;
