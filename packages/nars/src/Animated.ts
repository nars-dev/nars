import * as AnimatedGen from "./Animated.gen";
import {
  AnimatedNode,
  Adaptable,
  AnimatedValue,
  Value,
  InterpolationConfig,
  AnimatedClock,
  DecayState,
  DecayConfig,
  SpringState,
  SpringConfig,
  TimingState,
  TimingConfig,
  toAdaptable,
  serializeInterpolationConfig,
  arrayToNode,
} from "./AnimatedBase";
import {
  MultiOperator,
  UnaryOperator,
  BinaryOperator,
  wrapMultiToVariadic,
  wrapUnary,
  wrapBinary,
  physicsStateToAnimatedValues,
  objectFieldsToAdaptables,
  objectFieldsToAnimatedValues,
} from "./AnimatedCoders";
import { View, Text, Image } from "./AnimatedComponents";

// base operations
export const add: MultiOperator = wrapMultiToVariadic(AnimatedGen.add);
export const sub: MultiOperator = wrapMultiToVariadic(AnimatedGen.sub);
export const multiply: MultiOperator = wrapMultiToVariadic(
  AnimatedGen.multiply
);
export const divide: MultiOperator = wrapMultiToVariadic(AnimatedGen.divide);
export const pow: MultiOperator = wrapMultiToVariadic(AnimatedGen.pow);
export const modulo: MultiOperator = wrapMultiToVariadic(AnimatedGen.modulo);
export const sqrt: UnaryOperator = wrapUnary(AnimatedGen.sqrt);
export const log: UnaryOperator = wrapUnary(AnimatedGen.log);
export const sin: UnaryOperator = wrapUnary(AnimatedGen.sin);
export const cos: UnaryOperator = wrapUnary(AnimatedGen.cos);
export const tan: UnaryOperator = wrapUnary(AnimatedGen.tan);
export const acos: UnaryOperator = wrapUnary(AnimatedGen.acos);
export const asin: UnaryOperator = wrapUnary(AnimatedGen.asin);
export const atan: UnaryOperator = wrapUnary(AnimatedGen.atan);
export const exp: UnaryOperator = wrapUnary(AnimatedGen.exp);
export const round: UnaryOperator = wrapUnary(AnimatedGen.round);
export const floor: UnaryOperator = wrapUnary(AnimatedGen.floor);
export const ceil: UnaryOperator = wrapUnary(AnimatedGen.ceil);
export const lessThan: BinaryOperator<0 | 1> = wrapBinary(AnimatedGen.lessThan);
export const eq: BinaryOperator<0 | 1> = wrapBinary(AnimatedGen.eq);
export const greaterThan: BinaryOperator<0 | 1> = wrapBinary(
  AnimatedGen.greaterThan
);
export const lessOrEq: BinaryOperator<0 | 1> = wrapBinary(AnimatedGen.lessOrEq);
export const greaterOrEq: BinaryOperator<0 | 1> = wrapBinary(
  AnimatedGen.greaterOrEq
);
export const neq: BinaryOperator<0 | 1> = wrapBinary(AnimatedGen.neq);
export const and: MultiOperator<0 | 1> = wrapMultiToVariadic(AnimatedGen.and_);
export const or: MultiOperator<0 | 1> = wrapMultiToVariadic(AnimatedGen.or_);
/*
 * TODO: Does the callback ever leave the device? If yes the result of proc needs to be serialized.
 * Otherwise logic mimicking reanimated upstream should be used.
export function proc(
  cb: (...params: Array<AnimatedValue<number>>) => Adaptable<number>
): (...args: Array<Adaptable<number>>) => AnimatedNode<number> {
}
*/
export function defined(value: Adaptable<any>): AnimatedNode<0 | 1> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.defined(toAdaptable(value, idGenerator))
  );
}
export function not(value: Adaptable<any>): AnimatedNode<0 | 1> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.not_(toAdaptable(value, idGenerator))
  );
}

export function set<T extends Value>(
  valueToBeUpdated: AnimatedValue<T>,
  sourceNode: Adaptable<T>
): AnimatedNode<T> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.set_(
      valueToBeUpdated.encodeValue(idGenerator),
      toAdaptable(sourceNode, idGenerator)
    )
  );
}
export function concat(
  ...args: Array<Adaptable<string> | Adaptable<number>>
): AnimatedNode<string> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.concat(
      args.map(x => toAdaptable<number | string>(x, idGenerator))
    )
  );
}

