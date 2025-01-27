'use strict';

var index = require('../../../eventemitter3/index.js');

var eventCenter = new index();
var SYNC_EVENT = 'recharts.syncMouseEvents';

exports.SYNC_EVENT = SYNC_EVENT;
exports.eventCenter = eventCenter;
