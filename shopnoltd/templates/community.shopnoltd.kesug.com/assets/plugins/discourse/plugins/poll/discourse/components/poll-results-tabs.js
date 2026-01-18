define("discourse/plugins/poll/discourse/components/poll-results-tabs", ["exports", "@glimmer/component", "@glimmer/tracking", "@ember/helper", "@ember/object", "truth-helpers", "discourse/components/d-button", "discourse-i18n", "discourse/plugins/poll/discourse/components/poll-results-ranked-choice", "discourse/plugins/poll/discourse/components/poll-results-standard", "@ember/component", "@ember/template-factory"], function(_exports, _component, _tracking, _helper, _object, _truthHelpers, _dButton, _discourseI18n, _pollResultsRankedChoice, _pollResultsStandard, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class TabsComponent extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "activeTab", [_tracking.tracked]))();#
        activeTab = (() => (dt7948.i(this, "activeTab"), void 0))();
        tabOne = (() => _discourseI18n.default.t("poll.results.tabs.votes"))();
        tabTwo = (() => _discourseI18n.default.t("poll.results.tabs.outcome"))();
        constructor() {
            super(...arguments);
            this.activeTab = this.args.isRankedChoice && this.args.isPublic ? this.tabs[1] : this.tabs[0];
        }
        get tabs() {
            let tabs1 = [];
            if (!this.args.isRankedChoice || this.args.isRankedChoice && this.args.isPublic) {
                tabs1.push(this.tabOne);
            }
            if (this.args.isRankedChoice) {
                tabs1.push(this.tabTwo);
            }
            return tabs1;
        }
        selectTab(tab1) {
            this.activeTab = tab1;
        }
        static# _2 = (() => dt7948.n(this.prototype, "selectTab", [_object.action]))();
        static# _3 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="tab-container">
                  <ul class="tabs nav nav-items">
                    {{#each this.tabs as |tab|}}
                      <li class="tab nav-item {{if (eq tab this.activeTab) 'active'}}">
                        <DButton class="nav-btn" @action={{fn this.selectTab tab}}>
                          {{tab}}
                        </DButton>
                      </li>
                    {{/each}}
                  </ul>
                  <div class="tab-content">
                    {{#if (eq this.activeTab this.tabOne)}}
                      <PollResultsStandard
                        @options={{@options}}
                        @pollName={{@pollName}}
                        @pollType={{@pollType}}
                        @isPublic={{@isPublic}}
                        @isRankedChoice={{@isRankedChoice}}
                        @postId={{@postId}}
                        @vote={{@vote}}
                        @voters={{@voters}}
                        @votersCount={{@votersCount}}
                        @fetchVoters={{@fetchVoters}}
                        @showTally={{@showTally}}
                      />
                    {{/if}}
    
                    {{#if (eq this.activeTab this.tabTwo)}}
                      <PollResultsRankedChoice
                        @rankedChoiceOutcome={{@rankedChoiceOutcome}}
                      />
                    {{/if}}
                  </div>
                </div>
              
            */
            {
                "id": "y0Px/I7+",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"tab-container\"],[12],[1,\"\\n      \"],[10,\"ul\"],[14,0,\"tabs nav nav-items\"],[12],[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,0,[\"tabs\"]]],null]],null],null,[[[1,\"          \"],[10,\"li\"],[15,0,[29,[\"tab nav-item \",[52,[28,[32,0],[[30,1],[30,0,[\"activeTab\"]]],null],\"active\"]]]],[12],[1,\"\\n            \"],[8,[32,1],[[24,0,\"nav-btn\"]],[[\"@action\"],[[28,[32,2],[[30,0,[\"selectTab\"]],[30,1]],null]]],[[\"default\"],[[[[1,\"\\n              \"],[1,[30,1]],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"tab-content\"],[12],[1,\"\\n\"],[41,[28,[32,0],[[30,0,[\"activeTab\"]],[30,0,[\"tabOne\"]]],null],[[[1,\"          \"],[8,[32,3],null,[[\"@options\",\"@pollName\",\"@pollType\",\"@isPublic\",\"@isRankedChoice\",\"@postId\",\"@vote\",\"@voters\",\"@votersCount\",\"@fetchVoters\",\"@showTally\"],[[30,2],[30,3],[30,4],[30,5],[30,6],[30,7],[30,8],[30,9],[30,10],[30,11],[30,12]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[32,0],[[30,0,[\"activeTab\"]],[30,0,[\"tabTwo\"]]],null],[[[1,\"          \"],[8,[32,4],null,[[\"@rankedChoiceOutcome\"],[[30,13]]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[\"tab\",\"@options\",\"@pollName\",\"@pollType\",\"@isPublic\",\"@isRankedChoice\",\"@postId\",\"@vote\",\"@voters\",\"@votersCount\",\"@fetchVoters\",\"@showTally\",\"@rankedChoiceOutcome\"],false,[\"each\",\"-track-array\",\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-results-tabs.js",
                "scope": () => [_truthHelpers.eq, _dButton.default, _helper.fn, _pollResultsStandard.default, _pollResultsRankedChoice.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = TabsComponent;
});