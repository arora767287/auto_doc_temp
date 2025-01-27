'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = ".switch-module_thumb__WE8-0 {\n  position: relative;\n  left: 0%;\n  transition: left cubic-bezier(0.4, 0, 0.2, 1) 120ms, transform cubic-bezier(0.4, 0, 0.2, 1) 120ms;\n}\n\n.switch-module_thumb__WE8-0[data-state=\"checked\"] {\n  left: 100%;\n  transform: translateX(-100%);\n}\n";
var styles = {"thumb":"switch-module_thumb__WE8-0"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
