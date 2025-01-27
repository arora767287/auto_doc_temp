'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var continuous = require('./continuous.js');
var init = require('./init.js');
var linear = require('./linear.js');
var log = require('./log.js');
var sequential = require('./sequential.js');
var symlog = require('./symlog.js');
var pow = require('./pow.js');
var piecewise = require('../../d3-interpolate/src/piecewise.js');
var value = require('../../d3-interpolate/src/value.js');
var round = require('../../d3-interpolate/src/round.js');

function transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      s = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = continuous.identity,
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }

  scale.range = range(value);

  scale.rangeRound = range(round);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
    return scale;
  };
}

function diverging() {
  var scale = linear.linearish(transformer()(continuous.identity));

  scale.copy = function() {
    return sequential.copy(scale, diverging());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function divergingLog() {
  var scale = log.loggish(transformer()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return sequential.copy(scale, divergingLog()).base(scale.base());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function divergingSymlog() {
  var scale = symlog.symlogish(transformer());

  scale.copy = function() {
    return sequential.copy(scale, divergingSymlog()).constant(scale.constant());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function divergingPow() {
  var scale = pow.powish(transformer());

  scale.copy = function() {
    return sequential.copy(scale, divergingPow()).exponent(scale.exponent());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

exports.default = diverging;
exports.divergingLog = divergingLog;
exports.divergingPow = divergingPow;
exports.divergingSqrt = divergingSqrt;
exports.divergingSymlog = divergingSymlog;
