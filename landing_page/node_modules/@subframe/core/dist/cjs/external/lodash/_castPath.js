'use strict';

var isArray$1 = require('./isArray.js');
var _isKey = require('./_isKey.js');
var _stringToPath = require('./_stringToPath.js');
var toString$1 = require('./toString.js');

var isArray = isArray$1.isArray_1,
    isKey = _isKey._isKey,
    stringToPath = _stringToPath._stringToPath,
    toString = toString$1.toString_1;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

var _castPath = castPath;

exports._castPath = _castPath;
