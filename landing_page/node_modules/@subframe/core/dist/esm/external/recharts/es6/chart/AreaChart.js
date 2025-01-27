import { generateCategoricalChart } from './generateCategoricalChart.js';
import { Area } from '../cartesian/Area.js';
import { XAxis } from '../cartesian/XAxis.js';
import { YAxis } from '../cartesian/YAxis.js';
import { formatAxisMap } from '../util/CartesianUtils.js';

/**
 * @fileOverview Area Chart
 */
var AreaChart = generateCategoricalChart({
  chartName: 'AreaChart',
  GraphicalChild: Area,
  axisComponents: [{
    axisType: 'xAxis',
    AxisComp: XAxis
  }, {
    axisType: 'yAxis',
    AxisComp: YAxis
  }],
  formatAxisMap: formatAxisMap
});

export { AreaChart };
