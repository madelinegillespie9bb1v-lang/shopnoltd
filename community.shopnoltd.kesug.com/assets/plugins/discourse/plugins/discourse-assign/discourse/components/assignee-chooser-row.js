define("discourse/plugins/discourse-assign/discourse/components/assignee-chooser-row", ["exports", "@ember/component", "select-kit/components/email-group-user-chooser-row", "@ember/template-factory"], function(_exports, _component, _emailGroupUserChooserRow, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.item.isUser}}
          {{avatar this.item imageSize="tiny"}}
          <div class="user-wrapper">
            <span class="identifier">{{format-username this.item.id}}</span>
            <span class="name">{{this.item.name}}</span>
            {{#if (and this.item.showUserStatus this.item.status)}}
              <UserStatusMessage
                @status={{this.item.status}}
                @showDescription={{true}}
              />
            {{/if}}
          </div>
          {{decorate-username-selector this.item.id}}
        {{else if this.item.isGroup}}
          {{d-icon "users"}}
          <div class="user-wrapper">
            <span class="identifier">{{this.item.id}}</span>
            <span class="name">{{this.item.full_name}}</span>
          </div>
        {{else}}
          {{d-icon "envelope"}}
          <span class="identifier">{{this.item.id}}</span>
        {{/if}}
        */
        {
            "id": "WLrkIwQW",
            "block": "[[[41,[30,0,[\"item\",\"isUser\"]],[[[1,\"  \"],[1,[28,[35,1],[[30,0,[\"item\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n  \"],[10,0],[14,0,\"user-wrapper\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"identifier\"],[12],[1,[28,[35,2],[[30,0,[\"item\",\"id\"]]],null]],[13],[1,\"\\n    \"],[10,1],[14,0,\"name\"],[12],[1,[30,0,[\"item\",\"name\"]]],[13],[1,\"\\n\"],[41,[28,[37,3],[[30,0,[\"item\",\"showUserStatus\"]],[30,0,[\"item\",\"status\"]]],null],[[[1,\"      \"],[8,[39,4],null,[[\"@status\",\"@showDescription\"],[[30,0,[\"item\",\"status\"]],true]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n  \"],[1,[28,[35,5],[[30,0,[\"item\",\"id\"]]],null]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"item\",\"isGroup\"]],[[[1,\"  \"],[1,[28,[35,6],[\"users\"],null]],[1,\"\\n  \"],[10,0],[14,0,\"user-wrapper\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"identifier\"],[12],[1,[30,0,[\"item\",\"id\"]]],[13],[1,\"\\n    \"],[10,1],[14,0,\"name\"],[12],[1,[30,0,[\"item\",\"full_name\"]]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[1,[28,[35,6],[\"envelope\"],null]],[1,\"\\n  \"],[10,1],[14,0,\"identifier\"],[12],[1,[30,0,[\"item\",\"id\"]]],[13],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"if\",\"avatar\",\"format-username\",\"and\",\"user-status-message\",\"decorate-username-selector\",\"d-icon\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/assignee-chooser-row.hbs",
            "isStrictMode": false
        });
    class AssigneeChooserRow extends _emailGroupUserChooserRow.default {}
    _exports.default = AssigneeChooserRow;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, AssigneeChooserRow);
});