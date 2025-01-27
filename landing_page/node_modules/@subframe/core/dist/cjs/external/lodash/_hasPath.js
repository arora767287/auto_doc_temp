'use strict';

var _castPath = require('./_castPath.js');
var isArguments$1 = require('./isArguments.js');
var isArray$1 = require('./isArray.js');
var _isIndex = require('./_isIndex.js');
var isLength$1 = require('./isLength.js');
var _toKey = require('./_toKey.js');

var castPath = _castPath._castPath,
    isArguments = isArguments$1.isArguments_1,
    isArray = isArray$1.isArray_1,
    isIndex = _isIndex._isIndex,
    isLength = isLength$1.isLength_1,
    toKey = _toKey._toKey;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

var _hasPath = hasPath;

exports._hasPath = _hasPath;
