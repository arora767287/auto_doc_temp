import { _ as _Hash } from './_Hash.js';
import { _ as _ListCache } from './_ListCache.js';
import { _ as _Map } from './_Map.js';

var Hash = _Hash,
    ListCache = _ListCache,
    Map = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear;

export { _mapCacheClear as _ };
