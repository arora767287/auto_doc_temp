'use strict';

var _baseTimes = require('./_baseTimes.js');
var isArguments$1 = require('./isArguments.js');
var isArray$1 = require('./isArray.js');
var isBuffer$1 = require('./isBuffer.js');
var _isIndex = require('./_isIndex.js');
var isTypedArray$1 = require('./isTypedArray.js');

var baseTimes = _baseTimes._baseTimes,
    isArguments = isArguments$1.isArguments_1,
    isArray = isArray$1.isArray_1,
    isBuffer = isBuffer$1.isBufferExports,
    isIndex = _isIndex._isIndex,
    isTypedArray = isTypedArray$1.isTypedArray_1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

exports._arrayLikeKeys = _arrayLikeKeys;
