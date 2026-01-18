define("discourse/plugins/poll/discourse/components/modal/poll-ui-builder", ["exports", "@ember/component", "@ember/object", "@ember/object/computed", "@ember/service", "@ember-decorators/object", "discourse-common/utils/decorators", "discourse-i18n", "@ember/template-factory"], function(_exports, _component, _object, _computed, _service, _object2, _decorators, _discourseI18n, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = _exports.REGULAR_POLL_TYPE = _exports.RANKED_CHOICE_POLL_TYPE = _exports.PIE_CHART_TYPE = _exports.NUMBER_POLL_TYPE = _exports.MULTIPLE_POLL_TYPE = _exports.BAR_CHART_TYPE = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <DModal
          @title={{i18n "poll.ui_builder.title"}}
          @closeModal={{@closeModal}}
          @inline={{@inline}}
          class="poll-ui-builder"
        >
          <:body>
            <ul class="nav nav-pills poll-type">
              <li>
                <DButton
                  @action={{fn this.updatePollType "regular"}}
                  class={{concatClass
                    "poll-type-value poll-type-value-regular"
                    (if this.isRegular "active")
                  }}
                >
                  {{i18n "poll.ui_builder.poll_type.regular"}}
                </DButton>
              </li>
              <li>
                <DButton
                  @action={{fn this.updatePollType "multiple"}}
                  class={{concatClass
                    "poll-type-value poll-type-value-multiple"
                    (if this.isMultiple "active")
                  }}
                >
                  {{i18n "poll.ui_builder.poll_type.multiple"}}
                </DButton>
              </li>
              {{#if this.showNumber}}
                <li>
                  <DButton
                    @action={{fn this.updatePollType "number"}}
                    class={{concatClass
                      "poll-type-value poll-type-value-number"
                      (if this.isNumber "active")
                    }}
                  >
                    {{i18n "poll.ui_builder.poll_type.number"}}
                  </DButton>
                </li>
              {{/if}}
              {{#if this.showRankedChoice}}
                <li>
                  <DButton
                    @action={{fn this.updatePollType "ranked_choice"}}
                    class={{concatClass
                      "poll-type-value poll-type-value-ranked-choice"
                      (if this.isRankedChoice "active")
                    }}
                  >
                    {{i18n "poll.ui_builder.poll_type.ranked_choice"}}
                  </DButton>
                </li>
              {{/if}}
            </ul>
  
            {{#if this.showAdvanced}}
              <div class="input-group poll-title">
                <label class="input-group-label">{{i18n
                    "poll.ui_builder.poll_title.label"
                  }}</label>
                <Input @value={{this.pollTitle}} />
              </div>
            {{/if}}
  
            {{#unless this.isNumber}}
              <div class="poll-options">
                {{#if this.showAdvanced}}
                  <label class="input-group-label">{{i18n
                      "poll.ui_builder.poll_options.label"
                    }}</label>
                  <Textarea
                    @value={{this.pollOptionsText}}
                    {{on "input" this.onOptionsTextChange}}
                  />
                  {{#if this.showMinNumOfOptionsValidation}}
                    {{#unless this.minNumOfOptionsValidation.ok}}
                      <InputTip @validation={{this.minNumOfOptionsValidation}} />
                    {{/unless}}
                  {{/if}}
                {{else}}
                  {{#each this.pollOptions as |option index|}}
                    <div class="input-group poll-option-value">
                      <input
                        type="text"
                        value={{option.value}}
                        {{auto-focus}}
                        {{on "input" (fn this.updateValue option)}}
                        {{on "keydown" (fn this.onInputKeydown index)}}
                      />
                      {{#if this.canRemoveOption}}
                        <DButton
                          @icon="trash-can"
                          @action={{fn this.removeOption option}}
                        />
                      {{/if}}
                    </div>
                  {{/each}}
  
                  <div class="poll-option-controls">
                    <DButton
                      @icon="plus"
                      @label="poll.ui_builder.poll_options.add"
                      @action={{fn this.addOption -1}}
                      class="btn-default poll-option-add"
                    />
                    {{#if
                      (and
                        this.showMinNumOfOptionsValidation
                        (not this.minNumOfOptionsValidation.ok)
                      )
                    }}
                      <InputTip @validation={{this.minNumOfOptionsValidation}} />
                    {{/if}}
                  </div>
                {{/if}}
              </div>
            {{/unless}}
  
            {{#unless this.rankedChoiceOrRegular}}
              <div class="options">
                <div class="input-group poll-number">
                  <label class="input-group-label">{{i18n
                      "poll.ui_builder.poll_config.min"
                    }}</label>
                  <Input
                    @type="number"
                    @value={{this.pollMin}}
                    class="poll-options-min"
                    min="1"
                  />
                </div>
  
                <div class="input-group poll-number">
                  <label class="input-group-label">{{i18n
                      "poll.ui_builder.poll_config.max"
                    }}</label>
                  <Input
                    @type="number"
                    @value={{this.pollMax}}
                    class="poll-options-max"
                    min="1"
                  />
                </div>
  
                {{#if this.isNumber}}
                  <div class="input-group poll-number">
                    <label class="input-group-label">{{i18n
                        "poll.ui_builder.poll_config.step"
                      }}</label>
                    <Input
                      @type="number"
                      @value={{this.pollStep}}
                      min="1"
                      class="poll-options-step"
                    />
                  </div>
                {{/if}}
              </div>
  
              {{#unless this.minMaxValueValidation.ok}}
                <InputTip @validation={{this.minMaxValueValidation}} />
              {{/unless}}
            {{/unless}}
  
            <div class="input-group poll-public">
              <DToggleSwitch
                @state={{this.publicPoll}}
                @label="poll.ui_builder.poll_public.label"
                class="poll-toggle-public"
                {{on "click" this.togglePublic}}
              />
            </div>
  
            {{#if this.showAdvanced}}
              <div class="input-group poll-allowed-groups">
                <label class="input-group-label">{{i18n
                    "poll.ui_builder.poll_groups.label"
                  }}</label>
                <GroupChooser
                  @content={{this.siteGroups}}
                  @value={{this.pollGroups}}
                  @onChange={{fn (mut this.pollGroups)}}
                  @labelProperty="name"
                  @valueProperty="name"
                />
              </div>
  
              <div class="input-group poll-date">
                <label class="input-group-label">{{i18n
                    "poll.ui_builder.automatic_close.label"
                  }}</label>
                <DateTimeInput
                  @date={{this.pollAutoClose}}
                  @onChange={{fn (mut this.pollAutoClose)}}
                  @clearable={{true}}
                  @useGlobalPickerContainer={{true}}
                />
              </div>
  
              <div class="input-group poll-select">
                <label class="input-group-label">{{i18n
                    "poll.ui_builder.poll_result.label"
                  }}</label>
                <ComboBox
                  @content={{this.pollResults}}
                  @value={{this.pollResult}}
                  @valueProperty="value"
                  @onChange={{fn (mut this.pollResult)}}
                  class="poll-result"
                />
              </div>
  
              {{#unless this.rankedChoiceOrNumber}}
                <div class="input-group poll-select column">
                  <label class="input-group-label">{{i18n
                      "poll.ui_builder.poll_chart_type.label"
                    }}</label>
  
                  <div class="radio-group">
                    <RadioButton
                      @id="poll-chart-type-bar"
                      @name="poll-chart-type"
                      @value="bar"
                      @selection={{this.chartType}}
                    />
                    <label for="poll-chart-type-bar">{{d-icon "chart-bar"}}
                      {{i18n "poll.ui_builder.poll_chart_type.bar"}}</label>
                  </div>
  
                  <div class="radio-group">
                    <RadioButton
                      @id="poll-chart-type-pie"
                      @name="poll-chart-type"
                      @value="pie"
                      @selection={{this.chartType}}
                    />
                    <label for="poll-chart-type-pie">{{d-icon "chart-pie"}}
                      {{i18n "poll.ui_builder.poll_chart_type.pie"}}</label>
                  </div>
                </div>
              {{/unless}}
            {{/if}}
          </:body>
          <:footer>
            <DButton
              @action={{this.insertPoll}}
              @icon="chart-bar"
              @label="poll.ui_builder.insert"
              @disabled={{this.disableInsert}}
              class="btn-primary insert-poll"
            />
  
            <DButton @label="cancel" @action={{@closeModal}} class="btn-flat" />
  
            <DButton
              @action={{this.toggleAdvanced}}
              @icon="gear"
              @title={{if
                this.showAdvanced
                "poll.ui_builder.hide_advanced"
                "poll.ui_builder.show_advanced"
              }}
              class="btn-default show-advanced"
            />
  
          </:footer>
        </DModal>
        */
        {
            "id": "/lRrbzQz",
            "block": "[[[8,[39,0],[[24,0,\"poll-ui-builder\"]],[[\"@title\",\"@closeModal\",\"@inline\"],[[28,[37,1],[\"poll.ui_builder.title\"],null],[30,1],[30,2]]],[[\"body\",\"footer\"],[[[[1,\"\\n    \"],[10,\"ul\"],[14,0,\"nav nav-pills poll-type\"],[12],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        \"],[8,[39,2],[[16,0,[28,[37,3],[\"poll-type-value poll-type-value-regular\",[52,[30,0,[\"isRegular\"]],\"active\"]],null]]],[[\"@action\"],[[28,[37,5],[[30,0,[\"updatePollType\"]],\"regular\"],null]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,1],[\"poll.ui_builder.poll_type.regular\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        \"],[8,[39,2],[[16,0,[28,[37,3],[\"poll-type-value poll-type-value-multiple\",[52,[30,0,[\"isMultiple\"]],\"active\"]],null]]],[[\"@action\"],[[28,[37,5],[[30,0,[\"updatePollType\"]],\"multiple\"],null]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,1],[\"poll.ui_builder.poll_type.multiple\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[30,0,[\"showNumber\"]],[[[1,\"        \"],[10,\"li\"],[12],[1,\"\\n          \"],[8,[39,2],[[16,0,[28,[37,3],[\"poll-type-value poll-type-value-number\",[52,[30,0,[\"isNumber\"]],\"active\"]],null]]],[[\"@action\"],[[28,[37,5],[[30,0,[\"updatePollType\"]],\"number\"],null]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,1],[\"poll.ui_builder.poll_type.number\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showRankedChoice\"]],[[[1,\"        \"],[10,\"li\"],[12],[1,\"\\n          \"],[8,[39,2],[[16,0,[28,[37,3],[\"poll-type-value poll-type-value-ranked-choice\",[52,[30,0,[\"isRankedChoice\"]],\"active\"]],null]]],[[\"@action\"],[[28,[37,5],[[30,0,[\"updatePollType\"]],\"ranked_choice\"],null]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,1],[\"poll.ui_builder.poll_type.ranked_choice\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showAdvanced\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group poll-title\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_title.label\"],null]],[13],[1,\"\\n        \"],[8,[39,6],null,[[\"@value\"],[[30,0,[\"pollTitle\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"isNumber\"]]],[[[1,\"      \"],[10,0],[14,0,\"poll-options\"],[12],[1,\"\\n\"],[41,[30,0,[\"showAdvanced\"]],[[[1,\"          \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_options.label\"],null]],[13],[1,\"\\n          \"],[8,[39,8],[[4,[38,9],[\"input\",[30,0,[\"onOptionsTextChange\"]]],null]],[[\"@value\"],[[30,0,[\"pollOptionsText\"]]]],null],[1,\"\"],[41,[30,0,[\"showMinNumOfOptionsValidation\"]],[[[41,[51,[30,0,[\"minNumOfOptionsValidation\",\"ok\"]]],[[[1,\"              \"],[8,[39,10],null,[[\"@validation\"],[[30,0,[\"minNumOfOptionsValidation\"]]]],null],[1,\"\\n\"]],[]],null]],[]],null]],[]],[[[42,[28,[37,12],[[28,[37,12],[[30,0,[\"pollOptions\"]]],null]],null],null,[[[1,\"            \"],[10,0],[14,0,\"input-group poll-option-value\"],[12],[1,\"\\n              \"],[11,\"input\"],[16,2,[30,3,[\"value\"]]],[24,4,\"text\"],[4,[38,13],null,null],[4,[38,9],[\"input\",[28,[37,5],[[30,0,[\"updateValue\"]],[30,3]],null]],null],[4,[38,9],[\"keydown\",[28,[37,5],[[30,0,[\"onInputKeydown\"]],[30,4]],null]],null],[12],[13],[1,\"\\n\"],[41,[30,0,[\"canRemoveOption\"]],[[[1,\"                \"],[8,[39,2],null,[[\"@icon\",\"@action\"],[\"trash-can\",[28,[37,5],[[30,0,[\"removeOption\"]],[30,3]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[3,4]],null],[1,\"\\n          \"],[10,0],[14,0,\"poll-option-controls\"],[12],[1,\"\\n            \"],[8,[39,2],[[24,0,\"btn-default poll-option-add\"]],[[\"@icon\",\"@label\",\"@action\"],[\"plus\",\"poll.ui_builder.poll_options.add\",[28,[37,5],[[30,0,[\"addOption\"]],-1],null]]],null],[1,\"\\n\"],[41,[28,[37,14],[[30,0,[\"showMinNumOfOptionsValidation\"]],[28,[37,15],[[30,0,[\"minNumOfOptionsValidation\",\"ok\"]]],null]],null],[[[1,\"              \"],[8,[39,10],null,[[\"@validation\"],[[30,0,[\"minNumOfOptionsValidation\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"rankedChoiceOrRegular\"]]],[[[1,\"      \"],[10,0],[14,0,\"options\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"input-group poll-number\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_config.min\"],null]],[13],[1,\"\\n          \"],[8,[39,6],[[24,0,\"poll-options-min\"],[24,\"min\",\"1\"]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"pollMin\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"input-group poll-number\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_config.max\"],null]],[13],[1,\"\\n          \"],[8,[39,6],[[24,0,\"poll-options-max\"],[24,\"min\",\"1\"]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"pollMax\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isNumber\"]],[[[1,\"          \"],[10,0],[14,0,\"input-group poll-number\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_config.step\"],null]],[13],[1,\"\\n            \"],[8,[39,6],[[24,\"min\",\"1\"],[24,0,\"poll-options-step\"]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"pollStep\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"minMaxValueValidation\",\"ok\"]]],[[[1,\"        \"],[8,[39,10],null,[[\"@validation\"],[[30,0,[\"minMaxValueValidation\"]]]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"input-group poll-public\"],[12],[1,\"\\n      \"],[8,[39,16],[[24,0,\"poll-toggle-public\"],[4,[38,9],[\"click\",[30,0,[\"togglePublic\"]]],null]],[[\"@state\",\"@label\"],[[30,0,[\"publicPoll\"]],\"poll.ui_builder.poll_public.label\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showAdvanced\"]],[[[1,\"      \"],[10,0],[14,0,\"input-group poll-allowed-groups\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_groups.label\"],null]],[13],[1,\"\\n        \"],[8,[39,17],null,[[\"@content\",\"@value\",\"@onChange\",\"@labelProperty\",\"@valueProperty\"],[[30,0,[\"siteGroups\"]],[30,0,[\"pollGroups\"]],[28,[37,5],[[28,[37,18],[[30,0,[\"pollGroups\"]]],null]],null],\"name\",\"name\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"input-group poll-date\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.automatic_close.label\"],null]],[13],[1,\"\\n        \"],[8,[39,19],null,[[\"@date\",\"@onChange\",\"@clearable\",\"@useGlobalPickerContainer\"],[[30,0,[\"pollAutoClose\"]],[28,[37,5],[[28,[37,18],[[30,0,[\"pollAutoClose\"]]],null]],null],true,true]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"input-group poll-select\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_result.label\"],null]],[13],[1,\"\\n        \"],[8,[39,20],[[24,0,\"poll-result\"]],[[\"@content\",\"@value\",\"@valueProperty\",\"@onChange\"],[[30,0,[\"pollResults\"]],[30,0,[\"pollResult\"]],\"value\",[28,[37,5],[[28,[37,18],[[30,0,[\"pollResult\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"rankedChoiceOrNumber\"]]],[[[1,\"        \"],[10,0],[14,0,\"input-group poll-select column\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,1],[\"poll.ui_builder.poll_chart_type.label\"],null]],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"radio-group\"],[12],[1,\"\\n            \"],[8,[39,21],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"poll-chart-type-bar\",\"poll-chart-type\",\"bar\",[30,0,[\"chartType\"]]]],null],[1,\"\\n            \"],[10,\"label\"],[14,\"for\",\"poll-chart-type-bar\"],[12],[1,[28,[35,22],[\"chart-bar\"],null]],[1,\"\\n              \"],[1,[28,[35,1],[\"poll.ui_builder.poll_chart_type.bar\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"radio-group\"],[12],[1,\"\\n            \"],[8,[39,21],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"poll-chart-type-pie\",\"poll-chart-type\",\"pie\",[30,0,[\"chartType\"]]]],null],[1,\"\\n            \"],[10,\"label\"],[14,\"for\",\"poll-chart-type-pie\"],[12],[1,[28,[35,22],[\"chart-pie\"],null]],[1,\"\\n              \"],[1,[28,[35,1],[\"poll.ui_builder.poll_chart_type.pie\"],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"  \"]],[]],[[[1,\"\\n    \"],[8,[39,2],[[24,0,\"btn-primary insert-poll\"]],[[\"@action\",\"@icon\",\"@label\",\"@disabled\"],[[30,0,[\"insertPoll\"]],\"chart-bar\",\"poll.ui_builder.insert\",[30,0,[\"disableInsert\"]]]],null],[1,\"\\n\\n    \"],[8,[39,2],[[24,0,\"btn-flat\"]],[[\"@label\",\"@action\"],[\"cancel\",[30,1]]],null],[1,\"\\n\\n    \"],[8,[39,2],[[24,0,\"btn-default show-advanced\"]],[[\"@action\",\"@icon\",\"@title\"],[[30,0,[\"toggleAdvanced\"]],\"gear\",[52,[30,0,[\"showAdvanced\"]],\"poll.ui_builder.hide_advanced\",\"poll.ui_builder.show_advanced\"]]],null],[1,\"\\n\\n  \"]],[]]]]]],[\"@closeModal\",\"@inline\",\"option\",\"index\"],false,[\"d-modal\",\"i18n\",\"d-button\",\"concatClass\",\"if\",\"fn\",\"input\",\"unless\",\"textarea\",\"on\",\"input-tip\",\"each\",\"-track-array\",\"auto-focus\",\"and\",\"not\",\"d-toggle-switch\",\"group-chooser\",\"mut\",\"date-time-input\",\"combo-box\",\"radio-button\",\"d-icon\"]]",
            "moduleName": "discourse/plugins/poll/discourse/components/modal/poll-ui-builder.hbs",
            "isStrictMode": false
        });
    const BAR_CHART_TYPE = _exports.BAR_CHART_TYPE = "bar";
    const PIE_CHART_TYPE = _exports.PIE_CHART_TYPE = "pie";
    const REGULAR_POLL_TYPE = _exports.REGULAR_POLL_TYPE = "regular";
    const NUMBER_POLL_TYPE = _exports.NUMBER_POLL_TYPE = "number";
    const MULTIPLE_POLL_TYPE = _exports.MULTIPLE_POLL_TYPE = "multiple";
    const RANKED_CHOICE_POLL_TYPE = _exports.RANKED_CHOICE_POLL_TYPE = "ranked_choice";
    const ALWAYS_POLL_RESULT = "always";
    const VOTE_POLL_RESULT = "on_vote";
    const CLOSED_POLL_RESULT = "on_close";
    const STAFF_POLL_RESULT = "staff_only";
    class PollUiBuilderModal extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        showAdvanced = false;
        pollType = (() => REGULAR_POLL_TYPE)();
        pollTitle;
        pollOptions = (() => [_object.default.create({
            value: ""
        })])();
        pollOptionsText = "";
        pollMin = 1;
        pollMax = 2;
        pollStep = 1;
        pollGroups;
        pollAutoClose;
        pollResult = (() => ALWAYS_POLL_RESULT)();
        chartType = (() => BAR_CHART_TYPE)();
        publicPoll = this.siteSettings.poll_default_public;
        static# _2 = (() => dt7948.g(this.prototype, "showNumber", [(0, _computed.or)("showAdvanced", "isNumber")]))();#
        showNumber = (() => (dt7948.i(this, "showNumber"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "showRankedChoice", [(0, _computed.or)("showAdvanced", "isRankedChoice")]))();#
        showRankedChoice = (() => (dt7948.i(this, "showRankedChoice"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "canRemoveOption", [(0, _computed.gt)("pollOptions.length", 1)]))();#
        canRemoveOption = (() => (dt7948.i(this, "canRemoveOption"), void 0))();
        static# _5 = (() => dt7948.g(this.prototype, "rankedChoiceOrRegular", [(0, _computed.or)("isRankedChoice", "isRegular")]))();#
        rankedChoiceOrRegular = (() => (dt7948.i(this, "rankedChoiceOrRegular"), void 0))();
        static# _6 = (() => dt7948.g(this.prototype, "rankedChoiceOrNumber", [(0, _computed.or)("isRankedChoice", "isNumber")]))();#
        rankedChoiceOrNumber = (() => (dt7948.i(this, "rankedChoiceOrNumber"), void 0))();
        pollResults(staff) {
            const options = [{
                name: _discourseI18n.default.t("poll.ui_builder.poll_result.always"),
                value: ALWAYS_POLL_RESULT
            }, {
                name: _discourseI18n.default.t("poll.ui_builder.poll_result.vote"),
                value: VOTE_POLL_RESULT
            }, {
                name: _discourseI18n.default.t("poll.ui_builder.poll_result.closed"),
                value: CLOSED_POLL_RESULT
            }];
            if (staff) {
                options.push({
                    name: _discourseI18n.default.t("poll.ui_builder.poll_result.staff"),
                    value: STAFF_POLL_RESULT
                });
            }
            return options;
        }
        static# _7 = (() => dt7948.n(this.prototype, "pollResults", [(0, _decorators.default)("currentUser.staff")]))();
        isRegular(pollType) {
            return pollType === REGULAR_POLL_TYPE;
        }
        static# _8 = (() => dt7948.n(this.prototype, "isRegular", [(0, _decorators.default)("pollType")]))();
        isNumber(pollType) {
            return pollType === NUMBER_POLL_TYPE;
        }
        static# _9 = (() => dt7948.n(this.prototype, "isNumber", [(0, _decorators.default)("pollType")]))();
        isMultiple(pollType) {
            return pollType === MULTIPLE_POLL_TYPE;
        }
        static# _10 = (() => dt7948.n(this.prototype, "isMultiple", [(0, _decorators.default)("pollType")]))();
        isRankedChoice(pollType) {
            return pollType === RANKED_CHOICE_POLL_TYPE;
        }
        static# _11 = (() => dt7948.n(this.prototype, "isRankedChoice", [(0, _decorators.default)("pollType")]))();
        pollOptionsCount(pollOptions) {
            return (pollOptions || []).filter(option => option.value.length > 0).length;
        }
        static# _12 = (() => dt7948.n(this.prototype, "pollOptionsCount", [(0, _decorators.default)("pollOptions.@each.value")]))();
        siteGroups(groups) {
            // prevents group "everyone" to be listed
            return groups.filter(g => g.id !== 0);
        }
        static# _13 = (() => dt7948.n(this.prototype, "siteGroups", [(0, _decorators.default)("site.groups")]))();
        isPie(chartType, pollType) {
            return pollType !== NUMBER_POLL_TYPE && chartType === PIE_CHART_TYPE;
        }
        static# _14 = (() => dt7948.n(this.prototype, "isPie", [(0, _decorators.default)("chartType", "pollType")]))();
        _setPollMinMax() {
            if (this.isMultiple) {
                if (this.pollMin <= 0 || this.pollMin >= this.pollMax || this.pollMin >= this.pollOptionsCount) {
                    this.set("pollMin", this.pollOptionsCount > 0 ? 1 : 0);
                }
                if (this.pollMax <= 0 || this.pollMin >= this.pollMax || this.pollMax > this.pollOptionsCount) {
                    this.set("pollMax", this.pollOptionsCount);
                }
            } else if (this.isNumber) {
                this.set("pollMax", this.siteSettings.poll_maximum_options);
            }
        }
        static# _15 = (() => dt7948.n(this.prototype, "_setPollMinMax", [(0, _object2.observes)("pollType", "pollOptionsCount")]))();
        pollOutput(pollType, pollResult, publicPoll, pollTitle, pollOptions, pollMin, pollMax, pollStep, pollGroups, pollAutoClose, chartType) {
            let pollHeader = "[poll";
            let output = "";
            const match = this.model.toolbarEvent.getText().match(/\[poll(\s+name=[^\s\]]+)*.*\]/gim);
            if (match) {
                pollHeader += ` name=poll${match.length + 1}`;
            }
            let step = pollStep;
            if (step < 1) {
                step = 1;
            }
            if (pollType) {
                pollHeader += ` type=${pollType}`;
            }
            if (pollResult) {
                pollHeader += ` results=${pollResult}`;
            }
            if (pollMin && pollType !== REGULAR_POLL_TYPE) {
                pollHeader += ` min=${pollMin}`;
            }
            if (pollMax && pollType !== REGULAR_POLL_TYPE) {
                pollHeader += ` max=${pollMax}`;
            }
            if (pollType === NUMBER_POLL_TYPE) {
                pollHeader += ` step=${step}`;
            }
            pollHeader += ` public=${publicPoll ? "true" : "false"}`;
            if (chartType && pollType !== NUMBER_POLL_TYPE) {
                pollHeader += ` chartType=${chartType}`;
            }
            if (pollGroups && pollGroups.length > 0) {
                pollHeader += ` groups=${pollGroups}`;
            }
            if (pollAutoClose) {
                pollHeader += ` close=${pollAutoClose.toISOString()}`;
            }
            pollHeader += "]";
            output += `${pollHeader}\n`;
            if (pollTitle) {
                output += `# ${pollTitle.trim()}\n`;
            }
            if (pollOptions.length > 0 && pollType !== NUMBER_POLL_TYPE) {
                pollOptions.forEach(option => {
                    if (option.value.length > 0) {
                        output += `* ${option.value.trim()}\n`;
                    }
                });
            }
            output += "[/poll]\n";
            return output;
        }
        static# _16 = (() => dt7948.n(this.prototype, "pollOutput", [(0, _decorators.default)("pollType", "pollResult", "publicPoll", "pollTitle", "pollOptions.@each.value", "pollMin", "pollMax", "pollStep", "pollGroups", "pollAutoClose", "chartType")]))();
        minNumOfOptionsValidation(isNumber, pollOptionsCount) {
            let options = {
                ok: true
            };
            if (!isNumber) {
                if (pollOptionsCount < 1) {
                    return _object.default.create({
                        failed: true,
                        reason: _discourseI18n.default.t("poll.ui_builder.help.options_min_count")
                    });
                }
                if (pollOptionsCount > this.siteSettings.poll_maximum_options) {
                    return _object.default.create({
                        failed: true,
                        reason: _discourseI18n.default.t("poll.ui_builder.help.options_max_count", {
                            count: this.siteSettings.poll_maximum_options
                        })
                    });
                }
            }
            return _object.default.create(options);
        }
        static# _17 = (() => dt7948.n(this.prototype, "minNumOfOptionsValidation", [(0, _decorators.default)("isNumber", "pollOptionsCount")]))();
        showMinNumOfOptionsValidation(pollOptions) {
            return pollOptions.length !== 1 || pollOptions[0].value !== "";
        }
        static# _18 = (() => dt7948.n(this.prototype, "showMinNumOfOptionsValidation", [(0, _decorators.default)("pollOptions.@each.value")]))();
        minMaxValueValidation(isMultiple, pollOptionsCount, isNumber, pollMin, pollMax, pollStep) {
            pollMin = parseInt(pollMin, 10) || 0;
            pollMax = parseInt(pollMax, 10) || 0;
            pollStep = parseInt(pollStep, 10) || 0;
            if (pollMin < 0) {
                return _object.default.create({
                    failed: true,
                    reason: _discourseI18n.default.t("poll.ui_builder.help.invalid_min_value")
                });
            }
            if (pollMax < 0 || isMultiple && pollMax > pollOptionsCount) {
                return _object.default.create({
                    failed: true,
                    reason: _discourseI18n.default.t("poll.ui_builder.help.invalid_max_value")
                });
            }
            if (pollMin > pollMax) {
                return _object.default.create({
                    failed: true,
                    reason: _discourseI18n.default.t("poll.ui_builder.help.invalid_values")
                });
            }
            if (isNumber) {
                if (pollStep < 1) {
                    return _object.default.create({
                        failed: true,
                        reason: _discourseI18n.default.t("poll.ui_builder.help.min_step_value")
                    });
                }
                const optionsCount = (pollMax - pollMin + 1) / pollStep;
                if (optionsCount < 1) {
                    return _object.default.create({
                        failed: true,
                        reason: _discourseI18n.default.t("poll.ui_builder.help.options_min_count")
                    });
                }
                if (optionsCount > this.siteSettings.poll_maximum_options) {
                    return _object.default.create({
                        failed: true,
                        reason: _discourseI18n.default.t("poll.ui_builder.help.options_max_count", {
                            count: this.siteSettings.poll_maximum_options
                        })
                    });
                }
            }
            return _object.default.create({
                ok: true
            });
        }
        static# _19 = (() => dt7948.n(this.prototype, "minMaxValueValidation", [(0, _decorators.default)("isMultiple", "pollOptionsCount", "isNumber", "pollMin", "pollMax", "pollStep")]))();
        disableInsert(minMaxValueValidation, minNumOfOptionsValidation) {
            return !minMaxValueValidation.ok || !minNumOfOptionsValidation.ok;
        }
        static# _20 = (() => dt7948.n(this.prototype, "disableInsert", [(0, _decorators.default)("minMaxValueValidation", "minNumOfOptionsValidation")]))();
        _comboboxOptions(startIndex, endIndex) {
            return [...Array(endIndex - startIndex).keys()].map(number => ({
                value: number + startIndex,
                name: number + startIndex
            }));
        }
        onOptionsTextChange(e) {
            this.set("pollOptions", e.target.value.split("\n").map(value => _object.default.create({
                value
            })));
        }
        static# _21 = (() => dt7948.n(this.prototype, "onOptionsTextChange", [_object.action]))();
        insertPoll() {
            this.model.toolbarEvent.addText(this.pollOutput);
            this.closeModal();
        }
        static# _22 = (() => dt7948.n(this.prototype, "insertPoll", [_object.action]))();
        toggleAdvanced() {
            this.toggleProperty("showAdvanced");
            if (this.showAdvanced) {
                this.set("pollOptionsText", this.pollOptions.map(x => x.value).join("\n"));
            }
        }
        static# _23 = (() => dt7948.n(this.prototype, "toggleAdvanced", [_object.action]))();
        updateValue(option, event) {
            option.set("value", event.target.value);
        }
        static# _24 = (() => dt7948.n(this.prototype, "updateValue", [_object.action]))();
        onInputKeydown(index, event) {
            if (event.key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                if (event.target.value !== "") {
                    this.addOption(index + 1);
                }
            }
        }
        static# _25 = (() => dt7948.n(this.prototype, "onInputKeydown", [_object.action]))();
        addOption(atIndex) {
            if (atIndex === -1) {
                atIndex = this.pollOptions.length;
            }
            const option = _object.default.create({
                value: ""
            });
            this.pollOptions.insertAt(atIndex, option);
        }
        static# _26 = (() => dt7948.n(this.prototype, "addOption", [_object.action]))();
        removeOption(option) {
            this.pollOptions.removeObject(option);
        }
        static# _27 = (() => dt7948.n(this.prototype, "removeOption", [_object.action]))();
        updatePollType(pollType, event) {
            event ? .preventDefault();
            this.set("pollType", pollType);
        }
        static# _28 = (() => dt7948.n(this.prototype, "updatePollType", [_object.action]))();
        togglePublic() {
            this.set("publicPoll", !this.publicPoll);
        }
        static# _29 = (() => dt7948.n(this.prototype, "togglePublic", [_object.action]))();
    }
    _exports.default = PollUiBuilderModal;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PollUiBuilderModal);
});