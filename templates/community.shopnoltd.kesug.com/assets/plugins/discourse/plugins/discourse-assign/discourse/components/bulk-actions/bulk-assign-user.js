define("discourse/plugins/discourse-assign/discourse/components/bulk-actions/bulk-assign-user", ["exports", "@glimmer/component", "@ember/object", "@ember/render-modifiers/modifiers/did-insert", "@ember-compat/tracked-built-ins", "discourse/plugins/discourse-assign/discourse/components/assign-user-form", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _didInsert, _trackedBuiltIns, _assignUserForm, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class BulkActionsAssignUser extends _component.default {
        model = (() => new _trackedBuiltIns.TrackedObject({}))();
        formApi = {
            submit() {}
        };
        async assign(performAndRefreshCallback1) {
            return performAndRefreshCallback1({
                type: "assign",
                username: this.model.username,
                status: this.model.status,
                note: this.model.note
            });
        }
        static# _ = (() => dt7948.n(this.prototype, "assign", [_object.action]))();
        performRegistration() {
            this.args.onRegisterAction ? .(this.assign.bind(this));
        }
        static# _2 = (() => dt7948.n(this.prototype, "performRegistration", [_object.action]))();
        static# _3 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <span {{didInsert this.performRegistration}}></span>
                <AssignUserForm
                  @model={{this.model}}
                  @onSubmit={{this.assign}}
                  @formApi={{this.formApi}}
                />
              
            */
            {
                "id": "JVQmYH9x",
                "block": "[[[1,\"\\n    \"],[11,1],[4,[32,0],[[30,0,[\"performRegistration\"]]],null],[12],[13],[1,\"\\n    \"],[8,[32,1],null,[[\"@model\",\"@onSubmit\",\"@formApi\"],[[30,0,[\"model\"]],[30,0,[\"assign\"]],[30,0,[\"formApi\"]]]],null],[1,\"\\n  \"]],[],false,[]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/bulk-actions/bulk-assign-user.js",
                "scope": () => [_didInsert.default, _assignUserForm.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = BulkActionsAssignUser;
});