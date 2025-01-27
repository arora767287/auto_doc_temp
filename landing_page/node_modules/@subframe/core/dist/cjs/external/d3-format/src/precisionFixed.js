'use strict';

var exponent = require('./exponent.js');

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

module.exports = precisionFixed;
