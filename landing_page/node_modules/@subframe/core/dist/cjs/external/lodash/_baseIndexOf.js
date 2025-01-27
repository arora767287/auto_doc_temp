'use strict';

var _baseFindIndex = require('./_baseFindIndex.js');
var _baseIsNaN = require('./_baseIsNaN.js');
var _strictIndexOf = require('./_strictIndexOf.js');

var baseFindIndex = _baseFindIndex._baseFindIndex,
    baseIsNaN = _baseIsNaN._baseIsNaN,
    strictIndexOf = _strictIndexOf._strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

exports._baseIndexOf = _baseIndexOf;
