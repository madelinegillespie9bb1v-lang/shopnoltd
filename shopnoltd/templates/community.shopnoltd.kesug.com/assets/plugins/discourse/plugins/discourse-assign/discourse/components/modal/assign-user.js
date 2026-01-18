define("discourse/plugins/discourse-assign/discourse/components/modal/assign-user", ["exports", "@ember/component", "@glimmer/component", "@ember/object", "@ember/service", "@ember-compat/tracked-built-ins", "I18n", "@ember/template-factory"], function(_exports, _component, _component2, _object, _service, _trackedBuiltIns, _I18n, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <DModal class="assign" @title={{this.title}} @closeModal={{@closeModal}}>
          <:body>
            <AssignUserForm
              @model={{this.model}}
              @onSubmit={{this.onSubmit}}
              @formApi={{this.formApi}}
            />
          </:body>
  
          <:footer>
            <DButton
              class="btn-primary"
              @action={{this.formApi.submit}}
              @label={{if
                this.model.reassign
                "discourse_assign.reassign.title"
                "discourse_assign.assign_modal.assign"
              }}
            />
  
            <DModalCancel @close={{@closeModal}} />
          </:footer>
        </DModal>
        */
        {
            "id": "wlibZ2f0",
            "block": "[[[8,[39,0],[[24,0,\"assign\"]],[[\"@title\",\"@closeModal\"],[[30,0,[\"title\"]],[30,1]]],[[\"body\",\"footer\"],[[[[1,\"\\n    \"],[8,[39,1],null,[[\"@model\",\"@onSubmit\",\"@formApi\"],[[30,0,[\"model\"]],[30,0,[\"onSubmit\"]],[30,0,[\"formApi\"]]]],null],[1,\"\\n  \"]],[]],[[[1,\"\\n    \"],[8,[39,2],[[24,0,\"btn-primary\"]],[[\"@action\",\"@label\"],[[30,0,[\"formApi\",\"submit\"]],[52,[30,0,[\"model\",\"reassign\"]],\"discourse_assign.reassign.title\",\"discourse_assign.assign_modal.assign\"]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@close\"],[[30,1]]],null],[1,\"\\n  \"]],[]]]]]],[\"@closeModal\"],false,[\"d-modal\",\"assign-user-form\",\"d-button\",\"if\",\"d-modal-cancel\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/modal/assign-user.hbs",
            "isStrictMode": false
        });
    class AssignUser extends _component2.default {
        static# _ = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        model = (() => new _trackedBuiltIns.TrackedObject(this.args.model))();

        // `submit` property will be mutated by the `AssignUserForm` component
        formApi = {
            submit() {}
        };
        get title() {
            let i18nSuffix;
            switch (this.model.targetType) {
                case "Post":
                    i18nSuffix = "_post_modal";
                    break;
                case "Topic":
                    i18nSuffix = "_modal";
                    break;
            }
            return _I18n.default.t(`discourse_assign.assign${i18nSuffix}.${this.model.reassign ? "reassign_title" : "title"}`);
        }
        async onSubmit() {
            this.args.closeModal();
            await this.taskActions.assign(this.model);
        }
        static# _2 = (() => dt7948.n(this.prototype, "onSubmit", [_object.action]))();
    }
    _exports.default = AssignUser;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, AssignUser);
});