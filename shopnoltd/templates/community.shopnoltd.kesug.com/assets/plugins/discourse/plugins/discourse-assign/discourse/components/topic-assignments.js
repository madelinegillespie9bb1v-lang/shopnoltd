define("discourse/plugins/discourse-assign/discourse/components/topic-assignments", ["exports", "@glimmer/component", "@glimmer/tracking", "@ember/object", "discourse-common/helpers/i18n", "I18n", "select-kit/components/combo-box", "discourse/plugins/discourse-assign/discourse/components/assignment", "@ember/component", "@ember/template-factory"], function(_exports, _component, _tracking, _object, _i18n, _I18n, _comboBox, _assignment, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class TopicAssignments extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "selectedAssignment", [_tracking.tracked], function() {
            return this.args.assignments.find(a1 => a1.id === 0);
        }))();#
        selectedAssignment = (() => (dt7948.i(this, "selectedAssignment"), void 0))();
        get assignmentOptions() {
            return this.args.assignments.map(a1 => this.#toComboBoxOption(a1));
        }
        selectAssignment(id1) {
            this.selectedAssignment = this.args.assignments.find(a1 => a1.id === id1);
        }
        static# _2 = (() => dt7948.n(this.prototype, "selectAssignment", [_object.action]))();#
        toComboBoxOption(assignment1) {
            const option1 = {
                id: assignment1.id
            };
            if (assignment1.targetType === "Topic") {
                option1.name = _I18n.default.t("edit_assignments_modal.topic");
            } else {
                option1.name = `${_I18n.default.t("edit_assignments_modal.post")} #${assignment1.postNumber}`;
            }
            return option1;
        }
        static# _3 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="control-group target">
                  <label>{{i18n "discourse_assign.assign_modal.assignment_label"}}</label>
                  <ComboBox
                    @value={{this.selectedAssignment.id}}
                    @content={{this.assignmentOptions}}
                    @onChange={{this.selectAssignment}}
                  />
                </div>
                <Assignment
                  @assignment={{this.selectedAssignment}}
                  @onSubmit={{@onSubmit}}
                  @showValidationErrors={{false}}
                />
              
            */
            {
                "id": "q8K6z1Hy",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"control-group target\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[32,0],[\"discourse_assign.assign_modal.assignment_label\"],null]],[13],[1,\"\\n      \"],[8,[32,1],null,[[\"@value\",\"@content\",\"@onChange\"],[[30,0,[\"selectedAssignment\",\"id\"]],[30,0,[\"assignmentOptions\"]],[30,0,[\"selectAssignment\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[32,2],null,[[\"@assignment\",\"@onSubmit\",\"@showValidationErrors\"],[[30,0,[\"selectedAssignment\"]],[30,1],false]],null],[1,\"\\n  \"]],[\"@onSubmit\"],false,[]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/topic-assignments.js",
                "scope": () => [_i18n.default, _comboBox.default, _assignment.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = TopicAssignments;
});