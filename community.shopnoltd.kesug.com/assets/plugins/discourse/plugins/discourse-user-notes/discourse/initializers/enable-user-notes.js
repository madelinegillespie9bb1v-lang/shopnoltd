define("discourse/plugins/discourse-user-notes/discourse/initializers/enable-user-notes", ["exports", "discourse/lib/plugin-api", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "discourse/plugins/discourse-user-notes/discourse-user-notes/lib/user-notes"], function(_exports, _pluginApi, _iconLibrary, _decorators, _userNotes) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const PLUGIN_ID = "discourse-user-notes";
    var _default = _exports.default = {
        name: "enable-user-notes",
        initialize(container) {
            const siteSettings = container.lookup("service:site-settings");
            const currentUser = container.lookup("service:current-user");
            const appEvents = container.lookup("service:app-events");
            if (!siteSettings.user_notes_enabled || !currentUser ? .staff) {
                return;
            }
            const store = container.lookup("service:store");
            (0, _pluginApi.withPluginApi)("0.8.15", api => {
                function widgetShowUserNotes() {
                    (0, _userNotes.showUserNotes)(this.store, this.attrs.user_id, count => {
                        this.sendWidgetAction("refreshUserNotes", count);
                    }, {
                        postId: this.attrs.id
                    });
                }
                api.attachWidgetAction("post", "refreshUserNotes", function(count) {
                    const cfs = this.model.user_custom_fields || {};
                    cfs.user_notes_count = count;
                    this.model.set("user_custom_fields", cfs);
                });
                api.modifyClass("controller:user", dt7948.p({
                    pluginId: PLUGIN_ID,
                    userNotesCount: null,
                    _modelChanged: function() {
                        this.set("userNotesCount", this.get("model.custom_fields.user_notes_count") || 0);
                    },
                    actions: {
                        showUserNotes() {
                            (0, _userNotes.showUserNotes)(store, this.model.id, count => this.set("userNotesCount", count));
                        }
                    }
                }, [
                    ["field", "_modelChanged", [(0, _decorators.observes)("model"), (0, _decorators.on)("init")]]
                ]));
                const mobileView = api.container.lookup("service:site").mobileView;
                const loc = mobileView ? "before" : "after";
                api.decorateWidget(`poster-name:${loc}`, dec => {
                    if (dec.widget.settings.hideNotes) {
                        return;
                    }
                    const post = dec.getModel();
                    if (!post) {
                        return;
                    }
                    const ucf = post.user_custom_fields || {};
                    if (ucf.user_notes_count > 0) {
                        return dec.attach("user-notes-icon");
                    }
                });
                api.decorateWidget(`post-avatar:after`, dec => {
                    if (!dec.widget.settings.showNotes) {
                        return;
                    }
                    const post = dec.getModel();
                    if (!post) {
                        return;
                    }
                    const ucf = post.user_custom_fields || {};
                    if (ucf.user_notes_count > 0) {
                        return dec.attach("user-notes-icon");
                    }
                });
                api.addPostAdminMenuButton(attrs => {
                    return {
                        icon: "pencil-alt",
                        label: "user_notes.attach",
                        action: post => {
                            (0, _userNotes.showUserNotes)(store, attrs.user_id, count => {
                                const ucf = post.user_custom_fields || {};
                                ucf.user_notes_count = count;
                                post.set("user_custom_fields", ucf);
                                appEvents.trigger("post-stream:refresh", {
                                    id: post.id
                                });
                            }, {
                                postId: attrs.id
                            });
                        },
                        secondaryAction: "closeAdminMenu",
                        className: "add-user-note"
                    };
                });
                api.attachWidgetAction("post", "showUserNotes", widgetShowUserNotes);
                api.createWidget("user-notes-icon", {
                    services: ["site-settings"],
                    tagName: "span.user-notes-icon",
                    click: widgetShowUserNotes,
                    html() {
                        if (this.siteSettings.enable_emoji) {
                            return this.attach("emoji", {
                                name: "pencil"
                            });
                        } else {
                            return (0, _iconLibrary.iconNode)("sticky-note");
                        }
                    }
                });
            });
        }
    };
});