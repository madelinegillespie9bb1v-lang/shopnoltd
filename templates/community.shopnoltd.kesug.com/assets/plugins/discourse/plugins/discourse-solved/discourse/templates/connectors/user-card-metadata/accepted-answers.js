define("discourse/plugins/discourse-solved/discourse/templates/connectors/user-card-metadata/accepted-answers", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if user.accepted_answers}}
          <span class="desc">{{i18n "solutions"}}</span>
          <span>{{user.accepted_answers}}</span>
        {{/if}}
        */
        {
            "id": "hk98DMDE",
            "block": "[[[41,[30,0,[\"user\",\"accepted_answers\"]],[[[1,\"  \"],[10,1],[14,0,\"desc\"],[12],[1,[28,[35,1],[\"solutions\"],null]],[13],[1,\"\\n  \"],[10,1],[12],[1,[30,0,[\"user\",\"accepted_answers\"]]],[13],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `user` property path was used in the `discourse/plugins/discourse-solved/discourse/templates/connectors/user-card-metadata/accepted-answers.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.user}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `user` property path was used in the `discourse/plugins/discourse-solved/discourse/templates/connectors/user-card-metadata/accepted-answers.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.user}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/user-card-metadata/accepted-answers.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});