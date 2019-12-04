module Schema = Nars_animated.Nars.Animated;

module AnimatedAdaptable = {
  [@genType.opaque]
  type t = Schema.Adaptable.t;
  [@genType]
  let ofString = (x): t => `Primitive(`String(x));
  [@genType]
  let ofFloat = (x): t => `Primitive(`Float(x));
  [@genType]
  let ofBool = (x): t => `Primitive(`Bool(x));
};

module AnimatedNode = {
  [@genType.opaque]
  type t = Schema.Node.t;

  type idGenerator = unit => int;

  [@genType.opaque]
  type encodingContext = {
    idGenerator,
    bridge,
  }
  [@genType.opaque]
  and bridge = {
    updateValue:
      (
        encodingContext => Schema.Value.t,
        encodingContext => AnimatedAdaptable.t
      ) =>
      unit,
  };

  type constructor = encodingContext => t;

  [@genType.opaque]
  type internal = {getNode: encodingContext => t};

  type state = {
    constructor,
    mutable memoizedNode: option(t),
  };

  [@genType]
  let make = constructor => {
    let state = {constructor, memoizedNode: None};
    {
      getNode: encodingContext => {
        switch (state.memoizedNode) {
        | Some(memo) => memo
        | None =>
          let newNode = state.constructor(encodingContext);
          state.memoizedNode = Some(newNode);
          newNode;
        };
      },
    };
  };

  [@genType]
  let encode = (value: internal, encodingContext: encodingContext): t => {
    value.getNode(encodingContext);
  };

  [@genType]
  let toAdaptable =
      (t: internal, encodingContext: encodingContext): AnimatedAdaptable.t => {
    `Node(t.getNode(encodingContext));
  };
};

module AnimatedValue = {
  [@genType.opaque]
  type t = Schema.Value.t;

  type constructor = AnimatedNode.encodingContext => t;

  type state = {
    constructor,
    mutable memoizedValue: option(t),
  };

  [@genType.opaque]
  type internal = {
    bridge: ref(option(AnimatedNode.bridge)),
    getValue: constructor,
    node: AnimatedNode.internal,
  };

  [@genType]
  let setValue =
      (
        value: internal,
        toValue: AnimatedNode.encodingContext => AnimatedAdaptable.t,
      ) => {
    switch (value.bridge^) {
    | None => ()
    | Some(bridge) =>
      bridge.updateValue(
        encodingContext => value.getValue(encodingContext),
        encodingContext => toValue(encodingContext),
      )
    };
  };

  [@genType]
  let encode = (value: internal, encodingContext): t => {
    value.getValue(encodingContext);
  };

  [@genType]
  let toNode = (value: internal): AnimatedNode.internal => {
    value.node;
  };

  let make = (constructor): internal => {
    let state: state = {constructor, memoizedValue: None};
    let bridge = ref(None);
    let getValue = encodingContext => {
      bridge := Some(encodingContext.AnimatedNode.bridge);
      switch (state.memoizedValue) {
      | Some(memo) => memo
      | None =>
        let newValue = state.constructor(encodingContext);
        state.memoizedValue = Some(newValue);
        newValue;
      };
    };
    {
      bridge,
      getValue,
      node: {
        AnimatedNode.getNode: encodingContext => {
          `Value(getValue(encodingContext));
        },
      },
    };
  };

  [@genType]
  let ofFloat = (x): internal => {
    make(encodingContext =>
      {initialValue: `Float(x), __nodeID: encodingContext.idGenerator()}
    );
  };

  [@genType]
  let ofString = (x): internal =>
    make(encodingContext =>
      {initialValue: `String(x), __nodeID: encodingContext.idGenerator()}
    );

  [@genType]
  let ofBool = (x): internal =>
    make(encodingContext =>
      {initialValue: `Bool(x), __nodeID: encodingContext.idGenerator()}
    );
};

module Clock = {
  [@genType.opaque]
  type t = Schema.Clock.t;

  [@genType.opaque]
  type operation = Schema.ClockOperation.t;

  type constructor = AnimatedNode.encodingContext => t;

  [@genType.opaque]
  type internal = {
    getClock: constructor,
    node: AnimatedNode.internal,
  };
  type state = {
    constructor,
    mutable memoizedClock: option(t),
  };

  [@genType]
  let make = (): internal => {
    let state: state = {
      constructor: encodingContext => {
        encodingContext.idGenerator();
      },
      memoizedClock: None,
    };
    let getClock = encodingContext => {
      switch (state.memoizedClock) {
      | Some(memo) => memo
      | None =>
        let newValue = state.constructor(encodingContext);
        state.memoizedClock = Some(newValue);
        newValue;
      };
    };
    {
      getClock,
      node: {
        AnimatedNode.getNode: encodingContext => {
          `Clock(getClock(encodingContext));
        },
      },
    };
  };

  [@genType]
  let encode =
      (value: internal, encodingContext: AnimatedNode.encodingContext): t => {
    value.getClock(encodingContext);
  };

  [@genType]
  let toNode =
      (value: internal, encodingContext: AnimatedNode.encodingContext)
      : AnimatedNode.t => {
    value.node.getNode(encodingContext);
  };
};

