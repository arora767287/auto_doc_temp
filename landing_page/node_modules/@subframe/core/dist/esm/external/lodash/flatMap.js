import { getDefaultExportFromCjs } from '../../_virtual/_commonjsHelpers.js';
import { _ as _baseFlatten } from './_baseFlatten.js';
import { m as map_1 } from './map.js';

var baseFlatten = _baseFlatten,
    map = map_1;

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

var flatMap$1 = /*@__PURE__*/getDefaultExportFromCjs(flatMap_1);

export { flatMap$1 as default };
