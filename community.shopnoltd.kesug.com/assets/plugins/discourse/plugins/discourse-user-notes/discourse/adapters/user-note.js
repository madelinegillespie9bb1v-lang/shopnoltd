define("discourse/plugins/discourse-user-notes/discourse/adapters/user-note", ["exports", "discourse/adapters/rest", "discourse/lib/ajax"], function(_exports, _rest, _ajax) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = _rest.default.extend({
        destroyRecord(store, type, record) {
            const path = this.pathFor(store, type, record.id);
            return (0, _ajax.ajax)(`${path}?user_id=${record.user_id}`, {
                method: "DELETE"
            });
        }
    });
});