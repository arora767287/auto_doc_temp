'use strict';

var _hashClear = require('./_hashClear.js');
var _hashDelete = require('./_hashDelete.js');
var _hashGet = require('./_hashGet.js');
var _hashHas = require('./_hashHas.js');
var _hashSet = require('./_hashSet.js');

var hashClear = _hashClear._hashClear,
    hashDelete = _hashDelete._hashDelete,
    hashGet = _hashGet._hashGet,
    hashHas = _hashHas._hashHas,
    hashSet = _hashSet._hashSet;

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

exports._Hash = _Hash;
