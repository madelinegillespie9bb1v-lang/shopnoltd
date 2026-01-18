"require" in window && require("discourse/lib/theme-settings-store").registerSettings(7, {
    Hamburger_links: "KoBoToolbox Home,http://www.kobotoolbox.org,f|Help Pages,http://help.kobotoolbox.org,f"
}), "define" in window && define("discourse/theme-7/discourse/api-initializers/init-custom-hamburger-links", ["exports", "discourse/lib/api"], (function(e, i) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    const t = require("discourse/lib/theme-settings-store").getObjectForTheme(7)
    e.default = (0, i.apiInitializer)("0.8.18", (e => {
        (t.Hamburger_links || "").split("|").forEach((i => {
            let [t, r, o, s] = (i || "").split(","), a = `custom-hamburger-link ${t.replace(/\s+/g,"-").toLowerCase()}`
            o = "f" === o ? "footerLinks" : "generalLinks", s = "blank" === s ? "_blank" : "", e.decorateWidget(`hamburger-menu:${o}`, (() => ({
                href: r,
                rawLabel: t,
                className: a,
                attributes: {
                    target: s
                }
            })))
        }))
    }))
}))

//# sourceMappingURL=a9912e5b549516717923f17df8e6e174cdc960bc.map?__ws=community.kobotoolbox.org