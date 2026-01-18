define("discourse/plugins/discourse-user-notes/discourse-user-notes/connectors/after-reviewable-post-user/show-user-notes-on-flags", ["exports", "@ember/object", "@ember/owner", "discourse/lib/text", "I18n", "discourse/plugins/discourse-user-notes/discourse-user-notes/lib/user-notes"], function(_exports, _object, _owner, _text, _I18n, _userNotes) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        shouldRender(args, component) {
            return component.siteSettings.user_notes_enabled && args.user;
        },
        setupComponent(args, component) {
            const model = _object.default.create(args.user);
            const userNotesCount = model.get("custom_fields.user_notes_count") || 0;
            component.setProperties({
                userNotesCount,
                emojiEnabled: component.siteSettings.enable_emoji,
                emojiUrl: (0, _text.emojiUrlFor)("pencil"),
                userNotesTitle: _I18n.default.t("user_notes.show", {
                    count: userNotesCount
                })
            });
        },
        actions: {
            showUserNotes() {
                const store = (0, _owner.getOwner)(this).lookup("service:store");
                const user = this.get("args.user");
                (0, _userNotes.showUserNotes)(store, user.id, count => this.set("userNotesCount", count));
            }
        }
    };
});