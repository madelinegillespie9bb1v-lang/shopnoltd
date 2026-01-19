define("discourse/plugins/docker_manager/discourse/services/upgrade-store", ["exports", "@glimmer/tracking", "@ember/service"], function(_exports, _tracking, _service) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class UpgradeStore extends _service.default {
        static# _ = (() => dt7948.g(this.prototype, "consoleOutput", [_tracking.tracked], function() {
            return "";
        }))();#
        consoleOutput = (() => (dt7948.i(this, "consoleOutput"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "progressPercentage", [_tracking.tracked], function() {
            return 0;
        }))();#
        progressPercentage = (() => (dt7948.i(this, "progressPercentage"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "upgradeStatus", [_tracking.tracked], function() {
            return null;
        }))();#
        upgradeStatus = (() => (dt7948.i(this, "upgradeStatus"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "repos", [_tracking.tracked], function() {
            return [];
        }))();#
        repos = (() => (dt7948.i(this, "repos"), void 0))();
        get running() {
            return this.upgradeStatus === "running";
        }
        reset() {
            let {
                consoleOutput,
                progressPercentage,
                upgradeStatus,
                repos
            } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            this.consoleOutput = consoleOutput ? ? "";
            this.progressPercentage = progressPercentage ? ? 0;
            this.upgradeStatus = upgradeStatus ? ? null;
            this.repos = repos ? ? [];
        }
    }
    _exports.default = UpgradeStore;
});