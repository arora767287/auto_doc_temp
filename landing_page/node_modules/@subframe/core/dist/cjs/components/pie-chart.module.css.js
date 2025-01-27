'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = "/* Light *//* Dark */\n\n.pie-chart-module_pie__qoCh- {\n  outline: none;\n  stroke: #FFFFFF;\n}\n\n.pie-chart-module_pie__qoCh-.pie-chart-module_dark__yBBON {\n  stroke: #151718;\n}\n";
var styles = {"colors":"\"../utilities/colors.module.css\"","light-stroke":"#FFFFFF","dark-stroke":"#151718","pie":"pie-chart-module_pie__qoCh-","dark":"pie-chart-module_dark__yBBON"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
