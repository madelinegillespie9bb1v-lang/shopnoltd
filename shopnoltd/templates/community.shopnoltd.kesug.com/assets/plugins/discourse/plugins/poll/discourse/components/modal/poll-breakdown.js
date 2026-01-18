define("discourse/plugins/poll/discourse/components/modal/poll-breakdown", ["exports", "@ember/component", "@ember/object", "@ember/service", "@ember/string", "@ember/template", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse/lib/load-script", "discourse-common/utils/decorators", "discourse-i18n", "@ember/template-factory"], function(_exports, _component, _object, _service, _string, _template, _ajax, _ajaxError, _loadScript, _decorators, _discourseI18n, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          {{! template-lint-disable no-invalid-interactive }}
        <DModal
          @title={{i18n "poll.breakdown.title"}}
          @closeModal={{@closeModal}}
          class="poll-breakdown has-tabs"
        >
          <:headerBelowTitle>
            <ul class="modal-tabs">
              <li
                class={{concat-class
                  "modal-tab percentage"
                  (if (eq this.displayMode "percentage") "is-active")
                }}
                {{on "click" (fn (mut this.displayMode) "percentage")}}
              >{{i18n "poll.breakdown.percentage"}}</li>
              <li
                class={{concat-class
                  "modal-tab count"
                  (if (eq this.displayMode "count") "is-active")
                }}
                {{on "click" (fn (mut this.displayMode) "count")}}
              >{{i18n "poll.breakdown.count"}}</li>
            </ul>
          </:headerBelowTitle>
          <:body>
            <div class="poll-breakdown-sidebar">
              <p class="poll-breakdown-title">
                {{this.title}}
              </p>
  
              <div class="poll-breakdown-total-votes">{{i18n
                  "poll.breakdown.votes"
                  count=this.model.poll.voters
                }}</div>
  
              <ul class="poll-breakdown-options">
                {{#each this.model.poll.options as |option index|}}
                  <PollBreakdownOption
                    @option={{option}}
                    @index={{index}}
                    @totalVotes={{this.totalVotes}}
                    @optionsCount={{this.model.poll.options.length}}
                    @displayMode={{this.displayMode}}
                    @highlightedOption={{this.highlightedOption}}
                    @onMouseOver={{fn (mut this.highlightedOption) index}}
                    @onMouseOut={{fn (mut this.highlightedOption) null}}
                  />
                {{/each}}
              </ul>
            </div>
  
            <div class="poll-breakdown-body">
              <div class="poll-breakdown-body-header">
                <label class="poll-breakdown-body-header-label">{{i18n
                    "poll.breakdown.breakdown"
                  }}</label>
  
                <ComboBox
                  @content={{this.groupableUserFields}}
                  @value={{this.groupedBy}}
                  @nameProperty="label"
                  @onChange={{this.setGrouping}}
                  class="poll-breakdown-dropdown"
                />
              </div>
  
              <div class="poll-breakdown-charts">
                {{#each this.charts as |chart|}}
                  <PollBreakdownChart
                    @group={{get chart "group"}}
                    @options={{get chart "options"}}
                    @displayMode={{this.displayMode}}
                    @highlightedOption={{this.highlightedOption}}
                    @setHighlightedOption={{fn (mut this.highlightedOption)}}
                  />
                {{/each}}
              </div>
            </div>
          </:body>
        </DModal>
        */
        {
            "id": "YRvkhP/Q",
            "block": "[[[8,[39,0],[[24,0,\"poll-breakdown has-tabs\"]],[[\"@title\",\"@closeModal\"],[[28,[37,1],[\"poll.breakdown.title\"],null],[30,1]]],[[\"headerBelowTitle\",\"body\"],[[[[1,\"\\n    \"],[10,\"ul\"],[14,0,\"modal-tabs\"],[12],[1,\"\\n      \"],[11,\"li\"],[16,0,[28,[37,2],[\"modal-tab percentage\",[52,[28,[37,4],[[30,0,[\"displayMode\"]],\"percentage\"],null],\"is-active\"]],null]],[4,[38,5],[\"click\",[28,[37,6],[[28,[37,7],[[30,0,[\"displayMode\"]]],null],\"percentage\"],null]],null],[12],[1,[28,[35,1],[\"poll.breakdown.percentage\"],null]],[13],[1,\"\\n      \"],[11,\"li\"],[16,0,[28,[37,2],[\"modal-tab count\",[52,[28,[37,4],[[30,0,[\"displayMode\"]],\"count\"],null],\"is-active\"]],null]],[4,[38,5],[\"click\",[28,[37,6],[[28,[37,7],[[30,0,[\"displayMode\"]]],null],\"count\"],null]],null],[12],[1,[28,[35,1],[\"poll.breakdown.count\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]],[[[1,\"\\n    \"],[10,0],[14,0,\"poll-breakdown-sidebar\"],[12],[1,\"\\n      \"],[10,2],[14,0,\"poll-breakdown-title\"],[12],[1,\"\\n        \"],[1,[30,0,[\"title\"]]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"poll-breakdown-total-votes\"],[12],[1,[28,[35,1],[\"poll.breakdown.votes\"],[[\"count\"],[[30,0,[\"model\",\"poll\",\"voters\"]]]]]],[13],[1,\"\\n\\n      \"],[10,\"ul\"],[14,0,\"poll-breakdown-options\"],[12],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"model\",\"poll\",\"options\"]]],null]],null],null,[[[1,\"          \"],[8,[39,10],null,[[\"@option\",\"@index\",\"@totalVotes\",\"@optionsCount\",\"@displayMode\",\"@highlightedOption\",\"@onMouseOver\",\"@onMouseOut\"],[[30,2],[30,3],[30,0,[\"totalVotes\"]],[30,0,[\"model\",\"poll\",\"options\",\"length\"]],[30,0,[\"displayMode\"]],[30,0,[\"highlightedOption\"]],[28,[37,6],[[28,[37,7],[[30,0,[\"highlightedOption\"]]],null],[30,3]],null],[28,[37,6],[[28,[37,7],[[30,0,[\"highlightedOption\"]]],null],null],null]]],null],[1,\"\\n\"]],[2,3]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"poll-breakdown-body\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"poll-breakdown-body-header\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"poll-breakdown-body-header-label\"],[12],[1,[28,[35,1],[\"poll.breakdown.breakdown\"],null]],[13],[1,\"\\n\\n        \"],[8,[39,11],[[24,0,\"poll-breakdown-dropdown\"]],[[\"@content\",\"@value\",\"@nameProperty\",\"@onChange\"],[[30,0,[\"groupableUserFields\"]],[30,0,[\"groupedBy\"]],\"label\",[30,0,[\"setGrouping\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"poll-breakdown-charts\"],[12],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"charts\"]]],null]],null],null,[[[1,\"          \"],[8,[39,12],null,[[\"@group\",\"@options\",\"@displayMode\",\"@highlightedOption\",\"@setHighlightedOption\"],[[28,[37,13],[[30,4],\"group\"],null],[28,[37,13],[[30,4],\"options\"],null],[30,0,[\"displayMode\"]],[30,0,[\"highlightedOption\"]],[28,[37,6],[[28,[37,7],[[30,0,[\"highlightedOption\"]]],null]],null]]],null],[1,\"\\n\"]],[4]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]]],[\"@closeModal\",\"option\",\"index\",\"chart\"],false,[\"d-modal\",\"i18n\",\"concat-class\",\"if\",\"eq\",\"on\",\"fn\",\"mut\",\"each\",\"-track-array\",\"poll-breakdown-option\",\"combo-box\",\"poll-breakdown-chart\",\"get\"]]",
            "moduleName": "discourse/plugins/poll/discourse/components/modal/poll-breakdown.hbs",
            "isStrictMode": false
        });
    class PollBreakdownModal extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "dialog", [_service.service]))();#
        dialog = (() => (dt7948.i(this, "dialog"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        model = null;
        charts = null;
        groupedBy = null;
        highlightedOption = null;
        displayMode = "percentage";
        init() {
            this.set("groupedBy", this.groupableUserFields[0] ? .id);
            (0, _loadScript.default)("/javascripts/Chart.min.js").then(() => (0, _loadScript.default)("/javascripts/chartjs-plugin-datalabels.min.js")).then(() => {
                this.fetchGroupedPollData();
            });
            super.init(...arguments);
        }
        title(pollTitle, topicTitle) {
            return pollTitle ? (0, _template.htmlSafe)(pollTitle) : topicTitle;
        }
        static# _3 = (() => dt7948.n(this.prototype, "title", [(0, _decorators.default)("model.poll.title", "model.post.topic.title")]))();
        get groupableUserFields() {
            return this.siteSettings.poll_groupable_user_fields.split("|").filter(Boolean).map(field => {
                const transformed = field.split("_").filter(Boolean);
                if (transformed.length > 1) {
                    transformed[0] = (0, _string.classify)(transformed[0]);
                }
                return {
                    id: field,
                    label: transformed.join(" ")
                };
            });
        }
        totalVotes(options) {
            return options.reduce((sum, option) => sum + option.votes, 0);
        }
        static# _4 = (() => dt7948.n(this.prototype, "totalVotes", [(0, _decorators.default)("model.poll.options")]))();
        fetchGroupedPollData() {
            return (0, _ajax.ajax)("/polls/grouped_poll_results.json", {
                data: {
                    post_id: this.model.post.id,
                    poll_name: this.model.poll.name,
                    user_field_name: this.groupedBy
                }
            }).catch(error => {
                if (error) {
                    (0, _ajaxError.popupAjaxError)(error);
                } else {
                    this.dialog.alert(_discourseI18n.default.t("poll.error_while_fetching_voters"));
                }
            }).then(result => {
                if (this.isDestroying || this.isDestroyed) {
                    return;
                }
                this.set("charts", result.grouped_results);
            });
        }
        setGrouping(value) {
            this.set("groupedBy", value);
            this.fetchGroupedPollData();
        }
        static# _5 = (() => dt7948.n(this.prototype, "setGrouping", [_object.action]))();
        onSelectPanel(panel) {
            this.set("displayMode", panel.id);
        }
        static# _6 = (() => dt7948.n(this.prototype, "onSelectPanel", [_object.action]))();
    }
    _exports.default = PollBreakdownModal;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PollBreakdownModal);
});