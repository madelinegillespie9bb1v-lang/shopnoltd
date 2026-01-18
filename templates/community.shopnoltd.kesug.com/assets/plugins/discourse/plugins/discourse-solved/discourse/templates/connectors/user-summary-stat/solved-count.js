define("discourse/plugins/discourse-solved/discourse/templates/connectors/user-summary-stat/solved-count", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if (and this.siteSettings.solved_enabled @outletArgs.model.solved_count)}}
          <li class="user-summary-stat-outlet solved-count linked-stat">
            <LinkTo @route="userActivity.solved">
              <UserStat
                @value={{@outletArgs.model.solved_count}}
                @label="solved.solution_summary"
                @icon="check-square"
              />
            </LinkTo>
          </li>
        {{/if}}
        */
        {
            "id": "6oTL0oqO",
            "block": "[[[41,[28,[37,1],[[30,0,[\"siteSettings\",\"solved_enabled\"]],[30,1,[\"model\",\"solved_count\"]]],null],[[[1,\"  \"],[10,\"li\"],[14,0,\"user-summary-stat-outlet solved-count linked-stat\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@route\"],[\"userActivity.solved\"]],[[\"default\"],[[[[1,\"\\n      \"],[8,[39,3],null,[[\"@value\",\"@label\",\"@icon\"],[[30,1,[\"model\",\"solved_count\"]],\"solved.solution_summary\",\"check-square\"]],null],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"@outletArgs\"],false,[\"if\",\"and\",\"link-to\",\"user-stat\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/user-summary-stat/solved-count.hbs",
            "isStrictMode": false
        });
});