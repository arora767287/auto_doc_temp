'use strict';

var _Symbol = require('./_Symbol.js');
var _getRawTag = require('./_getRawTag.js');
var _objectToString = require('./_objectToString.js');

var Symbol = _Symbol._Symbol,
    getRawTag = _getRawTag._getRawTag,
    objectToString = _objectToString._objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag;

exports._baseGetTag = _baseGetTag;
