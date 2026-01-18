define("discourse/plugins/discourse-assign/discourse/components/assignment", ["exports", "@glimmer/component", "@ember/helper", "@ember/legacy-built-in-components", "@ember/modifier", "@ember/object", "@ember/service", "discourse-common/helpers/d-icon", "discourse-common/helpers/i18n", "select-kit/components/combo-box", "truth-helpers/helpers/not", "discourse/plugins/discourse-assign/discourse/components/assignee-chooser", "@ember/component", "@ember/template-factory"], function(_exports, _component, _helper, _legacyBuiltInComponents, _modifier, _object, _service, _dIcon, _i18n, _comboBox, _not, _assigneeChooser, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class Assignment extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "siteSettings", [_service.inject]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "taskActions", [_service.inject]))();#
        taskActions = (() => (dt7948.i(this, "taskActions"), void 0))();
        get assignee() {
            return this.args.assignment.username || this.args.assignment.group_name;
        }
        get status() {
            return this.args.assignment.status || this.assignStatuses[0];
        }
        get assignStatuses() {
            return this.siteSettings.assign_statuses.split("|").filter(Boolean);
        }
        get assignStatusOptions() {
            return this.assignStatuses.map(status1 => ({
                id: status1,
                name: status1
            }));
        }
        get assigneeIsEmpty() {
            return !this.args.assignment.username && !this.args.assignment.group_name;
        }
        get showAssigneeIeEmptyError() {
            return this.assigneeIsEmpty && this.args.showValidationErrors;
        }
        handleTextAreaKeydown(event1) {
            if ((event1.ctrlKey || event1.metaKey) && event1.key === "Enter") {
                this.args.onSubmit();
            }
        }
        static# _3 = (() => dt7948.n(this.prototype, "handleTextAreaKeydown", [_object.action]))();
        markAsEdited() {
            this.args.assignment.isEdited = true;
        }
        static# _4 = (() => dt7948.n(this.prototype, "markAsEdited", [_object.action]))();
        setAssignee(_ref) {
            let [newAssignee1] = _ref;
            if (this.taskActions.allowedGroupsForAssignment.includes(newAssignee1)) {
                this.args.assignment.username = null;
                this.args.assignment.group_name = newAssignee1;
            } else {
                this.args.assignment.username = newAssignee1;
                this.args.assignment.group_name = null;
            }
            this.markAsEdited();
        }
        static# _5 = (() => dt7948.n(this.prototype, "setAssignee", [_object.action]))();
        setStatus(status1) {
            this.args.assignment.status = status1;
            this.markAsEdited();
        }
        static# _6 = (() => dt7948.n(this.prototype, "setStatus", [_object.action]))();
        static# _7 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div
                  class="control-group
                    {{if this.showAssigneeIeEmptyError 'assignee-error'}}"
                >
                  <label>{{i18n "discourse_assign.assign_modal.assignee_label"}}</label>
                  <AssigneeChooser
                    autocomplete="off"
                    @id="assignee-chooser"
                    @value={{this.assignee}}
                    @onChange={{this.setAssignee}}
                    @showUserStatus={{true}}
                    @options={{hash
                      mobilePlacementStrategy="absolute"
                      includeGroups=true
                      customSearchOptions=(hash
                        assignableGroups=true
                        defaultSearchResults=this.taskActions.suggestions
                      )
                      groupMembersOf=this.taskActions.allowedGroups
                      maximum=1
                      tabindex=1
                      expandedOnInsert=(not this.assignee)
                      caretUpIcon="search"
                      caretDownIcon="search"
                    }}
                  />
    
                  {{#if this.showAssigneeIeEmptyError}}
                    <span class="error-label">
                      {{icon "exclamation-triangle"}}
                      {{i18n "discourse_assign.assign_modal.choose_assignee"}}
                    </span>
                  {{/if}}
                </div>
    
                {{#if this.siteSettings.enable_assign_status}}
                  <div class="control-group assign-status">
                    <label>{{i18n "discourse_assign.assign_modal.status_label"}}</label>
                    <ComboBox
                      @id="assign-status"
                      @content={{this.assignStatusOptions}}
                      @value={{this.status}}
                      @onChange={{this.setStatus}}
                    />
                  </div>
                {{/if}}
    
                <div class="control-group assign-status">
                  <label>
                    {{i18n "discourse_assign.assign_modal.note_label"}}&nbsp;<span
                      class="label-optional"
                    >{{i18n "discourse_assign.assign_modal.optional_label"}}</span>
                  </label>
    
                  <TextArea
                    id="assign-modal-note"
                    @value={{@assignment.note}}
                    {{on "keydown" this.handleTextAreaKeydown}}
                    {{on "input" this.markAsEdited}}
                  />
                </div>
              
            */
            {
                "id": "frRnfCiz",
                "block": "[[[1,\"\\n    \"],[10,0],[15,0,[29,[\"control-group\\n        \",[52,[30,0,[\"showAssigneeIeEmptyError\"]],\"assignee-error\"]]]],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[32,0],[\"discourse_assign.assign_modal.assignee_label\"],null]],[13],[1,\"\\n      \"],[8,[32,1],[[24,\"autocomplete\",\"off\"]],[[\"@id\",\"@value\",\"@onChange\",\"@showUserStatus\",\"@options\"],[\"assignee-chooser\",[30,0,[\"assignee\"]],[30,0,[\"setAssignee\"]],true,[28,[32,2],null,[[\"mobilePlacementStrategy\",\"includeGroups\",\"customSearchOptions\",\"groupMembersOf\",\"maximum\",\"tabindex\",\"expandedOnInsert\",\"caretUpIcon\",\"caretDownIcon\"],[\"absolute\",true,[28,[32,2],null,[[\"assignableGroups\",\"defaultSearchResults\"],[true,[30,0,[\"taskActions\",\"suggestions\"]]]]],[30,0,[\"taskActions\",\"allowedGroups\"]],1,1,[28,[32,3],[[30,0,[\"assignee\"]]],null],\"search\",\"search\"]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showAssigneeIeEmptyError\"]],[[[1,\"        \"],[10,1],[14,0,\"error-label\"],[12],[1,\"\\n          \"],[1,[28,[32,4],[\"exclamation-triangle\"],null]],[1,\"\\n          \"],[1,[28,[32,0],[\"discourse_assign.assign_modal.choose_assignee\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"enable_assign_status\"]],[[[1,\"      \"],[10,0],[14,0,\"control-group assign-status\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,[28,[32,0],[\"discourse_assign.assign_modal.status_label\"],null]],[13],[1,\"\\n        \"],[8,[32,5],null,[[\"@id\",\"@content\",\"@value\",\"@onChange\"],[\"assign-status\",[30,0,[\"assignStatusOptions\"]],[30,0,[\"status\"]],[30,0,[\"setStatus\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"control-group assign-status\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[1,[28,[32,0],[\"discourse_assign.assign_modal.note_label\"],null]],[1,\" \"],[10,1],[14,0,\"label-optional\"],[12],[1,[28,[32,0],[\"discourse_assign.assign_modal.optional_label\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[32,6],[[24,1,\"assign-modal-note\"],[4,[32,7],[\"keydown\",[30,0,[\"handleTextAreaKeydown\"]]],null],[4,[32,7],[\"input\",[30,0,[\"markAsEdited\"]]],null]],[[\"@value\"],[[30,1,[\"note\"]]]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[\"@assignment\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-assign/discourse/components/assignment.js",
                "scope": () => [_i18n.default, _assigneeChooser.default, _helper.hash, _not.default, _dIcon.default, _comboBox.default, _legacyBuiltInComponents.TextArea, _modifier.on],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = Assignment;
});