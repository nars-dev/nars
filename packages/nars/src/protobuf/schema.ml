(************************************************)
(*       AUTOGENERATED FILE - DO NOT EDIT!      *)
(************************************************)
(* Generated by: ocaml-protoc-plugin            *)
(* https://github.com/issuu/ocaml-protoc-plugin *)
(************************************************)
(*
   Source: schema.proto
   Syntax: proto3 
   Parameters:
     debug=false
     annot=''
     opens=[]
     int64_as_int=false
     int32_as_int=true
     fixed_as_int=false
     singleton_record=false
*)

open Ocaml_protoc_plugin.Runtime [@@warning "-33"]
(**/**)
module Imported'modules = struct
  module Struct = Struct
  module Nars_animated = Nars_animated
end
(**/**)
module rec StringValue : sig
  val name': unit -> string
  type t = string 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.StringValue"
  type t = string
  let to_proto =
    let apply = fun ~f a -> f [] a in
    let spec = Runtime'.Serialize.C.( basic (1, string, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions a -> a in
    let spec = Runtime'.Deserialize.C.( basic (1, string, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Int32Value : sig
  val name': unit -> string
  type t = int 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Int32Value"
  type t = int
  let to_proto =
    let apply = fun ~f a -> f [] a in
    let spec = Runtime'.Serialize.C.( basic (1, int32_int, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions a -> a in
    let spec = Runtime'.Deserialize.C.( basic (1, int32_int, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and LocalCallback : sig
  val name': unit -> string
  type t = { localKey: string; args: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.LocalCallback"
  type t = { localKey: string; args: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option }
  let to_proto =
    let apply = fun ~f:f' { localKey; args } -> f' [] localKey args in
    let spec = Runtime'.Serialize.C.( basic (1, string, proto3) ^:: basic_opt (2, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions localKey args -> { localKey; args } in
    let spec = Runtime'.Deserialize.C.( basic (1, string, proto3) ^:: basic_opt (2, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Callback : sig
  val name': unit -> string
  type t = [ `not_set | `Remote of int | `Local of LocalCallback.t ] 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Callback"
  type t = [ `not_set | `Remote of int | `Local of LocalCallback.t ]
  let to_proto =
    let apply = fun ~f a -> f [] a in
    let spec = Runtime'.Serialize.C.( oneof ((function | `not_set -> failwith "This case should never _ever_ happen" | `Remote v -> oneof_elem (1, int32_int, v) | `Local v -> oneof_elem (2, (message (fun t -> LocalCallback.to_proto t)), v))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions a -> a in
    let spec = Runtime'.Deserialize.C.( oneof ([ oneof_elem (1, int32_int, fun v -> `Remote v); oneof_elem (2, (message (fun t -> LocalCallback.from_proto t)), fun v -> `Local v) ]) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and LocalProp : sig
  val name': unit -> string
  type t = { localKey: string; propKey: string } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.LocalProp"
  type t = { localKey: string; propKey: string }
  let to_proto =
    let apply = fun ~f:f' { localKey; propKey } -> f' [] localKey propKey in
    let spec = Runtime'.Serialize.C.( basic (1, string, proto3) ^:: basic (2, string, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions localKey propKey -> { localKey; propKey } in
    let spec = Runtime'.Deserialize.C.( basic (1, string, proto3) ^:: basic (2, string, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and FloatValue : sig
  val name': unit -> string
  type t = float 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.FloatValue"
  type t = float
  let to_proto =
    let apply = fun ~f a -> f [] a in
    let spec = Runtime'.Serialize.C.( basic (1, float, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions a -> a in
    let spec = Runtime'.Deserialize.C.( basic (1, float, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and CustomComponent : sig
  val name': unit -> string
  type t = { type_id: string; contents: bytes } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.CustomComponent"
  type t = { type_id: string; contents: bytes }
  let to_proto =
    let apply = fun ~f:f' { type_id; contents } -> f' [] type_id contents in
    let spec = Runtime'.Serialize.C.( basic (1, string, proto3) ^:: basic (2, bytes, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions type_id contents -> { type_id; contents } in
    let spec = Runtime'.Deserialize.C.( basic (1, string, proto3) ^:: basic (2, bytes, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and View : sig
  val name': unit -> string
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; children: ReactElement.t list } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.View"
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; children: ReactElement.t list }
  let to_proto =
    let apply = fun ~f:f' { style; children } -> f' [] style children in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style children -> { style; children } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and FlatList : sig
  val name': unit -> string
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; onEndReached: Callback.t option; onEndReachedThreshold: Int32Value.t option; children: ReactElement.t list; localProps: LocalProp.t list } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.FlatList"
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; onEndReached: Callback.t option; onEndReachedThreshold: Int32Value.t option; children: ReactElement.t list; localProps: LocalProp.t list }
  let to_proto =
    let apply = fun ~f:f' { style; onEndReached; onEndReachedThreshold; children; localProps } -> f' [] style onEndReached onEndReachedThreshold children localProps in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: basic_opt (2, (message (fun t -> Callback.to_proto t))) ^:: basic_opt (3, (message (fun t -> Int32Value.to_proto t))) ^:: repeated (4, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: repeated (5, (message (fun t -> LocalProp.to_proto t)), not_packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style onEndReached onEndReachedThreshold children localProps -> { style; onEndReached; onEndReachedThreshold; children; localProps } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: basic_opt (2, (message (fun t -> Callback.from_proto t))) ^:: basic_opt (3, (message (fun t -> Int32Value.from_proto t))) ^:: repeated (4, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: repeated (5, (message (fun t -> LocalProp.from_proto t)), not_packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and TouchableOpacity : sig
  val name': unit -> string
  type t = { onPress: Callback.t option; children: ReactElement.t list; localProps: LocalProp.t list } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.TouchableOpacity"
  type t = { onPress: Callback.t option; children: ReactElement.t list; localProps: LocalProp.t list }
  let to_proto =
    let apply = fun ~f:f' { onPress; children; localProps } -> f' [] onPress children localProps in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Callback.to_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: repeated (3, (message (fun t -> LocalProp.to_proto t)), not_packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions onPress children localProps -> { onPress; children; localProps } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Callback.from_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: repeated (3, (message (fun t -> LocalProp.from_proto t)), not_packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and RawText : sig
  val name': unit -> string
  type t = string 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.RawText"
  type t = string
  let to_proto =
    let apply = fun ~f a -> f [] a in
    let spec = Runtime'.Serialize.C.( basic (1, string, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions a -> a in
    let spec = Runtime'.Deserialize.C.( basic (1, string, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Text : sig
  val name': unit -> string
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; children: ReactElement.t list; numberOfLines: Int32Value.t option } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Text"
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; children: ReactElement.t list; numberOfLines: Int32Value.t option }
  let to_proto =
    let apply = fun ~f:f' { style; children; numberOfLines } -> f' [] style children numberOfLines in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: basic_opt (3, (message (fun t -> Int32Value.to_proto t))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style children numberOfLines -> { style; children; numberOfLines } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: basic_opt (3, (message (fun t -> Int32Value.from_proto t))) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and TextInput : sig
  val name': unit -> string
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; placeholderTextColor: StringValue.t option; placeholder: StringValue.t option; value: string; localProps: LocalProp.t list; onValueChange: Callback.t option } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.TextInput"
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; placeholderTextColor: StringValue.t option; placeholder: StringValue.t option; value: string; localProps: LocalProp.t list; onValueChange: Callback.t option }
  let to_proto =
    let apply = fun ~f:f' { style; placeholderTextColor; placeholder; value; localProps; onValueChange } -> f' [] style placeholderTextColor placeholder value localProps onValueChange in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: basic_opt (2, (message (fun t -> StringValue.to_proto t))) ^:: basic_opt (3, (message (fun t -> StringValue.to_proto t))) ^:: basic (4, string, proto3) ^:: repeated (5, (message (fun t -> LocalProp.to_proto t)), not_packed) ^:: basic_opt (6, (message (fun t -> Callback.to_proto t))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style placeholderTextColor placeholder value localProps onValueChange -> { style; placeholderTextColor; placeholder; value; localProps; onValueChange } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: basic_opt (2, (message (fun t -> StringValue.from_proto t))) ^:: basic_opt (3, (message (fun t -> StringValue.from_proto t))) ^:: basic (4, string, proto3) ^:: repeated (5, (message (fun t -> LocalProp.from_proto t)), not_packed) ^:: basic_opt (6, (message (fun t -> Callback.from_proto t))) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Switch : sig
  val name': unit -> string
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; value: bool; onValueChange: Callback.t option } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Switch"
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; value: bool; onValueChange: Callback.t option }
  let to_proto =
    let apply = fun ~f:f' { style; value; onValueChange } -> f' [] style value onValueChange in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: basic (2, bool, proto3) ^:: basic_opt (3, (message (fun t -> Callback.to_proto t))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style value onValueChange -> { style; value; onValueChange } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: basic (2, bool, proto3) ^:: basic_opt (3, (message (fun t -> Callback.from_proto t))) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Image : sig
  val name': unit -> string
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; sourceURLString: string } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Image"
  type t = { style: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; sourceURLString: string }
  let to_proto =
    let apply = fun ~f:f' { style; sourceURLString } -> f' [] style sourceURLString in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: basic (2, string, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style sourceURLString -> { style; sourceURLString } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: basic (2, string, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and ReactElement : sig
  val name': unit -> string
  type t = { key: StringValue.t option; value: [ `not_set | `Custom of CustomComponent.t | `View of View.t | `FlatList of FlatList.t | `TouchableOpacity of TouchableOpacity.t | `TextInput of TextInput.t | `Text of Text.t | `RawText of RawText.t | `Switch of Switch.t | `Image of Image.t | `AnimatedText of AnimatedText.t | `AnimatedView of AnimatedView.t | `AnimatedImage of AnimatedImage.t ] } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.ReactElement"
  type t = { key: StringValue.t option; value: [ `not_set | `Custom of CustomComponent.t | `View of View.t | `FlatList of FlatList.t | `TouchableOpacity of TouchableOpacity.t | `TextInput of TextInput.t | `Text of Text.t | `RawText of RawText.t | `Switch of Switch.t | `Image of Image.t | `AnimatedText of AnimatedText.t | `AnimatedView of AnimatedView.t | `AnimatedImage of AnimatedImage.t ] }
  let to_proto =
    let apply = fun ~f:f' { key; value } -> f' [] key value in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> StringValue.to_proto t))) ^:: oneof ((function | `not_set -> failwith "This case should never _ever_ happen" | `Custom v -> oneof_elem (2, (message (fun t -> CustomComponent.to_proto t)), v) | `View v -> oneof_elem (3, (message (fun t -> View.to_proto t)), v) | `FlatList v -> oneof_elem (4, (message (fun t -> FlatList.to_proto t)), v) | `TouchableOpacity v -> oneof_elem (5, (message (fun t -> TouchableOpacity.to_proto t)), v) | `TextInput v -> oneof_elem (6, (message (fun t -> TextInput.to_proto t)), v) | `Text v -> oneof_elem (7, (message (fun t -> Text.to_proto t)), v) | `RawText v -> oneof_elem (8, (message (fun t -> RawText.to_proto t)), v) | `Switch v -> oneof_elem (9, (message (fun t -> Switch.to_proto t)), v) | `Image v -> oneof_elem (10, (message (fun t -> Image.to_proto t)), v) | `AnimatedText v -> oneof_elem (11, (message (fun t -> AnimatedText.to_proto t)), v) | `AnimatedView v -> oneof_elem (12, (message (fun t -> AnimatedView.to_proto t)), v) | `AnimatedImage v -> oneof_elem (13, (message (fun t -> AnimatedImage.to_proto t)), v))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions key value -> { key; value } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> StringValue.from_proto t))) ^:: oneof ([ oneof_elem (2, (message (fun t -> CustomComponent.from_proto t)), fun v -> `Custom v); oneof_elem (3, (message (fun t -> View.from_proto t)), fun v -> `View v); oneof_elem (4, (message (fun t -> FlatList.from_proto t)), fun v -> `FlatList v); oneof_elem (5, (message (fun t -> TouchableOpacity.from_proto t)), fun v -> `TouchableOpacity v); oneof_elem (6, (message (fun t -> TextInput.from_proto t)), fun v -> `TextInput v); oneof_elem (7, (message (fun t -> Text.from_proto t)), fun v -> `Text v); oneof_elem (8, (message (fun t -> RawText.from_proto t)), fun v -> `RawText v); oneof_elem (9, (message (fun t -> Switch.from_proto t)), fun v -> `Switch v); oneof_elem (10, (message (fun t -> Image.from_proto t)), fun v -> `Image v); oneof_elem (11, (message (fun t -> AnimatedText.from_proto t)), fun v -> `AnimatedText v); oneof_elem (12, (message (fun t -> AnimatedView.from_proto t)), fun v -> `AnimatedView v); oneof_elem (13, (message (fun t -> AnimatedImage.from_proto t)), fun v -> `AnimatedImage v) ]) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Unmount : sig
  val name': unit -> string
  type t = unit 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Unmount"
  type t = unit
  let to_proto =
    let apply = fun ~f () -> f [] in
    let spec = Runtime'.Serialize.C.( nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extension -> () in
    let spec = Runtime'.Deserialize.C.( nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Render : sig
  val name': unit -> string
  type t = { name: string; props: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; localProps: string list } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Render"
  type t = { name: string; props: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option; localProps: string list }
  let to_proto =
    let apply = fun ~f:f' { name; props; localProps } -> f' [] name props localProps in
    let spec = Runtime'.Serialize.C.( basic (1, string, proto3) ^:: basic_opt (2, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: repeated (3, string, packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions name props localProps -> { name; props; localProps } in
    let spec = Runtime'.Deserialize.C.( basic (1, string, proto3) ^:: basic_opt (2, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: repeated (3, string, packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Call : sig
  val name': unit -> string
  type t = { messageId: int; args: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Call"
  type t = { messageId: int; args: Imported'modules.Struct.Google_mirror.Protobuf.Struct.t option }
  let to_proto =
    let apply = fun ~f:f' { messageId; args } -> f' [] messageId args in
    let spec = Runtime'.Serialize.C.( basic (1, int32_int, proto3) ^:: basic_opt (2, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.to_proto t))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions messageId args -> { messageId; args } in
    let spec = Runtime'.Deserialize.C.( basic (1, int32_int, proto3) ^:: basic_opt (2, (message (fun t -> Imported'modules.Struct.Google_mirror.Protobuf.Struct.from_proto t))) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and ClientToServer : sig
  val name': unit -> string
  type t = { rootId: int; value: [ `not_set | `Unmount of Unmount.t | `Render of Render.t | `Call of Call.t ] } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.ClientToServer"
  type t = { rootId: int; value: [ `not_set | `Unmount of Unmount.t | `Render of Render.t | `Call of Call.t ] }
  let to_proto =
    let apply = fun ~f:f' { rootId; value } -> f' [] rootId value in
    let spec = Runtime'.Serialize.C.( basic (1, int32_int, proto3) ^:: oneof ((function | `not_set -> failwith "This case should never _ever_ happen" | `Unmount v -> oneof_elem (2, (message (fun t -> Unmount.to_proto t)), v) | `Render v -> oneof_elem (3, (message (fun t -> Render.to_proto t)), v) | `Call v -> oneof_elem (4, (message (fun t -> Call.to_proto t)), v))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions rootId value -> { rootId; value } in
    let spec = Runtime'.Deserialize.C.( basic (1, int32_int, proto3) ^:: oneof ([ oneof_elem (2, (message (fun t -> Unmount.from_proto t)), fun v -> `Unmount v); oneof_elem (3, (message (fun t -> Render.from_proto t)), fun v -> `Render v); oneof_elem (4, (message (fun t -> Call.from_proto t)), fun v -> `Call v) ]) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Error : sig
  val name': unit -> string
  type t = unit 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Error"
  type t = unit
  let to_proto =
    let apply = fun ~f () -> f [] in
    let spec = Runtime'.Serialize.C.( nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extension -> () in
    let spec = Runtime'.Deserialize.C.( nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and Update : sig
  val name': unit -> string
  type t = ReactElement.t list 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.Update"
  type t = ReactElement.t list
  let to_proto =
    let apply = fun ~f a -> f [] a in
    let spec = Runtime'.Serialize.C.( repeated (1, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions a -> a in
    let spec = Runtime'.Deserialize.C.( repeated (1, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and ServerToClient : sig
  val name': unit -> string
  type t = { rootId: int; value: [ `not_set | `Error of Error.t | `Update of Update.t | `Call of Call.t | `AnimatedValueUpdate of Imported'modules.Nars_animated.Nars.Animated.ValueUpdate.t ] } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.ServerToClient"
  type t = { rootId: int; value: [ `not_set | `Error of Error.t | `Update of Update.t | `Call of Call.t | `AnimatedValueUpdate of Imported'modules.Nars_animated.Nars.Animated.ValueUpdate.t ] }
  let to_proto =
    let apply = fun ~f:f' { rootId; value } -> f' [] rootId value in
    let spec = Runtime'.Serialize.C.( basic (1, int32_int, proto3) ^:: oneof ((function | `not_set -> failwith "This case should never _ever_ happen" | `Error v -> oneof_elem (2, (message (fun t -> Error.to_proto t)), v) | `Update v -> oneof_elem (3, (message (fun t -> Update.to_proto t)), v) | `Call v -> oneof_elem (5, (message (fun t -> Call.to_proto t)), v) | `AnimatedValueUpdate v -> oneof_elem (4, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.ValueUpdate.to_proto t)), v))) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions rootId value -> { rootId; value } in
    let spec = Runtime'.Deserialize.C.( basic (1, int32_int, proto3) ^:: oneof ([ oneof_elem (2, (message (fun t -> Error.from_proto t)), fun v -> `Error v); oneof_elem (3, (message (fun t -> Update.from_proto t)), fun v -> `Update v); oneof_elem (5, (message (fun t -> Call.from_proto t)), fun v -> `Call v); oneof_elem (4, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.ValueUpdate.from_proto t)), fun v -> `AnimatedValueUpdate v) ]) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and AnimatedView : sig
  val name': unit -> string
  type t = { style: Imported'modules.Nars_animated.Nars.Animated.Style.t option; children: ReactElement.t list } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.AnimatedView"
  type t = { style: Imported'modules.Nars_animated.Nars.Animated.Style.t option; children: ReactElement.t list }
  let to_proto =
    let apply = fun ~f:f' { style; children } -> f' [] style children in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.Style.to_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style children -> { style; children } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.Style.from_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and AnimatedText : sig
  val name': unit -> string
  type t = { style: Imported'modules.Nars_animated.Nars.Animated.Style.t option; children: ReactElement.t list } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.AnimatedText"
  type t = { style: Imported'modules.Nars_animated.Nars.Animated.Style.t option; children: ReactElement.t list }
  let to_proto =
    let apply = fun ~f:f' { style; children } -> f' [] style children in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.Style.to_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.to_proto t)), not_packed) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style children -> { style; children } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.Style.from_proto t))) ^:: repeated (2, (message (fun t -> ReactElement.from_proto t)), not_packed) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end
