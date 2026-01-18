import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";
import {
    htmlSafe
} from "@ember/template";
import i18n from "discourse-common/helpers/i18n";
export default class CountI18n extends Component {
    @service
    currentUser;
    get fullKey() {
        let key1 = this.args.key;
        if (this.args.suffix) {
            key1 += this.args.suffix;
        }
        if (this.currentUser ? .new_new_view_enabled && key1 === "topic_count_new") {
            key1 = "topic_count_latest";
        }
        return key1;
    }
    static {
        template(`
    <span>{{htmlSafe (i18n this.fullKey count=@count)}}</span>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}