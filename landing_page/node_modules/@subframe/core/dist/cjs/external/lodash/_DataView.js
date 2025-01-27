'use strict';

var _getNative = require('./_getNative.js');
var _root = require('./_root.js');

var getNative = _getNative._getNative,
    root = _root._root;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

var _DataView = DataView;

exports._DataView = _DataView;
