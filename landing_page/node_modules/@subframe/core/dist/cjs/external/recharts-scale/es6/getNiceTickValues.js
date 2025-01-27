'use strict';

var decimal = require('../../decimal.js-light/decimal.js');
var utils = require('./util/utils.js');
var arithmetic = require('./util/arithmetic.js');

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * Calculate a interval of a minimum value and a maximum value
 *
 * @param  {Number} min       The minimum value
 * @param  {Number} max       The maximum value
 * @return {Array} An interval
 */

function getValidInterval(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      min = _ref2[0],
      max = _ref2[1];

  var validMin = min,
      validMax = max; // exchange

  if (min > max) {
    validMin = max;
    validMax = min;
  }

  return [validMin, validMax];
}
/**
 * Calculate the step which is easy to understand between ticks, like 10, 20, 25
 *
 * @param  {Decimal} roughStep        The rough step calculated by deviding the
 * difference by the tickCount
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Integer} correctionFactor A correction factor
 * @return {Decimal} The step which is easy to understand between two ticks
 */


function getFormatStep(roughStep, allowDecimals, correctionFactor) {
  if (roughStep.lte(0)) {
    return new decimal.default(0);
  }

  var digitCount = arithmetic.getDigitCount(roughStep.toNumber()); // The ratio between the rough step and the smallest number which has a bigger
  // order of magnitudes than the rough step

  var digitCountValue = new decimal.default(10).pow(digitCount);
  var stepRatio = roughStep.div(digitCountValue); // When an integer and a float multiplied, the accuracy of result may be wrong

  var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
  var amendStepRatio = new decimal.default(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? formatStep : new decimal.default(Math.ceil(formatStep));
}
/**
 * calculate the ticks when the minimum value equals to the maximum value
 *
 * @param  {Number}  value         The minimum valuue which is also the maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}                 ticks
 */


function getTickOfSingleValue(value, tickCount, allowDecimals) {
  var step = 1; // calculate the middle value of ticks

  var middle = new decimal.default(value);

  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);

    if (absVal < 1) {
      // The step should be a float number when the difference is smaller than 1
      step = new decimal.default(10).pow(arithmetic.getDigitCount(value) - 1);
      middle = new decimal.default(Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      // Return the maximum integer which is smaller than 'value' when 'value' is greater than 1
      middle = new decimal.default(Math.floor(value));
    }
  } else if (value === 0) {
    middle = new decimal.default(Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new decimal.default(Math.floor(value));
  }

  var middleIndex = Math.floor((tickCount - 1) / 2);
  var fn = utils.compose(utils.map(function (n) {
    return middle.add(new decimal.default(n - middleIndex).mul(step)).toNumber();
  }), utils.range);
  return fn(0, tickCount);
}
/**
 * Calculate the step
 *
 * @param  {Number}  min              The minimum value of an interval
 * @param  {Number}  max              The maximum value of an interval
 * @param  {Integer} tickCount        The count of ticks
 * @param  {Boolean} allowDecimals    Allow the ticks to be decimals or not
 * @param  {Number}  correctionFactor A correction factor
 * @return {Object}  The step, minimum value of ticks, maximum value of ticks
 */


function calculateStep(min, max, tickCount, allowDecimals) {
  var correctionFactor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  // dirty hack (for recharts' test)
  if (!Number.isFinite((max - min) / (tickCount - 1))) {
    return {
      step: new decimal.default(0),
      tickMin: new decimal.default(0),
      tickMax: new decimal.default(0)
    };
  } // The step which is easy to understand between two ticks


  var step = getFormatStep(new decimal.default(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor); // A medial value of ticks

  var middle; // When 0 is inside the interval, 0 should be a tick

  if (min <= 0 && max >= 0) {
    middle = new decimal.default(0);
  } else {
    // calculate the middle value
    middle = new decimal.default(min).add(max).div(2); // minus modulo value

    middle = middle.sub(new decimal.default(middle).mod(step));
  }

  var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
  var upCount = Math.ceil(new decimal.default(max).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;

  if (scaleCount > tickCount) {
    // When more ticks need to cover the interval, step should be bigger.
    return calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1);
  }

  if (scaleCount < tickCount) {
    // When less ticks can cover the interval, we should add some additional ticks
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }

  return {
    step: step,
    tickMin: middle.sub(new decimal.default(belowCount).mul(step)),
    tickMax: middle.add(new decimal.default(upCount).mul(step))
  };
}
/**
 * Calculate the ticks of an interval, the count of ticks will be guraranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */


function getNiceTickValuesFn(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      min = _ref4[0],
      max = _ref4[1];

  var tickCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  var allowDecimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // More than two ticks should be return
  var count = Math.max(tickCount, 2);

  var _getValidInterval = getValidInterval([min, max]),
      _getValidInterval2 = _slicedToArray(_getValidInterval, 2),
      cormin = _getValidInterval2[0],
      cormax = _getValidInterval2[1];

  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin].concat(_toConsumableArray(utils.range(0, tickCount - 1).map(function () {
      return Infinity;
    }))) : [].concat(_toConsumableArray(utils.range(0, tickCount - 1).map(function () {
      return -Infinity;
    })), [cormax]);

    return min > max ? utils.reverse(_values) : _values;
  }

  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  } // Get the step between two ticks


  var _calculateStep = calculateStep(cormin, cormax, count, allowDecimals),
      step = _calculateStep.step,
      tickMin = _calculateStep.tickMin,
      tickMax = _calculateStep.tickMax;

  var values = arithmetic.rangeStep(tickMin, tickMax.add(new decimal.default(0.1).mul(step)), step);
  return min > max ? utils.reverse(values) : values;
}
/**
 * Calculate the ticks of an interval, the count of ticks won't be guraranteed,
 * but the domain will be guaranteed
 *
 * @param  {Number}  min, max      min: The minimum value, max: The maximum value
 * @param  {Integer} tickCount     The count of ticks
 * @param  {Boolean} allowDecimals Allow the ticks to be decimals or not
 * @return {Array}   ticks
 */


function getTickValuesFixedDomainFn(_ref7, tickCount) {
  var _ref8 = _slicedToArray(_ref7, 2),
      min = _ref8[0],
      max = _ref8[1];

  var allowDecimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  // More than two ticks should be return
  var _getValidInterval5 = getValidInterval([min, max]),
      _getValidInterval6 = _slicedToArray(_getValidInterval5, 2),
      cormin = _getValidInterval6[0],
      cormax = _getValidInterval6[1];

  if (cormin === -Infinity || cormax === Infinity) {
    return [min, max];
  }

  if (cormin === cormax) {
    return [cormin];
  }

  var count = Math.max(tickCount, 2);
  var step = getFormatStep(new decimal.default(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
  var values = [].concat(_toConsumableArray(arithmetic.rangeStep(new decimal.default(cormin), new decimal.default(cormax).sub(new decimal.default(0.99).mul(step)), step)), [cormax]);
  return min > max ? utils.reverse(values) : values;
}

var getNiceTickValues = utils.memoize(getNiceTickValuesFn);
var getTickValuesFixedDomain = utils.memoize(getTickValuesFixedDomainFn);

exports.getNiceTickValues = getNiceTickValues;
exports.getTickValuesFixedDomain = getTickValuesFixedDomain;
