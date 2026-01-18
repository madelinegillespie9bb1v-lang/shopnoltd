if ('define' in window) {
    define("discourse/theme-3/discourse/initializers/theme-field-18-common-html-script-1", ["exports", "discourse/lib/plugin-api"], function(_exports, _pluginApi) {
        "use strict";

        Object.defineProperty(_exports, "__esModule", {
            value: true
        });
        _exports.default = void 0;
        const settings = require("discourse/lib/theme-settings-store").getObjectForTheme(3);
        const themePrefix = key => `theme_translations.3.${key}`;
        var _default = _exports.default = {
            name: "theme-field-18-common-html-script-1",
            after: "inject-objects",
            initialize() {
                (0, _pluginApi.withPluginApi)("0.4", api => {
                    const {
                        iconNode
                    } = require("discourse-common/lib/icon-library");
                    api.decorateWidget('header-icons:before', helper => {
                        return helper.h('li', [helper.h('a#home-button.icon', {
                            href: 'https://www.kobotoolbox.org/',
                            title: 'Home'
                        }, iconNode('home'))]);
                    });
                });
            }
        };
    });
}