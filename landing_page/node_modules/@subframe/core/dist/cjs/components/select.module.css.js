'use strict';

var styleInject_es = require('../external/style-inject/dist/style-inject.es.js');

var css_248z = ".select-module_root__cAyak {\n  position: relative;\n  user-select: none;\n  touch-action: none;\n}\n\n.select-module_content__5VSzA {\n  /* ensures width of select menu is at least as wide as the trigger */\n  min-width: max(var(--radix-select-trigger-width), 128px);\n\n  /* ensures the select menu is not wider than the viewport */\n  max-height: var(--radix-select-content-available-height);\n}\n\n.select-module_trigger__L7Z7z[data-placeholder] .select-module_value__4AkUy {\n  /* ensures placeholder is not shown */\n  opacity: 0.7;\n}\n\n.select-module_item__PnP11 {\n  position: relative;\n  user-select: none;\n  /* Explicitly set width to get rendered Radix \"selectItem\" to go full width */\n  width: 100%;\n}\n\n.select-module_item__PnP11[data-highlighted] {\n  /* \n  Explicitly set outline none to prevent Radix from adding in an outline.\n  The editor doesn't currently support \"outline\" WYSIWYG\n  */\n  outline: none;\n}\n";
var styles = {"root":"select-module_root__cAyak","content":"select-module_content__5VSzA","trigger":"select-module_trigger__L7Z7z","value":"select-module_value__4AkUy","item":"select-module_item__PnP11"};
styleInject_es(css_248z,{"insertAt":"top"});

module.exports = styles;
