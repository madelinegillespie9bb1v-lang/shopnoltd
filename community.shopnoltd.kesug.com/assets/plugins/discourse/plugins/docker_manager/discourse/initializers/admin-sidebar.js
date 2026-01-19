define("discourse/plugins/docker_manager/discourse/initializers/admin-sidebar", ["exports", "discourse/lib/plugin-api"], function(_exports, _pluginApi) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "docker-manager-admin-sidebar",
        initialize() {
            (0, _pluginApi.withPluginApi)("1.24.0", api => {
                api.addAdminSidebarSectionLink("root", {
                    name: "admin_upgrade",
                    route: "update.index",
                    label: "admin.docker.update_tab",
                    icon: "rocket"
                });
            });
        }
    };
});