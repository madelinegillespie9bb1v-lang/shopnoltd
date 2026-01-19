define("discourse/plugins/discourse-user-notes/discourse-user-notes/lib/user-notes", ["exports", "discourse-common/lib/get-owner", "discourse/plugins/discourse-user-notes/discourse/components/modal/user-notes"], function(_exports, _getOwner, _userNotes) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.showUserNotes = showUserNotes;

    function showUserNotes(store, userId, callback, opts) {
        const modal = (0, _getOwner.getOwnerWithFallback)(this).lookup("service:modal");
        opts = opts || {};
        return store.find("user-note", {
            user_id: userId
        }).then(model => {
            return modal.show(_userNotes.default, {
                model: {
                    note: model,
                    userId,
                    callback,
                    postId: opts.postId
                }
            });
        });
    }
});