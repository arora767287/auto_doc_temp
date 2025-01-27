import { _ as _arrayMap } from './_arrayMap.js';
import { _ as _baseGet } from './_baseGet.js';
import { _ as _baseIteratee } from './_baseIteratee.js';
import { _ as _baseMap } from './_baseMap.js';
import { _ as _baseSortBy } from './_baseSortBy.js';
import { _ as _baseUnary } from './_baseUnary.js';
import { _ as _compareMultiple } from './_compareMultiple.js';
import { i as identity_1 } from './identity.js';
import { i as isArray_1 } from './isArray.js';

var arrayMap = _arrayMap,
    baseGet = _baseGet,
    baseIteratee = _baseIteratee,
    baseMap = _baseMap,
    baseSortBy = _baseSortBy,
    baseUnary = _baseUnary,
    compareMultiple = _compareMultiple,
    identity = identity_1,
    isArray = isArray_1;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        }
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }

  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

var _baseOrderBy = baseOrderBy;

export { _baseOrderBy as _ };
