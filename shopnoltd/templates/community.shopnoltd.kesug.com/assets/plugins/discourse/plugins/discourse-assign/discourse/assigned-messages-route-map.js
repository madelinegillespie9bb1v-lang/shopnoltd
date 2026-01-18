define("discourse/plugins/discourse-assign/discourse/assigned-messages-route-map", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        resource: "user.userPrivateMessages",
        map() {
            this.route("assigned", function() {
                this.route("index", {
                    path: "/"
                });
            });
        }
    };
});