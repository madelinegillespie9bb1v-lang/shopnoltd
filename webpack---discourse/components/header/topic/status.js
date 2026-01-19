import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import concatClass from "discourse/helpers/concat-class";
import TopicStatusIcons from "discourse/helpers/topic-status-icons";
import {
    escapeExpression
} from "discourse/lib/utilities";
import icon from "discourse-common/helpers/d-icon";
import I18n from "discourse-i18n";
export default class Status extends Component {
    @service
    currentUser;
    get canAct() {
        return this.currentUser && !this.args.disableActions;
    }
    get topicStatuses() {
        let topicStatuses1 = [];
        TopicStatusIcons.render(this.args.topicInfo, (name1, key1) => {
            const iconArgs1 = {
                class: key1 === "unpinned" ? "unpinned" : null
            };
            const statusIcon1 = {
                name: name1,
                iconArgs: iconArgs1
            };
            const attributes1 = {
                title: escapeExpression(I18n.t(`topic_statuses.${key1}.help`))
            };
            let klass1 = [
                "topic-status"
            ];
            if (key1 === "unpinned" || key1 === "pinned") {
                klass1.push("pin-toggle-button", key1);
                klass1 = klass1.join(" ");
            }
            topicStatuses1.push({
                attributes: attributes1,
                klass: klass1,
                icon: statusIcon1
            });
        });
        return topicStatuses1;
    }
    @action
    togglePinnedForUser(e1) {
        if (!this.canAct) {
            return;
        }
        const parent1 = e1.target.closest(".topic-statuses");
        if (parent1 ? .querySelector(".pin-toggle-button") ? .contains(e1.target)) {
            this.args.topicInfo.togglePinnedForUser();
        }
    }
    static {
        template(`
    <span class="topic-statuses">
      {{#each this.topicStatuses as |status|}}
        {{! template-lint-disable no-invalid-interactive }}
        <span
          class={{concatClass status.klass "topic-status"}}
          {{on "click" this.togglePinnedForUser}}
        >
          {{icon status.icon.name class=status.icon.iconArgs.class}}
        </span>
      {{/each}}
    </span>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}