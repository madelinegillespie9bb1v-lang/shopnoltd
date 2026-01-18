if ('define' in window) {
    define("discourse/theme-7/discourse/api-initializers/init-custom-hamburger-links", ["exports", "discourse/lib/api"], function(_exports, _api) {
        "use strict";

        Object.defineProperty(_exports, "__esModule", {
            value: true
        });
        _exports.default = void 0;
        const settings = require("discourse/lib/theme-settings-store").getObjectForTheme(7);
        const themePrefix = key => `theme_translations.7.${key}`;
        var _default = _exports.default = (0, _api.apiInitializer)("0.8.18", api => {
            (settings.Hamburger_links || "").split("|").forEach(link => {
                let [rawLabel, href, loc, target] = (link || "").split(",");
                let className = `custom-hamburger-link ${rawLabel.replace(/\s+/g, "-").toLowerCase()}`;
                loc = "f" === loc ? "footerLinks" : "generalLinks";
                target = "blank" === target ? "_blank" : "";
                api.decorateWidget(`hamburger-menu:${loc}`, () => {
                    return {
                        href,
                        rawLabel,
                        className,
                        attributes: {
                            target
                        }
                    };
                });
            });
        });
    });
}