'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _arraySome = require('./_arraySome.js');
var _baseIteratee = require('./_baseIteratee.js');
var _baseSome = require('./_baseSome.js');
var isArray$1 = require('./isArray.js');
var _isIterateeCall = require('./_isIterateeCall.js');

var arraySome = _arraySome._arraySome,
    baseIteratee = _baseIteratee._baseIteratee,
    baseSome = _baseSome._baseSome,
    isArray = isArray$1.isArray_1,
    isIterateeCall = _isIterateeCall._isIterateeCall;

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate));
}

var some_1 = some;

var some$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(some_1);

module.exports = some$1;
