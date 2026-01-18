define("discourse/plugins/discourse-assign/discourse/controllers/group-assigned", ["exports", "@ember/controller", "@ember/object", "@ember/service", "discourse/lib/ajax", "discourse-common/config/environment", "discourse-common/lib/debounce", "discourse-common/utils/decorators"], function(_exports, _controller, _object, _service, _ajax, _environment, _debounce, _decorators) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class GroupAssigned extends _controller.default {
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "application", [_controller.inject]))();#
        application = (() => (dt7948.i(this, "application"), void 0))();
        loading = false;
        offset = 0;
        filterName = "";
        filter = "";
        order(order) {
            return order || "";
        }
        static# _3 = (() => dt7948.n(this.prototype, "order", [(0, _decorators.default)("router.currentRoute.queryParams.order")]))();
        ascending(ascending) {
            return ascending || false;
        }
        static# _4 = (() => dt7948.n(this.prototype, "ascending", [(0, _decorators.default)("router.currentRoute.queryParams.ascending")]))();
        search(search) {
            return search || "";
        }
        static# _5 = (() => dt7948.n(this.prototype, "search", [(0, _decorators.default)("router.currentRoute.queryParams.search")]))();
        isDesktop(mobileView) {
            return !mobileView;
        }
        static# _6 = (() => dt7948.n(this.prototype, "isDesktop", [(0, _decorators.default)("site.mobileView")]))();
        _setFilter(filter) {
            this.set("loading", true);
            this.set("offset", 0);
            this.set("filter", filter);
            const groupName = this.group.name;
            (0, _ajax.ajax)(`/assign/members/${groupName}`, {
                type: "GET",
                data: {
                    filter: this.filter,
                    offset: this.offset
                }
            }).then(result => {
                if (this.router.currentRoute.params.filter !== "everyone") {
                    this.router.transitionTo("group.assigned.show", groupName, "everyone");
                }
                this.set("members", result.members);
            }).finally(() => {
                this.set("loading", false);
            });
        }
        findMembers(refresh) {
            if (refresh) {
                this.set("members", this.model.members);
                return;
            }
            if (this.loading || !this.model) {
                return;
            }
            if (this.model.members.length >= this.offset + 50) {
                this.set("loading", true);
                this.set("offset", this.offset + 50);
                (0, _ajax.ajax)(`/assign/members/${this.group.name}`, {
                    type: "GET",
                    data: {
                        filter: this.filter,
                        offset: this.offset
                    }
                }).then(result => {
                    this.members.pushObjects(result.members);
                }).finally(() => this.set("loading", false));
            }
        }
        loadMore() {
            this.findMembers();
        }
        static# _7 = (() => dt7948.n(this.prototype, "loadMore", [_object.action]))();
        onChangeFilterName(value) {
            (0, _debounce.default)(this, this._setFilter, value, _environment.INPUT_DELAY * 2);
        }
        static# _8 = (() => dt7948.n(this.prototype, "onChangeFilterName", [_object.action]))();
    }
    _exports.default = GroupAssigned;
});