'use strict';

import _             from 'underscore';
import BackboneProxy from './BackboneProxy.js';
import Events        from './Events.js';
import Model         from './Model.js';
import Utils         from './Utils.js';

import Debug         from './Debug.js';

// Private / internal methods ---------------------------------------------------------------------------------------

/**
 * Default options for `Collection#add`.
 * @type {{add: boolean, remove: boolean}}
 */
const s_ADD_OPTIONS = { add: true, remove: false };

/**
 * Default options for `Collection#set`.
 * @type {{add: boolean, remove: boolean}}
 */
const s_SET_OPTIONS = { add: true, remove: true, merge: true };

/**
 * Internal method to create a model's ties to a collection.
 *
 * @param {Collection}  collection  - A collection instance
 * @param {Model}       model       - A model instance
 */
const s_ADD_REFERENCE = (collection, model) =>
{
   collection._byId[model.cid] = model;
   const id = collection.modelId(model.attributes);

Debug.log(`Collection - s_ADD_REFERENCE - id: ${id}; model.cid: ${model.cid}`, true);

   if (id !== null) { collection._byId[id] = model; }
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
const s_ON_MODEL_EVENT = function(event, model, collection, options)
{
Debug.log(`Collection - s_ON_MODEL_EVENT - 0 - event: ${event}`, true);

   if ((event === 'add' || event === 'remove') && collection !== this) { return; }
   if (event === 'destroy') { this.remove(model, options); }
   if (event === 'change')
   {
      const prevId = this.modelId(model.previousAttributes());
      const id = this.modelId(model.attributes);

Debug.log(`Collection - s_ON_MODEL_EVENT - 1 - change - id: ${id}; prevId: ${prevId}`);

      if (prevId !== id)
      {
         if (prevId !== null) { delete this._byId[prevId]; }
         if (id !== null) { this._byId[id] = model; }
      }
   }

   this.trigger(...arguments);
};

/**
 * Internal method called by both remove and set.
 *
 * @param {Collection}     collection  - A collection instance
 * @param {Array<Model>}   models      - A model instance
 * @param {object}         options     - Optional parameters
 * @returns {*}
 */
const s_REMOVE_MODELS = (collection, models, options) =>
{
   const removed = [];

   for (let i = 0; i < models.length; i++)
   {
      const model = collection.get(models[i]);

Debug.log(`Collection - s_REMOVE_MODELS - 0 - model: ${model}`, true);

      if (!model) { continue; }

Debug.log(`Collection - s_REMOVE_MODELS - 1 - model: ${model.toJSON()}`);

      const index = collection.indexOf(model);

Debug.log(`Collection - s_REMOVE_MODELS - 2 - index: ${index}`);

      collection.models.splice(index, 1);
      collection.length--;

      if (!options.silent)
      {
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
const s_REMOVE_REFERENCE = (collection, model) =>
{
   delete collection._byId[model.cid];
   const id = collection.modelId(model.attributes);

Debug.log(`Collection - s_REMOVE_REFERENCE - id: ${id}; model.cid: ${model.cid}`);

   if (id !== null) { delete collection._byId[id]; }
   if (collection === model.collection) { delete model.collection; }
   model.off('all', s_ON_MODEL_EVENT, collection);
};

/**
 * Splices `insert` into `array` at index `at`.
 *
 * @param {Array}    array    - Target array to splice into
 * @param {Array}    insert   - Array to insert
 * @param {number}   at       - Index to splice at
 */
const s_SPLICE = (array, insert, at) =>
{
   at = Math.min(Math.max(at, 0), array.length);
   const tail = new Array(array.length - at);
   const length = insert.length;

   for (let i = 0; i < tail.length; i++) { tail[i] = array[i + at]; }
   for (let i = 0; i < length; i++) { array[i + at] = insert[i]; }
   for (let i = 0; i < tail.length; i++) { array[i + length + at] = tail[i]; }
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
class Collection extends Events
{
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
   constructor(models = [], options = {})
   {
      super();

      // Allows child classes to abort constructor execution.
      if (_.isBoolean(options.abortCtor) && options.abortCtor) { return; }

      // Must detect if there are any getters defined in order to skip setting these values.
      const hasModelGetter = !_.isUndefined(this.model);
      const hasComparatorGetter = !_.isUndefined(this.comparator);

      // The default model for a collection is just a **Backbone.Model**. This should be overridden in most cases.
      if (!hasModelGetter)
      {
         /**
          * The default Backbone.Model class to use as a prototype for this collection.
          * @type {Model}
          */
         this.model = Model;
      }

      if (options.model && !hasModelGetter) { this.model = options.model; }

      if (options.comparator !== void 0 && !hasComparatorGetter)
      {
         /**
          * A comparator string indicating the attribute to sort.
          * @type {string}
          */
         this.comparator = options.comparator;
      }

      // Allows child classes to postpone initialization.
      if (_.isBoolean(options.abortCtorInit) && options.abortCtorInit) { return; }

      this._reset();

      this.initialize(...arguments);

      if (models) { this.reset(models, _.extend({ silent: true }, options)); }
   }

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
   add(models, options)
   {
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
   at(index)
   {
      if (index < 0) { index += this.length; }
      return this.models[index];
   }

   /**
    * Returns a new instance of the collection with an identical list of models.
    *
    * @see http://backbonejs.org/#Collection-clone
    *
    * @returns {Collection} Returns a new collection with shared models.
    */
   clone()
   {
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
   create(attrs, options)
   {
      options = options ? _.clone(options) : {};
      const wait = options.wait;
      const model = this._prepareModel(attrs, options);

      if (!model) { return false; }
      if (!wait) { this.add(model, options); }

      const collection = this;
      const success = options.success;

      options.success = function(model, resp, callbackOpts)
      {
         if (wait) { collection.add(model, callbackOpts); }
         if (success) { success.call(callbackOpts.context, model, resp, callbackOpts); }
      };

      model.save(null, options);

      return model;
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
   get(obj)
   {
      if (Utils.isNullOrUndef(obj)) { return void 0; }

      const id = this.modelId(Utils.isModel(obj) ? obj.attributes : obj);

Debug.log(`Collection - get - id: ${id}`);

      return this._byId[obj] || this._byId[id] || this._byId[obj.cid];
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
   fetch(options)
   {
      options = _.extend({ parse: true }, options);
      const success = options.success;

      options.success = (resp) =>
      {
         const method = options.reset ? 'reset' : 'set';
Debug.log(`Collection - fetch - success callback - method: ${method}`, true);
         this[method](resp, options);

         if (success) { success.call(options.context, this, resp, options); }

         this.trigger('sync', this, resp, options);
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
   findWhere(attrs)
   {
      return this.where(attrs, true);
   }

   /**
    * Initialize is an empty function by default. Override it with your own initialization logic.
    *
    * @see http://backbonejs.org/#Collection-constructor
    * @abstract
    */
   initialize()
   {
   }

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
   modelId(attrs)
   {
Debug.log(`Collection - modelId - 0 - this.model.prototype.idAttribute: ${this.model.prototype.idAttribute}`, true);
Debug.log(`Collection - modelId - 1 - attrs: ${JSON.stringify(attrs)}`);

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
   parse(resp, options)
   {
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
   pluck(attr)
   {
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
   pop(options)
   {
      const model = this.at(this.length - 1);
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
   _prepareModel(attrs, options)
   {
      if (Utils.isModel(attrs))
      {
Debug.log(`Collection - _prepareModel - 0`, true);
         if (!attrs.collection) { attrs.collection = this; }
         return attrs;
      }

      options = options ? _.clone(options) : {};
      options.collection = this;

Debug.log(`Collection - _prepareModel - 1 - attrs.parseObject: ${attrs.parseObject}`);

      const model = new this.model(attrs, options);

      if (!model.validationError) { return model; }

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
   push(model, options)
   {
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
   remove(models, options)
   {
      options = _.extend({}, options);
      const singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      const removed = s_REMOVE_MODELS(this, models, options);

      if (!options.silent && removed) { this.trigger('update', this, options); }

      return singular ? removed[0] : removed;
   }

   /**
    * Resets all internal state. Called when the collection is first initialized or reset.
    * @protected
    */
   _reset()
   {
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
   reset(models, options)
   {
      options = options ? _.clone(options) : {};

      for (let i = 0; i < this.models.length; i++) { s_REMOVE_REFERENCE(this, this.models[i]); }

      options.previousModels = this.models;

      this._reset();

      models = this.add(models, _.extend({ silent: true }, options));

      if (!options.silent) { this.trigger('reset', this, options); }

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
   set(models, options)
   {
Debug.log(`Collection - set - 0`, true);
      if (Utils.isNullOrUndef(models)) { return; }

      options = _.defaults({}, options, s_SET_OPTIONS);
      if (options.parse && !Utils.isModel(models)) { models = this.parse(models, options); }

      const singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      let at = options.at;
//      if (at != null) { at = +at; }
      if (!Utils.isNullOrUndef(at)) { at = +at; }
      if (at < 0) { at += this.length + 1; }

Debug.log(`Collection - set - 1 - at: ${at}; models.length: ${models.length}`);

      const set = [];
      const toAdd = [];
      const toRemove = [];
      const modelMap = {};

      const add = options.add;
      const merge = options.merge;
      const remove = options.remove;

      let sort = false;
      const sortable = this.comparator && (at === null) && options.sort !== false;
      const sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models from being added.
      let model;

      for (let i = 0; i < models.length; i++)
      {
         model = models[i];

         // If a duplicate is found, prevent it from being added and optionally merge it into the existing model.
         const existing = this.get(model);
         if (existing)
         {
Debug.log(`Collection - set - 2 - existing`);

            if (merge && model !== existing)
            {
Debug.log(`Collection - set - 3 - merge && model !== existing`);

               let attrs = Utils.isModel(model) ? model.attributes : model;
               if (options.parse) { attrs = existing.parse(attrs, options); }
               existing.set(attrs, options);
               if (sortable && !sort) { sort = existing.hasChanged(sortAttr); }
            }

            if (!modelMap[existing.cid])
            {
Debug.log(`Collection - set - 4 - !modelMap[existing.cid]`);

               modelMap[existing.cid] = true;
               set.push(existing);
            }

            models[i] = existing;

            // If this is a new, valid model, push it to the `toAdd` list.
         }
         else if (add)
         {
Debug.log(`Collection - set - 5 - add`);

            model = models[i] = this._prepareModel(model, options);

            if (model)
            {
Debug.log(`Collection - set - 6 - toAdd`);

               toAdd.push(model);
               s_ADD_REFERENCE(this, model);
               modelMap[model.cid] = true;
               set.push(model);
            }
         }
      }

      // Remove stale models.
      if (remove)
      {
         for (let i = 0; i < this.length; i++)
         {
            model = this.models[i];
            if (!modelMap[model.cid])
            {
Debug.log(`Collection - set - 7 - toRemove push`);
               toRemove.push(model);
            }
         }

         if (toRemove.length)
         {
Debug.log(`Collection - set - 8 - before invoking s_REMOVE_MODELS`);
            s_REMOVE_MODELS(this, toRemove, options);
         }
      }

      // See if sorting is needed, update `length` and splice in new models.
      let orderChanged = false;
      const replace = !sortable && add && remove;

      if (set.length && replace)
      {
         orderChanged = this.length !== set.length || _.some(this.models, (model, index) =>
         {
            return model !== set[index];
         });

Debug.log(`Collection - set - 9 - set.length > 0 && replace - orderChanged: ${orderChanged}`);

         this.models.length = 0;

         s_SPLICE(this.models, set, 0);

         this.length = this.models.length;
      }
      else if (toAdd.length)
      {
         if (sortable) { sort = true; }

Debug.log(`Collection - set - 10 - toAdd.length > 0 - sort: ${sort}; at: ${at}`);

         s_SPLICE(this.models, toAdd, Utils.isNullOrUndef(at) ? this.length : at);

         this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort)
      {
Debug.log(`Collection - set - 11 - sorting silent`);

         this.sort({ silent: true });
      }

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent)
      {
Debug.log(`Collection - set - 12 - !options.silent: ${!options.silent}`);

         for (let i = 0; i < toAdd.length; i++)
         {
            if (at !== null) { options.index = at + i; }

            model = toAdd[i];
            model.trigger('add', model, this, options);
         }

         if (sort || orderChanged) { this.trigger('sort', this, options); }
         if (toAdd.length || toRemove.length) { this.trigger('update', this, options); }
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
   shift(options)
   {
      const model = this.at(0);
      return this.remove(model, options);
   }

   /**
    * Return a shallow copy of this collection's models, using the same options as native `Array#slice`.
    *
    * @see http://backbonejs.org/#Collection-slice
    *
    * @returns {*}
    */
   slice()
   {
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
   sort(options = {})
   {
      let comparator = this.comparator;

      if (!comparator) { throw new Error('Cannot sort a set without a comparator'); }

      const length = comparator.length;

      if (_.isFunction(comparator)) { comparator = _.bind(comparator, this); }

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator))
      {
         this.models = this.sortBy(comparator);
      }
      else
      {
         this.models.sort(comparator);
      }

      if (!options.silent) { this.trigger('sort', this, options); }

      return this;
   }

   /**
    * Uses Backbone.sync to persist the state of a collection to the server. Can be overridden for custom behavior.
    *
    * @see http://backbonejs.org/#Collection-sync
    *
    * @returns {*}
    */
   sync()
   {
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
   toJSON(options)
   {
      return this.map((model) => { return model.toJSON(options); });
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
   unshift(model, options)
   {
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
   where(attrs, first)
   {
      return this[first ? 'find' : 'filter'](attrs);
   }
}

// Underscore methods that we want to implement on the Collection. 90% of the core usefulness of Backbone Collections
// is actually implemented right here:
const collectionMethods =
{
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
export default Collection;