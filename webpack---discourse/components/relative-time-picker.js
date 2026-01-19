import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import didUpdate from "@ember/render-modifiers/modifiers/did-update";
import {
    isBlank
} from "@ember/utils";
import {
    eq
} from "truth-helpers";
import I18n from "discourse-i18n";
import ComboBox from "select-kit/components/combo-box";
const HOUR = 60;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

function roundDuration(duration1) {
    let rounded1 = parseFloat(duration1.toFixed(1));
    rounded1 = Math.round(rounded1 * 2) / 2;
    // don't show decimal point for fraction-less numbers
    return rounded1 % 1 === 0 ? rounded1.toFixed(0) : rounded1;
}

function inputValueFromMinutes(minutes1) {
    if (!minutes1) {
        return null;
    } else if (minutes1 > YEAR) {
        return roundDuration(minutes1 / YEAR);
    } else if (minutes1 > MONTH) {
        return roundDuration(minutes1 / MONTH);
    } else if (minutes1 > DAY) {
        return roundDuration(minutes1 / DAY);
    } else if (minutes1 > HOUR) {
        return roundDuration(minutes1 / HOUR);
    } else {
        return minutes1;
    }
}

function intervalFromMinutes(minutes1) {
    if (minutes1 > YEAR) {
        return "years";
    } else if (minutes1 > MONTH) {
        return "months";
    } else if (minutes1 > DAY) {
        return "days";
    } else if (minutes1 > HOUR) {
        return "hours";
    } else {
        return "mins";
    }
}
export default class RelativeTimePicker extends Component {
    @tracked
    inputValue;
    @tracked
    duration;
    @tracked
    interval;
    constructor() {
        super(...arguments);
        this.initValues();
    }
    get intervals() {
        const count1 = this.duration ? parseFloat(this.duration) : 0;
        return [{
                id: "mins",
                name: I18n.t("relative_time_picker.minutes", {
                    count: count1
                })
            },
            {
                id: "hours",
                name: I18n.t("relative_time_picker.hours", {
                    count: count1
                })
            },
            {
                id: "days",
                name: I18n.t("relative_time_picker.days", {
                    count: count1
                })
            },
            {
                id: "months",
                name: I18n.t("relative_time_picker.months", {
                    count: count1
                })
            },
            {
                id: "years",
                name: I18n.t("relative_time_picker.years", {
                    count: count1
                })
            }
        ].filter((interval1) => !this.args.hiddenIntervals ? .includes(interval1.id));
    }
    minutesFromInputValueAndInterval(duration1, interval1) {
        if (isNaN(duration1)) {
            return null;
        }
        switch (interval1) {
            case "mins":
                // we round up here in case the user manually inputted a step < 1
                return Math.ceil(duration1);
            case "hours":
                return duration1 * HOUR;
            case "days":
                return duration1 * DAY;
            case "months":
                return duration1 * MONTH; // less accurate because of varying days in months
            case "years":
                return duration1 * YEAR; // least accurate because of varying days in months/years
        }
    }
    @action
    initValues() {
        let minutes1 = this.args.durationMinutes;
        if (this.args.durationHours) {
            minutes1 ? ? = this.args.durationHours * HOUR;
        }
        this.inputValue = inputValueFromMinutes(minutes1);
        if (this.args.durationMinutes !== undefined) {
            this.interval = intervalFromMinutes(this.args.durationMinutes);
        } else if (this.args.durationHours === null) {
            this.interval = "hours";
        } else if (this.args.durationHours !== undefined) {
            this.interval = intervalFromMinutes(this.args.durationHours * HOUR);
        } else {
            this.interval = "mins";
        }
        this.duration = this.minutesFromInputValueAndInterval(this.inputValue, this.interval);
    }
    @action
    onChangeDuration(event1) {
        if (isBlank(event1.target.value)) {
            this.duration = null;
            this.inputValue = null;
        } else {
            let newDuration1 = this.minutesFromInputValueAndInterval(parseFloat(event1.target.value), this.interval);
            // if on the edge of an interval - go to the next value
            // (e.g. 24 hours -> 1.5 days, instead of 24 hours -> 1 day)
            if (newDuration1 > this.duration && (this.duration === YEAR || this.duration === MONTH || this.duration === DAY || this.duration === HOUR)) {
                newDuration1 = this.minutesFromInputValueAndInterval(parseFloat(event1.target.value) * 1.5, this.interval);
            }
            this.duration = newDuration1;
            this.interval = intervalFromMinutes(this.duration);
            this.inputValue = inputValueFromMinutes(this.duration);
        }
        this.args.onChange ? .(this.duration);
    }
    @action
    onChangeInterval(interval1) {
        this.interval = interval1;
        const newDuration1 = this.minutesFromInputValueAndInterval(this.inputValue, this.interval);
        if (newDuration1 !== this.duration) {
            this.duration = newDuration1;
            this.args.onChange ? .(this.duration);
        }
    }
    static {
        template(`
    <div class="relative-time-picker" ...attributes>
      <input
        {{didUpdate this.initValues @durationMinutes @durationHours}}
        {{on "change" this.onChangeDuration}}
        type="number"
        min={{if (eq this.interval "mins") 1 0.5}}
        step={{if (eq this.interval "mins") 1 0.5}}
        value={{this.inputValue}}
        id={{@id}}
        class="relative-time-duration"
      />
      <ComboBox
        @content={{this.intervals}}
        @value={{this.interval}}
        @onChange={{this.onChangeInterval}}
        class="relative-time-intervals"
      />
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}