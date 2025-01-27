'use strict';

function constant(x) {
  return function constant() {
    return x;
  };
}

module.exports = constant;
