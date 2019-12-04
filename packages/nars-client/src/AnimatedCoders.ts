import {
  Clock,
  Style,
  Adaptable,
  UnaryOperatorType,
  UnaryDerivedOperatorType,
  MultiOperatorType,
  BinaryOperatorType,
  TopLevelNode,
  Value,
  Extrapolate,
  ExtrapolateType,
  InterpolationConfig,
  PhysicsAnimationState,
  SpringConfig,
  DecayConfig,
  TimingState,
  TimingConfig,
  Node,
  EasingFunction,
  ValueOrAnimatedNode,
  ClockOperationType,
} from "./nars_animated_pb";
import Animated, { Easing } from "react-native-reanimated";

type AnyAnimatedPrimitive = string | number | boolean;

type Decoder<T extends AnyAnimatedPrimitive> = {
  decode: (value: unknown) => value is T;
};

const decodeNumber: Decoder<number> = {
  decode: (x: unknown): x is number => typeof x === "number",
};
const decodeAny: Decoder<AnyAnimatedPrimitive> = {
  decode: (_x: unknown): _x is AnyAnimatedPrimitive => true,
};

const unreachable = (exception?: string): never => {
  throw Error(exception || "Unreachable decoding path");
};

const decodeAdaptable = <T extends AnyAnimatedPrimitive>(
  decoder: Decoder<T>,
  node: Adaptable | null | undefined,
  retainedInstances: RetainedInstances
): Animated.Adaptable<T> => {
  if (!node) {
    return unreachable();
  }
  const primitive = node.getPrimitive();
  if (primitive) {
    if (primitive.hasFloat() && decoder.decode(primitive.getFloat())) {
      return primitive.getFloat() as any;
    } else if (primitive.hasString() && decoder.decode(primitive.getString())) {
      return primitive.getString() as any;
    } else if (primitive.hasBool() && decoder.decode(primitive.getBool())) {
      return primitive.getBool() as any;
    }
  } else if (node.hasNode()) {
    return decodeNode(decoder, node.getNode(), retainedInstances);
  }
  return unreachable();
};

const optDecodeAdaptable = <T extends AnyAnimatedPrimitive>(
  decoder: Decoder<T>,
  adaptable: Adaptable | null | undefined,
  retainedInstances: RetainedInstances
): Animated.Adaptable<T> | undefined => {
  if (adaptable) {
    return decodeAdaptable(decoder, adaptable, retainedInstances);
  }

  return undefined;
};

type UnaryOperator = (
  value: Animated.Adaptable<number>
) => Animated.Node<number>;

const unary = UnaryOperatorType;
const unaryOperators: { [k: number]: UnaryOperator } = {
  [unary.SQRT]: Animated.sqrt,
  [unary.LOG]: Animated.log,
  [unary.SIN]: Animated.sin,
  [unary.COS]: Animated.cos,
  [unary.TAN]: Animated.tan,
  [unary.ACOS]: Animated.acos,
  [unary.ASIN]: Animated.asin,
  [unary.ATAN]: Animated.atan,
  [unary.EXP]: Animated.exp,
  [unary.ROUND]: Animated.round,
  [unary.FLOOR]: Animated.floor,
  [unary.CEIL]: Animated.ceil,
  [unary.DEFINED]: Animated.defined,
  [unary.NOT]: Animated.not,
};

const derivedUnary = UnaryDerivedOperatorType;
const derivedUnaryOpeartors: { [k: number]: UnaryOperator } = {
  [derivedUnary.ABS]: Animated.abs,
  [derivedUnary.ACC]: Animated.acc,
  [derivedUnary.DIFF]: Animated.diff,
};

const multi = MultiOperatorType;
type MultiOperator<T extends number = number> = (
  a: Animated.Adaptable<number>,
  b: Animated.Adaptable<number>,
  ...others: Animated.Adaptable<number>[]
) => Animated.Node<T>;
const multiOperators: { [k: number]: MultiOperator } = {
  [multi.ADD]: Animated.add,
  [multi.SUB]: Animated.sub,
  [multi.MULTIPLY]: Animated.multiply,
  [multi.DIVIDE]: Animated.divide,
  [multi.POW]: Animated.pow,
  [multi.MODULO]: Animated.modulo,
  [multi.AND]: Animated.and,
  [multi.OR]: Animated.or,
};

