define("discourse/plugins/docker_manager/discourse/templates/connectors/admin-menu/upgrade-link", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.currentUser.admin}}
          <NavItem @route="update" @label="admin.docker.update_tab" />
        {{/if}}
        */
        {
            "id": "NugvYRqo",
            "block": "[[[41,[30,0,[\"currentUser\",\"admin\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@route\",\"@label\"],[\"update\",\"admin.docker.update_tab\"]],null],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"nav-item\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/templates/connectors/admin-menu/upgrade-link.hbs",
            "isStrictMode": false
        });
});