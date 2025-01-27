'use strict';

var isString = require('../../../lodash/isString.js');
var isNaN = require('../../../lodash/isNaN.js');
var get = require('../../../lodash/get.js');
var isNumber$1 = require('../../../lodash/isNumber.js');

var mathSign = function mathSign(value) {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }
  return -1;
};
var isPercent = function isPercent(value) {
  return isString(value) && value.indexOf('%') === value.length - 1;
};
var isNumber = function isNumber(value) {
  return isNumber$1.default(value) && !isNaN(value);
};
var isNumOrStr = function isNumOrStr(value) {
  return isNumber(value) || isString(value);
};
var idCounter = 0;
var uniqueId = function uniqueId(prefix) {
  var id = ++idCounter;
  return "".concat(prefix || '').concat(id);
};

/**
 * Get percent value of a total value
 * @param {number|string} percent A percent
 * @param {number} totalValue     Total value
 * @param {number} defaultValue   The value returned when percent is undefined or invalid
 * @param {boolean} validate      If set to be true, the result will be validated
 * @return {number} value
 */
var getPercentValue = function getPercentValue(percent, totalValue) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var validate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!isNumber(percent) && !isString(percent)) {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    var index = percent.indexOf('%');
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if (isNaN(value)) {
    value = defaultValue;
  }
  if (validate && value > totalValue) {
    value = totalValue;
  }
  return value;
};
var getAnyElementOfObject = function getAnyElementOfObject(obj) {
  if (!obj) {
    return null;
  }
  var keys = Object.keys(obj);
  if (keys && keys.length) {
    return obj[keys[0]];
  }
  return null;
};
var hasDuplicate = function hasDuplicate(ary) {
  if (!Array.isArray(ary)) {
    return false;
  }
  var len = ary.length;
  var cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = true;
    } else {
      return true;
    }
  }
  return false;
};

/* @todo consider to rename this function into `getInterpolator` */
var interpolateNumber = function interpolateNumber(numberA, numberB) {
  if (isNumber(numberA) && isNumber(numberB)) {
    return function (t) {
      return numberA + t * (numberB - numberA);
    };
  }
  return function () {
    return numberB;
  };
};
function findEntryInArray(ary, specifiedKey, specifiedValue) {
  if (!ary || !ary.length) {
    return null;
  }
  return ary.find(function (entry) {
    return entry && (typeof specifiedKey === 'function' ? specifiedKey(entry) : get.default(entry, specifiedKey)) === specifiedValue;
  });
}

exports.findEntryInArray = findEntryInArray;
exports.getAnyElementOfObject = getAnyElementOfObject;
exports.getPercentValue = getPercentValue;
exports.hasDuplicate = hasDuplicate;
exports.interpolateNumber = interpolateNumber;
exports.isNumOrStr = isNumOrStr;
exports.isNumber = isNumber;
exports.isPercent = isPercent;
exports.mathSign = mathSign;
exports.uniqueId = uniqueId;
