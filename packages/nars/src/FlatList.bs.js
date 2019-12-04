// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var ProtoEncoders = require("./ProtoEncoders.bs.js");
var ComponentRegistry = require("./ComponentRegistry.bs.js");

var name = "FlatList";

function encoder(key, param, bridge, children) {
  var props = param[0];
  var children$1 = $$Array.to_list(props.keys.map((function (key, i) {
              var init = Caml_array.caml_array_get(children, i);
              return {
                      key: key,
                      value: init.value
                    };
            })));
  return {
          key: key,
          value: /* `FlatList */[
            -193011497,
            {
              style: ProtoEncoders.encodeStyleOptional(props),
              onEndReached: ProtoEncoders.encodeArityZeroCallbackOptional(bridge.registerCallback, props.onEndReached),
              onEndReachedThreshold: Js_option.map((function (threshold) {
                      return threshold | 0;
                    }), props.onEndReachedThreshold),
              children: children$1,
              localProps: ProtoEncoders.encodeOptionalLocalProps(props.localProps)
            }
          ]
        };
}

ComponentRegistry.add(name, encoder);

var FL = 0;

var opt_map = Js_option.map;

exports.name = name;
exports.FL = FL;
exports.opt_map = opt_map;
exports.encoder = encoder;
/*  Not a pure module */
