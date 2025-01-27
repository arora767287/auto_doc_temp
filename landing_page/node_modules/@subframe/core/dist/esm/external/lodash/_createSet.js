import { _ as _Set } from './_Set.js';
import { n as noop_1 } from './noop.js';
import { _ as _setToArray } from './_setToArray.js';

var Set = _Set,
    noop = noop_1,
    setToArray = _setToArray;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

var _createSet = createSet;

export { _createSet as _ };
