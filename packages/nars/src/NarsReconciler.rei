[@genType]
type container;

let createContainer:
  (
    ~flushUpdates: array(Instance.encoded) => unit,
    ~updateAnimatedValue: (
                            ~value: Animated.animatedValue,
                            ~toValue: Animated.adaptable
                          ) =>
                          unit
  ) =>
  container;
let updateContainer:
  (~element: ReactReconciler.reactElement, ~container: container) =>
  ReactReconciler.expirationTime;
let unbatchedUpdates: (unit => 'a) => 'a;
let invokeCallback:
  (~container: container, ~messageId: int, ~args: Instance.args) => unit;
[@genType]
let batchedUpdates: (unit => 'a) => 'a;
[@genType]
let flushPassiveEffects: unit => bool;
[@genType]
let isThisRendererActing: {. [@bs.set] "current": bool};

let nullElement: ReactReconciler.reactElement;
