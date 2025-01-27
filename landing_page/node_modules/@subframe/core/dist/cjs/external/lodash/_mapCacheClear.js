'use strict';

var _Hash = require('./_Hash.js');
var _ListCache = require('./_ListCache.js');
var _Map = require('./_Map.js');

var Hash = _Hash._Hash,
    ListCache = _ListCache._ListCache,
    Map = _Map._Map;

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

exports._mapCacheClear = _mapCacheClear;
