import { _ as _Symbol } from './_Symbol.js';
import { i as isArguments_1 } from './isArguments.js';
import { i as isArray_1 } from './isArray.js';

var Symbol = _Symbol,
    isArguments = isArguments_1,
    isArray = isArray_1;

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

export { _isFlattenable as _ };
