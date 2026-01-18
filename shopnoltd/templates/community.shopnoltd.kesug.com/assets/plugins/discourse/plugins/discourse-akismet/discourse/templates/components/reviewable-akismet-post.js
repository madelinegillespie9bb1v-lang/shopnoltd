define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <ReviewableTopicLink @reviewable={{reviewable}} @tagName="" />
  
        <div class="post-contents-wrapper">
          <ReviewableCreatedBy @user={{reviewable.target_created_by}} @tagName="" />
  
          <div class="post-contents">
            <ReviewableCreatedByName
              @user={{reviewable.target_created_by}}
              @tagName=""
            />
  
            <div class="post-body">
              {{html-safe reviewable.payload.post_cooked}}
            </div>
  
            {{yield}}
  
            {{#if reviewable.payload.external_error}}
              <ReviewableAkismetApiError
                @external_error={{reviewable.payload.external_error}}
              />
            {{/if}}
          </div>
        </div>
        */
        {
            "id": "jW1HNVuP",
            "block": "[[[8,[39,0],null,[[\"@reviewable\",\"@tagName\"],[[30,0,[\"reviewable\"]],\"\"]],null],[1,\"\\n\\n\"],[10,0],[14,0,\"post-contents-wrapper\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@user\",\"@tagName\"],[[30,0,[\"reviewable\",\"target_created_by\"]],\"\"]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"post-contents\"],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@user\",\"@tagName\"],[[30,0,[\"reviewable\",\"target_created_by\"]],\"\"]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"post-body\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[[30,0,[\"reviewable\",\"payload\",\"post_cooked\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[18,1,null],[1,\"\\n\\n\"],[41,[30,0,[\"reviewable\",\"payload\",\"external_error\"]],[[[1,\"      \"],[8,[39,6],null,[[\"@external_error\"],[[30,0,[\"reviewable\",\"payload\",\"external_error\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13],[1,[28,[32,0],[\"[[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[\"&default\"],false,[\"reviewable-topic-link\",\"reviewable-created-by\",\"reviewable-created-by-name\",\"html-safe\",\"yield\",\"if\",\"reviewable-akismet-api-error\"]]",
            "moduleName": "discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});