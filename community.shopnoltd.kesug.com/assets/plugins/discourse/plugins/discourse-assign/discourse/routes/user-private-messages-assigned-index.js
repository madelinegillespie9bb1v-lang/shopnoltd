define("discourse/plugins/discourse-assign/discourse/routes/user-private-messages-assigned-index", ["exports", "discourse/routes/build-private-messages-route"], function(_exports, _buildPrivateMessagesRoute) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _buildPrivateMessagesRoute.default)("assigned", "private-messages-assigned", "assigned");
});