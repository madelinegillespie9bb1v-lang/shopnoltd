define("discourse/plugins/discourse-assign/discourse/components/group-assigned-menu-item", ["exports", "@ember/component", "@ember/component/template-only", "@ember/template-factory"], function(_exports, _component, _templateOnly, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <LinkTo @route="group.assigned">
          {{d-icon "group-plus" class="glyph"}}{{i18n "discourse_assign.assigned"}}
          ({{@group.assignment_count}})
        </LinkTo>
        */
        {
            "id": "PBXUjQcZ",
            "block": "[[[8,[39,0],null,[[\"@route\"],[\"group.assigned\"]],[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[\"group-plus\"],[[\"class\"],[\"glyph\"]]]],[1,[28,[35,2],[\"discourse_assign.assigned\"],null]],[1,\"\\n  (\"],[1,[30,1,[\"assignment_count\"]]],[1,\")\\n\"]],[]]]]]],[\"@group\"],false,[\"link-to\",\"d-icon\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/components/group-assigned-menu-item.hbs",
            "isStrictMode": false
        });
    var _default = _exports.default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _templateOnly.default)(undefined, "group-assigned-menu-item"));
});