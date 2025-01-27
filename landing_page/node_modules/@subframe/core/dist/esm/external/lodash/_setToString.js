import { _ as _baseSetToString } from './_baseSetToString.js';
import { _ as _shortOut } from './_shortOut.js';

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

var _setToString = setToString;

export { _setToString as _ };
