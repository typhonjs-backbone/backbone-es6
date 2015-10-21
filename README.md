![Backbone-ES6](http://i.imgur.com/KKkgP8P.png)

[![Backbone](https://img.shields.io/badge/backbone-1.2.3-brightgreen.svg?style=flat)](https://github.com/jashkenas/backbone)
[![Documentation](https://doc.esdoc.org/github.com/typhonjs/backbone-es6/badge.svg)](https://doc.esdoc.org/github.com/typhonjs/backbone-es6/)
[![Code Style](https://img.shields.io/badge/code%20style-allman-brightgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)

[![Build Status](https://travis-ci.org/typhonjs/backbone-es6.svg)](https://travis-ci.org/typhonjs/backbone-es6)
[![Dependency Status](https://www.versioneye.com/user/projects/5627b86536d0ab0021000f46/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5627b86536d0ab0021000f46)

Backbone supplies structure to JavaScript-heavy applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing application over a RESTful JSON interface.

Backbone-ES6 is a fork of Backbone (https://github.com/jashkenas/backbone) converting and modularizing it into idiomatic ES6. The impetus for this fork is to experiment with modernizing and making Backbone easier to modify in a granular fashion. In particular the Parse JS SDK (http://www.parse.com) previously also was a fork of Backbone, but with the 1.6+ SDK release the Backbone API was unceremoniously removed. Backbone-ES6 provides the base for Backbone-Parse-ES6 (https://github.com/typhonjs/backbone-parse-es6) which provides a solution for Backbone dependent Parse users. Another reason for Backbone-ES6 is supporting end to end documentation via ESDoc for ES6 frameworks and apps built on top of Backbone. 

This repository contains several pre-packed downloads in the `dist/` directory. There are AMD, CJS, and Global distributions. The "global-inclusive" bundle includes the latest jQuery (2.1.4) and Underscore (1.8.3) libraries.

Please view the wiki for build instructions and other pertinent info:
https://github.com/typhonjs/backbone-es6/wiki

API documentation can be found in the `docs/` directory and online here:
https://doc.esdoc.org/github.com/typhonjs/backbone-es6/'

For original Backbone Docs, License, Tests, pre-packed downloads, see:
http://backbonejs.org

To suggest a feature or report a bug:
https://github.com/typhonjs/backbone-es6/issues

Many thanks to DocumentCloud & all Backbone contributors.

Backbone (c) 2010-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors

Backbone-ES6 (c) 2015 Michael Leahy, TyphonRT, Inc. 

Backbone / Backbone-ES6 may be freely distributed under the MIT license.
