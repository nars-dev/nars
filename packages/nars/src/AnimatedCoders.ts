import * as AnimatedGen from "./Animated.gen";
import {
  Adaptable,
  AnimatedValue,
  AnimatedNode,
  PhysicsAnimationState,
  toAdaptable,
  IdGenerator,
  Value,
} from "./AnimatedBase";

export type BinaryOperator<T = number> = (
  left: Adaptable<number>,
  right: Adaptable<number>
) => AnimatedNode<T>;
export type UnaryOperator = (value: Adaptable<number>) => AnimatedNode<number>;
export type MultiOperator<T = number> = (
  a: Adaptable<number>,
  b: Adaptable<number>,
  ...others: Adaptable<number>[]
) => AnimatedNode<T>;

export const wrapMultiToVariadic = <T = number>(
  f: AnimatedGen.multiOperator
): MultiOperator<T> => {
  return (a, b, ...others) =>
    new AnimatedNode(idGenerator =>
      f(
        toAdaptable(a, idGenerator),
        toAdaptable(b, idGenerator),
        others.map(x => toAdaptable(x, idGenerator))
      )
    );
};

export const wrapUnary = (f: AnimatedGen.unaryOperator): UnaryOperator => {
  return a => new AnimatedNode(idGenerator => f(toAdaptable(a, idGenerator)));
};

export const wrapBinary = <T>(
  f: AnimatedGen.binaryOperator
): BinaryOperator<T> => {
  return (a, b) =>
    new AnimatedNode(idGenerator =>
      f(toAdaptable(a, idGenerator), toAdaptable(b, idGenerator))
    );
};

type Key = symbol | number | string;

export type AdaptableRecordInternal<K extends Key> = {
  [P in K]: AnimatedGen.adaptable;
};

export const objectFieldsToAdaptables = <K extends Key>(
  object: Record<K, Adaptable<Value>>,
  idGenerator: IdGenerator
): AdaptableRecordInternal<K> => {
  let result = {} as AdaptableRecordInternal<K>;
  for (const key in object) {
    result[key] = toAdaptable(object[key], idGenerator);
  }
  return result;
};

export type AnimatedValueRecordInternal<K extends Key> = {
  [P in K]: AnimatedGen.animatedValue;
};

export const objectFieldsToAnimatedValues = <K extends Key>(
  object: Record<K, AnimatedValue<Value>>,
  idGenerator: IdGenerator
): AnimatedValueRecordInternal<K> => {
  let result = {} as AnimatedValueRecordInternal<K>;
  for (const key in object) {
    result[key] = object[key].value(idGenerator);
  }
  return result;
};

export const physicsStateToAnimatedValues = (
  state: PhysicsAnimationState,
  idGenerator: IdGenerator
) => {
  const { velocity, ...animationState } = state;
  return {
    velocity: velocity.value(idGenerator),
    animationState: objectFieldsToAnimatedValues(animationState, idGenerator),
  };
};
