define("discourse/plugins/discourse-assign/discourse/templates/connectors/user-activity-bottom/assigned-list", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.currentUser.can_assign}}
          <LinkTo @route="userActivity.assigned">
            {{d-icon "user-plus"}}
            {{i18n "discourse_assign.assigned"}}
          </LinkTo>
        {{/if}}
        */
        {
            "id": "At//uoF1",
            "block": "[[[41,[30,0,[\"currentUser\",\"can_assign\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@route\"],[\"userActivity.assigned\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,2],[\"user-plus\"],null]],[1,\"\\n    \"],[1,[28,[35,3],[\"discourse_assign.assigned\"],null]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"link-to\",\"d-icon\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/connectors/user-activity-bottom/assigned-list.hbs",
            "isStrictMode": false
        });
});