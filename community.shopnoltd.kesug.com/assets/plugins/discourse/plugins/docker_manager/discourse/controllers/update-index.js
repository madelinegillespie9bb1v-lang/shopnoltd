define("discourse/plugins/docker_manager/discourse/controllers/update-index", ["exports", "@glimmer/tracking", "@ember/controller", "@ember/object", "@ember/service", "discourse/plugins/docker_manager/discourse/models/repo"], function(_exports, _tracking, _controller, _object, _service, _repo) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UpgradeIndex extends _controller.default {
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        get managerRepo() {
            return this.model.find(repo => repo.id === "docker_manager");
        }
        static# _2 = (() => dt7948.n(this.prototype, "managerRepo", [_tracking.cached]))();
        get outdated() {
            return _repo.needsImageUpgrade;
        }
        get upgradeAllButtonDisabled() {
            return !this.managerRepo.upToDate || this.allUpToDate;
        }
        get allUpToDate() {
            return this.model.every(repo => repo.upToDate);
        }
        upgradeAllButton() {
            this.router.transitionTo("update.show", "all");
        }
        static# _3 = (() => dt7948.n(this.prototype, "upgradeAllButton", [_object.action]))();
    }
    _exports.default = UpgradeIndex;
});