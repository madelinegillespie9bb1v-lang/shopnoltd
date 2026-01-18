define("discourse/plugins/discourse-assign/discourse/initializers/assign-extend-user-messages", ["exports", "discourse/lib/plugin-api", "I18n"], function(_exports, _pluginApi, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "assign-extend-user-messages",
        initialize(container) {
            (0, _pluginApi.withPluginApi)("1.5.0", api => {
                const currentUser = container.lookup("service:current-user");
                if (currentUser ? .can_assign && api.addUserMessagesNavigationDropdownRow) {
                    api.addUserMessagesNavigationDropdownRow("userPrivateMessages.assigned", _I18n.default.t("discourse_assign.assigned"), "user-plus");
                }
            });
        }
    };
});