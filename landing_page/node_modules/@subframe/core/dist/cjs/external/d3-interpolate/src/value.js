'use strict';

var rgb = require('./rgb.js');
var array = require('./array.js');
var date = require('./date.js');
var number = require('./number.js');
var object = require('./object.js');
var string = require('./string.js');
var constant = require('./constant.js');
var numberArray = require('./numberArray.js');
var color = require('../../d3-color/src/color.js');

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = color.default(b)) ? (b = c, rgb) : string)
      : b instanceof color.default ? rgb
      : b instanceof Date ? date
      : numberArray.isNumberArray(b) ? numberArray.default
      : Array.isArray(b) ? array.genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
}

module.exports = interpolate;
