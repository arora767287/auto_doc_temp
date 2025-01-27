'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var linear = require('./linear.js');
var continuous = require('./continuous.js');
var init = require('./init.js');

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(continuous.identity, continuous.identity),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(continuous.identity, continuous.identity)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linear.linearish(scale);
}

function pow() {
  var scale = powish(continuous.transformer());

  scale.copy = function() {
    return continuous.copy(scale, pow()).exponent(scale.exponent());
  };

  init.initRange.apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}

exports.default = pow;
exports.powish = powish;
exports.sqrt = sqrt;
