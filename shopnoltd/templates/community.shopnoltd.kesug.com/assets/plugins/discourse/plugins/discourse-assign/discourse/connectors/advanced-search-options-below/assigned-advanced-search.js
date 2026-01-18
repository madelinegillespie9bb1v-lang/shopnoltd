define("discourse/plugins/discourse-assign/discourse/connectors/advanced-search-options-below/assigned-advanced-search", ["exports", "@ember/object"], function(_exports, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = dt7948.p({
        shouldRender(args, component) {
            return component.currentUser ? .can_assign;
        },
        onChangeAssigned(value) {
            this.onChangeSearchedTermField("assigned", "updateSearchTermForAssignedUsername", value);
        }
    }, [
        ["method", "onChangeAssigned", [_object.action]]
    ]);
});