'use strict';

var _baseForOwn = require('./_baseForOwn.js');
var _createBaseEach = require('./_createBaseEach.js');

var baseForOwn = _baseForOwn._baseForOwn,
    createBaseEach = _createBaseEach._createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

var _baseEach = baseEach;

exports._baseEach = _baseEach;
