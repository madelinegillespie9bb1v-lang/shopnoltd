define("discourse/plugins/poll/discourse/components/poll-results-pie", ["exports", "@glimmer/component", "@ember/object", "@ember/render-modifiers/modifiers/did-insert", "@ember/template", "ember-modifier", "discourse/lib/load-script", "discourse/plugins/poll/lib/chart-colors", "discourse/plugins/poll/discourse/components/modal/poll-ui-builder", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _didInsert, _template2, _emberModifier, _loadScript, _chartColors, _pollUiBuilder, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class PollResultsPieComponent extends _component.default {
        htmlLegendPlugin = {
            id: "htmlLegend",
            afterUpdate(chart1, args1, options1) {
                const ul1 = document.getElementById(options1.containerID);
                if (!ul1) {
                    return;
                }
                ul1.innerHTML = "";
                const items1 = chart1.options.plugins.legend.labels.generateLabels(chart1);
                items1.forEach(item1 => {
                    const li1 = document.createElement("li");
                    li1.classList.add("legend");
                    li1.onclick = () => {
                        chart1.toggleDataVisibility(item1.index);
                        chart1.update();
                    };
                    const boxSpan1 = document.createElement("span");
                    boxSpan1.classList.add("swatch");
                    boxSpan1.style.background = item1.fillStyle;
                    const textContainer1 = document.createElement("span");
                    textContainer1.style.color = item1.fontColor;
                    textContainer1.innerHTML = item1.text;
                    if (!chart1.getDataVisibility(item1.index)) {
                        li1.style.opacity = 0.2;
                    } else {
                        li1.style.opacity = 1.0;
                    }
                    li1.appendChild(boxSpan1);
                    li1.appendChild(textContainer1);
                    ul1.appendChild(li1);
                });
            }
        };
        stripHtml = html1 => {
            let doc1 = new DOMParser().parseFromString(html1, "text/html");
            return doc1.body.textContent || "";
        };
        pieChartConfig = (() => {
            var _this = this;
            return function(data1, labels1) {
                let opts1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                const aspectRatio1 = "aspectRatio" in opts1 ? opts1.aspectRatio : 2.2;
                const strippedLabels1 = labels1.map(l1 => _this.stripHtml(l1));
                return {
                    type: _pollUiBuilder.PIE_CHART_TYPE,
                    data: {
                        datasets: [{
                            data: data1,
                            backgroundColor: (0, _chartColors.getColors)(data1.length)
                        }],
                        labels: strippedLabels1
                    },
                    plugins: [_this.htmlLegendPlugin],
                    options: {
                        responsive: true,
                        aspectRatio: aspectRatio1,
                        animation: {
                            duration: 0
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    generateLabels() {
                                        return labels1.map((text1, index1) => {
                                            return {
                                                fillStyle: (0, _chartColors.getColors)(data1.length)[index1],
                                                text: text1,
                                                index: index1
                                            };
                                        });
                                    }
                                },
                                display: false
                            },
                            htmlLegend: {
                                containerID: opts1 ? .legendContainerId
                            }
                        }
                    }
                };
            };
        })();
        registerLegendElement = (() => (0, _emberModifier.modifier)(element1 => {
            this.legendElement = element1;
        }))();
        registerCanvasElement = (() => (0, _emberModifier.modifier)(element1 => {
            this.canvasElement = element1;
        }))();
        get canvasId() {
            return (0, _template2.htmlSafe)(`poll-results-chart-${this.args.id}`);
        }
        get legendId() {
            return (0, _template2.htmlSafe)(`poll-results-legend-${this.args.id}`);
        }
        async drawPie() {
            await (0, _loadScript.default)("/javascripts/Chart.min.js");
            const data1 = this.args.options.mapBy("votes");
            const labels1 = this.args.options.mapBy("html");
            const config1 = this.pieChartConfig(data1, labels1, {
                legendContainerId: this.legendElement.id
            });
            const el1 = this.canvasElement;
            // eslint-disable-next-line no-undef
            this._chart = new Chart(el1.getContext("2d"), config1);
        }
        static# _ = (() => dt7948.n(this.prototype, "drawPie", [_object.action]))();
        static# _2 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="poll-results-chart">
                  <canvas
                    {{didInsert this.drawPie}}
                    {{didInsert this.registerCanvasElement}}
                    id={{this.canvasId}}
                    class="poll-results-canvas"
                  ></canvas>
                  <ul
                    {{didInsert this.registerLegendElement}}
                    id={{this.legendId}}
                    class="pie-chart-legends"
                  >
                  </ul>
                </div>
              
            */
            {
                "id": "BTeq5Fu6",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"poll-results-chart\"],[12],[1,\"\\n      \"],[11,\"canvas\"],[16,1,[30,0,[\"canvasId\"]]],[24,0,\"poll-results-canvas\"],[4,[32,0],[[30,0,[\"drawPie\"]]],null],[4,[32,0],[[30,0,[\"registerCanvasElement\"]]],null],[12],[13],[1,\"\\n      \"],[11,\"ul\"],[16,1,[30,0,[\"legendId\"]]],[24,0,\"pie-chart-legends\"],[4,[32,0],[[30,0,[\"registerLegendElement\"]]],null],[12],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[],false,[]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-results-pie.js",
                "scope": () => [_didInsert.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = PollResultsPieComponent;
});