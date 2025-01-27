'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseFlatten = require('./_baseFlatten.js');
var map$1 = require('./map.js');

var baseFlatten = _baseFlatten._baseFlatten,
    map = map$1.map_1;

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * _.flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1);
}

var flatMap_1 = flatMap;

var flatMap$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(flatMap_1);

module.exports = flatMap$1;
