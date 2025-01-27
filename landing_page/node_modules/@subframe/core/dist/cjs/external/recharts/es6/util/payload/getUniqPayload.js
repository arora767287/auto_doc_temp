'use strict';

var uniqBy = require('../../../../lodash/uniqBy.js');
var isFunction = require('../../../../lodash/isFunction.js');

/**
 * This is configuration option that decides how to filter for unique values only:
 *
 * - `false` means "no filter"
 * - `true` means "use recharts default filter"
 * - function means "use return of this function as the default key"
 */

function getUniqPayload(payload, option, defaultUniqBy) {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy);
  }
  if (isFunction.default(option)) {
    return uniqBy(payload, option);
  }
  return payload;
}

exports.getUniqPayload = getUniqPayload;
