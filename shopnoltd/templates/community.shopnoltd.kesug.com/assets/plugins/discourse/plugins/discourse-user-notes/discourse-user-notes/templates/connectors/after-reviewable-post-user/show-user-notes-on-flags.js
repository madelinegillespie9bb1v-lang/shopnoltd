define("discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags", ["exports", "ember-this-fallback/this-fallback-helper", "ember-this-fallback/try-lookup-helper", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _thisFallbackHelper, _tryLookupHelper, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if userNotesCount}}
          <DButton
            @translatedTitle={{userNotesTitle}}
            @action={{action "showUserNotes"}}
            class="btn btn-flat"
          >
            {{#if emojiEnabled}}
              <img
                src={{emojiUrl}}
                title={{userNotesTitle}}
                alt="pencil"
                class="emoji"
              />
            {{else}}
              {{d-icon "sticky-note"}}
            {{/if}}
          </DButton>
        {{/if}}
        */
        {
            "id": "qvycJcDg",
            "block": "[[[41,[30,0,[\"userNotesCount\"]],[[[1,\"  \"],[8,[39,1],[[24,0,\"btn btn-flat\"]],[[\"@translatedTitle\",\"@action\"],[[30,0,[\"userNotesTitle\"]],[28,[37,2],[[30,0],\"showUserNotes\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"emojiEnabled\"]],[[[1,\"      \"],[44,[[28,[37,4],null,[[\"emojiUrl\",\"userNotesTitle\"],[[28,[32,0],[\"emojiUrl\"],null],[28,[32,0],[\"userNotesTitle\"],null]]]]],[[[10,\"img\"],[15,\"src\",[52,[30,1,[\"emojiUrl\"]],[28,[30,1,[\"emojiUrl\"]],null,null],[28,[32,1],[[30,0],\"emojiUrl\",\"[\\\"The `emojiUrl` property path was used in the `discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.emojiUrl}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]\"],null]]],[15,\"title\",[52,[30,1,[\"userNotesTitle\"]],[28,[30,1,[\"userNotesTitle\"]],null,null],[28,[32,1],[[30,0],\"userNotesTitle\",\"[\\\"The `userNotesTitle` property path was used in the `discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.userNotesTitle}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]\"],null]]],[14,\"alt\",\"pencil\"],[14,0,\"emoji\"],[12],[13]],[1]]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,5],[\"sticky-note\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,[28,[32,2],[\"[[\\\"The `userNotesCount` property path was used in the `discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.userNotesCount}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `userNotesTitle` property path was used in the `discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.userNotesTitle}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}],[\\\"The `emojiEnabled` property path was used in the `discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.emojiEnabled}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[\"maybeHelpers\"],false,[\"if\",\"d-button\",\"action\",\"let\",\"hash\",\"d-icon\"]]",
            "moduleName": "discourse/plugins/discourse-user-notes/discourse-user-notes/templates/connectors/after-reviewable-post-user/show-user-notes-on-flags.hbs",
            "scope": () => [_tryLookupHelper.default, _thisFallbackHelper.default, _deprecationsHelper.default],
            "isStrictMode": false
        });
});