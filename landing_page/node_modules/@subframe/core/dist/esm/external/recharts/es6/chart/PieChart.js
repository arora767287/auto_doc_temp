import { generateCategoricalChart } from './generateCategoricalChart.js';
import { PolarAngleAxis } from '../polar/PolarAngleAxis.js';
import { PolarRadiusAxis } from '../polar/PolarRadiusAxis.js';
import { formatAxisMap } from '../util/PolarUtils.js';
import { Pie } from '../polar/Pie.js';

/**
 * @fileOverview Pie Chart
 */
var PieChart = generateCategoricalChart({
  chartName: 'PieChart',
  GraphicalChild: Pie,
  validateTooltipEventTypes: ['item'],
  defaultTooltipEventType: 'item',
  legendContent: 'children',
  axisComponents: [{
    axisType: 'angleAxis',
    AxisComp: PolarAngleAxis
  }, {
    axisType: 'radiusAxis',
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap: formatAxisMap,
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

export { PieChart };
