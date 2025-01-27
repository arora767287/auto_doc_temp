'use strict';

var _listCacheClear = require('./_listCacheClear.js');
var _listCacheDelete = require('./_listCacheDelete.js');
var _listCacheGet = require('./_listCacheGet.js');
var _listCacheHas = require('./_listCacheHas.js');
var _listCacheSet = require('./_listCacheSet.js');

var listCacheClear = _listCacheClear._listCacheClear,
    listCacheDelete = _listCacheDelete._listCacheDelete,
    listCacheGet = _listCacheGet._listCacheGet,
    listCacheHas = _listCacheHas._listCacheHas,
    listCacheSet = _listCacheSet._listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

var _ListCache = ListCache;

exports._ListCache = _ListCache;
