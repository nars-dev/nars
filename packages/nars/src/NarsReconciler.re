module CallbackRegistry = Belt.HashMap.Int;

type instance = Instance.t;

type containerInfo = {
  flushUpdates: array(Instance.encodedReactElement) => unit,
  children: array(instance),
  callbackRegistry: CallbackRegistry.t(Instance.args => unit),
};

let createInstance =
    (instance_type, props, _rootContainer, _context, _internalInstanceHandle) => {
  switch (ComponentRegistry.get(~name=instance_type)) {
  | Some(createEncoder) =>
    Instance.Component({encode: createEncoder(props), children: [||]})
  | None => invalid_arg("Unknown component type " ++ instance_type)
  };
};

let defaultRootHostContext = ();

let getPublicInstance = x => x;

let getRootHostContext = _ => {
  defaultRootHostContext;
};

let getChildHostContext = (~parentHostContext, ~parentType as _, _) => parentHostContext;

let prepareForCommit = (~containerInfo as _) => {
  ();
};

let resetAfterCommit = (container: containerInfo) => {
  CallbackRegistry.clear(container.callbackRegistry);
  let counter = ref(0);
  let registerCallback = callback => {
    let id = counter^;
    incr(counter);
    CallbackRegistry.set(container.callbackRegistry, id, callback);
    id;
  };
  let children =
    Js.Array.map(
      inst => Instance.encode(~registerCallback, inst),
      container.children,
    );
  container.flushUpdates(children);
  ();
};

let assertComponentInstance = (instance, f) => {
  switch (instance) {
  | Instance.RawText(_) => invalid_arg("Cannot append children to RawText")
  | Component(parentInstance) => f(parentInstance)
  };
};

let appendInitialChild = (~parentInstance, ~child) => {
  assertComponentInstance(parentInstance, parentInstance =>
    Js.Array.push(child, parentInstance.children)
  )
  |> ignore;
};

let finalizeInitialChildren = (_, _, _, _, _hostContext) => false;

let prepareUpdate = (_, ~type_ as _, ~oldProps, ~newProps, _, _) => {
  let changedProps = [||];
  let newSet = Js.Dict.keys(newProps) |> Belt.Set.String.fromArray;
  let oldSet = Js.Dict.keys(oldProps) |> Belt.Set.String.fromArray;
  Belt.Set.String.forEachU(Belt.Set.String.union(newSet, oldSet), (. key) =>
    if (Js.Dict.get(newProps, key) !== Js.Dict.get(oldProps, key)) {
      Js.Array.push(key, changedProps) |> ignore;
    } else {
      ();
    }
  );

  Js.Nullable.return(changedProps);
};

let createTextInstance = (text, _, _, _) => {
  Instance.RawText(
    () => ComponentRegistry.createRawTextEncodedReactElement(text),
  );
};

let shouldSetTextContent = (~type_ as _, _props) => false;

let shouldDeprioritizeSubtree = (~type_ as _, _) => {
  false;
};

let eventComponentsNotImplemented = () =>
  failwith("Event components are not implemented");

let mountEventComponent = _ => eventComponentsNotImplemented();

let handleEventTarget = _ => eventComponentsNotImplemented();

let commitEventTarget = _ => eventComponentsNotImplemented();

let getChildHostContextForEventComponent = (~parentHostContext as _) =>
  eventComponentsNotImplemented();

let getChildHostContextForEventTarget = (~parentHostContext as _) =>
  eventComponentsNotImplemented();

let getEventTargetChildElement = (_, _) => eventComponentsNotImplemented();

let appendChild = (~parent, ~child) => {
  appendInitialChild(~parentInstance=parent, ~child);
};

let appendChildToContainer = (container: containerInfo, child: Instance.t) => {
  Js.Array.push(child, container.children) |> ignore;
};

let commitMount = (_, _, _, _) => {
  ();
};

let commitUpdate =
    (instance, _, instance_type, ~oldProps as _, ~newProps as props, _) => {
  switch (ComponentRegistry.get(~name=instance_type), instance) {
  | (Some(createEncoder), Instance.Component(instance)) =>
    instance.encode = createEncoder(props)
  | _ => invalid_arg("Cannot update component type " ++ instance_type)
  };
};

