'use strict';

function constants(x) {
  return function() {
    return x;
  };
}

module.exports = constants;
