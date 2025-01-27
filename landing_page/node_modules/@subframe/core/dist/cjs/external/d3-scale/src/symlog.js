'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var linear = require('./linear.js');
var continuous = require('./continuous.js');
var init = require('./init.js');

function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return linear.linearish(scale);
}

function symlog() {
  var scale = symlogish(continuous.transformer());

  scale.copy = function() {
    return continuous.copy(scale, symlog()).constant(scale.constant());
  };

  return init.initRange.apply(scale, arguments);
}

exports.default = symlog;
exports.symlogish = symlogish;
