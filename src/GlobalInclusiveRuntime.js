/**
 * GlobalInclusiveRuntime.js (Backbone) -- Initializes $ and _ setting them to "root.$" and "root._" before
 * delegating to GlobalRuntime.js to initialize Backbone. "root" is defined as self in the browser or global if
 * on the server.
 *
 * Note: We use CJS here as ES6 imports are hoisted. We must set root.$ before initializing Backbone.
 */

'use strict';

/* eslint-disable no-var */

// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
// We use `self` instead of `window` for `WebWorker` support.
var root = (typeof self === 'object' && self.self === self && self) ||
 (typeof global === 'object' && global.global === global && global);

if (typeof root !== 'undefined' && root !== null)
{
   root.$ = require('jquery');
   root._ = require('underscore');
}
else
{
   throw new Error('Could not find a valid global object.');
}

require('./GlobalRuntime.js');