define("discourse/plugins/docker_manager/discourse/routes/update", ["exports", "@ember/routing/route", "@ember/service", "discourse-common/utils/decorators", "I18n", "discourse/plugins/docker_manager/discourse/models/repo"], function(_exports, _route, _service, _decorators, _I18n, _repo) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class Upgrade extends _route.default {
        static# _ = (() => dt7948.g(this.prototype, "messageBus", [_service.inject]))();#
        messageBus = (() => (dt7948.i(this, "messageBus"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "upgradeStore", [_service.inject]))();#
        upgradeStore = (() => (dt7948.i(this, "upgradeStore"), void 0))();
        model() {
            return _repo.default.findAll();
        }
        activate() {
            this.messageBus.subscribe("/docker/update", this.onUpgradeMessage);
        }
        deactivate() {
            this.messageBus.unsubscribe("/docker/update", this.onUpgradeMessage);
        }
        setupController(controller, model) {
            const discourse = model.find(repo => repo.id === "discourse");
            if (discourse ? .branch === "origin/main") {
                // Special case: If the branch is "main" warn user
                controller.appendBannerHtml(_I18n.default.t("admin.docker.main_branch_warning", {
                    url: "https://meta.discourse.org/t/17014"
                }));
            }
        }
        onUpgradeMessage(msg) {
            switch (msg.type) {
                case "log":
                    this.upgradeStore.consoleOutput = this.upgradeStore.consoleOutput + msg.value + "\n";
                    break;
                case "percent":
                    this.upgradeStore.progressPercentage = msg.value;
                    break;
                case "status":
                    this.upgradeStore.upgradeStatus = msg.value;
                    // Get the resolved model
                    const model = this.modelFor("update");
                    if (msg.value === "complete") {
                        for (const repo of model) {
                            if (repo.upgrading) {
                                repo.version = repo.latest ? .version;
                            }
                        }
                        this.session.requiresRefresh = true;
                    }
                    if (msg.value === "complete" || msg.value === "failed") {
                        for (const repo of model) {
                            repo.upgrading = false;
                        }
                    }
                    break;
            }
        }
        static# _3 = (() => dt7948.n(this.prototype, "onUpgradeMessage", [_decorators.bind]))();
    }
    _exports.default = Upgrade;
});