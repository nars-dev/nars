import * as React from "react";
import { t as LocalProp } from "./LocalProp.gen";
import { name, props } from "./TouchableOpacity.gen";

export interface Props extends props {
  onPress?: () => void;
  localProps?: {
    onPress?: LocalProp;
  };
  children?: React.ReactNode;
}

export default (name as unknown) as React.ComponentType<Props>;
