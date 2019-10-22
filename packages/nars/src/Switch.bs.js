// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ProtoEncoders = require("./ProtoEncoders.bs.js");
var StructDecoders = require("./StructDecoders.bs.js");
var ComponentRegistry = require("./ComponentRegistry.bs.js");

var name = "Switch";

function encoder(key, param, registerCallback, param$1) {
  var props = param[0];
  return {
          key: key,
          value: /* `Switch */[
            -99762668,
            {
              style: ProtoEncoders.encodeStyleOptional(props),
              value: props.value,
              onValueChange: ProtoEncoders.encodeCallback(registerCallback, (function (args) {
                      var callback = props.onValueChange;
                      return Curry._1(callback, StructDecoders.getFieldExn("value", args, StructDecoders.getBool));
                    }))
            }
          ]
        };
}

ComponentRegistry.add(name, encoder);

exports.name = name;
exports.encoder = encoder;
/*  Not a pure module */
