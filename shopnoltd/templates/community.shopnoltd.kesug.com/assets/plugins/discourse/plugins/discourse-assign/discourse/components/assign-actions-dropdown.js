define("discourse/plugins/discourse-assign/discourse/components/assign-actions-dropdown", ["exports", "@ember/object", "I18n", "select-kit/components/dropdown-select-box"], function(_exports, _object, _I18n, _dropdownSelectBox) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = _dropdownSelectBox.default.extend(dt7948.p({
        classNames: ["assign-actions-dropdown"],
        headerIcon: null,
        allowInitialValueMutation: false,
        showFullTitle: true,
        selectKitOptions: {
            icon: null,
            translatedNone: "...",
            showFullTitle: true
        },
        computeContent() {
            let options = [];
            if (this.assignee) {
                options = options.concat([{
                    id: "unassign",
                    icon: this.group ? "group-times" : "user-times",
                    name: _I18n.default.t("discourse_assign.unassign.title"),
                    description: _I18n.default.t("discourse_assign.unassign.help", {
                        username: this.assignee
                    })
                }, {
                    id: "reassign",
                    icon: "users",
                    name: _I18n.default.t("discourse_assign.reassign.title"),
                    description: _I18n.default.t("discourse_assign.reassign.help")
                }]);
            }
            if (this.topic.indirectly_assigned_to) {
                Object.entries(this.topic.indirectly_assigned_to).forEach(entry => {
                    const [postId, assignment_map] = entry;
                    const assignee = assignment_map.assigned_to;
                    options = options.concat({
                        id: `unassign_post_${postId}`,
                        icon: assignee.username ? "user-times" : "group-times",
                        name: _I18n.default.t("discourse_assign.unassign_post.title"),
                        description: _I18n.default.t("discourse_assign.unassign_post.help", {
                            username: assignee.username || assignee.name
                        })
                    });
                });
            }
            return options;
        },
        onChange(id) {
            switch (id) {
                case "unassign":
                    this.unassign(this.topic.id);
                    break;
                case "reassign":
                    this.reassign(this.topic, this.assignee);
                    break;
            }
            const postId = id.match(/unassign_post_(\d+)/) ? .[1];
            if (postId) {
                this.unassign(postId, "Post");
            }
        }
    }, [
        ["method", "onChange", [_object.action]]
    ]));
});