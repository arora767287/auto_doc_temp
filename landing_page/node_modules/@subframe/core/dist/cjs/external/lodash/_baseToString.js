'use strict';

var _Symbol = require('./_Symbol.js');
var _arrayMap = require('./_arrayMap.js');
var isArray$1 = require('./isArray.js');
var isSymbol$1 = require('./isSymbol.js');

var Symbol = _Symbol._Symbol,
    arrayMap = _arrayMap._arrayMap,
    isArray = isArray$1.isArray_1,
    isSymbol = isSymbol$1.isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

exports._baseToString = _baseToString;
