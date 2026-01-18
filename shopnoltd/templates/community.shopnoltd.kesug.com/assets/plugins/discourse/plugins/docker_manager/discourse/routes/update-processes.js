define("discourse/plugins/docker_manager/discourse/routes/update-processes", ["exports", "@ember/routing/route", "@ember/runloop", "discourse-common/lib/later", "discourse-common/utils/decorators", "discourse/plugins/docker_manager/discourse/models/process-list"], function(_exports, _route, _runloop, _later, _decorators, _processList) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const REFRESH_INTERVAL = 5000;
    class UpgradeProcesses extends _route.default {
        processes = null;
        refreshTimer = null;
        autoRefresh = false;
        model() {
            this.processes = new _processList.default();
            this.autoRefresh = true;
            this.refresh();
            return this.processes;
        }
        deactivate() {
            this.autoRefresh = false;
        }
        async refresh() {
            if (this.autoRefresh) {
                await this.processes.refresh();
                this.refreshTimer = (0, _later.default)(this.refresh, REFRESH_INTERVAL);
            } else {
                (0, _runloop.cancel)(this.refreshTimer);
            }
        }
        static# _ = (() => dt7948.n(this.prototype, "refresh", [_decorators.bind]))();
    }
    _exports.default = UpgradeProcesses;
});