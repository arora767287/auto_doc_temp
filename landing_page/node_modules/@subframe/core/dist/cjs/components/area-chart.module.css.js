'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = "/* Light *//* Dark */\n\n.area-chart-module_dot__6LcgM {\n  stroke: #FFFFFF;\n}\n\n.area-chart-module_dot__6LcgM.area-chart-module_dark__9Vxa7 {\n  stroke: #151718;\n}\n";
var styles = {"colors":"\"../utilities/colors.module.css\"","light-background":"#FFFFFF","dark-background":"#151718","dot":"area-chart-module_dot__6LcgM","dark":"area-chart-module_dark__9Vxa7"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
