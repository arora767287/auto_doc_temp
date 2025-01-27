'use strict';

var exponent = require('./exponent.js');

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

module.exports = precisionRound;
