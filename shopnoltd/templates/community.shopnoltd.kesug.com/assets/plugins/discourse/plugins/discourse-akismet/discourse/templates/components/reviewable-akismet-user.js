define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="reviewable-user-info">
          <div class="reviewable-user-fields">
            <div class="reviewable-user-details username">
              <div class="name">{{i18n "review.user.username"}}</div>
              <div class="value">
                {{#if reviewable.user_deleted}}
                  {{reviewable.payload.username}}
                {{else}}
                  <a
                    href={{get-url
                      (concat "/u/" reviewable.payload.username "/summary")
                    }}
                  >
                    {{reviewable.payload.username}}
                  </a>
                {{/if}}
              </div>
            </div>
  
            <ReviewableField
              @classes="reviewable-user-details name"
              @name={{i18n "review.user.name"}}
              @value={{reviewable.payload.name}}
            />
  
            <ReviewableField
              @classes="reviewable-user-details email"
              @name={{i18n "review.user.email"}}
              @value={{reviewable.payload.email}}
            />
  
            <ReviewableField
              @classes="reviewable-user-details bio"
              @name={{i18n "review.user.bio"}}
              @value={{reviewable.payload.bio}}
            />
          </div>
  
          {{yield}}
  
          {{#if reviewable.payload.external_error}}
            <ReviewableAkismetApiError
              @external_error={{reviewable.payload.external_error}}
            />
          {{/if}}
        </div>
        */
        {
            "id": "iPkqD68M",
            "block": "[[[10,0],[14,0,\"reviewable-user-info\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-user-fields\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"reviewable-user-details username\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"name\"],[12],[1,[28,[35,0],[\"review.user.username\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"value\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"user_deleted\"]],[[[1,\"          \"],[1,[30,0,[\"reviewable\",\"payload\",\"username\"]]],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,3],[15,6,[28,[37,2],[[28,[37,3],[\"/u/\",[30,0,[\"reviewable\",\"payload\",\"username\"]],\"/summary\"],null]],null]],[12],[1,\"\\n            \"],[1,[30,0,[\"reviewable\",\"payload\",\"username\"]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details name\",[28,[37,0],[\"review.user.name\"],null],[30,0,[\"reviewable\",\"payload\",\"name\"]]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details email\",[28,[37,0],[\"review.user.email\"],null],[30,0,[\"reviewable\",\"payload\",\"email\"]]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details bio\",[28,[37,0],[\"review.user.bio\"],null],[30,0,[\"reviewable\",\"payload\",\"bio\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[18,1,null],[1,\"\\n\\n\"],[41,[30,0,[\"reviewable\",\"payload\",\"external_error\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@external_error\"],[[30,0,[\"reviewable\",\"payload\",\"external_error\"]]]],null],[1,\"\\n\"]],[]],null],[13],[1,[28,[32,0],[\"[[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `reviewable` property path was used in the `discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.reviewable}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[\"&default\"],false,[\"i18n\",\"if\",\"get-url\",\"concat\",\"reviewable-field\",\"yield\",\"reviewable-akismet-api-error\"]]",
            "moduleName": "discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});