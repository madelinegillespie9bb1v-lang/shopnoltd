define("discourse/plugins/discourse-solved/discourse/connectors/user-summary-stat/solved-count", ["exports", "@glimmer/component", "@ember/service"], function(_exports, _component, _service) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class SolvedCount extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "siteSettings", [_service.inject]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
    }
    _exports.default = SolvedCount;
});