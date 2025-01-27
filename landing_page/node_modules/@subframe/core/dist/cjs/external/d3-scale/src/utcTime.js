'use strict';

var time = require('./time.js');
var init = require('./init.js');
var defaultLocale = require('../../d3-time-format/src/defaultLocale.js');
var second = require('../../d3-time/src/second.js');
var minute = require('../../d3-time/src/minute.js');
var hour = require('../../d3-time/src/hour.js');
var day = require('../../d3-time/src/day.js');
var week = require('../../d3-time/src/week.js');
var month = require('../../d3-time/src/month.js');
var year = require('../../d3-time/src/year.js');
var ticks = require('../../d3-time/src/ticks.js');

function utcTime() {
  return init.initRange.apply(time.calendar(ticks.utcTicks, ticks.utcTickInterval, year.utcYear, month.utcMonth, week.utcSunday, day.utcDay, hour.utcHour, minute.utcMinute, second.second, defaultLocale.utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

module.exports = utcTime;
