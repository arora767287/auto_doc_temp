import { _ as _baseForOwn } from './_baseForOwn.js';
import { _ as _createBaseEach } from './_createBaseEach.js';

var baseForOwn = _baseForOwn,
    createBaseEach = _createBaseEach;

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

export { _baseEach as _ };
