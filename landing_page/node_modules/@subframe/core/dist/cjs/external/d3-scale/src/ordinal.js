'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var init = require('./init.js');
var index = require('../../internmap/src/index.js');

const implicit = Symbol("implicit");

function ordinal() {
  var index$1 = new index.InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index$1.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index$1.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index$1 = new index.InternMap();
    for (const value of _) {
      if (index$1.has(value)) continue;
      index$1.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  init.initRange.apply(scale, arguments);

  return scale;
}

exports.default = ordinal;
exports.implicit = implicit;
