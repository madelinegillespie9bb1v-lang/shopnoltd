define("discourse/plugins/discourse-assign/discourse/raw-views/assign-topic-buttons", ["exports", "@ember/object", "@ember/service", "discourse/lib/raw-render-glimmer", "discourse/plugins/discourse-assign/discourse/components/assigned-topic-list-column", "@ember/component", "@ember/template-factory", "@ember/component/template-only"], function(_exports, _object, _service, _rawRenderGlimmer, _assignedTopicListColumn, _component, _templateFactory, _templateOnly) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const ASSIGN_LIST_ROUTES = ["userActivity.assigned", "group.assigned.show"];
    class _default extends _object.default {
        static# _ = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        get html() {
            if (ASSIGN_LIST_ROUTES.includes(this.router.currentRouteName)) {
                return (0, _rawRenderGlimmer.default)(this, "td.assign-topic-buttons", (0, _component.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
                    /*
                      <AssignedTopicListColumn @topic={{@data.topic}} />
                    */
                    {
                        "id": "DgO3j+2j",
                        "block": "[[[8,[32,0],null,[[\"@topic\"],[[30,1,[\"topic\"]]]],null]],[\"@data\"],false,[]]",
                        "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/raw-views/assign-topic-buttons.js",
                        "scope": () => [_assignedTopicListColumn.default],
                        "isStrictMode": true
                    }), (0, _templateOnly.default)(undefined, undefined)), {
                    topic: this.topic
                });
            }
        }
    }
    _exports.default = _default;
});