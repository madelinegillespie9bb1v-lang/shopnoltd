define("discourse/plugins/docker_manager/discourse/controllers/update-show", ["exports", "@ember/controller", "@ember/object", "@ember/service", "discourse-common/lib/helpers", "I18n", "discourse/plugins/docker_manager/discourse/models/repo"], function(_exports, _controller, _object, _service, _helpers, _I18n, _repo) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UpgradeShow extends _controller.default {
        static# _ = (() => dt7948.g(this.prototype, "messageBus", [_service.inject]))();#
        messageBus = (() => (dt7948.i(this, "messageBus"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "dialog", [_service.inject]))();#
        dialog = (() => (dt7948.i(this, "dialog"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "upgradeStore", [_service.inject]))();#
        upgradeStore = (() => (dt7948.i(this, "upgradeStore"), void 0))();
        get complete() {
            return this.upgradeStore.upgradeStatus === "complete";
        }
        get failed() {
            return this.upgradeStore.upgradeStatus === "failed";
        }
        get multiUpgrade() {
            return this.model.length > 1;
        }
        get title() {
            if (this.multiUpgrade) {
                return _I18n.default.t("admin.docker.update_everything");
            } else {
                return _I18n.default.t("admin.docker.update_repo", {
                    name: this.model.name
                });
            }
        }
        get isUpToDate() {
            return (0, _helpers.makeArray)(this.model).every(repo => repo.upToDate);
        }
        get upgrading() {
            return (0, _helpers.makeArray)(this.model).some(repo => repo.upgrading);
        }
        start() {
            this.upgradeStore.reset();
            if (this.multiUpgrade) {
                for (const repo of this.model) {
                    if (!repo.upToDate) {
                        repo.upgrading = true;
                    }
                }
                return _repo.default.upgradeAll();
            }
            if (this.model.upgrading) {
                return;
            }
            return this.model.startUpgrade();
        }
        static# _4 = (() => dt7948.n(this.prototype, "start", [_object.action]))();
        resetUpgrade() {
            this.dialog.confirm({
                message: _I18n.default.t("admin.docker.reset_warning"),
                didConfirm: async () => {
                    if (this.multiUpgrade) {
                        try {
                            await _repo.default.resetAll(this.model.filter(repo => !repo.upToDate));
                        } finally {
                            this.upgradeStore.reset();
                            for (const repo of this.model) {
                                repo.upgrading = false;
                            }
                        }
                        return;
                    }
                    await this.model.resetUpgrade();
                    this.upgradeStore.reset();
                }
            });
        }
        static# _5 = (() => dt7948.n(this.prototype, "resetUpgrade", [_object.action]))();
    }
    _exports.default = UpgradeShow;
});