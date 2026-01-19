define("discourse/plugins/discourse-assign/discourse/connectors/above-review-filters/assigned-to-filter", ["exports", "@ember/object"], function(_exports, _object) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = dt7948.p({
        updateAssignedTo(selected) {
            this.set("additionalFilters.assigned_to", selected.firstObject);
        },
        shouldRender(args) {
            return args.additionalFilters;
        },
        setupComponent(args, component) {
            const groupIDs = (component.siteSettings.assign_allowed_on_groups || "").split("|").filter(Boolean);
            const groupNames = this.site.groups.filter(group => groupIDs.includes(group.id.toString())).mapBy("name");
            component.set("allowedGroups", groupNames);
        }
    }, [
        ["method", "updateAssignedTo", [_object.action]]
    ]);
});