/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// assuming we're in node, let's try to get node's
// version of setImmediate, bypassing fake timers if any.
const enqueueTask = require('timers').setImmediate;

export default enqueueTask;
