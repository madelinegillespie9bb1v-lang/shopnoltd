define("discourse/plugins/discourse-assign/discourse/components/remind-assigns-frequency", ["exports", "@ember/component", "discourse-common/utils/decorators", "I18n", "@ember/template-factory"], function(_exports, _component, _decorators, _I18n, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.siteSettings.assign_enabled}}
          <div class="controls controls-dropdown">
            <label>{{i18n "discourse_assign.reminders_frequency.description"}}</label>
            <ComboBox
              @id="remind-assigns-frequency"
              @valueProperty="value"
              @content={{this.availableFrequencies}}
              @value={{this.selectedFrequency}}
              @onChange={{action
                (mut this.user.custom_fields.remind_assigns_frequency)
              }}
            />
          </div>
        {{/if}}
        */
        {
            "id": "X3K6QQFI",
            "block": "[[[41,[30,0,[\"siteSettings\",\"assign_enabled\"]],[[[1,\"  \"],[10,0],[14,0,\"controls controls-dropdown\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"discourse_assign.reminders_frequency.description\"],null]],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\"],[\"remind-assigns-frequency\",\"value\",[30,0,[\"availableFrequencies\"]],[30,0,[\"selectedFrequency\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"user\",\"custom_fields\",\"remind_assigns_frequency\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"i18n\",\"combo-box\",\"action\",\"mut\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/remind-assigns-frequency.hbs",
            "isStrictMode": false
        });
    class RemindAssignsFrequency extends _component.default {
        selectedFrequency(userAssignsFrequency, siteDefaultAssignsFrequency) {
            if (this.availableFrequencies.map(freq => freq.value).includes(userAssignsFrequency)) {
                return userAssignsFrequency;
            }
            return siteDefaultAssignsFrequency;
        }
        static# _ = (() => dt7948.n(this.prototype, "selectedFrequency", [(0, _decorators.default)("user.custom_fields.remind_assigns_frequency", "siteSettings.remind_assigns_frequency")]))();
        availableFrequencies(userRemindersFrequency) {
            return userRemindersFrequency.map(freq => ({
                name: _I18n.default.t(freq.name),
                value: freq.value,
                selected: false
            }));
        }
        static# _2 = (() => dt7948.n(this.prototype, "availableFrequencies", [(0, _decorators.default)("user.reminders_frequency")]))();
    }
    _exports.default = RemindAssignsFrequency;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, RemindAssignsFrequency);
});