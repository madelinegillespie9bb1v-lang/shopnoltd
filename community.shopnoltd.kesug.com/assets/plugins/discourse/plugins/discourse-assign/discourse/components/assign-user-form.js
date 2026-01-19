define("discourse/plugins/discourse-assign/discourse/components/assign-user-form", ["exports", "@glimmer/component", "@glimmer/tracking", "@ember/object", "discourse/plugins/discourse-assign/discourse/components/assignment", "@ember/component", "@ember/template-factory"], function(_exports, _component, _tracking, _object, _assignment, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class AssignUserForm extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "showValidationErrors", [_tracking.tracked], function() {
            return false;
        }))();#
        showValidationErrors = (() => (dt7948.i(this, "showValidationErrors"), void 0))();
        constructor() {
            super(...arguments);
            this.args.formApi.submit = this.assign;
        }
        get assigneeIsEmpty() {
            return !this.args.model.username && !this.args.model.group_name;
        }
        async assign() {
            if (this.assigneeIsEmpty) {
                this.showValidationErrors = true;
                return;
            }
            await this.args.onSubmit();
        }
        static# _2 = (() => dt7948.n(this.prototype, "assign", [_object.action]))();
        static# _3 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <Assignment
                  @assignment={{@model}}
                  @onSubmit={{this.assign}}
                  @showValidationErrors={{this.showValidationErrors}}
                />
              
            */
            {
                "id": "DEZrvZWn",
                "block": "[[[1,\"\\n    \"],[8,[32,0],null,[[\"@assignment\",\"@onSubmit\",\"@showValidationErrors\"],[[30,1],[30,0,[\"assign\"]],[30,0,[\"showValidationErrors\"]]]],null],[1,\"\\n  \"]],[\"@model\"],false,[]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/assign-user-form.js",
                "scope": () => [_assignment.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = AssignUserForm;
});