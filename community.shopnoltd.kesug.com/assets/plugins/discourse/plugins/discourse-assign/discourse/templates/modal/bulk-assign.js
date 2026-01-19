define("discourse/plugins/discourse-assign/discourse/templates/modal/bulk-assign", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div>
          <AssignUserForm
            @model={{this.model}}
            @onSubmit={{this.assign}}
            @formApi={{this.formApi}}
          />
        </div>
  
        <div>
          <DButton
            class="btn-primary"
            @action={{this.formApi.submit}}
            @label={{if
              this.model.reassign
              "discourse_assign.reassign.title"
              "discourse_assign.assign_modal.assign"
            }}
          />
        </div>
        */
        {
            "id": "nB7eSP6G",
            "block": "[[[10,0],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@model\",\"@onSubmit\",\"@formApi\"],[[30,0,[\"model\"]],[30,0,[\"assign\"]],[30,0,[\"formApi\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[8,[39,1],[[24,0,\"btn-primary\"]],[[\"@action\",\"@label\"],[[30,0,[\"formApi\",\"submit\"]],[52,[30,0,[\"model\",\"reassign\"]],\"discourse_assign.reassign.title\",\"discourse_assign.assign_modal.assign\"]]],null],[1,\"\\n\"],[13]],[],false,[\"assign-user-form\",\"d-button\",\"if\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/modal/bulk-assign.hbs",
            "isStrictMode": false
        });
});