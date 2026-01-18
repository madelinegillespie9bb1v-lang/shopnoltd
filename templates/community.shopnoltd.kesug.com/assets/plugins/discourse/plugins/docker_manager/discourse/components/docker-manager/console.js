define("discourse/plugins/docker_manager/discourse/components/docker-manager/console", ["exports", "@ember/component", "@glimmer/component", "discourse-common/utils/decorators", "@ember/template-factory"], function(_exports, _component, _component2, _decorators, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div
          class="console-logs"
          {{did-insert this.scrollToBottom}}
          {{did-update this.scrollToBottom @output}}
        >
          {{~@output~}}
        </div>
        */
        {
            "id": "E4gmFwOC",
            "block": "[[[11,0],[24,0,\"console-logs\"],[4,[38,0],[[30,0,[\"scrollToBottom\"]]],null],[4,[38,1],[[30,0,[\"scrollToBottom\"]],[30,1]],null],[12],[1,[30,1]],[13]],[\"@output\"],false,[\"did-insert\",\"did-update\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/components/docker-manager/console.hbs",
            "isStrictMode": false
        });
    class Console extends _component2.default {
        scrollToBottom(element) {
            if (this.args.followOutput) {
                element.scrollTop = element.scrollHeight;
            }
        }
        static# _ = (() => dt7948.n(this.prototype, "scrollToBottom", [_decorators.bind]))();
    }
    _exports.default = Console;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, Console);
});