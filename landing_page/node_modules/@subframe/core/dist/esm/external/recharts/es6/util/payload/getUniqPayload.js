import uniqBy from '../../../../lodash/uniqBy.js';
import isFunction from '../../../../lodash/isFunction.js';

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
  if (isFunction(option)) {
    return uniqBy(payload, option);
  }
  return payload;
}

export { getUniqPayload };
