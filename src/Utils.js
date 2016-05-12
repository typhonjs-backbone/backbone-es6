'use strict';

import _             from 'underscore';
import BackboneProxy from './BackboneProxy.js';

/**
 * Provides static utility functions.
 * --------
 *
 * Proxy Backbone class methods to Underscore functions, wrapping the model's `attributes` object or collection's
 * `models` array behind the scenes.
 *
 * `Function#apply` can be slow so we use the method's arg count, if we know it.
 *
 * @example
 * collection.filter(function(model) { return model.get('age') > 10 });
 * collection.each(this.addView);
 */
export default class Utils
{
   /**
    * Adds Underscore methods if they exist from keys of the `methods` hash to `Class` running against the variable
    * defined by `attribute`
    *
    * @param {Class}    Class       -  Class to add Underscore methods to.
    * @param {object}   methods     -  Hash with keys as method names and values as argument length.
    * @param {string}   attribute   -  The variable to run Underscore methods against. Often "attributes"
    */
   static addUnderscoreMethods(Class, methods, attribute)
   {
      _.each(methods, (length, method) =>
      {
         if (_[method]) { Class.prototype[method] = s_ADD_METHOD(length, method, attribute); }
      });
   }

   /**
    * Method for checking whether an unknown variable is an instance of `Backbone.Model`.
    *
    * @param {*}  unknown - Variable to test.
    * @returns {boolean}
    */
   static isModel(unknown)
   {
      return unknown instanceof BackboneProxy.backbone.Model;
   }

   /**
    * Method for checking whether a variable is undefined or null.
    *
    * @param {*}  unknown - Variable to test.
    * @returns {boolean}
    */
   static isNullOrUndef(unknown)
   {
      return unknown === null || typeof unknown === 'undefined';
   }

   /**
    * Throw an error when a URL is needed, and none is supplied.
    */
   static urlError()
   {
      throw new Error('A "url" property or function must be specified');
   }

   /**
    * Wrap an optional error callback with a fallback error event.
    *
    * @param {Model|Collection}  model    - Model or Collection target to construct and error callback against.
    * @param {object}            options  - Options hash to store error callback inside.
    */
   static wrapError(model, options)
   {
      const error = options.error;
      options.error = (resp) =>
      {
         if (error) { error.call(options.context, model, resp, options); }
         model.trigger('error', model, resp, options);
      };
   }
}

// Private / internal methods ---------------------------------------------------------------------------------------

/**
 * Creates an optimized function that dispatches to an associated Underscore function.
 *
 * @param {number}   length      - Length of variables for given Underscore method to dispatch.
 * @param {string}   method      - Function name of Underscore to invoke.
 * @param {string}   attribute   - Attribute to associate with the Underscore function invoked.
 * @returns {Function}
 */
const s_ADD_METHOD = (length, method, attribute) =>
{
   switch (length)
   {
      case 1:
         return function()
         {
            return _[method](this[attribute]);
         };
      case 2:
         return function(value)
         {
            return _[method](this[attribute], value);
         };
      case 3:
         return function(iteratee, context)
         {
            return _[method](this[attribute], s_CB(iteratee), context);
         };
      case 4:
         return function(iteratee, defaultVal, context)
         {
            return _[method](this[attribute], s_CB(iteratee), defaultVal, context);
         };
      default:
         return function()
         {
            const args = Array.prototype.slice.call(arguments);
            args.unshift(this[attribute]);
            return _[method](...args);
         };
   }
};

/**
 * Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
 *
 * @param {*} iteratee  -
 * @returns {*}
 */
const s_CB = (iteratee) =>
{
   if (_.isFunction(iteratee)) { return iteratee; }
   if (_.isObject(iteratee) && !Utils.isModel(iteratee)) { return s_MODEL_MATCHER(iteratee); }
   if (_.isString(iteratee))
   {
      return function(model)
      {
         return model.get(iteratee);
      };
   }
   return iteratee;
};

/**
 * Creates a matching function against `attrs`.
 *
 * @param {*} attrs -
 * @returns {Function}
 */
const s_MODEL_MATCHER = (attrs) =>
{
   const matcher = _.matches(attrs);
   return (model) =>
   {
      return matcher(model.attributes);
   };
};