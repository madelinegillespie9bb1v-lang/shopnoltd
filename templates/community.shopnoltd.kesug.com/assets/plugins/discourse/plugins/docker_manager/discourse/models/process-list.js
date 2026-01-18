define("discourse/plugins/docker_manager/discourse/models/process-list", ["exports", "@glimmer/tracking", "discourse/lib/ajax"], function(_exports, _tracking, _ajax) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class ProcessList {
        static# _ = (() => dt7948.g(this.prototype, "output", [_tracking.tracked], function() {
            return null;
        }))();#
        output = (() => (dt7948.i(this, "output"), void 0))();
        async refresh() {
            const result = await (0, _ajax.ajax)("/admin/docker/ps", {
                dataType: "text"
            });
            this.output = result;
        }
    }
    _exports.default = ProcessList;
});