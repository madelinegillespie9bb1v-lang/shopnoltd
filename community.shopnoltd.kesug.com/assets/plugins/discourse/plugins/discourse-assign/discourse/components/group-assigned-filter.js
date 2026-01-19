define("discourse/plugins/discourse-assign/discourse/components/group-assigned-filter", ["exports", "@ember/component", "@ember/component/template-only", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _component, _templateOnly, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <li>
          {{#if @showAvatar}}
            <LinkTo
              @route="group.assigned.show"
              @model={{@filter.username_lower}}
              @query={{hash order=@order ascending=@ascending search=@search}}
            >
              <div class="assign-image">
                <a
                  href={{@filter.userPath}}
                  data-user-card={{@filter.username}}
                >{{avatar filter imageSize="large"}}</a>
              </div>
  
              <div class="assign-names">
                <div class="assign-username">{{format-username @filter.username}}</div>
                <div class="assign-name">{{@filter.name}}</div>
              </div>
  
              <div class="assign-count">
                {{@filter.assignments_count}}
              </div>
            </LinkTo>
          {{else if @groupName}}
            <LinkTo
              @route="group.assigned.show"
              @model={{@filter}}
              @query={{hash order=@order ascending=@ascending search=@search}}
            >
              <div class="assign-image">
                {{d-icon "group-plus"}}
              </div>
              <div class="assign-names">
                <div class="assign-username">{{@groupName}}</div>
              </div>
  
              <div class="assign-count">
                {{@assignmentCount}}
              </div>
            </LinkTo>
          {{else}}
            <LinkTo
              @route="group.assigned.show"
              @model={{@filter}}
              @query={{hash order=@order ascending=@ascending search=@search}}
            >
              <div class="assign-everyone">
                {{i18n "discourse_assign.group_everyone"}}
              </div>
              <div class="assign-count">
                {{@assignmentCount}}
              </div>
            </LinkTo>
          {{/if}}
        </li>
        */
        {
            "id": "qCqP1MGh",
            "block": "[[[10,\"li\"],[12],[1,\"\\n\"],[41,[30,1],[[[1,\"    \"],[8,[39,1],null,[[\"@route\",\"@model\",\"@query\"],[\"group.assigned.show\",[30,2,[\"username_lower\"]],[28,[37,2],null,[[\"order\",\"ascending\",\"search\"],[[30,3],[30,4],[30,5]]]]]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"assign-image\"],[12],[1,\"\\n        \"],[10,3],[15,6,[30,2,[\"userPath\"]]],[15,\"data-user-card\",[30,2,[\"username\"]]],[12],[1,[28,[35,3],[[30,0,[\"filter\"]]],[[\"imageSize\"],[\"large\"]]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"assign-names\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"assign-username\"],[12],[1,[28,[35,4],[[30,2,[\"username\"]]],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"assign-name\"],[12],[1,[30,2,[\"name\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"assign-count\"],[12],[1,\"\\n        \"],[1,[30,2,[\"assignments_count\"]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],[[[41,[30,6],[[[1,\"    \"],[8,[39,1],null,[[\"@route\",\"@model\",\"@query\"],[\"group.assigned.show\",[30,2],[28,[37,2],null,[[\"order\",\"ascending\",\"search\"],[[30,3],[30,4],[30,5]]]]]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"assign-image\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"group-plus\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"assign-names\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"assign-username\"],[12],[1,[30,6]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"assign-count\"],[12],[1,\"\\n        \"],[1,[30,7]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,1],null,[[\"@route\",\"@model\",\"@query\"],[\"group.assigned.show\",[30,2],[28,[37,2],null,[[\"order\",\"ascending\",\"search\"],[[30,3],[30,4],[30,5]]]]]],[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"assign-everyone\"],[12],[1,\"\\n        \"],[1,[28,[35,6],[\"discourse_assign.group_everyone\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"assign-count\"],[12],[1,\"\\n        \"],[1,[30,7]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"]],[]]]],[]]],[13],[1,[28,[32,0],[\"[[\\\"The `filter` property path was used in the `discourse/plugins/discourse-assign/discourse/components/group-assigned-filter.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.filter}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[\"@showAvatar\",\"@filter\",\"@order\",\"@ascending\",\"@search\",\"@groupName\",\"@assignmentCount\"],false,[\"if\",\"link-to\",\"hash\",\"avatar\",\"format-username\",\"d-icon\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/group-assigned-filter.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
    var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)(undefined, "group-assigned-filter"));
});