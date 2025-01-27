'use strict';

var _commonjsHelpers = require('../../_virtual/_commonjsHelpers.js');

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */

function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var last_1 = last;

var last$1 = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(last_1);

module.exports = last$1;
