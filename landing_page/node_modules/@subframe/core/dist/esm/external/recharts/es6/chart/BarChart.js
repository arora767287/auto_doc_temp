import { generateCategoricalChart } from './generateCategoricalChart.js';
import { Bar } from '../cartesian/Bar.js';
import { XAxis } from '../cartesian/XAxis.js';
import { YAxis } from '../cartesian/YAxis.js';
import { formatAxisMap } from '../util/CartesianUtils.js';

/**
 * @fileOverview Bar Chart
 */
var BarChart = generateCategoricalChart({
  chartName: 'BarChart',
  GraphicalChild: Bar,
  defaultTooltipEventType: 'axis',
  validateTooltipEventTypes: ['axis', 'item'],
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: XAxis
  }, {
    axisType: 'yAxis',
    AxisComp: YAxis
  }],
  formatAxisMap: formatAxisMap
});

export { BarChart };
