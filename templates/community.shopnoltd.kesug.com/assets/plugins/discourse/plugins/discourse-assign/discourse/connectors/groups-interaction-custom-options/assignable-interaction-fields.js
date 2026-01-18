define("discourse/plugins/discourse-assign/discourse/connectors/groups-interaction-custom-options/assignable-interaction-fields", ["exports", "@glimmer/component", "@ember/object", "I18n"], function(_exports, _component, _object, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class AssignableInteractionFields extends _component.default {
        assignableLevelOptions = (() => [{
            name: _I18n.default.t("groups.alias_levels.nobody"),
            value: 0
        }, {
            name: _I18n.default.t("groups.alias_levels.only_admins"),
            value: 1
        }, {
            name: _I18n.default.t("groups.alias_levels.mods_and_admins"),
            value: 2
        }, {
            name: _I18n.default.t("groups.alias_levels.members_mods_and_admins"),
            value: 3
        }, {
            name: _I18n.default.t("groups.alias_levels.owners_mods_and_admins"),
            value: 4
        }, {
            name: _I18n.default.t("groups.alias_levels.everyone"),
            value: 99
        }])();
        get assignableLevel() {
            return this.args.outletArgs.model.get("assignable_level") || 0;
        }
        onChangeAssignableLevel(level) {
            this.args.outletArgs.model.set("assignable_level", level);
        }
        static# _ = (() => dt7948.n(this.prototype, "onChangeAssignableLevel", [_object.action]))();
    }
    _exports.default = AssignableInteractionFields;
});