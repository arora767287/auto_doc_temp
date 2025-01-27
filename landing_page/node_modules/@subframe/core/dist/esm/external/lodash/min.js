import { getDefaultExportFromCjs } from '../../_virtual/_commonjsHelpers.js';
import { _ as _baseExtremum } from './_baseExtremum.js';
import { _ as _baseLt } from './_baseLt.js';
import { i as identity_1 } from './identity.js';

var baseExtremum = _baseExtremum,
    baseLt = _baseLt,
    identity = identity_1;

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => undefined
 */
function min(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseLt)
    : undefined;
}

var min_1 = min;

var min$1 = /*@__PURE__*/getDefaultExportFromCjs(min_1);

export { min$1 as default };