[@genType]
type clock = Clock.t;
[@genType]
type clockOperation = Clock.operation;
[@genType]
type animatedValue = AnimatedValue.t;
[@genType]
type adaptable = AnimatedAdaptable.t;
[@genType]
type node = AnimatedNode.t;

[@genType]
let nodeToAdaptable = (t: node): AnimatedAdaptable.t => {
  `Node(t);
};

[@genType]
type extrapolate = Schema.ExtrapolateType.t = | Extend | Clamp | Identity;

[@genType]
type interpolationConfig = {
  inputRange: array(adaptable),
  outputRange: array(adaptable),
  extrapolate: option(extrapolate),
  extrapolateLeft: option(extrapolate),
  extrapolateRight: option(extrapolate),
};

[@genType]
let interpolate =
  (. value: adaptable, config: interpolationConfig) => (
    {
      `Interpolate({
        value: Some(value),
        config:
          Some({
            inputRange: Array.to_list(config.inputRange),
            outputRange: Array.to_list(config.outputRange),
            extrapolate: config.extrapolate,
            extrapolateLeft: config.extrapolateLeft,
            extrapolateRight: config.extrapolateRight,
          }),
      });
    }: node
  );

[@genType]
type multiOperator = (. adaptable, adaptable, array(adaptable)) => node;

let multiOperator =
  (. operator) => (
    (. a: adaptable, b: adaptable, others: array(adaptable)) => (
      {
        `Multi({
          Schema.MultiOperator.a: Some(a),
          b: Some(b),
          others: Array.to_list(others),
          operator,
        });
      }: node
    ): multiOperator
  );

[@genType]
let add = multiOperator(. Add);
[@genType]
let sub = multiOperator(. Sub);
[@genType]
let multiply = multiOperator(. Multiply);
[@genType]
let divide = multiOperator(. Divide);
[@genType]
let pow = multiOperator(. Pow);
[@genType]
let modulo = multiOperator(. Modulo);
[@genType]
let and_ = multiOperator(. And);
[@genType]
let or_ = multiOperator(. Or);

[@genType]
type unaryOperator = (. adaptable) => node;

let unaryOperator =
  (. operator) => (
    (. value: adaptable) => (
      {
        `Unary({Schema.UnaryOperator.value: Some(value), operator});
      }: node
    ): unaryOperator
  );

[@genType]
let sqrt = unaryOperator(. Sqrt);
[@genType]
let log = unaryOperator(. Log);
[@genType]
let sin = unaryOperator(. Sin);
[@genType]
let cos = unaryOperator(. Cos);
[@genType]
let tan = unaryOperator(. Tan);
[@genType]
let acos = unaryOperator(. Acos);
[@genType]
let asin = unaryOperator(. Asin);
[@genType]
let atan = unaryOperator(. Atan);
[@genType]
let exp = unaryOperator(. Exp);
[@genType]
let round = unaryOperator(. Round);
[@genType]
let floor = unaryOperator(. Floor);
[@genType]
let ceil = unaryOperator(. Ceil);
[@genType]
let defined = unaryOperator(. Defined);
[@genType]
let not = unaryOperator(. Not);

[@genType]
type binaryOperator = (. adaptable, adaptable) => node;

let binaryOperator =
  (. operator) => (
    (. a: adaptable, b: adaptable) => (
      {
        `Binary({
          Schema.BinaryOperator.left: Some(a),
          right: Some(b),
          operator,
        });
      }: node
    ): binaryOperator
  );

[@genType]
let max = binaryOperator(. Max);
[@genType]
let min = binaryOperator(. Min);
[@genType]
let lessThan = binaryOperator(. LessThan);
[@genType]
let eq = binaryOperator(. Eq);
[@genType]
let greaterThan = binaryOperator(. GreaterThan);
[@genType]
let lessOrEq = binaryOperator(. LessOrEq);
[@genType]
let greaterOrEq = binaryOperator(. GreaterOrEq);
[@genType]
let neq = binaryOperator(. Neq);

[@genType]
let set_ =
  (. valueToBeUpdated: animatedValue, toValue: adaptable) => (
    `Setter({
      valueToBeUpdated: Some(valueToBeUpdated),
      toValue: Some(toValue),
    }): node
  );

[@genType]
let concat =
  (. array: array(adaptable)) => (`Concat(Array.to_list(array)): node);

[@genType]
let cond =
  (. condition: adaptable, ifNode: adaptable, elseNode: option(adaptable)) => (
    {
      `Cond({
        Schema.Condition.condition: Some(condition),
        ifNode: Some(ifNode),
        elseNode,
      });
    }: node
  );

[@genType]
let block =
  (. array: array(adaptable)) => (`Block(Array.to_list(array)): node);

[@genType]
let debug =
  (. debugMessage: string, value: node) => (
    `Debug({debugMessage, value: Some(value)}): node
  );

[@genType]
let onChange =
  (. value: adaptable, action: adaptable) => (
    `OnChange({action: Some(action), value: Some(value)}): node
  );

let clockOperation =
  (. operation) =>
    (. clock: clock) => (
      {
        `ClockOperation({clock: Some(clock), operation});
      }: node
    );

