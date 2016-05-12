'use strict';

import _             from 'underscore';
import BackboneProxy from './BackboneProxy.js';
import Events        from 'typhonjs-core-backbone-events/src/Events.js';

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
 * A route of "file/*path" will match #file/folder/file.txt, passing "folder/file.txt" to the action.
 *
 * A route of "docs/:section(/:subsection)" will match #docs/faq and #docs/faq/installing, passing "faq" to the action
 * in the first case, and passing "faq" and "installing" to the action in the second.
 *
 * A nested optional route of "docs(/:section)(/:subsection)" will match #docs, #docs/faq, and #docs/faq/installing,
 * passing "faq" to the action in the second case, and passing "faq" and "installing" to the action in the third.
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
export default class Router extends Events
{
   /**
    * When creating a new router, you may pass its routes hash directly as an option, if you choose. All options will
    * also be passed to your initialize function, if defined.
    *
    * @see http://backbonejs.org/#Router-constructor
    *
    * @param {object}   options  - Optional parameters which may contain a "routes" object literal.
    */
   constructor(options = {})
   {
      super();

      // Must detect if there are any getters defined in order to skip setting this value.
      const hasRoutesGetter = !_.isUndefined(this.routes);

      if (!hasRoutesGetter && options.routes)
      {
         /**
          * Stores the routes hash.
          * @type {object}
          */
         this.routes = options.routes;
      }

      s_BIND_ROUTES(this);

      this.initialize(...arguments);
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
   execute(callback, args, name)
   {
      /* eslint-enable no-unused-vars */
      if (callback) { callback.apply(this, args); }
   }

   /**
    * Initialize is an empty function by default. Override it with your own initialization logic.
    *
    * @see http://backbonejs.org/#Router-constructor
    * @abstract
    */
   initialize()
   {
   }

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
   navigate(fragment, options)
   {
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
   route(route, name, callback)
   {
      if (!_.isRegExp(route)) { route = s_ROUTE_TO_REGEX(route); }
      if (_.isFunction(name))
      {
         callback = name;
         name = '';
      }
      if (!callback) { callback = this[name]; }

      BackboneProxy.backbone.history.route(route, (fragment) =>
      {
         const args = s_EXTRACT_PARAMETERS(route, fragment);

         if (this.execute(callback, args, name) !== false)
         {
            this.trigger(...([`route:${name}`].concat(args)));
            this.trigger('route', name, args);
            BackboneProxy.backbone.history.trigger('route', this, name, args);
         }
      });

      return this;
   }
}

// Private / internal methods ---------------------------------------------------------------------------------------

/**
 * Cached regular expressions for matching named param parts and splatted parts of route strings.
 * @type {RegExp}
 */
const s_ESCAPE_REGEX = /[\-{}\[\]+?.,\\\^$|#\s]/g;
const s_NAMED_PARAM = /(\(\?)?:\w+/g;
const s_OPTIONAL_PARAM = /\((.*?)\)/g;
const s_SPLAT_PARAM = /\*\w+/g;

/**
 * Bind all defined routes to `Backbone.history`. We have to reverse the order of the routes here to support behavior
 * where the most general routes can be defined at the bottom of the route map.
 *
 * @param {Router}   router   - Instance of `Backbone.Router`.
 */
const s_BIND_ROUTES = (router) =>
{
   if (!router.routes) { return; }

   router.routes = _.result(router, 'routes');

   _.each(_.keys(router.routes), (route) =>
   {
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
const s_EXTRACT_PARAMETERS = (route, fragment) =>
{
   const params = route.exec(fragment).slice(1);

   return _.map(params, (param, i) =>
   {
      // Don't decode the search params.
      if (i === params.length - 1) { return param || null; }
      return param ? decodeURIComponent(param) : null;
   });
};

/**
 * Convert a route string into a regular expression, suitable for matching against the current location hash.
 *
 * @param {string}   route - A route string or regex.
 * @returns {RegExp}
 */
const s_ROUTE_TO_REGEX = (route) =>
{
   route = route.replace(s_ESCAPE_REGEX, '\\$&')
    .replace(s_OPTIONAL_PARAM, '(?:$1)?')
    .replace(s_NAMED_PARAM, (match, optional) =>
    {
       return optional ? match : '([^/?]+)';
    })
    .replace(s_SPLAT_PARAM, '([^?]*?)');
   return new RegExp(`^${route}(?:\\?([\\s\\S]*))?$`);
};