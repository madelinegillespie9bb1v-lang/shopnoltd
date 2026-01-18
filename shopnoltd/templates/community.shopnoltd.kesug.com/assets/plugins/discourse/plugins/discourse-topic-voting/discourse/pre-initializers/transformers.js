define("discourse/plugins/discourse-topic-voting/discourse/pre-initializers/transformers", ["exports", "discourse/lib/plugin-api"], function(_exports, _pluginApi) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = {
        name: "discourse-topic-voting-transformers",
        before: "freeze-valid-transformers",
        initialize() {
            (0, _pluginApi.withPluginApi)("1.35.0", api => {
                api.addBehaviorTransformerName("topic-vote-button-click");
            });
        }
    };
});