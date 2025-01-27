'use strict';

var _baseMatches = require('./_baseMatches.js');
var _baseMatchesProperty = require('./_baseMatchesProperty.js');
var identity$1 = require('./identity.js');
var isArray$1 = require('./isArray.js');
var property$1 = require('./property.js');

var baseMatches = _baseMatches._baseMatches,
    baseMatchesProperty = _baseMatchesProperty._baseMatchesProperty,
    identity = identity$1.identity_1,
    isArray = isArray$1.isArray_1,
    property = property$1.property_1;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

var _baseIteratee = baseIteratee;

exports._baseIteratee = _baseIteratee;
