'use strict';

var _ListCache = require('./_ListCache.js');
var _stackClear = require('./_stackClear.js');
var _stackDelete = require('./_stackDelete.js');
var _stackGet = require('./_stackGet.js');
var _stackHas = require('./_stackHas.js');
var _stackSet = require('./_stackSet.js');

var ListCache = _ListCache._ListCache,
    stackClear = _stackClear._stackClear,
    stackDelete = _stackDelete._stackDelete,
    stackGet = _stackGet._stackGet,
    stackHas = _stackHas._stackHas,
    stackSet = _stackSet._stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var _Stack = Stack;

exports._Stack = _Stack;
