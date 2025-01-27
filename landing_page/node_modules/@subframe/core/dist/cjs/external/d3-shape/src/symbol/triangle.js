'use strict';

var math = require('../math.js');

const sqrt3 = math.sqrt(3);

var symbolTriangle = {
  draw(context, size) {
    const y = -math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

module.exports = symbolTriangle;
