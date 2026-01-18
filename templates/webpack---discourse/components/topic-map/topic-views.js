import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import I18n from "I18n";
export default class TopicViews extends Component {
    adjustAggregatedData(stats1) {
        const adjustedStats1 = [];
        stats1.forEach((stat1) => {
            const localDate1 = new Date(`${stat1.viewed_at}T00:00:00Z`);
            const localDateStr1 = localDate1.toLocaleDateString(I18n.currentBcp47Locale, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
            const existingStat1 = adjustedStats1.find((s1) => s1.dateStr === localDateStr1);
            if (existingStat1) {
                existingStat1.views += stat1.views;
            } else {
                adjustedStats1.push({
                    dateStr: localDateStr1,
                    views: stat1.views,
                    localDate: localDate1
                });
            }
        });
        return adjustedStats1.map((stat1) => ({
            viewed_at: stat1.localDate.toISOString().split("T")[0],
            views: stat1.views
        }));
    }
    formatDate(date1) {
        return date1.toLocaleDateString(I18n.currentBcp47Locale, {
            month: "2-digit",
            day: "2-digit"
        });
    }
    get updatedStats() {
        const adjustedStats1 = this.adjustAggregatedData(this.args.views.stats);
        let stats1 = adjustedStats1.map((stat1) => {
            const statDate1 = new Date(`${stat1.viewed_at}T00:00:00`).getTime();
            const localStatDate1 = new Date(statDate1);
            return {
                ...stat1,
                statDate: localStatDate1,
                label: this.formatDate(localStatDate1)
            };
        });
        // today should always have at least 1 view
        // because it's being viewed right now
        const lastStat1 = stats1[stats1.length - 1];
        lastStat1.views = Math.max(lastStat1.views, 1);
        return stats1;
    }
    static {
        template(`
    <div class="topic-views__wrapper">
      {{#each this.updatedStats as |stat|}}
        <div class="topic-views">
          <div class="topic-views__count">
            {{stat.views}}
          </div>
          <div class="topic-views__date">
            {{stat.label}}
          </div>
        </div>
      {{/each}}
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}