'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = "/* Taken from https://www.radix-ui.com/docs/primitives/components/progress */\n\n.progress-module_root__Jm75E {\n  overflow: hidden;\n  /* Fix overflow clipping in Safari\n  https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */\n  transform: translateZ(0);\n}\n\n.progress-module_indicator__gcaq3 {\n  height: 100%;\n  width: 100%;\n  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1) 0s;\n}\n";
var styles = {"root":"progress-module_root__Jm75E","indicator":"progress-module_indicator__gcaq3"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
