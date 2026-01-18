define("discourse/plugins/poll/discourse/components/poll-voters", ["exports", "@glimmer/component", "@ember/helper", "discourse/components/conditional-loading-spinner", "discourse/components/d-button", "discourse/helpers/bound-avatar-template", "discourse/plugins/poll/discourse/components/poll-voters-ranked-choice", "@ember/component", "@ember/template-factory"], function(_exports, _component, _helper, _conditionalLoadingSpinner, _dButton, _boundAvatarTemplate, _pollVotersRankedChoice, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollVotersComponent extends _component.default {
        get showMore() {
            return this.args.voters.length < this.args.totalVotes;
        }
        static# _ = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="poll-voters">
                  <ul class="poll-voters-list">
                    {{#if @isRankedChoice}}
                      <PollVotersRankedChoice @voters={{@voters}} />
                    {{else}}
                      {{#each @voters as |user|}}
                        <li>
                          <a data-user-card={{user.username}}>{{avatar
                              user.avatar_template
                              "tiny"
                              usernamePath=user.username
                              namePath=user.name
                              title=user.username
                            }}</a>
                        </li>
                      {{/each}}
                    {{/if}}
                  </ul>
                  {{#if this.showMore}}
                    <ConditionalLoadingSpinner @condition={{@loading}}>
                      <DButton
                        @action={{fn @fetchVoters @optionId}}
                        @icon="chevron-down"
                        class="poll-voters-toggle-expand"
                      />
                    </ConditionalLoadingSpinner>
                  {{/if}}
                </div>
              
            */
            {
                "id": "+C3LhZYa",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"poll-voters\"],[12],[1,\"\\n      \"],[10,\"ul\"],[14,0,\"poll-voters-list\"],[12],[1,\"\\n\"],[41,[30,1],[[[1,\"          \"],[8,[32,0],null,[[\"@voters\"],[[30,2]]],null],[1,\"\\n\"]],[]],[[[42,[28,[31,2],[[28,[31,2],[[30,2]],null]],null],null,[[[1,\"            \"],[10,\"li\"],[12],[1,\"\\n              \"],[10,3],[15,\"data-user-card\",[30,3,[\"username\"]]],[12],[1,[28,[32,1],[[30,3,[\"avatar_template\"]],\"tiny\"],[[\"usernamePath\",\"namePath\",\"title\"],[[30,3,[\"username\"]],[30,3,[\"name\"]],[30,3,[\"username\"]]]]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[3]],null]],[]]],[1,\"      \"],[13],[1,\"\\n\"],[41,[30,0,[\"showMore\"]],[[[1,\"        \"],[8,[32,2],null,[[\"@condition\"],[[30,4]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[32,3],[[24,0,\"poll-voters-toggle-expand\"]],[[\"@action\",\"@icon\"],[[28,[32,4],[[30,5],[30,6]],null],\"chevron-down\"]],null],[1,\"\\n        \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[\"@isRankedChoice\",\"@voters\",\"user\",\"@loading\",\"@fetchVoters\",\"@optionId\"],false,[\"if\",\"each\",\"-track-array\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-voters.js",
                "scope": () => [_pollVotersRankedChoice.default, _boundAvatarTemplate.default, _conditionalLoadingSpinner.default, _dButton.default, _helper.fn],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollVotersComponent;
});