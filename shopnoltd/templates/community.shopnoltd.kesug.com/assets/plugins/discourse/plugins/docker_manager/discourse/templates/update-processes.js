define("discourse/plugins/docker_manager/discourse/templates/update-processes", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <DockerManager::Console @output={{model.output}} />
        */
        {
            "id": "p3BAywVZ",
            "block": "[[[8,[39,0],null,[[\"@output\"],[[30,0,[\"model\",\"output\"]]]],null],[1,[28,[32,0],[\"[[\\\"The `model` property path was used in the `discourse/plugins/docker_manager/discourse/templates/update-processes.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.model}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"docker-manager/console\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/templates/update-processes.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});