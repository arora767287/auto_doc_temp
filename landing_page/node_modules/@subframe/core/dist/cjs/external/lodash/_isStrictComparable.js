'use strict';

var isObject$1 = require('./isObject.js');

var isObject = isObject$1.isObject_1;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

var _isStrictComparable = isStrictComparable;

exports._isStrictComparable = _isStrictComparable;
