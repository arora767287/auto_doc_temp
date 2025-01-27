import styleInject from '../external/style-inject/dist/style-inject.es.js';

var css_248z = "/* HACK: NextJS does not always load stylesheets in a stable order; this ensures that no matter\n   which order these styles are loaded, this component has the lowest precedence. Thus this ensures adding a\n   Tailwind class will always override this style. */\n@layer {\n  .fullscreen-dialog-module_root__v1C0A {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n  }\n\n  .fullscreen-dialog-module_content__C1nrV {\n    width: 100%;\n    height: 100%;\n    overflow-y: auto;\n  }\n}\n";
var styles = {"root":"fullscreen-dialog-module_root__v1C0A","content":"fullscreen-dialog-module_content__C1nrV"};
styleInject(css_248z,{"insertAt":"top"});

export { styles as default };
