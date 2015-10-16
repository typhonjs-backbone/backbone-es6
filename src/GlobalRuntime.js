/**
 * GlobalRuntime.js -- Initializes Backbone and sets it to "root".Backbone if it exists.
 */

'use strict';

import Backbone   from './ModuleRuntime.js';

// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
// We use `self` instead of `window` for `WebWorker` support.
const root = (typeof self === 'object' && self.self === self && self) ||
 (typeof global === 'object' && global.global === global && global);

if (typeof root !== 'undefined' && root !== null)
{
   root.Backbone = Backbone;
}
else
{
   throw new Error('Could not find a valid global object.');
}

export default Backbone;