define("discourse/plugins/discourse-topic-voting/discourse/templates/connectors/category-custom-settings/feature-voting-settings", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <h3>{{i18n "topic_voting.title"}}</h3>
        <section class="field">
          <div class="enable-topic-voting">
            <label class="checkbox-label">
              <Input
                @type="checkbox"
                @checked={{category.custom_fields.enable_topic_voting}}
              />
              {{i18n "topic_voting.allow_topic_voting"}}
            </label>
          </div>
        </section>
        */
        {
            "id": "MzfT2eth",
            "block": "[[[10,\"h3\"],[12],[1,[28,[35,0],[\"topic_voting.title\"],null]],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"enable-topic-voting\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"custom_fields\",\"enable_topic_voting\"]]]],null],[1,\"\\n      \"],[1,[28,[35,0],[\"topic_voting.allow_topic_voting\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,[28,[32,0],[\"[[\\\"The `category` property path was used in the `discourse/plugins/discourse-topic-voting/discourse/templates/connectors/category-custom-settings/feature-voting-settings.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.category}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"i18n\",\"input\"]]",
            "moduleName": "discourse/plugins/discourse-topic-voting/discourse/templates/connectors/category-custom-settings/feature-voting-settings.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});