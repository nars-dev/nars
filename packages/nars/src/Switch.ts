import { ViewStyle, StyleProp } from "./StyleSheet";
import * as React from "react";
import { Schema } from "nars-common";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { encodeViewStyleInProps } from "./StyleEncoding";
import { encodeArityOneCallback } from "./ProtoEncoders";

const name = "Nars_Switch";

export interface Props {
  style?: StyleProp<ViewStyle>;
  value: boolean;
  onValueChange: (_: boolean) => void;
}

export default (props: Props): React.ReactElement<Props> => {
  return React.createElement(name, props);
};

ComponentRegistry.add({
  name,
  createEncoder: (props: ComponentRegistry.opaqueProps) => ({
    registerCallback
  }) => {
    return Schema.ReactElement.create({
      switch: {
        style: encodeViewStyleInProps(props),
        value: Boolean(props.value),
        onValueChange: encodeArityOneCallback(
          (args: Schema.google.protobuf.IStruct) => {
            return !!(
              args.fields &&
              args.fields.value &&
              args.fields.value.boolValue
            );
          },
          registerCallback,
          props.onValueChange
        )
      }
    });
  }
});
