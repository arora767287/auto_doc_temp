'use strict';

var generateCategoricalChart = require('./generateCategoricalChart.js');
var PolarAngleAxis = require('../polar/PolarAngleAxis.js');
var PolarRadiusAxis = require('../polar/PolarRadiusAxis.js');
var PolarUtils = require('../util/PolarUtils.js');
var Pie = require('../polar/Pie.js');

/**
 * @fileOverview Pie Chart
 */
var PieChart = generateCategoricalChart.generateCategoricalChart({
  chartName: 'PieChart',
  GraphicalChild: Pie.Pie,
  validateTooltipEventTypes: ['item'],
  defaultTooltipEventType: 'item',
  legendContent: 'children',
  axisComponents: [{
    axisType: 'angleAxis',
    AxisComp: PolarAngleAxis.PolarAngleAxis
  }, {
    axisType: 'radiusAxis',
    AxisComp: PolarRadiusAxis.PolarRadiusAxis
  }],
  formatAxisMap: PolarUtils.formatAxisMap,
  defaultProps: {
    layout: 'centric',
    startAngle: 0,
    endAngle: 360,
    cx: '50%',
    cy: '50%',
    innerRadius: 0,
    outerRadius: '80%'
  }
});

exports.PieChart = PieChart;
