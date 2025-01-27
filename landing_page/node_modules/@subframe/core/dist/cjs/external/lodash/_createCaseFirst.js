'use strict';

var _castSlice = require('./_castSlice.js');
var _hasUnicode = require('./_hasUnicode.js');
var _stringToArray = require('./_stringToArray.js');
var toString$1 = require('./toString.js');

var castSlice = _castSlice._castSlice,
    hasUnicode = _hasUnicode._hasUnicode,
    stringToArray = _stringToArray._stringToArray,
    toString = toString$1.toString_1;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

var _createCaseFirst = createCaseFirst;

exports._createCaseFirst = _createCaseFirst;
