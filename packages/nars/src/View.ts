import * as React from "react";
import { ViewStyle, StyleProp } from "./StyleSheet";
import { name, props } from "./View.gen";

export interface Props extends props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default (name as unknown) as React.ComponentType<Props>;
