"require" in window && require("discourse/lib/theme-settings-store").registerSettings(3, {
    theme_uploads: {
        "Roboto-Regular": "//forum-kobotoolbox-org.s3.dualstack.us-east-1.amazonaws.com/original/1X/1d1d41fcadc571decb6444211b7993b99ce926e2.ttf"
    }
}), "define" in window && define("discourse/theme-3/discourse/initializers/theme-field-18-common-html-script-1", ["exports", "discourse/lib/plugin-api"], (function(e, i) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    require("discourse/lib/theme-settings-store").getObjectForTheme(3)
    e.default = {
        name: "theme-field-18-common-html-script-1",
        after: "inject-objects",
        initialize() {
            (0, i.withPluginApi)("0.4", (e => {
                const {
                    iconNode: i
                } = require("discourse-common/lib/icon-library")
                e.decorateWidget("header-icons:before", (e => e.h("li", [e.h("a#home-button.icon", {
                    href: "https://www.kobotoolbox.org/",
                    title: "Home"
                }, i("home"))])))
            }))
        }
    }
}))

//# sourceMappingURL=15b5b7472dd48f09e5d74f3411d8dc557a3da1c1.map?__ws=community.kobotoolbox.org