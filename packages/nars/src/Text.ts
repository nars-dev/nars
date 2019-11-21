import * as React from "react";
import { TextStyle, StyleProp } from "./StyleSheet";
import { name, props } from "./Text.gen";

export interface Props extends props {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export default (name as unknown) as React.ComponentType<Props>;
