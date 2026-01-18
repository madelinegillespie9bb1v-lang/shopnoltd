define("discourse/plugins/docker_manager/discourse/routes/update-index", ["exports", "@ember/routing/route"], function(_exports, _route) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UpgradeIndex extends _route.default {
        model() {
            return this.modelFor("update");
        }
        async loadRepos(list) {
            for (const repo of list) {
                await repo.findLatest();
            }
        }
        setupController(controller, model) {
            super.setupController(...arguments);
            this.loadRepos(model);
        }
    }
    _exports.default = UpgradeIndex;
});