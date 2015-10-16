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
const BackboneProxy =
{
   backbone: null
};

export default BackboneProxy;