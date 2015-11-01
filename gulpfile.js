/**
 * Gulp operations for `backbone-es6`.
 *
 * Please see `typhon-core-gulptasks` (https://www.npmjs.com/package/typhon-core-gulptasks)
 */
/* eslint-disable */

var gulp = require('gulp');

// Require all tasks and set `rootPath` to the base project path and `srcGlob` to all JS sources in `./src`.
require('typhon-core-gulptasks')(gulp, { rootPath: __dirname, srcGlob: './src/**/*.js' });