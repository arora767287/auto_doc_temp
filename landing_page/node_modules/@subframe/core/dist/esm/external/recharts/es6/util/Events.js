import EventEmitter from '../../../eventemitter3/index.js';

var eventCenter = new EventEmitter();
var SYNC_EVENT = 'recharts.syncMouseEvents';

export { SYNC_EVENT, eventCenter };
