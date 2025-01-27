'use strict';

var CartesianUtils = require('./CartesianUtils.js');
var getEveryNthWithCondition = require('./getEveryNthWithCondition.js');

function getAngledTickWidth(contentSize, unitSize, angle) {
  var size = {
    width: contentSize.width + unitSize.width,
    height: contentSize.height + unitSize.height
  };
  return CartesianUtils.getAngledRectangleWidth(size, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
  var isWidth = sizeKey === 'width';
  var x = viewBox.x,
    y = viewBox.y,
    width = viewBox.width,
    height = viewBox.height;
  if (sign === 1) {
    return {
      start: isWidth ? x : y,
      end: isWidth ? x + width : y + height
    };
  }
  return {
    start: isWidth ? x + width : y + height,
    end: isWidth ? x : y
  };
}
function isVisible(sign, tickPosition, getSize, start, end) {
  /* Since getSize() is expensive (it reads the ticks' size from the DOM), we do this check first to avoid calculating
   * the tick's size. */
  if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) {
    return false;
  }
  var size = getSize();
  return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
  return getEveryNthWithCondition.getEveryNthWithCondition(ticks, interval + 1);
}

exports.getAngledTickWidth = getAngledTickWidth;
exports.getNumberIntervalTicks = getNumberIntervalTicks;
exports.getTickBoundaries = getTickBoundaries;
exports.isVisible = isVisible;
