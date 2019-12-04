// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function ofString(x) {
  return /* `Primitive */[
          -919902073,
          /* `String */[
            -976970511,
            x
          ]
        ];
}

function ofFloat(x) {
  return /* `Primitive */[
          -919902073,
          /* `Float */[
            365180284,
            x
          ]
        ];
}

function ofBool(x) {
  return /* `Primitive */[
          -919902073,
          /* `Bool */[
            737456202,
            x
          ]
        ];
}

var AnimatedAdaptable = {
  ofString: ofString,
  ofFloat: ofFloat,
  ofBool: ofBool
};

function ofString$1(x, __nodeID) {
  return {
          initialValue: /* `String */[
            -976970511,
            x
          ],
          __nodeID: __nodeID
        };
}

function ofFloat$1(x, __nodeID) {
  return {
          initialValue: /* `Float */[
            365180284,
            x
          ],
          __nodeID: __nodeID
        };
}

function ofBool$1(x, __nodeID) {
  return {
          initialValue: /* `Bool */[
            737456202,
            x
          ],
          __nodeID: __nodeID
        };
}

var AnimatedValue = {
  ofString: ofString$1,
  ofFloat: ofFloat$1,
  ofBool: ofBool$1
};

function toAdaptable(t) {
  return /* `Node */[
          870528546,
          t
        ];
}

function make(x) {
  return /* `Value */[
          -991563951,
          x
        ];
}

var AnimatedNode = {
  toAdaptable: toAdaptable,
  make: make
};

function operationToNode(operation) {
  return /* `ClockOperation */[
          -641121127,
          operation
        ];
}

function toNode(clock) {
  return /* `Clock */[
          -611288658,
          clock
        ];
}

function make$1(__nodeId) {
  return __nodeId;
}

var Clock = {
  operationToNode: operationToNode,
  toNode: toNode,
  make: make$1
};

function interpolate(value, config) {
  return /* `Interpolate */[
          56978593,
          {
            value: value,
            config: {
              inputRange: $$Array.to_list(config.inputRange),
              outputRange: $$Array.to_list(config.outputRange),
              extrapolate: config.extrapolate,
              extrapolateLeft: config.extrapolateLeft,
              extrapolateRight: config.extrapolateRight
            }
          }
        ];
}

function multiOperator(operator) {
  return (function (a, b, others) {
      return /* `Multi */[
              595786329,
              {
                a: a,
                b: b,
                others: $$Array.to_list(others),
                operator: operator
              }
            ];
    });
}

var add = multiOperator(/* Add */0);

var sub = multiOperator(/* Sub */1);

var multiply = multiOperator(/* Multiply */2);

var divide = multiOperator(/* Divide */3);

var pow = multiOperator(/* Pow */4);

var modulo = multiOperator(/* Modulo */5);

var and_ = multiOperator(/* And */6);

var or_ = multiOperator(/* Or */7);

function unaryOperator(operator) {
  return (function (value) {
      return /* `Unary */[
              974046607,
              {
                value: value,
                operator: operator
              }
            ];
    });
}

var sqrt = unaryOperator(/* Sqrt */0);

var log = unaryOperator(/* Log */1);

var sin = unaryOperator(/* Sin */2);

var cos = unaryOperator(/* Cos */3);

var tan = unaryOperator(/* Tan */4);

var acos = unaryOperator(/* Acos */5);

var asin = unaryOperator(/* Asin */6);

var atan = unaryOperator(/* Atan */7);

var exp = unaryOperator(/* Exp */8);

var round = unaryOperator(/* Round */9);

var floor = unaryOperator(/* Floor */10);

var ceil = unaryOperator(/* Ceil */11);

var defined = unaryOperator(/* Defined */12);

var not_ = unaryOperator(/* Not */13);

function binaryOperator(operator) {
  return (function (a, b) {
      return /* `Binary */[
              564146209,
              {
                operator: operator,
                left: a,
                right: b
              }
            ];
    });
}

var max = binaryOperator(/* Max */0);

var min = binaryOperator(/* Min */1);

var lessThan = binaryOperator(/* LessThan */2);

var eq = binaryOperator(/* Eq */3);

var greaterThan = binaryOperator(/* GreaterThan */4);

var lessOrEq = binaryOperator(/* LessOrEq */5);

var greaterOrEq = binaryOperator(/* GreaterOrEq */6);

var neq = binaryOperator(/* Neq */7);

function set_(valueToBeUpdated, toValue) {
  return /* `Setter */[
          605857695,
          {
            valueToBeUpdated: valueToBeUpdated,
            toValue: toValue
          }
        ];
}

function concat(array) {
  return /* `Concat */[
          -60523212,
          $$Array.to_list(array)
        ];
}

function cond(condition, ifNode, elseNode) {
  return /* `Cond */[
          748545538,
          {
            condition: condition,
            ifNode: ifNode,
            elseNode: elseNode
          }
        ];
}

function block(array) {
  return /* `Block */[
          -936778451,
          $$Array.to_list(array)
        ];
}

