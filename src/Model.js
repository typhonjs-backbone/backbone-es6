'use strict';

import _             from 'underscore';
import BackboneProxy from './BackboneProxy.js';
import Events        from './Events.js';
import Utils         from './Utils.js';

/**
 * Backbone.Model - Models are the heart of any JavaScript application. (http://backbonejs.org/#Model)
 * --------------
 *
 * Models are the heart of any JavaScript application, containing the interactive data as well as a large part of the
 * logic surrounding it: conversions, validations, computed properties, and access control.
 * <p>
 * Backbone-ES6 supports the older "extend" functionality of Backbone. You can still use "extend" to extend
 * Backbone.Model with your domain-specific methods, and Model provides a basic set of functionality for managing
 * changes.
 * <p>
 * It is recommended though to use ES6 syntax for working with Backbone-ES6 foregoing the older "extend" mechanism.
 * <p>
 * Create a new model with the specified attributes. A client id (`cid`) is automatically generated & assigned for you.
 * <p>
 * If you pass a {collection: ...} as the options, the model gains a collection property that will be used to indicate
 * which collection the model belongs to, and is used to help compute the model's url. The model.collection property is
 * normally created automatically when you first add a model to a collection. Note that the reverse is not true, as
 * passing this option to the constructor will not automatically add the model to the collection. Useful, sometimes.
 * <p>
 * If {parse: true} is passed as an option, the attributes will first be converted by parse before being set on the
 * model.
 * <p>
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
class Model extends Events
{
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
    * <br>
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
   constructor(attributes = {}, options = {})
   {
      super();

      // Allows child classes to abort constructor execution.
      if (_.isBoolean(options.abortCtor) && options.abortCtor) { return; }

      let attrs = attributes;

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

      if (options.collection)
      {
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

      /**
       * The prefix is used to create the client id which is used to identify models locally.
       * You may want to override this if you're experiencing name clashes with model ids.
       *
       * @type {string}
       */
      this.cidPrefix = 'c';

      // Allows child classes to postpone initialization.
      if (_.isBoolean(options.abortCtorInit) && options.abortCtorInit) { return; }

      if (options.parse) { attrs = this.parse(attrs, options) || {}; }

      attrs = _.defaults({}, attrs, _.result(this, 'defaults'));

      this.set(attrs, options);

      this.initialize(this, arguments);
   }

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
   changedAttributes(diff)
   {
      if (!diff) { return this.hasChanged() ? _.clone(this.changed) : false; }
      const old = this._changing ? this._previousAttributes : this.attributes;
      const changed = {};
      for (const attr in diff)
      {
         const val = diff[attr];
         if (_.isEqual(old[attr], val)) { continue; }
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
   clear(options)
   {
      const attrs = {};
      for (const key in this.attributes) { attrs[key] = void 0; }
      return this.set(attrs, _.extend({}, options, { unset: true }));
   }

   /**
    * Returns a new instance of the model with identical attributes.
    *
    * @see http://backbonejs.org/#Model-clone
    *
    * @returns {*}
    */
   clone()
   {
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
   destroy(options)
   {
      options = options ? _.clone(options) : {};
      const success = options.success;
      const wait = options.wait;

      const destroy = () =>
      {
         this.stopListening();
         this.trigger('destroy', this, this.collection, options);
      };

      options.success = (resp) =>
      {
         if (wait) { destroy(); }
         if (success) { success.call(options.context, this, resp, options); }
         if (!this.isNew()) { this.trigger('sync', this, resp, options); }
      };

      let xhr = false;

      if (this.isNew())
      {
         _.defer(options.success);
      }
      else
      {
         Utils.wrapError(this, options);
         xhr = this.sync('delete', this, options);
      }

      if (!wait) { destroy(); }

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
   escape(attr)
   {
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
   fetch(options)
   {
      options = _.extend({ parse: true }, options);
      const success = options.success;
      options.success = (resp) =>
      {
         const serverAttrs = options.parse ? this.parse(resp, options) : resp;
         if (!this.set(serverAttrs, options)) { return false; }
         if (success) { success.call(options.context, this, resp, options); }
         this.trigger('sync', this, resp, options);
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
   get(attr)
   {
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
   has(attr)
   {
      return !Utils.isNullOrUndef(this.get(attr));
   }

   /**
    * Has the model changed since its last set? If an attribute is passed, returns true if that specific attribute has
    * changed.
    * <p>
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
   hasChanged(attr)
   {
      if (Utils.isNullOrUndef(attr)) { return !_.isEmpty(this.changed); }
      return _.has(this.changed, attr);
   }

   /**
    * Initialize is an empty function by default. Override it with your own initialization logic.
    *
    * @see http://backbonejs.org/#Model-constructor
    * @abstract
    */
   initialize()
   {
   }

   /**
    * Has this model been saved to the server yet? If the model does not yet have an id, it is considered to be new.
    *
    * @see http://backbonejs.org/#Model-isNew
    *
    * @returns {boolean}
    */
   isNew()
   {
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
   isValid(options)
   {
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
   matches(attrs)
   {
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
   parse(resp, options)
   {
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
   previous(attr)
   {
      if (Utils.isNullOrUndef(attr) || !this._previousAttributes) { return null; }
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
   previousAttributes()
   {
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
    * <p>
    * If instead, you'd only like the changed attributes to be sent to the server, call model.save(attrs,
    * {patch: true}). You'll get an HTTP PATCH request to the server with just the passed-in attributes.
    * <p>
    * Calling save with new attributes will cause a "change" event immediately, a "request" event as the Ajax request
    * begins to go to the server, and a "sync" event after the server has acknowledged the successful change. Pass
    * {wait: true} if you'd like to wait for the server before setting the new attributes on the model.
    * <p>
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
   save(key, val, options)
   {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      let attrs;
      if (Utils.isNullOrUndef(key) || typeof key === 'object')
      {
         attrs = key;
         options = val;
      }
      else
      {
         (attrs = {})[key] = val;
      }

      options = _.extend({ validate: true, parse: true }, options);
      const wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait)
      {
         if (!this.set(attrs, options)) { return false; }
      }
      else
      {
         if (!this._validate(attrs, options)) { return false; }
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      const success = options.success;
      const attributes = this.attributes;
      options.success = (resp) =>
      {
         // Ensure attributes are restored during synchronous saves.
         this.attributes = attributes;
         let serverAttrs = options.parse ? this.parse(resp, options) : resp;
         if (wait) { serverAttrs = _.extend({}, attrs, serverAttrs); }
         if (serverAttrs && !this.set(serverAttrs, options)) { return false; }
         if (success) { success.call(options.context, this, resp, options); }
         this.trigger('sync', this, resp, options);
      };
      Utils.wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) { this.attributes = _.extend({}, attributes, attrs); }

      const method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) { options.attrs = attrs; }
      const xhr = this.sync(method, this, options);

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
   set(key, val, options = {})
   {
      if (Utils.isNullOrUndef(key)) { return this; }

      // Handle both `"key", value` and `{key: value}` -style arguments.
      let attrs;
      if (typeof key === 'object')
      {
         attrs = key;
         options = val || {};
      }
      else
      {
         (attrs = {})[key] = val;
      }

      // Run validation.
      if (!this._validate(attrs, options)) { return false; }

      // Extract attributes and options.
      const unset = options.unset;
      const silent = options.silent;
      const changes = [];
      const changing = this._changing;
      this._changing = true;

      if (!changing)
      {
         this._previousAttributes = _.clone(this.attributes);
         this.changed = {};
      }

      const current = this.attributes;
      const changed = this.changed;
      const prev = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (const attr in attrs)
      {
         val = attrs[attr];
         if (!_.isEqual(current[attr], val)) { changes.push(attr); }

         if (!_.isEqual(prev[attr], val))
         {
            changed[attr] = val;
         }
         else
         {
            delete changed[attr];
         }

         if (unset)
         {
            delete current[attr];
         }
         else
         {
            current[attr] = val;
         }
      }

      /**
       * Update the `id`.
       * @type {*}
       */
      this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent)
      {
         if (changes.length) { this._pending = options; }
         for (let i = 0; i < changes.length; i++)
         {
            this.trigger(`change:${changes[i]}`, this, current[changes[i]], options);
         }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) { return this; }
      if (!silent)
      {
         while (this._pending)
         {
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
   sync()
   {
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
   toJSON()
   {
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
   unset(attr, options)
   {
      return this.set(attr, void 0, _.extend({}, options, { unset: true }));
   }

   /**
    * Returns the relative URL where the model's resource would be located on the server. If your models are located
    * somewhere else, override this method with the correct logic. Generates URLs of the form: "[collection.url]/[id]"
    * by default, but you may override by specifying an explicit urlRoot if the model's collection shouldn't be taken
    * into account.
    * <p>
    * Delegates to Collection#url to generate the URL, so make sure that you have it defined, or a urlRoot property,
    * if all models of this class share a common root URL. A model with an id of 101, stored in a Backbone.Collection
    * with a url of "/documents/7/notes", would have this URL: "/documents/7/notes/101"
    *
    * @see http://backbonejs.org/#Model-url
    * @see http://backbonejs.org/#Model-urlRoot
    *
    * @returns {string}
    */
   url()
   {
      const base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || Utils.urlError();
      if (this.isNew()) { return base; }
      const id = this.get(this.idAttribute);
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
   _validate(attrs, options)
   {
      if (!options.validate || !this.validate) { return true; }
      attrs = _.extend({}, this.attributes, attrs);
      const error = this.validationError = this.validate(attrs, options) || null;
      if (!error) { return true; }
      this.trigger('invalid', this, error, _.extend(options, { validationError: error }));
      return false;
   }
}

// The default name for the JSON `id` attribute is `"id"`. MongoDB and CouchDB users may want to set this to `"_id"`.
Model.prototype.idAttribute = 'id';

// Underscore methods that we want to implement on the Model, mapped to the number of arguments they take.
const modelMethods =
{
   keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
   omit: 0, chain: 1, isEmpty: 1
};

// Mix in each Underscore method as a proxy to `Model#attributes`.
Utils.addUnderscoreMethods(Model, modelMethods, 'attributes');

/**
 * Exports the Model class.
 */
export default Model;