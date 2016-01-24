'use strict';

import _ from 'underscore';

/**
 * Provides older "extend" functionality for Backbone. While it is still accessible it is recommended
 * to adopt the new Backbone-ES6 patterns and ES6 sub-classing via "extends".
 *
 * Helper function to correctly set up the prototype chain for subclasses. Similar to `goog.inherits`, but uses a hash
 * of prototype properties and class properties to be extended.
 *
 * @see http://backbonejs.org/#Collection-extend
 * @see http://backbonejs.org/#Model-extend
 * @see http://backbonejs.org/#Router-extend
 * @see http://backbonejs.org/#View-extend
 *
 * @param {object}   protoProps  - instance properties
 * @param {object}   staticProps - class properties
 * @returns {*}      Subclass of parent class.
 */
export default function extend(protoProps, staticProps)
{
   const parent = this;
   let child;

   // The constructor function for the new subclass is either defined by you (the "constructor" property in your
   // `extend` definition), or defaulted by us to simply call the parent constructor.
   if (protoProps && _.has(protoProps, 'constructor'))
   {
      child = protoProps.constructor;
   }
   else
   {
      child = function()
      {
         return parent.apply(this, arguments);
      };
   }

   // Add static properties to the constructor function, if supplied.
   _.extend(child, parent, staticProps);

   // Set the prototype chain to inherit from `parent`, without calling `parent` constructor function.
   const Surrogate = function()
   {
      this.constructor = child;
   };

   Surrogate.prototype = parent.prototype;
   child.prototype = new Surrogate();

   // Add prototype properties (instance properties) to the subclass, if supplied.
   if (protoProps)
   {
      _.extend(child.prototype, protoProps);

      // backbone-es6 addition: Because View defines a getter for tagName we must actually redefine this getter
      // from the `protoProps.tagName` if it exists.
      if (protoProps.tagName)
      {
         Object.defineProperty(child.prototype, "tagName", { get: () => { return protoProps.tagName; } });
      }
   }

   // Set a convenience property in case the parent's prototype is needed later.
   child.__super__ = parent.prototype;

   return child;
}