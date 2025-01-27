'use strict';

var _baseIsEqual = require('./_baseIsEqual.js');
var get$1 = require('./get.js');
var hasIn$1 = require('./hasIn.js');
var _isKey = require('./_isKey.js');
var _isStrictComparable = require('./_isStrictComparable.js');
var _matchesStrictComparable = require('./_matchesStrictComparable.js');
var _toKey = require('./_toKey.js');

var baseIsEqual = _baseIsEqual._baseIsEqual,
    get = get$1.get_1,
    hasIn = hasIn$1.hasIn_1,
    isKey = _isKey._isKey,
    isStrictComparable = _isStrictComparable._isStrictComparable,
    matchesStrictComparable = _matchesStrictComparable._matchesStrictComparable,
    toKey = _toKey._toKey;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

exports._baseMatchesProperty = _baseMatchesProperty;
