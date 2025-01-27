import { _ as _getMapData } from './_getMapData.js';

var getMapData = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

export { _mapCacheGet as _ };
