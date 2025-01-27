'use strict';

var duration = require('./duration.js');
var millisecond = require('./millisecond.js');
var second = require('./second.js');
var minute = require('./minute.js');
var hour = require('./hour.js');
var day = require('./day.js');
var week = require('./week.js');
var month = require('./month.js');
var year = require('./year.js');
var bisector = require('../../d3-array/src/bisector.js');
var ticks = require('../../d3-array/src/ticks.js');

function ticker(year, month, week, day, hour, minute) {

  const tickIntervals = [
    [second.second,  1,      duration.durationSecond],
    [second.second,  5,  5 * duration.durationSecond],
    [second.second, 15, 15 * duration.durationSecond],
    [second.second, 30, 30 * duration.durationSecond],
    [minute,  1,      duration.durationMinute],
    [minute,  5,  5 * duration.durationMinute],
    [minute, 15, 15 * duration.durationMinute],
    [minute, 30, 30 * duration.durationMinute],
    [  hour,  1,      duration.durationHour  ],
    [  hour,  3,  3 * duration.durationHour  ],
    [  hour,  6,  6 * duration.durationHour  ],
    [  hour, 12, 12 * duration.durationHour  ],
    [   day,  1,      duration.durationDay   ],
    [   day,  2,  2 * duration.durationDay   ],
    [  week,  1,      duration.durationWeek  ],
    [ month,  1,      duration.durationMonth ],
    [ month,  3,  3 * duration.durationMonth ],
    [  year,  1,      duration.durationYear  ]
  ];

  function ticks$1(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }

  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(ticks.tickStep(start / duration.durationYear, stop / duration.durationYear, count));
    if (i === 0) return millisecond.millisecond.every(Math.max(ticks.tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [ticks$1, tickInterval];
}

const [utcTicks, utcTickInterval] = ticker(year.utcYear, month.utcMonth, week.utcSunday, day.unixDay, hour.utcHour, minute.utcMinute);
const [timeTicks, timeTickInterval] = ticker(year.timeYear, month.timeMonth, week.timeSunday, day.timeDay, hour.timeHour, minute.timeMinute);

exports.timeTickInterval = timeTickInterval;
exports.timeTicks = timeTicks;
exports.utcTickInterval = utcTickInterval;
exports.utcTicks = utcTicks;
