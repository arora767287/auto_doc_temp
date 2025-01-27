'use strict';

var math = require('../math.js');

const ka = 0.89081309152928522810;
const kr = math.sin(math.pi / 10) / math.sin(7 * math.pi / 10);
const kx = math.sin(math.tau / 10) * kr;
const ky = -math.cos(math.tau / 10) * kr;

var symbolStar = {
  draw(context, size) {
    const r = math.sqrt(size * ka);
    const x = kx * r;
    const y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (let i = 1; i < 5; ++i) {
      const a = math.tau * i / 5;
      const c = math.cos(a);
      const s = math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

module.exports = symbolStar;
