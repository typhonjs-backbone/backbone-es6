'use strict';

import $             from 'jquery';
import _             from 'underscore';
import BackboneProxy from './BackboneProxy.js';

/**
 * Backbone.js
 *
 * (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Backbone may be freely distributed under the MIT license.
 *
 * For all details and documentation:
 * http://backbonejs.org
 *
 * ---------
 *
 * backbone-es6
 * https://github.com/typhonjs/backbone-es6
 * (c) 2015 Michael Leahy
 * backbone-es6 may be freely distributed under the MPLv2 license.
 *
 * This fork of Backbone converts it to ES6 and provides extension through constructor injection for easy modification.
 * The only major difference from Backbone is that Backbone itself is not a global Events instance anymore. Please
 * see @link{Events.js} for documentation on easily setting up an ES6 event module for global usage.
 *
 * @see http://backbonejs.org
 * @see https://github.com/typhonjs/backbone-es6
 * @author Michael Leahy
 * @version 1.3.3
 * @copyright Michael Leahy 2015
 */
export default class Backbone
{
   /**
    * Initializes Backbone by constructor injection. You may provide variations on any component below by passing
    * in a different version. The "runtime" initializing Backbone is responsible for further modification like
    * supporting the older "extend" support. See backbone-es6/src/ModuleRuntime.js and backbone-es6/src/extend.js
    * for an example on composing Backbone for usage.
    *
    * @param {Collection}  Collection  - A class defining Backbone.Collection.
    * @param {Events}      Events      - A class defining Backbone.Events.
    * @param {History}     History     - A class defining Backbone.History.
    * @param {Model}       Model       - A class defining Backbone.Model.
    * @param {Router}      Router      - A class defining Backbone.Router.
    * @param {View}        View        - A class defining Backbone.View.
    * @param {function}    sync        - A function defining synchronization for Collection & Model.
    * @param {object}      options     - Options to mixin to Backbone.
    * @constructor
    */
   constructor(Collection, Events, History, Model, Router, View, sync, options = {})
   {
      /**
       * Establish the root object, `window` (`self`) in the browser, or `global` on the server.
       * We use `self` instead of `window` for `WebWorker` support.
       *
       * @type {object|global}
       */
      const root = (typeof self === 'object' && self.self === self && self) ||
       (typeof global === 'object' && global.global === global && global);

      /**
       * jQuery or equivalent
       * @type {*}
       */
      this.$ = ($ || root.jQuery || root.Zepto || root.ender || root.$);

      if (typeof this.$ === 'undefined')
      {
         throw new Error("Backbone - ctor - could not locate global '$' (jQuery or equivalent).");
      }

      /**
       * Initial setup. Mixin options and set the BackboneProxy instance to this.
       */
      if (_.isObject(options))
      {
         _.extend(this, options);
      }

      BackboneProxy.backbone = this;

      /**
       * A public reference of the Collection class.
       * @class
       */
      this.Collection = Collection;

      /**
       * A public reference of the Events class.
       * @class
       */
      this.Events = Events;

      /**
       * A public reference of the History class.
       * @class
       */
      this.History = History;

      /**
       * A public reference of the Model class.
       * @class
       */
      this.Model = Model;

      /**
       * A public reference of the Router class.
       * @class
       */
      this.Router = Router;

      /**
       * A public reference of the View class.
       * @class
       */
      this.View = View;

      /**
       * A public instance of History.
       * @instance
       */
      this.history = new History();

      /**
       * A public instance of the sync function.
       * @instance
       */
      this.sync = sync;

      /**
       * Set the default implementation of `Backbone.ajax` to proxy through to `$`.
       * Override this if you'd like to use a different library.
       *
       * @returns {XMLHttpRequest}   XMLHttpRequest
       */
      this.ajax = () =>
      {
         return this.$.ajax(...arguments);
      };
   }
}