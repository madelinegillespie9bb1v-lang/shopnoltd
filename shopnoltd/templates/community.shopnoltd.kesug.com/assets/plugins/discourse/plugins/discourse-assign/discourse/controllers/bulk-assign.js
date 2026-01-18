define("discourse/plugins/discourse-assign/discourse/controllers/bulk-assign", ["exports", "@ember/controller", "@ember/object"], function(_exports, _controller, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class BulkAssign extends _controller.default {
        static# _ = (() => dt7948.g(this.prototype, "topicBulkActions", [_controller.inject]))();#
        topicBulkActions = (() => (dt7948.i(this, "topicBulkActions"), void 0))();
        model;

        // `submit` property will be mutated by the `AssignUserForm` component
        formApi = {
            submit() {}
        };
        async assign() {
            return this.topicBulkActions.performAndRefresh({
                type: "assign",
                username: this.model.username,
                note: this.model.note
            });
        }
        static# _2 = (() => dt7948.n(this.prototype, "assign", [_object.action]))();
    }
    _exports.default = BulkAssign;
});