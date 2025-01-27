'use strict';

var generateCategoricalChart = require('./generateCategoricalChart.js');
var Area = require('../cartesian/Area.js');
var XAxis = require('../cartesian/XAxis.js');
var YAxis = require('../cartesian/YAxis.js');
var CartesianUtils = require('../util/CartesianUtils.js');

/**
 * @fileOverview Area Chart
 */
var AreaChart = generateCategoricalChart.generateCategoricalChart({
  chartName: 'AreaChart',
  GraphicalChild: Area.Area,
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: XAxis.XAxis
  }, {
    axisType: 'yAxis',
    AxisComp: YAxis.YAxis
  }],
  formatAxisMap: CartesianUtils.formatAxisMap
});

exports.AreaChart = AreaChart;
