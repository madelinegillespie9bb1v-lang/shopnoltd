define("discourse/plugins/discourse-assign/discourse/components/assigned-to-post", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "discourse/components/d-button", "discourse/components/dropdown-menu", "discourse-common/helpers/d-icon", "discourse-common/helpers/i18n", "float-kit/components/d-menu", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _service, _dButton, _dropdownMenu, _dIcon, _i18n, _dMenu, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class AssignedToPost extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        unassign() {
            this.taskActions.unassignPost(this.args.post);
        }
        static# _2 = (() => dt7948.n(this.prototype, "unassign", [_object.action]))();
        editAssignment() {
            this.taskActions.showAssignPostModal(this.args.post);
        }
        static# _3 = (() => dt7948.n(this.prototype, "editAssignment", [_object.action]))();
        static# _4 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                {{#if @assignedToUser}}
                  {{icon "user-plus"}}
                {{else}}
                  {{icon "group-plus"}}
                {{/if}}
    
                <span class="assign-text">
                  {{i18n "discourse_assign.assigned_to"}}
                </span>
    
                <a href={{@href}} class="assigned-to-username">
                  {{#if @assignedToUser}}
                    {{@assignedToUser.username}}
                  {{else}}
                    {{@assignedToGroup.name}}
                  {{/if}}
                </a>
    
                <DMenu
                  @identifier="post-assign-menu"
                  @icon="ellipsis-h"
                  class="btn-flat more-button"
                  @autofocus={{true}}
                >
                  <DropdownMenu as |dropdown|>
                    <dropdown.item>
                      <DButton
                        @action={{this.unassign}}
                        @icon="user-plus"
                        @label="discourse_assign.unassign.title"
                        class="btn-transparent unassign-btn"
                      />
                    </dropdown.item>
                    <dropdown.item>
                      <DButton
                        @action={{this.editAssignment}}
                        @icon="group-plus"
                        @label="discourse_assign.reassign.title_w_ellipsis"
                        class="btn-transparent edit-assignment-btn"
                      />
                    </dropdown.item>
                  </DropdownMenu>
                </DMenu>
              
            */
            {
                "id": "A42AgQci",
                "block": "[[[1,\"\\n\"],[41,[30,1],[[[1,\"      \"],[1,[28,[32,0],[\"user-plus\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[32,0],[\"group-plus\"],null]],[1,\"\\n\"]],[]]],[1,\"\\n    \"],[10,1],[14,0,\"assign-text\"],[12],[1,\"\\n      \"],[1,[28,[32,1],[\"discourse_assign.assigned_to\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,3],[15,6,[30,2]],[14,0,\"assigned-to-username\"],[12],[1,\"\\n\"],[41,[30,1],[[[1,\"        \"],[1,[30,1,[\"username\"]]],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[30,3,[\"name\"]]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\\n    \"],[8,[32,2],[[24,0,\"btn-flat more-button\"]],[[\"@identifier\",\"@icon\",\"@autofocus\"],[\"post-assign-menu\",\"ellipsis-h\",true]],[[\"default\"],[[[[1,\"\\n      \"],[8,[32,3],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,4,[\"item\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[32,4],[[24,0,\"btn-transparent unassign-btn\"]],[[\"@action\",\"@icon\",\"@label\"],[[30,0,[\"unassign\"]],\"user-plus\",\"discourse_assign.unassign.title\"]],null],[1,\"\\n        \"]],[]]]]],[1,\"\\n        \"],[8,[30,4,[\"item\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[32,4],[[24,0,\"btn-transparent edit-assignment-btn\"]],[[\"@action\",\"@icon\",\"@label\"],[[30,0,[\"editAssignment\"]],\"group-plus\",\"discourse_assign.reassign.title_w_ellipsis\"]],null],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[4]]]]],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"]],[\"@assignedToUser\",\"@href\",\"@assignedToGroup\",\"dropdown\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/assigned-to-post.js",
                "scope": () => [_dIcon.default, _i18n.default, _dMenu.default, _dropdownMenu.default, _dButton.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = AssignedToPost;
});