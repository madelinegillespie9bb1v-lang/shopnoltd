define("discourse/plugins/discourse-assign/discourse/components/topic-level-assign-menu", ["exports", "@ember/application", "@ember/template", "discourse/helpers/user-avatar", "discourse-common/lib/icon-library", "I18n", "discourse/plugins/discourse-assign/discourse/components/modal/edit-topic-assignments"], function(_exports, _application, _template, _userAvatar, _iconLibrary, _I18n, _editTopicAssignments) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const DEPENDENT_KEYS = ["topic.assigned_to_user", "topic.assigned_to_group", "currentUser.can_assign", "topic.assigned_to_user.username"];
    var _default = _exports.default = {
        id: "reassign",
        dependentKeys: DEPENDENT_KEYS,
        classNames: ["reassign"],
        async action(id) {
            if (!this.currentUser ? .can_assign) {
                return;
            }
            const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
            const modal = (0, _application.getOwner)(this).lookup("service:modal");
            const firstPostId = this.topic.postStream.firstPostId;
            switch (id) {
                case "unassign":
                    {
                        this.set("topic.assigned_to_user", null);
                        this.set("topic.assigned_to_group", null);
                        await taskActions.unassign(this.topic.id);
                        this.appEvents.trigger("post-stream:refresh", {
                            id: firstPostId
                        });
                        break;
                    }
                case "reassign-self":
                    {
                        this.set("topic.assigned_to_user", null);
                        this.set("topic.assigned_to_group", null);
                        await taskActions.reassignUserToTopic(this.currentUser, this.topic);
                        this.appEvents.trigger("post-stream:refresh", {
                            id: firstPostId
                        });
                        break;
                    }
                case "reassign":
                    {
                        await modal.show(_editTopicAssignments.default, {
                            model: {
                                topic: this.topic
                            },
                            onSuccess: () => this.appEvents.trigger("post-stream:refresh", {
                                id: firstPostId
                            })
                        });
                        break;
                    }
                default:
                    {
                        if (id.startsWith("unassign-from-post-")) {
                            const postId = extractPostId(id);
                            await taskActions.unassign(postId, "Post");
                            delete this.topic.indirectly_assigned_to[postId];
                            this.appEvents.trigger("post-stream:refresh", {
                                id: firstPostId
                            });
                        }
                    }
            }
        },
        noneItem() {
            return topicLevelUnassignButton(this.topic.uniqueAssignees());
        },
        content() {
            const content = [];
            if (this.topic.isAssigned()) {
                content.push(unassignFromTopicButton(this.topic));
            }
            if (this.topic.hasAssignedPosts()) {
                content.push(...unassignFromPostButtons(this.topic));
            }
            if (this.topic.isAssigned() && !this.topic.isAssignedTo(this.currentUser)) {
                content.push(reassignToSelfButton());
            }
            content.push(editAssignmentsButton());
            return content;
        },
        displayed() {
            return this.currentUser ? .can_assign && !this.site.mobileView && (this.topic.isAssigned() || this.topic.hasAssignedPosts());
        }
    };

    function avatarHtml(user, size, classes) {
        return (0, _userAvatar.renderAvatar)(user, {
            imageSize: size,
            extraClasses: classes,
            ignoreTitle: true
        });
    }

    function extractPostId(buttonId) {
        // buttonId format is "unassign-from-post-${postId}"
        const start = buttonId.lastIndexOf("-") + 1;
        return buttonId.substring(start);
    }

    function editAssignmentsButton() {
        const icon = (0, _iconLibrary.iconHTML)("pencil-alt");
        const label = _I18n.default.t("discourse_assign.topic_level_menu.edit_assignments");
        return {
            id: "reassign",
            name: (0, _template.htmlSafe)(label),
            label: (0, _template.htmlSafe)(`${icon} ${label}`)
        };
    }

    function reassignToSelfButton() {
        const icon = (0, _iconLibrary.iconHTML)("user-plus");
        const label = _I18n.default.t("discourse_assign.topic_level_menu.reassign_topic_to_me");
        return {
            id: "reassign-self",
            name: (0, _template.htmlSafe)(label),
            label: (0, _template.htmlSafe)(`${icon} ${label}`)
        };
    }

    function unassignFromTopicButton(topic) {
        const username = topic.assigned_to_user ? .username || topic.assigned_to_group ? .name;
        const icon = topic.assigned_to_user ? avatarHtml(topic.assigned_to_user, "small") : (0, _iconLibrary.iconHTML)("user-times");
        const label = _I18n.default.t("discourse_assign.topic_level_menu.unassign_from_topic", {
            username
        });
        return {
            id: "unassign",
            name: (0, _template.htmlSafe)(label),
            label: (0, _template.htmlSafe)(`${icon} ${label}`)
        };
    }

    function unassignFromPostButtons(topic) {
        if (!topic.hasAssignedPosts()) {
            return [];
        }
        const max_buttons = 10;
        return Object.entries(topic.indirectly_assigned_to).slice(0, max_buttons).map(_ref => {
            let [postId, assignment] = _ref;
            return unassignFromPostButton(postId, assignment);
        });
    }

    function unassignFromPostButton(postId, assignment) {
        let assignee, icon;
        const assignedToUser = !!assignment.assigned_to.username;
        if (assignedToUser) {
            assignee = assignment.assigned_to.username;
            icon = avatarHtml(assignment.assigned_to, "small");
        } else {
            assignee = assignment.assigned_to.name;
            icon = (0, _iconLibrary.iconHTML)("group-times");
        }
        const label = _I18n.default.t("discourse_assign.topic_level_menu.unassign_from_post", {
            assignee,
            post_number: assignment.post_number
        });
        const dataName = _I18n.default.t("discourse_assign.topic_level_menu.unassign_from_post_help", {
            assignee,
            post_number: assignment.post_number
        });
        return {
            id: `unassign-from-post-${postId}`,
            name: (0, _template.htmlSafe)(dataName),
            label: (0, _template.htmlSafe)(`${icon} ${label}`)
        };
    }

    function topicLevelUnassignButton(assignees) {
        const avatars = topicLevelUnassignButtonAvatars(assignees);
        const label = `<span class="unassign-label">${_I18n.default.t("discourse_assign.topic_level_menu.unassign_with_ellipsis")}</span>`;
        return {
            id: null,
            name: (0, _template.htmlSafe)(_I18n.default.t("discourse_assign.topic_level_menu.unassign_with_ellipsis")),
            label: (0, _template.htmlSafe)(`${avatars}${label}`)
        };
    }

    function topicLevelUnassignButtonAvatars(assignees) {
        const users = assignees.filter(a => a.username);
        let avatars = "";
        if (users.length === 1) {
            avatars = avatarHtml(users[0], "tiny");
        } else if (users.length > 1) {
            avatars = avatarHtml(users[0], "tiny", "overlap") + avatarHtml(users[1], "tiny");
        }
        return avatars;
    }
});