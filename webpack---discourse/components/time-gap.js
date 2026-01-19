import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import I18n from "discourse-i18n";
export default class TimeGap extends Component {
    get description() {
        const daysSince1 = this.args.daysSince;
        if (daysSince1 < 30) {
            return I18n.t("dates.later.x_days", {
                count: daysSince1
            });
        } else if (daysSince1 < 365) {
            const gapMonths1 = Math.round(daysSince1 / 30);
            return I18n.t("dates.later.x_months", {
                count: gapMonths1
            });
        } else {
            const gapYears1 = Math.round(daysSince1 / 365);
            return I18n.t("dates.later.x_years", {
                count: gapYears1
            });
        }
    }
    static {
        template(`
    <div class="topic-avatar"></div>
    <div class="small-action-desc timegap">
      {{this.description}}
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}