const binary = BinaryOperatorType;
type BinaryOperator<T = number> = (
  left: Animated.Adaptable<number>,
  right: Animated.Adaptable<number>
) => Animated.Node<T>;
const binaryOperators: { [k: number]: BinaryOperator } = {
  [binary.MAX]: Animated.max,
  [binary.MIN]: Animated.min,
  [binary.LESSTHAN]: Animated.lessThan,
  [binary.EQ]: Animated.eq,
  [binary.GREATERTHAN]: Animated.greaterThan,
  [binary.LESSOREQ]: Animated.lessOrEq,
  [binary.GREATEROREQ]: Animated.greaterOrEq,
  [binary.NEQ]: Animated.neq,
};

export interface RetainedInstances {
  getClock(clock: Clock): Animated.Clock | undefined;
  setClock(node: Clock, clock: Animated.Clock): void;
  getValue(value: Value): Animated.Value<AnyAnimatedPrimitive> | undefined;
  setValue(node: Value, value: Animated.Value<any>): void;
  getNode(node: TopLevelNode): Animated.Node<AnyAnimatedPrimitive> | undefined;
  setNode(node: TopLevelNode, value: Animated.Node<any>): void;
}

const decodeValue = <T extends AnyAnimatedPrimitive>(
  decoder: Decoder<T>,
  value: Value | null | undefined,
  retainedInstances: RetainedInstances
): Animated.Value<T> => {
  if (!value) {
    return unreachable();
  }
  const memoizedValue = retainedInstances.getValue(value);
  if (memoizedValue) {
    return (memoizedValue as any) as Animated.Value<T>;
  } else {
    const decode = (): Animated.Value<T> => {
      if (value.hasFloat() && decoder.decode(value.getFloat())) {
        return new Animated.Value(value.getFloat()) as any;
      } else if (value.hasString() && decoder.decode(value.getString())) {
        return new Animated.Value(value.getString()) as any;
      } else if (value.hasBool() && decoder.decode(value.getBool())) {
        return new Animated.Value(value.getBool()) as any;
      }
      return unreachable();
    };
    const animatedValue = decode();
    retainedInstances.setValue(value, animatedValue);
    return animatedValue;
  }
};

const decodeClock = (
  clock: Clock | undefined | null,
  retainedInstances: RetainedInstances
) => {
  if (!clock) {
    return unreachable();
  }
  const memoizedValue = retainedInstances.getClock(clock);
  if (memoizedValue) {
    return memoizedValue;
  } else {
    const animatedClock = new Animated.Clock();
    retainedInstances.setClock(clock, animatedClock);
    return animatedClock;
  }
};

const convertExtrapolate = (e?: Extrapolate | null) => {
  if (e) {
    switch (e.getValue()) {
      case ExtrapolateType.CLAMP:
        "Clamp";
      case ExtrapolateType.EXTEND:
        "Extend";
      case ExtrapolateType.IDENTITY:
        "Identity";
    }
  }
  return undefined;
};

const decodeInterpolationConfig = (
  config: InterpolationConfig,
  retainedInstances: RetainedInstances
) => ({
  inputRange: (config.getInputrangeList() || []).map(x =>
    decodeAdaptable(decodeNumber, x, retainedInstances)
  ),
  outputRange: (config.getOutputrangeList() || []).map(x =>
    decodeAdaptable(decodeNumber, x, retainedInstances)
  ),
  extrapolate: convertExtrapolate(config.getExtrapolate()),
  extrapolateLeft: convertExtrapolate(config.getExtrapolateleft()),
  extrapolateRight: convertExtrapolate(config.getExtrapolateright()),
});

const decodePhysicsAnimationState = (
  state: PhysicsAnimationState | undefined | null,
  retainedInstances: RetainedInstances
) => {
  const animation = state && state.getAnimation();
  if (animation && state) {
    return {
      finished: decodeValue(
        decodeNumber,
        animation.getFinished(),
        retainedInstances
      ),
      position: decodeValue(
        decodeNumber,
        animation.getPosition(),
        retainedInstances
      ),
      time: decodeValue(decodeNumber, animation.getTime(), retainedInstances),
      velocity: decodeValue(
        decodeNumber,
        state.getVelocity(),
        retainedInstances
      ),
    };
  }
  return unreachable();
};

