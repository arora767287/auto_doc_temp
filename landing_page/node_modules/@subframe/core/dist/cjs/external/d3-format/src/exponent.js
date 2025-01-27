'use strict';

var formatDecimal = require('./formatDecimal.js');

function exponent(x) {
  return x = formatDecimal.formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

module.exports = exponent;
