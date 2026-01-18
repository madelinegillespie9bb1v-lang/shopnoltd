define("discourse/plugins/discourse-assign/discourse/routes/user-activity-assigned", ["exports", "@ember/service", "discourse/lib/cookie", "discourse/routes/user-topic-list", "I18n"], function(_exports, _service, _cookie, _userTopicList, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UserActivityAssigned extends _userTopicList.default {
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        templateName = "user-activity-assigned";
        controllerName = "user-activity-assigned";
        userActionType = 16;
        noContentHelpKey = "discourse_assigns.no_assigns";
        beforeModel() {
            if (!this.currentUser) {
                (0, _cookie.default)("destination_url", window.location.href);
                this.router.transitionTo("login");
            }
        }
        model(params) {
            return this.store.findFiltered("topicList", {
                filter: `topics/messages-assigned/${this.modelFor("user").username_lower}`,
                params: {
                    exclude_category_ids: [-1],
                    order: params.order,
                    ascending: params.ascending,
                    search: params.search
                }
            });
        }
        titleToken() {
            return _I18n.default.t("discourse_assign.assigned");
        }
    }
    _exports.default = UserActivityAssigned;
});