[@genType]
let startClock = clockOperation(. Start);
[@genType]
let stopClock = clockOperation(. Stop);
[@genType]
let clockRunning = clockOperation(. IsRunning);

let derivedUnaryOperator =
  (. operator) => (
    (. value: adaptable) => (
      {
        `DerivedUnary({
          Schema.UnaryDerivedOperator.value: Some(value),
          operator,
        });
      }: node
    ): unaryOperator
  );

[@genType]
let abs = derivedUnaryOperator(. Abs);
[@genType]
let acc = derivedUnaryOperator(. Acc);
[@genType]
let diff = derivedUnaryOperator(. Diff);

[@genType]
let color =
  (. r: adaptable, g: adaptable, b: adaptable, alpha: option(adaptable)) => (
    `Color({Schema.Color.r: Some(r), g: Some(g), b: Some(b), alpha}): node
  );

[@genType]
let diffClamp =
  (. value: adaptable, minVal: adaptable, maxVal: adaptable) => (
    `DiffClamp({
      Schema.DiffClamp.value: Some(value),
      maxVal: Some(maxVal),
      minVal: Some(minVal),
    }): node
  );

type animationState = {
  finished: animatedValue,
  position: animatedValue,
  time: animatedValue,
};

type physicsState = {
  animationState,
  velocity: animatedValue,
};

let serializePhysicsState = ({animationState: state, velocity}) =>
  Some({
    Schema.PhysicsAnimationState.animation:
      Some({
        finished: Some(state.finished),
        time: Some(state.time),
        position: Some(state.position),
      }),
    velocity: Some(velocity),
  });

module SpringAnimation = {
  type config = {
    damping: adaptable,
    mass: adaptable,
    stiffness: adaptable,
    overshootClamping: adaptable,
    restSpeedThreshold: adaptable,
    restDisplacementThreshold: adaptable,
    toValue: adaptable,
  };

  let animation =
    (. clock: clock, state, config) => (
      `Animation(
        `Spring(
          Schema.SpringAnimation.{
            clock: Some(clock),
            state: serializePhysicsState(state),
            config:
              Some({
                damping: Some(config.damping),
                mass: Some(config.mass),
                stiffness: Some(config.stiffness),
                overshootClamping: Some(config.overshootClamping),
                restSpeedThreshold: Some(config.restSpeedThreshold),
                restDisplacementThreshold:
                  Some(config.restDisplacementThreshold),
                toValue: Some(config.toValue),
              }),
          },
        ),
      ): node
    );
};

module DecayAnimation = {
  let animation =
    (. clock: clock, state, deceleration: adaptable) => (
      `Animation(
        `Decay(
          Schema.DecayAnimation.{
            clock: Some(clock),
            state: serializePhysicsState(state),
            config: Some(Some(deceleration)),
          },
        ),
      ): node
    );
};

module TimingAnimation = {
  type state = {
    animationState,
    frameTime: animatedValue,
  };

  type config = {
    toValue: adaptable,
    duration: adaptable,
    /* TODO: Add easing */
  };

  let animation =
    (. clock: clock, {animationState: state, frameTime}, config) => (
      `Animation(
        `Timing(
          Schema.TimingAnimation.{
            clock: Some(clock),
            state:
              Some({
                Schema.TimingState.animation:
                  Some({
                    finished: Some(state.finished),
                    time: Some(state.time),
                    position: Some(state.position),
                  }),
                frameTime: Some(frameTime),
              }),
            config:
              Some({
                duration: Some(config.duration),
                toValue: Some(config.toValue),
                easing: None,
              }),
          },
        ),
      ): node
    );
};

[@genType]
let decay = DecayAnimation.animation;
[@genType]
let timing = TimingAnimation.animation;
[@genType]
let spring = SpringAnimation.animation;
