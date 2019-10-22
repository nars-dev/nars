// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Struct_manual = require("./struct_manual.bs.js");

var NullValue = {
  to_int: Struct_manual.null_value_to_int,
  from_int: Struct_manual.null_value_from_int
};

var FieldsEntry = {
  name$prime: Struct_manual.fields_entry_name$prime,
  to_proto: Struct_manual.fields_entry_to_proto,
  from_proto: Struct_manual.fields_entry_from_proto
};

var Struct = {
  FieldsEntry: FieldsEntry,
  name$prime: Struct_manual.struct_name$prime,
  to_proto: Struct_manual.struct_to_proto,
  from_proto: Struct_manual.struct_from_proto
};

var Value = {
  name$prime: Struct_manual.value_name$prime,
  to_proto: Struct_manual.value_to_proto,
  from_proto: Struct_manual.value_from_proto
};

var ListValue = {
  name$prime: Struct_manual.list_value_name$prime,
  to_proto: Struct_manual.list_value_to_proto,
  from_proto: Struct_manual.list_value_from_proto
};

var Protobuf = {
  NullValue: NullValue,
  Struct: Struct,
  Value: Value,
  ListValue: ListValue
};

var Google_mirror = {
  Protobuf: Protobuf
};

exports.Google_mirror = Google_mirror;
/* Struct_manual Not a pure module */
