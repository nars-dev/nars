[@genType]
type container;

[@genType]
let createContainer:
  (~flushUpdates: array(Instance.encodedReactElement) => unit) => container;
[@genType]
let updateContainer:
  (~element: ReactReconciler.reactElement, ~container: container) =>
  ReactReconciler.expirationTime;
[@genType]
let unbatchedUpdates: (unit => 'a) => 'a;
[@genType]
let invokeCallback:
  (~container: container, ~messageId: int, ~args: Instance.args) => unit;
