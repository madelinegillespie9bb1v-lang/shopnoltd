define("discourse/plugins/discourse-solved/discourse/templates/connectors/user-activity-bottom/solved-list", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.siteSettings.solved_enabled}}
          <li class="user-activity-bottom-outlet solved-list">
            <LinkTo @route="userActivity.solved">
              {{d-icon "check-square"}}
              {{i18n "solved.title"}}
            </LinkTo>
          </li>
        {{/if}}
        */
        {
            "id": "LlTha9wO",
            "block": "[[[41,[30,0,[\"siteSettings\",\"solved_enabled\"]],[[[1,\"  \"],[10,\"li\"],[14,0,\"user-activity-bottom-outlet solved-list\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@route\"],[\"userActivity.solved\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,2],[\"check-square\"],null]],[1,\"\\n      \"],[1,[28,[35,3],[\"solved.title\"],null]],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"link-to\",\"d-icon\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/user-activity-bottom/solved-list.hbs",
            "isStrictMode": false
        });
});