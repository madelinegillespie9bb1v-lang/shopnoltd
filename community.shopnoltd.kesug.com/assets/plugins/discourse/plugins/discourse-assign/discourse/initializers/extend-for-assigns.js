define("discourse/plugins/discourse-assign/discourse/initializers/extend-for-assigns", ["exports", "@ember/application", "@ember/template", "@ember/utils", "virtual-dom", "discourse/components/search-advanced-options", "discourse/helpers/user-avatar", "discourse/lib/plugin-api", "discourse/lib/register-topic-footer-dropdown", "discourse/lib/utilities", "discourse/widgets/raw-html", "discourse/widgets/render-glimmer", "discourse-common/lib/get-url", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "I18n", "discourse/plugins/discourse-assign/discourse/components/bulk-actions/bulk-assign-user", "discourse/plugins/discourse-assign/discourse/components/modal/edit-topic-assignments", "discourse/plugins/discourse-assign/discourse/components/topic-level-assign-menu", "discourse/plugins/discourse-assign/discourse/models/topic", "@ember/template-factory"], function(_exports, _application, _template, _utils, _virtualDom, _searchAdvancedOptions, _userAvatar, _pluginApi, _registerTopicFooterDropdown, _utilities, _rawHtml, _renderGlimmer, _getUrl, _iconLibrary, _decorators, _I18n, _bulkAssignUser, _editTopicAssignments, _topicLevelAssignMenu, _topic, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const PLUGIN_ID = "discourse-assign";
    const DEPENDENT_KEYS = ["topic.assigned_to_user", "topic.assigned_to_group", "currentUser.can_assign", "topic.assigned_to_user.username"];

    function defaultTitle(topic) {
        const username = topic.assigned_to_user ? .username || topic.assigned_to_group ? .name;
        if (username) {
            return _I18n.default.t("discourse_assign.unassign.help", {
                username
            });
        } else {
            return _I18n.default.t("discourse_assign.assign.help");
        }
    }

    function registerTopicFooterButtons(api) {
        (0, _registerTopicFooterDropdown.registerTopicFooterDropdown)(_topicLevelAssignMenu.default);
        api.registerTopicFooterButton({
            id: "assign",
            icon() {
                return this.topic.isAssigned() ? this.site.mobileView ? "user-times" : null : "user-plus";
            },
            priority: 250,
            translatedTitle() {
                return defaultTitle(this.topic);
            },
            translatedAriaLabel() {
                return defaultTitle(this.topic);
            },
            translatedLabel() {
                return _I18n.default.t("discourse_assign.assign.title");
            },
            async action() {
                if (!this.currentUser ? .can_assign) {
                    return;
                }
                const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
                const modal = (0, _application.getOwner)(this).lookup("service:modal");
                if (this.topic.isAssigned()) {
                    this.set("topic.assigned_to_user", null);
                    this.set("topic.assigned_to_group", null);
                    await taskActions.unassign(this.topic.id, "Topic");
                    this.appEvents.trigger("post-stream:refresh", {
                        id: this.topic.postStream.firstPostId
                    });
                } else {
                    await modal.show(_editTopicAssignments.default, {
                        model: {
                            topic: this.topic
                        },
                        onSuccess: () => this.appEvents.trigger("post-stream:refresh", {
                            id: this.topic.postStream.firstPostId
                        })
                    });
                }
            },
            dropdown() {
                return this.site.mobileView;
            },
            classNames: ["assign"],
            dependentKeys: DEPENDENT_KEYS,
            displayed() {
                return this.currentUser ? .can_assign && !this.topic.isAssigned() && !this.topic.hasAssignedPosts();
            }
        });
        api.registerTopicFooterButton({
            id: "unassign-mobile-header",
            translatedTitle() {
                return defaultTitle(this.topic);
            },
            translatedAriaLabel() {
                return defaultTitle(this.topic);
            },
            translatedLabel() {
                const user = this.topic.assigned_to_user;
                const group = this.topic.assigned_to_group;
                const label = _I18n.default.t("discourse_assign.assigned_to_w_ellipsis");
                if (user) {
                    return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span><span class="username">${user.username}</span></span>${(0, _userAvatar.renderAvatar)(user, {
            imageSize: "small",
            ignoreTitle: true
          })}`);
                } else if (group) {
                    return (0, _template.htmlSafe)(`<span class="unassign-label">${label}</span> @${group.name}`);
                }
            },
            dropdown() {
                return this.currentUser ? .can_assign && this.topic.isAssigned();
            },
            classNames: ["assign"],
            dependentKeys: DEPENDENT_KEYS,
            displayed() {
                // only display the button in the mobile view
                return this.currentUser ? .can_assign && this.site.mobileView;
            }
        });
        api.registerTopicFooterButton({
            id: "unassign-mobile",
            icon() {
                return "user-times";
            },
            translatedTitle() {
                return defaultTitle(this.topic);
            },
            translatedAriaLabel() {
                return defaultTitle(this.topic);
            },
            translatedLabel() {
                const label = _I18n.default.t("discourse_assign.unassign.title");
                return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span></span>`);
            },
            action() {
                if (!this.currentUser ? .can_assign) {
                    return;
                }
                const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
                this.set("topic.assigned_to_user", null);
                this.set("topic.assigned_to_group", null);
                taskActions.unassign(this.topic.id).then(() => {
                    this.appEvents.trigger("post-stream:refresh", {
                        id: this.topic.postStream.firstPostId
                    });
                });
            },
            dropdown() {
                return this.currentUser ? .can_assign && this.topic.isAssigned();
            },
            classNames: ["assign"],
            dependentKeys: DEPENDENT_KEYS,
            displayed() {
                // only display the button in the mobile view
                return this.currentUser ? .can_assign && this.site.mobileView && this.topic.isAssigned();
            }
        });
        api.registerTopicFooterButton({
            id: "reassign-self-mobile",
            icon() {
                return "user-plus";
            },
            translatedTitle() {
                return _I18n.default.t("discourse_assign.reassign.to_self_help");
            },
            translatedAriaLabel() {
                return _I18n.default.t("discourse_assign.reassign.to_self_help");
            },
            translatedLabel() {
                const label = _I18n.default.t("discourse_assign.reassign.to_self");
                return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span></span>`);
            },
            async action() {
                if (!this.currentUser ? .can_assign) {
                    return;
                }
                const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
                this.set("topic.assigned_to_user", null);
                this.set("topic.assigned_to_group", null);
                await taskActions.reassignUserToTopic(this.currentUser, this.topic);
                this.appEvents.trigger("post-stream:refresh", {
                    id: this.topic.postStream.firstPostId
                });
            },
            dropdown() {
                return this.currentUser ? .can_assign && this.topic.isAssigned();
            },
            classNames: ["assign"],
            dependentKeys: DEPENDENT_KEYS,
            displayed() {
                return (
                    // only display the button in the mobile view
                    this.site.mobileView && this.currentUser ? .can_assign && this.topic.isAssigned() && this.topic.assigned_to_user ? .username !== this.currentUser.username
                );
            }
        });
        api.registerTopicFooterButton({
            id: "reassign-mobile",
            icon() {
                return "group-plus";
            },
            translatedTitle() {
                return _I18n.default.t("discourse_assign.reassign.help");
            },
            translatedAriaLabel() {
                return _I18n.default.t("discourse_assign.reassign.help");
            },
            translatedLabel() {
                const label = _I18n.default.t("discourse_assign.reassign.title_w_ellipsis");
                return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span></span>`);
            },
            async action() {
                if (!this.currentUser ? .can_assign) {
                    return;
                }
                const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
                await taskActions.showAssignModal(this.topic, {
                    targetType: "Topic",
                    isAssigned: this.topic.isAssigned(),
                    onSuccess: () => this.appEvents.trigger("post-stream:refresh", {
                        id: this.topic.postStream.firstPostId
                    })
                });
            },
            dropdown() {
                return this.currentUser ? .can_assign && this.topic.isAssigned();
            },
            classNames: ["assign"],
            dependentKeys: DEPENDENT_KEYS,
            displayed() {
                // only display the button in the mobile view
                return this.currentUser ? .can_assign && this.site.mobileView;
            }
        });
    }

    function initialize(api) {
        const siteSettings = api.container.lookup("service:site-settings");
        const currentUser = api.getCurrentUser();
        if (siteSettings.assigns_public || currentUser ? .can_assign) {
            api.addNavigationBarItem({
                name: "unassigned",
                customFilter: category => {
                    return category ? .custom_fields ? .enable_unassigned_filter === "true";
                },
                customHref: category => {
                    if (category) {
                        return (0, _getUrl.default)(category.url) + "/l/latest?status=open&assigned=nobody";
                    }
                },
                forceActive: (category, args) => {
                    const queryParams = args.currentRouteQueryParams;
                    return queryParams && Object.keys(queryParams).length === 2 && queryParams["assigned"] === "nobody" && queryParams["status"] === "open";
                },
                before: "top"
            });
            if (api.getCurrentUser() ? .can_assign) {
                api.addPostMenuButton("assign", post => {
                    if (post.firstPost) {
                        return;
                    }
                    if (post.assigned_to_user || post.assigned_to_group) {
                        return {
                            action: "unassignPost",
                            icon: "user-times",
                            className: "unassign-post",
                            title: "discourse_assign.unassign_post.title",
                            position: post.assigned_to_user ? .id === api.getCurrentUser().id ? "first" : "second-last-hidden"
                        };
                    } else {
                        return {
                            action: "assignPost",
                            icon: "user-plus",
                            className: "assign-post",
                            title: "discourse_assign.assign_post.title",
                            position: "second-last-hidden"
                        };
                    }
                });
                api.attachWidgetAction("post", "assignPost", function() {
                    const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
                    taskActions.showAssignModal(this.model, {
                        isAssigned: false,
                        targetType: "Post"
                    });
                });
                api.attachWidgetAction("post", "unassignPost", function() {
                    const taskActions = (0, _application.getOwner)(this).lookup("service:task-actions");
                    taskActions.unassign(this.model.id, "Post").then(() => {
                        delete this.model.topic.indirectly_assigned_to[this.model.id];
                    });
                });
            }
        }
        api.addPostSmallActionClassesCallback(post => {
            if (post.actionCode.includes("assigned") && !siteSettings.assigns_public) {
                return ["private-assign"];
            }
        });
        api.addAdvancedSearchOptions(api.getCurrentUser() ? .can_assign ? {
            inOptionsForUsers: [{
                name: _I18n.default.t("search.advanced.in.assigned"),
                value: "assigned"
            }, {
                name: _I18n.default.t("search.advanced.in.unassigned"),
                value: "unassigned"
            }]
        } : {});

        function assignedToUserPath(assignedToUser) {
            return (0, _getUrl.default)(siteSettings.assigns_user_url_path.replace("{username}", assignedToUser.username));
        }

        function assignedToGroupPath(assignedToGroup) {
            return (0, _getUrl.default)(`/g/${assignedToGroup.name}/assigned/everyone`);
        }
        api.modifyClass("model:bookmark", dt7948.p({
            pluginId: PLUGIN_ID,
            assignedToUserPath(assignedToUser) {
                return assignedToUserPath(assignedToUser);
            },
            assignedToGroupPath(assignedToGroup) {
                return assignedToGroupPath(assignedToGroup);
            }
        }, [
            ["method", "assignedToUserPath", [(0, _decorators.default)("assigned_to_user")]],
            ["method", "assignedToGroupPath", [(0, _decorators.default)("assigned_to_group")]]
        ]));
        api.modifyClass("component:topic-notifications-button", Superclass => class extends Superclass {
            get reasonText() {
                if (this.currentUser.never_auto_track_topics && this.args.topic.get("assigned_to_user.username") === this.currentUser.username) {
                    return _I18n.default.t("notification_reason.user");
                }
                return super.reasonText;
            }
        });
        api.addPostSmallActionIcon("assigned", "user-plus");
        api.addPostSmallActionIcon("assigned_to_post", "user-plus");
        api.addPostSmallActionIcon("assigned_group", "group-plus");
        api.addPostSmallActionIcon("assigned_group_to_post", "group-plus");
        api.addPostSmallActionIcon("unassigned", "user-times");
        api.addPostSmallActionIcon("unassigned_group", "group-times");
        api.addPostSmallActionIcon("unassigned_from_post", "user-times");
        api.addPostSmallActionIcon("unassigned_group_from_post", "group-times");
        api.includePostAttributes("assigned_to_user", "assigned_to_group");
        api.addPostSmallActionIcon("reassigned", "user-plus");
        api.addPostSmallActionIcon("reassigned_group", "group-plus");
        api.addPostTransformCallback(transformed => {
            if (["assigned", "unassigned", "reassigned", "assigned_group", "unassigned_group", "reassigned_group", "assigned_to_post", "assigned_group_to_post", "unassigned_from_post", "unassigned_group_from_post", "details_change", "note_change", "status_change"].includes(transformed.actionCode)) {
                transformed.isSmallAction = true;
                transformed.canEdit = true;
            }
        });
        api.addDiscoveryQueryParam("assigned", {
            replace: true,
            refreshModel: true
        });
        api.addTagsHtmlCallback(function(topic) {
            let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            const [assignedToUser, assignedToGroup, topicNote] = Object.values(topic.getProperties("assigned_to_user", "assigned_to_group", "assignment_note", "assignment_status"));
            const topicAssignee = {
                assignee: assignedToUser || assignedToGroup,
                note: topicNote
            };
            let assignedToIndirectly;
            if (topic.indirectly_assigned_to) {
                assignedToIndirectly = Object.entries(topic.indirectly_assigned_to).map(_ref2 => {
                    let [key, value] = _ref2;
                    value.assigned_to.assignedToPostId = key;
                    return value;
                });
            } else {
                assignedToIndirectly = [];
            }
            const assignedTo = [].concat(topicAssignee, assignedToIndirectly.map(assigned => ({
                assignee: assigned.assigned_to,
                note: assigned.assignment_note
            }))).filter(_ref3 => {
                let {
                    assignee
                } = _ref3;
                return assignee;
            }).flat();
            if (assignedTo) {
                return assignedTo.map(_ref4 => {
                    let {
                        assignee,
                        note
                    } = _ref4;
                    let assignedPath;
                    if (assignee.assignedToPostId) {
                        assignedPath = `/p/${assignee.assignedToPostId}`;
                    } else {
                        assignedPath = `/t/${topic.id}`;
                    }
                    const icon = (0, _iconLibrary.iconHTML)(assignee.username ? "user-plus" : "group-plus");
                    const name = assignee.username || assignee.name;
                    const tagName = params.tagName || "a";
                    const href = tagName === "a" ? `href="${(0, _getUrl.default)(assignedPath)}" data-auto-route="true"` : "";
                    return `<${tagName} class="assigned-to discourse-tag simple" ${href}>${icon}<span title="${(0, _utilities.escapeExpression)(note)}">${name}</span></${tagName}>`;
                }).join("");
            }
        });
        api.createWidget("assigned-to-post", {
            html(attrs) {
                return new _renderGlimmer.default(this, "p.assigned-to", (0, _templateFactory.createTemplateFactory)(
                    /*
                      <AssignedToPost @assignedToUser={{@data.assignedToUser}} @assignedToGroup={{@data.assignedToGroup}} @href={{@data.href}} @post={{@data.post}} />
                    */
                    {
                        "id": "3BevrNiB",
                        "block": "[[[8,[39,0],null,[[\"@assignedToUser\",\"@assignedToGroup\",\"@href\",\"@post\"],[[30,1,[\"assignedToUser\"]],[30,1,[\"assignedToGroup\"]],[30,1,[\"href\"]],[30,1,[\"post\"]]]],null]],[\"@data\"],false,[\"assigned-to-post\"]]",
                        "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/initializers/extend-for-assigns.js",
                        "isStrictMode": false
                    }), {
                    assignedToUser: attrs.post.assigned_to_user,
                    assignedToGroup: attrs.post.assigned_to_group,
                    href: attrs.href,
                    post: attrs.post
                });
            }
        });
        api.createWidget("assigned-to-first-post", {
            html(attrs) {
                const topic = attrs.topic;
                const [assignedToUser, assignedToGroup, indirectlyAssignedTo] = [topic.assigned_to_user, topic.assigned_to_group, topic.indirectly_assigned_to];
                const assigneeElements = [];
                const assignedHtml = (username, path, type) => {
                    return `<span class="assigned-to--${type}">${(0, _template.htmlSafe)(_I18n.default.t("discourse_assign.assigned_topic_to", {
            username,
            path
          }))}</span>`;
                };
                if (assignedToUser) {
                    assigneeElements.push((0, _virtualDom.h)("span.assignee", new _rawHtml.default({
                        html: assignedHtml(assignedToUser.username, assignedToUserPath(assignedToUser), "user")
                    })));
                }
                if (assignedToGroup) {
                    assigneeElements.push((0, _virtualDom.h)("span.assignee", new _rawHtml.default({
                        html: assignedHtml(assignedToGroup.name, assignedToGroupPath(assignedToGroup), "group")
                    })));
                }
                if (indirectlyAssignedTo) {
                    Object.keys(indirectlyAssignedTo).map(postId => {
                        const assignee = indirectlyAssignedTo[postId].assigned_to;
                        const postNumber = indirectlyAssignedTo[postId].post_number;
                        assigneeElements.push((0, _virtualDom.h)("span.assignee", [(0, _virtualDom.h)("a", {
                            attributes: {
                                class: "assigned-indirectly",
                                href: `${topic.url}/${postNumber}`
                            }
                        }, _I18n.default.t("discourse_assign.assign_post_to_multiple", {
                            post_number: postNumber,
                            username: assignee.username || assignee.name
                        }))]));
                    });
                }
                if (!(0, _utils.isEmpty)(assigneeElements)) {
                    return (0, _virtualDom.h)("p.assigned-to", [assignedToUser ? (0, _iconLibrary.iconNode)("user-plus") : (0, _iconLibrary.iconNode)("group-plus"), assignedToUser || assignedToGroup ? "" : (0, _virtualDom.h)("span.assign-text", _I18n.default.t("discourse_assign.assigned")), assigneeElements]);
                }
            }
        });
        api.modifyClass("model:group", {
            pluginId: PLUGIN_ID,
            asJSON() {
                return Object.assign({}, this._super(...arguments), {
                    assignable_level: this.assignable_level
                });
            }
        });
        api.modifyClass("controller:topic", {
            pluginId: PLUGIN_ID,
            subscribe() {
                this._super(...arguments);
                this.messageBus.subscribe("/staff/topic-assignment", data => {
                    const topic = this.model;
                    const topicId = topic.id;
                    if (data.topic_id === topicId) {
                        let post;
                        if (data.post_id) {
                            post = topic.postStream.posts.find(p => p.id === data.post_id);
                        }
                        const target = post || topic;
                        target.set("assignment_note", data.assignment_note);
                        target.set("assignment_status", data.assignment_status);
                        if (data.assigned_type === "User") {
                            target.set("assigned_to_user_id", data.type === "assigned" ? data.assigned_to.id : null);
                            target.set("assigned_to_user", data.assigned_to);
                        }
                        if (data.assigned_type === "Group") {
                            target.set("assigned_to_group_id", data.type === "assigned" ? data.assigned_to.id : null);
                            target.set("assigned_to_group", data.assigned_to);
                        }
                        if (data.post_id) {
                            if (data.type === "unassigned") {
                                delete topic.indirectly_assigned_to[data.post_number];
                            }
                            this.appEvents.trigger("post-stream:refresh", {
                                id: topic.postStream.posts[0].id
                            });
                            this.appEvents.trigger("post-stream:refresh", {
                                id: data.post_id
                            });
                        }
                        if (topic.closed) {
                            this.appEvents.trigger("post-stream:refresh", {
                                id: topic.postStream.posts[0].id
                            });
                        }
                    }
                    this.appEvents.trigger("header:update-topic", topic);
                    this.appEvents.trigger("post-stream:refresh", {
                        id: topic.postStream.posts[0].id
                    });
                });
            },
            unsubscribe() {
                this._super(...arguments);
                if (!this.model ? .id) {
                    return;
                }
                this.messageBus.unsubscribe("/staff/topic-assignment");
            }
        });
        api.decorateWidget("post-contents:after-cooked", dec => {
            const postModel = dec.getModel();
            if (postModel) {
                let assignedToUser, assignedToGroup, postAssignment, href;
                if (dec.attrs.post_number === 1) {
                    return dec.widget.attach("assigned-to-first-post", {
                        topic: postModel.topic
                    });
                } else {
                    postAssignment = postModel.topic.indirectly_assigned_to ? .[postModel.id] ? .assigned_to;
                    if (postAssignment ? .username) {
                        assignedToUser = postAssignment;
                    }
                    if (postAssignment ? .name) {
                        assignedToGroup = postAssignment;
                    }
                }
                if (assignedToUser || assignedToGroup) {
                    href = assignedToUser ? assignedToUserPath(assignedToUser) : assignedToGroupPath(assignedToGroup);
                }
                if (href) {
                    return dec.widget.attach("assigned-to-post", {
                        assignedToUser,
                        assignedToGroup,
                        href,
                        post: postModel
                    });
                }
            }
        });
        api.replaceIcon("notification.assigned", "user-plus");
        api.replaceIcon("notification.discourse_assign.assign_group_notification", "group-plus");
        api.modifyClass("controller:preferences/notifications", {
            pluginId: PLUGIN_ID,
            actions: {
                save() {
                    this.saveAttrNames.push("custom_fields");
                    this._super(...arguments);
                }
            }
        });
        api.addKeyboardShortcut("g a", "", {
            path: "/my/activity/assigned"
        });
    }
    const REGEXP_USERNAME_PREFIX = /^(assigned:)/gi;
    var _default = _exports.default = {
        name: "extend-for-assign",
        initialize(container) {
            const siteSettings = container.lookup("service:site-settings");
            if (!siteSettings.assign_enabled) {
                return;
            }
            const currentUser = container.lookup("service:current-user");
            if (currentUser ? .can_assign) {
                _searchAdvancedOptions.default.reopen({
                    updateSearchTermForAssignedUsername() {
                        const match = this.filterBlocks(REGEXP_USERNAME_PREFIX);
                        const userFilter = this.searchedTerms ? .assigned;
                        let searchTerm = this.searchTerm || "";
                        let keyword = "assigned";
                        if (userFilter ? .length !== 0) {
                            if (match.length !== 0) {
                                searchTerm = searchTerm.replace(match[0], `${keyword}:${userFilter}`);
                            } else {
                                searchTerm += ` ${keyword}:${userFilter}`;
                            }
                            this._updateSearchTerm(searchTerm);
                        } else if (match.length !== 0) {
                            searchTerm = searchTerm.replace(match[0], "");
                            this._updateSearchTerm(searchTerm);
                        }
                    }
                });
            }
            (0, _pluginApi.withPluginApi)("0.13.0", api => {
                (0, _topic.extendTopicModel)(api, PLUGIN_ID);
                initialize(api);
                registerTopicFooterButtons(api);
                api.addSearchSuggestion("in:assigned");
                api.addSearchSuggestion("in:unassigned");
                api.addGroupPostSmallActionCode("assigned_group");
                api.addGroupPostSmallActionCode("reassigned_group");
                api.addGroupPostSmallActionCode("unassigned_group");
                api.addGroupPostSmallActionCode("assigned_group_to_post");
                api.addGroupPostSmallActionCode("unassigned_group_from_post");
                api.addUserSearchOption("assignableGroups");
                api.addBulkActionButton({
                    id: "assign-topics",
                    label: "topics.bulk.assign",
                    icon: "user-plus",
                    class: "btn-default assign-topics",
                    action(_ref5) {
                        let {
                            setComponent
                        } = _ref5;
                        setComponent(_bulkAssignUser.default);
                    },
                    actionType: "setComponent"
                });
                api.addBulkActionButton({
                    id: "unassign-topics",
                    label: "topics.bulk.unassign",
                    icon: "user-times",
                    class: "btn-default unassign-topics",
                    action(_ref6) {
                        let {
                            performAndRefresh
                        } = _ref6;
                        performAndRefresh({
                            type: "unassign"
                        });
                    },
                    actionType: "performAndRefresh"
                });
            });
        }
    };
});