let insertBefore = (~parent, ~child, ~beforeChild) => {
  assertComponentInstance(
    parent,
    parentInstance => {
      let index =
        Js.Array.findIndex(x => beforeChild === x, parentInstance.children);
      Js.Array.spliceInPlace(
        ~pos=index,
        ~remove=0,
        ~add=[|child|],
        parentInstance.children,
      )
      |> ignore;
    },
  );
};

let insertInContainerBefore = (container, ~child, ~beforeChild) => {
  let index = Js.Array.findIndex(x => beforeChild === x, container.children);
  Js.Array.spliceInPlace(
    ~pos=index,
    ~remove=0,
    ~add=[|child|],
    container.children,
  )
  |> ignore;
};

let removeChild = (~parent, ~child) => {
  assertComponentInstance(
    parent,
    parent => {
      let pos = Js.Array.findIndex(x => child === x, parent.children);
      Js.Array.spliceInPlace(~pos, ~remove=1, ~add=[||], parent.children)
      |> ignore;
    },
  );
};

let removeChildFromContainer = (parent, child) => {
  let pos = Js.Array.findIndex(x => child === x, parent.children);
  Js.Array.spliceInPlace(~pos, ~remove=1, ~add=[||], parent.children)
  |> ignore;
};

let hideInstance = _ => {
  ();
};

let unhideInstance = (_, _) => {
  ();
};

let commitTextUpdate = (_, ~oldText as _, ~newText as _) => {
  ();
};

let hideTextInstance = _ => {
  ();
};

let unhideTextInstance = (_, _) => {
  ();
};

let resetTextContent = _ => {
  ();
};

let reconciler =
  ReactReconciler.makeHostConfigSupportingMutation(
    ~supportsMutation=true,
    ~isPrimaryRenderer=true,
    ~getPublicInstance,
    ~getRootHostContext,
    ~getChildHostContext,
    ~prepareForCommit,
    ~resetAfterCommit,
    ~createInstance,
    ~appendInitialChild,
    ~finalizeInitialChildren,
    ~prepareUpdate,
    ~createTextInstance,
    ~shouldSetTextContent,
    ~shouldDeprioritizeSubtree,
    ~now=Js.Date.now,
    ~cancelTimeout=Js.Global.clearTimeout,
    ~scheduleTimeout=Js.Global.setTimeout,
    ~noTimeout=-1,
    ~mountEventComponent,
    ~handleEventTarget,
    ~commitEventTarget,
    ~getChildHostContextForEventComponent,
    ~getChildHostContextForEventTarget,
    ~getEventTargetChildElement,
    ~appendChild,
    ~appendChildToContainer,
    ~commitMount,
    ~commitUpdate,
    ~insertBefore,
    ~insertInContainerBefore,
    ~removeChild,
    ~removeChildFromContainer,
    ~hideInstance,
    ~unhideInstance,
    ~commitEventTarget,
    ~commitTextUpdate,
    ~hideTextInstance,
    ~unhideTextInstance,
    ~resetTextContent,
  )
  |> ReactReconciler.make;

type container = {
  registry: CallbackRegistry.t(Instance.args => unit),
  opaqueRoot: ReactReconciler.opaqueRoot,
};

let createContainer = (~flushUpdates) => {
  let registry = CallbackRegistry.make(~hintSize=50);
  let opaqueRoot =
    ReactReconciler.createContainer(
      reconciler,
      {flushUpdates, children: [||], callbackRegistry: registry},
    );
  {registry, opaqueRoot};
};
let updateContainer = (~element, ~container) =>
  ReactReconciler.updateContainer(
    reconciler,
    ~element,
    ~container=container.opaqueRoot,
  );
let unbatchedUpdates = f => ReactReconciler.unbatchedUpdates(reconciler, f);
let invokeCallback = (~container, ~messageId, ~args) => {
  switch (CallbackRegistry.get(container.registry, messageId)) {
  | Some(callback) => callback(args)
  | None => ()
  };
};

let batchedUpdates = f => ReactReconciler.batchedUpdates(reconciler, f, ());
let flushPassiveEffects = () =>
  ReactReconciler.flushPassiveEffects(reconciler);
let isThisRendererActing = ReactReconciler.isThisRendererActing(reconciler);
