!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], ["4","3"], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register('2', ['3', '4', '5', '6'], function (_export) {
  var $, _, BackboneProxy, _classCallCheck, Backbone;

  return {
    setters: [function (_3) {
      $ = _3['default'];
    }, function (_4) {
      _ = _4['default'];
    }, function (_5) {
      BackboneProxy = _5['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }],
    execute: function () {

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
       * Backbone-ES6
       * https://github.com/typhonjs/backbone-es6
       * (c) 2015 Michael Leahy
       * Backbone-ES6 may be freely distributed under the MIT license.
       *
       * This fork of Backbone converts it to ES6 and provides extension through constructor injection for easy modification.
       * The only major difference from Backbone is that Backbone itself is not a global Events instance anymore. Please
       * see @link{Events.js} for documentation on easily setting up an ES6 event module for global usage.
       *
       * @see http://backbonejs.org
       * @see https://github.com/typhonjs/backbone-es6
       * @author Michael Leahy
       * @version 1.2.3
       * @copyright Michael Leahy 2015
       */
      'use strict';

      Backbone =
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
      function Backbone(Collection, Events, History, Model, Router, View, sync) {
        var _this = this,
            _arguments = arguments;

        var options = arguments.length <= 7 || arguments[7] === undefined ? {} : arguments[7];

        _classCallCheck(this, Backbone);

        /**
         * Establish the root object, `window` (`self`) in the browser, or `global` on the server.
         * We use `self` instead of `window` for `WebWorker` support.
         *
         * @type {object|global}
         */
        var root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;

        /**
         * jQuery or equivalent
         * @type {*}
         */
        this.$ = $ || root.jQuery || root.Zepto || root.ender || root.$;

        if (typeof this.$ === 'undefined') {
          throw new Error("Backbone - ctor - could not locate global '$' (jQuery or equivalent).");
        }

        /**
         * Initial setup. Mixin options and set the BackboneProxy instance to this.
         */
        if (_.isObject(options)) {
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
        this.ajax = function () {
          var _$;

          return (_$ = _this.$).ajax.apply(_$, _arguments);
        };
      };

      _export('default', Backbone);
    }
  };
});

$__System.register('7', ['6', '8'], function (_export) {
   var _classCallCheck, _createClass, s_DEBUG_LOG, s_DEBUG_TRACE, Debug;

   return {
      setters: [function (_2) {
         _classCallCheck = _2['default'];
      }, function (_) {
         _createClass = _['default'];
      }],
      execute: function () {
         'use strict';

         s_DEBUG_LOG = false;
         s_DEBUG_TRACE = false;

         /* eslint-disable no-console */

         /**
          * Debug.js - Provides basic logging functionality that can be turned on via setting s_DEBUG_LOG = true;
          *
          * This is temporary until stability is fully tested.
          */

         Debug = (function () {
            function Debug() {
               _classCallCheck(this, Debug);
            }

            _createClass(Debug, null, [{
               key: 'log',

               /**
                * Posts a log message to console.
                *
                * @param {string}   message  - A message to log
                * @param {boolean}  trace    - A boolean indicating whether to also log `console.trace()`
                */
               value: function log(message) {
                  var trace = arguments.length <= 1 || arguments[1] === undefined ? s_DEBUG_TRACE : arguments[1];

                  if (s_DEBUG_LOG) {
                     console.log(message);
                  }

                  if (s_DEBUG_LOG && trace) {
                     console.trace();
                  }
               }
            }]);

            return Debug;
         })();

         _export('default', Debug);
      }
   };
});

$__System.register('9', ['4', '5', '6', '7', '8', 'c', 'd', 'e', 'a', 'b'], function (_export) {
   var _, BackboneProxy, _classCallCheck, Debug, _createClass, _get, _inherits, Events, Model, Utils, s_ADD_OPTIONS, s_SET_OPTIONS, s_ADD_REFERENCE, s_ON_MODEL_EVENT, s_REMOVE_MODELS, s_REMOVE_REFERENCE, s_SPLICE, Collection, collectionMethods;

   return {
      setters: [function (_4) {
         _ = _4['default'];
      }, function (_5) {
         BackboneProxy = _5['default'];
      }, function (_3) {
         _classCallCheck = _3['default'];
      }, function (_6) {
         Debug = _6['default'];
      }, function (_2) {
         _createClass = _2['default'];
      }, function (_c) {
         _get = _c['default'];
      }, function (_d) {
         _inherits = _d['default'];
      }, function (_e) {
         Events = _e['default'];
      }, function (_a) {
         Model = _a['default'];
      }, function (_b) {
         Utils = _b['default'];
      }],
      execute: function () {

         // Private / internal methods ---------------------------------------------------------------------------------------

         /**
          * Default options for `Collection#add`.
          * @type {{add: boolean, remove: boolean}}
          */
         'use strict';

         s_ADD_OPTIONS = { add: true, remove: false };

         /**
          * Default options for `Collection#set`.
          * @type {{add: boolean, remove: boolean}}
          */
         s_SET_OPTIONS = { add: true, remove: true, merge: true };

         /**
          * Internal method to create a model's ties to a collection.
          *
          * @param {Collection}  collection  - A collection instance
          * @param {Model}       model       - A model instance
          */

         s_ADD_REFERENCE = function s_ADD_REFERENCE(collection, model) {
            collection._byId[model.cid] = model;
            var id = collection.modelId(model.attributes);

            Debug.log('Collection - s_ADD_REFERENCE - id: ' + id + '; model.cid: ' + model.cid, true);

            if (!Utils.isNullOrUndef(id)) {
               collection._byId[id] = model;
            }
            model.on('all', s_ON_MODEL_EVENT, collection);
         };

         /**
          * Internal method called every time a model in the set fires an event. Sets need to update their indexes when models
          * change ids. All other events simply proxy through. "add" and "remove" events that originate in other collections
          * are ignored.
          *
          * Note: Because this is the callback added to the model via Events the "this" context is associated with the model.
          *
          * @param {string}      event       - Event name
          * @param {Model}       model       - A model instance
          * @param {Collection}  collection  - A collection instance
          * @param {object}      options     - Optional parameters
          */

         s_ON_MODEL_EVENT = function s_ON_MODEL_EVENT(event, model, collection, options) {
            Debug.log('Collection - s_ON_MODEL_EVENT - 0 - event: ' + event, true);

            if ((event === 'add' || event === 'remove') && collection !== this) {
               return;
            }
            if (event === 'destroy') {
               this.remove(model, options);
            }
            if (event === 'change') {
               var prevId = this.modelId(model.previousAttributes());
               var id = this.modelId(model.attributes);

               Debug.log('Collection - s_ON_MODEL_EVENT - 1 - change - id: ' + id + '; prevId: ' + prevId);

               if (prevId !== id) {
                  if (!Utils.isNullOrUndef(prevId)) {
                     delete this._byId[prevId];
                  }
                  if (!Utils.isNullOrUndef(id)) {
                     this._byId[id] = model;
                  }
               }
            }

            this.trigger.apply(this, arguments);
         };

         /**
          * Internal method called by both remove and set.
          *
          * @param {Collection}     collection  - A collection instance
          * @param {Array<Model>}   models      - A model instance
          * @param {object}         options     - Optional parameters
          * @returns {*}
          */

         s_REMOVE_MODELS = function s_REMOVE_MODELS(collection, models, options) {
            var removed = [];

            for (var i = 0; i < models.length; i++) {
               var model = collection.get(models[i]);

               Debug.log('Collection - s_REMOVE_MODELS - 0 - model: ' + model, true);

               if (!model) {
                  continue;
               }

               Debug.log('Collection - s_REMOVE_MODELS - 1 - model: ' + model.toJSON());

               var index = collection.indexOf(model);

               Debug.log('Collection - s_REMOVE_MODELS - 2 - index: ' + index);

               collection.models.splice(index, 1);
               collection.length--;

               if (!options.silent) {
                  options.index = index;
                  model.trigger('remove', model, collection, options);
               }

               removed.push(model);
               s_REMOVE_REFERENCE(collection, model, options);
            }

            return removed.length ? removed : false;
         };

         /**
          * Internal method to sever a model's ties to a collection.
          *
          * @param {Collection}  collection  - A collection instance
          * @param {Model}       model       - A model instance
          */

         s_REMOVE_REFERENCE = function s_REMOVE_REFERENCE(collection, model) {
            delete collection._byId[model.cid];
            var id = collection.modelId(model.attributes);

            Debug.log('Collection - s_REMOVE_REFERENCE - id: ' + id + '; model.cid: ' + model.cid);

            if (!Utils.isNullOrUndef(id)) {
               delete collection._byId[id];
            }
            if (collection === model.collection) {
               delete model.collection;
            }
            model.off('all', s_ON_MODEL_EVENT, collection);
         };

         /**
          * Splices `insert` into `array` at index `at`.
          *
          * @param {Array}    array    - Target array to splice into
          * @param {Array}    insert   - Array to insert
          * @param {number}   at       - Index to splice at
          */

         s_SPLICE = function s_SPLICE(array, insert, at) {
            at = Math.min(Math.max(at, 0), array.length);
            var tail = new Array(array.length - at);
            var length = insert.length;

            for (var i = 0; i < tail.length; i++) {
               tail[i] = array[i + at];
            }
            for (var i = 0; i < length; i++) {
               array[i + at] = insert[i];
            }
            for (var i = 0; i < tail.length; i++) {
               array[i + length + at] = tail[i];
            }
         };

         /**
          * Backbone.Collection - Collections are ordered sets of models. (http://backbonejs.org/#Collection)
          * -------------------
          *
          * You can bind "change" events to be notified when any model in the collection has been modified, listen for "add"
          * and "remove" events, fetch the collection from the server, and use a full suite of Underscore.js methods.
          *
          * Any event that is triggered on a model in a collection will also be triggered on the collection directly, for
          * convenience. This allows you to listen for changes to specific attributes in any model in a collection, for
          * example: documents.on("change:selected", ...)
          *
          * ---------
          *
          * Underscore methods available to Collection (including aliases):
          *
          * @see http://underscorejs.org/#chain
          * @see http://underscorejs.org/#contains
          * @see http://underscorejs.org/#countBy
          * @see http://underscorejs.org/#difference
          * @see http://underscorejs.org/#each
          * @see http://underscorejs.org/#every
          * @see http://underscorejs.org/#filter
          * @see http://underscorejs.org/#find
          * @see http://underscorejs.org/#first
          * @see http://underscorejs.org/#groupBy
          * @see http://underscorejs.org/#indexBy
          * @see http://underscorejs.org/#indexOf
          * @see http://underscorejs.org/#initial
          * @see http://underscorejs.org/#invoke
          * @see http://underscorejs.org/#isEmpty
          * @see http://underscorejs.org/#last
          * @see http://underscorejs.org/#lastIndexOf
          * @see http://underscorejs.org/#map
          * @see http://underscorejs.org/#max
          * @see http://underscorejs.org/#min
          * @see http://underscorejs.org/#partition
          * @see http://underscorejs.org/#reduce
          * @see http://underscorejs.org/#reduceRight
          * @see http://underscorejs.org/#reject
          * @see http://underscorejs.org/#rest
          * @see http://underscorejs.org/#sample
          * @see http://underscorejs.org/#shuffle
          * @see http://underscorejs.org/#some
          * @see http://underscorejs.org/#sortBy
          * @see http://underscorejs.org/#size
          * @see http://underscorejs.org/#toArray
          * @see http://underscorejs.org/#without
          *
          * @example
          *
          * If using Backbone-ES6 by ES6 source one can create a module for a Backbone.Collection:
          *
          * export default new Backbone.Collection(null,
          * {
          *    model: Backbone.Model.extend(...)
          * });
          *
          * or if importing a specific model class
          *
          * import Model from '<MY-BACKBONE-MODEL>'
          *
          * export default new Backbone.Collection(null,
          * {
          *    model: Model
          * });
          *
          * or use full ES6 style by using a getter for "model":
          *
          * import Model from '<MY-BACKBONE-MODEL>'
          *
          * class MyCollection extends Backbone.Collection
          * {
          *    get model() { return Model; }
          * }
          *
          * export default new MyCollection();   // If desired drop "new" to export the class itself and not an instance.
          */

         Collection = (function (_Events) {
            _inherits(Collection, _Events);

            /**
             * When creating a Collection, you may choose to pass in the initial array of models. The collection's comparator
             * may be included as an option. Passing false as the comparator option will prevent sorting. If you define an
             * initialize function, it will be invoked when the collection is created. There are a couple of options that, if
             * provided, are attached to the collection directly: model and comparator.
             *
             * Pass null for models to create an empty Collection with options.
             *
             * @see http://backbonejs.org/#Collection-constructor
             *
             * @param {Array<Model>}   models   - An optional array of models to set.
             * @param {object}         options  - Optional parameters
             */

            function Collection() {
               var models = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
               var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

               _classCallCheck(this, Collection);

               _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this);

               // Allows child classes to abort constructor execution.
               if (_.isBoolean(options.abortCtor) && options.abortCtor) {
                  return;
               }

               // Must detect if there are any getters defined in order to skip setting these values.
               var hasModelGetter = !_.isUndefined(this.model);
               var hasComparatorGetter = !_.isUndefined(this.comparator);

               // The default model for a collection is just a **Backbone.Model**. This should be overridden in most cases.
               if (!hasModelGetter) {
                  /**
                   * The default Backbone.Model class to use as a prototype for this collection.
                   * @type {Model}
                   */
                  this.model = Model;
               }

               if (options.model && !hasModelGetter) {
                  this.model = options.model;
               }

               if (options.comparator !== void 0 && !hasComparatorGetter) {
                  /**
                   * A comparator string indicating the attribute to sort.
                   * @type {string}
                   */
                  this.comparator = options.comparator;
               }

               // Allows child classes to postpone initialization.
               if (_.isBoolean(options.abortCtorInit) && options.abortCtorInit) {
                  return;
               }

               this._reset();

               this.initialize.apply(this, arguments);

               if (models) {
                  this.reset(models, _.extend({ silent: true }, options));
               }
            }

            // Underscore methods that we want to implement on the Collection. 90% of the core usefulness of Backbone Collections
            // is actually implemented right here:

            /**
             * Add a model (or an array of models) to the collection, firing an "add" event for each model, and an "update"
             * event afterwards. If a model property is defined, you may also pass raw attributes objects, and have them be
             * vivified as instances of the model. Returns the added (or preexisting, if duplicate) models. Pass {at: index} to
             * splice the model into the collection at the specified index. If you're adding models to the collection that are
             * already in the collection, they'll be ignored, unless you pass {merge: true}, in which case their attributes will
             * be merged into the corresponding models, firing any appropriate "change" events.
             *
             * Note that adding the same model (a model with the same id) to a collection more than once is a no-op.
             *
             * @example
             * var ships = new Backbone.Collection;
             *
             * ships.on("add", function(ship) {
             *    alert("Ahoy " + ship.get("name") + "!");
             * });
             *
             * ships.add([
             *    {name: "Flying Dutchman"},
             *    {name: "Black Pearl"}
             * ]);
             *
             * @see http://backbonejs.org/#Collection-add
             *
             * @param {Model|Array<Model>}   models   - A single model or an array of models to add.
             * @param {object}               options  - Optional parameters
             * @returns {*}
             */

            _createClass(Collection, [{
               key: 'add',
               value: function add(models, options) {
                  return this.set(models, _.extend({ merge: false }, options, s_ADD_OPTIONS));
               }

               /**
                * Get a model from a collection, specified by index. Useful if your collection is sorted, and if your collection
                * isn't sorted, at will still retrieve models in insertion order.
                *
                * @see http://backbonejs.org/#Collection-at
                *
                * @param {number}   index - Index for model to retrieve.
                * @returns {*}
                */
            }, {
               key: 'at',
               value: function at(index) {
                  if (index < 0) {
                     index += this.length;
                  }
                  return this.models[index];
               }

               /**
                * Returns a new instance of the collection with an identical list of models.
                *
                * @see http://backbonejs.org/#Collection-clone
                *
                * @returns {Collection} Returns a new collection with shared models.
                */
            }, {
               key: 'clone',
               value: function clone() {
                  return new this.constructor(this.models, {
                     model: this.model,
                     comparator: this.comparator
                  });
               }

               /**
                * Convenience to create a new instance of a model within a collection. Equivalent to instantiating a model with a
                * hash of attributes, saving the model to the server, and adding the model to the set after being successfully
                * created. Returns the new model. If client-side validation failed, the model will be unsaved, with validation
                * errors. In order for this to work, you should set the model property of the collection. The create method can
                * accept either an attributes hash or an existing, unsaved model object.
                *
                * Creating a model will cause an immediate "add" event to be triggered on the collection, a "request" event as the
                * new model is sent to the server, as well as a "sync" event, once the server has responded with the successful
                * creation of the model. Pass {wait: true} if you'd like to wait for the server before adding the new model to the
                * collection.
                *
                * @example
                * var Library = Backbone.Collection.extend({
                *     model: Book
                * });
                *
                * var nypl = new Library;
                *
                * var othello = nypl.create({
                *    title: "Othello",
                *    author: "William Shakespeare"
                * });
                *
                * @see http://backbonejs.org/#Collection-create
                *
                * @param {Model}    attrs    - Attributes hash for the new model
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'create',
               value: function create(attrs, options) {
                  options = options ? _.clone(options) : {};
                  var wait = options.wait;
                  var model = this._prepareModel(attrs, options);

                  if (!model) {
                     return false;
                  }
                  if (!wait) {
                     this.add(model, options);
                  }

                  var collection = this;
                  var success = options.success;

                  options.success = function (model, resp, callbackOpts) {
                     if (wait) {
                        collection.add(model, callbackOpts);
                     }
                     if (success) {
                        success.call(callbackOpts.context, model, resp, callbackOpts);
                     }
                  };

                  model.save(null, options);

                  return model;
               }

               /**
                * Fetch the default set of models for this collection from the server, setting them on the collection when they
                * arrive. The options hash takes success and error callbacks which will both be passed (collection, response,
                * options) as arguments. When the model data returns from the server, it uses set to (intelligently) merge the
                * fetched models, unless you pass {reset: true}, in which case the collection will be (efficiently) reset.
                * Delegates to Backbone.sync under the covers for custom persistence strategies and returns a jqXHR. The server
                * handler for fetch requests should return a JSON array of models.
                *
                * The behavior of fetch can be customized by using the available set options. For example, to fetch a collection,
                * getting an "add" event for every new model, and a "change" event for every changed existing model, without
                * removing anything: collection.fetch({remove: false})
                *
                * jQuery.ajax options can also be passed directly as fetch options, so to fetch a specific page of a paginated
                * collection: Documents.fetch({data: {page: 3}})
                *
                * Note that fetch should not be used to populate collections on page load — all models needed at load time should
                * already be bootstrapped in to place. fetch is intended for lazily-loading models for interfaces that are not
                * needed immediately: for example, documents with collections of notes that may be toggled open and closed.
                *
                * @example
                * Backbone.sync = function(method, model) {
                *    alert(method + ": " + model.url);
                * };
                *
                * var accounts = new Backbone.Collection;
                * accounts.url = '/accounts';
                *
                * accounts.fetch();
                *
                * @see http://backbonejs.org/#Collection-fetch
                *
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'fetch',
               value: function fetch(options) {
                  var _this = this;

                  options = _.extend({ parse: true }, options);
                  var success = options.success;

                  options.success = function (resp) {
                     var method = options.reset ? 'reset' : 'set';
                     Debug.log('Collection - fetch - success callback - method: ' + method, true);
                     _this[method](resp, options);

                     if (success) {
                        success.call(options.context, _this, resp, options);
                     }

                     _this.trigger('sync', _this, resp, options);
                  };

                  Utils.wrapError(this, options);

                  return this.sync('read', this, options);
               }

               /**
                * Just like `where`, but directly returns only the first model in the collection that matches the passed
                * attributes.
                *
                * @see http://backbonejs.org/#Collection-findWhere
                *
                * @param {object}   attrs - Attribute hash to match.
                * @returns {*}
                */
            }, {
               key: 'findWhere',
               value: function findWhere(attrs) {
                  return this.where(attrs, true);
               }

               /**
                * Get a model from a collection, specified by an id, a cid, or by passing in a model.
                *
                * @example
                * var book = library.get(110);
                *
                * @see http://backbonejs.org/#Collection-get
                *
                * @param {Model} obj   - An instance of a model to search for by object, id, or cid.
                * @returns {*}
                */
            }, {
               key: 'get',
               value: function get(obj) {
                  if (Utils.isNullOrUndef(obj)) {
                     return void 0;
                  }

                  var id = this.modelId(Utils.isModel(obj) ? obj.attributes : obj);

                  Debug.log('Collection - get - id: ' + id);

                  return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
               }

               /**
                * Initialize is an empty function by default. Override it with your own initialization logic.
                *
                * @see http://backbonejs.org/#Collection-constructor
                * @abstract
                */
            }, {
               key: 'initialize',
               value: function initialize() {}

               /**
                * Override this method to specify the attribute the collection will use to refer to its models in collection.get.
                * By default returns the idAttribute of the collection's model class or failing that, 'id'. If your collection uses
                * polymorphic models and those models have an idAttribute other than id you must override this method with your own
                * custom logic.
                *
                * @example
                * var Library = Backbone.Collection.extend({
                *    model: function(attrs, options) {
                *       if (condition) {
                *          return new PublicDocument(attrs, options);
                *       } else {
                *          return new PrivateDocument(attrs, options);
                *       }
                *    },
                *
                *    modelId: function(attrs) {
                *       return attrs.private ? 'private_id' : 'public_id';
                *    }
                * });
                *
                * @see http://backbonejs.org/#Collection-modelId
                *
                * @param {object}   attrs - Attributes hash
                * @returns {*}
                */
            }, {
               key: 'modelId',
               value: function modelId(attrs) {
                  Debug.log('Collection - modelId - 0 - this.model.prototype.idAttribute: ' + this.model.prototype.idAttribute, true);
                  Debug.log('Collection - modelId - 1 - attrs: ' + JSON.stringify(attrs));

                  return attrs[this.model.prototype.idAttribute || 'id'];
               }

               /* eslint-disable no-unused-vars */
               /**
                * `parse` is called by Backbone whenever a collection's models are returned by the server, in fetch. The function is
                * passed the raw response object, and should return the array of model attributes to be added to the collection.
                * The default implementation is a no-op, simply passing through the JSON response. Override this if you need to
                * work with a preexisting API, or better namespace your responses.
                *
                * @example
                * var Tweets = Backbone.Collection.extend({
                *    // The Twitter Search API returns tweets under "results".
                *    parse: function(response) {
                *       return response.results;
                *    }
                * });
                *
                * @see http://backbonejs.org/#Collection-parse
                *
                * @param {object}   resp - Usually a JSON object.
                * @param {object}   options - Unused optional parameters.
                * @returns {object} Pass through to set the attributes hash on the model.
                */
            }, {
               key: 'parse',
               value: function parse(resp, options) {
                  /* eslint-enable no-unused-vars */
                  return resp;
               }

               /**
                * Pluck an attribute from each model in the collection. Equivalent to calling map and returning a single attribute
                * from the iterator.
                *
                * @example
                * var stooges = new Backbone.Collection([
                *    {name: "Curly"},
                *    {name: "Larry"},
                *    {name: "Moe"}
                * ]);
                *
                * var names = stooges.pluck("name");
                *
                * alert(JSON.stringify(names));
                *
                * @see http://backbonejs.org/#Collection-pluck
                *
                * @param {string}   attr  - Attribute key
                * @returns {*}
                */
            }, {
               key: 'pluck',
               value: function pluck(attr) {
                  return _.invoke(this.models, 'get', attr);
               }

               /**
                * Remove and return the last model from a collection. Takes the same options as remove.
                *
                * @see http://backbonejs.org/#Collection-pop
                *
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'pop',
               value: function pop(options) {
                  var model = this.at(this.length - 1);
                  return this.remove(model, options);
               }

               /**
                * Prepare a hash of attributes (or other model) to be added to this collection.
                *
                * @protected
                * @param {object}         attrs       - Attribute hash
                * @param {object}         options     - Optional parameters
                * @returns {*}
                */
            }, {
               key: '_prepareModel',
               value: function _prepareModel(attrs, options) {
                  if (Utils.isModel(attrs)) {
                     Debug.log('Collection - _prepareModel - 0', true);
                     if (!attrs.collection) {
                        attrs.collection = this;
                     }
                     return attrs;
                  }

                  options = options ? _.clone(options) : {};
                  options.collection = this;

                  Debug.log('Collection - _prepareModel - 1 - attrs.parseObject: ' + attrs.parseObject);

                  var model = new this.model(attrs, options);

                  if (!model.validationError) {
                     return model;
                  }

                  this.trigger('invalid', this, model.validationError, options);

                  return false;
               }

               /**
                * Add a model at the end of a collection. Takes the same options as `add`.
                *
                * @see http://backbonejs.org/#Collection-push
                *
                * @param {Model}    model    - A Model instance
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'push',
               value: function push(model, options) {
                  return this.add(model, _.extend({ at: this.length }, options));
               }

               /**
                * Remove a model (or an array of models) from the collection, and return them. Each model can be a Model instance,
                * an id string or a JS object, any value acceptable as the id argument of collection.get. Fires a "remove" event
                * for each model, and a single "update" event afterwards. The model's index before removal is available to
                * listeners as options.index.
                *
                * @see http://backbonejs.org/#Collection-remove
                *
                * @param {Model|Array<Model>}   models   - An single model or an array of models to remove.
                * @param {object}               options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'remove',
               value: function remove(models, options) {
                  options = _.extend({}, options);
                  var singular = !_.isArray(models);
                  models = singular ? [models] : _.clone(models);
                  var removed = s_REMOVE_MODELS(this, models, options);

                  if (!options.silent && removed) {
                     this.trigger('update', this, options);
                  }

                  return singular ? removed[0] : removed;
               }

               /**
                * Resets all internal state. Called when the collection is first initialized or reset.
                * @protected
                */
            }, {
               key: '_reset',
               value: function _reset() {
                  /**
                   * The length of the models array.
                   * @type {number}
                   */
                  this.length = 0;

                  /**
                   * An array of models in the collection.
                   * @type {Array<Model>}
                   */
                  this.models = [];

                  this._byId = {};
               }

               /**
                * Adding and removing models one at a time is all well and good, but sometimes you have so many models to change
                * that you'd rather just update the collection in bulk. Use reset to replace a collection with a new list of models
                * (or attribute hashes), triggering a single "reset" event at the end. Returns the newly-set models. For
                * convenience, within a "reset" event, the list of any previous models is available as options.previousModels.
                * Pass null for models to empty your Collection with options.
                *
                * Calling collection.reset() without passing any models as arguments will empty the entire collection.
                *
                * Here's an example using reset to bootstrap a collection during initial page load, in a Rails application:
                * @example
                * <script>
                *    var accounts = new Backbone.Collection;
                *    accounts.reset(<%= @accounts.to_json %>);
                * </script>
                *
                * @see http://backbonejs.org/#Collection-reset
                *
                * @param {Array<Model>}   models   - An array of models to add silently after resetting.
                * @param {object}         options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'reset',
               value: function reset(models, options) {
                  options = options ? _.clone(options) : {};

                  for (var i = 0; i < this.models.length; i++) {
                     s_REMOVE_REFERENCE(this, this.models[i]);
                  }

                  options.previousModels = this.models;

                  this._reset();

                  models = this.add(models, _.extend({ silent: true }, options));

                  if (!options.silent) {
                     this.trigger('reset', this, options);
                  }

                  return models;
               }

               /**
                * The set method performs a "smart" update of the collection with the passed list of models. If a model in the list
                * isn't yet in the collection it will be added; if the model is already in the collection its attributes will be
                * merged; and if the collection contains any models that aren't present in the list, they'll be removed. All of the
                * appropriate "add", "remove", and "change" events are fired as this happens. Returns the touched models in the
                * collection. If you'd like to customize the behavior, you can disable it with options: {add: false},
                * {remove: false}, or {merge: false}.
                *
                * @example
                * var vanHalen = new Backbone.Collection([eddie, alex, stone, roth]);
                *
                * vanHalen.set([eddie, alex, stone, hagar]);
                *
                * // Fires a "remove" event for roth, and an "add" event for "hagar".
                * // Updates any of stone, alex, and eddie's attributes that may have
                * // changed over the years.
                *
                * @see http://backbonejs.org/#Collection-set
                *
                * @param {Array<Model>}   models   - An array of models to set.
                * @param {object}         options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'set',
               value: function set(models, options) {
                  Debug.log('Collection - set - 0', true);
                  if (Utils.isNullOrUndef(models)) {
                     return;
                  }

                  options = _.defaults({}, options, s_SET_OPTIONS);
                  if (options.parse && !Utils.isModel(models)) {
                     models = this.parse(models, options);
                  }

                  var singular = !_.isArray(models);
                  models = singular ? [models] : models.slice();

                  var at = options.at;
                  if (!Utils.isNullOrUndef(at)) {
                     at = +at;
                  }
                  if (at < 0) {
                     at += this.length + 1;
                  }

                  Debug.log('Collection - set - 1 - at: ' + at + '; models.length: ' + models.length);

                  var set = [];
                  var toAdd = [];
                  var toRemove = [];
                  var modelMap = {};

                  var add = options.add;
                  var merge = options.merge;
                  var remove = options.remove;

                  var sort = false;
                  var sortable = this.comparator && Utils.isNullOrUndef(at) && options.sort !== false;
                  var sortAttr = _.isString(this.comparator) ? this.comparator : null;

                  // Turn bare objects into model references, and prevent invalid models from being added.
                  var model = undefined;

                  for (var i = 0; i < models.length; i++) {
                     model = models[i];

                     // If a duplicate is found, prevent it from being added and optionally merge it into the existing model.
                     var existing = this.get(model);
                     if (existing) {
                        Debug.log('Collection - set - 2 - existing');

                        if (merge && model !== existing) {
                           Debug.log('Collection - set - 3 - merge && model !== existing');

                           var attrs = Utils.isModel(model) ? model.attributes : model;
                           if (options.parse) {
                              attrs = existing.parse(attrs, options);
                           }
                           existing.set(attrs, options);
                           if (sortable && !sort) {
                              sort = existing.hasChanged(sortAttr);
                           }
                        }

                        if (!modelMap[existing.cid]) {
                           Debug.log('Collection - set - 4 - !modelMap[existing.cid]');

                           modelMap[existing.cid] = true;
                           set.push(existing);
                        }

                        models[i] = existing;

                        // If this is a new, valid model, push it to the `toAdd` list.
                     } else if (add) {
                           Debug.log('Collection - set - 5 - add');

                           model = models[i] = this._prepareModel(model, options);

                           if (model) {
                              Debug.log('Collection - set - 6 - toAdd');

                              toAdd.push(model);
                              s_ADD_REFERENCE(this, model);
                              modelMap[model.cid] = true;
                              set.push(model);
                           }
                        }
                  }

                  // Remove stale models.
                  if (remove) {
                     for (var i = 0; i < this.length; i++) {
                        model = this.models[i];
                        if (!modelMap[model.cid]) {
                           Debug.log('Collection - set - 7 - toRemove push');
                           toRemove.push(model);
                        }
                     }

                     if (toRemove.length) {
                        Debug.log('Collection - set - 8 - before invoking s_REMOVE_MODELS');
                        s_REMOVE_MODELS(this, toRemove, options);
                     }
                  }

                  // See if sorting is needed, update `length` and splice in new models.
                  var orderChanged = false;
                  var replace = !sortable && add && remove;

                  if (set.length && replace) {
                     orderChanged = this.length !== set.length || _.some(this.models, function (model, index) {
                        return model !== set[index];
                     });

                     Debug.log('Collection - set - 9 - set.length > 0 && replace - orderChanged: ' + orderChanged);

                     this.models.length = 0;

                     s_SPLICE(this.models, set, 0);

                     this.length = this.models.length;
                  } else if (toAdd.length) {
                     if (sortable) {
                        sort = true;
                     }

                     Debug.log('Collection - set - 10 - toAdd.length > 0 - sort: ' + sort + '; at: ' + at);

                     s_SPLICE(this.models, toAdd, Utils.isNullOrUndef(at) ? this.length : at);

                     this.length = this.models.length;
                  }

                  // Silently sort the collection if appropriate.
                  if (sort) {
                     Debug.log('Collection - set - 11 - sorting silent');

                     this.sort({ silent: true });
                  }

                  // Unless silenced, it's time to fire all appropriate add/sort events.
                  if (!options.silent) {
                     Debug.log('Collection - set - 12 - !options.silent: ' + !options.silent);

                     for (var i = 0; i < toAdd.length; i++) {
                        if (!Utils.isNullOrUndef(at)) {
                           options.index = at + i;
                        }

                        model = toAdd[i];
                        model.trigger('add', model, this, options);
                     }

                     if (sort || orderChanged) {
                        this.trigger('sort', this, options);
                     }
                     if (toAdd.length || toRemove.length) {
                        this.trigger('update', this, options);
                     }
                  }

                  // Return the added (or merged) model (or models).
                  return singular ? models[0] : models;
               }

               /**
                * Remove and return the first model from a collection. Takes the same options as `remove`.
                *
                * @see http://backbonejs.org/#Collection-shift
                *
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'shift',
               value: function shift(options) {
                  var model = this.at(0);
                  return this.remove(model, options);
               }

               /**
                * Return a shallow copy of this collection's models, using the same options as native `Array#slice`.
                *
                * @see http://backbonejs.org/#Collection-slice
                *
                * @returns {*}
                */
            }, {
               key: 'slice',
               value: function slice() {
                  return Array.prototype.slice.apply(this.models, arguments);
               }

               /**
                * Force a collection to re-sort itself. You don't need to call this under normal circumstances, as a collection
                * with a comparator will sort itself whenever a model is added. To disable sorting when adding a model, pass
                * {sort: false} to add. Calling sort triggers a "sort" event on the collection.
                *
                * @see http://backbonejs.org/#Collection-sort
                *
                * @param {object}   options  - Optional parameters
                * @returns {Collection}
                */
            }, {
               key: 'sort',
               value: function sort() {
                  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                  var comparator = this.comparator;

                  if (!comparator) {
                     throw new Error('Cannot sort a set without a comparator');
                  }

                  var length = comparator.length;

                  if (_.isFunction(comparator)) {
                     comparator = _.bind(comparator, this);
                  }

                  // Run sort based on type of `comparator`.
                  if (length === 1 || _.isString(comparator)) {
                     this.models = this.sortBy(comparator);
                  } else {
                     this.models.sort(comparator);
                  }

                  if (!options.silent) {
                     this.trigger('sort', this, options);
                  }

                  return this;
               }

               /**
                * Uses Backbone.sync to persist the state of a collection to the server. Can be overridden for custom behavior.
                *
                * @see http://backbonejs.org/#Collection-sync
                *
                * @returns {*}
                */
            }, {
               key: 'sync',
               value: function sync() {
                  Debug.log("Collection - sync", true);
                  return BackboneProxy.backbone.sync.apply(this, arguments);
               }

               /**
                * Return an array containing the attributes hash of each model (via toJSON) in the collection. This can be used to
                * serialize and persist the collection as a whole. The name of this method is a bit confusing, because it conforms
                * to JavaScript's JSON API.
                *
                * @example
                * var collection = new Backbone.Collection([
                *    {name: "Tim", age: 5},
                *    {name: "Ida", age: 26},
                *    {name: "Rob", age: 55}
                * ]);
                *
                * alert(JSON.stringify(collection));
                *
                * @see http://backbonejs.org/#Collection-toJSON
                *
                * @param {object}   options  - Optional parameters
                * @returns {object} JSON
                */
            }, {
               key: 'toJSON',
               value: function toJSON(options) {
                  return this.map(function (model) {
                     return model.toJSON(options);
                  });
               }

               /**
                * Add a model at the beginning of a collection. Takes the same options as `add`.
                *
                * @see http://backbonejs.org/#Collection-unshift
                *
                * @param {Model}    model    - A Model instance
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'unshift',
               value: function unshift(model, options) {
                  return this.add(model, _.extend({ at: 0 }, options));
               }

               /**
                * Return an array of all the models in a collection that match the passed attributes. Useful for simple cases of
                * filter.
                *
                * @example
                * var friends = new Backbone.Collection([
                *    {name: "Athos",      job: "Musketeer"},
                *    {name: "Porthos",    job: "Musketeer"},
                *    {name: "Aramis",     job: "Musketeer"},
                *    {name: "d'Artagnan", job: "Guard"},
                * ]);
                *
                * var musketeers = friends.where({job: "Musketeer"});
                *
                * alert(musketeers.length);
                *
                * @see http://backbonejs.org/#Collection-where
                *
                * @param {object}   attrs - Attribute hash to match.
                * @param {boolean}  first - Retrieve first match or all matches.
                * @returns {*}
                */
            }, {
               key: 'where',
               value: function where(attrs, first) {
                  return this[first ? 'find' : 'filter'](attrs);
               }
            }]);

            return Collection;
         })(Events);

         collectionMethods = {
            forEach: 3, each: 3, map: 3, collect: 3, reduce: 4,
            foldl: 4, inject: 4, reduceRight: 4, foldr: 4, find: 3, detect: 3, filter: 3,
            select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
            contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
            head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
            without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
            isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
            sortBy: 3, indexBy: 3
         };

         // Mix in each Underscore method as a proxy to `Collection#models`.
         Utils.addUnderscoreMethods(Collection, collectionMethods, 'models');

         /**
          * Exports the Collection class.
          */

         _export('default', Collection);
      }
   };
});

$__System.register('f', ['4', '6', '8', 'c', 'd', 'e', 'b'], function (_export) {
   var _, _classCallCheck, _createClass, _get, _inherits, Events, Utils, s_ROUTE_STRIPPER, s_ROOT_STRIPPER, s_PATH_STRIPPER, s_UPDATE_HASH, History;

   return {
      setters: [function (_4) {
         _ = _4['default'];
      }, function (_3) {
         _classCallCheck = _3['default'];
      }, function (_2) {
         _createClass = _2['default'];
      }, function (_c) {
         _get = _c['default'];
      }, function (_d) {
         _inherits = _d['default'];
      }, function (_e) {
         Events = _e['default'];
      }, function (_b) {
         Utils = _b['default'];
      }],
      execute: function () {

         // Private / internal methods ---------------------------------------------------------------------------------------

         /**
          * Cached regex for stripping a leading hash/slash and trailing space.
          */
         'use strict';

         s_ROUTE_STRIPPER = /^[#\/]|\s+$/g;

         /**
          * Cached regex for stripping leading and trailing slashes.
          */
         s_ROOT_STRIPPER = /^\/+|\/+$/g;

         /**
          * Cached regex for stripping urls of hash.
          */
         s_PATH_STRIPPER = /#.*$/;

         /**
          * Update the hash location, either replacing the current entry, or adding a new one to the browser history.
          *
          * @param {object}   location - URL / current location
          * @param {string}   fragment - URL fragment
          * @param {boolean}  replace  - conditional replace
          */

         s_UPDATE_HASH = function s_UPDATE_HASH(location, fragment, replace) {
            if (replace) {
               var href = location.href.replace(/(javascript:|#).*$/, '');
               location.replace(href + '#' + fragment);
            } else {
               // Some browsers require that `hash` contains a leading #.
               location.hash = '#' + fragment;
            }
         };

         /**
          * Backbone.History - History serves as a global router. (http://backbonejs.org/#History)
          * ----------------
          *
          * History serves as a global router (per frame) to handle hashchange events or pushState, match the appropriate route,
          * and trigger callbacks. You shouldn't ever have to create one of these yourself since Backbone.history already
          * contains one.
          *
          * pushState support exists on a purely opt-in basis in Backbone. Older browsers that don't support pushState will
          * continue to use hash-based URL fragments, and if a hash URL is visited by a pushState-capable browser, it will be
          * transparently upgraded to the true URL. Note that using real URLs requires your web server to be able to correctly
          * render those pages, so back-end changes are required as well. For example, if you have a route of /documents/100,
          * your web server must be able to serve that page, if the browser visits that URL directly. For full search-engine
          * crawlability, it's best to have the server generate the complete HTML for the page ... but if it's a web application,
          * just rendering the same content you would have for the root URL, and filling in the rest with Backbone Views and
          * JavaScript works fine.
          *
          * Handles cross-browser history management, based on either [pushState](http://diveintohtml5.info/history.html) and
          * real URLs, or [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange) and URL fragments.
          * If the browser supports neither (old IE, natch), falls back to polling.
          */

         History = (function (_Events) {
            _inherits(History, _Events);

            /** */

            function History() {
               _classCallCheck(this, History);

               _get(Object.getPrototypeOf(History.prototype), 'constructor', this).call(this);

               /**
                * Stores route / callback pairs for validation.
                * @type {Array<Object<string, function>>}
                */
               this.handlers = [];
               this.checkUrl = _.bind(this.checkUrl, this);

               // Ensure that `History` can be used outside of the browser.
               if (typeof window !== 'undefined') {
                  /**
                   * Browser Location or URL string.
                   * @type {Location|String}
                   */
                  this.location = window.location;

                  /**
                   * Browser history
                   * @type {History}
                   */
                  this.history = window.history;
               }

               /**
                * Has the history handling already been started?
                * @type {boolean}
                */
               this.started = false;

               /**
                * The default interval to poll for hash changes, if necessary, is twenty times a second.
                * @type {number}
                */
               this.interval = 50;
            }

            /**
             * Are we at the app root?
             *
             * @returns {boolean}
             */

            _createClass(History, [{
               key: 'atRoot',
               value: function atRoot() {
                  var path = this.location.pathname.replace(/[^\/]$/, '$&/');
                  return path === this.root && !this.getSearch();
               }

               /**
                * Checks the current URL to see if it has changed, and if it has, calls `loadUrl`, normalizing across the
                * hidden iframe.
                *
                * @returns {boolean}
                */
            }, {
               key: 'checkUrl',
               value: function checkUrl() {
                  var current = this.getFragment();

                  // If the user pressed the back button, the iframe's hash will have changed and we should use that for comparison.
                  if (current === this.fragment && this.iframe) {
                     current = this.getHash(this.iframe.contentWindow);
                  }

                  if (current === this.fragment) {
                     return false;
                  }
                  if (this.iframe) {
                     this.navigate(current);
                  }
                  this.loadUrl();
               }

               /**
                * Unicode characters in `location.pathname` are percent encoded so they're decoded for comparison. `%25` should
                * not be decoded since it may be part of an encoded parameter.
                *
                * @param {string}   fragment - URL fragment
                * @return {string}
                */
            }, {
               key: 'decodeFragment',
               value: function decodeFragment(fragment) {
                  return decodeURI(fragment.replace(/%25/g, '%2525'));
               }

               /**
                * Get the cross-browser normalized URL fragment from the path or hash.
                *
                * @param {string} fragment   -- URL fragment
                * @returns {*|void|string|XML}
                */
            }, {
               key: 'getFragment',
               value: function getFragment(fragment) {
                  if (Utils.isNullOrUndef(fragment)) {
                     if (this._usePushState || !this._wantsHashChange) {
                        fragment = this.getPath();
                     } else {
                        fragment = this.getHash();
                     }
                  }
                  return fragment.replace(s_ROUTE_STRIPPER, '');
               }

               /**
                * Gets the true hash value. Cannot use location.hash directly due to bug in Firefox where location.hash will
                * always be decoded.
                *
                * @param {object}   window   - Browser `window`
                * @returns {*}
                */
            }, {
               key: 'getHash',
               value: function getHash(window) {
                  var match = (window || this).location.href.match(/#(.*)$/);
                  return match ? match[1] : '';
               }

               /**
                * Get the pathname and search params, without the root.
                *
                * @returns {*}
                */
            }, {
               key: 'getPath',
               value: function getPath() {
                  var path = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
                  return path.charAt(0) === '/' ? path.slice(1) : path;
               }

               /**
                * In IE6, the hash fragment and search params are incorrect if the fragment contains `?`.
                *
                * @returns {string}
                */
            }, {
               key: 'getSearch',
               value: function getSearch() {
                  var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
                  return match ? match[0] : '';
               }

               /**
                * Attempt to load the current URL fragment. If a route succeeds with a match, returns `true`. If no defined routes
                * matches the fragment, returns `false`.
                *
                * @param {string}   fragment - URL fragment
                * @returns {boolean}
                */
            }, {
               key: 'loadUrl',
               value: function loadUrl(fragment) {
                  // If the root doesn't match, no routes can match either.
                  if (!this.matchRoot()) {
                     return false;
                  }
                  fragment = this.fragment = this.getFragment(fragment);
                  return _.some(this.handlers, function (handler) {
                     if (handler.route.test(fragment)) {
                        handler.callback(fragment);
                        return true;
                     }
                  });
               }

               /**
                * Does the pathname match the root?
                *
                * @returns {boolean}
                */
            }, {
               key: 'matchRoot',
               value: function matchRoot() {
                  var path = this.decodeFragment(this.location.pathname);
                  var root = path.slice(0, this.root.length - 1) + '/';
                  return root === this.root;
               }

               /**
                * Save a fragment into the hash history, or replace the URL state if the 'replace' option is passed. You are
                * responsible for properly URL-encoding the fragment in advance.
                *
                * The options object can contain `trigger: true` if you wish to have the route callback be fired (not usually
                * desirable), or `replace: true`, if you wish to modify the current URL without adding an entry to the history.
                *
                * @param {string}   fragment - String representing an URL fragment.
                * @param {object}   options - Optional hash containing parameters for navigate.
                * @returns {*}
                */
            }, {
               key: 'navigate',
               value: function navigate(fragment, options) {
                  if (!History.started) {
                     return false;
                  }
                  if (!options || options === true) {
                     options = { trigger: !!options };
                  }

                  // Normalize the fragment.
                  fragment = this.getFragment(fragment || '');

                  // Don't include a trailing slash on the root.
                  var root = this.root;

                  if (fragment === '' || fragment.charAt(0) === '?') {
                     root = root.slice(0, -1) || '/';
                  }

                  var url = root + fragment;

                  // Strip the hash and decode for matching.
                  fragment = this.decodeFragment(fragment.replace(s_PATH_STRIPPER, ''));

                  if (this.fragment === fragment) {
                     return;
                  }

                  /**
                   * URL fragment
                   * @type {*|void|string|XML}
                   */
                  this.fragment = fragment;

                  // If pushState is available, we use it to set the fragment as a real URL.
                  if (this._usePushState) {
                     this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

                     // If hash changes haven't been explicitly disabled, update the hash fragment to store history.
                  } else if (this._wantsHashChange) {
                        s_UPDATE_HASH(this.location, fragment, options.replace);

                        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
                           var iWindow = this.iframe.contentWindow;

                           // Opening and closing the iframe tricks IE7 and earlier to push a history
                           // entry on hash-tag change.  When replace is true, we don't want this.
                           if (!options.replace) {
                              iWindow.document.open();
                              iWindow.document.close();
                           }

                           s_UPDATE_HASH(iWindow.location, fragment, options.replace);
                        }

                        // If you've told us that you explicitly don't want fallback hashchange-
                        // based history, then `navigate` becomes a page refresh.
                     } else {
                           return this.location.assign(url);
                        }

                  if (options.trigger) {
                     return this.loadUrl(fragment);
                  }
               }

               /**
                * When all of your Routers have been created, and all of the routes are set up properly, call
                * Backbone.history.start() to begin monitoring hashchange events, and dispatching routes. Subsequent calls to
                * Backbone.history.start() will throw an error, and Backbone.History.started is a boolean value indicating whether
                * it has already been called.
                *
                * To indicate that you'd like to use HTML5 pushState support in your application, use
                * Backbone.history.start({pushState: true}). If you'd like to use pushState, but have browsers that don't support
                * it natively use full page refreshes instead, you can add {hashChange: false} to the options.
                *
                * If your application is not being served from the root url / of your domain, be sure to tell History where the
                * root really is, as an option: Backbone.history.start({pushState: true, root: "/public/search/"})
                *
                * When called, if a route succeeds with a match for the current URL, Backbone.history.start() returns true. If no
                * defined route matches the current URL, it returns false.
                *
                * If the server has already rendered the entire page, and you don't want the initial route to trigger when starting
                * History, pass silent: true.
                *
                * Because hash-based history in Internet Explorer relies on an <iframe>, be sure to call start() only after the DOM
                * is ready.
                *
                * @example
                * import WorkspaceRouter from 'WorkspaceRouter.js';
                * import HelpPaneRouter  from 'HelpPaneRouter.js';
                *
                * new WorkspaceRouter();
                * new HelpPaneRouter();
                * Backbone.history.start({pushState: true});
                *
                * @param {object}   options  - Optional parameters
                * @returns {*}
                */
            }, {
               key: 'start',
               value: function start(options) {
                  if (History.started) {
                     throw new Error('Backbone.history has already been started');
                  }

                  History.started = true;

                  /**
                   * Figure out the initial configuration. Do we need an iframe?
                   * @type {Object}
                   */
                  this.options = _.extend({ root: '/' }, this.options, options);

                  /**
                   * URL root
                   * @type {string}
                   */
                  this.root = this.options.root;

                  this._wantsHashChange = this.options.hashChange !== false;
                  this._hasHashChange = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
                  this._useHashChange = this._wantsHashChange && this._hasHashChange;

                  // Is pushState desired ... is it available?
                  this._wantsPushState = !!this.options.pushState;
                  this._hasPushState = !!(this.history && this.history.pushState);
                  this._usePushState = this._wantsPushState && this._hasPushState;

                  this.fragment = this.getFragment();

                  // Normalize root to always include a leading and trailing slash.
                  this.root = ('/' + this.root + '/').replace(s_ROOT_STRIPPER, '/');

                  // Transition from hashChange to pushState or vice versa if both are requested.
                  if (this._wantsHashChange && this._wantsPushState) {

                     // If we've started off with a route from a `pushState`-enabled
                     // browser, but we're currently in a browser that doesn't support it...
                     if (!this._hasPushState && !this.atRoot()) {
                        var root = this.root.slice(0, -1) || '/';
                        this.location.replace(root + '#' + this.getPath());

                        // Return immediately as browser will do redirect to new url
                        return true;

                        // Or if we've started out with a hash-based route, but we're currently
                        // in a browser where it could be `pushState`-based instead...
                     } else if (this._hasPushState && this.atRoot()) {
                           this.navigate(this.getHash(), { replace: true });
                        }
                  }

                  // Proxy an iframe to handle location events if the browser doesn't support the `hashchange` event, HTML5
                  // history, or the user wants `hashChange` but not `pushState`.
                  if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                     /**
                      * Proxy iframe
                      * @type {Element}
                      */
                     this.iframe = document.createElement('iframe');
                     this.iframe.src = 'javascript:0';
                     this.iframe.style.display = 'none';
                     this.iframe.tabIndex = -1;

                     var body = document.body;

                     // Using `appendChild` will throw on IE < 9 if the document is not ready.
                     var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
                     iWindow.document.open();
                     iWindow.document.close();
                     iWindow.location.hash = '#' + this.fragment;
                  }

                  // Add a cross-platform `addEventListener` shim for older browsers.
                  var addEventListener = window.addEventListener || function (eventName, listener) {
                     /* eslint-disable no-undef */
                     return attachEvent('on' + eventName, listener);
                     /* eslint-enable no-undef */
                  };

                  // Depending on whether we're using pushState or hashes, and whether
                  // 'onhashchange' is supported, determine how we check the URL state.
                  if (this._usePushState) {
                     addEventListener('popstate', this.checkUrl, false);
                  } else if (this._useHashChange && !this.iframe) {
                     addEventListener('hashchange', this.checkUrl, false);
                  } else if (this._wantsHashChange) {
                     this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
                  }

                  if (!this.options.silent) {
                     return this.loadUrl();
                  }
               }

               /**
                * Disable Backbone.history, perhaps temporarily. Not useful in a real app, but possibly useful for unit
                * testing Routers.
                */
            }, {
               key: 'stop',
               value: function stop() {
                  // Add a cross-platform `removeEventListener` shim for older browsers.
                  var removeEventListener = window.removeEventListener || function (eventName, listener) {
                     /* eslint-disable no-undef */
                     return detachEvent('on' + eventName, listener);
                     /* eslint-enable no-undef */
                  };

                  // Remove window listeners.
                  if (this._usePushState) {
                     removeEventListener('popstate', this.checkUrl, false);
                  } else if (this._useHashChange && !this.iframe) {
                     removeEventListener('hashchange', this.checkUrl, false);
                  }

                  // Clean up the iframe if necessary.
                  if (this.iframe) {
                     document.body.removeChild(this.iframe);
                     this.iframe = null;
                  }

                  // Some environments will throw when clearing an undefined interval.
                  if (this._checkUrlInterval) {
                     clearInterval(this._checkUrlInterval);
                  }
                  History.started = false;
               }

               /**
                * Add a route to be tested when the fragment changes. Routes added later may override previous routes.
                *
                * @param {string}   route    -  Route to add for checking.
                * @param {function} callback -  Callback function to invoke on match.
                */
            }, {
               key: 'route',
               value: function route(_route, callback) {
                  this.handlers.unshift({ route: _route, callback: callback });
               }
            }]);

            return History;
         })(Events);

         _export('default', History);
      }
   };
});

$__System.register('a', ['4', '5', '6', '8', 'c', 'd', 'e', 'b'], function (_export) {
   var _, BackboneProxy, _classCallCheck, _createClass, _get, _inherits, Events, Utils, Model, modelMethods;

   return {
      setters: [function (_4) {
         _ = _4['default'];
      }, function (_5) {
         BackboneProxy = _5['default'];
      }, function (_3) {
         _classCallCheck = _3['default'];
      }, function (_2) {
         _createClass = _2['default'];
      }, function (_c) {
         _get = _c['default'];
      }, function (_d) {
         _inherits = _d['default'];
      }, function (_e) {
         Events = _e['default'];
      }, function (_b) {
         Utils = _b['default'];
      }],
      execute: function () {

         /**
          * Backbone.Model - Models are the heart of any JavaScript application. (http://backbonejs.org/#Model)
          * --------------
          *
          * Models are the heart of any JavaScript application, containing the interactive data as well as a large part of the
          * logic surrounding it: conversions, validations, computed properties, and access control.
          *
          * Backbone-ES6 supports the older "extend" functionality of Backbone. You can still use "extend" to extend
          * Backbone.Model with your domain-specific methods, and Model provides a basic set of functionality for managing
          * changes.
          *
          * It is recommended though to use ES6 syntax for working with Backbone-ES6 foregoing the older "extend" mechanism.
          *
          * Create a new model with the specified attributes. A client id (`cid`) is automatically generated & assigned for you.
          *
          * If you pass a {collection: ...} as the options, the model gains a collection property that will be used to indicate
          * which collection the model belongs to, and is used to help compute the model's url. The model.collection property is
          * normally created automatically when you first add a model to a collection. Note that the reverse is not true, as
          * passing this option to the constructor will not automatically add the model to the collection. Useful, sometimes.
          *
          * If {parse: true} is passed as an option, the attributes will first be converted by parse before being set on the
          * model.
          *
          * Underscore methods available to Model:
          * @see http://underscorejs.org/#chain
          * @see http://underscorejs.org/#keys
          * @see http://underscorejs.org/#invert
          * @see http://underscorejs.org/#isEmpty
          * @see http://underscorejs.org/#omit
          * @see http://underscorejs.org/#pairs
          * @see http://underscorejs.org/#pick
          * @see http://underscorejs.org/#values
          *
          * @example
          * import Backbone from 'backbone';
          *
          * export default class MyModel extends Backbone.Model
          * {
          *    initialize() { alert('initialized!); }
          * }
          *
          * older extend example:
          * export default Backbone.Model.extend(
          * {
          *    initialize: { alert('initialized!); }
          * });
          *
          * @example
          * Another older extend example... The following is a contrived example, but it demonstrates defining a model with a
          * custom method, setting an attribute, and firing an event keyed to changes in that specific attribute. After running
          * this code once, sidebar will be available in your browser's console, so you can play around with it.
          *
          * var Sidebar = Backbone.Model.extend({
          *    promptColor: function() {
          *       var cssColor = prompt("Please enter a CSS color:");
          *       this.set({color: cssColor});
          *    }
          * });
          *
          * window.sidebar = new Sidebar;
          *
          * sidebar.on('change:color', function(model, color) {
          *    $('#sidebar').css({ background: color });
          * });
          *
          * sidebar.set({color: 'white'});
          *
          * sidebar.promptColor();
          *
          * @example
          * The above extend example converted to ES6:
          *
          * class Sidebar extends Backbone.Model {
          *    promptColor() {
          *       const cssColor = prompt("Please enter a CSS color:");
          *       this.set({ color: cssColor });
          *    }
          * }
          *
          * window.sidebar = new Sidebar();
          *
          * sidebar.on('change:color', (model, color) => {
          *    $('#sidebar').css({ background: color });
          * });
          *
          * sidebar.set({ color: 'white' });
          *
          * sidebar.promptColor();
          *
          * @example
          * Another older extend example:
          * extend correctly sets up the prototype chain, so subclasses created with extend can be further extended and
          * sub-classed as far as you like.
          *
          * var Note = Backbone.Model.extend({
          *    initialize: function() { ... },
          *
          *    author: function() { ... },
          *
          *    coordinates: function() { ... },
          *
          *    allowedToEdit: function(account) {
          *       return true;
          *    }
          * });
          *
          * var PrivateNote = Note.extend({
          *    allowedToEdit: function(account) {
          *       return account.owns(this);
          *    }
          * });
          *
          * @example
          * Converting the above example to ES6:
          *
          * class Note extends Backbone.Model {
          *    initialize() { ... }
          *
          *    author() { ... }
          *
          *    coordinates() { ... }
          *
          *    allowedToEdit(account) {
          *       return true;
          *    }
          * }
          *
          * class PrivateNote extends Note {
          *    allowedToEdit(account) {
          *       return account.owns(this);
          *    }
          * });
          *
          * let privateNote = new PrivateNote();
          *
          * @example
          * A huge benefit of using ES6 syntax is that one has access to 'super'
          *
          * class Note extends Backbone.Model {
          *    set(attributes, options) {
          *       super.set(attributes, options);
          *       ...
          *    }
          * });
          */
         'use strict';

         Model = (function (_Events) {
            _inherits(Model, _Events);

            /**
             * When creating an instance of a model, you can pass in the initial values of the attributes, which will be set on
             * the model. If you define an initialize function, it will be invoked when the model is created.
             *
             * @example
             * new Book({
             *    title: "One Thousand and One Nights",
             *    author: "Scheherazade"
             * });
             *
             * @example
             * ES6 example: If you're looking to get fancy, you may want to override constructor, which allows you to replace
             * the actual constructor function for your model.
             *
             * class Library extends Backbone.Model {
             *    constructor() {
             *       super(...arguments);
             *       this.books = new Books();
             *    }
             *
             *    parse(data, options) {
             *       this.books.reset(data.books);
             *       return data.library;
             *    }
             * }
             *
             * @see http://backbonejs.org/#Model-constructor
             *
             * @param {object} attributes - Optional attribute hash of original keys / values to set.
             * @param {object} options    - Optional parameters
             */

            function Model() {
               var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
               var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

               _classCallCheck(this, Model);

               _get(Object.getPrototypeOf(Model.prototype), 'constructor', this).call(this);

               // Allows child classes to abort constructor execution.
               if (_.isBoolean(options.abortCtor) && options.abortCtor) {
                  return;
               }

               var attrs = attributes;

               /**
                * The prefix is used to create the client id which is used to identify models locally.
                * You may want to override this if you're experiencing name clashes with model ids.
                *
                * @type {string}
                */
               this.cidPrefix = 'c';

               /**
                * Client side ID
                * @type {number}
                */
               this.cid = _.uniqueId(this.cidPrefix);

               /**
                * The hash of attributes for this model.
                * @type {object}
                */
               this.attributes = {};

               if (options.collection) {
                  /**
                   * A potentially associated collection.
                   * @type {Collection}
                   */
                  this.collection = options.collection;
               }

               /**
                * A hash of attributes whose current and previous value differ.
                * @type {object}
                */
               this.changed = {};

               /**
                * The value returned during the last failed validation.
                * @type {*}
                */
               this.validationError = null;

               // Allows child classes to postpone initialization.
               if (_.isBoolean(options.abortCtorInit) && options.abortCtorInit) {
                  return;
               }

               if (options.parse) {
                  attrs = this.parse(attrs, options) || {};
               }

               attrs = _.defaults({}, attrs, _.result(this, 'defaults'));

               this.set(attrs, options);

               this.initialize(this, arguments);
            }

            // The default name for the JSON `id` attribute is `"id"`. MongoDB and CouchDB users may want to set this to `"_id"`.

            /**
             * Retrieve a hash of only the model's attributes that have changed since the last set, or false if there are none.
             * Optionally, an external attributes hash can be passed in, returning the attributes in that hash which differ from
             * the model. This can be used to figure out which portions of a view should be updated, or what calls need to be
             * made to sync the changes to the server.
             *
             * @see http://backbonejs.org/#Model-changedAttributes
             *
             * @param {object}   diff  - A hash of key / values to diff against this models attributes.
             * @returns {object|boolean}
             */

            _createClass(Model, [{
               key: 'changedAttributes',
               value: function changedAttributes(diff) {
                  if (!diff) {
                     return this.hasChanged() ? _.clone(this.changed) : false;
                  }
                  var old = this._changing ? this._previousAttributes : this.attributes;
                  var changed = {};
                  for (var attr in diff) {
                     var val = diff[attr];
                     if (_.isEqual(old[attr], val)) {
                        continue;
                     }
                     changed[attr] = val;
                  }
                  return _.size(changed) ? changed : false;
               }

               /**
                * Removes all attributes from the model, including the id attribute. Fires a "change" event unless silent is
                * passed as an option.
                *
                * @see http://backbonejs.org/#Model-clear
                *
                * @param {object}   options - Optional parameters.
                * @returns {*}
                */
            }, {
               key: 'clear',
               value: function clear(options) {
                  var attrs = {};
                  for (var key in this.attributes) {
                     attrs[key] = void 0;
                  }
                  return this.set(attrs, _.extend({}, options, { unset: true }));
               }

               /**
                * Returns a new instance of the model with identical attributes.
                *
                * @see http://backbonejs.org/#Model-clone
                *
                * @returns {*}
                */
            }, {
               key: 'clone',
               value: function clone() {
                  return new this.constructor(this.attributes);
               }

               /**
                * Destroys the model on the server by delegating an HTTP DELETE request to Backbone.sync. Returns a jqXHR object,
                * or false if the model isNew. Accepts success and error callbacks in the options hash, which will be passed
                * (model, response, options). Triggers a "destroy" event on the model, which will bubble up through any collections
                * that contain it, a "request" event as it begins the Ajax request to the server, and a "sync" event, after the
                * server has successfully acknowledged the model's deletion. Pass {wait: true} if you'd like to wait for the server
                * to respond before removing the model from the collection.
                *
                * @example
                * book.destroy({success: function(model, response) {
                *    ...
                * }});
                *
                * @see http://backbonejs.org/#Model-destroy
                *
                * @param {object}   options - Provides optional properties used in destroying a model.
                * @returns {boolean|XMLHttpRequest}
                */
            }, {
               key: 'destroy',
               value: function destroy(options) {
                  var _this = this;

                  options = options ? _.clone(options) : {};
                  var success = options.success;
                  var wait = options.wait;

                  var destroy = function destroy() {
                     _this.stopListening();
                     _this.trigger('destroy', _this, _this.collection, options);
                  };

                  options.success = function (resp) {
                     if (wait) {
                        destroy();
                     }
                     if (success) {
                        success.call(options.context, _this, resp, options);
                     }
                     if (!_this.isNew()) {
                        _this.trigger('sync', _this, resp, options);
                     }
                  };

                  var xhr = false;

                  if (this.isNew()) {
                     _.defer(options.success);
                  } else {
                     Utils.wrapError(this, options);
                     xhr = this.sync('delete', this, options);
                  }

                  if (!wait) {
                     destroy();
                  }

                  return xhr;
               }

               /**
                * Similar to get, but returns the HTML-escaped version of a model's attribute. If you're interpolating data from
                * the model into HTML, using escape to retrieve attributes will prevent XSS attacks.
                *
                * @example
                * let hacker = new Backbone.Model({
                *    name: "<script>alert('xss')</script>"
                * });
                *
                * alert(hacker.escape('name'));
                *
                * @see http://backbonejs.org/#Model-escape
                *
                * @param {*}  attr  - Defines a single attribute key to get and escape via Underscore.
                * @returns {string}
                */
            }, {
               key: 'escape',
               value: function escape(attr) {
                  return _.escape(this.get(attr));
               }

               /**
                * Merges the model's state with attributes fetched from the server by delegating to Backbone.sync. Returns a jqXHR.
                * Useful if the model has never been populated with data, or if you'd like to ensure that you have the latest
                * server state. Triggers a "change" event if the server's state differs from the current attributes. fetch accepts
                * success and error callbacks in the options hash, which are both passed (model, response, options) as arguments.
                *
                * @example
                * // Poll every 10 seconds to keep the channel model up-to-date.
                * setInterval(function() {
                *    channel.fetch();
                * }, 10000);
                *
                * @see http://backbonejs.org/#Model-fetch
                *
                * @param {object}   options  - Optional parameters.
                * @returns {*}
                */
            }, {
               key: 'fetch',
               value: function fetch(options) {
                  var _this2 = this;

                  options = _.extend({ parse: true }, options);
                  var success = options.success;
                  options.success = function (resp) {
                     var serverAttrs = options.parse ? _this2.parse(resp, options) : resp;
                     if (!_this2.set(serverAttrs, options)) {
                        return false;
                     }
                     if (success) {
                        success.call(options.context, _this2, resp, options);
                     }
                     _this2.trigger('sync', _this2, resp, options);
                  };
                  Utils.wrapError(this, options);
                  return this.sync('read', this, options);
               }

               /**
                * Get the current value of an attribute from the model.
                *
                * @example
                * For example:
                * note.get("title")
                *
                * @see http://backbonejs.org/#Model-get
                *
                * @param {*}  attr  - Defines a single attribute key to get a value from the model attributes.
                * @returns {*}
                */
            }, {
               key: 'get',
               value: function get(attr) {
                  return this.attributes[attr];
               }

               /**
                * Returns true if the attribute is set to a non-null or non-undefined value.
                *
                * @example
                * if (note.has("title")) {
                *    ...
                * }
                *
                * @see http://backbonejs.org/#Model-has
                *
                * @param {string}   attr  - Attribute key.
                * @returns {boolean}
                */
            }, {
               key: 'has',
               value: function has(attr) {
                  return !Utils.isNullOrUndef(this.get(attr));
               }

               /**
                * Has the model changed since its last set? If an attribute is passed, returns true if that specific attribute has
                * changed.
                *
                * Note that this method, and the following change-related ones, are only useful during the course of a "change"
                * event.
                *
                * @example
                * book.on("change", function() {
                *    if (book.hasChanged("title")) {
                *       ...
                *    }
                * });
                *
                * @see http://backbonejs.org/#Model-hasChanged
                *
                * @param {string}   attr  - Optional attribute key.
                * @returns {*}
                */
            }, {
               key: 'hasChanged',
               value: function hasChanged(attr) {
                  if (Utils.isNullOrUndef(attr)) {
                     return !_.isEmpty(this.changed);
                  }
                  return _.has(this.changed, attr);
               }

               /**
                * Initialize is an empty function by default. Override it with your own initialization logic.
                *
                * @see http://backbonejs.org/#Model-constructor
                * @abstract
                */
            }, {
               key: 'initialize',
               value: function initialize() {}

               /**
                * Has this model been saved to the server yet? If the model does not yet have an id, it is considered to be new.
                *
                * @see http://backbonejs.org/#Model-isNew
                *
                * @returns {boolean}
                */
            }, {
               key: 'isNew',
               value: function isNew() {
                  return !this.has(this.idAttribute);
               }

               /**
                * Run validate to check the model state.
                *
                * @see http://backbonejs.org/#Model-validate
                *
                * @example
                * class Chapter extends Backbone.Model {
                *    validate(attrs, options) {
                *       if (attrs.end < attrs.start) {
                *       return "can't end before it starts";
                *    }
                * }
                *
                * let one = new Chapter({
                *    title : "Chapter One: The Beginning"
                * });
                *
                * one.set({
                *    start: 15,
                *    end:   10
                * });
                *
                * if (!one.isValid()) {
                *    alert(one.get("title") + " " + one.validationError);
                * }
                *
                * @see http://backbonejs.org/#Model-isValid
                *
                * @param {object}   options  - Optional hash that may provide a `validationError` field to pass to `invalid` event.
                * @returns {boolean}
                */
            }, {
               key: 'isValid',
               value: function isValid(options) {
                  return this._validate({}, _.defaults({ validate: true }, options));
               }

               /**
                * Special-cased proxy to the `_.matches` function from Underscore.
                *
                * @see http://underscorejs.org/#iteratee
                *
                * @param {object|string}  attrs - Predicates to match
                * @returns {boolean}
                */
            }, {
               key: 'matches',
               value: function matches(attrs) {
                  return !!_.iteratee(attrs, this)(this.attributes);
               }

               /* eslint-disable no-unused-vars */
               /**
                * parse is called whenever a model's data is returned by the server, in fetch, and save. The function is passed the
                * raw response object, and should return the attributes hash to be set on the model. The default implementation is
                * a no-op, simply passing through the JSON response. Override this if you need to work with a preexisting API, or
                * better namespace your responses.
                *
                * @see http://backbonejs.org/#Model-parse
                *
                * @param {object}   resp - Usually a JSON object.
                * @param {object}   options - Unused
                * @returns {object} Pass through to set the attributes hash on the model.
                */
            }, {
               key: 'parse',
               value: function parse(resp, options) {
                  /* eslint-enable no-unused-vars */
                  return resp;
               }

               /**
                * During a "change" event, this method can be used to get the previous value of a changed attribute.
                *
                * @example
                * let bill = new Backbone.Model({
                *    name: "Bill Smith"
                * });
                *
                * bill.on("change:name", function(model, name) {
                *    alert("Changed name from " + bill.previous("name") + " to " + name);
                * });
                *
                * bill.set({name : "Bill Jones"});
                *
                * @see http://backbonejs.org/#Model-previous
                *
                * @param {string}   attr  - Attribute key used for lookup.
                * @returns {*}
                */
            }, {
               key: 'previous',
               value: function previous(attr) {
                  if (Utils.isNullOrUndef(attr) || !this._previousAttributes) {
                     return null;
                  }
                  return this._previousAttributes[attr];
               }

               /**
                * Return a copy of the model's previous attributes. Useful for getting a diff between versions of a model, or
                * getting back to a valid state after an error occurs.
                *
                * @see http://backbonejs.org/#Model-previousAttributes
                *
                * @returns {*}
                */
            }, {
               key: 'previousAttributes',
               value: function previousAttributes() {
                  return _.clone(this._previousAttributes);
               }

               /**
                * Save a model to your database (or alternative persistence layer), by delegating to Backbone.sync. Returns a jqXHR
                * if validation is successful and false otherwise. The attributes hash (as in set) should contain the attributes
                * you'd like to change — keys that aren't mentioned won't be altered — but, a complete representation of the
                * resource will be sent to the server. As with set, you may pass individual keys and values instead of a hash. If
                * the model has a validate method, and validation fails, the model will not be saved. If the model isNew, the save
                * will be a "create" (HTTP POST), if the model already exists on the server, the save will be an "update"
                * (HTTP PUT).
                *
                * If instead, you'd only like the changed attributes to be sent to the server, call model.save(attrs,
                * {patch: true}). You'll get an HTTP PATCH request to the server with just the passed-in attributes.
                *
                * Calling save with new attributes will cause a "change" event immediately, a "request" event as the Ajax request
                * begins to go to the server, and a "sync" event after the server has acknowledged the successful change. Pass
                * {wait: true} if you'd like to wait for the server before setting the new attributes on the model.
                *
                * In the following example, notice how our overridden version of Backbone.sync receives a "create" request the
                * first time the model is saved and an "update" request the second time.
                *
                * @example
                * Backbone.sync = (method, model) => {
                *    alert(method + ": " + JSON.stringify(model));
                *    model.set('id', 1);
                * };
                *
                * let book = new Backbone.Model({
                *    title: "The Rough Riders",
                *    author: "Theodore Roosevelt"
                * });
                *
                * book.save();
                *
                * book.save({author: "Teddy"});
                *
                * @see http://backbonejs.org/#Model-save
                *
                * @param {key|object}  key - Either a key defining the attribute to store or a hash of keys / values to store.
                * @param {*}           val - Any type to store in model.
                * @param {object}      options - Optional parameters.
                * @returns {*}
                */
            }, {
               key: 'save',
               value: function save(key, val, options) {
                  var _this3 = this;

                  // Handle both `"key", value` and `{key: value}` -style arguments.
                  var attrs = undefined;
                  if (Utils.isNullOrUndef(key) || typeof key === 'object') {
                     attrs = key;
                     options = val;
                  } else {
                     (attrs = {})[key] = val;
                  }

                  options = _.extend({ validate: true, parse: true }, options);
                  var wait = options.wait;

                  // If we're not waiting and attributes exist, save acts as
                  // `set(attr).save(null, opts)` with validation. Otherwise, check if
                  // the model will be valid when the attributes, if any, are set.
                  if (attrs && !wait) {
                     if (!this.set(attrs, options)) {
                        return false;
                     }
                  } else {
                     if (!this._validate(attrs, options)) {
                        return false;
                     }
                  }

                  // After a successful server-side save, the client is (optionally)
                  // updated with the server-side state.
                  var success = options.success;
                  var attributes = this.attributes;
                  options.success = function (resp) {
                     // Ensure attributes are restored during synchronous saves.
                     _this3.attributes = attributes;
                     var serverAttrs = options.parse ? _this3.parse(resp, options) : resp;
                     if (wait) {
                        serverAttrs = _.extend({}, attrs, serverAttrs);
                     }
                     if (serverAttrs && !_this3.set(serverAttrs, options)) {
                        return false;
                     }
                     if (success) {
                        success.call(options.context, _this3, resp, options);
                     }
                     _this3.trigger('sync', _this3, resp, options);
                  };
                  Utils.wrapError(this, options);

                  // Set temporary attributes if `{wait: true}` to properly find new ids.
                  if (attrs && wait) {
                     this.attributes = _.extend({}, attributes, attrs);
                  }

                  var method = this.isNew() ? 'create' : options.patch ? 'patch' : 'update';
                  if (method === 'patch' && !options.attrs) {
                     options.attrs = attrs;
                  }
                  var xhr = this.sync(method, this, options);

                  // Restore attributes.
                  this.attributes = attributes;

                  return xhr;
               }

               /**
                * Set a hash of attributes (one or many) on the model. If any of the attributes change the model's state, a "change"
                * event will be triggered on the model. Change events for specific attributes are also triggered, and you can bind
                * to those as well, for example: change:title, and change:content. You may also pass individual keys and values.
                *
                * @example
                * note.set({ title: "March 20", content: "In his eyes she eclipses..." });
                *
                * book.set("title", "A Scandal in Bohemia");
                *
                * @see http://backbonejs.org/#Model-set
                *
                * @param {object|string}  key      - Either a string defining a key or a key / value hash.
                * @param {*|object}       val      - Either any type to store or the shifted options hash.
                * @param {object}         options  - Optional parameters.
                * @returns {*}
                */
            }, {
               key: 'set',
               value: function set(key, val) {
                  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                  if (Utils.isNullOrUndef(key)) {
                     return this;
                  }

                  // Handle both `"key", value` and `{key: value}` -style arguments.
                  var attrs = undefined;
                  if (typeof key === 'object') {
                     attrs = key;
                     options = val || {};
                  } else {
                     (attrs = {})[key] = val;
                  }

                  // Run validation.
                  if (!this._validate(attrs, options)) {
                     return false;
                  }

                  // Extract attributes and options.
                  var unset = options.unset;
                  var silent = options.silent;
                  var changes = [];
                  var changing = this._changing;
                  this._changing = true;

                  if (!changing) {
                     this._previousAttributes = _.clone(this.attributes);
                     this.changed = {};
                  }

                  var current = this.attributes;
                  var changed = this.changed;
                  var prev = this._previousAttributes;

                  // For each `set` attribute, update or delete the current value.
                  for (var attr in attrs) {
                     val = attrs[attr];
                     if (!_.isEqual(current[attr], val)) {
                        changes.push(attr);
                     }

                     if (!_.isEqual(prev[attr], val)) {
                        changed[attr] = val;
                     } else {
                        delete changed[attr];
                     }

                     if (unset) {
                        delete current[attr];
                     } else {
                        current[attr] = val;
                     }
                  }

                  /**
                   * Update the `id`.
                   * @type {*}
                   */
                  this.id = this.get(this.idAttribute);

                  // Trigger all relevant attribute changes.
                  if (!silent) {
                     if (changes.length) {
                        this._pending = options;
                     }
                     for (var i = 0; i < changes.length; i++) {
                        this.trigger('change:' + changes[i], this, current[changes[i]], options);
                     }
                  }

                  // You might be wondering why there's a `while` loop here. Changes can
                  // be recursively nested within `"change"` events.
                  if (changing) {
                     return this;
                  }
                  if (!silent) {
                     while (this._pending) {
                        options = this._pending;
                        this._pending = false;
                        this.trigger('change', this, options);
                     }
                  }
                  this._pending = false;
                  this._changing = false;
                  return this;
               }

               /**
                * Uses Backbone.sync to persist the state of a model to the server. Can be overridden for custom behavior.
                *
                * @see http://backbonejs.org/#Model-sync
                *
                * @returns {*}
                */
            }, {
               key: 'sync',
               value: function sync() {
                  return BackboneProxy.backbone.sync.apply(this, arguments);
               }

               /**
                * Return a shallow copy of the model's attributes for JSON stringification. This can be used for persistence,
                * serialization, or for augmentation before being sent to the server. The name of this method is a bit confusing,
                * as it doesn't actually return a JSON string — but I'm afraid that it's the way that the JavaScript API for
                * JSON.stringify works.
                *
                * @example
                * let artist = new Backbone.Model({
                *    firstName: "Wassily",
                *    lastName: "Kandinsky"
                * });
                *
                * artist.set({ birthday: "December 16, 1866" });
                *
                * alert(JSON.stringify(artist));
                *
                * @see http://backbonejs.org/#Model-toJSON
                *
                * @returns {object} JSON representation of this model.
                */
            }, {
               key: 'toJSON',
               value: function toJSON() {
                  return _.clone(this.attributes);
               }

               /**
                * Remove an attribute by deleting it from the internal attributes hash. Fires a "change" event unless silent is
                * passed as an option.
                *
                * @see http://backbonejs.org/#Model-unset
                *
                * @param {object|string}  attr - Either a key defining the attribute or a hash of keys / values to unset.
                * @param {object}         options - Optional parameters.
                * @returns {*}
                */
            }, {
               key: 'unset',
               value: function unset(attr, options) {
                  return this.set(attr, void 0, _.extend({}, options, { unset: true }));
               }

               /**
                * Returns the relative URL where the model's resource would be located on the server. If your models are located
                * somewhere else, override this method with the correct logic. Generates URLs of the form: "[collection.url]/[id]"
                * by default, but you may override by specifying an explicit urlRoot if the model's collection shouldn't be taken
                * into account.
                *
                * Delegates to Collection#url to generate the URL, so make sure that you have it defined, or a urlRoot property,
                * if all models of this class share a common root URL. A model with an id of 101, stored in a Backbone.Collection
                * with a url of "/documents/7/notes", would have this URL: "/documents/7/notes/101"
                *
                * @see http://backbonejs.org/#Model-url
                * @see http://backbonejs.org/#Model-urlRoot
                *
                * @returns {string}
                */
            }, {
               key: 'url',
               value: function url() {
                  var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || Utils.urlError();
                  if (this.isNew()) {
                     return base;
                  }
                  var id = this.get(this.idAttribute);
                  return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
               }

               /**
                * Run validation against the next complete set of model attributes, returning `true` if all is well. Otherwise,
                * fire an `"invalid"` event.
                *
                * @protected
                * @param {object}   attrs    - attribute hash
                * @param {object}   options  - Optional parameters
                * @returns {boolean}
                */
            }, {
               key: '_validate',
               value: function _validate(attrs, options) {
                  if (!options.validate || !this.validate) {
                     return true;
                  }
                  attrs = _.extend({}, this.attributes, attrs);
                  var error = this.validationError = this.validate(attrs, options) || null;
                  if (!error) {
                     return true;
                  }
                  this.trigger('invalid', this, error, _.extend(options, { validationError: error }));
                  return false;
               }
            }]);

            return Model;
         })(Events);

         Model.prototype.idAttribute = 'id';

         // Underscore methods that we want to implement on the Model, mapped to the number of arguments they take.
         modelMethods = {
            keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
            omit: 0, chain: 1, isEmpty: 1
         };

         // Mix in each Underscore method as a proxy to `Model#attributes`.
         Utils.addUnderscoreMethods(Model, modelMethods, 'attributes');

         /**
          * Exports the Model class.
          */

         _export('default', Model);
      }
   };
});

$__System.register('10', ['4', '5', '6', '8', '11', 'c', 'd', 'e'], function (_export) {
   var _, BackboneProxy, _classCallCheck, _createClass, _toConsumableArray, _get, _inherits, Events, s_ESCAPE_REGEX, s_NAMED_PARAM, s_OPTIONAL_PARAM, s_SPLAT_PARAM, s_BIND_ROUTES, s_EXTRACT_PARAMETERS, s_ROUTE_TO_REGEX, Router;

   return {
      setters: [function (_5) {
         _ = _5['default'];
      }, function (_6) {
         BackboneProxy = _6['default'];
      }, function (_3) {
         _classCallCheck = _3['default'];
      }, function (_2) {
         _createClass = _2['default'];
      }, function (_4) {
         _toConsumableArray = _4['default'];
      }, function (_c) {
         _get = _c['default'];
      }, function (_d) {
         _inherits = _d['default'];
      }, function (_e) {
         Events = _e['default'];
      }],
      execute: function () {

         // Private / internal methods ---------------------------------------------------------------------------------------

         /**
          * Cached regular expressions for matching named param parts and splatted parts of route strings.
          * @type {RegExp}
          */
         'use strict';

         s_ESCAPE_REGEX = /[\-{}\[\]+?.,\\\^$|#\s]/g;
         s_NAMED_PARAM = /(\(\?)?:\w+/g;
         s_OPTIONAL_PARAM = /\((.*?)\)/g;
         s_SPLAT_PARAM = /\*\w+/g;

         /**
          * Bind all defined routes to `Backbone.history`. We have to reverse the order of the routes here to support behavior
          * where the most general routes can be defined at the bottom of the route map.
          *
          * @param {Router}   router   - Instance of `Backbone.Router`.
          */

         s_BIND_ROUTES = function s_BIND_ROUTES(router) {
            if (!router.routes) {
               return;
            }

            router.routes = _.result(router, 'routes');

            _.each(_.keys(router.routes), function (route) {
               router.route(route, router.routes[route]);
            });
         };

         /**
          * Given a route, and a URL fragment that it matches, return the array of extracted decoded parameters. Empty or
          * unmatched parameters will be treated as `null` to normalize cross-browser behavior.
          *
          * @param {string}   route - A route string or regex.
          * @param {string}   fragment - URL fragment.
          * @returns {*}
          */

         s_EXTRACT_PARAMETERS = function s_EXTRACT_PARAMETERS(route, fragment) {
            var params = route.exec(fragment).slice(1);

            return _.map(params, function (param, i) {
               // Don't decode the search params.
               if (i === params.length - 1) {
                  return param || null;
               }
               return param ? decodeURIComponent(param) : null;
            });
         };

         /**
          * Convert a route string into a regular expression, suitable for matching against the current location hash.
          *
          * @param {string}   route - A route string or regex.
          * @returns {RegExp}
          */

         s_ROUTE_TO_REGEX = function s_ROUTE_TO_REGEX(route) {
            route = route.replace(s_ESCAPE_REGEX, '\\$&').replace(s_OPTIONAL_PARAM, '(?:$1)?').replace(s_NAMED_PARAM, function (match, optional) {
               return optional ? match : '([^/?]+)';
            }).replace(s_SPLAT_PARAM, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
         };

         /**
          * Backbone.Router - Provides methods for routing client-side pages, and connecting them to actions and events.
          * (http://backbonejs.org/#Router)
          * ---------------
          * Web applications often provide linkable, bookmarkable, shareable URLs for important locations in the app. Until
          * recently, hash fragments (#page) were used to provide these permalinks, but with the arrival of the History API,
          * it's now possible to use standard URLs (/page). Backbone.Router provides methods for routing client-side pages, and
          * connecting them to actions and events. For browsers which don't yet support the History API, the Router handles
          * graceful fallback and transparent translation to the fragment version of the URL.
          *
          * During page load, after your application has finished creating all of its routers, be sure to call
          * Backbone.history.start() or Backbone.history.start({pushState: true}) to route the initial URL.
          *
          * routes - router.routes
          * The routes hash maps URLs with parameters to functions on your router (or just direct function definitions, if you
          * prefer), similar to the View's events hash. Routes can contain parameter parts, :param, which match a single URL
          * component between slashes; and splat parts *splat, which can match any number of URL components. Part of a route can
          * be made optional by surrounding it in parentheses (/:optional).
          *
          * For example, a route of "search/:query/p:page" will match a fragment of #search/obama/p2, passing "obama" and "2" to
          * the action.
          *
          * A route of "file/*path" will match #file/nested/folder/file.txt, passing "nested/folder/file.txt" to the action.
          *
          * A route of "docs/:section(/:subsection)" will match #docs/faq and #docs/faq/installing, passing "faq" to the action
          * in the first case, and passing "faq" and "installing" to the action in the second.
          *
          * Trailing slashes are treated as part of the URL, and (correctly) treated as a unique route when accessed. docs and
          * docs/ will fire different callbacks. If you can't avoid generating both types of URLs, you can define a "docs(/)"
          * matcher to capture both cases.
          *
          * When the visitor presses the back button, or enters a URL, and a particular route is matched, the name of the action
          * will be fired as an event, so that other objects can listen to the router, and be notified. In the following example,
          * visiting #help/uploading will fire a route:help event from the router.
          *
          * @example
          * routes: {
          *    "help/:page":         "help",
          *    "download/*path":     "download",
          *    "folder/:name":       "openFolder",
          *    "folder/:name-:mode": "openFolder"
          * }
          *
          * router.on("route:help", function(page) {
          *    ...
          * });
          *
          * @example
          * Old extend - Backbone.Router.extend(properties, [classProperties])
          * Get started by creating a custom router class. Define actions that are triggered when certain URL fragments are
          * matched, and provide a routes hash that pairs routes to actions. Note that you'll want to avoid using a leading
          * slash in your route definitions:
          *
          * var Workspace = Backbone.Router.extend({
          *    routes: {
          *       "help":                 "help",    // #help
          *       "search/:query":        "search",  // #search/kiwis
          *       "search/:query/p:page": "search"   // #search/kiwis/p7
          *    },
          *
          *    help: function() {
          *       ...
          *    },
          *
          *    search: function(query, page) {
          *       ...
          *    }
          * });
          *
          * @example
          * Converting the above example to ES6 using a getter method for `routes`:
          * class Workspace extends Backbone.Router {
          *    get routes() {
          *       return {
          *          "help":                 "help",    // #help
          *          "search/:query":        "search",  // #search/kiwis
          *          "search/:query/p:page": "search"   // #search/kiwis/p7
          *       };
          *    }
          *
          *    help() {
          *       ...
          *    },
          *
          *    search(query, page) {
          *       ...
          *    }
          * }
          *
          * @example
          * Basic default "no route router":
          * new Backbone.Router({ routes: { '*actions': 'defaultRoute' } });
          */

         Router = (function (_Events) {
            _inherits(Router, _Events);

            /**
             * When creating a new router, you may pass its routes hash directly as an option, if you choose. All options will
             * also be passed to your initialize function, if defined.
             *
             * @see http://backbonejs.org/#Router-constructor
             *
             * @param {object}   options  - Optional parameters which may contain a "routes" object literal.
             */

            function Router() {
               var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

               _classCallCheck(this, Router);

               _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this);

               // Must detect if there are any getters defined in order to skip setting this value.
               var hasRoutesGetter = !_.isUndefined(this.routes);

               if (!hasRoutesGetter && options.routes) {
                  /**
                   * Stores the routes hash.
                   * @type {object}
                   */
                  this.routes = options.routes;
               }

               s_BIND_ROUTES(this);

               this.initialize.apply(this, arguments);
            }

            /* eslint-disable no-unused-vars */
            /**
             * Execute a route handler with the provided parameters.  This is an excellent place to do pre-route setup or
             * post-route cleanup.
             *
             * @see http://backbonejs.org/#Router-execute
             *
             * @param {function} callback - Callback function to execute.
             * @param {*[]}      args     - Arguments to apply to callback.
             * @param {string}   name     - Named route.
             */

            _createClass(Router, [{
               key: 'execute',
               value: function execute(callback, args, name) {
                  /* eslint-enable no-unused-vars */
                  if (callback) {
                     callback.apply(this, args);
                  }
               }

               /**
                * Initialize is an empty function by default. Override it with your own initialization logic.
                *
                * @see http://backbonejs.org/#Router-constructor
                * @abstract
                */
            }, {
               key: 'initialize',
               value: function initialize() {}

               /**
                * Simple proxy to `Backbone.history` to save a fragment into the history.
                *
                * @see http://backbonejs.org/#Router-navigate
                * @see History
                *
                * @param {string}   fragment - String representing an URL fragment.
                * @param {object}   options - Optional hash containing parameters for navigate.
                * @returns {Router}
                */
            }, {
               key: 'navigate',
               value: function navigate(fragment, options) {
                  BackboneProxy.backbone.history.navigate(fragment, options);
                  return this;
               }

               /**
                * Manually bind a single named route to a callback. For example:
                *
                * @example
                * this.route('search/:query/p:num', 'search', function(query, num)
                * {
                *    ...
                * });
                *
                * @see http://backbonejs.org/#Router-route
                *
                * @param {string|RegExp}  route    -  A route string or regex.
                * @param {string}         name     -  A name for the route.
                * @param {function}       callback -  A function to invoke when the route is matched.
                * @returns {Router}
                */
            }, {
               key: 'route',
               value: function route(_route, name, callback) {
                  var _this = this;

                  if (!_.isRegExp(_route)) {
                     _route = s_ROUTE_TO_REGEX(_route);
                  }
                  if (_.isFunction(name)) {
                     callback = name;
                     name = '';
                  }
                  if (!callback) {
                     callback = this[name];
                  }

                  BackboneProxy.backbone.history.route(_route, function (fragment) {
                     var args = s_EXTRACT_PARAMETERS(_route, fragment);

                     if (_this.execute(callback, args, name) !== false) {
                        _this.trigger.apply(_this, _toConsumableArray(['route:' + name].concat(args)));
                        _this.trigger('route', name, args);
                        BackboneProxy.backbone.history.trigger('route', _this, name, args);
                     }
                  });

                  return this;
               }
            }]);

            return Router;
         })(Events);

         _export('default', Router);
      }
   };
});

$__System.registerDynamic("12", ["13"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('13');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("14", ["12", "15"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var IObject = $__require('12'),
      defined = $__require('15');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("16", ["17", "18", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('17'),
      core = $__require('18'),
      fails = $__require('19');
  module.exports = function(KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function() {
      fn(1);
    }), 'Object', exp);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1a", ["14", "16"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toIObject = $__require('14');
  $__require('16')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1b", ["1c", "1a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('1c');
  $__require('1a');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1d", ["1b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('1b'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("c", ["1d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$getOwnPropertyDescriptor = $__require('1d')["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1e", ["1c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('1c');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1f", ["1e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('1e'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("20", ["1c", "21", "22", "23"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var getDesc = $__require('1c').getDesc,
      isObject = $__require('21'),
      anObject = $__require('22');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = $__require('23')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("24", ["17", "20"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('17');
  $export($export.S, 'Object', {setPrototypeOf: $__require('20').set});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("25", ["24", "18"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('24');
  module.exports = $__require('18').Object.setPrototypeOf;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("26", ["25"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('25'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("d", ["1f", "26"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$create = $__require('1f')["default"];
  var _Object$setPrototypeOf = $__require('26')["default"];
  exports["default"] = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.register('e', ['4', '6', '8'], function (_export) {
   var _, _classCallCheck, _createClass, s_EVENT_SPLITTER, s_EVENTS_API, s_INTERNAL_ON, s_OFF_API, s_ON_API, s_ONCE_MAP, s_TRIGGER_API, s_TRIGGER_EVENTS, Events;

   return {
      setters: [function (_4) {
         _ = _4['default'];
      }, function (_3) {
         _classCallCheck = _3['default'];
      }, function (_2) {
         _createClass = _2['default'];
      }],
      execute: function () {

         // Private / internal methods ---------------------------------------------------------------------------------------

         /**
          * Regular expression used to split event strings.
          * @type {RegExp}
          */
         'use strict';

         s_EVENT_SPLITTER = /\s+/;

         /**
          * Iterates over the standard `event, callback` (as well as the fancy multiple space-separated events `"change blur",
          * callback` and jQuery-style event maps `{event: callback}`).
          *
          * @param {function} iteratee    - Event operation to invoke.
          * @param {Object.<{callback: function, context: object, ctx: object, listening:{}}>} events - Events object
          * @param {string|object} name   - A single event name, compound event names, or a hash of event names.
          * @param {function} callback    - Event callback function
          * @param {object}   opts        - Optional parameters
          * @returns {*}
          */

         s_EVENTS_API = function s_EVENTS_API(iteratee, events, name, callback, opts) {
            var i = 0,
                names = undefined;
            if (name && typeof name === 'object') {
               // Handle event maps.
               if (callback !== void 0 && 'context' in opts && opts.context === void 0) {
                  opts.context = callback;
               }
               for (names = _.keys(name); i < names.length; i++) {
                  events = s_EVENTS_API(iteratee, events, names[i], name[names[i]], opts);
               }
            } else if (name && s_EVENT_SPLITTER.test(name)) {
               // Handle space separated event names by delegating them individually.
               for (names = name.split(s_EVENT_SPLITTER); i < names.length; i++) {
                  events = iteratee(events, names[i], callback, opts);
               }
            } else {
               // Finally, standard events.
               events = iteratee(events, name, callback, opts);
            }
            return events;
         };

         /**
          * Guard the `listening` argument from the public API.
          *
          * @param {Events}   obj      - The Events instance
          * @param {string}   name     - Event name
          * @param {function} callback - Event callback
          * @param {object}   context  - Event context
          * @param {Object.<{obj: object, objId: string, id: string, listeningTo: object, count: number}>} listening -
          *                              Listening object
          * @returns {*}
          */

         s_INTERNAL_ON = function s_INTERNAL_ON(obj, name, callback, context, listening) {
            obj._events = s_EVENTS_API(s_ON_API, obj._events || {}, name, callback, { context: context, ctx: obj, listening: listening });

            if (listening) {
               var listeners = obj._listeners || (obj._listeners = {});
               listeners[listening.id] = listening;
            }

            return obj;
         };

         /**
          * The reducing API that removes a callback from the `events` object.
          *
          * @param {Object.<{callback: function, context: object, ctx: object, listening:{}}>} events - Events object
          * @param {string}   name     - Event name
          * @param {function} callback - Event callback
          * @param {object}   options  - Optional parameters
          * @returns {*}
          */

         s_OFF_API = function s_OFF_API(events, name, callback, options) {
            if (!events) {
               return;
            }

            var i = 0,
                listening = undefined;
            var context = options.context,
                listeners = options.listeners;

            // Delete all events listeners and "drop" events.
            if (!name && !callback && !context) {
               var ids = _.keys(listeners);
               for (; i < ids.length; i++) {
                  listening = listeners[ids[i]];
                  delete listeners[listening.id];
                  delete listening.listeningTo[listening.objId];
               }
               return;
            }

            var names = name ? [name] : _.keys(events);
            for (; i < names.length; i++) {
               name = names[i];
               var handlers = events[name];

               // Bail out if there are no events stored.
               if (!handlers) {
                  break;
               }

               // Replace events if there are any remaining.  Otherwise, clean up.
               var remaining = [];
               for (var j = 0; j < handlers.length; j++) {
                  var handler = handlers[j];
                  if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
                     remaining.push(handler);
                  } else {
                     listening = handler.listening;
                     if (listening && --listening.count === 0) {
                        delete listeners[listening.id];
                        delete listening.listeningTo[listening.objId];
                     }
                  }
               }

               // Update tail event if the list has any events.  Otherwise, clean up.
               if (remaining.length) {
                  events[name] = remaining;
               } else {
                  delete events[name];
               }
            }
            if (_.size(events)) {
               return events;
            }
         };

         /**
          * The reducing API that adds a callback to the `events` object.
          *
          * @param {Object.<{callback: function, context: object, ctx: object, listening:{}}>} events - Events object
          * @param {string}   name     - Event name
          * @param {function} callback - Event callback
          * @param {object}   options  - Optional parameters
          * @returns {*}
          */

         s_ON_API = function s_ON_API(events, name, callback, options) {
            if (callback) {
               var handlers = events[name] || (events[name] = []);
               var context = options.context,
                   ctx = options.ctx,
                   listening = options.listening;

               if (listening) {
                  listening.count++;
               }

               handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
            }
            return events;
         };

         /**
          * Reduces the event callbacks into a map of `{event: onceWrapper}`. `offer` unbinds the `onceWrapper` after
          * it has been called.
          *
          * @param {Object.<{callback: function, context: object, ctx: object, listening:{}}>} map - Events object
          * @param {string}   name     - Event name
          * @param {function} callback - Event callback
          * @param {function} offer    - Function to invoke after event has been triggered once; `off()`
          * @returns {*}
          */

         s_ONCE_MAP = function s_ONCE_MAP(map, name, callback, offer) {
            if (callback) {
               (function () {
                  var once = map[name] = _.once(function () {
                     offer(name, once);
                     callback.apply(this, arguments);
                  });
                  once._callback = callback;
               })();
            }
            return map;
         };

         /**
          * Handles triggering the appropriate event callbacks.
          *
          * @param {Object.<{callback: function, context: object, ctx: object, listening:{}}>} objEvents - Events object
          * @param {string}   name  - Event name
          * @param {function} cb    - Event callback
          * @param {Array<*>} args  - Event arguments
          * @returns {*}
          */

         s_TRIGGER_API = function s_TRIGGER_API(objEvents, name, cb, args) {
            if (objEvents) {
               var events = objEvents[name];
               var allEvents = objEvents.all;
               if (events && allEvents) {
                  allEvents = allEvents.slice();
               }
               if (events) {
                  s_TRIGGER_EVENTS(events, args);
               }
               if (allEvents) {
                  s_TRIGGER_EVENTS(allEvents, [name].concat(args));
               }
            }
            return objEvents;
         };

         /**
          * A difficult-to-believe, but optimized internal dispatch function for triggering events. Tries to keep the usual
          * cases speedy (most internal Backbone events have 3 arguments).
          *
          * @param {Object.<{callback: function, context: object, ctx: object, listening:{}}>}  events - events array
          * @param {Array<*>} args - event argument array
          */

         s_TRIGGER_EVENTS = function s_TRIGGER_EVENTS(events, args) {
            var ev = undefined,
                i = -1;
            var a1 = args[0],
                a2 = args[1],
                a3 = args[2],
                l = events.length;

            switch (args.length) {
               case 0:
                  while (++i < l) {
                     (ev = events[i]).callback.call(ev.ctx);
                  }
                  return;
               case 1:
                  while (++i < l) {
                     (ev = events[i]).callback.call(ev.ctx, a1);
                  }
                  return;
               case 2:
                  while (++i < l) {
                     (ev = events[i]).callback.call(ev.ctx, a1, a2);
                  }
                  return;
               case 3:
                  while (++i < l) {
                     (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                  }
                  return;
               default:
                  while (++i < l) {
                     (ev = events[i]).callback.apply(ev.ctx, args);
                  }
                  return;
            }
         };

         /**
          * Backbone.Events - Provides the ability to bind and trigger custom named events. (http://backbonejs.org/#Events)
          * ---------------
          *
          * An important consideration of Backbone-ES6 is that Events are no longer an object literal, but a full blown ES6
          * class. This is the biggest potential breaking change for Backbone-ES6 when compared to the original Backbone.
          *
          * Previously Events could be mixed in to any object. This is no longer possible with Backbone-ES6 when working from
          * source or the bundled versions. It should be noted that Events is also no longer mixed into Backbone itself, so
          * Backbone is not a Global events instance.
          *
          * Catalog of Events:
          * Here's the complete list of built-in Backbone events, with arguments. You're also free to trigger your own events on
          * Models, Collections and Views as you see fit.
          *
          * "add" (model, collection, options) — when a model is added to a collection.
          * "remove" (model, collection, options) — when a model is removed from a collection.
          * "update" (collection, options) — single event triggered after any number of models have been added or removed from a
          * collection.
          * "reset" (collection, options) — when the collection's entire contents have been replaced.
          * "sort" (collection, options) — when the collection has been re-sorted.
          * "change" (model, options) — when a model's attributes have changed.
          * "change:[attribute]" (model, value, options) — when a specific attribute has been updated.
          * "destroy" (model, collection, options) — when a model is destroyed.
          * "request" (model_or_collection, xhr, options) — when a model or collection has started a request to the server.
          * "sync" (model_or_collection, resp, options) — when a model or collection has been successfully synced with the
          * server.
          * "error" (model_or_collection, resp, options) — when a model's or collection's request to the server has failed.
          * "invalid" (model, error, options) — when a model's validation fails on the client.
          * "route:[name]" (params) — Fired by the router when a specific route is matched.
          * "route" (route, params) — Fired by the router when any route has been matched.
          * "route" (router, route, params) — Fired by history when any route has been matched.
          * "all" — this special event fires for any triggered event, passing the event name as the first argument.
          *
          * Generally speaking, when calling a function that emits an event (model.set, collection.add, and so on...), if you'd
          * like to prevent the event from being triggered, you may pass {silent: true} as an option. Note that this is rarely,
          * perhaps even never, a good idea. Passing through a specific flag in the options for your event callback to look at,
          * and choose to ignore, will usually work out better.
          *
          * @example
          * This no longer works:
          *
          * let object = {};
          * _.extend(object, Backbone.Events);
          * object.on('expand', function(){ alert('expanded'); });
          * object.trigger('expand');
          *
          * One must now use ES6 extends syntax for Backbone.Events when inheriting events functionality:
          * import Backbone from 'backbone';
          *
          * class MyClass extends Backbone.Events {}
          *
          * @example
          * A nice ES6 pattern for creating a named events instance is the following:
          *
          * import Backbone from 'backbone';
          *
          * export default new Backbone.Events();
          *
          * This module / Events instance can then be imported by full path or if consuming in a modular runtime by creating
          * a mapped path to it.
          */

         Events = (function () {
            /** */

            function Events() {
               _classCallCheck(this, Events);
            }

            /**
             * Delegates to `on`.
             *
             * @returns {*}
             */

            _createClass(Events, [{
               key: 'bind',
               value: function bind() {
                  return this.on.apply(this, arguments);
               }

               /**
                * Tell an object to listen to a particular event on an other object. The advantage of using this form, instead of
                * other.on(event, callback, object), is that listenTo allows the object to keep track of the events, and they can
                * be removed all at once later on. The callback will always be called with object as context.
                *
                * @example
                * view.listenTo(model, 'change', view.render);
                *
                * @see http://backbonejs.org/#Events-listenTo
                *
                * @param {object}   obj      - Event context
                * @param {string}   name     - Event name(s)
                * @param {function} callback - Event callback function
                * @returns {Events}
                */
            }, {
               key: 'listenTo',
               value: function listenTo(obj, name, callback) {
                  if (!obj) {
                     return this;
                  }
                  var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
                  var listeningTo = this._listeningTo || (this._listeningTo = {});
                  var listening = listeningTo[id];

                  // This object is not listening to any other events on `obj` yet.
                  // Setup the necessary references to track the listening callbacks.
                  if (!listening) {
                     var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
                     listening = listeningTo[id] = { obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0 };
                  }

                  // Bind callbacks on obj, and keep track of them on listening.
                  s_INTERNAL_ON(obj, name, callback, this, listening);
                  return this;
               }

               /**
                * Just like `listenTo`, but causes the bound callback to fire only once before being removed.
                *
                * @see http://backbonejs.org/#Events-listenToOnce
                *
                * @param {object}   obj      - Event context
                * @param {string}   name     - Event name(s)
                * @param {function} callback - Event callback function
                * @returns {Events}
                */
            }, {
               key: 'listenToOnce',
               value: function listenToOnce(obj, name, callback) {
                  // Map the event into a `{event: once}` object.
                  var events = s_EVENTS_API(s_ONCE_MAP, {}, name, callback, _.bind(this.stopListening, this, obj));
                  return this.listenTo(obj, events, void 0);
               }

               /**
                * Remove a previously-bound callback function from an object. If no context is specified, all of the versions of
                * the callback with different contexts will be removed. If no callback is specified, all callbacks for the event
                * will be removed. If no event is specified, callbacks for all events will be removed.
                *
                * Note that calling model.off(), for example, will indeed remove all events on the model — including events that
                * Backbone uses for internal bookkeeping.
                *
                * @example
                * // Removes just the `onChange` callback.
                * object.off("change", onChange);
                *
                * // Removes all "change" callbacks.
                * object.off("change");
                *
                * // Removes the `onChange` callback for all events.
                * object.off(null, onChange);
                *
                * // Removes all callbacks for `context` for all events.
                * object.off(null, null, context);
                *
                * // Removes all callbacks on `object`.
                * object.off();
                *
                * @see http://backbonejs.org/#Events-off
                *
                * @param {string}   name     - Event name(s)
                * @param {function} callback - Event callback function
                * @param {object}   context  - Event context
                * @returns {Events}
                */
            }, {
               key: 'off',
               value: function off(name, callback, context) {
                  if (!this._events) {
                     return this;
                  }
                  this._events = s_EVENTS_API(s_OFF_API, this._events, name, callback, { context: context, listeners: this._listeners });
                  return this;
               }

               /**
                * Bind a callback function to an object. The callback will be invoked whenever the event is fired. If you have a
                * large number of different events on a page, the convention is to use colons to namespace them: "poll:start", or
                * "change:selection".
                *
                * To supply a context value for this when the callback is invoked, pass the optional last argument:
                * model.on('change', this.render, this) or model.on({change: this.render}, this).
                *
                * @example
                * The event string may also be a space-delimited list of several events...
                * book.on("change:title change:author", ...);
                *
                * @example
                * Callbacks bound to the special "all" event will be triggered when any event occurs, and are passed the name of
                * the event as the first argument. For example, to proxy all events from one object to another:
                * proxy.on("all", function(eventName) {
                *    object.trigger(eventName);
                * });
                *
                * @example
                * All Backbone event methods also support an event map syntax, as an alternative to positional arguments:
                * book.on({
                *    "change:author": authorPane.update,
                *    "change:title change:subtitle": titleView.update,
                *    "destroy": bookView.remove
                * });
                *
                * @see http://backbonejs.org/#Events-on
                *
                * @param {string}   name     - Event name(s)
                * @param {function} callback - Event callback function
                * @param {object}   context  - Event context
                * @returns {*}
                */
            }, {
               key: 'on',
               value: function on(name, callback, context) {
                  return s_INTERNAL_ON(this, name, callback, context, void 0);
               }

               /**
                * Just like `on`, but causes the bound callback to fire only once before being removed. Handy for saying "the next
                * time that X happens, do this". When multiple events are passed in using the space separated syntax, the event
                * will fire once for every event you passed in, not once for a combination of all events
                *
                * @see http://backbonejs.org/#Events-once
                *
                * @param {string}   name     - Event name(s)
                * @param {function} callback - Event callback function
                * @param {object}   context  - Event context
                * @returns {*}
                */
            }, {
               key: 'once',
               value: function once(name, callback, context) {
                  // Map the event into a `{event: once}` object.
                  var events = s_EVENTS_API(s_ONCE_MAP, {}, name, callback, _.bind(this.off, this));
                  return this.on(events, void 0, context);
               }

               /**
                * Tell an object to stop listening to events. Either call stopListening with no arguments to have the object remove
                * all of its registered callbacks ... or be more precise by telling it to remove just the events it's listening to
                * on a specific object, or a specific event, or just a specific callback.
                *
                * @example
                * view.stopListening();
                *
                * view.stopListening(model);
                *
                * @see http://backbonejs.org/#Events-stopListening
                *
                * @param {object}   obj      - Event context
                * @param {string}   name     - Event name(s)
                * @param {function} callback - Event callback function
                * @returns {Events}
                */
            }, {
               key: 'stopListening',
               value: function stopListening(obj, name, callback) {
                  var listeningTo = this._listeningTo;
                  if (!listeningTo) {
                     return this;
                  }

                  var ids = obj ? [obj._listenId] : _.keys(listeningTo);

                  for (var i = 0; i < ids.length; i++) {
                     var listening = listeningTo[ids[i]];

                     // If listening doesn't exist, this object is not currently listening to obj. Break out early.
                     if (!listening) {
                        break;
                     }

                     listening.obj.off(name, callback, this);
                  }
                  if (_.isEmpty(listeningTo)) {
                     this._listeningTo = void 0;
                  }

                  return this;
               }

               /**
                * Trigger callbacks for the given event, or space-delimited list of events. Subsequent arguments to trigger will be
                * passed along to the event callbacks.
                *
                * @see http://backbonejs.org/#Events-trigger
                *
                * @param {string}   name  - Event name(s)
                * @returns {Events}
                */
            }, {
               key: 'trigger',
               value: function trigger(name) {
                  if (!this._events) {
                     return this;
                  }

                  var length = Math.max(0, arguments.length - 1);
                  var args = new Array(length);

                  for (var i = 0; i < length; i++) {
                     args[i] = arguments[i + 1];
                  }

                  s_EVENTS_API(s_TRIGGER_API, this._events, name, void 0, args);

                  return this;
               }

               /**
                * Delegates to `off`.
                *
                * @returns {*}
                */
            }, {
               key: 'unbind',
               value: function unbind() {
                  return this.off.apply(this, arguments);
               }
            }]);

            return Events;
         })();

         _export('default', Events);
      }
   };
});

$__System.register('27', ['4', '5', '6', '8', 'c', 'd', 'e'], function (_export) {
  var _, BackboneProxy, _classCallCheck, _createClass, _get, _inherits, Events, s_DELEGATE_EVENT_SPLITTER, s_VIEW_OPTIONS, View;

  return {
    setters: [function (_4) {
      _ = _4['default'];
    }, function (_5) {
      BackboneProxy = _5['default'];
    }, function (_3) {
      _classCallCheck = _3['default'];
    }, function (_2) {
      _createClass = _2['default'];
    }, function (_c) {
      _get = _c['default'];
    }, function (_d) {
      _inherits = _d['default'];
    }, function (_e) {
      Events = _e['default'];
    }],
    execute: function () {

      // Private / internal methods ---------------------------------------------------------------------------------------

      /**
       * Cached regex to split keys for `delegate`.
       * @type {RegExp}
       */
      'use strict';

      s_DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

      /**
       * List of view options to be set as properties.
       * @type {string[]}
       */
      s_VIEW_OPTIONS = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

      /**
       * Backbone.View - Represents a logical chunk of UI in the DOM. (http://backbonejs.org/#View)
       * -------------
       *
       * Backbone Views are almost more convention than they are actual code. A View is simply a JavaScript object that
       * represents a logical chunk of UI in the DOM. This might be a single item, an entire list, a sidebar or panel, or
       * even the surrounding frame which wraps your whole app. Defining a chunk of UI as a **View** allows you to define
       * your DOM events declaratively, without having to worry about render order ... and makes it easy for the view to
       * react to specific changes in the state of your models.
       *
       * Creating a Backbone.View creates its initial element outside of the DOM, if an existing element is not provided...
       *
       * Example if working with Backbone as ES6 source:
       * @example
       *
       * import Backbone from 'backbone';
       *
       * export default class MyView extends Backbone.View
       * {
       *    constructor(options)
       *    {
       *       super(options);
       *       ...
       *    }
       *
       *    initialize()
       *    {
       *       ...
       *    }
       *    ...
       * }
       *
       * @example
       *
       * To use a custom $el / element define it by a getter method:
       *
       *    get el() { return 'my-element'; }
       *
       * Likewise with events define it by a getter method:
       *
       *    get events()
       *    {
       *       return {
       *         'submit form.login-form': 'logIn',
       *         'click .sign-up': 'signUp',
       *         'click .forgot-password': 'forgotPassword'
       *       }
       *    }
       */

      View = (function (_Events) {
        _inherits(View, _Events);

        _createClass(View, [{
          key: 'tagName',

          /**
           * The default `tagName` of a View's element is `"div"`.
           *
           * @returns {string}
           */
          get: function get() {
            return 'div';
          }

          /**
           * There are several special options that, if passed, will be attached directly to the view: model, collection, el,
           * id, className, tagName, attributes and events. If the view defines an initialize function, it will be called when
           * the view is first created. If you'd like to create a view that references an element already in the DOM, pass in
           * the element as an option: new View({el: existingElement})
           *
           * @see http://backbonejs.org/#View-constructor
           *
           * @param {object} options - Default options which are mixed into this class as properties via `_.pick` against
           *                           s_VIEW_OPTIONS. Options also is passed onto the `initialize()` function.
           */
        }]);

        function View(options) {
          _classCallCheck(this, View);

          _get(Object.getPrototypeOf(View.prototype), 'constructor', this).call(this);

          /**
           * Client ID
           * @type {number}
           */
          this.cid = _.uniqueId('view');

          _.extend(this, _.pick(options, s_VIEW_OPTIONS));

          this._ensureElement();
          this.initialize.apply(this, arguments);
        }

        /**
         * If jQuery is included on the page, each view has a $ function that runs queries scoped within the view's element.
         * If you use this scoped jQuery function, you don't have to use model ids as part of your query to pull out specific
         * elements in a list, and can rely much more on HTML class attributes. It's equivalent to running:
         * view.$el.find(selector)
         *
         * @see https://api.jquery.com/find/
         *
         * @example
         * class Chapter extends Backbone.View {
         *    serialize() {
         *       return {
         *          title: this.$(".title").text(),
         *          start: this.$(".start-page").text(),
         *          end:   this.$(".end-page").text()
         *       };
         *    }
         * }
         *
         * @see http://backbonejs.org/#View-dollar
         * @see https://api.jquery.com/find/
         *
         * @param {string}   selector - A string containing a selector expression to match elements against.
         * @returns {Element|$}
         */

        _createClass(View, [{
          key: '$',
          value: function $(selector) {
            return this.$el.find(selector);
          }

          /**
           * Produces a DOM element to be assigned to your view. Exposed for subclasses using an alternative DOM
           * manipulation API.
           *
           * @protected
           * @param {string}   tagName  - Name of the tag element to create.
           * @returns {Element}
           *
           * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
           */
        }, {
          key: '_createElement',
          value: function _createElement(tagName) {
            return document.createElement(tagName);
          }

          /**
           * Add a single event listener to the view's element (or a child element using `selector`). This only works for
           * delegate-able events: not `focus`, `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
           *
           * @see http://backbonejs.org/#View-delegateEvents
           * @see http://api.jquery.com/on/
           *
           * @param {string}   eventName   - One or more space-separated event types and optional namespaces.
           * @param {string}   selector    - A selector string to filter the descendants of the selected elements that trigger
           *                                 the event.
           * @param {function} listener    - A function to execute when the event is triggered.
           * @returns {View}
           */
        }, {
          key: 'delegate',
          value: function delegate(eventName, selector, listener) {
            this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
            return this;
          }

          /**
           * Uses jQuery's on function to provide declarative callbacks for DOM events within a view. If an events hash is not
           * passed directly, uses this.events as the source. Events are written in the format {"event selector": "callback"}.
           * The callback may be either the name of a method on the view, or a direct function body. Omitting the selector
           * causes the event to be bound to the view's root element (this.el). By default, delegateEvents is called within
           * the View's constructor for you, so if you have a simple events hash, all of your DOM events will always already
           * be connected, and you will never have to call this function yourself.
           *
           * The events property may also be defined as a function that returns an events hash, to make it easier to
           * programmatically define your events, as well as inherit them from parent views.
           *
           * Using delegateEvents provides a number of advantages over manually using jQuery to bind events to child elements
           * during render. All attached callbacks are bound to the view before being handed off to jQuery, so when the
           * callbacks are invoked, this continues to refer to the view object. When delegateEvents is run again, perhaps with
           * a different events hash, all callbacks are removed and delegated afresh — useful for views which need to behave
           * differently when in different modes.
           *
           * A single-event version of delegateEvents is available as delegate. In fact, delegateEvents is simply a multi-event
           * wrapper around delegate. A counterpart to undelegateEvents is available as undelegate.
           *
           * Callbacks will be bound to the view, with `this` set properly. Uses event delegation for efficiency.
           * Omitting the selector binds the event to `this.el`.
           *
           * @example
           * Older `extend` example:
           * var DocumentView = Backbone.View.extend({
           *    events: {
           *       "dblclick"                : "open",
           *       "click .icon.doc"         : "select",
           *       "contextmenu .icon.doc"   : "showMenu",
           *       "click .show_notes"       : "toggleNotes",
           *       "click .title .lock"      : "editAccessLevel",
           *       "mouseover .title .date"  : "showTooltip"
           *    },
           *
           *    render: function() {
           *       this.$el.html(this.template(this.model.attributes));
           *       return this;
           *    },
           *
           *    open: function() {
           *       window.open(this.model.get("viewer_url"));
           *    },
           *
           *    select: function() {
           *       this.model.set({selected: true});
           *    },
           *
           *   ...
           * });
           *
           * @example
           * Converting the above `extend` example to ES6:
           * class DocumentView extends Backbone.View {
           *    get events() {
           *       return {
           *          "dblclick"                : "open",
           *          "click .icon.doc"         : "select",
           *          "contextmenu .icon.doc"   : "showMenu",
           *          "click .show_notes"       : "toggleNotes",
           *          "click .title .lock"      : "editAccessLevel",
           *          "mouseover .title .date"  : "showTooltip"
           *       };
           *    }
           *
           *    render() {
           *       this.$el.html(this.template(this.model.attributes));
           *       return this;
           *    }
           *
           *    open() {
           *       window.open(this.model.get("viewer_url"));
           *    }
           *
           *    select() {
           *       this.model.set({selected: true});
           *    }
           *    ...
           * }
           *
           * @see http://backbonejs.org/#View-delegateEvents
           * @see http://api.jquery.com/on/
           *
           * @param {object}   events   - hash of event descriptions to bind.
           * @returns {View}
           */
        }, {
          key: 'delegateEvents',
          value: function delegateEvents(events) {
            events = events || _.result(this, 'events');
            if (!events) {
              return this;
            }
            this.undelegateEvents();
            for (var key in events) {
              var method = events[key];
              if (!_.isFunction(method)) {
                method = this[method];
              }
              if (!method) {
                continue;
              }
              var match = key.match(s_DELEGATE_EVENT_SPLITTER);
              this.delegate(match[1], match[2], _.bind(method, this));
            }
            return this;
          }

          /**
           * Ensure that the View has a DOM element to render into. If `this.el` is a string, pass it through `$()`, take
           * the first matching element, and re-assign it to `el`. Otherwise, create an element from the `id`, `className`
           * and `tagName` properties.
           *
           * @protected
           */
        }, {
          key: '_ensureElement',
          value: function _ensureElement() {
            if (!this.el) {
              var attrs = _.extend({}, _.result(this, 'attributes'));
              if (this.id) {
                attrs.id = _.result(this, 'id');
              }
              if (this.className) {
                attrs['class'] = _.result(this, 'className');
              }
              this.setElement(this._createElement(_.result(this, 'tagName')));
              this._setAttributes(attrs);
            } else {
              this.setElement(_.result(this, 'el'));
            }
          }

          /**
           * Initialize is an empty function by default. Override it with your own initialization logic.
           *
           * @see http://backbonejs.org/#View-constructor
           * @abstract
           */
        }, {
          key: 'initialize',
          value: function initialize() {}

          /**
           * Removes a view and its el from the DOM, and calls stopListening to remove any bound events that the view has
           * listenTo'd.
           *
           * @see http://backbonejs.org/#View-remove
           * @see {@link _removeElement}
           * @see {@link stopListening}
           *
           * @returns {View}
           */
        }, {
          key: 'remove',
          value: function remove() {
            this._removeElement();
            this.stopListening();
            return this;
          }

          /**
           * Remove this view's element from the document and all event listeners attached to it. Exposed for subclasses
           * using an alternative DOM manipulation API.
           *
           * @protected
           * @see https://api.jquery.com/remove/
           */
        }, {
          key: '_removeElement',
          value: function _removeElement() {
            this.$el.remove();
          }

          /**
           * The default implementation of render is a no-op. Override this function with your code that renders the view
           * template from model data, and updates this.el with the new HTML. A good convention is to return this at the end
           * of render to enable chained calls.
           *
           * Backbone is agnostic with respect to your preferred method of HTML templating. Your render function could even
           * munge together an HTML string, or use document.createElement to generate a DOM tree. However, we suggest choosing
           * a nice JavaScript templating library. Mustache.js, Haml-js, and Eco are all fine alternatives. Because
           * Underscore.js is already on the page, _.template is available, and is an excellent choice if you prefer simple
           * interpolated-JavaScript style templates.
           *
           * Whatever templating strategy you end up with, it's nice if you never have to put strings of HTML in your
           * JavaScript. At DocumentCloud, we use Jammit in order to package up JavaScript templates stored in /app/views as
           * part of our main core.js asset package.
           *
           * @example
           * class Bookmark extends Backbone.View {
           *    get template() { return _.template(...); }
           *
           *    render() {
           *       this.$el.html(this.template(this.model.attributes));
           *       return this;
           *    }
           * }
           *
           * @see http://backbonejs.org/#View-render
           *
           * @abstract
           * @returns {View}
           */
        }, {
          key: 'render',
          value: function render() {
            return this;
          }

          /**
           * Set attributes from a hash on this view's element.  Exposed for subclasses using an alternative DOM
           * manipulation API.
           *
           * @protected
           * @param {object}   attributes - An object defining attributes to associate with `this.$el`.
           */
        }, {
          key: '_setAttributes',
          value: function _setAttributes(attributes) {
            this.$el.attr(attributes);
          }

          /**
           * Creates the `this.el` and `this.$el` references for this view using the given `el`. `el` can be a CSS selector
           * or an HTML string, a jQuery context or an element. Subclasses can override this to utilize an alternative DOM
           * manipulation API and are only required to set the `this.el` property.
           *
           * @protected
           * @param {string|object}  el - A CSS selector or an HTML string, a jQuery context or an element.
           */
        }, {
          key: '_setElement',
          value: function _setElement(el) {
            /**
             * Cached jQuery context for element.
             * @type {object}
             */
            this.$el = el instanceof BackboneProxy.backbone.$ ? el : BackboneProxy.backbone.$(el);

            /**
             * Cached element
             * @type {Element}
             */
            this.el = this.$el[0];
          }

          /**
           * If you'd like to apply a Backbone view to a different DOM element, use setElement, which will also create the
           * cached $el reference and move the view's delegated events from the old element to the new one.
           *
           * @see http://backbonejs.org/#View-setElement
           * @see {@link undelegateEvents}
           * @see {@link _setElement}
           * @see {@link delegateEvents}
           *
           * @param {string|object}  element  - A CSS selector or an HTML string, a jQuery context or an element.
           * @returns {View}
           */
        }, {
          key: 'setElement',
          value: function setElement(element) {
            this.undelegateEvents();
            this._setElement(element);
            this.delegateEvents();
            return this;
          }

          /**
           * A finer-grained `undelegateEvents` for removing a single delegated event. `selector` and `listener` are
           * both optional.
           *
           * @see http://backbonejs.org/#View-undelegateEvents
           * @see http://api.jquery.com/off/
           *
           * @param {string}   eventName   - One or more space-separated event types and optional namespaces.
           * @param {string}   selector    - A selector which should match the one originally passed to `.delegate()`.
           * @param {function} listener    - A handler function previously attached for the event(s).
           * @returns {View}
           */
        }, {
          key: 'undelegate',
          value: function undelegate(eventName, selector, listener) {
            this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
            return this;
          }

          /**
           * Removes all of the view's delegated events. Useful if you want to disable or remove a view from the DOM
           * temporarily.
           *
           * @see http://backbonejs.org/#View-undelegateEvents
           * @see http://api.jquery.com/off/
           *
           * @returns {View}
           */
        }, {
          key: 'undelegateEvents',
          value: function undelegateEvents() {
            if (this.$el) {
              this.$el.off('.delegateEvents' + this.cid);
            }
            return this;
          }
        }]);

        return View;
      })(Events);

      _export('default', View);
    }
  };
});

$__System.register('28', ['4'], function (_export) {

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
   'use strict';

   var _;

   _export('default', extend);

   function extend(protoProps, staticProps) {
      var parent = this;
      var child = undefined;

      // The constructor function for the new subclass is either defined by you (the "constructor" property in your
      // `extend` definition), or defaulted by us to simply call the parent constructor.
      if (protoProps && _.has(protoProps, 'constructor')) {
         child = protoProps.constructor;
      } else {
         child = function () {
            return parent.apply(this, arguments);
         };
      }

      // Add static properties to the constructor function, if supplied.
      _.extend(child, parent, staticProps);

      // Set the prototype chain to inherit from `parent`, without calling `parent` constructor function.
      var Surrogate = function Surrogate() {
         this.constructor = child;
      };

      Surrogate.prototype = parent.prototype;
      child.prototype = new Surrogate();

      // Add prototype properties (instance properties) to the subclass, if supplied.
      if (protoProps) {
         _.extend(child.prototype, protoProps);

         // backbone-es6 addition: Because View defines a getter for tagName we must actually redefine this getter
         // from the `protoProps.tagName` if it exists.
         if (protoProps.tagName) {
            Object.defineProperty(child.prototype, 'tagName', { get: function get() {
                  return protoProps.tagName;
               } });
         }
      }

      // Set a convenience property in case the parent's prototype is needed later.
      child.__super__ = parent.prototype;

      return child;
   }

   return {
      setters: [function (_2) {
         _ = _2['default'];
      }],
      execute: function () {}
   };
});

$__System.registerDynamic("29", ["1c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('1c');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2a", ["29"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('29'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("8", ["2a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$defineProperty = $__require('2a')["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2b", ["2c", "15"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('2c'),
      defined = $__require('15');
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2d", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2e", ["2f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('2f');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("30", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("19", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("31", ["19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = !$__require('19')(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2f", ["1c", "30", "31"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('1c'),
      createDesc = $__require('30');
  module.exports = $__require('31') ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("32", ["1c", "30", "33", "2f", "34"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('1c'),
      descriptor = $__require('30'),
      setToStringTag = $__require('33'),
      IteratorPrototype = {};
  $__require('2f')(IteratorPrototype, $__require('34')('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
    setToStringTag(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("35", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key) {
    return hasOwnProperty.call(it, key);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("33", ["1c", "35", "34"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var def = $__require('1c').setDesc,
      has = $__require('35'),
      TAG = $__require('34')('toStringTag');
  module.exports = function(it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
      def(it, TAG, {
        configurable: true,
        value: tag
      });
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("36", ["2d", "17", "2e", "2f", "35", "37", "32", "33", "1c", "34"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var LIBRARY = $__require('2d'),
      $export = $__require('17'),
      redefine = $__require('2e'),
      hide = $__require('2f'),
      has = $__require('35'),
      Iterators = $__require('37'),
      $iterCreate = $__require('32'),
      setToStringTag = $__require('33'),
      getProto = $__require('1c').getProto,
      ITERATOR = $__require('34')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function() {
    return this;
  };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function(kind) {
      if (!BUGGY && kind in proto)
        return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR))
        hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto))
            redefine(proto, key, methods[key]);
        }
      else
        $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("38", ["2b", "36"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $at = $__require('2b')(true);
  $__require('36')(String, 'String', function(iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function() {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length)
      return {
        value: undefined,
        done: true
      };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("39", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("23", ["39"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('39');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("17", ["3a", "18", "23"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('3a'),
      core = $__require('18'),
      ctx = $__require('23'),
      PROTOTYPE = 'prototype';
  var $export = function(type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL)
      source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
        var F = function(param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("15", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3b", ["15"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var defined = $__require('15');
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("21", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("22", ["21"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('21');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3c", ["22"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('22');
  module.exports = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined)
        anObject(ret.call(iterator));
      throw e;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3d", ["37", "34"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Iterators = $__require('37'),
      ITERATOR = $__require('34')('iterator'),
      ArrayProto = Array.prototype;
  module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3e", ["2c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('2c'),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("13", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3f", ["13", "34"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('13'),
      TAG = $__require('34')('toStringTag'),
      ARG = cof(function() {
        return arguments;
      }()) == 'Arguments';
  module.exports = function(it) {
    var O,
        T,
        B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("37", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("40", ["3f", "34", "37", "18"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var classof = $__require('3f'),
      ITERATOR = $__require('34')('iterator'),
      Iterators = $__require('37');
  module.exports = $__require('18').getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("41", ["3a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('3a'),
      SHARED = '__core-js_shared__',
      store = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("42", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var id = 0,
      px = Math.random();
  module.exports = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3a", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("34", ["41", "42", "3a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var store = $__require('41')('wks'),
      uid = $__require('42'),
      Symbol = $__require('3a').Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("43", ["34"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ITERATOR = $__require('34')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("44", ["23", "17", "3b", "3c", "3d", "3e", "40", "43"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('23'),
      $export = $__require('17'),
      toObject = $__require('3b'),
      call = $__require('3c'),
      isArrayIter = $__require('3d'),
      toLength = $__require('3e'),
      getIterFn = $__require('40');
  $export($export.S + $export.F * !$__require('43')(function(iter) {
    Array.from(iter);
  }), 'Array', {from: function from(arrayLike) {
      var O = toObject(arrayLike),
          C = typeof this == 'function' ? this : Array,
          $$ = arguments,
          $$len = $$.length,
          mapfn = $$len > 1 ? $$[1] : undefined,
          mapping = mapfn !== undefined,
          index = 0,
          iterFn = getIterFn(O),
          length,
          result,
          step,
          iterator;
      if (mapping)
        mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
      if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++) {
          result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
        }
      } else {
        length = toLength(O.length);
        for (result = new C(length); length > index; index++) {
          result[index] = mapping ? mapfn(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("18", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("45", ["38", "44", "18"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('38');
  $__require('44');
  module.exports = $__require('18').Array.from;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("46", ["45"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('45'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("11", ["46"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Array$from = $__require('46')["default"];
  exports["default"] = function(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++)
        arr2[i] = arr[i];
      return arr2;
    } else {
      return _Array$from(arr);
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

$__System.register('5', [], function (_export) {
  /**
   * BackboneProxy -- Provides a proxy for the actual created Backbone instance. This is initialized in the constructor
   * for Backbone (backbone-es6/src/Backbone.js). Anywhere a reference is needed for the composed Backbone instance
   * import BackboneProxy and access it by "BackboneProxy.backbone".
   *
   * @example
   * import BackboneProxy from 'backbone-es6/src/BackboneProxy.js';
   *
   * BackboneProxy.backbone.sync(...)
   */

  'use strict';

  /**
   * Defines a proxy Object to hold a reference of the Backbone object instantiated.
   *
   * @type {{backbone: null}}
   */
  var BackboneProxy;
  return {
    setters: [],
    execute: function () {
      BackboneProxy = {
        backbone: null
      };

      _export('default', BackboneProxy);
    }
  };
});

$__System.register('b', ['4', '5', '6', '8', '11'], function (_export) {
   var _, BackboneProxy, _classCallCheck, _createClass, _toConsumableArray, s_ADD_METHOD, s_CB, s_MODEL_MATCHER, Utils;

   return {
      setters: [function (_5) {
         _ = _5['default'];
      }, function (_6) {
         BackboneProxy = _6['default'];
      }, function (_3) {
         _classCallCheck = _3['default'];
      }, function (_2) {
         _createClass = _2['default'];
      }, function (_4) {
         _toConsumableArray = _4['default'];
      }],
      execute: function () {

         // Private / internal methods ---------------------------------------------------------------------------------------

         /**
          * Creates an optimized function that dispatches to an associated Underscore function.
          *
          * @param {number}   length      - Length of variables for given Underscore method to dispatch.
          * @param {string}   method      - Function name of Underscore to invoke.
          * @param {string}   attribute   - Attribute to associate with the Underscore function invoked.
          * @returns {Function}
          */
         'use strict';

         s_ADD_METHOD = function s_ADD_METHOD(length, method, attribute) {
            switch (length) {
               case 1:
                  return function () {
                     return _[method](this[attribute]);
                  };
               case 2:
                  return function (value) {
                     return _[method](this[attribute], value);
                  };
               case 3:
                  return function (iteratee, context) {
                     return _[method](this[attribute], s_CB(iteratee), context);
                  };
               case 4:
                  return function (iteratee, defaultVal, context) {
                     return _[method](this[attribute], s_CB(iteratee), defaultVal, context);
                  };
               default:
                  return function () {
                     var args = Array.prototype.slice.call(arguments);
                     args.unshift(this[attribute]);
                     return _[method].apply(_, _toConsumableArray(args));
                  };
            }
         };

         /**
          * Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
          *
          * @param {*} iteratee  -
          * @returns {*}
          */

         s_CB = function s_CB(iteratee) {
            if (_.isFunction(iteratee)) {
               return iteratee;
            }
            if (_.isObject(iteratee) && !Utils.isModel(iteratee)) {
               return s_MODEL_MATCHER(iteratee);
            }
            if (_.isString(iteratee)) {
               return function (model) {
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

         s_MODEL_MATCHER = function s_MODEL_MATCHER(attrs) {
            var matcher = _.matches(attrs);
            return function (model) {
               return matcher(model.attributes);
            };
         };

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

         Utils = (function () {
            function Utils() {
               _classCallCheck(this, Utils);
            }

            _createClass(Utils, null, [{
               key: 'addUnderscoreMethods',

               /**
                * Adds Underscore methods if they exist from keys of the `methods` hash to `Class` running against the variable
                * defined by `attribute`
                *
                * @param {Class}    Class       -  Class to add Underscore methods to.
                * @param {object}   methods     -  Hash with keys as method names and values as argument length.
                * @param {string}   attribute   -  The variable to run Underscore methods against. Often "attributes"
                */
               value: function addUnderscoreMethods(Class, methods, attribute) {
                  _.each(methods, function (length, method) {
                     if (_[method]) {
                        Class.prototype[method] = s_ADD_METHOD(length, method, attribute);
                     }
                  });
               }

               /**
                * Method for checking whether an unknown variable is an instance of `Backbone.Model`.
                *
                * @param {*}  unknown - Variable to test.
                * @returns {boolean}
                */
            }, {
               key: 'isModel',
               value: function isModel(unknown) {
                  return unknown instanceof BackboneProxy.backbone.Model;
               }

               /**
                * Method for checking whether a variable is undefined or null.
                *
                * @param {*}  unknown - Variable to test.
                * @returns {boolean}
                */
            }, {
               key: 'isNullOrUndef',
               value: function isNullOrUndef(unknown) {
                  return unknown === null || typeof unknown === 'undefined';
               }

               /**
                * Throw an error when a URL is needed, and none is supplied.
                */
            }, {
               key: 'urlError',
               value: function urlError() {
                  throw new Error('A "url" property or function must be specified');
               }

               /**
                * Wrap an optional error callback with a fallback error event.
                *
                * @param {Model|Collection}  model    - Model or Collection target to construct and error callback against.
                * @param {object}            options  - Options hash to store error callback inside.
                */
            }, {
               key: 'wrapError',
               value: function wrapError(model, options) {
                  var error = options.error;
                  options.error = function (resp) {
                     if (error) {
                        error.call(options.context, model, resp, options);
                     }
                     model.trigger('error', model, resp, options);
                  };
               }
            }]);

            return Utils;
         })();

         _export('default', Utils);
      }
   };
});

$__System.register('47', ['4', '5', 'b'], function (_export) {

   /**
    * Map from CRUD to HTTP for our default `Backbone.sync` implementation.
    * @type {{create: string, update: string, patch: string, delete: string, read: string}}
    */
   'use strict';

   var _, BackboneProxy, Utils, s_METHOD_MAP;

   _export('default', sync);

   /**
    * Backbone.sync - Persists models to the server. (http://backbonejs.org/#Sync)
    * -------------
    *
    * Override this function to change the manner in which Backbone persists models to the server. You will be passed the
    * type of request, and the model in question. By default, makes a RESTful Ajax request to the model's `url()`. Some
    * possible customizations could be:
    *
    * Use `setTimeout` to batch rapid-fire updates into a single request.
    * Send up the models as XML instead of JSON.
    * Persist models via WebSockets instead of Ajax.
    *
    * Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests as `POST`, with a `_method` parameter
    * containing the true HTTP method, as well as all requests with the body as `application/x-www-form-urlencoded`
    * instead of `application/json` with the model in a param named `model`. Useful when interfacing with server-side
    * languages like **PHP** that make it difficult to read the body of `PUT` requests.
    *
    * @param {string}            method   - A string that defines the synchronization action to perform.
    * @param {Model|Collection}  model    - The model or collection instance to synchronize.
    * @param {object}            options  - Optional parameters
    * @returns {XMLHttpRequest}  An XMLHttpRequest
    */

   function sync(method, model) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var type = s_METHOD_MAP[method];

      // Default options, unless specified.
      _.defaults(options, {
         emulateHTTP: BackboneProxy.backbone.emulateHTTP,
         emulateJSON: BackboneProxy.backbone.emulateJSON
      });

      // Default JSON-request options.
      var params = { type: type, dataType: 'json' };

      // Ensure that we have a URL.
      if (!options.url) {
         params.url = _.result(model, 'url') || Utils.urlError();
      }

      // Ensure that we have the appropriate request data.
      if (Utils.isNullOrUndef(options.data) && model && (method === 'create' || method === 'update' || method === 'patch')) {
         params.contentType = 'application/json';
         params.data = JSON.stringify(options.attrs || model.toJSON(options));
      }

      // For older servers, emulate JSON by encoding the request into an HTML-form.
      if (options.emulateJSON) {
         params.contentType = 'application/x-www-form-urlencoded';
         params.data = params.data ? { model: params.data } : {};
      }

      // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
      // And an `X-HTTP-Method-Override` header.
      if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
         (function () {
            params.type = 'POST';

            if (options.emulateJSON) {
               params.data._method = type;
            }

            var beforeSend = options.beforeSend;

            options.beforeSend = function (xhr) {
               xhr.setRequestHeader('X-HTTP-Method-Override', type);
               if (beforeSend) {
                  return beforeSend.apply(this, arguments);
               }
            };
         })();
      }

      // Don't process data on a non-GET request.
      if (params.type !== 'GET' && !options.emulateJSON) {
         params.processData = false;
      }

      // Pass along `textStatus` and `errorThrown` from jQuery.
      var error = options.error;

      options.error = function (xhr, textStatus, errorThrown) {
         options.textStatus = textStatus;
         options.errorThrown = errorThrown;
         if (error) {
            error.call(options.context, xhr, textStatus, errorThrown);
         }
      };

      // Make the request, allowing the user to override any Ajax options.
      var xhr = options.xhr = BackboneProxy.backbone.ajax(_.extend(params, options));

      model.trigger('request', model, xhr, options);

      return xhr;
   }

   return {
      setters: [function (_2) {
         _ = _2['default'];
      }, function (_3) {
         BackboneProxy = _3['default'];
      }, function (_b) {
         Utils = _b['default'];
      }],
      execute: function () {
         s_METHOD_MAP = {
            'create': 'POST',
            'update': 'PUT',
            'patch': 'PATCH',
            'delete': 'DELETE',
            'read': 'GET'
         };
      }
   };
});

$__System.register('48', ['2', '9', '10', '27', '28', '47', 'e', 'f', 'a'], function (_export) {
  /**
   * ModuleRuntime.js -- Provides the standard / default configuration that is the same as Backbone 1.2.3
   */

  'use strict';

  var Backbone, Collection, Router, View, extend, sync, Events, History, Model, options, backbone;
  return {
    setters: [function (_) {
      Backbone = _['default'];
    }, function (_2) {
      Collection = _2['default'];
    }, function (_3) {
      Router = _3['default'];
    }, function (_4) {
      View = _4['default'];
    }, function (_5) {
      extend = _5['default'];
    }, function (_6) {
      sync = _6['default'];
    }, function (_e) {
      Events = _e['default'];
    }, function (_f) {
      History = _f['default'];
    }, function (_a) {
      Model = _a['default'];
    }],
    execute: function () {
      options = {
        // Current version of the library. Keep in sync with Backbone version supported.
        VERSION: '1.2.3',

        // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option will fake `"PATCH"`, `"PUT"` and
        // `"DELETE"` requests via the `_method` parameter and set a `X-Http-Method-Override` header.
        emulateHTTP: false,

        // Turn on `emulateJSON` to support legacy servers that can't deal with direct `application/json` requests ... this
        // will encode the body as `application/x-www-form-urlencoded` instead and will send the model in a form param
        // named `model`.
        emulateJSON: false
      };
      backbone = new Backbone(Collection, Events, History, Model, Router, View, sync, options);

      // Set up older extends inheritance support for the model, collection, router, view and history.
      backbone.Model.extend = backbone.Collection.extend = backbone.Router.extend = backbone.View.extend = backbone.History.extend = extend;

      _export('default', backbone);
    }
  };
});

$__System.register('1', ['48'], function (_export) {
  /**
   * GlobalRuntime.js -- Initializes Backbone and sets it to "root".Backbone if it exists.
   */

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  'use strict';

  var Backbone, root;
  return {
    setters: [function (_) {
      Backbone = _['default'];
    }],
    execute: function () {
      root = typeof self === 'object' && self.self === self && self || typeof global === 'object' && global.global === global && global;

      if (typeof root !== 'undefined' && root !== null) {
        root.Backbone = Backbone;
      } else {
        throw new Error('Could not find a valid global object.');
      }

      _export('default', Backbone);
    }
  };
});

})
(function(factory) {
  factory(_, $);
});