import { _ as _castPath } from './_castPath.js';
import { i as isArguments_1 } from './isArguments.js';
import { i as isArray_1 } from './isArray.js';
import { _ as _isIndex } from './_isIndex.js';
import { i as isLength_1 } from './isLength.js';
import { _ as _toKey } from './_toKey.js';

var castPath = _castPath,
    isArguments = isArguments_1,
    isArray = isArray_1,
    isIndex = _isIndex,
    isLength = isLength_1,
    toKey = _toKey;

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

export { _hasPath as _ };
