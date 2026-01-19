define("discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if akismetFlaggedTopic}}
          <div class="alert alert-info category-read-only-banner">
            {{i18n "akismet.topic_deleted"}}
          </div>
        {{/if}}
        */
        {
            "id": "koaGUxmh",
            "block": "[[[41,[30,0,[\"akismetFlaggedTopic\"]],[[[1,\"  \"],[10,0],[14,0,\"alert alert-info category-read-only-banner\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"akismet.topic_deleted\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `akismetFlaggedTopic` property path was used in the `discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.akismetFlaggedTopic}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});