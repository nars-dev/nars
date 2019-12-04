import { AnimatedNode } from "./AnimatedBase";
import { node } from "./Animated.gen";
export type nodeClass = AnimatedNode<any>;

export const isAnimatedNode = (x: any): x is AnimatedNode<any> =>
  x instanceof AnimatedNode;

export const getProtobufNode = (
  idGenerator: () => number,
  x: AnimatedNode<any>
): node => {
  return x.node(idGenerator);
};
