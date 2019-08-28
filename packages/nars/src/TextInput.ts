import { TextStyle, StyleProp, ColorValue } from "./StyleSheet";
import * as React from "react";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { Schema } from "nars-common";
import { encodeTextStyleInProps } from "./StyleEncoding";
import { encodeArityZeroCallback } from "./ProtoEncoders";

export interface Props {
  style?: StyleProp<TextStyle>;
  placeholderTextColor: ColorValue;
  placeholder: string;
  value: string | undefined;
  onValueChange?: (newValue: string) => void;
}

const name = "Nars_TextInput";

export default (props: Props): React.ReactElement<Props> =>
  React.createElement(name, props);

ComponentRegistry.add({
  name,
  createEncoder: (props: ComponentRegistry.opaqueProps) => ({
    registerCallback
  }) => {
    return Schema.ReactElement.create({
      textInput: {
        style: encodeTextStyleInProps(props),
        onValueChange: encodeArityZeroCallback(
          registerCallback,
          props.onValueChange
        ),
        value: props.value ? String(props.value) : "",
        placeholder: props.placeholder
          ? {
              value: String(props.placeholder)
            }
          : undefined,
        placeholderTextColor: props.placeholderTextColor
          ? {
              value: String(props.placeholderTextColor)
            }
          : undefined
      }
    });
  }
});
