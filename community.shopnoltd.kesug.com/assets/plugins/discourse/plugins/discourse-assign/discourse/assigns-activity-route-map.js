define("discourse/plugins/discourse-assign/discourse/assigns-activity-route-map", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        resource: "user.userActivity",
        map() {
            this.route("assigned");
        }
    };
});