const decodeSpringConfig = (
  config: SpringConfig | undefined | null,
  retainedInstances: RetainedInstances
) => {
  if (!config) {
    return unreachable();
  }
  return {
    damping: decodeAdaptable(
      decodeNumber,
      config.getDamping(),
      retainedInstances
    ),
    mass: decodeAdaptable(decodeNumber, config.getMass(), retainedInstances),
    stiffness: decodeAdaptable(
      decodeNumber,
      config.getStiffness(),
      retainedInstances
    ),
    overshootClamping: decodeAdaptable(
      decodeNumber,
      config.getOvershootclamping(),
      retainedInstances
    ),
    restSpeedThreshold: decodeAdaptable(
      decodeNumber,
      config.getRestspeedthreshold(),
      retainedInstances
    ),
    restDisplacementThreshold: decodeAdaptable(
      decodeNumber,
      config.getRestdisplacementthreshold(),
      retainedInstances
    ),
    toValue: decodeAdaptable(
      decodeNumber,
      config.getTovalue(),
      retainedInstances
    ),
  };
};

const decodeDecayConfig = (
  config: DecayConfig | undefined | null,
  retainedInstances: RetainedInstances
) => {
  if (config && config.hasDeceleration()) {
    return {
      deceleration: decodeAdaptable(
        decodeNumber,
        config.getDeceleration(),
        retainedInstances
      ),
    };
  }
  return unreachable();
};

const decodeTimingState = (
  state: TimingState | undefined | null,
  retainedInstances: RetainedInstances
) => {
  const animation = state && state.getAnimation();
  if (animation && state) {
    return {
      finished: decodeValue(
        decodeNumber,
        animation.getFinished(),
        retainedInstances
      ),
      position: decodeValue(
        decodeNumber,
        animation.getPosition(),
        retainedInstances
      ),
      time: decodeValue(decodeNumber, animation.getTime(), retainedInstances),
      frameTime: decodeValue(
        decodeNumber,
        state.getFrametime(),
        retainedInstances
      ),
    };
  }
  return unreachable();
};

const decodeEasingFunction = (
  easing: EasingFunction | undefined | null,
  _retainedInstances: RetainedInstances
) => {
  // TODO: Handle easing
  if (!easing) {
    return Easing.linear;
  } else if (easing.hasCustom()) {
    return Easing.linear;
  } else if (easing.hasBuiltin()) {
    return Easing.linear;
  } else {
    return unreachable();
  }
};

const decodeTimingConfig = (
  config: TimingConfig | undefined | null,
  retainedInstances: RetainedInstances
) => {
  if (config) {
    return {
      toValue: decodeAdaptable(
        decodeNumber,
        config.getTovalue(),
        retainedInstances
      ),
      duration: decodeAdaptable(
        decodeNumber,
        config.getDuration(),
        retainedInstances
      ),
      easing: decodeEasingFunction(config.getEasing(), retainedInstances),
    };
  }
  return unreachable();
};

