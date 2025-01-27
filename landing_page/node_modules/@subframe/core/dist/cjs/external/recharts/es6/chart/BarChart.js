'use strict';

var generateCategoricalChart = require('./generateCategoricalChart.js');
var Bar = require('../cartesian/Bar.js');
var XAxis = require('../cartesian/XAxis.js');
var YAxis = require('../cartesian/YAxis.js');
var CartesianUtils = require('../util/CartesianUtils.js');

/**
 * @fileOverview Bar Chart
 */
var BarChart = generateCategoricalChart.generateCategoricalChart({
  chartName: 'BarChart',
  GraphicalChild: Bar.Bar,
  defaultTooltipEventType: 'axis',
  validateTooltipEventTypes: ['axis', 'item'],
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: XAxis.XAxis
  }, {
    axisType: 'yAxis',
    AxisComp: YAxis.YAxis
  }],
  formatAxisMap: CartesianUtils.formatAxisMap
});

exports.BarChart = BarChart;
