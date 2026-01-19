define("discourse/plugins/discourse-assign/discourse/components/bulk-actions/assign-user", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember-compat/tracked-built-ins", "@ember/template-factory"], function(_exports, _component, _component2, _object, _trackedBuiltIns, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
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
            "id": "1BdIAbQx",
            "block": "[[[10,0],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@model\",\"@onSubmit\",\"@formApi\"],[[30,0,[\"model\"]],[30,0,[\"assign\"]],[30,0,[\"formApi\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[12],[1,\"\\n  \"],[8,[39,1],[[24,0,\"btn-primary\"]],[[\"@action\",\"@label\"],[[30,0,[\"formApi\",\"submit\"]],[52,[30,0,[\"model\",\"reassign\"]],\"discourse_assign.reassign.title\",\"discourse_assign.assign_modal.assign\"]]],null],[1,\"\\n\"],[13]],[],false,[\"assign-user-form\",\"d-button\",\"if\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/bulk-actions/assign-user.hbs",
            "isStrictMode": false
        });
    class AssignUser extends _component2.default {
        model = (() => new _trackedBuiltIns.TrackedObject({}))();

        // `submit` property will be mutated by the `AssignUserForm` component
        formApi = {
            submit() {}
        };
        async assign() {
            return this.args.performAndRefresh({
                type: "assign",
                username: this.model.username,
                status: this.model.status,
                note: this.model.note
            });
        }
        static# _ = (() => dt7948.n(this.prototype, "assign", [_object.action]))();
    }
    _exports.default = AssignUser;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, AssignUser);
});