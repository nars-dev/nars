import * as React from "react";
import { LocalProps } from "nars-common";
import * as ComponentRegistry from "./ComponentRegistry.gen";
import { Schema } from "nars-common";
import { encodeLocalProps, encodeArityZeroCallback } from "./ProtoEncoders";

export interface Props {
  onPress?: () => void;
  localProps?: LocalProps<"onPress">;
  children?: React.ReactNode;
}

const name = "Nars_TouchableOpacity";

export default (props: Props): React.ReactElement<Props> => {
  return React.createElement(name, props, props.children);
};

ComponentRegistry.add({
  name,
  createEncoder: (key, props: ComponentRegistry.opaqueProps) => ({
    registerCallback,
    children,
  }) => {
    return Schema.ReactElement.create({
      touchableOpacity: {
        onPress: encodeArityZeroCallback(registerCallback, props.onPress),
        localProps: encodeLocalProps(props.localProps as LocalProps<string>),
        children,
      },
      key,
    });
  },
});
