define("discourse/plugins/discourse-assign/discourse/connectors/user-preferences-notifications/remind-assigns-frequency", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        shouldRender(args, component) {
            return component.currentUser ? .can_assign;
        }
    };
});