and AnimatedImage : sig
  val name': unit -> string
  type t = { style: Imported'modules.Nars_animated.Nars.Animated.Style.t option; sourceURLString: string } 
  val to_proto: t -> Runtime'.Writer.t
  val from_proto: Runtime'.Reader.t -> (t, [> Runtime'.Result.error]) result
end = struct 
  let name' () = "schema.AnimatedImage"
  type t = { style: Imported'modules.Nars_animated.Nars.Animated.Style.t option; sourceURLString: string }
  let to_proto =
    let apply = fun ~f:f' { style; sourceURLString } -> f' [] style sourceURLString in
    let spec = Runtime'.Serialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.Style.to_proto t))) ^:: basic (2, string, proto3) ^:: nil ) in
    let serialize = Runtime'.Serialize.serialize [] (spec) in
    fun t -> apply ~f:serialize t
  
  let from_proto =
    let constructor = fun _extensions style sourceURLString -> { style; sourceURLString } in
    let spec = Runtime'.Deserialize.C.( basic_opt (1, (message (fun t -> Imported'modules.Nars_animated.Nars.Animated.Style.from_proto t))) ^:: basic (2, string, proto3) ^:: nil ) in
    let deserialize = Runtime'.Deserialize.deserialize [] spec constructor in
    fun writer -> deserialize writer |> Runtime'.Result.open_error
  
end