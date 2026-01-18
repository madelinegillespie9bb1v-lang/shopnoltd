define("discourse/plugins/discourse-solved/discourse/templates/connectors/category-custom-settings/solved-settings", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <h3>{{i18n "solved.title"}}</h3>
  
        {{#unless this.siteSettings.allow_solved_on_all_topics}}
          <section class="field">
            <div class="enable-accepted-answer">
              <label class="checkbox-label">
                <input
                  {{on "change" (action "onChangeSetting" value="target.checked")}}
                  checked={{this.category.enable_accepted_answers}}
                  type="checkbox"
                />
                {{i18n "solved.allow_accepted_answers"}}
              </label>
            </div>
          </section>
        {{/unless}}
  
        <section class="field auto-close-solved-topics">
          <label for="auto-close-solved-topics">
            {{i18n "solved.solved_topics_auto_close_hours"}}
          </label>
          <input
            {{on
              "input"
              (action
                (mut this.category.custom_fields.solved_topics_auto_close_hours)
                value="target.value"
              )
            }}
            value={{this.category.custom_fields.solved_topics_auto_close_hours}}
            type="number"
            min="0"
            id="auto-close-solved-topics"
          />
        </section>
        */
        {
            "id": "F36QesPH",
            "block": "[[[10,\"h3\"],[12],[1,[28,[35,0],[\"solved.title\"],null]],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"siteSettings\",\"allow_solved_on_all_topics\"]]],[[[1,\"  \"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"enable-accepted-answer\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n        \"],[11,\"input\"],[16,\"checked\",[30,0,[\"category\",\"enable_accepted_answers\"]]],[24,4,\"checkbox\"],[4,[38,2],[\"change\",[28,[37,3],[[30,0],\"onChangeSetting\"],[[\"value\"],[\"target.checked\"]]]],null],[12],[13],[1,\"\\n        \"],[1,[28,[35,0],[\"solved.allow_accepted_answers\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,\"section\"],[14,0,\"field auto-close-solved-topics\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"auto-close-solved-topics\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"solved.solved_topics_auto_close_hours\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[11,\"input\"],[16,2,[30,0,[\"category\",\"custom_fields\",\"solved_topics_auto_close_hours\"]]],[24,\"min\",\"0\"],[24,1,\"auto-close-solved-topics\"],[24,4,\"number\"],[4,[38,2],[\"input\",[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"category\",\"custom_fields\",\"solved_topics_auto_close_hours\"]]],null]],[[\"value\"],[\"target.value\"]]]],null],[12],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"unless\",\"on\",\"action\",\"mut\"]]",
            "moduleName": "discourse/plugins/discourse-solved/discourse/templates/connectors/category-custom-settings/solved-settings.hbs",
            "isStrictMode": false
        });
});