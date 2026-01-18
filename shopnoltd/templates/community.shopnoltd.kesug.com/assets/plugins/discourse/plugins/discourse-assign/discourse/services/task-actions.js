define("discourse/plugins/discourse-assign/discourse/services/task-actions", ["exports", "@glimmer/tracking", "@ember/service", "@ember/utils", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/plugins/discourse-assign/discourse/components/modal/assign-user"], function(_exports, _tracking, _service, _utils, _ajax, _ajaxError, _assignUser) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class TaskActions extends _service.default {
        static# _ = (() => dt7948.g(this.prototype, "modal", [_service.inject]))();#
        modal = (() => (dt7948.i(this, "modal"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "allowedGroups", [_tracking.tracked]))();#
        allowedGroups = (() => (dt7948.i(this, "allowedGroups"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "allowedGroupsForAssignment", [_tracking.tracked]))();#
        allowedGroupsForAssignment = (() => (dt7948.i(this, "allowedGroupsForAssignment"), void 0))();#
        suggestionsPromise;
        static# _4 = (() => dt7948.g(this.prototype, "_suggestions", [_tracking.tracked]))();#
        _suggestions = (() => (dt7948.i(this, "_suggestions"), void 0))();
        get suggestions() {
            if (this._suggestions) {
                return this._suggestions;
            }
            this.#suggestionsPromise || = this.#fetchSuggestions();
            return null;
        }
        async# fetchSuggestions() {
            const data = await (0, _ajax.ajax)("/assign/suggestions");
            if (this.isDestroying || this.isDestroyed) {
                return;
            }
            this._suggestions = data.suggestions;
            this.allowedGroups = data.assign_allowed_on_groups;
            this.allowedGroupsForAssignment = data.assign_allowed_for_groups;
        }
        unassign(targetId) {
            let targetType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Topic";
            return (0, _ajax.ajax)("/assign/unassign", {
                type: "PUT",
                data: {
                    target_id: targetId,
                    target_type: targetType
                }
            });
        }
        async unassignPost(post) {
            await this.unassign(post.id, "Post");
            delete post.topic.indirectly_assigned_to[post.id];
        }
        showAssignModal(target, _ref) {
            let {
                isAssigned = false,
                    targetType = "Topic",
                    onSuccess
            } = _ref;
            return this.modal.show(_assignUser.default, {
                model: {
                    reassign: isAssigned,
                    username: target.assigned_to_user ? .username,
                    group_name: target.assigned_to_group ? .name,
                    status: target.assignment_status,
                    target,
                    targetType,
                    onSuccess
                }
            });
        }
        showAssignPostModal(post) {
            return this.showAssignModal(post, {
                targetType: "Post"
            });
        }
        reassignUserToTopic(user, target) {
            let targetType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Topic";
            return (0, _ajax.ajax)("/assign/assign", {
                type: "PUT",
                data: {
                    username: user.username,
                    target_id: target.id,
                    target_type: targetType,
                    status: target.assignment_status
                }
            });
        }
        async assign(model) {
            if ((0, _utils.isEmpty)(model.username)) {
                model.target.set("assigned_to_user", null);
            }
            if ((0, _utils.isEmpty)(model.group_name)) {
                model.target.set("assigned_to_group", null);
            }
            let path = "/assign/assign";
            if ((0, _utils.isEmpty)(model.username) && (0, _utils.isEmpty)(model.group_name)) {
                path = "/assign/unassign";
            }
            try {
                await (0, _ajax.ajax)(path, {
                    type: "PUT",
                    data: {
                        username: model.username,
                        group_name: model.group_name,
                        target_id: model.target.id,
                        target_type: model.targetType,
                        note: model.note,
                        status: model.status
                    }
                });
                model.onSuccess ? .();
            } catch (error) {
                (0, _ajaxError.popupAjaxError)(error);
            }
        }
        async putAssignment(assignment) {
            await (0, _ajax.ajax)("/assign/assign", {
                type: "PUT",
                data: {
                    username: assignment.username,
                    group_name: assignment.group_name,
                    target_id: assignment.targetId,
                    target_type: assignment.targetType,
                    note: assignment.note,
                    status: assignment.status
                }
            });
        }
    }
    _exports.default = TaskActions;
});