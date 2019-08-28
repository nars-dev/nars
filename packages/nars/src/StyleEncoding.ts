// import { ViewStyle, StyleProp, TextStyle } from "./StyleSheet";
import { toStruct } from "nars-common";

const encode = (props: { [k: string]: unknown }) => {
  if (typeof props.style === "object" && props.style !== null) {
    return toStruct(props.style);
  }
  return toStruct({});
};

/* Style is currently weakly typed */
export const encodeViewStyleInProps = encode;
export const encodeTextStyleInProps = encode;
