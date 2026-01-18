define("discourse/plugins/discourse-assign/discourse/models/topic", ["exports", "discourse/plugins/discourse-assign/discourse/models/assignment"], function(_exports, _assignment) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.extendTopicModel = extendTopicModel;

    function extendTopicModel(api, pluginId) {
        api.modifyClass("model:topic", {
            pluginId,
            assignees() {
                const result = [];
                if (this.assigned_to_user) {
                    result.push(this.assigned_to_user);
                }
                const postAssignees = this.assignedPosts().map(p => p.assigned_to);
                result.push(...postAssignees);
                return result;
            },
            uniqueAssignees() {
                const map = new Map();
                this.assignees().forEach(user => map.set(user.username, user));
                return [...map.values()];
            },
            assignedPosts() {
                if (!this.indirectly_assigned_to) {
                    return [];
                }
                return Object.entries(this.indirectly_assigned_to).map(_ref => {
                    let [key, value] = _ref;
                    value.postId = key;
                    return value;
                });
            },
            assignments() {
                return [this.topicAssignment(), ...this.postAssignments()].compact();
            },
            postAssignments() {
                if (!this.indirectly_assigned_to) {
                    return [];
                }
                return Object.entries(this.indirectly_assigned_to).map(_ref2 => {
                    let [key, value] = _ref2;
                    value.postId = key;
                    return _assignment.Assignment.fromPost(value);
                });
            },
            topicAssignment() {
                return _assignment.Assignment.fromTopic(this);
            },
            isAssigned() {
                return this.assigned_to_user || this.assigned_to_group;
            },
            isAssignedTo(user) {
                return this.assigned_to_user ? .username === user.username;
            },
            hasAssignedPosts() {
                return !!this.postAssignments().length;
            }
        });
    }
});