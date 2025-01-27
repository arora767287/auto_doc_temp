import { c as constant_1 } from './constant.js';
import { _ as _defineProperty } from './_defineProperty.js';
import { i as identity_1 } from './identity.js';

var constant = constant_1,
    defineProperty = _defineProperty,
    identity = identity_1;

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

export { _baseSetToString as _ };
