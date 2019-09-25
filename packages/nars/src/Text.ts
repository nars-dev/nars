import { TextStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { Schema } from "nars-common";
import { encodeTextStyleInProps } from "./StyleEncoding";

export interface Props {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const name = "Nars_Text";

export default (props: Props): React.ReactElement<Props> =>
  React.createElement(name, props, props.children);

ComponentRegistry.registerRawTextEncodedReactElementInitializer(text =>
  Schema.ReactElement.create({
    rawText: {
      text,
    },
  })
);

ComponentRegistry.add({
  name,
  createEncoder: (key, props: ComponentRegistry.opaqueProps) => ({
    children,
  }) => {
    return Schema.ReactElement.create({
      text: {
        style: encodeTextStyleInProps(props),
        children,
      },
      key,
    });
  },
});
