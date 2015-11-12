'use strict';

import _       from 'underscore';
import Events  from './Events.js';
import Utils   from './Utils.js';

// Private / internal methods ---------------------------------------------------------------------------------------

/**
 * Cached regex for stripping a leading hash/slash and trailing space.
 */
const s_ROUTE_STRIPPER = /^[#\/]|\s+$/g;

/**
 * Cached regex for stripping leading and trailing slashes.
 */
const s_ROOT_STRIPPER = /^\/+|\/+$/g;

/**
 * Cached regex for stripping urls of hash.
 */
const s_PATH_STRIPPER = /#.*$/;

/**
 * Update the hash location, either replacing the current entry, or adding a new one to the browser history.
 *
 * @param {object}   location - URL / current location
 * @param {string}   fragment - URL fragment
 * @param {boolean}  replace  - conditional replace
 */
const s_UPDATE_HASH = (location, fragment, replace) =>
{
   if (replace)
   {
      const href = location.href.replace(/(javascript:|#).*$/, '');
      location.replace(`${href}#${fragment}`);
   }
   else
   {
      // Some browsers require that `hash` contains a leading #.
      location.hash = `#${fragment}`;
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
export default class History extends Events
{
   /** */
   constructor()
   {
      super();

      /**
       * Stores route / callback pairs for validation.
       * @type {Array<Object<string, function>>}
       */
      this.handlers = [];
      this.checkUrl = _.bind(this.checkUrl, this);

      // Ensure that `History` can be used outside of the browser.
      if (typeof window !== 'undefined')
      {
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
   atRoot()
   {
      const path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
   }

   /**
    * Checks the current URL to see if it has changed, and if it has, calls `loadUrl`, normalizing across the
    * hidden iframe.
    *
    * @returns {boolean}
    */
   checkUrl()
   {
      let current = this.getFragment();

      // If the user pressed the back button, the iframe's hash will have changed and we should use that for comparison.
      if (current === this.fragment && this.iframe)
      {
         current = this.getHash(this.iframe.contentWindow);
      }

      if (current === this.fragment) { return false; }
      if (this.iframe) { this.navigate(current); }
      this.loadUrl();
   }

   /**
    * Unicode characters in `location.pathname` are percent encoded so they're decoded for comparison. `%25` should
    * not be decoded since it may be part of an encoded parameter.
    *
    * @param {string}   fragment - URL fragment
    * @return {string}
    */
   decodeFragment(fragment)
   {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
   }

   /**
    * Get the cross-browser normalized URL fragment from the path or hash.
    *
    * @param {string} fragment   -- URL fragment
    * @returns {*|void|string|XML}
    */
   getFragment(fragment)
   {
      if (Utils.isNullOrUndef(fragment))
      {
         if (this._usePushState || !this._wantsHashChange)
         {
            fragment = this.getPath();
         }
         else
         {
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
   getHash(window)
   {
      const match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
   }

   /**
    * Get the pathname and search params, without the root.
    *
    * @returns {*}
    */
   getPath()
   {
      const path = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
   }

   /**
    * In IE6, the hash fragment and search params are incorrect if the fragment contains `?`.
    *
    * @returns {string}
    */
   getSearch()
   {
      const match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
   }

   /**
    * Attempt to load the current URL fragment. If a route succeeds with a match, returns `true`. If no defined routes
    * matches the fragment, returns `false`.
    *
    * @param {string}   fragment - URL fragment
    * @returns {boolean}
    */
   loadUrl(fragment)
   {
      // If the root doesn't match, no routes can match either.
      if (!this.matchRoot()) { return false; }
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, (handler) =>
      {
         if (handler.route.test(fragment))
         {
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
   matchRoot()
   {
      const path = this.decodeFragment(this.location.pathname);
      const root = `${path.slice(0, this.root.length - 1)}/`;
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
   navigate(fragment, options)
   {
      if (!History.started) { return false; }
      if (!options || options === true) { options = { trigger: !!options }; }

      // Normalize the fragment.
      fragment = this.getFragment(fragment || '');

      // Don't include a trailing slash on the root.
      let root = this.root;

      if (fragment === '' || fragment.charAt(0) === '?')
      {
         root = root.slice(0, -1) || '/';
      }

      const url = root + fragment;

      // Strip the hash and decode for matching.
      fragment = this.decodeFragment(fragment.replace(s_PATH_STRIPPER, ''));

      if (this.fragment === fragment) { return; }

      /**
       * URL fragment
       * @type {*|void|string|XML}
       */
      this.fragment = fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._usePushState)
      {
         this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

         // If hash changes haven't been explicitly disabled, update the hash fragment to store history.
      }
      else if (this._wantsHashChange)
      {
         s_UPDATE_HASH(this.location, fragment, options.replace);

         if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow)))
         {
            const iWindow = this.iframe.contentWindow;

            // Opening and closing the iframe tricks IE7 and earlier to push a history
            // entry on hash-tag change.  When replace is true, we don't want this.
            if (!options.replace)
            {
               iWindow.document.open();
               iWindow.document.close();
            }

            s_UPDATE_HASH(iWindow.location, fragment, options.replace);
         }

         // If you've told us that you explicitly don't want fallback hashchange-
         // based history, then `navigate` becomes a page refresh.
      }
      else
      {
         return this.location.assign(url);
      }

      if (options.trigger) { return this.loadUrl(fragment); }
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
   start(options)
   {
      if (History.started) { throw new Error('Backbone.history has already been started'); }

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
      this.root = (`/${this.root}/`).replace(s_ROOT_STRIPPER, '/');

      // Transition from hashChange to pushState or vice versa if both are requested.
      if (this._wantsHashChange && this._wantsPushState)
      {

         // If we've started off with a route from a `pushState`-enabled
         // browser, but we're currently in a browser that doesn't support it...
         if (!this._hasPushState && !this.atRoot())
         {
            const root = this.root.slice(0, -1) || '/';
            this.location.replace(`${root}#${this.getPath()}`);

            // Return immediately as browser will do redirect to new url
            return true;

            // Or if we've started out with a hash-based route, but we're currently
            // in a browser where it could be `pushState`-based instead...
         }
         else if (this._hasPushState && this.atRoot())
         {
            this.navigate(this.getHash(), { replace: true });
         }

      }

      // Proxy an iframe to handle location events if the browser doesn't support the `hashchange` event, HTML5
      // history, or the user wants `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState)
      {
         /**
          * Proxy iframe
          * @type {Element}
          */
         this.iframe = document.createElement('iframe');
         this.iframe.src = 'javascript:0';
         this.iframe.style.display = 'none';
         this.iframe.tabIndex = -1;

         const body = document.body;

         // Using `appendChild` will throw on IE < 9 if the document is not ready.
         const iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
         iWindow.document.open();
         iWindow.document.close();
         iWindow.location.hash = `#${this.fragment}`;
      }

      // Add a cross-platform `addEventListener` shim for older browsers.
      const addEventListener = window.addEventListener || function(eventName, listener)
      {
         /* eslint-disable no-undef */
         return attachEvent(`on${eventName}`, listener);
         /* eslint-enable no-undef */
      };

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._usePushState)
      {
         addEventListener('popstate', this.checkUrl, false);
      }
      else if (this._useHashChange && !this.iframe)
      {
         addEventListener('hashchange', this.checkUrl, false);
      }
      else if (this._wantsHashChange)
      {
         this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) { return this.loadUrl(); }
   }

   /**
    * Disable Backbone.history, perhaps temporarily. Not useful in a real app, but possibly useful for unit
    * testing Routers.
    */
   stop()
   {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      const removeEventListener = window.removeEventListener || function(eventName, listener)
      {
         /* eslint-disable no-undef */
         return detachEvent(`on${eventName}`, listener);
         /* eslint-enable no-undef */
      };

      // Remove window listeners.
      if (this._usePushState)
      {
         removeEventListener('popstate', this.checkUrl, false);
      }
      else if (this._useHashChange && !this.iframe)
      {
         removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe)
      {
         document.body.removeChild(this.iframe);
         this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) { clearInterval(this._checkUrlInterval); }
      History.started = false;
   }

   /**
    * Add a route to be tested when the fragment changes. Routes added later may override previous routes.
    *
    * @param {string}   route    -  Route to add for checking.
    * @param {function} callback -  Callback function to invoke on match.
    */
   route(route, callback)
   {
      this.handlers.unshift({ route, callback });
   }
}