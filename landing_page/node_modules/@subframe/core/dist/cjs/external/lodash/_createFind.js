'use strict';

var _baseIteratee = require('./_baseIteratee.js');
var isArrayLike$1 = require('./isArrayLike.js');
var keys$1 = require('./keys.js');

var baseIteratee = _baseIteratee._baseIteratee,
    isArrayLike = isArrayLike$1.isArrayLike_1,
    keys = keys$1.keys_1;

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

var _createFind = createFind;

exports._createFind = _createFind;
