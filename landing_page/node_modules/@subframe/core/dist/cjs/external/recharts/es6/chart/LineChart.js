'use strict';

var generateCategoricalChart = require('./generateCategoricalChart.js');
var Line = require('../cartesian/Line.js');
var XAxis = require('../cartesian/XAxis.js');
var YAxis = require('../cartesian/YAxis.js');
var CartesianUtils = require('../util/CartesianUtils.js');

/**
 * @fileOverview Line Chart
 */
var LineChart = generateCategoricalChart.generateCategoricalChart({
  chartName: 'LineChart',
  GraphicalChild: Line.Line,
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: XAxis.XAxis
  }, {
    axisType: 'yAxis',
    AxisComp: YAxis.YAxis
  }],
  formatAxisMap: CartesianUtils.formatAxisMap
});

exports.LineChart = LineChart;
