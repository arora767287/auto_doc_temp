'use strict';

var _getNative = require('./_getNative.js');

var getNative = _getNative._getNative;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty;

exports._defineProperty = _defineProperty;
