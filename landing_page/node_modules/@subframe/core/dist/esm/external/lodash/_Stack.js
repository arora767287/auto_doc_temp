import { _ as _ListCache } from './_ListCache.js';
import { _ as _stackClear } from './_stackClear.js';
import { _ as _stackDelete } from './_stackDelete.js';
import { _ as _stackGet } from './_stackGet.js';
import { _ as _stackHas } from './_stackHas.js';
import { _ as _stackSet } from './_stackSet.js';

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

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

export { _Stack as _ };
