import styleInject from '../external/style-inject/dist/style-inject.es.js';

var css_248z = "/* HACK: NextJS does not always load stylesheets in a stable order; this ensures that no matter\n   which order these styles are loaded, this component has the lowest precedence. Thus this ensures adding a\n   Tailwind class will always override this style. */\n@layer {\n  .dialog-module_root__KADY5 {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n  }\n}\n";
var styles = {"root":"dialog-module_root__KADY5"};
styleInject(css_248z,{"insertAt":"top"});

export { styles as default };
