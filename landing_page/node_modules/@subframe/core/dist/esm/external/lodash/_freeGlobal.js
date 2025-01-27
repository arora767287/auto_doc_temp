import { commonjsGlobal } from '../../_virtual/_commonjsHelpers.js';

/** Detect free variable `global` from Node.js. */

var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

export { _freeGlobal as _ };
