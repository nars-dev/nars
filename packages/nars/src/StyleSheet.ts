import { Adaptable, AnimatedNode } from "./AnimatedBase";

export type FlexAlignType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";
export type ColorValue = null | string;
export type DimensionValue = null | number | string;

interface PerpectiveTransform {
  perspective: number;
}

interface RotateTransform {
  rotate: string;
}

interface RotateXTransform {
  rotateX: string;
}

interface RotateYTransform {
  rotateY: string;
}

interface RotateZTransform {
  rotateZ: string;
}

interface ScaleTransform {
  scale: number;
}

interface ScaleXTransform {
  scaleX: number;
}

interface ScaleYTransform {
  scaleY: number;
}

interface TranslateXTransform {
  translateX: number;
}

interface TranslateYTransform {
  translateY: number;
}

interface SkewXTransform {
  skewX: string;
}

interface SkewYTransform {
  skewY: string;
}

export interface TransformsStyle {
  transform?: (
    | PerpectiveTransform
    | RotateTransform
    | RotateXTransform
    | RotateYTransform
    | RotateZTransform
    | ScaleTransform
    | ScaleXTransform
    | ScaleYTransform
    | TranslateXTransform
    | TranslateYTransform
    | SkewXTransform
    | SkewYTransform)[];
  transformMatrix?: Array<number>;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  translateX?: number;
  translateY?: number;
}

export interface FlexStyle {
  padding?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingEnd?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingStart?: DimensionValue;
  paddingTop?: DimensionValue;
  paddingVertical?: DimensionValue;
  width?: DimensionValue;
  height?: DimensionValue;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  margin?: DimensionValue;
  marginBottom?: DimensionValue;
  marginEnd?: DimensionValue;
  marginHorizontal?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginStart?: DimensionValue;
  marginTop?: DimensionValue;
  marginVertical?: DimensionValue;
  aspectRatio?: number;
  alignItems?: FlexAlignType;
  flex?: number;
  flexBasis?: number | "auto";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export interface ViewStyle extends FlexStyle, TransformsStyle {
  borderRadius?: number;
  backgroundColor?: ColorValue;
}

export interface TextStyle extends ViewStyle {
  fontFamily?: string;
  fontSize?: number;
  color?: ColorValue;
  fontStyle?: "normal" | "italic";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
}

export type StyleProp<T> = Array<T> | T;

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle };

export type AnyStyleProp = StyleProp<ViewStyle | TextStyle>;

export const create = <T extends NamedStyles<T>>(obj: T) => obj;

export type AnimatedTransform = {
  [P in keyof TransformsStyle["transform"]]: Adaptable<
    TransformsStyle["transform"][P]
  >;
};

export type AnimateStyle<S extends object> = {
  [K in keyof S]: K extends "transform"
    ? AnimatedTransform
    : (S[K] extends ReadonlyArray<any>
        ? ReadonlyArray<AnimateStyle<S[K][0]>>
        : S[K] extends object
        ? AnimateStyle<S[K]>
        :
            | S[K]
            | AnimatedNode<
                // allow `number` where `string` normally is to support colors
                S[K] extends (string | undefined) ? S[K] | number : S[K]
              >);
};

export type AnimateProps<
  S extends object,
  P extends {
    style?: StyleProp<S>;
  }
> = {
  [K in keyof P]: K extends "style"
    ? StyleProp<AnimateStyle<S>>
    : P[K] | AnimatedNode<P[K]>;
};

export type AnyAnimatedStyleProp =
  | StyleProp<AnimateStyle<ViewStyle>>
  | StyleProp<AnimateStyle<TextStyle>>;