const decodeNode = <T extends AnyAnimatedPrimitive>(
  decoder: Decoder<T>,
  node: Node | null | undefined,
  retainedInstances: RetainedInstances
): Animated.Node<T> => {
  if (!node) {
    return unreachable();
  }
  return ((() => {
    if (node.hasCond()) {
      const cond = node.getCond()!;
      return Animated.cond(
        decodeAdaptable(decodeNumber, cond.getCondition(), retainedInstances),
        decodeAdaptable(decoder, cond.getIfnode(), retainedInstances),
        optDecodeAdaptable(decoder, cond.getElsenode(), retainedInstances)
      );
    } else if (node.hasUnary()) {
      const unary = node.getUnary()!;
      const op = unaryOperators[unary.getOperator()];
      return op(
        decodeAdaptable(decodeNumber, unary.getValue(), retainedInstances)
      );
    } else if (node.hasMulti()) {
      const multi = node.getMulti()!;
      const others = multi.getOthersList();
      const op = multiOperators[multi.getOperator()];
      return op(
        decodeAdaptable(decodeNumber, multi.getA(), retainedInstances),
        decodeAdaptable(decodeNumber, multi.getB(), retainedInstances),
        ...others.map(x => decodeAdaptable(decodeNumber, x, retainedInstances))
      );
    } else if (node.hasSetter()) {
      const setter = node.getSetter()!;
      return Animated.set(
        decodeValue(
          decodeNumber,
          setter.getValuetobeupdated(),
          retainedInstances
        ),
        decodeAdaptable(decodeNumber, setter.getTovalue(), retainedInstances)
      );
    } else if (node.hasBinary()) {
      const binary = node.getBinary()!;
      const op = binaryOperators[binary.getOperator()];
      return op(
        decodeAdaptable(decodeNumber, binary.getLeft(), retainedInstances),
        decodeAdaptable(decodeNumber, binary.getRight(), retainedInstances)
      );
    } else if (node.hasDerivedunary()) {
      const derivedUnary = node.getDerivedunary()!;
      const op = derivedUnaryOpeartors[derivedUnary.getOperator()];
      return op(
        decodeAdaptable(
          decodeNumber,
          derivedUnary.getValue(),
          retainedInstances
        )
      );
    } else if (node.hasAnimation()) {
      const animationNode = node.getAnimation()!;
      if (animationNode.hasSpring()) {
        const animation = animationNode.getSpring()!;
        const clock = decodeClock(animation.getClock(), retainedInstances);
        return Animated.spring(
          clock,
          decodePhysicsAnimationState(animation.getState(), retainedInstances),
          decodeSpringConfig(animation.getConfig(), retainedInstances)
        );
      } else if (animationNode.hasDecay()) {
        const animation = animationNode.getDecay()!;
        const clock = decodeClock(animation.getClock(), retainedInstances);
        return Animated.decay(
          clock,
          decodePhysicsAnimationState(animation.getState(), retainedInstances),
          decodeDecayConfig(animation.getConfig(), retainedInstances)
        );
      } else if (animationNode.hasTiming()) {
        const animation = animationNode.getTiming()!;
        const clock = decodeClock(animation.getClock(), retainedInstances);
        return Animated.timing(
          clock,
          decodeTimingState(animation.getState(), retainedInstances),
          decodeTimingConfig(animation.getConfig(), retainedInstances)
        );
      }
    } else if (node.hasBlock()) {
      const values = node.getBlock()!;
      return Animated.block(
        values
          .getValuesList()
          .map(x => decodeAdaptable(decoder, x, retainedInstances))
      );
    } else if (node.hasValue()) {
      return decodeValue(decodeNumber, node.getValue(), retainedInstances);
    } else if (node.hasConcat() && (decoder.decode("") || decoder.decode(1))) {
      const values = node.getConcat()!.getValuesList();
      return Animated.concat(
        ...(values.map(x =>
          decodeAdaptable(decoder, x, retainedInstances)
        ) as Array<Animated.Adaptable<string> | Animated.Adaptable<number>>)
      );
    } else if (node.hasCall()) {
      // TODO: Implement call
      return unreachable("Animated.call is not implemented");
    } else if (node.hasDebug()) {
      const debug = node.getDebug()!;
      return Animated.debug(
        debug.getDebugmessage(),
        decodeNode(decoder, debug.getValue(), retainedInstances)
      );
    } else if (node.hasOnchange()) {
      const oc = node.getOnchange()!;
      return Animated.onChange(
        decodeAdaptable(decodeNumber, oc.getValue(), retainedInstances),
        decodeAdaptable(decodeNumber, oc.getAction(), retainedInstances)
      );
    } else if (node.hasClockoperation()) {
      const co = node.getClockoperation()!;
      if (co.hasClock()) {
        const clock = decodeClock(co.getClock()!, retainedInstances);
        if (clock) {
          const clockOperations = ClockOperationType;
          switch (co.getOperation()) {
            case clockOperations.START:
              return Animated.startClock(clock);
            case clockOperations.STOP:
              return Animated.stopClock(clock);
            case clockOperations.ISRUNNING:
              return Animated.clockRunning(clock);
          }
        }
      }
    } else if (node.hasClock()) {
      decodeClock(node.getClock()!, retainedInstances);
    } else if (node.hasInterpolate()) {
      const i = node.getInterpolate()!;
      if (i.hasConfig()) {
        return Animated.interpolate(
          decodeAdaptable(decodeNumber, i.getValue(), retainedInstances),
          decodeInterpolationConfig(i.getConfig()!, retainedInstances)
        );
      }
    } else if (node.hasColor()) {
      const c = node.getColor()!;
      if (c.hasR() && c.hasG() && c.hasB()) {
        const r = decodeAdaptable(decodeNumber, c.getR(), retainedInstances);
        const g = decodeAdaptable(decodeNumber, c.getG(), retainedInstances);
        const b = decodeAdaptable(decodeNumber, c.getB(), retainedInstances);
        const alpha = optDecodeAdaptable(
          decodeNumber,
          c.getAlpha(),
          retainedInstances
        );
        return Animated.color(r, g, b, alpha);
      }
    } else if (node.hasDiffclamp()) {
      const dc = node.getDiffclamp()!;
      const value = decodeAdaptable(
        decodeNumber,
        dc.getValue(),
        retainedInstances
      );
      const minVal = decodeAdaptable(
        decodeNumber,
        dc.getMinval(),
        retainedInstances
      );
      const maxVal = decodeAdaptable(
        decodeNumber,
        dc.getMaxval(),
        retainedInstances
      );
      return Animated.diffClamp(value, minVal, maxVal);
    }
    return unreachable();
  })() as any) as Animated.Node<T>;
};

