define("discourse/plugins/discourse-solved/discourse/templates/connectors/topic-after-cooked/solved-panel", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if topic.accepted_answer}}
          <p class="solved">
            {{html-safe topic.acceptedAnswerHtml}}
          </p>
        {{/if}}
        */
        {
            "id": "zLzOj8qd",
            "block": "[[[41,[30,0,[\"topic\",\"accepted_answer\"]],[[[1,\"  \"],[10,2],[14,0,\"solved\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[[30,0,[\"topic\",\"acceptedAnswerHtml\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `topic` property path was used in the `discourse/plugins/discourse-solved/discourse/templates/connectors/topic-after-cooked/solved-panel.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.topic}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `topic` property path was used in the `discourse/plugins/discourse-solved/discourse/templates/connectors/topic-after-cooked/solved-panel.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.topic}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"html-safe\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/topic-after-cooked/solved-panel.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});