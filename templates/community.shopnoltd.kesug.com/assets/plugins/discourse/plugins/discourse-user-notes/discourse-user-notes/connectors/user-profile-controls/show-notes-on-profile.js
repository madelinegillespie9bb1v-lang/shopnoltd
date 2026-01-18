define("discourse/plugins/discourse-user-notes/discourse-user-notes/connectors/user-profile-controls/show-notes-on-profile", ["exports", "@ember/owner", "discourse/plugins/discourse-user-notes/discourse-user-notes/lib/user-notes"], function(_exports, _owner, _userNotes) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        shouldRender(args, component) {
            const {
                siteSettings,
                currentUser
            } = component;
            return siteSettings.user_notes_enabled && currentUser && currentUser.staff;
        },
        setupComponent(args, component) {
            const {
                model
            } = args;
            component.set("userNotesCount", model.user_notes_count || model.get("custom_fields.user_notes_count") || 0);
        },
        actions: {
            showUserNotes() {
                const store = (0, _owner.getOwner)(this).lookup("service:store");
                const user = this.get("args.model");
                (0, _userNotes.showUserNotes)(store, user.id, count => this.set("userNotesCount", count));
            }
        }
    };
});