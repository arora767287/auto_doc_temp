'use strict';

var _arrayMap = require('./_arrayMap.js');
var _baseGet = require('./_baseGet.js');
var _baseIteratee = require('./_baseIteratee.js');
var _baseMap = require('./_baseMap.js');
var _baseSortBy = require('./_baseSortBy.js');
var _baseUnary = require('./_baseUnary.js');
var _compareMultiple = require('./_compareMultiple.js');
var identity$1 = require('./identity.js');
var isArray$1 = require('./isArray.js');

var arrayMap = _arrayMap._arrayMap,
    baseGet = _baseGet._baseGet,
    baseIteratee = _baseIteratee._baseIteratee,
    baseMap = _baseMap._baseMap,
    baseSortBy = _baseSortBy._baseSortBy,
    baseUnary = _baseUnary._baseUnary,
    compareMultiple = _compareMultiple._compareMultiple,
    identity = identity$1.identity_1,
    isArray = isArray$1.isArray_1;

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

exports._baseOrderBy = _baseOrderBy;
