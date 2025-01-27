'use strict';

var ticks = require('../../d3-array/src/ticks.js');
var formatSpecifier = require('../../d3-format/src/formatSpecifier.js');
var precisionFixed = require('../../d3-format/src/precisionFixed.js');
var precisionRound = require('../../d3-format/src/precisionRound.js');
var precisionPrefix = require('../../d3-format/src/precisionPrefix.js');
var defaultLocale = require('../../d3-format/src/defaultLocale.js');

function tickFormat(start, stop, count, specifier) {
  var step = ticks.tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier.default(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return defaultLocale.formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return defaultLocale.format(specifier);
}

module.exports = tickFormat;
