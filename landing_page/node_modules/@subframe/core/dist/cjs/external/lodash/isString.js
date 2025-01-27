'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseGetTag = require('./_baseGetTag.js');
var isArray$1 = require('./isArray.js');
var isObjectLike$1 = require('./isObjectLike.js');

var baseGetTag = _baseGetTag._baseGetTag,
    isArray = isArray$1.isArray_1,
    isObjectLike = isObjectLike$1.isObjectLike_1;

/** `Object#toString` result references. */
var stringTag = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

var isString_1 = isString;

var isString$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(isString_1);

module.exports = isString$1;
