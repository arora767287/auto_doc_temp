'use strict';

var PolarUtils = require('../PolarUtils.js');

/**
 * Only applicable for radial layouts
 * @param {Object} activeCoordinate ChartCoordinate
 * @returns {Object} RadialCursorPoints
 */
function getRadialCursorPoints(activeCoordinate) {
  var cx = activeCoordinate.cx,
    cy = activeCoordinate.cy,
    radius = activeCoordinate.radius,
    startAngle = activeCoordinate.startAngle,
    endAngle = activeCoordinate.endAngle;
  var startPoint = PolarUtils.polarToCartesian(cx, cy, radius, startAngle);
  var endPoint = PolarUtils.polarToCartesian(cx, cy, radius, endAngle);
  return {
    points: [startPoint, endPoint],
    cx: cx,
    cy: cy,
    radius: radius,
    startAngle: startAngle,
    endAngle: endAngle
  };
}

exports.getRadialCursorPoints = getRadialCursorPoints;
