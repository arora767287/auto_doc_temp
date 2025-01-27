'use strict';

var _baseIsTypedArray = require('./_baseIsTypedArray.js');
var _baseUnary = require('./_baseUnary.js');
var _nodeUtil = require('./_nodeUtil.js');

var baseIsTypedArray = _baseIsTypedArray._baseIsTypedArray,
    baseUnary = _baseUnary._baseUnary,
    nodeUtil = _nodeUtil._nodeUtilExports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

exports.isTypedArray_1 = isTypedArray_1;