function debug(debugMessage, value) {
  return /* `Debug */[
          -364068301,
          {
            debugMessage: debugMessage,
            value: value
          }
        ];
}

function onChange(value, action) {
  return /* `OnChange */[
          -254721009,
          {
            value: value,
            action: action
          }
        ];
}

function clockOperation(operation) {
  return (function (clock) {
      return /* `ClockOperation */[
              -641121127,
              {
                clock: clock,
                operation: operation
              }
            ];
    });
}

var startClock = clockOperation(/* Start */0);

var stopClock = clockOperation(/* Stop */1);

var clockRunning = clockOperation(/* IsRunning */2);

function derivedUnaryOperator(operator) {
  return (function (value) {
      return /* `DerivedUnary */[
              -272748366,
              {
                value: value,
                operator: operator
              }
            ];
    });
}

var abs = derivedUnaryOperator(/* Abs */0);

var acc = derivedUnaryOperator(/* Acc */1);

var diff = derivedUnaryOperator(/* Diff */2);

function color(r, g, b, alpha) {
  return /* `Color */[
          -578166461,
          {
            r: r,
            g: g,
            b: b,
            alpha: alpha
          }
        ];
}

function diffClamp(value, minVal, maxVal) {
  return /* `DiffClamp */[
          860533910,
          {
            value: value,
            minVal: minVal,
            maxVal: maxVal
          }
        ];
}

function serializePhysicsState(param) {
  var state = param.animationState;
  return {
          animation: {
            finished: state.finished,
            position: state.position,
            time: state.time
          },
          velocity: param.velocity
        };
}

function animation(clock, state, config) {
  return /* `Animation */[
          -318255388,
          /* `Spring */[
            -131446035,
            {
              clock: clock,
              state: serializePhysicsState(state),
              config: {
                damping: config.damping,
                mass: config.mass,
                stiffness: config.stiffness,
                overshootClamping: config.overshootClamping,
                restSpeedThreshold: config.restSpeedThreshold,
                restDisplacementThreshold: config.restDisplacementThreshold,
                toValue: config.toValue
              }
            }
          ]
        ];
}

var SpringAnimation = {
  animation: animation
};

function animation$1(clock, state, deceleration) {
  return /* `Animation */[
          -318255388,
          /* `Decay */[
            -364023014,
            {
              clock: clock,
              state: serializePhysicsState(state),
              config: Caml_option.some(deceleration)
            }
          ]
        ];
}

var DecayAnimation = {
  animation: animation$1
};

function animation$2(clock, param, config) {
  var state = param.animationState;
  return /* `Animation */[
          -318255388,
          /* `Timing */[
            -748058966,
            {
              clock: clock,
              state: {
                animation: {
                  finished: state.finished,
                  position: state.position,
                  time: state.time
                },
                frameTime: param.frameTime
              },
              config: {
                toValue: config.toValue,
                duration: config.duration,
                easing: undefined
              }
            }
          ]
        ];
}

var TimingAnimation = {
  animation: animation$2
};

var Schema = 0;

var decay = animation$1;

var timing = animation$2;

var spring = animation;

exports.Schema = Schema;
exports.AnimatedAdaptable = AnimatedAdaptable;
exports.AnimatedValue = AnimatedValue;
exports.AnimatedNode = AnimatedNode;
exports.Clock = Clock;
exports.interpolate = interpolate;
exports.multiOperator = multiOperator;
exports.add = add;
exports.sub = sub;
exports.multiply = multiply;
exports.divide = divide;
exports.pow = pow;
exports.modulo = modulo;
exports.and_ = and_;
exports.or_ = or_;
exports.unaryOperator = unaryOperator;
exports.sqrt = sqrt;
exports.log = log;
exports.sin = sin;
exports.cos = cos;
exports.tan = tan;
exports.acos = acos;
exports.asin = asin;
exports.atan = atan;
exports.exp = exp;
exports.round = round;
exports.floor = floor;
exports.ceil = ceil;
exports.defined = defined;
exports.not_ = not_;
exports.binaryOperator = binaryOperator;
exports.max = max;
exports.min = min;
exports.lessThan = lessThan;
exports.eq = eq;
exports.greaterThan = greaterThan;
exports.lessOrEq = lessOrEq;
exports.greaterOrEq = greaterOrEq;
exports.neq = neq;
exports.set_ = set_;
exports.concat = concat;
exports.cond = cond;
exports.block = block;
exports.debug = debug;
exports.onChange = onChange;
exports.clockOperation = clockOperation;
exports.startClock = startClock;
exports.stopClock = stopClock;
exports.clockRunning = clockRunning;
exports.derivedUnaryOperator = derivedUnaryOperator;
exports.abs = abs;
exports.acc = acc;
exports.diff = diff;
exports.color = color;
exports.diffClamp = diffClamp;
exports.serializePhysicsState = serializePhysicsState;
exports.SpringAnimation = SpringAnimation;
exports.DecayAnimation = DecayAnimation;
exports.TimingAnimation = TimingAnimation;
exports.decay = decay;
exports.timing = timing;
exports.spring = spring;
/* add Not a pure module */
