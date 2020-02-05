import * as React from "react";
import { name, props } from "./TouchableOpacity.gen";
import { Callback } from "./Callback";

export interface Props extends props {
  onPress?: Callback<void>;
  children?: React.ReactNode;
}

export default (name as unknown) as React.ComponentType<Props>;
