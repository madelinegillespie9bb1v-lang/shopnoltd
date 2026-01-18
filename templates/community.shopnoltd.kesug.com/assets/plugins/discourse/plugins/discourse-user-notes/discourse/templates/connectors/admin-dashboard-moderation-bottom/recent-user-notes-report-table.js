define("discourse/plugins/discourse-user-notes/discourse/templates/connectors/admin-dashboard-moderation-bottom/recent-user-notes-report-table", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], function(_exports, _deprecationsHelper, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if siteSettings.user_notes_enabled}}
          <AdminReport @dataSourceName="user_notes" @filters={{this.filters}} />
        {{/if}}
        */
        {
            "id": "T8Gd1LCH",
            "block": "[[[41,[30,0,[\"siteSettings\",\"user_notes_enabled\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@dataSourceName\",\"@filters\"],[\"user_notes\",[30,0,[\"filters\"]]]],null],[1,\"\\n\"]],[]],null],[1,[28,[32,0],[\"[[\\\"The `siteSettings` property path was used in the `discourse/plugins/discourse-user-notes/discourse/templates/connectors/admin-dashboard-moderation-bottom/recent-user-notes-report-table.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.siteSettings}}\\\",false,{\\\"id\\\":\\\"ember-this-fallback.this-property-fallback\\\",\\\"until\\\":\\\"n/a\\\",\\\"for\\\":\\\"ember-this-fallback\\\",\\\"url\\\":\\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\\",\\\"since\\\":{\\\"available\\\":\\\"0.2.0\\\"}}]]\"],null]]],[],false,[\"if\",\"admin-report\"]]",
            "moduleName": "discourse/plugins/discourse-user-notes/discourse/templates/connectors/admin-dashboard-moderation-bottom/recent-user-notes-report-table.hbs",
            "scope": () => [_deprecationsHelper.default],
            "isStrictMode": false
        });
});