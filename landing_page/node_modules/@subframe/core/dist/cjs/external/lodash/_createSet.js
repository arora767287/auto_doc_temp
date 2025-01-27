'use strict';

var _Set = require('./_Set.js');
var noop$1 = require('./noop.js');
var _setToArray = require('./_setToArray.js');

var Set = _Set._Set,
    noop = noop$1.noop_1,
    setToArray = _setToArray._setToArray;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

var _createSet = createSet;

exports._createSet = _createSet;
