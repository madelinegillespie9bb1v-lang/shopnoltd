define("discourse/plugins/poll/discourse/initializers/add-poll-ui-builder", ["exports", "discourse/lib/plugin-api", "discourse/plugins/poll/discourse/components/modal/poll-ui-builder"], function(_exports, _pluginApi, _pollUiBuilder) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;

    function initializePollUIBuilder(api) {
        api.addComposerToolbarPopupMenuOption({
            action: toolbarEvent => {
                api.container.lookup("service:modal").show(_pollUiBuilder.default, {
                    model: {
                        toolbarEvent
                    }
                });
            },
            icon: "chart-bar",
            label: "poll.ui_builder.title",
            condition: composer => {
                const siteSettings = api.container.lookup("service:site-settings");
                const currentUser = api.getCurrentUser();
                return siteSettings.poll_enabled && (composer.model.topic ? .pm_with_non_human_user || currentUser && (currentUser.staff || currentUser.can_create_poll));
            }
        });
    }
    var _default = _exports.default = {
        name: "add-poll-ui-builder",
        initialize() {
            (0, _pluginApi.withPluginApi)("1.14.0", initializePollUIBuilder);
        }
    };
});