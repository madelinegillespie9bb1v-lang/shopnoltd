import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    cached
} from "@glimmer/tracking";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import willDestroy from "@ember/render-modifiers/modifiers/will-destroy";
import {
    service
} from "@ember/service";
import {
    htmlSafe
} from "@ember/template";
import BasicTopicList from "discourse/components/basic-topic-list";
import concatClass from "discourse/helpers/concat-class";
import i18n from "discourse-common/helpers/i18n";
import getURL from "discourse-common/lib/get-url";
import I18n from "discourse-i18n";
const LIST_ID = "related-Messages";
export default class RelatedMessages extends Component {
    @service
    moreTopicsPreferenceTracking;
    @service
    currentUser;
    get hidden() {
        return this.moreTopicsPreferenceTracking.get("selectedTab") !== LIST_ID;
    }
    @action
    registerList() {
        this.moreTopicsPreferenceTracking.registerTopicList({
            name: I18n.t("related_messages.pill"),
            id: LIST_ID
        });
    }
    @action
    removeList() {
        this.moreTopicsPreferenceTracking.removeTopicList(LIST_ID);
    }
    @cached
    get targetUser() {
        const topic1 = this.args.topic;
        if (!topic1 || !topic1.isPrivateMessage) {
            return;
        }
        const allowedUsers1 = topic1.details.allowed_users;
        if (topic1.relatedMessages ? .length >= 5 && allowedUsers1.length === 2 && topic1.details.allowed_groups.length === 0 && allowedUsers1.find((u1) => u1.username === this.currentUser.username)) {
            return allowedUsers1.find((u1) => u1.username !== this.currentUser.username);
        }
    }
    get searchLink() {
        return getURL(`/search?expanded=true&q=%40${this.targetUser.username}%20in%3Apersonal-direct`);
    }
    static {
        template(`
    <div
      id="related-messages"
      class={{concatClass "more-topics__list" (if this.hidden "hidden")}}
      role="complementary"
      aria-labelledby="related-messages-title"
      {{didInsert this.registerList}}
      {{willDestroy this.removeList}}
    >
      <h3 id="related-messages-title" class="more-topics__list-title">
        {{i18n "related_messages.title"}}
      </h3>

      <div class="topics">
        <BasicTopicList
          @hideCategory="true"
          @showPosters="true"
          @topics={{@topic.relatedMessages}}
        />
      </div>

      {{#if this.targetUser}}
        <h3 class="see-all-pms-message">
          {{htmlSafe
            (i18n
              "related_messages.see_all"
              path=this.searchLink
              username=this.targetUser.username
            )
          }}
        </h3>
      {{/if}}
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}