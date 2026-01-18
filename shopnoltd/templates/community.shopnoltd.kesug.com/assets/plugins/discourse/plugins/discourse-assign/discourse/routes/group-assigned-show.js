define("discourse/plugins/discourse-assign/discourse/routes/group-assigned-show", ["exports", "discourse/lib/cached-topic-list", "discourse/routes/discourse"], function(_exports, _cachedTopicList, _discourse) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class GroupAssignedShow extends _discourse.default {
        model(params) {
            let filter;
            if (["everyone", this.modelFor("group").name].includes(params.filter)) {
                filter = `topics/group-topics-assigned/${this.modelFor("group").name}`;
            } else {
                filter = `topics/messages-assigned/${params.filter}`;
            }
            return (0, _cachedTopicList.findOrResetCachedTopicList)(this.session, filter) || this.store.findFiltered("topicList", {
                filter,
                params: {
                    order: params.order,
                    ascending: params.ascending,
                    search: params.search,
                    direct: params.filter !== "everyone"
                }
            });
        }
        setupController(controller, model) {
            controller.setProperties({
                model,
                search: this.currentModel.params.search
            });
        }
    }
    _exports.default = GroupAssignedShow;
});