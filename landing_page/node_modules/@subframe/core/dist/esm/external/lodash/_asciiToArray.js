/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray;

export { _asciiToArray as _ };
