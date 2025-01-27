'use strict';

var interval = require('./interval.js');
var duration = require('./duration.js');

const timeDay = interval.timeInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * duration.durationMinute) / duration.durationDay,
  date => date.getDate() - 1
);

timeDay.range;

const utcDay = interval.timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / duration.durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});

utcDay.range;

const unixDay = interval.timeInterval((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / duration.durationDay;
}, (date) => {
  return Math.floor(date / duration.durationDay);
});

unixDay.range;

exports.timeDay = timeDay;
exports.unixDay = unixDay;
exports.utcDay = utcDay;
