define("discourse/plugins/discourse-assign/discourse/controllers/group-assigned-show", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "@ember/service", "discourse/controllers/user-topics-list", "discourse/lib/bulk-select-helper", "discourse-common/config/environment", "discourse-common/lib/debounce"], function(_exports, _controller, _object, _computed, _service, _userTopicsList, _bulkSelectHelper, _environment, _debounce) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class GroupAssignedShow extends _userTopicsList.default {
        static# _ = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "user", [_controller.inject]))();#
        user = (() => (dt7948.i(this, "user"), void 0))();
        queryParams = ["order", "ascending", "search"];
        order = "";
        ascending = false;
        search = "";
        bulkSelectEnabled = false;
        bulkSelectHelper = (() => new _bulkSelectHelper.default(this))();
        selected = [];
        static# _4 = (() => dt7948.g(this.prototype, "canBulkSelect", [(0, _computed.alias)("currentUser.staff")]))();#
        canBulkSelect = (() => (dt7948.i(this, "canBulkSelect"), void 0))();
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
                    search: this.search,
                    direct: this.model.params.direct
                }
            }).then(result => this.set("model", result)).finally(() => {
                this.set("loading", false);
            });
        }
        async unassign(targetId) {
            let targetType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Topic";
            await this.taskActions.unassign(targetId, targetType);
            this.router.refresh();
        }
        static# _5 = (() => dt7948.n(this.prototype, "unassign", [_object.action]))();
        reassign(topic) {
            this.taskActions.showAssignModal(topic, {
                onSuccess: () => this.router.refresh()
            });
        }
        static# _6 = (() => dt7948.n(this.prototype, "reassign", [_object.action]))();
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
        static# _7 = (() => dt7948.n(this.prototype, "changeSort", [_object.action]))();
        onChangeFilter(value) {
            (0, _debounce.default)(this, this._setSearchTerm, value, _environment.INPUT_DELAY * 2);
        }
        static# _8 = (() => dt7948.n(this.prototype, "onChangeFilter", [_object.action]))();
        toggleBulkSelect() {
            this.toggleProperty("bulkSelectEnabled");
        }
        static# _9 = (() => dt7948.n(this.prototype, "toggleBulkSelect", [_object.action]))();
        refresh() {
            this.refreshModel();
        }
        static# _10 = (() => dt7948.n(this.prototype, "refresh", [_object.action]))();
    }
    _exports.default = GroupAssignedShow;
});