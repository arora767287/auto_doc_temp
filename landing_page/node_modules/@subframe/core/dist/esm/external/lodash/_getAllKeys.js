import { _ as _baseGetAllKeys } from './_baseGetAllKeys.js';
import { _ as _getSymbols } from './_getSymbols.js';
import { k as keys_1 } from './keys.js';

var baseGetAllKeys = _baseGetAllKeys,
    getSymbols = _getSymbols,
    keys = keys_1;

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

export { _getAllKeys as _ };
