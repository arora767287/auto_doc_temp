import { getDefaultExportFromCjs } from '../../_virtual/_commonjsHelpers.js';
import { _ as _createCaseFirst } from './_createCaseFirst.js';

var createCaseFirst = _createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

var upperFirst_1 = upperFirst;

var upperFirst$1 = /*@__PURE__*/getDefaultExportFromCjs(upperFirst_1);

export { upperFirst$1 as default };
