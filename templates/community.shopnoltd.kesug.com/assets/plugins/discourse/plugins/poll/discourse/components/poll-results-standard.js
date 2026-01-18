define("discourse/plugins/poll/discourse/components/poll-results-standard", ["exports", "@glimmer/component", "@ember/helper", "@ember/template", "discourse-common/helpers/i18n", "discourse/plugins/poll/lib/even-round", "discourse/plugins/poll/discourse/components/poll-voters", "@ember/component", "@ember/template-factory"], function(_exports, _component, _helper, _template2, _i18n, _evenRound, _pollVoters, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollResultsStandardComponent extends _component.default {
        orderOptions = options1 => {
            options1.forEach(option1 => {
                option1.votes = option1.votes ? ? 0;
            });
            return options1.sort((a1, b1) => {
                if (a1.votes < b1.votes) {
                    return 1;
                } else if (a1.votes === b1.votes) {
                    if (a1.html < b1.html) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    return -1;
                }
            });
        };
        getPercentages = (ordered1, votersCount1) => {
            return votersCount1 === 0 ? Array(ordered1.length).fill(0) : ordered1.map(o1 => 100 * o1.votes / votersCount1);
        };
        roundPercentages = percentages1 => {
            return this.isMultiple ? percentages1.map(Math.floor) : (0, _evenRound.default)(percentages1);
        };
        enrichOptions = (ordered1, rounded1) => {
            ordered1.forEach((option1, idx1) => {
                const per1 = rounded1[idx1].toString();
                const chosen1 = (this.args.vote || []).includes(option1.id);
                option1.percentage = per1;
                option1.chosen = chosen1;
                let voters1 = this.args.isPublic ? this.args.voters ? .[option1.id] ? .voters ? ? [] : [];
                option1.voters = [...voters1];
                option1.loading = this.args.isPublic ? this.args.voters ? .[option1.id] ? .loading ? ? false : false;
            });
            return ordered1;
        };
        get votersCount() {
            return this.args.votersCount || 0;
        }
        get orderedOptions() {
            const ordered1 = this.orderOptions([...this.args.options]);
            const percentages1 = this.getPercentages(ordered1, this.votersCount);
            const roundedPercentages1 = this.roundPercentages(percentages1);
            return this.enrichOptions(ordered1, roundedPercentages1);
        }
        get isMultiple() {
            return this.args.pollType === "multiple";
        }
        static# _ = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <ul class="results">
                  {{#each this.orderedOptions key="voters" as |option|}}
                    <li class={{if option.chosen "chosen" ""}}>
                      <div class="option">
                        <p>
                          {{#unless @isRankedChoice}}
                            {{#if @showTally}}
                              <span class="absolute">{{i18n
                                  "poll.votes"
                                  count=option.votes
                                }}</span>
                            {{else}}
                              <span class="percentage">{{i18n
                                  "number.percent"
                                  count=option.percentage
                                }}</span>
                            {{/if}}
                          {{/unless}}
                          <span class="option-text">{{htmlSafe option.html}}</span>
                        </p>
                        {{#unless @isRankedChoice}}
                          <div class="bar-back">
                            <div
                              class="bar"
                              style={{htmlSafe (concat "width:" option.percentage "%")}}
                            />
                          </div>
                        {{/unless}}
                        {{#if @isPublic}}
                          <PollVoters
                            @postId={{@postId}}
                            @pollType={{@pollType}}
                            @optionId={{option.id}}
                            @pollName={{@pollName}}
                            @isRankedChoice={{@isRankedChoice}}
                            @totalVotes={{option.votes}}
                            @voters={{option.voters}}
                            @fetchVoters={{@fetchVoters}}
                            @loading={{option.loading}}
                          />
                        {{/if}}
                      </div>
                    </li>
                  {{/each}}
                </ul>
              
            */
            {
                "id": "ENOttPkH",
                "block": "[[[1,\"\\n    \"],[10,\"ul\"],[14,0,\"results\"],[12],[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,0,[\"orderedOptions\"]]],null]],null],\"voters\",[[[1,\"        \"],[10,\"li\"],[15,0,[52,[30,1,[\"chosen\"]],\"chosen\",\"\"]],[12],[1,\"\\n          \"],[10,0],[14,0,\"option\"],[12],[1,\"\\n            \"],[10,2],[12],[1,\"\\n\"],[41,[51,[30,2]],[[[41,[30,3],[[[1,\"                  \"],[10,1],[14,0,\"absolute\"],[12],[1,[28,[32,0],[\"poll.votes\"],[[\"count\"],[[30,1,[\"votes\"]]]]]],[13],[1,\"\\n\"]],[]],[[[1,\"                  \"],[10,1],[14,0,\"percentage\"],[12],[1,[28,[32,0],[\"number.percent\"],[[\"count\"],[[30,1,[\"percentage\"]]]]]],[13],[1,\"\\n\"]],[]]]],[]],null],[1,\"              \"],[10,1],[14,0,\"option-text\"],[12],[1,[28,[32,1],[[30,1,[\"html\"]]],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"],[41,[51,[30,2]],[[[1,\"              \"],[10,0],[14,0,\"bar-back\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"bar\"],[15,5,[28,[32,1],[[28,[32,2],[\"width:\",[30,1,[\"percentage\"]],\"%\"],null]],null]],[12],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[41,[30,4],[[[1,\"              \"],[8,[32,3],null,[[\"@postId\",\"@pollType\",\"@optionId\",\"@pollName\",\"@isRankedChoice\",\"@totalVotes\",\"@voters\",\"@fetchVoters\",\"@loading\"],[[30,5],[30,6],[30,1,[\"id\"]],[30,7],[30,2],[30,1,[\"votes\"]],[30,1,[\"voters\"]],[30,8],[30,1,[\"loading\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[\"option\",\"@isRankedChoice\",\"@showTally\",\"@isPublic\",\"@postId\",\"@pollType\",\"@pollName\",\"@fetchVoters\"],false,[\"each\",\"-track-array\",\"if\",\"unless\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-results-standard.js",
                "scope": () => [_i18n.default, _template2.htmlSafe, _helper.concat, _pollVoters.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollResultsStandardComponent;
});