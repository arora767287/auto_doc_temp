'use strict';

var constant$1 = require('./constant.js');
var _defineProperty = require('./_defineProperty.js');
var identity$1 = require('./identity.js');

var constant = constant$1.constant_1,
    defineProperty = _defineProperty._defineProperty,
    identity = identity$1.identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

exports._baseSetToString = _baseSetToString;
