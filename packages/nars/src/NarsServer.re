module Uint8Array = Js.Typed_array.Uint8Array;
module ArrayBuffer = Js.Typed_array.ArrayBuffer;
module NodeBuffer = Node.Buffer;

module Socket = {
  type data;
  external arrayBufferToData: ArrayBuffer.t => data = "%identity";
  external data_to_array_buffer: data => ArrayBuffer.t = "%identity";
  [@genType]
  type t = {
    .
    [@bs.meth] "on": (string, (. data) => unit) => unit,
    [@bs.set] "binaryType": string,
    [@bs.meth] "send": data => unit,
  };
};

[@genType]
type socket = Socket.t;

module Server = {
  [@genType]
  type t = {. [@bs.meth] "on": (string, (. socket) => unit) => unit};
};

[@genType]
type server = Server.t;

[@genType]
type componentSpec = {
  .
  "name": string,
  "localProps": array(string),
  "props": Js.Dict.t(JsValue.t),
};

external uint8ArrayAsArray: Uint8Array.t => Js.Array.t(Uint8Array.elt) =
  "%identity";

module ContainerMap = Belt_HashMapInt;

external nodeBufferToArrayLike:
  Node.Buffer.t => Js.Typed_array.array_like(Uint8Array.elt) =
  "%identity";

let stringToArrayBuffer = str => {
  Uint8Array.from(
    Node.Buffer.fromStringWithEncoding(str, `ascii) |> nodeBufferToArrayLike,
  )
  |> Uint8Array.buffer;
};

let send = (~socket, ~message as value, ~rootId, ~containers) =>
  if (ContainerMap.has(containers, rootId)) {
    let message =
      Schema.ServerToClient.{rootId, value}
      |> Schema.ServerToClient.to_proto
      |> Ocaml_protoc_plugin.Writer.contents;
    socket##send(stringToArrayBuffer(message) |> Socket.arrayBufferToData);
  };

let sendViewUpdates = (~socket, ~rootId, ~containers, reactElements) => {
  send(
    ~socket,
    ~message=`Update(reactElements |> Array.to_list),
    ~rootId,
    ~containers,
  );
};

let updateAnimatedValue = (~socket, ~rootId, ~containers, ~value, ~toValue) => {
  send(
    ~socket,
    ~message=
        `AnimatedValueUpdate({value: Some(value), toValue: Some(toValue)}),
    ~rootId,
    ~containers,
  );
};

[@genType]
let startListening = (server: server, render) => {
  let analytics = Mixpanel.make("RsD4jSdhauL5xheR1WDxcXApnCGh8Kts");
  let (id, idStable) =
    try((UserId.MachineUDID.make(), true)) {
    | _ => (UserId.UUID.make(), false)
    };
  Mixpanel.identify(
    analytics,
    ~anonymousId=id,
    ~traits={"idStable": idStable},
  );
  Mixpanel.track(analytics, ~anonymousId=id, ~event="Server Started");

  server##on("connection", (. socket) => {
    socket##binaryType #= "arraybuffer";
    let containers = ContainerMap.make(~hintSize=10);
    socket##on("message", (. event) => {
      let parsedMessage =
        Js.String.fromCharCodeMany(
          uint8ArrayAsArray(
            Uint8Array.fromBuffer(Socket.data_to_array_buffer(event)),
          ),
        )
        |> Ocaml_protoc_plugin.Reader.create
        |> Schema.ClientToServer.from_proto;
      switch (parsedMessage) {
      | Ok({rootId, value}) =>
        switch (value, ContainerMap.get(containers, rootId)) {
        | (`Render({name, props, localProps}), container) =>
          let container =
            switch (container) {
            | Some(container) => container
            | None =>
              let container =
                NarsReconciler.createContainer(
                  ~flushUpdates=sendViewUpdates(~socket, ~rootId, ~containers),
                  ~updateAnimatedValue=updateAnimatedValue(~socket, ~rootId, ~containers),
                );
              ContainerMap.set(containers, rootId, container);
              container;
            };
          let props =
            Js.Option.map((. props) => JsValue.structToDict(props), props)
            |> Js.Option.getWithDefault(Js.Dict.empty());
          NarsReconciler.updateContainer(
            ~element=
              render(
                {
                  "name": name,
                  "localProps": localProps |> Array.of_list,
                  "props": props,
                }: componentSpec,
              ),
            ~container,
          )
          |> ignore;
        | (`Unmount(_), Some(container)) =>
          ContainerMap.remove(containers, rootId);
          NarsReconciler.unbatchedUpdates(() => {
            NarsReconciler.updateContainer(
              ~element=NarsReconciler.nullElement,
              ~container,
            )
            |> ignore
          });
        | (`Call({messageId, args}), Some(container)) =>
          NarsReconciler.invokeCallback(~container, ~messageId, ~args)
        | (`Unmount(_), None)
        | (`Call(_), None) => ()
        }
      | Error(error) =>
        Ocaml_protoc_plugin.Result.show_error(error) |> Js.Console.error
      };
    });
  });
};
