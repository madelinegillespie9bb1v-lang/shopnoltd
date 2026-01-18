define("discourse/plugins/discourse-assign/discourse/models/assignment", ["exports", "@glimmer/tracking", "@ember/object"], function(_exports, _tracking, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.Assignment = void 0;
    class Assignment extends _object.default {
        static fromTopic(topic) {
            const assignment = new Assignment();
            assignment.id = 0;
            assignment.username = topic.assigned_to_user ? .username;
            assignment.groupName = topic.assigned_to_group ? .name;
            assignment.status = topic.assignment_status;
            assignment.note = topic.assignment_note;
            assignment.targetId = topic.id;
            assignment.targetType = "Topic";
            return assignment;
        }
        static fromPost(post) {
            const assignment = new Assignment();
            assignment.username = post.assigned_to.username;
            assignment.groupName = post.assigned_to.name;
            assignment.status = post.assignment_status;
            assignment.note = post.assignment_note;
            assignment.targetId = post.postId;
            assignment.targetType = "Post";
            assignment.postNumber = post.post_number;
            assignment.id = post.post_number;
            return assignment;
        }

        // to-do rename to groupName, some components use both this model
        // and models from server, that's why we have to call it "group_name" now
        static# _ = (() => dt7948.g(this.prototype, "group_name", [_tracking.tracked]))();#
        group_name = (() => (dt7948.i(this, "group_name"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "username", [_tracking.tracked]))();#
        username = (() => (dt7948.i(this, "username"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "status", [_tracking.tracked]))();#
        status = (() => (dt7948.i(this, "status"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "note", [_tracking.tracked]))();#
        note = (() => (dt7948.i(this, "note"), void 0))();
        targetId;
        targetType;
        postNumber;
        isEdited = false;
    }
    _exports.Assignment = Assignment;
});