import * as React from "react";
import { ViewStyle, StyleProp } from "./StyleSheet";
import { props, name } from "./Image.gen";

export interface Props extends props {
  style?: StyleProp<ViewStyle>;
}

// @ts-ignore: Primitive component
export default name as React.ComponentType<Props>;
