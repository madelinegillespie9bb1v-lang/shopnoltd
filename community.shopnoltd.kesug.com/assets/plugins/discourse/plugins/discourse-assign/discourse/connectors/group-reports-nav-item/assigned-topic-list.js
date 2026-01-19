define("discourse/plugins/discourse-assign/discourse/connectors/group-reports-nav-item/assigned-topic-list", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        shouldRender(args, component) {
            return component.currentUser ? .can_assign && args.group.can_show_assigned_tab && args.group.assignment_count > 0;
        }
    };
});