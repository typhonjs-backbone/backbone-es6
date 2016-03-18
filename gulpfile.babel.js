/**
 * Please see `typhonjs-core-gulptasks` (https://www.npmjs.com/package/typhonjs-core-gulptasks)
 */
import gulp       from 'gulp';
import gulpTasks  from 'typhonjs-core-gulptasks';

// Import all tasks and set `rootPath` to the base project path and `srcGlob` to all JS sources in `./src`.
gulpTasks(gulp,
{
   rootPath: __dirname,
   srcGlob: ['./src/**/*.js']
});
