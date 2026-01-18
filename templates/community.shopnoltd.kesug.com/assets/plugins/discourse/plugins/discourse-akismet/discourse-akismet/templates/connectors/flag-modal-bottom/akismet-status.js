define("discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if post.akismet_state}}
          <div class="consent_banner alert alert-info">
            <span>{{i18n (concat "akismet.post_state." post.akismet_state)}}</span>
          </div>
        {{/if}}
        */
        {
            "id": "VmHqRLH2",
            "block": "[[[41,[30,0,[\"post\",\"akismet_state\"]],[[[1,\"  \"],[10,0],[14,0,\"consent_banner alert alert-info\"],[12],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,1],[[28,[37,2],[\"akismet.post_state.\",[30,0,[\"post\",\"akismet_state\"]]],null]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `post` property path was used in the `discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.post}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `post` property path was used in the `discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.post}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"i18n\",\"concat\"]]",
            "moduleName": "discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});