type UnknownObject = { [k: string]: DecodedValue };
// https://stackoverflow.com/a/45999529
interface DecodedValueArray extends Array<DecodedValue> {}
type DecodedValue =
  | undefined
  | null
  | number
  | string
  | boolean
  | UnknownObject
  | DecodedValueArray
  | Animated.Node<AnyAnimatedPrimitive>;

const getListValues = (x?: ValueOrAnimatedNode | null) => {
  if (x) {
    const l = x.getListValue();
    return l ? l.getValuesList() : [];
  } else {
    return [];
  }
};

const ofValueOrAnimatedNode = (
  value: ValueOrAnimatedNode,
  retainedInstances: RetainedInstances
): DecodedValue => {
  if (value.hasNode()) {
    const animatedNode = value.getNode();
    if (animatedNode) {
      const memoized = retainedInstances.getNode(animatedNode);
      if (memoized) {
        return memoized;
      }
      const decoded = decodeNode(
        decodeAny,
        animatedNode.getNode(),
        retainedInstances
      );
      retainedInstances.setNode(animatedNode, decoded);
      return decoded;
    }
    return unreachable();
  } else if (value.hasNumberValue()) {
    return Number(value.getNumberValue());
  } else if (value.hasNullValue()) {
    return null;
  } else if (value.hasStringValue()) {
    return String(value.getStringValue());
  } else if (value.hasBoolValue()) {
    return Boolean(value.getBoolValue());
  } else if (value.hasStyleValue()) {
    return decodeAnimatedStyle(value.getStyleValue(), retainedInstances);
  } else if (value.hasListValue()) {
    return getListValues(value).map(x =>
      ofValueOrAnimatedNode(x, retainedInstances)
    );
  } else if (value.hasUndefinedValue()) {
    return undefined;
  } else {
    return undefined;
  }
};

export const decodeAnimatedStyle = (
  struct: Style | null | undefined,
  retainedInstances: RetainedInstances
): { [k: string]: DecodedValue } => {
  if (struct) {
    const fields = {} as UnknownObject;
    struct.getFieldsMap().forEach((value, key) => {
      fields[key] = ofValueOrAnimatedNode(value, retainedInstances);
    });
    return fields;
  }
  return {};
};

export const updateAnimatedValue = (
  value: Value | undefined,
  toValue: Adaptable | undefined,
  retainedInstances: RetainedInstances
): void => {
  if (value && toValue) {
    const animatedValue = decodeValue(decodeAny, value, retainedInstances);
    const adaptale = decodeAdaptable(decodeAny, toValue, retainedInstances);
    animatedValue.setValue(adaptale);
  }
};
