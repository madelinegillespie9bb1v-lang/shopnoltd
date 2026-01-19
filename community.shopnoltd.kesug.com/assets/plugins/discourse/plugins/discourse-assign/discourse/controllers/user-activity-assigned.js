define("discourse/plugins/discourse-assign/discourse/controllers/user-activity-assigned", ["exports", "@ember/controller", "@ember/object", "@ember/service", "@ember/template", "discourse/controllers/user-topics-list", "discourse-common/config/environment", "discourse-common/lib/debounce", "discourse-common/lib/get-url", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "I18n"], function(_exports, _controller, _object, _service, _template, _userTopicsList, _environment, _debounce, _getUrl, _iconLibrary, _decorators, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UserActivityAssigned extends _userTopicsList.default {
        static# _ = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "user", [_controller.inject]))();#
        user = (() => (dt7948.i(this, "user"), void 0))();
        queryParams = ["order", "ascending", "search"];
        order = "";
        ascending = false;
        search = "";
        doesntHaveAssignments(topicsLength, search) {
            return !search && !topicsLength;
        }
        static# _3 = (() => dt7948.n(this.prototype, "doesntHaveAssignments", [(0, _decorators.default)("model.topics.length", "search")]))();
        emptyStateBody() {
            return (0, _template.htmlSafe)(_I18n.default.t("user.no_assignments_body", {
                preferencesUrl: (0, _getUrl.default)("/my/preferences/notifications"),
                icon: (0, _iconLibrary.iconHTML)("user-plus")
            }));
        }
        static# _4 = (() => dt7948.n(this.prototype, "emptyStateBody", [_decorators.default]))();
        _setSearchTerm(searchTerm) {
            this.set("search", searchTerm);
            this.refreshModel();
        }
        refreshModel() {
            this.set("loading", true);
            this.store.findFiltered("topicList", {
                filter: this.model.filter,
                params: {
                    order: this.order,
                    ascending: this.ascending,
                    search: this.search
                }
            }).then(result => this.set("model", result)).finally(() => {
                this.set("loading", false);
            });
        }
        changeSort(sortBy) {
            if (sortBy === this.order) {
                this.toggleProperty("ascending");
                this.refreshModel();
            } else {
                this.setProperties({
                    order: sortBy,
                    ascending: false
                });
                this.refreshModel();
            }
        }
        static# _5 = (() => dt7948.n(this.prototype, "changeSort", [_object.action]))();
        onChangeFilter(value) {
            (0, _debounce.default)(this, this._setSearchTerm, value, _environment.INPUT_DELAY * 2);
        }
        static# _6 = (() => dt7948.n(this.prototype, "onChangeFilter", [_object.action]))();
    }
    _exports.default = UserActivityAssigned;
});