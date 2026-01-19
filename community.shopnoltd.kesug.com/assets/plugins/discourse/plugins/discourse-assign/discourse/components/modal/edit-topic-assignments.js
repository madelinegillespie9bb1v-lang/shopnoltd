define("discourse/plugins/discourse-assign/discourse/components/modal/edit-topic-assignments", ["exports", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "discourse/components/d-button", "discourse/components/d-modal", "discourse/components/d-modal-cancel", "discourse/lib/ajax-error", "I18n", "discourse/plugins/discourse-assign/discourse/components/topic-assignments", "@ember/component", "@ember/template-factory"], function(_exports, _component, _tracking, _object, _service, _dButton, _dModal, _dModalCancel, _ajaxError, _I18n, _topicAssignments, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class EditTopicAssignments extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "assignments", [_tracking.tracked], function() {
            return this.topic.assignments();
        }))();#
        assignments = (() => (dt7948.i(this, "assignments"), void 0))();
        get title() {
            if (this.topic.isAssigned() || this.topic.hasAssignedPosts()) {
                return _I18n.default.t("edit_assignments_modal.title");
            } else {
                return _I18n.default.t("discourse_assign.assign_modal.title");
            }
        }
        get topic() {
            return this.args.model.topic;
        }
        async submit() {
            this.args.closeModal();
            try {
                await this.#assign();
            } catch (error1) {
                (0, _ajaxError.popupAjaxError)(error1);
            }
        }
        static# _3 = (() => dt7948.n(this.prototype, "submit", [_object.action]))();
        async# assign() {
            for (const assignment1 of this.assignments) {
                if (assignment1.isEdited) {
                    await this.taskActions.putAssignment(assignment1);
                }
            }
        }
        static# _4 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <DModal class="assign" @title={{this.title}} @closeModal={{@closeModal}}>
                  <:body>
                    <TopicAssignments
                      @assignments={{this.assignments}}
                      @onSubmit={{this.submit}}
                    />
                  </:body>
                  <:footer>
                    <DButton
                      class="btn-primary"
                      @action={{this.submit}}
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
                "id": "hy5lowUx",
                "block": "[[[1,\"\\n    \"],[8,[32,0],[[24,0,\"assign\"]],[[\"@title\",\"@closeModal\"],[[30,0,[\"title\"]],[30,1]]],[[\"body\",\"footer\"],[[[[1,\"\\n        \"],[8,[32,1],null,[[\"@assignments\",\"@onSubmit\"],[[30,0,[\"assignments\"]],[30,0,[\"submit\"]]]],null],[1,\"\\n      \"]],[]],[[[1,\"\\n        \"],[8,[32,2],[[24,0,\"btn-primary\"]],[[\"@action\",\"@label\"],[[30,0,[\"submit\"]],[52,[30,0,[\"model\",\"reassign\"]],\"discourse_assign.reassign.title\",\"discourse_assign.assign_modal.assign\"]]],null],[1,\"\\n\\n        \"],[8,[32,3],null,[[\"@close\"],[[30,1]]],null],[1,\"\\n      \"]],[]]]]],[1,\"\\n  \"]],[\"@closeModal\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/modal/edit-topic-assignments.js",
                "scope": () => [_dModal.default, _topicAssignments.default, _dButton.default, _dModalCancel.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = EditTopicAssignments;
});