import { i as identity_1 } from './identity.js';
import { _ as _overRest } from './_overRest.js';
import { _ as _setToString } from './_setToString.js';

var identity = identity_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest;

export { _baseRest as _ };
