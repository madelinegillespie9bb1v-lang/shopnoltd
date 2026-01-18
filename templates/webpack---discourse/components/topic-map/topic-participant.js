import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    htmlSafe
} from "@ember/template";
import {
    gt
} from "truth-helpers";
import UserAvatarFlair from "discourse/components/user-avatar-flair";
import {
    userPath
} from "discourse/lib/url";
import {
    avatarImg
} from "discourse-common/lib/avatar-utils";
const addTopicParticipantClassesCallbacks = [];
export function addTopicParticipantClassesCallback(callback1) {
    addTopicParticipantClassesCallbacks.push(callback1);
}
export default class TopicParticipant extends Component {
    get avatarImage() {
        return htmlSafe(avatarImg({
            avatarTemplate: this.args.participant.avatar_template,
            size: "medium",
            title: this.args.participant.name || this.args.participant.username
        }));
    }
    get participantClasses() {
        const {
            primary_group_name: primary_group_name1
        } = this.args.participant;
        return [
            primary_group_name1 ? `group-${primary_group_name1}` : null,
            addTopicParticipantClassesCallbacks.map((callback1) => callback1(this.args.participant))
        ].filter(Boolean).flat(3).join(" ");
    }
    get linkClasses() {
        return [
            "poster",
            "trigger-user-card",
            this.args.toggledUsers ? .has(this.args.participant.username) ? "toggled" : null
        ].filter(Boolean).join(" ");
    }
    get userUrl() {
        return userPath(this.args.participant.username);
    }
    static {
        template(`
    <div class={{this.participantClasses}}>
      <a
        class={{this.linkClasses}}
        data-user-card={{@participant.username}}
        title={{@participant.username}}
        href={{this.userUrl}}
      >
        {{this.avatarImage}}
        {{#if (gt @participant.post_count 1)}}
          <span class="post-count">{{@participant.post_count}}</span>
        {{/if}}
        <UserAvatarFlair @user={{@participant}} />
      </a>
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}