define("discourse/plugins/discourse-solved/discourse/connectors/bread-crumbs-right/solved-status-filter", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "discourse-common/lib/get-owner", "I18n"], function(_exports, _component, _object, _service, _getOwner, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const QUERY_PARAM_VALUES = {
        solved: "yes",
        unsolved: "no",
        all: null
    };
    const UX_VALUES = {
        yes: "solved",
        no: "unsolved"
    };
    class SolvedStatusFilter extends _component.default {
        static shouldRender(args, helper) {
            const router = (0, _getOwner.getOwnerWithFallback)(this).lookup("service:router");
            if (!helper.siteSettings.show_filter_by_solved_status || router.currentRouteName === "discovery.categories" || args.editingCategory) {
                return false;
            } else if (helper.siteSettings.allow_solved_on_all_topics || router.currentRouteName === "tag.show") {
                return true;
            } else {
                return args.currentCategory ? .enable_accepted_answers;
            }
        }
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "siteSettings", [_service.inject]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        get statuses() {
            return ["all", "solved", "unsolved"].map(status => {
                return {
                    name: _I18n.default.t(`solved.topic_status_filter.${status}`),
                    value: status
                };
            });
        }
        get status() {
            const queryParamValue = this.router.currentRoute.queryParams ? .solved;
            return UX_VALUES[queryParamValue] || "all";
        }
        changeStatus(newStatus) {
            this.router.transitionTo({
                queryParams: {
                    solved: QUERY_PARAM_VALUES[newStatus]
                }
            });
        }
        static# _3 = (() => dt7948.n(this.prototype, "changeStatus", [_object.action]))();
    }
    _exports.default = SolvedStatusFilter;
});