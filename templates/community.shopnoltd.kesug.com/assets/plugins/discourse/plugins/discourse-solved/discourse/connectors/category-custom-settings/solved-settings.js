define("discourse/plugins/discourse-solved/discourse/connectors/category-custom-settings/solved-settings", ["exports"], function(_exports) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        actions: {
            onChangeSetting(value) {
                this.set("category.custom_fields.enable_accepted_answers", value ? "true" : "false");
            }
        }
    };
});