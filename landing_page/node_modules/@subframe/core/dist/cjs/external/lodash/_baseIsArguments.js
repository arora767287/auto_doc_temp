'use strict';

var _baseGetTag = require('./_baseGetTag.js');
var isObjectLike$1 = require('./isObjectLike.js');

var baseGetTag = _baseGetTag._baseGetTag,
    isObjectLike = isObjectLike$1.isObjectLike_1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

exports._baseIsArguments = _baseIsArguments;
