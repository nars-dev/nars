// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var $$Error = require("./Error.bs.js");
var Instance = require("./Instance.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Belt_HashMapString = require("bs-platform/lib/js/belt_HashMapString.js");

var registry = Belt_HashMapString.make(6);

function add(name, encoder) {
  if (name === Instance.waitComponentName) {
    throw $$Error.make(/* CannotRegisterWaitComponent */0);
  }
  if (Belt_HashMapString.has(registry, name)) {
    throw $$Error.make(/* DuplicateComponentRegistrationAttempt */[name]);
  } else {
    return Belt_HashMapString.set(registry, name, encoder);
  }
}

function createInstance(name, key, props) {
  if (name === Instance.waitComponentName) {
    return /* Wait */0;
  } else {
    var match = Belt_HashMapString.get(registry, name);
    if (match !== undefined) {
      return /* Component */Block.__(1, [{
                  props: /* Props */[props],
                  encode: match,
                  children: /* array */[],
                  key: key
                }]);
    } else {
      return Pervasives.invalid_arg("Unknown primitive component with name " + name);
    }
  }
}

exports.add = add;
exports.createInstance = createInstance;
/* registry Not a pure module */
