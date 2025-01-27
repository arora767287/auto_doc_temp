import { _ as _getNative } from './_getNative.js';

var getNative = _getNative;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty;

export { _defineProperty as _ };
