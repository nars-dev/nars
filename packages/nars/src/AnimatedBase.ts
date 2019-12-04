import * as AnimatedGen from "./Animated.gen";

export type IdGenerator = () => number;

export class AnimatedNode<T> {
  private _node: AnimatedGen.node | undefined;
  private makeNode: (g: IdGenerator) => AnimatedGen.node;
  private __nodeId: number | undefined;
  __typesystem_clue__?: T;
  constructor(makeNode_: (g: IdGenerator) => AnimatedGen.node) {
    this.makeNode = makeNode_;
  }
  node(idGenerator: IdGenerator): AnimatedGen.node {
    if (!this._node) {
      this._node = this.makeNode(idGenerator);
    }
    return this._node;
  }
  lazyNodeId(generator: IdGenerator): number {
    if (!this.__nodeId) {
      this.__nodeId = generator();
    }
    return this.__nodeId;
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
  private _value: AnimatedGen.animatedValue | undefined;
  private makeValue: (generator: IdGenerator) => AnimatedGen.animatedValue;
  constructor(initialValue: T) {
    super(idGenerator =>
      AnimatedGen.AnimatedNode_make(this.value(idGenerator))
    );
    this.makeValue = generateId => {
      let value;
      if (typeof initialValue === "string") {
        value = AnimatedGen.AnimatedValue_ofString(
          initialValue,
          this.lazyNodeId(generateId)
        );
      } else if (typeof initialValue === "number") {
        value = AnimatedGen.AnimatedValue_ofFloat(
          initialValue,
          this.lazyNodeId(generateId)
        );
      } else if (typeof initialValue === "boolean") {
        value = AnimatedGen.AnimatedValue_ofBool(
          initialValue,
          this.lazyNodeId(generateId)
        );
      } else {
        throw Error(
          `AnimatedValue cannot be initiated with ${typeof initialValue}`
        );
      }
      return value;
    };
  }
  value(generator: IdGenerator): AnimatedGen.animatedValue {
    if (!this._value) {
      this._value = this.makeValue(generator);
    }
    return this._value;
  }

  setValue(_value: Adaptable<T>): void {
    /* TODO: add implmenetaiton */
  }

  interpolate(config: InterpolationConfig): AnimatedNode<number> {
    return new AnimatedNode(idGenerator =>
      AnimatedGen.interpolate(
        AnimatedGen.AnimatedNode_toAdaptable(this.node(idGenerator)),
        serializeInterpolationConfig(config, idGenerator)
      )
    );
  }
}

export const arrayToNode = <T extends Value>(
  array: ReadonlyArray<Adaptable<T>>,
  idGenerator: IdGenerator
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
  idGenerator: IdGenerator
): AnimatedGen.adaptable => {
  return AnimatedGen.AnimatedNode_toAdaptable(arrayToNode(array, idGenerator));
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
  idGenerator: IdGenerator
): AnimatedGen.adaptable => {
  if (adaptable instanceof AnimatedNode || adaptable instanceof AnimatedValue) {
    return AnimatedGen.AnimatedNode_toAdaptable(adaptable.node(idGenerator));
  } else if (Array.isArray(adaptable)) {
    return arrayToAdaptable(adaptable, idGenerator);
  } else {
    return primitiveToAdaptable(adaptable);
  }
};

export const serializeInterpolationConfig = (
  config: InterpolationConfig,
  idGenerator: IdGenerator
) => ({
  inputRange: config.inputRange.map(x => toAdaptable(x, idGenerator)),
  outputRange: config.outputRange.map(x => toAdaptable(x, idGenerator)),
  extrapolate: config.extrapolate,
  extrapolateLeft: config.extrapolateLeft,
  extrapolateRight: config.extrapolateRight,
});

export class AnimatedClock extends AnimatedNode<number> {
  private _clock: AnimatedGen.clock | undefined;
  constructor() {
    super(generateId => AnimatedGen.Clock_toNode(this.clock(generateId)));
  }
  clock(idGenerator: IdGenerator): AnimatedGen.clock {
    if (!this._clock) {
      this._clock = AnimatedGen.Clock_make(this.lazyNodeId(idGenerator));
    }
    return this._clock;
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
