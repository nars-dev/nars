[@genType]
type container;

let createContainer:
  (
    ~flushUpdates: array(Instance.encoded) => unit,
    ~rpcCall: (RpcInterface.messageId, RpcInterface.arg) => unit,
    ~updateAnimatedValue: (
                            ~value: Animated.animatedValue,
                            ~toValue: Animated.adaptable
                          ) =>
                          unit
  ) =>
  container;
let updateContainer:
  (
    ~element: RpcInterface.t => ReactReconciler.reactElement,
    ~container: container
  ) =>
  ReactReconciler.expirationTime;
let unbatchedUpdates: (unit => 'a) => 'a;
let rpcInterface:
  (~container: container) => RpcInterface.t;
[@genType]
let batchedUpdates: (unit => 'a) => 'a;
[@genType]
let flushPassiveEffects: unit => bool;
[@genType]
let isThisRendererActing: {. [@bs.set] "current": bool};

let nullElement: ReactReconciler.reactElement;
