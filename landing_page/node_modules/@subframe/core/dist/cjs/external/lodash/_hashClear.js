'use strict';

var _nativeCreate = require('./_nativeCreate.js');

var nativeCreate = _nativeCreate._nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

exports._hashClear = _hashClear;
