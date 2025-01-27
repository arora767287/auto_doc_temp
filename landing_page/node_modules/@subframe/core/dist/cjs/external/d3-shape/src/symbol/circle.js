'use strict';

var math = require('../math.js');

var symbolCircle = {
  draw(context, size) {
    const r = math.sqrt(size / math.pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, math.tau);
  }
};

module.exports = symbolCircle;
