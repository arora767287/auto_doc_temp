'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _baseGetTag = require('./_baseGetTag.js');
var isObject$1 = require('./isObject.js');

var baseGetTag = _baseGetTag._baseGetTag,
    isObject = isObject$1.isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

var isFunction$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(isFunction_1);

exports.default = isFunction$1;
exports.isFunction_1 = isFunction_1;
