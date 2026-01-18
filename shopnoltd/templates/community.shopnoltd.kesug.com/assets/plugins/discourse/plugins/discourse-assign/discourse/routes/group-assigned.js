define("discourse/plugins/discourse-assign/discourse/routes/group-assigned", ["exports", "@ember/service", "discourse/lib/ajax", "discourse/routes/discourse"], function(_exports, _service, _ajax, _discourse) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class GroupAssigned extends _discourse.default {
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        model() {
            return (0, _ajax.ajax)(`/assign/members/${this.modelFor("group").name}`);
        }
        setupController(controller, model) {
            controller.setProperties({
                model,
                members: [],
                group: this.modelFor("group")
            });
            controller.group.setProperties({
                assignment_count: model.assignment_count,
                group_assignment_count: model.group_assignment_count
            });
            controller.findMembers(true);
        }
        redirect(model, transition) {
            if (!transition.to.params.hasOwnProperty("filter")) {
                this.router.transitionTo("group.assigned.show", "everyone");
            }
        }
    }
    _exports.default = GroupAssigned;
});