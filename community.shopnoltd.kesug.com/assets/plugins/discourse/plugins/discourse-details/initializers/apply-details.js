define("discourse/plugins/discourse-details/initializers/apply-details", ["exports", "jquery", "discourse/lib/plugin-api", "discourse-i18n"], function(_exports, _jquery, _pluginApi, _discourseI18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;

    function initializeDetails(api) {
        api.decorateCooked($elem => (0, _jquery.default)("details", $elem), {
            id: "discourse-details"
        });
        api.addComposerToolbarPopupMenuOption({
            action: function(toolbarEvent) {
                toolbarEvent.applySurround("\n" + `[details="${_discourseI18n.default.t("composer.details_title")}"]` + "\n", "\n[/details]\n", "details_text", {
                    multiline: false
                });
            },
            icon: "caret-right",
            label: "details.title"
        });
    }
    var _default = _exports.default = {
        name: "apply-details",
        initialize() {
            (0, _pluginApi.withPluginApi)("1.14.0", initializeDetails);
        }
    };
});