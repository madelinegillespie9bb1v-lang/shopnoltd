define("discourse/plugins/discourse-assign/discourse/pre-initializers/extend-category-for-assign", ["exports", "@ember/object", "discourse/models/category"], function(_exports, _object, _category) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "extend-category-for-assign",
        before: "inject-discourse-objects",
        initialize() {
            _category.default.reopen({
                enable_unassigned_filter: (0, _object.computed)("custom_fields.enable_unassigned_filter", {
                    get() {
                        return this ? .custom_fields ? .enable_unassigned_filter === "true";
                    }
                })
            });
        }
    };
});