// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var ProtoEncoders = require("./ProtoEncoders.bs.js");
var ComponentRegistry = require("./ComponentRegistry.bs.js");

var name = "AnimatedImage";

function encoder(key, param, param$1, param$2) {
  var props = param[0];
  return {
          key: key,
          value: /* `AnimatedImage */[
            1034091928,
            {
              style: ProtoEncoders.encodeAnimatedStyleOptional(props),
              sourceURLString: props.source
            }
          ]
        };
}

ComponentRegistry.add(name, encoder);

exports.name = name;
exports.encoder = encoder;
/*  Not a pure module */
