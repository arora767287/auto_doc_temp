'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseGetTag = require('./_baseGetTag.js');
var isObjectLike$1 = require('./isObjectLike.js');

var baseGetTag = _baseGetTag._baseGetTag,
    isObjectLike = isObjectLike$1.isObjectLike_1;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && baseGetTag(value) == boolTag);
}

var isBoolean_1 = isBoolean;

var isBoolean$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(isBoolean_1);

module.exports = isBoolean$1;
