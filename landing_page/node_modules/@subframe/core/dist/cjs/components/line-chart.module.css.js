'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = "/* Light *//* Dark */\n\n.line-chart-module_dot__LSZ2G {\n  stroke: #FFFFFF;\n}\n\n.line-chart-module_dot__LSZ2G.line-chart-module_dark__4sBo6 {\n  stroke: #151718;\n}\n";
var styles = {"colors":"\"../utilities/colors.module.css\"","light-background":"#FFFFFF","dark-background":"#151718","dot":"line-chart-module_dot__LSZ2G","dark":"line-chart-module_dark__4sBo6"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
