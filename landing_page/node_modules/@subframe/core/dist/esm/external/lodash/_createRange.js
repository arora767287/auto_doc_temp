import { _ as _baseRange } from './_baseRange.js';
import { _ as _isIterateeCall } from './_isIterateeCall.js';
import { t as toFinite_1 } from './toFinite.js';

var baseRange = _baseRange,
    isIterateeCall = _isIterateeCall,
    toFinite = toFinite_1;

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

var _createRange = createRange;

export { _createRange as _ };
