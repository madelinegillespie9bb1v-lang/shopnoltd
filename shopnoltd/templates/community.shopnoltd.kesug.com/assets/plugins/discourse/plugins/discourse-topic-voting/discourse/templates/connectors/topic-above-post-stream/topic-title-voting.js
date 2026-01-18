define("discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if model.can_vote}}
          {{#if model.postStream.loaded}}
            {{#if model.postStream.firstPostPresent}}
              <div class="voting title-voting">
                {{! template-lint-disable no-capital-arguments }}
                <MountWidget
                  @widget="vote-box"
                  @args={{model}}
                  @showLogin={{route-action "showLogin"}}
                />
              </div>
            {{/if}}
          {{/if}}
        {{/if}}
        */
        {
            "id": "MnzpRITs",
            "block": "[[[41,[30,0,[\"model\",\"can_vote\"]],[[[41,[30,0,[\"model\",\"postStream\",\"loaded\"]],[[[41,[30,0,[\"model\",\"postStream\",\"firstPostPresent\"]],[[[1,\"      \"],[10,0],[14,0,\"voting title-voting\"],[12],[1,\"\\n\"],[1,\"        \"],[8,[39,1],null,[[\"@widget\",\"@args\",\"@showLogin\"],[\"vote-box\",[30,0,[\"model\"]],[28,[37,2],[\"showLogin\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]],null],[1,[28,[32,0],[\"[[\\\"The `model` property path was used in the `discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.model}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `model` property path was used in the `discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.model}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `model` property path was used in the `discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.model}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `model` property path was used in the `discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.model}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"mount-widget\",\"route-action\"]]",
            "moduleName": "discourse/plugins/discourse-topic-voting/discourse/templates/connectors/topic-above-post-stream/topic-title-voting.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});