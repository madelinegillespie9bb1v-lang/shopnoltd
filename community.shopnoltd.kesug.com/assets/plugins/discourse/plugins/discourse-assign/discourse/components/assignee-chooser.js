define("discourse/plugins/discourse-assign/discourse/components/assignee-chooser", ["exports", "select-kit/components/email-group-user-chooser"], function(_exports, _emailGroupUserChooser) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class AssigneeChooser extends _emailGroupUserChooser.default {
        modifyComponentForRow() {
            return "assignee-chooser-row";
        }
    }
    _exports.default = AssigneeChooser;
});