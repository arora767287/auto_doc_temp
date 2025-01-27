import { _ as _getMapData } from './_getMapData.js';

var getMapData = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

export { _mapCacheHas as _ };
