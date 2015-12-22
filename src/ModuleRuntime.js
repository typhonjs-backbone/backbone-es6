/**
 * ModuleRuntime.js -- Provides the standard / default configuration that is the same as Backbone 1.2.3
 */

'use strict';

import Backbone      from './Backbone.js';
import Collection    from './Collection.js';
import Events        from 'typhonjs-core-backbone-events/src/Events.js';
import History       from './History.js';
import Model         from './Model.js';
import Router        from './Router.js';
import View          from './View.js';

import extend        from './extend.js';
import sync          from './sync.js';

const options =
{
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

const backbone = new Backbone(Collection, Events, History, Model, Router, View, sync, options);

// Set up older extends inheritance support for the model, collection, router, view and history.
backbone.Model.extend = backbone.Collection.extend = backbone.Router.extend = backbone.View.extend =
 backbone.History.extend = extend;

export default backbone;