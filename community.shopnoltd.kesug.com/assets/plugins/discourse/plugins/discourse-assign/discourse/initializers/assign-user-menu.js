define("discourse/plugins/discourse-assign/discourse/initializers/assign-user-menu", ["exports", "@ember/template", "discourse/lib/plugin-api", "discourse/lib/text", "I18n", "discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list"], function(_exports, _template, _pluginApi, _text, _I18n, _assignsList) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "assign-user-menu",
        initialize(container) {
            (0, _pluginApi.withPluginApi)("1.2.0", api => {
                const siteSettings = container.lookup("service:site-settings");
                if (!siteSettings.assign_enabled) {
                    return;
                }
                const currentUser = api.getCurrentUser();
                if (!currentUser ? .can_assign) {
                    return;
                }
                if (api.registerNotificationTypeRenderer) {
                    api.registerNotificationTypeRenderer("assigned", NotificationItemBase => {
                        return class extends NotificationItemBase {
                            get linkTitle() {
                                if (this.isGroup()) {
                                    return _I18n.default.t(`user.assigned_to_group.${this.postOrTopic()}`, {
                                        group_name: this.notification.data.display_username
                                    });
                                }
                                return _I18n.default.t(`user.assigned_to_you.${this.postOrTopic()}`);
                            }
                            get icon() {
                                return this.isGroup() ? "group-plus" : "user-plus";
                            }
                            get label() {
                                if (!this.isGroup()) {
                                    return "";
                                }
                                return this.notification.data.display_username;
                            }
                            get description() {
                                return (0, _template.htmlSafe)((0, _text.emojiUnescape)(_I18n.default.t(`user.assignment_description.${this.postOrTopic()}`, {
                                    topic_title: this.notification.fancy_title,
                                    post_number: this.notification.post_number
                                })));
                            }
                            isGroup() {
                                return this.notification.data.message === "discourse_assign.assign_group_notification";
                            }
                            postOrTopic() {
                                return this.notification.post_number === 1 ? "topic" : "post";
                            }
                        };
                    });
                }
                if (api.registerUserMenuTab) {
                    api.registerUserMenuTab(UserMenuTab => {
                        return class extends UserMenuTab {
                            id = "assign-list";
                            panelComponent = (() => _assignsList.default)();
                            icon = "user-plus";
                            notificationTypes = ["assigned"];
                            get count() {
                                return this.getUnreadCountForType("assigned");
                            }
                            get linkWhenActive() {
                                return `${this.currentUser.path}/activity/assigned`;
                            }
                        };
                    });
                }
            });
        }
    };
});