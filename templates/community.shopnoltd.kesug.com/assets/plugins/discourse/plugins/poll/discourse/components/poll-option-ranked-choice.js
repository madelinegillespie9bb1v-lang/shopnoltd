define("discourse/plugins/poll/discourse/components/poll-option-ranked-choice", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "@ember/template", "discourse/components/d-button", "discourse/helpers/route-action", "discourse-common/helpers/i18n", "discourse/plugins/poll/discourse/components/poll-option-ranked-choice-dropdown", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _service, _template2, _dButton, _routeAction, _i18n, _pollOptionRankedChoiceDropdown, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollOptionsComponent extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        sendRank(option1) {
            let rank1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            this.args.sendRank(option1, rank1);
        }
        static# _2 = (() => dt7948.n(this.prototype, "sendRank", [_object.action]))();
        static# _3 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div
                  tabindex="0"
                  class="ranked-choice-poll-option"
                  data-poll-option-id={{@option.id}}
                  data-poll-option-rank={{@option.rank}}
                >
                  {{#if this.currentUser}}
                    <PollOptionRankedChoiceDropdown
                      @rank={{@option.rank}}
                      @option={{@option}}
                      @rankedChoiceDropdownContent={{@rankedChoiceDropdownContent}}
                      @sendRank={{this.sendRank}}
                    />
                  {{else}}
                    <DButton class="btn-default" onclick={{routeAction "showLogin"}}>{{i18n
                        "poll.options.ranked_choice.login"
                      }}</DButton>
                  {{/if}}
                  <span class="option-text">{{htmlSafe @option.html}}</span>
                </div>
              
            */
            {
                "id": "dGNrAxli",
                "block": "[[[1,\"\\n    \"],[10,0],[14,\"tabindex\",\"0\"],[14,0,\"ranked-choice-poll-option\"],[15,\"data-poll-option-id\",[30,1,[\"id\"]]],[15,\"data-poll-option-rank\",[30,1,[\"rank\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"currentUser\"]],[[[1,\"        \"],[8,[32,0],null,[[\"@rank\",\"@option\",\"@rankedChoiceDropdownContent\",\"@sendRank\"],[[30,1,[\"rank\"]],[30,1],[30,2],[30,0,[\"sendRank\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[8,[32,1],[[24,0,\"btn-default\"],[16,\"onclick\",[28,[32,2],[\"showLogin\"],null]]],null,[[\"default\"],[[[[1,[28,[32,3],[\"poll.options.ranked_choice.login\"],null]]],[]]]]],[1,\"\\n\"]],[]]],[1,\"      \"],[10,1],[14,0,\"option-text\"],[12],[1,[28,[32,4],[[30,1,[\"html\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[\"@option\",\"@rankedChoiceDropdownContent\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-option-ranked-choice.js",
                "scope": () => [_pollOptionRankedChoiceDropdown.default, _dButton.default, _routeAction.default, _i18n.default, _template2.htmlSafe],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollOptionsComponent;
});