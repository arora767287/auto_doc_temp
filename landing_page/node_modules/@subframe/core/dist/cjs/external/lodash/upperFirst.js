'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');
var _createCaseFirst = require('./_createCaseFirst.js');

var createCaseFirst = _createCaseFirst._createCaseFirst;

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

var upperFirst$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(upperFirst_1);

module.exports = upperFirst$1;
