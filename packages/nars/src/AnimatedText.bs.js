// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var ProtoEncoders = require("./ProtoEncoders.bs.js");
var ComponentRegistry = require("./ComponentRegistry.bs.js");

var name = "AnimatedText";

function encoder(key, param, param$1, children) {
  return {
          key: key,
          value: /* `AnimatedText */[
            -230079216,
            {
              style: ProtoEncoders.encodeAnimatedStyleOptional(param$1.updateAnimatedValue, param[0]),
              children: $$Array.to_list(children)
            }
          ]
        };
}

ComponentRegistry.add(name, encoder);

exports.name = name;
exports.encoder = encoder;
/*  Not a pure module */
