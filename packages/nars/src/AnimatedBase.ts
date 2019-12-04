import * as AnimatedGen from "./Animated.gen";

export type EncodingContext = AnimatedGen.AnimatedNode_encodingContext;

export class AnimatedNode<T> {
  readonly internal: AnimatedGen.AnimatedNode_internal;
  __typesystem_clue__?: T;
  constructor(
    internalOrFunction:
      | AnimatedGen.AnimatedNode_internal
      | AnimatedGen.AnimatedNode_constructor
  ) {
    if (typeof internalOrFunction === "function") {
      this.internal = AnimatedGen.AnimatedNode_make(internalOrFunction);
    } else {
      this.internal = internalOrFunction;
    }
  }
  encode(encodingContext: EncodingContext) {
    return AnimatedGen.AnimatedNode_encode(this.internal, encodingContext);
  }
}

export type Adaptable<T extends Value> =
  | T
  | AnimatedNode<T>
  | ReadonlyArray<T | AnimatedNode<T> | ReadonlyArray<T | AnimatedNode<T>>>;

export type Value = string | number | boolean;

export enum Extrapolate {
  EXTEND = "Extend",
  CLAMP = "Clamp",
  IDENTITY = "Identity",
}

export interface InterpolationConfig {
  inputRange: ReadonlyArray<Adaptable<number>>;
  outputRange: ReadonlyArray<Adaptable<number>>;
  extrapolate?: Extrapolate;
  extrapolateLeft?: Extrapolate;
  extrapolateRight?: Extrapolate;
}

export class AnimatedValue<T extends Value> extends AnimatedNode<T> {
  readonly value: AnimatedGen.AnimatedValue_internal;

  constructor(initialValue: T) {
    let value;
    if (typeof initialValue === "string") {
      value = AnimatedGen.AnimatedValue_ofString(initialValue);
    } else if (typeof initialValue === "number") {
      value = AnimatedGen.AnimatedValue_ofFloat(initialValue);
    } else if (typeof initialValue === "boolean") {
      value = AnimatedGen.AnimatedValue_ofBool(initialValue);
    } else {
      throw Error(
        `AnimatedValue cannot be initiated with ${typeof initialValue}`
      );
    }
    super(AnimatedGen.AnimatedValue.toNode(value));
    this.value = value;
  }

  setValue(toValue: Adaptable<T>): void {
    AnimatedGen.AnimatedValue_setValue(this.value, encodingContext =>
      toAdaptable(toValue, encodingContext)
    );
  }

  interpolate(config: InterpolationConfig): AnimatedNode<number> {
    return new AnimatedNode(idGenerator =>
      AnimatedGen.interpolate(
        AnimatedGen.AnimatedNode_toAdaptable(this.internal, idGenerator),
        serializeInterpolationConfig(config, idGenerator)
      )
    );
  }

  encodeValue(
    encodingContext: EncodingContext
  ) {
    return AnimatedGen.AnimatedValue_encode(this.value, encodingContext);
  }
}

export const arrayToNode = <T extends Value>(
  array: ReadonlyArray<Adaptable<T>>,
  idGenerator: EncodingContext
): AnimatedGen.node => {
  return AnimatedGen.block(
    array.map(x => {
      if (typeof x === "object" && Array.isArray(x)) {
        return arrayToAdaptable(x, idGenerator);
      } else {
        return toAdaptable(x, idGenerator);
      }
    })
  );
};

const arrayToAdaptable = <T extends Value>(
  array: ReadonlyArray<Adaptable<T>>,
  idGenerator: EncodingContext
): AnimatedGen.adaptable => {
  return AnimatedGen.nodeToAdaptable(arrayToNode(array, idGenerator));
};

const primitiveToAdaptable = (x: any): AnimatedGen.adaptable => {
  if (typeof x === "string") {
    return AnimatedGen.AnimatedAdaptable_ofString(x);
  } else if (typeof x === "number") {
    return AnimatedGen.AnimatedAdaptable_ofFloat(x);
  } else if (typeof x === "boolean") {
    return AnimatedGen.AnimatedAdaptable_ofBool(x);
  } else {
    throw Error(`Adaptable cannot hold primitive of type ${typeof x}`);
  }
};

export const toAdaptable = <T extends Value>(
  adaptable: Adaptable<T>,
  idGenerator: EncodingContext
): AnimatedGen.adaptable => {
  if (adaptable instanceof AnimatedNode || adaptable instanceof AnimatedValue) {
    return AnimatedGen.AnimatedNode_toAdaptable(
      adaptable.internal,
      idGenerator
    );
  } else if (Array.isArray(adaptable)) {
    return arrayToAdaptable(adaptable, idGenerator);
  } else {
    return primitiveToAdaptable(adaptable);
  }
};

export const serializeInterpolationConfig = (
  config: InterpolationConfig,
  idGenerator: EncodingContext
) => ({
  inputRange: config.inputRange.map(x => toAdaptable(x, idGenerator)),
  outputRange: config.outputRange.map(x => toAdaptable(x, idGenerator)),
  extrapolate: config.extrapolate,
  extrapolateLeft: config.extrapolateLeft,
  extrapolateRight: config.extrapolateRight,
});

export class AnimatedClock extends AnimatedNode<number> {
  private readonly clock: AnimatedGen.Clock_internal;
  constructor() {
    const clock = AnimatedGen.Clock_make();
    super(encodingContext => {
      return AnimatedGen.Clock_toNode(clock, encodingContext);
    });
    this.clock = clock;
  }
  encodeClock(encodingContext: EncodingContext) {
    return AnimatedGen.Clock_encode(this.clock, encodingContext);
  }
}

export interface AnimationState {
  finished: AnimatedValue<number>;
  position: AnimatedValue<number>;
  time: AnimatedValue<number>;
}

export interface PhysicsAnimationState extends AnimationState {
  velocity: AnimatedValue<number>;
}

export type DecayState = PhysicsAnimationState;

export interface DecayConfig {
  deceleration: Adaptable<number>;
}

export interface TimingState extends AnimationState {
  frameTime: AnimatedValue<number>;
}

export type EasingFunction = (value: Adaptable<number>) => AnimatedNode<number>;

export interface TimingConfig {
  toValue: Adaptable<number>;
  duration: Adaptable<number>;
  easing: EasingFunction;
}

export type SpringState = PhysicsAnimationState;

export interface SpringConfig {
  damping: Adaptable<number>;
  mass: Adaptable<number>;
  stiffness: Adaptable<number>;
  overshootClamping: Adaptable<number> | boolean;
  restSpeedThreshold: Adaptable<number>;
  restDisplacementThreshold: Adaptable<number>;
  toValue: Adaptable<number>;
}
