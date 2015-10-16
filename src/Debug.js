'use strict';

const s_DEBUG_LOG = false;
const s_DEBUG_TRACE = false;

/* eslint-disable no-console */

/**
 * Debug.js - Provides basic logging functionality that can be turned on via setting s_DEBUG_LOG = true;
 *
 * This is temporary until stability is fully tested.
 */
export default class Debug
{
   /**
    * Posts a log message to console.
    *
    * @param {string}   message  - A message to log
    * @param {boolean}  trace    - A boolean indicating whether to also log `console.trace()`
    */
   static log(message, trace = s_DEBUG_TRACE)
   {
      if (s_DEBUG_LOG)
      {
         console.log(message);
      }

      if (s_DEBUG_LOG && trace)
      {
         console.trace();
      }
   }
}