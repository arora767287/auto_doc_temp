'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = "/* HACK: NextJS does not always load stylesheets in a stable order; this ensures that no matter\n   which order these styles are loaded, this component has the lowest precedence. Thus this ensures adding a\n   Tailwind class will always override this style. */\n@layer {\n  .loader-module_root__-0Kak {\n    display: inline-block;\n  }\n}\n\n/* Taken from https://metajunaid.github.io/SpinBolt/ */\n.loader-module_root__-0Kak {\n  /* NOTE: color must be set by the caller */\n  height: 1em;\n  width: 1em;\n  position: relative;\n  border: 0.2em solid;\n  border-radius: 50%;\n  border-top-color: transparent;\n  animation: loader-module_rotate__pyoeU 1s linear infinite;\n  flex: 0 0 auto;\n}\n\n@keyframes loader-module_rotate__pyoeU {\n  0% {\n    transform: rotate(0);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n";
var styles = {"root":"loader-module_root__-0Kak","rotate":"loader-module_rotate__pyoeU"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
