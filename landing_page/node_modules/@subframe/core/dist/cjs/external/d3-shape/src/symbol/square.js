'use strict';

var math = require('../math.js');

var symbolSquare = {
  draw(context, size) {
    const w = math.sqrt(size);
    const x = -w / 2;
    context.rect(x, x, w, w);
  }
};

module.exports = symbolSquare;
