'use strict';

var _mapCacheClear = require('./_mapCacheClear.js');
var _mapCacheDelete = require('./_mapCacheDelete.js');
var _mapCacheGet = require('./_mapCacheGet.js');
var _mapCacheHas = require('./_mapCacheHas.js');
var _mapCacheSet = require('./_mapCacheSet.js');

var mapCacheClear = _mapCacheClear._mapCacheClear,
    mapCacheDelete = _mapCacheDelete._mapCacheDelete,
    mapCacheGet = _mapCacheGet._mapCacheGet,
    mapCacheHas = _mapCacheHas._mapCacheHas,
    mapCacheSet = _mapCacheSet._mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

var _MapCache = MapCache;

exports._MapCache = _MapCache;
