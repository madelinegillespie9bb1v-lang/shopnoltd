define("discourse/plugins/discourse-solved/discourse/routes/user-activity-solved", ["exports", "discourse/routes/user-activity-stream", "I18n"], function(_exports, _userActivityStream, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = _userActivityStream.default.extend({
        userActionType: 15,
        noContentHelpKey: "solved.no_solutions",
        emptyState() {
            const user = this.modelFor("user");
            let title, body;
            if (this.isCurrentUser(user)) {
                title = _I18n.default.t("solved.no_solved_topics_title");
                body = _I18n.default.t("solved.no_solved_topics_body");
            } else {
                title = _I18n.default.t("solved.no_solved_topics_title_others", {
                    username: user.username
                });
                body = "";
            }
            return {
                title,
                body
            };
        }
    });
});