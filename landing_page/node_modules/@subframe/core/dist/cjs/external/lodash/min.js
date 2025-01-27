'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseExtremum = require('./_baseExtremum.js');
var _baseLt = require('./_baseLt.js');
var identity$1 = require('./identity.js');

var baseExtremum = _baseExtremum._baseExtremum,
    baseLt = _baseLt._baseLt,
    identity = identity$1.identity_1;

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => undefined
 */
function min(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseLt)
    : undefined;
}

var min_1 = min;

var min$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(min_1);

module.exports = min$1;
