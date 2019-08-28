export declare type FlexAlignType = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
export declare type ColorValue = null | string;
export declare type DimensionValue = null | number | string;
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
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
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
export interface ViewStyle extends FlexStyle {
    borderRadius?: number;
    backgroundColor?: ColorValue;
}
export interface TextStyle extends ViewStyle {
    fontFamily?: string;
    fontSize?: number;
    color?: ColorValue;
    fontStyle?: "normal" | "italic";
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
}
export declare type StyleProp<T> = Array<T> | T;
declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle;
};
export declare const create: <T extends NamedStyles<T>>(obj: T) => T;
export {};
//# sourceMappingURL=StyleSheet.d.ts.map