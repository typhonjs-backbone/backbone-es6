'use strict';

import _             from 'underscore';
import BackboneProxy from './BackboneProxy.js';
import Events        from 'typhonjs-core-backbone-events/src/Events.js';

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
export default class View extends Events
{
   /**
    * The default `tagName` of a View's element is `"div"`.
    *
    * @returns {string}
    */
   get tagName() { return 'div'; }

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
   constructor(options)
   {
      super();

      /**
       * Client ID
       * @type {number}
       */
      this.cid = _.uniqueId('view');

      _.extend(this, _.pick(options, s_VIEW_OPTIONS));

      this._ensureElement();
      this.initialize(...arguments);
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
   $(selector)
   {
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
   _createElement(tagName)
   {
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
   delegate(eventName, selector, listener)
   {
      this.$el.on(`${eventName}.delegateEvents${this.cid}`, selector, listener);
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
   delegateEvents(events)
   {
      events = events || _.result(this, 'events');
      if (!events) { return this; }
      this.undelegateEvents();
      for (const key in events)
      {
         let method = events[key];
         if (!_.isFunction(method)) { method = this[method]; }
         if (!method) { continue; }
         const match = key.match(s_DELEGATE_EVENT_SPLITTER);
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
   _ensureElement()
   {
      if (!this.el)
      {
         const attrs = _.extend({}, _.result(this, 'attributes'));
         if (this.id) { attrs.id = _.result(this, 'id'); }
         if (this.className) { attrs['class'] = _.result(this, 'className'); }
         this.setElement(this._createElement(_.result(this, 'tagName')));
         this._setAttributes(attrs);
      }
      else
      {
         this.setElement(_.result(this, 'el'));
      }
   }

   /**
    * Initialize is an empty function by default. Override it with your own initialization logic.
    *
    * @see http://backbonejs.org/#View-constructor
    * @abstract
    */
   initialize()
   {
   }

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
   remove()
   {
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
   _removeElement()
   {
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
   render()
   {
      return this;
   }

   /**
    * Set attributes from a hash on this view's element.  Exposed for subclasses using an alternative DOM
    * manipulation API.
    *
    * @protected
    * @param {object}   attributes - An object defining attributes to associate with `this.$el`.
    */
   _setAttributes(attributes)
   {
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
   _setElement(el)
   {
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
   setElement(element)
   {
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
   undelegate(eventName, selector, listener)
   {
      this.$el.off(`${eventName}.delegateEvents${this.cid}`, selector, listener);
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
   undelegateEvents()
   {
      if (this.$el) { this.$el.off(`.delegateEvents${this.cid}`); }
      return this;
   }
}

// Private / internal methods ---------------------------------------------------------------------------------------

/**
 * Cached regex to split keys for `delegate`.
 * @type {RegExp}
 */
const s_DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

/**
 * List of view options to be set as properties.
 * @type {string[]}
 */
const s_VIEW_OPTIONS = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];