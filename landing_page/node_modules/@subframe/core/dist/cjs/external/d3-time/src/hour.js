'use strict';

var interval = require('./interval.js');
var duration = require('./duration.js');

const timeHour = interval.timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * duration.durationSecond - date.getMinutes() * duration.durationMinute);
}, (date, step) => {
  date.setTime(+date + step * duration.durationHour);
}, (start, end) => {
  return (end - start) / duration.durationHour;
}, (date) => {
  return date.getHours();
});

timeHour.range;

const utcHour = interval.timeInterval((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * duration.durationHour);
}, (start, end) => {
  return (end - start) / duration.durationHour;
}, (date) => {
  return date.getUTCHours();
});

utcHour.range;

exports.timeHour = timeHour;
exports.utcHour = utcHour;
