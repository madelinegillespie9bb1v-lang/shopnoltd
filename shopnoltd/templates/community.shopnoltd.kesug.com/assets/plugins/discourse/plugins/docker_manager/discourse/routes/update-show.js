define("discourse/plugins/docker_manager/discourse/routes/update-show", ["exports", "@ember/routing/route", "@ember/service", "discourse/plugins/docker_manager/discourse/models/repo"], function(_exports, _route, _service, _repo2) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UpgradeShow extends _route.default {
        static# _ = (() => dt7948.g(this.prototype, "upgradeStore", [_service.inject]))();#
        upgradeStore = (() => (dt7948.i(this, "upgradeStore"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        model(params) {
            if (params.id === "all") {
                return _repo2.default.findAll();
            }
            return _repo2.default.find(params.id);
        }
        async afterModel(model) {
            if (!model) {
                this.router.replaceWith("/404");
                return;
            }
            if (Array.isArray(model)) {
                const repos = await _repo2.default.findLatestAll();
                for (const repoData of repos) {
                    const repo = model.find(_repo => _repo.path === repoData.path);
                    if (!repo) {
                        return;
                    }
                    delete repoData.path;
                    for (const [key, value] of Object.entries(repoData)) {
                        repo.latest[key] = value;
                    }
                }
                const progress = await _repo2.default.findAllProgress(model.filter(repo => !repo.upToDate));
                this.upgradeStore.reset({
                    consoleOutput: progress.logs,
                    progressPercentage: progress.percentage,
                    upgradeStatus: progress.status,
                    repos
                });
                return;
            }
            await _repo2.default.findUpgrading();
            await model.findLatest();
            const progress = await model.findProgress();
            this.upgradeStore.reset({
                consoleOutput: progress.logs,
                progressPercentage: progress.percentage,
                upgradeStatus: progress.status,
                repos: [model.id]
            });
        }
    }
    _exports.default = UpgradeShow;
});