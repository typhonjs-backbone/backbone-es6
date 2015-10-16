/**
 * Gulp operations for Backbone-ES6
 *
 * The following tasks are available:
 * bundle - Creates one or more bundles defined in './bundle-config.js'
 * docs - Creates documentation and outputs it in './docs'
 * lint - Runs ESLint outputting to console.
 * jspm-install - Executes 'jspm install'
 * npm-install - Executes 'npm install'
 */

/* eslint-disable */

var gulp =        require('gulp');

var esdoc =       require('gulp-esdoc');
var eslint =      require('gulp-eslint');
var run =         require('gulp-run');
var mkdirp =      require('mkdirp');
var Promise =     require("bluebird");
var Builder =     require('systemjs-builder');

var bundleInfo =  require('./bundle-config.json');

/**
 * Bundles Backbone-ES6 via the config file found in './bundle-config.json'. This file contains an array of
 * parameters for invoking SystemJS Builder.
 *
 * An example entry:
 *    {
 *       "destBaseDir": "./dist/",        // Root destination directory for bundle output.
 *       "destFilename": "backbone.js",   // Destination bundle file name.
 *       "formats": ["amd", "cjs"],       // Module format to use / also defines destination sub-directory.
 *       "mangle": false,                 // Uglify mangle property used by SystemJS Builder.
 *       "minify": false,                 // Minify mangle property used by SystemJS Builder.
 *       "src": "src/ModuleRuntime.js",   // Source file for SystemJS Builder
 *       "extraConfig":                   // Defines additional config parameters to load after ./config.json is loaded.
 *       {
 *          "meta":
 *          {
 *             "jquery": { "build": false },
 *             "underscore": { "build": false }
 *          }
 *       }
 *    },
 */
gulp.task('bundle', function()
{
   var promiseList = [];

   for (var cntr = 0; cntr < bundleInfo.entryPoints.length; cntr++)
   {
      var entry = bundleInfo.entryPoints[cntr];

      var destBaseDir = entry.destBaseDir;
      var destFilename = entry.destFilename;
      var srcFilename = entry.src;
      var extraConfig = entry.extraConfig;
      var formats = entry.formats;
      var mangle = entry.mangle;
      var minify = entry.minify;

      for (var cntr2 = 0; cntr2 < formats.length; cntr2++)
      {
         var format = formats[cntr2];

         var destDir = destBaseDir +format;
         var destFilepath = destDir +'/' +destFilename;

         promiseList.push(buildStatic(srcFilename, destDir, destFilepath, minify, mangle, format, extraConfig));
      }
   }

   return Promise.all(promiseList).then(function()
   {
      console.log('All Bundle Tasks Complete');
   });
});

/**
 * Create docs from ./src using ESDoc. The docs are located in ./docs
 */
gulp.task('docs', function()
{
   var esdocConfig = require('./esdoc.json');

   return gulp.src('./src')
    .pipe(esdoc(esdocConfig));
});

/**
 * Runs eslint
 */
gulp.task('lint', function()
{
   return gulp.src('./src/**/*.js')
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(eslint.failOnError());
});

/**
 * Runs "jspm install"
 */
gulp.task('jspm-install', function()
{
   return run('jspm install').exec();
});

/**
 * Runs "npm install"
 */
gulp.task('npm-install', function()
{
   return run('npm install').exec();
});

/**
 * Returns a Promise which encapsulates an execution of SystemJS Builder.
 *
 * @param srcFilename
 * @param destDir
 * @param destFilepath
 * @param minify
 * @param mangle
 * @param format
 * @param extraConfig
 * @returns {bluebird} Promise
 */
function buildStatic(srcFilename, destDir, destFilepath, minify, mangle, format, extraConfig)
{
   return new Promise(function(resolve, reject)
   {
      mkdirp(destDir, function(err)
      {
         if (err)
         {
            console.error(err);
            reject();
         }
         else
         {
            var builder = new Builder();
            builder.loadConfig('./config.js').then(function()
            {
               if (typeof extraConfig !== 'undefined')
               {
                  builder.config(extraConfig);
               }

               console.log("Bundle queued - srcFilename: " +srcFilename +"; format: " +format  +"; mangle: " +mangle
                +"; minify: " +minify +"; destDir: " +destDir +"; destFilepath: " +destFilepath);

               builder.buildStatic(srcFilename, destFilepath,
                {
                   minify: minify,
                   mangle: mangle,
                   format: format
                })
                .then(function ()
                {
                   console.log('Bundle complete - filename: ' +destFilepath +' minify: ' +minify +'; mangle: ' +mangle
                    +'; format: ' +format);

                   resolve();
                })
                .catch(function (err)
                {
                   console.log('Bundle error - filename: ' +destFilepath +' minify: ' +minify + '; mangle: ' +mangle
                    +'; format: ' +format);

                   console.log(err);

                   resolve();
                });
            });
         }
      });
   });
}
