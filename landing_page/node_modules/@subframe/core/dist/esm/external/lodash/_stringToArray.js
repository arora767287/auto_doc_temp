import { _ as _asciiToArray } from './_asciiToArray.js';
import { _ as _hasUnicode } from './_hasUnicode.js';
import { _ as _unicodeToArray } from './_unicodeToArray.js';

var asciiToArray = _asciiToArray,
    hasUnicode = _hasUnicode,
    unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

var _stringToArray = stringToArray;

export { _stringToArray as _ };
