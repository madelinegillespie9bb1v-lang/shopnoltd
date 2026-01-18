define("discourse/plugins/discourse-assign/discourse/templates/connectors/groups-interaction-custom-options/assignable-interaction-fields", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="control-group">
          <label class="control-label">
            {{i18n "discourse_assign.admin.groups.manage.interaction.assign"}}
          </label>
  
          <label for="visibility">
            {{i18n
              "discourse_assign.admin.groups.manage.interaction.assignable_levels.title"
            }}
          </label>
  
          <ComboBox
            @name="alias"
            @valueProperty="value"
            @value={{this.assignableLevel}}
            @content={{this.assignableLevelOptions}}
            @onChange={{this.onChangeAssignableLevel}}
            class="groups-form-assignable-level"
          />
        </div>
        */
        {
            "id": "Vkxx4Ccs",
            "block": "[[[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"discourse_assign.admin.groups.manage.interaction.assign\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"label\"],[14,\"for\",\"visibility\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"discourse_assign.admin.groups.manage.interaction.assignable_levels.title\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,1],[[24,0,\"groups-form-assignable-level\"]],[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@onChange\"],[\"alias\",\"value\",[30,0,[\"assignableLevel\"]],[30,0,[\"assignableLevelOptions\"]],[30,0,[\"onChangeAssignableLevel\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"combo-box\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/connectors/groups-interaction-custom-options/assignable-interaction-fields.hbs",
            "isStrictMode": false
        });
});