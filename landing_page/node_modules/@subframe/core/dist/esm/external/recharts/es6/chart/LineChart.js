import { generateCategoricalChart } from './generateCategoricalChart.js';
import { Line } from '../cartesian/Line.js';
import { XAxis } from '../cartesian/XAxis.js';
import { YAxis } from '../cartesian/YAxis.js';
import { formatAxisMap } from '../util/CartesianUtils.js';

/**
 * @fileOverview Line Chart
 */
var LineChart = generateCategoricalChart({
  chartName: 'LineChart',
  GraphicalChild: Line,
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: XAxis
  }, {
    axisType: 'yAxis',
    AxisComp: YAxis
  }],
  formatAxisMap: formatAxisMap
});

export { LineChart };
