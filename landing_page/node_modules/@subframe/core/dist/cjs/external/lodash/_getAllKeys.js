'use strict';

var _baseGetAllKeys = require('./_baseGetAllKeys.js');
var _getSymbols = require('./_getSymbols.js');
var keys$1 = require('./keys.js');

var baseGetAllKeys = _baseGetAllKeys._baseGetAllKeys,
    getSymbols = _getSymbols._getSymbols,
    keys = keys$1.keys_1;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

var _getAllKeys = getAllKeys;

exports._getAllKeys = _getAllKeys;
