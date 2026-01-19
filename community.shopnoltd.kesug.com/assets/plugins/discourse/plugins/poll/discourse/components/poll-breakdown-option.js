define("discourse/plugins/poll/discourse/components/poll-breakdown-option", ["exports", "@ember/component", "@ember/modifier", "@ember/object/computed", "@ember/template", "@ember-decorators/component", "discourse/lib/computed", "discourse-common/helpers/i18n", "discourse-common/utils/decorators", "discourse-i18n", "discourse/plugins/poll/lib/chart-colors", "@ember/template-factory"], function(_exports, _component, _modifier, _computed, _template2, _component2, _computed2, _i18n, _decorators, _discourseI18n, _chartColors, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const PollBreakdownOption = dt7948.c(class PollBreakdownOption extends _component.default {
        // Arguments:
        option = null;
        index = null;
        totalVotes = null;
        optionsCount = null;
        displayMode = null;
        highlightedOption = null;
        onMouseOver = null;
        onMouseOut = null;
        static# _ = (() => dt7948.g(this.prototype, "highlighted", [(0, _computed2.propertyEqual)("highlightedOption", "index")]))();#
        highlighted = (() => (dt7948.i(this, "highlighted"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "showPercentage", [(0, _computed.equal)("displayMode", "percentage")]))();#
        showPercentage = (() => (dt7948.i(this, "showPercentage"), void 0))();
        percent(votes1, total1) {
            return _discourseI18n.default.toNumber(votes1 / total1 * 100.0, {
                precision: 1
            });
        }
        static# _3 = (() => dt7948.n(this.prototype, "percent", [(0, _decorators.default)("option.votes", "totalVotes")]))();
        optionColors(optionsCount1) {
            return (0, _chartColors.getColors)(optionsCount1);
        }
        static# _4 = (() => dt7948.n(this.prototype, "optionColors", [(0, _decorators.default)("optionsCount")]))();
        colorBackgroundStyle(highlighted1) {
            if (highlighted1) {
                // TODO: Use CSS variables (#10341)
                return (0, _template2.htmlSafe)("background: rgba(0, 0, 0, 0.1);");
            }
        }
        static# _5 = (() => dt7948.n(this.prototype, "colorBackgroundStyle", [(0, _decorators.default)("highlighted")]))();
        colorPreviewStyle(highlighted1, optionColors1, index1) {
            const color1 = highlighted1 ? window.Chart.helpers.getHoverColor(optionColors1[index1]) : optionColors1[index1];
            return (0, _template2.htmlSafe)(`background: ${color1};`);
        }
        static# _6 = (() => dt7948.n(this.prototype, "colorPreviewStyle", [(0, _decorators.default)("highlighted", "optionColors", "index")]))();
        static# _7 = (() => (0, _component.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <li
                  class="poll-breakdown-option"
                  style={{this.colorBackgroundStyle}}
                  {{on "mouseover" @onMouseOver}}
                  {{on "mouseout" @onMouseOut}}
                  role="button"
                >
                  <span
                    class="poll-breakdown-option-color"
                    style={{this.colorPreviewStyle}}
                  ></span>
    
                  <span class="poll-breakdown-option-count">
                    {{#if this.showPercentage}}
                      {{i18n "number.percent" count=this.percent}}
                    {{else}}
                      {{@option.votes}}
                    {{/if}}
                  </span>
                  <span class="poll-breakdown-option-text">{{htmlSafe @option.html}}</span>
                </li>
              
            */
            {
                "id": "eauZvEcj",
                "block": "[[[1,\"\\n    \"],[11,\"li\"],[24,0,\"poll-breakdown-option\"],[16,5,[30,0,[\"colorBackgroundStyle\"]]],[24,\"role\",\"button\"],[4,[32,0],[\"mouseover\",[30,1]],null],[4,[32,0],[\"mouseout\",[30,2]],null],[12],[1,\"\\n      \"],[10,1],[14,0,\"poll-breakdown-option-color\"],[15,5,[30,0,[\"colorPreviewStyle\"]]],[12],[13],[1,\"\\n\\n      \"],[10,1],[14,0,\"poll-breakdown-option-count\"],[12],[1,\"\\n\"],[41,[30,0,[\"showPercentage\"]],[[[1,\"          \"],[1,[28,[32,1],[\"number.percent\"],[[\"count\"],[[30,0,[\"percent\"]]]]]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[30,3,[\"votes\"]]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n      \"],[10,1],[14,0,\"poll-breakdown-option-text\"],[12],[1,[28,[32,2],[[30,3,[\"html\"]]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[\"@onMouseOver\",\"@onMouseOut\",\"@option\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-breakdown-option.js",
                "scope": () => [_modifier.on, _i18n.default, _template2.htmlSafe],
                "isStrictMode": true
            }), this))();
    }, [(0, _component2.tagName)("")]);
    var _default = _exports.default = PollBreakdownOption;
});