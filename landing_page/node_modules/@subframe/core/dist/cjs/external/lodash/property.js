'use strict';

var _baseProperty = require('./_baseProperty.js');
var _basePropertyDeep = require('./_basePropertyDeep.js');
var _isKey = require('./_isKey.js');
var _toKey = require('./_toKey.js');

var baseProperty = _baseProperty._baseProperty,
    basePropertyDeep = _basePropertyDeep._basePropertyDeep,
    isKey = _isKey._isKey,
    toKey = _toKey._toKey;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

var property_1 = property;

exports.property_1 = property_1;
