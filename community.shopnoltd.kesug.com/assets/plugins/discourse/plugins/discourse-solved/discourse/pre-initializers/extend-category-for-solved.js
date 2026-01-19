define("discourse/plugins/discourse-solved/discourse/pre-initializers/extend-category-for-solved", ["exports", "@ember/object", "discourse/models/category"], function(_exports, _object, _category) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "extend-category-for-solved",
        before: "inject-discourse-objects",
        initialize() {
            _category.default.reopen({
                enable_accepted_answers: (0, _object.computed)("custom_fields.enable_accepted_answers", {
                    get(fieldName) {
                        return (0, _object.get)(this.custom_fields, fieldName) === "true";
                    }
                })
            });
        }
    };
});