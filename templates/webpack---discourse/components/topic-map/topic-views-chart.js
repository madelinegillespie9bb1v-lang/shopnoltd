import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import loadScript from "discourse/lib/load-script";
import i18n from "discourse-common/helpers/i18n";
import I18n from "discourse-i18n";
const oneDay = 86400000; // day in milliseconds
const now = new Date();
const startOfDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

function fillMissingDates(data1) {
    const filledData1 = [];
    let currentDate1 = data1[0].x;
    for (let i1 = 0; i1 < data1.length; i1++) {
        while (currentDate1 < data1[i1].x) {
            filledData1.push({
                x: currentDate1,
                y: 0
            });
            currentDate1 += oneDay;
        }
        filledData1.push(data1[i1]);
        currentDate1 = data1[i1].x + oneDay;
    }
    return filledData1;
}

function weightedMovingAverage(data1, period1 = 3) {
    const weights1 = Array.from({
        length: period1
    }, (_1, i1) => i1 + 1);
    const weightSum1 = weights1.reduce((a1, b1) => a1 + b1, 0);
    let result1 = [];
    for (let i1 = 0; i1 < data1.length; i1++) {
        if (i1 < period1 - 1) {
            result1.push(null);
            continue;
        }
        let weightedSum1 = 0;
        for (let j1 = 0; j1 < period1; j1++) {
            weightedSum1 += data1[i1 - j1].y * weights1[j1];
        }
        result1.push(Math.round(weightedSum1 / weightSum1));
    }
    return result1;
}

function predictTodaysViews(data1) {
    const movingAvg1 = weightedMovingAverage(data1);
    const lastMovingAvg1 = movingAvg1[movingAvg1.length - 1];
    const currentViews1 = data1[data1.length - 1].y;
    const currentTimeUTC1 = Date.now() + now.getTimezoneOffset() * 60 * 1000;
    const elapsedTime1 = (currentTimeUTC1 - startOfDay) / oneDay; // amount of day passed
    let adjustedPrediction1 = lastMovingAvg1;
    if (currentViews1 >= lastMovingAvg1) {
        // If higher than the average prediction, extrapolate
        adjustedPrediction1 = currentViews1 + (currentViews1 - lastMovingAvg1) * (1 - elapsedTime1);
    } else {
        // If views are lower than the average, adjust towards average
        adjustedPrediction1 = currentViews1 + lastMovingAvg1 * (1 - elapsedTime1);
    }
    return Math.round(Math.max(adjustedPrediction1, currentViews1)); // never lower than actual data
}
export default class TopicViewsChart extends Component {
    chart = null;
    noData = false;
    @action
    async renderChart(element1) {
        await loadScript("/javascripts/Chart.min.js");
        if (!this.args.views ? .stats || this.args.views ? .stats ? .length === 0) {
            this.noData = true;
            return;
        }
        let data1 = this.args.views.stats.map((item1) => ({
            x: new Date(`${item1.viewed_at}T00:00:00Z`).getTime(),
            y: item1.views
        }));
        data1 = fillMissingDates(data1);
        const lastDay1 = data1[data1.length - 1];
        const predictedViews1 = predictTodaysViews(data1);
        const predictedDataPoint1 = {
            x: lastDay1.x,
            y: predictedViews1
        };
        // remove current day's actual point, we'll replace with prediction
        data1 = data1.slice(0, data1.length - 1);
        // Add predicted data point
        data1.push(predictedDataPoint1);
        const context1 = element1.getContext("2d");
        const xMin1 = data1[0].x;
        const xMax1 = lastDay1.x;
        const topicMapElement1 = document.querySelector(".topic-map");
        // grab colors from CSS
        const lineColor1 = getComputedStyle(topicMapElement1).getPropertyValue("--chart-line-color");
        const pointColor1 = getComputedStyle(topicMapElement1).getPropertyValue("--chart-point-color");
        const predictionColor1 = getComputedStyle(topicMapElement1).getPropertyValue("--chart-prediction-color");
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new window.Chart(context1, {
            type: "line",
            data: {
                datasets: [{
                        label: "Views",
                        data: data1.slice(0, -1),
                        showLine: true,
                        borderColor: pointColor1,
                        backgroundColor: lineColor1,
                        pointBackgroundColor: pointColor1
                    },
                    {
                        label: "Predicted Views",
                        data: [
                            data1[data1.length - 2],
                            data1[data1.length - 1]
                        ],
                        showLine: true,
                        borderDash: [
                            5,
                            5
                        ],
                        borderColor: predictionColor1,
                        backgroundColor: predictionColor1,
                        pointBackgroundColor: predictionColor1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: "linear",
                        position: "bottom",
                        min: xMin1,
                        max: xMax1,
                        ticks: {
                            autoSkip: false,
                            stepSize: oneDay,
                            maxTicksLimit: 15,
                            callback: function(value1) {
                                const date1 = new Date(value1 + oneDay);
                                return date1.toLocaleDateString(I18n.currentBcp47Locale, {
                                    month: "2-digit",
                                    day: "2-digit"
                                });
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value1) {
                                return value1;
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(tooltipItem1) {
                                let date1 = new Date(tooltipItem1[0] ? .parsed ? .x + oneDay);
                                if (tooltipItem1.length === 0) {
                                    const today1 = new Date();
                                    date1 = today1.getUTCDate();
                                }
                                return date1.toLocaleDateString(I18n.currentBcp47Locale, {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric"
                                });
                            },
                            label: function(tooltipItem1) {
                                const label1 = tooltipItem1 ? .parsed ? .x === startOfDay ? I18n.t("topic_map.predicted_views") : I18n.t("topic_map.views");
                                return `${label1}: ${tooltipItem1?.parsed?.y}`;
                            }
                        },
                        filter: function(tooltipItem1) {
                            return !(tooltipItem1 ? .parsed ? .x === startOfDay - oneDay && tooltipItem1 ? .datasetIndex === 1);
                        }
                    }
                }
            }
        });
    }
    static {
        template(`
    {{#if this.noData}}
      {{i18n "topic_map.chart_error"}}
    {{else}}
      <canvas {{didInsert this.renderChart}}></canvas>
      <div class="view-explainer">{{i18n "topic_map.view_explainer"}}</div>
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}