export function cond<T extends Value = number>(
  conditionNode: Adaptable<number>,
  ifNode: Adaptable<T>,
  elseNode?: Adaptable<T>
): AnimatedNode<T> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.cond(
      toAdaptable(conditionNode, idGenerator),
      toAdaptable(ifNode, idGenerator),
      elseNode ? toAdaptable(elseNode, idGenerator) : undefined
    )
  );
}

export function block<T extends Value>(
  items: ReadonlyArray<Adaptable<T>>
): AnimatedNode<T> {
  return new AnimatedNode(idGenerator => arrayToNode(items, idGenerator));
}

/*
 * TODO: Implement and figure out a strategy for local vs remote functions
export function call<T extends Value>(
  args: ReadonlyArray<Adaptable<T>>,
  callback: (args: ReadonlyArray<T>) => void
): AnimatedNode<0> {
  return new AnimatedNode(register => {});
}
*/

export function debug<T>(
  message: string,
  value: AnimatedNode<T>
): AnimatedNode<T> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.debug(message, value.encode(idGenerator))
  );
}

export function onChange(
  value: Adaptable<number>,
  action: Adaptable<number>
): AnimatedNode<number> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.onChange(
      toAdaptable(value, idGenerator),
      toAdaptable(action, idGenerator)
    )
  );
}

export function interpolate(
  value: Adaptable<number>,
  config: InterpolationConfig
): AnimatedNode<number> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.interpolate(
      toAdaptable(value, idGenerator),
      serializeInterpolationConfig(config, idGenerator)
    )
  );
}

export function startClock(clock: AnimatedClock): AnimatedNode<0> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.startClock(clock.encodeClock(idGenerator))
  );
}
export function stopClock(clock: AnimatedClock): AnimatedNode<0> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.stopClock(clock.encodeClock(idGenerator))
  );
}
export function clockRunning(clock: AnimatedClock): AnimatedNode<0 | 1> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.clockRunning(clock.encodeClock(idGenerator))
  );
}

// derived operations
export const abs: (
  value: Adaptable<number>
) => AnimatedNode<number> = wrapUnary(AnimatedGen.abs);
export const acc: (
  value: Adaptable<number>
) => AnimatedNode<number> = wrapUnary(AnimatedGen.acc);
export function color(
  r: Adaptable<number>,
  g: Adaptable<number>,
  b: Adaptable<number>,
  a?: Adaptable<number>
): AnimatedNode<number> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.color(
      toAdaptable(r, idGenerator),
      toAdaptable(g, idGenerator),
      toAdaptable(b, idGenerator),
      a ? toAdaptable(a, idGenerator) : undefined
    )
  );
}
export const diff: (
  value: Adaptable<number>
) => AnimatedNode<number> = wrapUnary(AnimatedGen.diff);
export function diffClamp(
  value: Adaptable<number>,
  minVal: Adaptable<number>,
  maxVal: Adaptable<number>
): AnimatedNode<number> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.diffClamp(
      toAdaptable(value, idGenerator),
      toAdaptable(minVal, idGenerator),
      toAdaptable(maxVal, idGenerator)
    )
  );
}
export const max: BinaryOperator = wrapBinary(AnimatedGen.max);
export const min: BinaryOperator = wrapBinary(AnimatedGen.min);

// animations
export function decay(
  clock: AnimatedClock,
  state: DecayState,
  config: DecayConfig
): AnimatedNode<number> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.decay(
      clock.encodeClock(idGenerator),
      physicsStateToAnimatedValues(state, idGenerator),
      toAdaptable(config.deceleration, idGenerator)
    )
  );
}
export function timing(
  clock: AnimatedClock,
  state: TimingState,
  config: TimingConfig
): AnimatedNode<number> {
  const { frameTime, ...animationState } = state;
  /* Use config */
  const { easing: _, ...rest } = config;
  return new AnimatedNode(idGenerator =>
    AnimatedGen.timing(
      clock.encodeClock(idGenerator),
      {
        animationState: objectFieldsToAnimatedValues(
          animationState,
          idGenerator
        ),
        frameTime: frameTime.encodeValue(idGenerator),
      },
      objectFieldsToAdaptables(rest, idGenerator)
    )
  );
}
export function spring(
  clock: AnimatedClock,
  state: SpringState,
  config: SpringConfig
): AnimatedNode<number> {
  return new AnimatedNode(idGenerator =>
    AnimatedGen.spring(
      clock.encodeClock(idGenerator),
      physicsStateToAnimatedValues(state, idGenerator),
      objectFieldsToAdaptables(config, idGenerator)
    )
  );
}

export {
  AnimatedClock as Clock,
  Value as ValuePrimitive,
  AnimatedValue as Value,
  AnimatedNode as Node,
  View,
  Image,
  Text,
  Adaptable,
};
