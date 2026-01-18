define("discourse/plugins/discourse-assign/discourse/components/assigned-topic-list-column", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "discourse/plugins/discourse-assign/discourse/components/assign-actions-dropdown", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _service, _assignActionsDropdown, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class AssignedTopicListColumn extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "router", [_service.inject]))();#
        router = (() => (dt7948.i(this, "router"), void 0))();
        async unassign(targetId1) {
            let targetType1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Topic";
            await this.taskActions.unassign(targetId1, targetType1);
            this.router.refresh();
        }
        static# _3 = (() => dt7948.n(this.prototype, "unassign", [_object.action]))();
        reassign(topic1) {
            this.taskActions.showAssignModal(topic1, {
                onSuccess: () => this.router.refresh()
            });
        }
        static# _4 = (() => dt7948.n(this.prototype, "reassign", [_object.action]))();
        static# _5 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                {{#if @topic.assigned_to_user}}
                  <AssignActionsDropdown
                    @topic={{@topic}}
                    @assignee={{@topic.assigned_to_user.username}}
                    @unassign={{this.unassign}}
                    @reassign={{this.reassign}}
                  />
                {{else if @topic.assigned_to_group}}
                  <AssignActionsDropdown
                    @topic={{@topic}}
                    @assignee={{@topic.assigned_to_group.name}}
                    @group={{true}}
                    @unassign={{this.unassign}}
                    @reassign={{this.reassign}}
                  />
                {{else}}
                  <AssignActionsDropdown @topic={{@topic}} @unassign={{this.unassign}} />
                {{/if}}
              
            */
            {
                "id": "CgiPEHvE",
                "block": "[[[1,\"\\n\"],[41,[30,1,[\"assigned_to_user\"]],[[[1,\"      \"],[8,[32,0],null,[[\"@topic\",\"@assignee\",\"@unassign\",\"@reassign\"],[[30,1],[30,1,[\"assigned_to_user\",\"username\"]],[30,0,[\"unassign\"]],[30,0,[\"reassign\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,1,[\"assigned_to_group\"]],[[[1,\"      \"],[8,[32,0],null,[[\"@topic\",\"@assignee\",\"@group\",\"@unassign\",\"@reassign\"],[[30,1],[30,1,[\"assigned_to_group\",\"name\"]],true,[30,0,[\"unassign\"]],[30,0,[\"reassign\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[32,0],null,[[\"@topic\",\"@unassign\"],[[30,1],[30,0,[\"unassign\"]]]],null],[1,\"\\n    \"]],[]]]],[]]],[1,\"  \"]],[\"@topic\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/assigned-topic-list-column.js",
                "scope": () => [_assignActionsDropdown.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = AssignedTopicListColumn;
});