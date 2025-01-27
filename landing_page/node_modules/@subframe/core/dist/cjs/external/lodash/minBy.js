'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseExtremum = require('./_baseExtremum.js');
var _baseIteratee = require('./_baseIteratee.js');
var _baseLt = require('./_baseLt.js');

var baseExtremum = _baseExtremum._baseExtremum,
    baseIteratee = _baseIteratee._baseIteratee,
    baseLt = _baseLt._baseLt;

/**
 * This method is like `_.min` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.minBy(objects, function(o) { return o.n; });
 * // => { 'n': 1 }
 *
 * // The `_.property` iteratee shorthand.
 * _.minBy(objects, 'n');
 * // => { 'n': 1 }
 */
function minBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum(array, baseIteratee(iteratee), baseLt)
    : undefined;
}

var minBy_1 = minBy;

var minBy$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(minBy_1);

module.exports = minBy$1;
