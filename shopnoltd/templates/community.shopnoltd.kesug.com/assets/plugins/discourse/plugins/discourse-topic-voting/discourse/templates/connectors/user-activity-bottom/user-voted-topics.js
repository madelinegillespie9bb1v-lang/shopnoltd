define("discourse/plugins/discourse-topic-voting/discourse/templates/connectors/user-activity-bottom/user-voted-topics", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if siteSettings.topic_voting_show_votes_on_profile}}
          <LinkTo @route="userActivity.votes">
            {{d-icon "heart"}}
            {{i18n "topic_voting.vote_title_plural"}}
          </LinkTo>
        {{/if}}
        */
        {
            "id": "4I1sZC4t",
            "block": "[[[41,[30,0,[\"siteSettings\",\"topic_voting_show_votes_on_profile\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@route\"],[\"userActivity.votes\"]],[[\"default\"],[[[[1,\"\\n    \"],[1,[28,[35,2],[\"heart\"],null]],[1,\"\\n    \"],[1,[28,[35,3],[\"topic_voting.vote_title_plural\"],null]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `siteSettings` property path was used in the `discourse/plugins/discourse-topic-voting/discourse/templates/connectors/user-activity-bottom/user-voted-topics.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.siteSettings}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"link-to\",\"d-icon\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-topic-voting/discourse/templates/connectors/user-activity-bottom/user-voted-topics.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});