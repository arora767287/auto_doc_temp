'use strict';

var color$1 = require('./color.js');
var color = require('../../d3-color/src/color.js');

var rgb = (function rgbGamma(y) {
  var color$2 = color$1.gamma(y);

  function rgb(start, end) {
    var r = color$2((start = color.rgb(start)).r, (end = color.rgb(end)).r),
        g = color$2(start.g, end.g),
        b = color$2(start.b, end.b),
        opacity = color$1.default(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

module.exports = rgb;
