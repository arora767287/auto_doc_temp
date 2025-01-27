'use strict';

// packages/core/number/src/number.ts
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}

exports.clamp = clamp;
