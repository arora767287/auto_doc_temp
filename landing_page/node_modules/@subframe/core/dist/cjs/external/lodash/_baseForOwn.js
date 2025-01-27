'use strict';

var _baseFor = require('./_baseFor.js');
var keys$1 = require('./keys.js');

var baseFor = _baseFor._baseFor,
    keys = keys$1.keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

var _baseForOwn = baseForOwn;

exports._baseForOwn = _baseForOwn;
