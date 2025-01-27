'use strict';

var interval = require('./interval.js');
var duration = require('./duration.js');

const timeMinute = interval.timeInterval((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * duration.durationSecond);
}, (date, step) => {
  date.setTime(+date + step * duration.durationMinute);
}, (start, end) => {
  return (end - start) / duration.durationMinute;
}, (date) => {
  return date.getMinutes();
});

timeMinute.range;

const utcMinute = interval.timeInterval((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * duration.durationMinute);
}, (start, end) => {
  return (end - start) / duration.durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});

utcMinute.range;

exports.timeMinute = timeMinute;
exports.utcMinute = utcMinute;
