import { Clock, Style, Adaptable, TopLevelNode, Value } from "./nars_animated_pb";
import Animated from "react-native-reanimated";
declare type AnyAnimatedPrimitive = string | number | boolean;
export interface RetainedInstances {
    getClock(clock: Clock): Animated.Clock | undefined;
    setClock(node: Clock, clock: Animated.Clock): void;
    getValue(value: Value): Animated.Value<AnyAnimatedPrimitive> | undefined;
    setValue(node: Value, value: Animated.Value<any>): void;
    getNode(node: TopLevelNode): Animated.Node<AnyAnimatedPrimitive> | undefined;
    setNode(node: TopLevelNode, value: Animated.Node<any>): void;
    clear(): void;
}
declare type UnknownObject = {
    [k: string]: DecodedValue;
};
interface DecodedValueArray extends Array<DecodedValue> {
}
declare type DecodedValue = undefined | null | number | string | boolean | UnknownObject | DecodedValueArray | Animated.Node<AnyAnimatedPrimitive>;
export declare const decodeAnimatedStyle: (struct: Style | null | undefined, retainedInstances: RetainedInstances) => {
    [k: string]: DecodedValue;
};
export declare const updateAnimatedValue: (value: Value | undefined, toValue: Adaptable | undefined, retainedInstances: RetainedInstances) => void;
export {};
//# sourceMappingURL=AnimatedCoders.d.ts.map