'use strict';

var _asciiToArray = require('./_asciiToArray.js');
var _hasUnicode = require('./_hasUnicode.js');
var _unicodeToArray = require('./_unicodeToArray.js');

var asciiToArray = _asciiToArray._asciiToArray,
    hasUnicode = _hasUnicode._hasUnicode,
    unicodeToArray = _unicodeToArray._unicodeToArray;

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

exports._stringToArray = _stringToArray;
