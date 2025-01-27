import { tickStep } from '../../d3-array/src/ticks.js';
import formatSpecifier from '../../d3-format/src/formatSpecifier.js';
import precisionFixed from '../../d3-format/src/precisionFixed.js';
import precisionRound from '../../d3-format/src/precisionRound.js';
import precisionPrefix from '../../d3-format/src/precisionPrefix.js';
import { formatPrefix, format } from '../../d3-format/src/defaultLocale.js';

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

export { tickFormat as default };
