open Struct_manual

module Google_mirror = struct
  module Protobuf = struct
    module NullValue : sig
      type t = null_value_t = NULL_VALUE 
      val to_int: t -> int
      val from_int: int -> t Ocaml_protoc_plugin.Result.t
    end = struct 
      type t = null_value_t = NULL_VALUE 
      let to_int = null_value_to_int
      let from_int = null_value_from_int
    end
    module Struct : sig
      module FieldsEntry : sig
        val name': unit -> string
        type t = (string * Struct_manual.value_t option) 
        val to_proto: t -> Ocaml_protoc_plugin.Writer.t
        val from_proto: Ocaml_protoc_plugin.Reader.t -> t Ocaml_protoc_plugin.Result.t
      end
      val name': unit -> string
      type t = fields_entry_t list 
      val to_proto: t -> Ocaml_protoc_plugin.Writer.t
      val from_proto: Ocaml_protoc_plugin.Reader.t -> t Ocaml_protoc_plugin.Result.t
    end = struct 
      module FieldsEntry : sig
        val name': unit -> string
        type t = (string * Struct_manual.value_t option) 
        val to_proto: t -> Ocaml_protoc_plugin.Writer.t
        val from_proto: Ocaml_protoc_plugin.Reader.t -> t Ocaml_protoc_plugin.Result.t
      end = struct 
        let name' = fields_entry_name'
        type t = (string * value_t option) 
        let to_proto = fields_entry_to_proto
        let from_proto = fields_entry_from_proto
      end
      let name' = struct_name'
      type t = fields_entry_t list 
        let to_proto = struct_to_proto
        let from_proto = struct_from_proto
    end
    module Value : sig
      val name': unit -> string
      type t = [ `Null_value of null_value_t | `Number_value of float | `String_value of string | `Bool_value of bool | `Struct_value of struct_t | `List_value of list_value_t ] 
      val to_proto: t -> Ocaml_protoc_plugin.Writer.t
      val from_proto: Ocaml_protoc_plugin.Reader.t -> t Ocaml_protoc_plugin.Result.t
    end = struct 
      let name' = value_name'
      type t = [ `Null_value of null_value_t | `Number_value of float | `String_value of string | `Bool_value of bool | `Struct_value of struct_t | `List_value of list_value_t ] 
      let to_proto = value_to_proto
      let from_proto = value_from_proto
    end
    module ListValue : sig
      val name': unit -> string
      type t = value_t list 
      val to_proto: t -> Ocaml_protoc_plugin.Writer.t
      val from_proto: Ocaml_protoc_plugin.Reader.t -> t Ocaml_protoc_plugin.Result.t
    end = struct 
      let name' = list_value_name'
      type t = value_t list 
      let to_proto = list_value_to_proto
      let from_proto = list_value_from_proto
    end
  end
end
