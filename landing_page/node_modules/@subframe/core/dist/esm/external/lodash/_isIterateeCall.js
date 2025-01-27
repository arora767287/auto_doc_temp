import { e as eq_1 } from './eq.js';
import { i as isArrayLike_1 } from './isArrayLike.js';
import { _ as _isIndex } from './_isIndex.js';
import { i as isObject_1 } from './isObject.js';

var eq = eq_1,
    isArrayLike = isArrayLike_1,
    isIndex = _isIndex,
    isObject = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

export { _isIterateeCall as _ };
