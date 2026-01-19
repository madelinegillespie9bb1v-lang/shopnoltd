define("discourse/plugins/discourse-topic-voting/discourse/initializers/discourse-topic-voting", ["exports", "discourse/lib/plugin-api", "discourse/models/nav-item", "I18n"], function(_exports, _pluginApi, _navItem, _I18n) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "discourse-topic-voting",
        initialize() {
            (0, _pluginApi.withPluginApi)("0.8.32", api => {
                const siteSettings = api.container.lookup("service:site-settings");
                if (siteSettings.topic_voting_enabled) {
                    const pageSearchController = api.container.lookup("controller:full-page-search");
                    pageSearchController.sortOrders.pushObject({
                        name: _I18n.default.t("search.most_votes"),
                        id: 5,
                        term: "order:votes"
                    });
                    api.addNavigationBarItem({
                        name: "votes",
                        before: "top",
                        customFilter: category => {
                            return category && category.can_vote;
                        },
                        customHref: (category, args) => {
                            const path = _navItem.default.pathFor("latest", args);
                            return `${path}?order=votes`;
                        },
                        forceActive: (category, args, router) => {
                            const queryParams = router.currentRoute.queryParams;
                            return queryParams && Object.keys(queryParams).length === 1 && queryParams["order"] === "votes";
                        }
                    });
                    api.addNavigationBarItem({
                        name: "my_votes",
                        before: "top",
                        customFilter: category => {
                            return category && category.can_vote && api.getCurrentUser();
                        },
                        customHref: (category, args) => {
                            const path = _navItem.default.pathFor("latest", args);
                            return `${path}?state=my_votes`;
                        },
                        forceActive: (category, args, router) => {
                            const queryParams = router.currentRoute.queryParams;
                            return queryParams && Object.keys(queryParams).length === 1 && queryParams["state"] === "my_votes";
                        }
                    });
                }
            });
            (0, _pluginApi.withPluginApi)("0.11.7", api => {
                const siteSettings = api.container.lookup("service:site-settings");
                if (siteSettings.topic_voting_enabled) {
                    api.addSearchSuggestion("order:votes");
                }
            });
        }
    };
});