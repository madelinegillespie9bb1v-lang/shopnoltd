define("discourse/plugins/discourse-assign/discourse/templates/mobile/components/assigned-topic-list-item", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <td class="topic-list-data">
          <div class="main-link">
            <TopicStatus @topic={{this.topic}} />
            {{~#if this.isPrivateMessage}}
              {{~d-icon "envelope" class="private-message-icon"}}
            {{~/if}}
            {{~topic-link this.topic}}
            {{#if this.topic.unseen}}
              <span class="badge-notification new-topic"></span>
            {{/if}}
            {{#if this.topic.hasExcerpt}}
              <div class="topic-excerpt">
                {{html-safe this.topic.excerpt}}
                {{#if this.topic.excerptTruncated}}
                  {{#unless this.topic.canClearPin}}<a href={{this.topic.url}}>{{i18n
                        "read_more"
                      }}</a>{{/unless}}
                {{/if}}
                {{#if this.topic.canClearPin}}
                  <a
                    href
                    {{action "clearPin" this.topic}}
                    title={{i18n "topic.clear_pin.help"}}
                  >{{i18n "topic.clear_pin.title"}}</a>
                {{/if}}
              </div>
            {{/if}}
          </div>
          <div class="pull-right topic-list-num">
            {{#if this.topic.assigned_to_user}}
              <AssignActionsDropdown
                @topic={{this.topic}}
                @assignee={{this.topic.assigned_to_user.username}}
                @unassign={{this.unassign}}
                @reassign={{this.reassign}}
              />
            {{else if this.topic.assigned_to_group}}
              <AssignActionsDropdown
                @topic={{this.topic}}
                @assignee={{this.topic.assigned_to_group.name}}
                @group={{true}}
                @unassign={{this.unassign}}
                @reassign={{this.reassign}}
              />
            {{else}}
              <AssignActionsDropdown
                @topic={{this.topic}}
                @unassign={{this.unassign}}
              />
            {{/if}}
          </div>
          <div class="clearfix"></div>
          <div class="topic-item-stats clearfix">
            {{discourse-tags this.topic mode="list" tagsForUser=this.tagsForUser}}
            <div class="pull-right topic-list-num">
              {{raw
                "list/activity-column"
                topic=this.topic
                tagName="div"
                class="num activity last"
              }}
              <a
                href={{this.topic.lastPostUrl}}
                title="{{i18n 'last_post'}}: {{html-safe
                  raw-date
                  this.topic.bumped_at
                }}"
              >{{this.topic.last_poster_username}}</a>
            </div>
            {{#unless this.hideCategory}}
              <div class="category">
                {{category-link this.topic.category}}
              </div>
            {{/unless}}
            <div class="clearfix"></div>
          </div>
        </td>
        */
        {
            "id": "Tt+EH3Vs",
            "block": "[[[10,\"td\"],[14,0,\"topic-list-data\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"main-link\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@topic\"],[[30,0,[\"topic\"]]]],null],[41,[30,0,[\"isPrivateMessage\"]],[[[1,[28,[35,2],[\"envelope\"],[[\"class\"],[\"private-message-icon\"]]]]],[]],null],[1,[28,[35,3],[[30,0,[\"topic\"]]],null]],[1,\"\\n\"],[41,[30,0,[\"topic\",\"unseen\"]],[[[1,\"      \"],[10,1],[14,0,\"badge-notification new-topic\"],[12],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"topic\",\"hasExcerpt\"]],[[[1,\"      \"],[10,0],[14,0,\"topic-excerpt\"],[12],[1,\"\\n        \"],[1,[28,[35,4],[[30,0,[\"topic\",\"excerpt\"]]],null]],[1,\"\\n\"],[41,[30,0,[\"topic\",\"excerptTruncated\"]],[[[1,\"          \"],[41,[51,[30,0,[\"topic\",\"canClearPin\"]]],[[[10,3],[15,6,[30,0,[\"topic\",\"url\"]]],[12],[1,[28,[35,6],[\"read_more\"],null]],[13]],[]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"topic\",\"canClearPin\"]],[[[1,\"          \"],[11,3],[24,6,\"\"],[16,\"title\",[28,[37,6],[\"topic.clear_pin.help\"],null]],[4,[38,7],[[30,0],\"clearPin\",[30,0,[\"topic\"]]],null],[12],[1,[28,[35,6],[\"topic.clear_pin.title\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"pull-right topic-list-num\"],[12],[1,\"\\n\"],[41,[30,0,[\"topic\",\"assigned_to_user\"]],[[[1,\"      \"],[8,[39,8],null,[[\"@topic\",\"@assignee\",\"@unassign\",\"@reassign\"],[[30,0,[\"topic\"]],[30,0,[\"topic\",\"assigned_to_user\",\"username\"]],[30,0,[\"unassign\"]],[30,0,[\"reassign\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"topic\",\"assigned_to_group\"]],[[[1,\"      \"],[8,[39,8],null,[[\"@topic\",\"@assignee\",\"@group\",\"@unassign\",\"@reassign\"],[[30,0,[\"topic\"]],[30,0,[\"topic\",\"assigned_to_group\",\"name\"]],true,[30,0,[\"unassign\"]],[30,0,[\"reassign\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,8],null,[[\"@topic\",\"@unassign\"],[[30,0,[\"topic\"]],[30,0,[\"unassign\"]]]],null],[1,\"\\n    \"]],[]]]],[]]],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n  \"],[10,0],[14,0,\"topic-item-stats clearfix\"],[12],[1,\"\\n    \"],[1,[28,[35,9],[[30,0,[\"topic\"]]],[[\"mode\",\"tagsForUser\"],[\"list\",[30,0,[\"tagsForUser\"]]]]]],[1,\"\\n    \"],[10,0],[14,0,\"pull-right topic-list-num\"],[12],[1,\"\\n      \"],[1,[28,[35,10],[\"list/activity-column\"],[[\"topic\",\"tagName\",\"class\"],[[30,0,[\"topic\"]],\"div\",\"num activity last\"]]]],[1,\"\\n      \"],[10,3],[15,6,[30,0,[\"topic\",\"lastPostUrl\"]]],[15,\"title\",[29,[[28,[37,6],[\"last_post\"],null],\": \",[28,[37,4],[[30,0,[\"raw-date\"]],[30,0,[\"topic\",\"bumped_at\"]]],null]]]],[12],[1,[30,0,[\"topic\",\"last_poster_username\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"hideCategory\"]]],[[[1,\"      \"],[10,0],[14,0,\"category\"],[12],[1,\"\\n        \"],[1,[28,[35,11],[[30,0,[\"topic\",\"category\"]]],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,[28,[32,0],[\"[[\\\"The `raw-date` property path was used in the `discourse/plugins/discourse-assign/discourse/templates/mobile/components/assigned-topic-list-item.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.raw-date}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"topic-status\",\"if\",\"d-icon\",\"topic-link\",\"html-safe\",\"unless\",\"i18n\",\"action\",\"assign-actions-dropdown\",\"discourse-tags\",\"raw\",\"category-link\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/mobile/components/assigned-topic-list-item.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});