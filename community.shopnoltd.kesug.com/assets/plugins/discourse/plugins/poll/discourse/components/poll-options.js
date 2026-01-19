define("discourse/plugins/poll/discourse/components/poll-options", ["exports", "@glimmer/component", "@ember/helper", "@ember/modifier", "@ember/object", "@ember/service", "@ember/template", "discourse/helpers/concat-class", "discourse/helpers/route-action", "discourse-common/helpers/d-icon", "discourse-i18n", "discourse/plugins/poll/discourse/components/poll-option-ranked-choice", "@ember/component", "@ember/template-factory"], function(_exports, _component, _helper, _modifier, _object, _service, _template2, _concatClass, _routeAction, _dIcon, _discourseI18n, _pollOptionRankedChoice, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollOptionsComponent extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        isChosen = option1 => {
            return this.args.votes.includes(option1.id);
        };
        sendClick(option1) {
            this.args.sendOptionSelect(option1);
        }
        static# _2 = (() => dt7948.n(this.prototype, "sendClick", [_object.action]))();
        sendRank(option1) {
            let rank1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.args.sendOptionSelect(option1, rank1);
        }
        static# _3 = (() => dt7948.n(this.prototype, "sendRank", [_object.action]))();
        get rankedChoiceDropdownContent() {
            let rankedChoiceDropdownContent1 = [];
            rankedChoiceDropdownContent1.push({
                id: 0,
                name: _discourseI18n.default.t("poll.options.ranked_choice.abstain")
            });
            this.args.options.forEach((option1, i1) => {
                option1.rank = 0;
                let priority1 = "";
                if (i1 === 0) {
                    priority1 = ` ${_discourseI18n.default.t("poll.options.ranked_choice.highest_priority")}`;
                }
                if (i1 === this.args.options.length - 1) {
                    priority1 = ` ${_discourseI18n.default.t("poll.options.ranked_choice.lowest_priority")}`;
                }
                rankedChoiceDropdownContent1.push({
                    id: i1 + 1,
                    name: (i1 + 1).toString() + priority1
                });
            });
            return rankedChoiceDropdownContent1;
        }
        static# _4 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <ul
                  class={{concatClass
                    (if @isRankedChoice "ranked-choice-poll-options")
                    "options"
                  }}
                >
                  {{#each @options key="rank" as |option|}}
                    {{#if @isRankedChoice}}
                      <PollOptionRankedChoice
                        @option={{option}}
                        @rankedChoiceDropdownContent={{this.rankedChoiceDropdownContent}}
                        @sendRank={{this.sendRank}}
                      />
                    {{else}}
                      <li data-poll-option-id={{option.id}}>
                        {{#if this.currentUser}}
                          <button {{on "click" (fn this.sendClick option)}}>
                            {{#if (this.isChosen option)}}
                              {{#if @isCheckbox}}
                                {{icon "far-square-check"}}
                              {{else}}
                                {{icon "circle"}}
                              {{/if}}
                            {{else}}
                              {{#if @isCheckbox}}
                                {{icon "far-square"}}
                              {{else}}
                                {{icon "far-circle"}}
                              {{/if}}
                            {{/if}}
                            <span class="option-text">{{htmlSafe option.html}}</span>
                          </button>
                        {{else}}
                          <button onclick={{routeAction "showLogin"}}>
                            {{#if (this.isChosen option)}}
                              {{#if @isCheckbox}}
                                {{icon "far-square-check"}}
                              {{else}}
                                {{icon "circle"}}
                              {{/if}}
                            {{else}}
                              {{#if @isCheckbox}}
                                {{icon "far-square"}}
                              {{else}}
                                {{icon "far-circle"}}
                              {{/if}}
                            {{/if}}
                            <span class="option-text">{{htmlSafe option.html}}</span>
                          </button>
                        {{/if}}
                      </li>
                    {{/if}}
                  {{/each}}
                </ul>
              
            */
            {
                "id": "7AdGjy3/",
                "block": "[[[1,\"\\n    \"],[10,\"ul\"],[15,0,[28,[32,0],[[52,[30,1],\"ranked-choice-poll-options\"],\"options\"],null]],[12],[1,\"\\n\"],[42,[28,[31,2],[[28,[31,2],[[30,2]],null]],null],\"rank\",[[[41,[30,1],[[[1,\"          \"],[8,[32,1],null,[[\"@option\",\"@rankedChoiceDropdownContent\",\"@sendRank\"],[[30,3],[30,0,[\"rankedChoiceDropdownContent\"]],[30,0,[\"sendRank\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,\"li\"],[15,\"data-poll-option-id\",[30,3,[\"id\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"currentUser\"]],[[[1,\"              \"],[11,\"button\"],[4,[32,2],[\"click\",[28,[32,3],[[30,0,[\"sendClick\"]],[30,3]],null]],null],[12],[1,\"\\n\"],[41,[28,[30,0,[\"isChosen\"]],[[30,3]],null],[[[41,[30,4],[[[1,\"                    \"],[1,[28,[32,4],[\"far-square-check\"],null]],[1,\"\\n\"]],[]],[[[1,\"                    \"],[1,[28,[32,4],[\"circle\"],null]],[1,\"\\n\"]],[]]]],[]],[[[41,[30,4],[[[1,\"                    \"],[1,[28,[32,4],[\"far-square\"],null]],[1,\"\\n\"]],[]],[[[1,\"                    \"],[1,[28,[32,4],[\"far-circle\"],null]],[1,\"\\n\"]],[]]]],[]]],[1,\"                \"],[10,1],[14,0,\"option-text\"],[12],[1,[28,[32,5],[[30,3,[\"html\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,\"button\"],[15,\"onclick\",[28,[32,6],[\"showLogin\"],null]],[12],[1,\"\\n\"],[41,[28,[30,0,[\"isChosen\"]],[[30,3]],null],[[[41,[30,4],[[[1,\"                    \"],[1,[28,[32,4],[\"far-square-check\"],null]],[1,\"\\n\"]],[]],[[[1,\"                    \"],[1,[28,[32,4],[\"circle\"],null]],[1,\"\\n\"]],[]]]],[]],[[[41,[30,4],[[[1,\"                    \"],[1,[28,[32,4],[\"far-square\"],null]],[1,\"\\n\"]],[]],[[[1,\"                    \"],[1,[28,[32,4],[\"far-circle\"],null]],[1,\"\\n\"]],[]]]],[]]],[1,\"                \"],[10,1],[14,0,\"option-text\"],[12],[1,[28,[32,5],[[30,3,[\"html\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n\"]],[]]]],[3]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[\"@isRankedChoice\",\"@options\",\"option\",\"@isCheckbox\"],false,[\"if\",\"each\",\"-track-array\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-options.js",
                "scope": () => [_concatClass.default, _pollOptionRankedChoice.default, _modifier.on, _helper.fn, _dIcon.default, _template2.htmlSafe, _routeAction.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollOptionsComponent;
});