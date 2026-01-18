define("discourse/plugins/docker_manager/discourse/docker-manager-route-map", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        resource: "admin",
        map() {
            this.route("update", {
                resetNamespace: true
            }, function() {
                this.route("processes");
                this.route("show", {
                    path: "/:id"
                });
            });
        }
    };
});