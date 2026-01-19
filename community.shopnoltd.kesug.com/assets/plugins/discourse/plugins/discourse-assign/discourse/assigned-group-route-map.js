define("discourse/plugins/discourse-assign/discourse/assigned-group-route-map", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        resource: "group",
        map() {
            this.route("assigned", function() {
                this.route("show", {
                    path: "/:filter"
                });
            });
        }
    };
});