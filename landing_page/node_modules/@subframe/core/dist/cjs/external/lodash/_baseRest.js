'use strict';

var identity$1 = require('./identity.js');
var _overRest = require('./_overRest.js');
var _setToString = require('./_setToString.js');

var identity = identity$1.identity_1,
    overRest = _overRest._overRest,
    setToString = _setToString._setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

var _baseRest = baseRest;

exports._baseRest = _baseRest;
