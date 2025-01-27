'use strict';

var _ListCache = require('./_ListCache.js');

var ListCache = _ListCache._ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

exports._stackClear = _stackClear;
