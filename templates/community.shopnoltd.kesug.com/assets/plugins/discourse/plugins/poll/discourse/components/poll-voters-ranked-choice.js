define("discourse/plugins/poll/discourse/components/poll-voters-ranked-choice", ["exports", "@glimmer/component", "truth-helpers", "discourse/helpers/bound-avatar-template", "discourse-common/helpers/d-icon", "@ember/component", "@ember/template-factory"], function(_exports, _component, _truthHelpers, _boundAvatarTemplate, _dIcon, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollVotersComponent extends _component.default {
        groupVotersByRank = voters1 => {
            return voters1.reduce((groups1, voter1) => {
                const rank1 = voter1.rank;
                groups1[rank1] ? ? = [];
                groups1[rank1].push(voter1);
                return groups1;
            }, {});
        };
        get rankedChoiceVoters() {
            const voters1 = [...this.args.voters];
            // Group voters by rank so they can be displayed together by rank
            const groupedByRank1 = this.groupVotersByRank(voters1);
            // Convert groups to array of objects with keys rank and voters
            const groupedVoters1 = Object.keys(groupedByRank1).map(rank1 => ({
                rank: rank1,
                voters: groupedByRank1[rank1]
            }));
            return groupedVoters1;
        }
        static# _ = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                {{#each this.rankedChoiceVoters as |rank|}}
                  <ul>
                    {{#if (eq rank.rank "Abstain")}}
                      <span class="rank">{{icon "ban"}}</span>
                    {{else}}
                      <span class="rank">{{rank.rank}}</span>
                    {{/if}}
                    {{#each rank.voters as |voter|}}
                      <li>
                        <a data-user-card={{voter.user.username}}>{{avatar
                            voter.user.avatar_template
                            "tiny"
                            usernamePath=voter.user.username
                            namePath=voter.user.name
                            title=voter.user.username
                          }}</a>
                      </li>
                    {{/each}}
                  </ul>
                {{/each}}
              
            */
            {
                "id": "+tq7blyY",
                "block": "[[[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,0,[\"rankedChoiceVoters\"]]],null]],null],null,[[[1,\"      \"],[10,\"ul\"],[12],[1,\"\\n\"],[41,[28,[32,0],[[30,1,[\"rank\"]],\"Abstain\"],null],[[[1,\"          \"],[10,1],[14,0,\"rank\"],[12],[1,[28,[32,1],[\"ban\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,1],[14,0,\"rank\"],[12],[1,[30,1,[\"rank\"]]],[13],[1,\"\\n\"]],[]]],[42,[28,[31,1],[[28,[31,1],[[30,1,[\"voters\"]]],null]],null],null,[[[1,\"          \"],[10,\"li\"],[12],[1,\"\\n            \"],[10,3],[15,\"data-user-card\",[30,2,[\"user\",\"username\"]]],[12],[1,[28,[32,2],[[30,2,[\"user\",\"avatar_template\"]],\"tiny\"],[[\"usernamePath\",\"namePath\",\"title\"],[[30,2,[\"user\",\"username\"]],[30,2,[\"user\",\"name\"]],[30,2,[\"user\",\"username\"]]]]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[2]],null],[1,\"      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"]],[\"rank\",\"voter\"],false,[\"each\",\"-track-array\",\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-voters-ranked-choice.js",
                "scope": () => [_truthHelpers.eq, _dIcon.default, _boundAvatarTemplate.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollVotersComponent;
});