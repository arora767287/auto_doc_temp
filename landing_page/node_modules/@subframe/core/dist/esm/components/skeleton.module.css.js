import styleInject from '../external/style-inject/dist/style-inject.es.js';

var css_248z = "/* Taken from https://tailwindcss.com/docs/animation#pulse */\n.skeleton-module_root__SudAV {\n  animation: skeleton-module_pulse__Us5Wi 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n\n@keyframes skeleton-module_pulse__Us5Wi {\n  0%,\n  100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n";
var styles = {"root":"skeleton-module_root__SudAV","pulse":"skeleton-module_pulse__Us5Wi"};
styleInject(css_248z,{"insertAt":"top"});

export { styles as default };
