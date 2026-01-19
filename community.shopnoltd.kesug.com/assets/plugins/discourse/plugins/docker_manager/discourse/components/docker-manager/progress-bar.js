define("discourse/plugins/docker_manager/discourse/components/docker-manager/progress-bar", ["exports", "@ember/component", "@glimmer/component", "@ember/template", "@ember/template-factory"], function(_exports, _component, _component2, _template, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="progress-bar {{if this.active 'active'}}">
          <div class="progress-bar-inner" style={{this.barStyle}}></div>
        </div>
        */
        {
            "id": "uEtfDzBs",
            "block": "[[[10,0],[15,0,[29,[\"progress-bar \",[52,[30,0,[\"active\"]],\"active\"]]]],[12],[1,\"\\n  \"],[10,0],[14,0,\"progress-bar-inner\"],[15,5,[30,0,[\"barStyle\"]]],[12],[13],[1,\"\\n\"],[13]],[],false,[\"if\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/components/docker-manager/progress-bar.hbs",
            "isStrictMode": false
        });
    class ProgressBar extends _component2.default {
        get active() {
            return parseInt(this.args.percent, 10) !== 100;
        }
        get barStyle() {
            let percent = parseInt(this.args.percent, 10);
            if (percent > 100) {
                percent = 100;
            }
            return (0, _template.htmlSafe)(`width: ${percent}%`);
        }
    }
    _exports.default = ProgressBar;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ProgressBar);
});