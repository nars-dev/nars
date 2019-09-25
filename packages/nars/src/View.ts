import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { Schema } from "nars-common";
import { encodeViewStyleInProps } from "./StyleEncoding";

export interface Props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const name = "Nars_View";

export default (props: Props): React.ReactElement<Props> =>
  React.createElement(name, props, props.children);

ComponentRegistry.add({
  name,
  createEncoder: (key, props: ComponentRegistry.opaqueProps) => ({
    children,
  }) => {
    return Schema.ReactElement.create({
      view: {
        style: encodeViewStyleInProps(props),
        children,
      },
      key,
    });
  },
});
