import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { Schema } from "nars-common";
import { encodeViewStyleInProps } from "./StyleEncoding";

export interface Props {
  style?: StyleProp<ViewStyle>;
  source?: string;
}

const name = "Nars_Image";

export default (props: Props): React.ReactElement<Props> =>
  React.createElement(name, props);

ComponentRegistry.add({
  name,
  createEncoder: (props: ComponentRegistry.opaqueProps) => () => {
    return Schema.ReactElement.create({
      image: {
        style: encodeViewStyleInProps(props),
        sourceURLString: String(props.source)
      }
    });
  }
});
