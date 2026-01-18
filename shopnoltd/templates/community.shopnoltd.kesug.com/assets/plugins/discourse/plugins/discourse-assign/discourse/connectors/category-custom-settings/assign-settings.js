define("discourse/plugins/discourse-assign/discourse/connectors/category-custom-settings/assign-settings", ["exports", "@ember/object"], function(_exports, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = dt7948.p({
        onChangeSetting(value) {
            this.set("category.custom_fields.enable_unassigned_filter", value ? "true" : "false");
        }
    }, [
        ["method", "onChangeSetting", [_object.action]]
    ]);
});