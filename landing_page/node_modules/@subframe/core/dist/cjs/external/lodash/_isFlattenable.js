'use strict';

var _Symbol = require('./_Symbol.js');
var isArguments$1 = require('./isArguments.js');
var isArray$1 = require('./isArray.js');

var Symbol = _Symbol._Symbol,
    isArguments = isArguments$1.isArguments_1,
    isArray = isArray$1.isArray_1;

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

exports._isFlattenable = _isFlattenable;
