import exponent from './exponent.js';

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

export { precisionFixed as default };
