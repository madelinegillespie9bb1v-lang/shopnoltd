define("discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list-empty-state", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function(_exports, _component, _templateOnly, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="empty-state">
          <span class="empty-state-title">
            {{i18n "user.no_assignments_title"}}
          </span>
          <div class="empty-state-body">
            <p>
              {{html-safe
                (i18n
                  "user.no_assignments_body"
                  icon=(d-icon "user-plus")
                  preferencesUrl=(get-url "/my/preferences/notifications")
                )
              }}
            </p>
          </div>
        </div>
        */
        {
            "id": "inD5wpPw",
            "block": "[[[10,0],[14,0,\"empty-state\"],[12],[1,\"\\n  \"],[10,1],[14,0,\"empty-state-title\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"user.no_assignments_title\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"empty-state-body\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      \"],[1,[28,[35,1],[[28,[37,0],[\"user.no_assignments_body\"],[[\"icon\",\"preferencesUrl\"],[[28,[37,2],[\"user-plus\"],null],[28,[37,3],[\"/my/preferences/notifications\"],null]]]]],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"html-safe\",\"d-icon\",\"get-url\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/user-menu/assigns-list-empty-state.hbs",
            "isStrictMode": false
        });
    var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)(undefined, "assigns-list-empty-state"));
});