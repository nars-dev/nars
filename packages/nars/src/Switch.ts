import * as React from "react";
import { ViewStyle, StyleProp } from "./StyleSheet";
import { name, props } from "./Switch.gen";

export interface Props extends props {
  style?: StyleProp<ViewStyle>;
}

export default (name as unknown) as React.ComponentType<Props>;
