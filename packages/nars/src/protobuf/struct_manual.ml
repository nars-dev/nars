  type null_value_t = NULL_VALUE 
  let null_value_to_int = function
    | NULL_VALUE -> 0
  
  let null_value_from_int = function
    | 0 -> Ok NULL_VALUE
    | n -> Error (`Unknown_enum_value n)

type fields_entry_t = (string * value_t option) 
and struct_t = fields_entry_t list 
and value_t = [ `Null_value of null_value_t | `Number_value of float | `String_value of string | `Bool_value of bool | `Struct_value of struct_t | `List_value of list_value_t ] 
and list_value_t = value_t list 
  
let fields_entry_name' () = "Struct.google_mirror.protobuf.Struct.FieldsEntry"
let struct_name' () = "Struct.google_mirror.protobuf.Struct"
let value_name' () = "Struct.google_mirror.protobuf.Value"
let list_value_name' () = "Struct.google_mirror.protobuf.ListValue"

let rec fields_entry_to_proto t_ = 
  let apply = fun ~f (a, b) -> f a b in
  let spec = Ocaml_protoc_plugin.Serialize.C.( basic (1, string, proto3) ^:: basic_opt (2, (message value_to_proto)) ^:: nil ) in
  let serialize = Ocaml_protoc_plugin.Serialize.serialize (spec) in
  apply ~f:(serialize ()) t_
and fields_entry_from_proto writer_= 
  let constructor = fun a b -> (a, b) in
  let spec = Ocaml_protoc_plugin.Deserialize.C.( basic (1, string, proto3) ^:: basic_opt (2, (message value_from_proto)) ^:: nil ) in
  let deserialize = Ocaml_protoc_plugin.Deserialize.deserialize (spec) constructor in
  deserialize writer_
and struct_to_proto t_ = 
  let apply = fun ~f a -> f a in
  let spec = Ocaml_protoc_plugin.Serialize.C.( repeated (1, (message fields_entry_to_proto), not_packed) ^:: nil ) in
  let serialize = Ocaml_protoc_plugin.Serialize.serialize (spec) in
  apply ~f:(serialize ()) t_
and struct_from_proto writer_ = 
    let constructor = fun a -> a in
    let spec = Ocaml_protoc_plugin.Deserialize.C.( repeated (1, (message fields_entry_from_proto), not_packed) ^:: nil ) in
    let deserialize = Ocaml_protoc_plugin.Deserialize.deserialize (spec) constructor in
    deserialize writer_
and value_to_proto t_ = 
  let apply = fun ~f a -> f a in
  let spec = Ocaml_protoc_plugin.Serialize.C.( oneof ((function `Null_value v -> oneof_elem (1, (enum null_value_to_int), v) | `Number_value v -> oneof_elem (2, double, v) | `String_value v -> oneof_elem (3, string, v) | `Bool_value v -> oneof_elem (4, bool, v) | `Struct_value v -> oneof_elem (5, (message struct_to_proto), v) | `List_value v -> oneof_elem (6, (message list_value_to_proto), v))) ^:: nil ) in
  let serialize = Ocaml_protoc_plugin.Serialize.serialize (spec) in
  apply ~f:(serialize ()) t_
and value_from_proto writer_ = 
  let constructor = fun a -> a in
  let spec = Ocaml_protoc_plugin.Deserialize.C.( oneof ([ oneof_elem (1, (enum null_value_from_int), fun v -> `Null_value v); oneof_elem (2, double, fun v -> `Number_value v); oneof_elem (3, string, fun v -> `String_value v); oneof_elem (4, bool, fun v -> `Bool_value v); oneof_elem (5, (message struct_from_proto), fun v -> `Struct_value v); oneof_elem (6, (message list_value_from_proto), fun v -> `List_value v) ]) ^:: nil ) in
  let deserialize = Ocaml_protoc_plugin.Deserialize.deserialize (spec) constructor in
  deserialize writer_
and list_value_to_proto t_ = 
  let apply = fun ~f a -> f a in
  let spec = Ocaml_protoc_plugin.Serialize.C.( repeated (1, (message value_to_proto), not_packed) ^:: nil ) in
  let serialize = Ocaml_protoc_plugin.Serialize.serialize (spec) in
  apply ~f:(serialize ()) t_
and list_value_from_proto writer_ = 
  let constructor = fun a -> a in
  let spec = Ocaml_protoc_plugin.Deserialize.C.( repeated (1, (message value_from_proto), not_packed) ^:: nil ) in
  let deserialize = Ocaml_protoc_plugin.Deserialize.deserialize (spec) constructor in
  deserialize writer_
