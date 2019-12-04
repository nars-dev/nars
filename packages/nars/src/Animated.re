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
module AnimatedValue = {
  [@genType.opaque]
  type t = Schema.Value.t;
  [@genType]
  let ofString = (x, __nodeID): t => {initialValue: `String(x), __nodeID};
  [@genType]
  let ofFloat = (x, __nodeID): t => {initialValue: `Float(x), __nodeID};
  [@genType]
  let ofBool = (x, __nodeID): t => {initialValue: `Bool(x), __nodeID};
};
module AnimatedNode = {
  [@genType.opaque]
  type t = Schema.Node.t;
  [@genType]
  let toAdaptable = (t: t): AnimatedAdaptable.t => `Node(t);
  [@genType]
  let make = (x: AnimatedValue.t): t => `Value(x);
};
module Clock = {
  [@genType.opaque]
  type t = Schema.Clock.t;
  [@genType.opaque]
  type operation = Schema.ClockOperation.t;
  [@genType]
  let operationToNode = (operation: operation): AnimatedNode.t => {
    `ClockOperation(operation);
  };
  [@genType]
  let toNode = (clock: t): AnimatedNode.t => {
    `Clock(clock);
  };
  [@genType]
  let make = (__nodeId: int): t => {
    __nodeId;
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
