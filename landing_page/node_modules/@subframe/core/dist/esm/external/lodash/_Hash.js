import { _ as _hashClear } from './_hashClear.js';
import { _ as _hashDelete } from './_hashDelete.js';
import { _ as _hashGet } from './_hashGet.js';
import { _ as _hashHas } from './_hashHas.js';
import { _ as _hashSet } from './_hashSet.js';

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

var _Hash = Hash;

export { _Hash as _ };
