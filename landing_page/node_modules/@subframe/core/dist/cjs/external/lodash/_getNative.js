'use strict';

var _baseIsNative = require('./_baseIsNative.js');
var _getValue = require('./_getValue.js');

var baseIsNative = _baseIsNative._baseIsNative,
    getValue = _getValue._getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

exports._getNative = _getNative;
