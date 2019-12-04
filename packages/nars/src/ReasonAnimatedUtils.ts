import { AnimatedNode, AnimatedValue } from "./AnimatedBase";
import * as AnimatedGen from "./Animated.gen";

export const getAnimatedValue = (
  x: any
): AnimatedGen.AnimatedValue_internal | undefined =>
  x instanceof AnimatedValue ? x.value : undefined;

export const getAnimatedNode = (
  x: any
): AnimatedGen.AnimatedNode_internal | undefined =>
  x instanceof AnimatedNode ? x.internal : undefined;
