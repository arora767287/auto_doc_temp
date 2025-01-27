'use strict';

var _freeGlobal = require('./_freeGlobal.js');

var freeGlobal = _freeGlobal._freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

var _root = root;

exports._root = _root;
