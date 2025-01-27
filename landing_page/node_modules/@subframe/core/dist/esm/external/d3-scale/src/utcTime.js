import { calendar } from './time.js';
import { initRange } from './init.js';
import { utcFormat } from '../../d3-time-format/src/defaultLocale.js';
import { second } from '../../d3-time/src/second.js';
import { utcMinute } from '../../d3-time/src/minute.js';
import { utcHour } from '../../d3-time/src/hour.js';
import { utcDay } from '../../d3-time/src/day.js';
import { utcSunday } from '../../d3-time/src/week.js';
import { utcMonth } from '../../d3-time/src/month.js';
import { utcYear } from '../../d3-time/src/year.js';
import { utcTickInterval, utcTicks } from '../../d3-time/src/ticks.js';

function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

export { utcTime as default };
