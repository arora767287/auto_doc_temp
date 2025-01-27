'use strict';

var _MapCache = require('./_MapCache.js');
var _setCacheAdd = require('./_setCacheAdd.js');
var _setCacheHas = require('./_setCacheHas.js');

var MapCache = _MapCache._MapCache,
    setCacheAdd = _setCacheAdd._setCacheAdd,
    setCacheHas = _setCacheHas._setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

var _SetCache = SetCache;

exports._SetCache = _SetCache;
