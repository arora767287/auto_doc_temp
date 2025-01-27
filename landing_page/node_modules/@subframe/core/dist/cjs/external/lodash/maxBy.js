'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseExtremum = require('./_baseExtremum.js');
var _baseGt = require('./_baseGt.js');
var _baseIteratee = require('./_baseIteratee.js');

var baseExtremum = _baseExtremum._baseExtremum,
    baseGt = _baseGt._baseGt,
    baseIteratee = _baseIteratee._baseIteratee;

/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.maxBy(objects, function(o) { return o.n; });
 * // => { 'n': 2 }
 *
 * // The `_.property` iteratee shorthand.
 * _.maxBy(objects, 'n');
 * // => { 'n': 2 }
 */
function maxBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum(array, baseIteratee(iteratee), baseGt)
    : undefined;
}

var maxBy_1 = maxBy;

var maxBy$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(maxBy_1);

module.exports = maxBy$1;
