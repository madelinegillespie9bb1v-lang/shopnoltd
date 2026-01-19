define("discourse/plugins/poll/discourse/components/poll-results-ranked-choice", ["exports", "@glimmer/component", "@ember/template", "discourse-common/helpers/i18n", "discourse-i18n", "@ember/component", "@ember/template-factory"], function(_exports, _component, _template2, _i18n, _discourseI18n, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollResultsRankedChoiceComponent extends _component.default {
        get rankedChoiceWinnerText() {
            return (0, _template2.htmlSafe)(_discourseI18n.default.t("poll.ranked_choice.winner", {
                count: this.args.rankedChoiceOutcome.round_activity.length,
                winner: this.args.rankedChoiceOutcome.winning_candidate.html
            }));
        }
        get rankedChoiceTiedText() {
            return _discourseI18n.default.t("poll.ranked_choice.tied", {
                count: this.args.rankedChoiceOutcome.round_activity.length
            });
        }
        static# _ = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <h3 class="poll-results-ranked-choice-subtitle-rounds">
                  {{i18n "poll.ranked_choice.title.rounds"}}
                </h3>
                <table class="poll-results-ranked-choice">
                  <thead>
                    <tr>
                      <th>{{i18n "poll.ranked_choice.round"}}</th>
                      <th>{{i18n "poll.ranked_choice.majority"}}</th>
                      <th>{{i18n "poll.ranked_choice.eliminated"}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {{#each @rankedChoiceOutcome.round_activity as |round|}}
                      {{#if round.majority}}
                        <tr>
                          <td>{{round.round}}</td>
                          <td>{{htmlSafe round.majority.html}}</td>
                          <td>{{i18n "poll.ranked_choice.none"}}</td>
                        </tr>
                      {{else}}
                        <tr>
                          <td>{{round.round}}</td>
                          <td>{{i18n "poll.ranked_choice.none"}}</td>
                          <td>
                            {{#each round.eliminated as |eliminated|}}
                              {{htmlSafe eliminated.html}}
                            {{/each}}
                          </td>
                        </tr>
                      {{/if}}
                    {{/each}}
                  </tbody>
                </table>
                <h3 class="poll-results-ranked-choice-subtitle-outcome">
                  {{i18n "poll.ranked_choice.title.outcome"}}
                </h3>
                {{#if @rankedChoiceOutcome.tied}}
                  <span
                    class="poll-results-ranked-choice-info"
                  >{{this.rankedChoiceTiedText}}</span>
                  <ul class="poll-results-ranked-choice-tied-candidates">
                    {{#each @rankedChoiceOutcome.tied_candidates as |tied_candidate|}}
                      <li class="poll-results-ranked-choice-tied-candidate">{{htmlSafe
                          tied_candidate.html
                        }}</li>
                    {{/each}}
                  </ul>
                {{else}}
                  <span
                    class="poll-results-ranked-choice-info"
                  >{{this.rankedChoiceWinnerText}}</span>
                {{/if}}
              
            */
            {
                "id": "nMCDc1tE",
                "block": "[[[1,\"\\n    \"],[10,\"h3\"],[14,0,\"poll-results-ranked-choice-subtitle-rounds\"],[12],[1,\"\\n      \"],[1,[28,[32,0],[\"poll.ranked_choice.title.rounds\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"table\"],[14,0,\"poll-results-ranked-choice\"],[12],[1,\"\\n      \"],[10,\"thead\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[32,0],[\"poll.ranked_choice.round\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[32,0],[\"poll.ranked_choice.majority\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[32,0],[\"poll.ranked_choice.eliminated\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,1,[\"round_activity\"]]],null]],null],null,[[[41,[30,2,[\"majority\"]],[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,2,[\"round\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[28,[32,1],[[30,2,[\"majority\",\"html\"]]],null]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[28,[32,0],[\"poll.ranked_choice.none\"],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,\"tr\"],[12],[1,\"\\n              \"],[10,\"td\"],[12],[1,[30,2,[\"round\"]]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,[28,[32,0],[\"poll.ranked_choice.none\"],null]],[13],[1,\"\\n              \"],[10,\"td\"],[12],[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,2,[\"eliminated\"]]],null]],null],null,[[[1,\"                  \"],[1,[28,[32,1],[[30,3,[\"html\"]]],null]],[1,\"\\n\"]],[3]],null],[1,\"              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]]]],[2]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"h3\"],[14,0,\"poll-results-ranked-choice-subtitle-outcome\"],[12],[1,\"\\n      \"],[1,[28,[32,0],[\"poll.ranked_choice.title.outcome\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,1,[\"tied\"]],[[[1,\"      \"],[10,1],[14,0,\"poll-results-ranked-choice-info\"],[12],[1,[30,0,[\"rankedChoiceTiedText\"]]],[13],[1,\"\\n      \"],[10,\"ul\"],[14,0,\"poll-results-ranked-choice-tied-candidates\"],[12],[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,1,[\"tied_candidates\"]]],null]],null],null,[[[1,\"          \"],[10,\"li\"],[14,0,\"poll-results-ranked-choice-tied-candidate\"],[12],[1,[28,[32,1],[[30,4,[\"html\"]]],null]],[13],[1,\"\\n\"]],[4]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,1],[14,0,\"poll-results-ranked-choice-info\"],[12],[1,[30,0,[\"rankedChoiceWinnerText\"]]],[13],[1,\"\\n\"]],[]]],[1,\"  \"]],[\"@rankedChoiceOutcome\",\"round\",\"eliminated\",\"tied_candidate\"],false,[\"each\",\"-track-array\",\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-results-ranked-choice.js",
                "scope": () => [_i18n.default, _template2.htmlSafe],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollResultsRankedChoiceComponent;
});