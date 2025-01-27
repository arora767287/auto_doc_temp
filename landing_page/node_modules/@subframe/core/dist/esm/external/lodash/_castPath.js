import { i as isArray_1 } from './isArray.js';
import { _ as _isKey } from './_isKey.js';
import { _ as _stringToPath } from './_stringToPath.js';
import { t as toString_1 } from './toString.js';

var isArray = isArray_1,
    isKey = _isKey,
    stringToPath = _stringToPath,
    toString = toString_1;

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

export { _castPath as _ };
