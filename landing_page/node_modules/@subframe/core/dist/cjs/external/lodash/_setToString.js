'use strict';

var _baseSetToString = require('./_baseSetToString.js');
var _shortOut = require('./_shortOut.js');

var baseSetToString = _baseSetToString._baseSetToString,
    shortOut = _shortOut._shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

var _setToString = setToString;

exports._setToString = _setToString;
