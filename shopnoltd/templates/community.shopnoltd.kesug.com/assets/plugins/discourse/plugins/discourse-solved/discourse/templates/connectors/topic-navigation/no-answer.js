define("discourse/plugins/discourse-solved/discourse/templates/connectors/topic-navigation/no-answer", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if show}}
          <TopicNavigationPopup @popupId="solved-notice" @dismissDuration={{oneWeek}}>
            <h3>{{i18n "solved.no_answer.title"}}</h3>
            <p>{{i18n "solved.no_answer.description"}}</p>
          </TopicNavigationPopup>
        {{/if}}
        */
        {
            "id": "HpmsEEIx",
            "block": "[[[41,[30,0,[\"show\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@popupId\",\"@dismissDuration\"],[\"solved-notice\",[30,0,[\"oneWeek\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"h3\"],[12],[1,[28,[35,2],[\"solved.no_answer.title\"],null]],[13],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,2],[\"solved.no_answer.description\"],null]],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `show` property path was used in the `discourse/plugins/discourse-solved/discourse/templates/connectors/topic-navigation/no-answer.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.show}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `oneWeek` property path was used in the `discourse/plugins/discourse-solved/discourse/templates/connectors/topic-navigation/no-answer.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.oneWeek}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"topic-navigation-popup\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/topic-navigation/no-answer.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});