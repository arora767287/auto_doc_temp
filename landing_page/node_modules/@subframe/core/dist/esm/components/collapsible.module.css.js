import styleInject from '../external/style-inject/dist/style-inject.es.js';

var css_248z = ".collapsible-module_trigger__n3w0L {\n  user-select: none;\n}\n\n.collapsible-module_chevron__ds-v8 {\n  transition: transform 200ms ease-in-out;\n}\n\n.collapsible-module_trigger__n3w0L[data-state=\"open\"] .collapsible-module_chevron__ds-v8 {\n  transform: rotate(180deg);\n}\n\n.collapsible-module_content__4sVAg {\n  overflow: hidden;\n}\n.collapsible-module_content__4sVAg[data-state=\"open\"] {\n  animation: collapsible-module_slideDown__gezk3 200ms ease-in-out;\n}\n.collapsible-module_content__4sVAg[data-state=\"closed\"] {\n  animation: collapsible-module_slideUp__IIR-N 200ms ease-in-out;\n}\n\n@keyframes collapsible-module_slideDown__gezk3 {\n  from {\n    height: 0;\n  }\n  to {\n    height: var(--radix-collapsible-content-height);\n  }\n}\n\n@keyframes collapsible-module_slideUp__IIR-N {\n  from {\n    height: var(--radix-collapsible-content-height);\n  }\n  to {\n    height: 0;\n  }\n}\n";
var styles = {"trigger":"collapsible-module_trigger__n3w0L","chevron":"collapsible-module_chevron__ds-v8","content":"collapsible-module_content__4sVAg","slideDown":"collapsible-module_slideDown__gezk3","slideUp":"collapsible-module_slideUp__IIR-N"};
styleInject(css_248z,{"insertAt":"top"});

export { styles as default };
