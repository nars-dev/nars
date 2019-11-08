// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var ProtoEncoders = require("./ProtoEncoders.bs.js");
var ComponentRegistry = require("./ComponentRegistry.bs.js");

var name = "TouchableOpacity";

function encoder(key, param, registerCallback, children) {
  var props = param[0];
  var onPress = ProtoEncoders.encodeArityZeroCallbackOptional(registerCallback, props.onPress);
  return /* record */[
          /* key */key,
          /* value : `TouchableOpacity */[
            -711832046,
            /* record */[
              /* onPress */onPress,
              /* children */$$Array.to_list(children),
              /* localProps */ProtoEncoders.encodeOptionalLocalProps(props.localProps)
            ]
          ]
        ];
}

ComponentRegistry.add(name, encoder);

exports.name = name;
exports.encoder = encoder;
/*  Not a pure module */
