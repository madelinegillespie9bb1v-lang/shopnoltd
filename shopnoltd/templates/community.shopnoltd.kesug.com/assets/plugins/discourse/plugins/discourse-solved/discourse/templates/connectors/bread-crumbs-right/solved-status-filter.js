define("discourse/plugins/discourse-solved/discourse/templates/connectors/bread-crumbs-right/solved-status-filter", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.siteSettings.solved_enabled}}
          <li>
            <ComboBox
              @content={{this.statuses}}
              @value={{this.status}}
              @valueProperty="value"
              @options={{hash caretDownIcon="caret-right" caretUpIcon="caret-down"}}
              @onChange={{this.changeStatus}}
              class="solved-status-filter"
            />
          </li>
        {{/if}}
        */
        {
            "id": "wZaZjQn9",
            "block": "[[[41,[30,0,[\"siteSettings\",\"solved_enabled\"]],[[[1,\"  \"],[10,\"li\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,0,\"solved-status-filter\"]],[[\"@content\",\"@value\",\"@valueProperty\",\"@options\",\"@onChange\"],[[30,0,[\"statuses\"]],[30,0,[\"status\"]],\"value\",[28,[37,2],null,[[\"caretDownIcon\",\"caretUpIcon\"],[\"caret-right\",\"caret-down\"]]],[30,0,[\"changeStatus\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"combo-box\",\"hash\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/bread-crumbs-right/solved-status-filter.hbs",
            "isStrictMode": false
        });
});