define("discourse/plugins/discourse-assign/discourse/templates/connectors/above-review-filters/assigned-to-filter", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="reviewable-filter discourse-assign-assign-to-filter">
          <label class="filter-label">{{i18n "discourse_assign.assigned_to"}}</label>
          <EmailGroupUserChooser
            autocomplete="off"
            @value={{this.additionalFilters.assigned_to}}
            @onChange={{this.updateAssignedTo}}
            @options={{hash
              maximum=1
              fullWidthWrap=true
              includeGroups=false
              groupMembersOf=this.allowedGroups
            }}
          />
        </div>
        */
        {
            "id": "Y/cVn80D",
            "block": "[[[10,0],[14,0,\"reviewable-filter discourse-assign-assign-to-filter\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"filter-label\"],[12],[1,[28,[35,0],[\"discourse_assign.assigned_to\"],null]],[13],[1,\"\\n  \"],[8,[39,1],[[24,\"autocomplete\",\"off\"]],[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"additionalFilters\",\"assigned_to\"]],[30,0,[\"updateAssignedTo\"]],[28,[37,2],null,[[\"maximum\",\"fullWidthWrap\",\"includeGroups\",\"groupMembersOf\"],[1,true,false,[30,0,[\"allowedGroups\"]]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"email-group-user-chooser\",\"hash\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/connectors/above-review-filters/assigned-to-filter.hbs",
            "isStrictMode": false
        });
});