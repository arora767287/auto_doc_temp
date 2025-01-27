'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseGetTag = require('./_baseGetTag.js');
var isObjectLike$1 = require('./isObjectLike.js');

var baseGetTag = _baseGetTag._baseGetTag,
    isObjectLike = isObjectLike$1.isObjectLike_1;

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}

var isNumber_1 = isNumber;

var isNumber$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(isNumber_1);

exports.default = isNumber$1;
exports.isNumber_1 = isNumber_1;
