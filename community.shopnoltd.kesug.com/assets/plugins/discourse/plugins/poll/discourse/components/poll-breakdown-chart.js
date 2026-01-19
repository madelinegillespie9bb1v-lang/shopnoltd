define("discourse/plugins/poll/discourse/components/poll-breakdown-chart", ["exports", "@ember/component", "@ember/object/computed", "@ember/runloop", "@ember/template", "@ember-decorators/component", "discourse-common/utils/decorators", "discourse-i18n", "discourse/plugins/poll/lib/chart-colors", "discourse/plugins/poll/discourse/components/modal/poll-ui-builder", "@ember/template-factory"], function(_exports, _component, _computed, _runloop, _template2, _component2, _decorators, _discourseI18n, _chartColors, _pollUiBuilder, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const PollBreakdownChart = dt7948.c(class PollBreakdownChart extends _component.default {
        // Arguments:
        group = null;
        options = null;
        displayMode = null;
        highlightedOption = null;
        setHighlightedOption = null;
        static# _ = (() => dt7948.g(this.prototype, "data", [(0, _computed.mapBy)("options", "votes")]))();#
        data = (() => (dt7948.i(this, "data"), void 0))();
        _optionToSlice = null;
        _previousHighlightedSliceIndex = null;
        _previousDisplayMode = null;
        init() {
            super.init(...arguments);
            this._optionToSlice = {};
        }
        didInsertElement() {
            super.didInsertElement(...arguments);
            const canvas1 = this.element.querySelector("canvas");
            this._chart = new window.Chart(canvas1.getContext("2d"), this.chartConfig);
        }
        didReceiveAttrs() {
            super.didReceiveAttrs(...arguments);
            if (this._chart) {
                this._updateDisplayMode();
                this._updateHighlight();
            }
        }
        willDestroy() {
            super.willDestroy(...arguments);
            if (this._chart) {
                this._chart.destroy();
            }
        }
        colorStyle(optionColors1, index1) {
            return (0, _template2.htmlSafe)(`background: ${optionColors1[index1]};`);
        }
        static# _2 = (() => dt7948.n(this.prototype, "colorStyle", [(0, _decorators.default)("optionColors", "index")]))();
        chartConfig(data1, displayMode1) {
            const transformedData1 = [];
            let counter1 = 0;
            this._optionToSlice = {};
            data1.forEach((votes1, index1) => {
                if (votes1 > 0) {
                    transformedData1.push(votes1);
                    this._optionToSlice[index1] = counter1++;
                }
            });
            const totalVotes1 = transformedData1.reduce((sum1, votes1) => sum1 + votes1, 0);
            const colors1 = (0, _chartColors.getColors)(data1.length).filter((color1, index1) => data1[index1] > 0);
            return {
                type: _pollUiBuilder.PIE_CHART_TYPE,
                plugins: [window.ChartDataLabels],
                data: {
                    datasets: [{
                        data: transformedData1,
                        backgroundColor: colors1,
                        // TODO: It's a workaround for Chart.js' terrible hover styling.
                        // It will break on non-white backgrounds.
                        // Should be updated after #10341 lands
                        hoverBorderColor: "#fff"
                    }]
                },
                options: {
                    plugins: {
                        tooltip: false,
                        datalabels: {
                            color: "#333",
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                            borderRadius: 2,
                            font: {
                                family: getComputedStyle(document.body).fontFamily,
                                size: 16
                            },
                            padding: {
                                top: 2,
                                right: 6,
                                bottom: 2,
                                left: 6
                            },
                            formatter(votes1) {
                                if (displayMode1 !== "percentage") {
                                    return votes1;
                                }
                                const percent1 = _discourseI18n.default.toNumber(votes1 / totalVotes1 * 100.0, {
                                    precision: 1
                                });
                                return `${percent1}%`;
                            }
                        }
                    },
                    responsive: true,
                    aspectRatio: 1.1,
                    animation: {
                        duration: 0
                    },
                    // wrapping setHighlightedOption in next block as hover can create many events
                    // prevents two sets to happen in the same computation
                    onHover: (event1, activeElements1) => {
                        if (!activeElements1.length) {
                            (0, _runloop.next)(() => {
                                this.setHighlightedOption(null);
                            });
                            return;
                        }
                        const sliceIndex1 = activeElements1[0].index;
                        const optionIndex1 = Object.keys(this._optionToSlice).find(option1 => this._optionToSlice[option1] === sliceIndex1);
                        (0, _runloop.next)(() => {
                            this.setHighlightedOption(Number(optionIndex1));
                        });
                    }
                }
            };
        }
        static# _3 = (() => dt7948.n(this.prototype, "chartConfig", [(0, _decorators.default)("data", "displayMode")]))();
        _updateDisplayMode() {
            if (this.displayMode !== this._previousDisplayMode) {
                const config1 = this.chartConfig;
                this._chart.data.datasets = config1.data.datasets;
                this._chart.options = config1.options;
                this._chart.update();
                this._previousDisplayMode = this.displayMode;
            }
        }
        _updateHighlight() {
            const activeElements1 = [];
            if (this.highlightedOption) {
                const index1 = this._optionToSlice[this.highlightedOption];
                if (index1 !== undefined) {
                    activeElements1.push({
                        datasetIndex: 0,
                        index: index1
                    });
                }
            }
            this._chart.setActiveElements(activeElements1);
            this._chart.update();
        }
        static# _4 = (() => (0, _component.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <label class="poll-breakdown-chart-label">{{@group}}</label>
                <canvas class="poll-breakdown-chart-chart"></canvas>
              
            */
            {
                "id": "7L2OXyes",
                "block": "[[[1,\"\\n    \"],[10,\"label\"],[14,0,\"poll-breakdown-chart-label\"],[12],[1,[30,1]],[13],[1,\"\\n    \"],[10,\"canvas\"],[14,0,\"poll-breakdown-chart-chart\"],[12],[13],[1,\"\\n  \"]],[\"@group\"],false,[]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/poll/discourse/components/poll-breakdown-chart.js",
                "isStrictMode": true
            }), this))();
    }, [(0, _component2.classNames)("poll-breakdown-chart-container")]);
    var _default = _exports.default = PollBreakdownChart;
});