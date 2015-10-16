/**
 * A little hack for SystemJS Builder to replace the jQuery module loading it from any globally defined version from
 * external script tags. This is used when creating a partial inclusive bundle via GlobalRuntime.js.
 */

'use strict';

// Establish the root object, `window` (`self`) in the browser, or `global` on the server.
// We use `self` instead of `window` for `WebWorker` support.
const root = (typeof self === 'object' && self.self === self && self) ||
 (typeof global === 'object' && global.global === global && global);

if (typeof root === 'undefined' || root === null)
{
   throw new Error('Could not find a valid global object.');
}

export default (root.jQuery || root.Zepto || root.ender || root.$);
