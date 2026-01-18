define("discourse/plugins/discourse-assign/discourse/connectors/user-messages-nav/assigned-messages", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    _exports.shouldShowAssigned = shouldShowAssigned;

    function shouldShowAssigned(args, component) {
        const needsButton = component.currentUser ? .can_assign;
        return needsButton && (!component.site.mobileView || args.model.isPrivateMessage);
    }
    var _default = _exports.default = {
        shouldRender(args, component) {
            return shouldShowAssigned(args, component);
        }
    };
});