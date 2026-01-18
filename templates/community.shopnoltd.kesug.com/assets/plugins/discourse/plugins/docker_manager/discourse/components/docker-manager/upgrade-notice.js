define("discourse/plugins/docker_manager/discourse/components/docker-manager/upgrade-notice", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@ember/template-factory"], function(_exports, _component, _component2, _service, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.currentUser.admin}}
          {{#unless @versionCheck.upToDate}}
            <div class="upgrades-banner">
              {{i18n "admin.docker.outdated_notice"}}
  
              <LinkTo @route="update">
                {{i18n "admin.docker.perform_update"}}
              </LinkTo>
            </div>
          {{/unless}}
        {{/if}}
        */
        {
            "id": "krKeSpiQ",
            "block": "[[[41,[30,0,[\"currentUser\",\"admin\"]],[[[41,[51,[30,1,[\"upToDate\"]]],[[[1,\"    \"],[10,0],[14,0,\"upgrades-banner\"],[12],[1,\"\\n      \"],[1,[28,[35,2],[\"admin.docker.outdated_notice\"],null]],[1,\"\\n\\n      \"],[8,[39,3],null,[[\"@route\"],[\"update\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,2],[\"admin.docker.perform_update\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[\"@versionCheck\"],false,[\"if\",\"unless\",\"i18n\",\"link-to\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/components/docker-manager/upgrade-notice.hbs",
            "isStrictMode": false
        });
    class UpgradeNotice extends _component2.default {
        static# _ = (() => dt7948.g(this.prototype, "currentUser", [_service.inject]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
    }
    _exports.default = UpgradeNotice;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UpgradeNotice);
});