define("discourse/plugins/discourse-topic-voting/discourse/routes/user-activity-votes", ["exports", "discourse/models/user-action", "discourse/routes/user-topic-list", "I18n"], function(_exports, _userAction, _userTopicList, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = _userTopicList.default.extend({
        userActionType: _userAction.default.TYPES.topics,
        model() {
            return this.store.findFiltered("topicList", {
                filter: "topics/voted-by/" + this.modelFor("user").get("username_lower")
            }).then(model => {
                model.set("emptyState", this.emptyState());
                return model;
            });
        },
        emptyState() {
            const user = this.modelFor("user");
            const title = this.isCurrentUser(user) ? _I18n.default.t("topic_voting.no_votes_title_self") : _I18n.default.t("topic_voting.no_votes_title_others", {
                username: user.username
            });
            return {
                title,
                body: ""
            };
        }
    });
});