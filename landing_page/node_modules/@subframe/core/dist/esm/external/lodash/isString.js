import { getDefaultExportFromCjs } from '../../_virtual/_commonjsHelpers.js';
import { _ as _baseGetTag } from './_baseGetTag.js';
import { i as isArray_1 } from './isArray.js';
import { i as isObjectLike_1 } from './isObjectLike.js';

var baseGetTag = _baseGetTag,
    isArray = isArray_1,
    isObjectLike = isObjectLike_1;

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

var isString$1 = /*@__PURE__*/getDefaultExportFromCjs(isString_1);

export { isString$1 as default };
