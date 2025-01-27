import { getDefaultExportFromCjs } from '../../_virtual/_commonjsHelpers.js';
import { _ as _baseExtremum } from './_baseExtremum.js';
import { _ as _baseGt } from './_baseGt.js';
import { i as identity_1 } from './identity.js';

var baseExtremum = _baseExtremum,
    baseGt = _baseGt,
    identity = identity_1;

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseGt)
    : undefined;
}

var max_1 = max;

var max$1 = /*@__PURE__*/getDefaultExportFromCjs(max_1);

export { max$1 as default };
