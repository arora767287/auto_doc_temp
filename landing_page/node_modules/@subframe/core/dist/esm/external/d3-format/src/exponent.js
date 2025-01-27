import { formatDecimalParts } from './formatDecimal.js';

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

export { exponent as default };
