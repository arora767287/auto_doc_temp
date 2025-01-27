'use strict';

var eq$1 = require('./eq.js');
var isArrayLike$1 = require('./isArrayLike.js');
var _isIndex = require('./_isIndex.js');
var isObject$1 = require('./isObject.js');

var eq = eq$1.eq_1,
    isArrayLike = isArrayLike$1.isArrayLike_1,
    isIndex = _isIndex._isIndex,
    isObject = isObject$1.isObject_1;

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

exports._isIterateeCall = _isIterateeCall;
