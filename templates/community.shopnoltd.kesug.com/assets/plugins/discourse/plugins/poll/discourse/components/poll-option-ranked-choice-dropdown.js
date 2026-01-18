define("discourse/plugins/poll/discourse/components/poll-option-ranked-choice-dropdown", ["exports", "@glimmer/component", "@ember/helper", "@ember/object", "discourse/components/d-button", "discourse/components/dropdown-menu", "discourse-common/helpers/d-icon", "discourse-i18n", "float-kit/components/d-menu", "@ember/component", "@ember/template-factory"], function(_exports, _component, _helper, _object, _dButton, _dropdownMenu, _dIcon, _discourseI18n, _dMenu, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollOptionsDropdownComponent extends _component.default {
        onRegisterApi(api1) {
            this.dMenu = api1;
        }
        static# _ = (() => dt7948.n(this.prototype, "onRegisterApi", [_object.action]))();
        selectRank(option1, rank1) {
            this.args.sendRank(option1, rank1);
            this.dMenu.close();
        }
        static# _2 = (() => dt7948.n(this.prototype, "selectRank", [_object.action]))();
        get rankLabel() {
            return this.args.rank === 0 ? _discourseI18n.default.t("poll.options.ranked_choice.abstain") : this.args.rank;
        }
        static# _3 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <DMenu @onRegisterApi={{this.onRegisterApi}}>
                  <:trigger>
                    <span class="d-button-label">
                      {{this.rankLabel}}
                    </span>
                    {{icon "angle-down"}}
                  </:trigger>
                  <:content>
                    <DropdownMenu as |dropdown|>
                      {{#each @rankedChoiceDropdownContent as |content|}}
                        <dropdown.item>
                          <DButton
                            @translatedLabel={{content.name}}
                            class="btn-transparent poll-option-dropdown"
                            @action={{fn this.selectRank @option.id content.id}}
                          />
                        </dropdown.item>
                      {{/each}}
                    </DropdownMenu>
                  </:content>
                </DMenu>
              
            */
            {
                "id": "SC3eLHA6",
                "block": "[[[1,\"\\n    \"],[8,[32,0],null,[[\"@onRegisterApi\"],[[30,0,[\"onRegisterApi\"]]]],[[\"trigger\",\"content\"],[[[[1,\"\\n        \"],[10,1],[14,0,\"d-button-label\"],[12],[1,\"\\n          \"],[1,[30,0,[\"rankLabel\"]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[1,[28,[32,1],[\"angle-down\"],null]],[1,\"\\n      \"]],[]],[[[1,\"\\n        \"],[8,[32,2],null,null,[[\"default\"],[[[[1,\"\\n\"],[42,[28,[31,1],[[28,[31,1],[[30,2]],null]],null],null,[[[1,\"            \"],[8,[30,1,[\"item\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[8,[32,3],[[24,0,\"btn-transparent poll-option-dropdown\"]],[[\"@translatedLabel\",\"@action\"],[[30,3,[\"name\"]],[28,[32,4],[[30,0,[\"selectRank\"]],[30,4,[\"id\"]],[30,3,[\"id\"]]],null]]],null],[1,\"\\n            \"]],[]]]]],[1,\"\\n\"]],[3]],null],[1,\"        \"]],[1]]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n  \"]],[\"dropdown\",\"@rankedChoiceDropdownContent\",\"content\",\"@option\"],false,[\"each\",\"-track-array\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-option-ranked-choice-dropdown.js",
                "scope": () => [_dMenu.default, _dIcon.default, _dropdownMenu.default, _dButton.default, _helper.fn],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollOptionsDropdownComponent;
});