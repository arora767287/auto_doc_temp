import { _ as _assocIndexOf } from './_assocIndexOf.js';

var assocIndexOf = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

export { _listCacheHas as _ };
