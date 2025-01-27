'use strict';

var interval = require('./interval.js');
var duration = require('./duration.js');

const second = interval.timeInterval((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * duration.durationSecond);
}, (start, end) => {
  return (end - start) / duration.durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});

second.range;

exports.second = second;
