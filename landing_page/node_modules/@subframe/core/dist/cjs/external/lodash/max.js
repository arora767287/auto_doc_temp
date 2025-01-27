'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseExtremum = require('./_baseExtremum.js');
var _baseGt = require('./_baseGt.js');
var identity$1 = require('./identity.js');

var baseExtremum = _baseExtremum._baseExtremum,
    baseGt = _baseGt._baseGt,
    identity = identity$1.identity_1;

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseGt)
    : undefined;
}

var max_1 = max;

var max$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(max_1);

module.exports = max$1;
