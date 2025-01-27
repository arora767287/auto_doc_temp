'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var continuous = require('./continuous.js');
var init = require('./init.js');
var linear = require('./linear.js');
var log = require('./log.js');
var symlog = require('./symlog.js');
var pow = require('./pow.js');
var value = require('../../d3-interpolate/src/value.js');
var round = require('../../d3-interpolate/src/round.js');

function transformer() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = continuous.identity,
      clamp = false,
      unknown;

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  function range(interpolate) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }

  scale.range = range(value);

  scale.rangeRound = range(round);

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = linear.linearish(transformer()(continuous.identity));

  scale.copy = function() {
    return copy(scale, sequential());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function sequentialLog() {
  var scale = log.loggish(transformer()).domain([1, 10]);

  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = symlog.symlogish(transformer());

  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function sequentialPow() {
  var scale = pow.powish(transformer());

  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return init.initInterpolator.apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

exports.copy = copy;
exports.default = sequential;
exports.sequentialLog = sequentialLog;
exports.sequentialPow = sequentialPow;
exports.sequentialSqrt = sequentialSqrt;
exports.sequentialSymlog = sequentialSymlog;
