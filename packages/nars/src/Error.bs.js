// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var NarsInternalError = Caml_exceptions.create("Error.NarsInternalError");

function make(t) {
  return [
          NarsInternalError,
          /* t */t,
          /* humanReadable */t ? "Component with this name exists: \'" + (String(t[0]) + "\'") : "\'Wait\' is a special component name used for suspended rendering"
        ];
}

exports.NarsInternalError = NarsInternalError;
exports.make = make;
/* No side effect */
