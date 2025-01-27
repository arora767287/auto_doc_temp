import { _ as _baseGetTag } from './_baseGetTag.js';
import { i as isObjectLike_1 } from './isObjectLike.js';

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

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

export { _baseIsArguments as _ };
