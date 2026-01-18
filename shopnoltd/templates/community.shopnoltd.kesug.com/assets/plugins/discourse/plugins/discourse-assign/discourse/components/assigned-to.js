define("discourse/plugins/discourse-assign/discourse/components/assigned-to", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function(_exports, _component, _templateOnly, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="assigned-to-user">
          {{avatar @user imageSize="small"}}
  
          <span class="assigned-username">
            {{@user.username}}
          </span>
  
          {{yield}}
        </div>
        */
        {
            "id": "LFVSEcUV",
            "block": "[[[10,0],[14,0,\"assigned-to-user\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[[30,1]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n\\n  \"],[10,1],[14,0,\"assigned-username\"],[12],[1,\"\\n    \"],[1,[30,1,[\"username\"]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[18,2,null],[1,\"\\n\"],[13]],[\"@user\",\"&default\"],false,[\"avatar\",\"yield\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/assigned-to.hbs",
            "isStrictMode": false
        });
    var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)(undefined, "assigned-to"));
});