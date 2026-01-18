define("discourse/plugins/poll/discourse/components/poll-buttons-dropdown", ["exports", "@glimmer/component", "@ember/helper", "@ember/object", "@ember/service", "discourse/components/d-button", "discourse/components/dropdown-menu", "discourse-common/helpers/d-icon", "float-kit/components/d-menu", "@ember/component", "@ember/template-factory"], function(_exports, _component, _helper, _object, _service, _dButton, _dropdownMenu, _dIcon, _dMenu, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const buttonOptionsMap = {
        exportResults: {
            className: "btn-default export-results",
            label: "poll.export-results.label",
            title: "poll.export-results.title",
            icon: "download",
            action: "exportResults"
        },
        showBreakdown: {
            className: "btn-default show-breakdown",
            label: "poll.breakdown.breakdown",
            icon: "chart-pie",
            action: "showBreakdown"
        },
        openPoll: {
            className: "btn-default toggle-status",
            label: "poll.open.label",
            title: "poll.open.title",
            icon: "unlock-keyhole",
            action: "toggleStatus"
        },
        closePoll: {
            className: "btn-default toggle-status",
            label: "poll.close.label",
            title: "poll.close.title",
            icon: "lock",
            action: "toggleStatus"
        },
        showTally: {
            className: "btn-default show-tally",
            label: "poll.show-tally.label",
            title: "poll.show-tally.title",
            icon: "info",
            action: "toggleDisplayMode"
        },
        showPercentage: {
            className: "btn-default show-percentage",
            label: "poll.show-percentage.label",
            title: "poll.show-percentage.title",
            icon: "info",
            action: "toggleDisplayMode"
        }
    };
    class PollButtonsDropdownComponent extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        constructor() {
            super(...arguments);
            this.getDropdownButtonState = false;
        }
        dropDownClick(dropDownAction1) {
            this.args.dropDownClick(dropDownAction1);
        }
        static# _3 = (() => dt7948.n(this.prototype, "dropDownClick", [_object.action]))();
        get getDropdownContent() {
            const contents1 = [];
            const isAdmin1 = this.currentUser && this.currentUser.admin;
            const dataExplorerEnabled1 = this.siteSettings.data_explorer_enabled;
            const exportQueryID1 = this.args.isRankedChoice ? this.siteSettings.poll_export_ranked_choice_data_explorer_query_id : this.siteSettings.poll_export_data_explorer_query_id;
            const {
                closed: closed1,
                voters: voters1,
                isStaff: isStaff1,
                isMe: isMe1,
                topicArchived: topicArchived1,
                groupableUserFields: groupableUserFields1,
                isAutomaticallyClosed: isAutomaticallyClosed1,
                availableDisplayMode: availableDisplayMode1
            } = this.args;
            if (availableDisplayMode1) {
                const option1 = {
                    ...buttonOptionsMap[availableDisplayMode1]
                };
                option1.id = option1.action;
                contents1.push(option1);
            }
            if (groupableUserFields1.length && voters1 > 0) {
                const option1 = {
                    ...buttonOptionsMap.showBreakdown
                };
                option1.id = option1.action;
                contents1.push(option1);
            }
            if (isAdmin1 && dataExplorerEnabled1 && voters1 > 0 && exportQueryID1) {
                const option1 = {
                    ...buttonOptionsMap.exportResults
                };
                option1.id = option1.action;
                contents1.push(option1);
            }
            if (this.currentUser && (isMe1 || isStaff1) && !topicArchived1) {
                if (closed1) {
                    if (!isAutomaticallyClosed1) {
                        const option1 = {
                            ...buttonOptionsMap.openPoll
                        };
                        option1.id = option1.action;
                        contents1.push(option1);
                    }
                } else {
                    const option1 = {
                        ...buttonOptionsMap.closePoll
                    };
                    option1.id = option1.action;
                    contents1.push(option1);
                }
            }
            return contents1;
        }
        get showDropdown() {
            return this.getDropdownContent.length > 1;
        }
        get showDropdownAsButton() {
            return this.getDropdownContent.length === 1;
        }
        static# _4 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="poll-buttons-dropdown">
                  {{#if this.showDropdown}}
                    <DMenu class="widget-dropdown-header">
                      <:trigger>
                        {{icon "gear"}}
                      </:trigger>
                      <:content>
                        <DropdownMenu as |dropdown|>
                          {{#each this.getDropdownContent as |content|}}
                            <dropdown.item>
                              <DButton
                                class="widget-button {{content.className}}"
                                @icon={{content.icon}}
                                @label={{content.label}}
                                @action={{fn this.dropDownClick content.action}}
                              />
                            </dropdown.item>
                            <dropdown.divider />
                          {{/each}}
                        </DropdownMenu>
                      </:content>
                    </DMenu>
                  {{else if this.showDropdownAsButton}}
                    <DButton
                      class="widget-button {{get this.getDropdownContent '0.className'}}"
                      @icon={{get this.getDropdownContent "0.icon"}}
                      @label={{get this.getDropdownContent "0.label"}}
                      @action={{fn
                        this.dropDownClick
                        (get this.getDropdownContent "0.action")
                      }}
                    />
                  {{/if}}
                </div>
              
            */
            {
                "id": "aY1spYIh",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"poll-buttons-dropdown\"],[12],[1,\"\\n\"],[41,[30,0,[\"showDropdown\"]],[[[1,\"        \"],[8,[32,0],[[24,0,\"widget-dropdown-header\"]],null,[[\"trigger\",\"content\"],[[[[1,\"\\n            \"],[1,[28,[32,1],[\"gear\"],null]],[1,\"\\n          \"]],[]],[[[1,\"\\n            \"],[8,[32,2],null,null,[[\"default\"],[[[[1,\"\\n\"],[42,[28,[31,2],[[28,[31,2],[[30,0,[\"getDropdownContent\"]]],null]],null],null,[[[1,\"                \"],[8,[30,1,[\"item\"]],null,null,[[\"default\"],[[[[1,\"\\n                  \"],[8,[32,3],[[16,0,[29,[\"widget-button \",[30,2,[\"className\"]]]]]],[[\"@icon\",\"@label\",\"@action\"],[[30,2,[\"icon\"]],[30,2,[\"label\"]],[28,[32,4],[[30,0,[\"dropDownClick\"]],[30,2,[\"action\"]]],null]]],null],[1,\"\\n                \"]],[]]]]],[1,\"\\n                \"],[8,[30,1,[\"divider\"]],null,null,null],[1,\"\\n\"]],[2]],null],[1,\"            \"]],[1]]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"showDropdownAsButton\"]],[[[1,\"        \"],[8,[32,3],[[16,0,[29,[\"widget-button \",[28,[32,5],[[30,0,[\"getDropdownContent\"]],\"0.className\"],null]]]]],[[\"@icon\",\"@label\",\"@action\"],[[28,[32,5],[[30,0,[\"getDropdownContent\"]],\"0.icon\"],null],[28,[32,5],[[30,0,[\"getDropdownContent\"]],\"0.label\"],null],[28,[32,4],[[30,0,[\"dropDownClick\"]],[28,[32,5],[[30,0,[\"getDropdownContent\"]],\"0.action\"],null]],null]]],null],[1,\"\\n      \"]],[]],null]],[]]],[1,\"    \"],[13],[1,\"\\n  \"]],[\"dropdown\",\"content\"],false,[\"if\",\"each\",\"-track-array\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-buttons-dropdown.js",
                "scope": () => [_dMenu.default, _dIcon.default, _dropdownMenu.default, _dButton.default, _helper.fn, _object.get],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollButtonsDropdownComponent;
});