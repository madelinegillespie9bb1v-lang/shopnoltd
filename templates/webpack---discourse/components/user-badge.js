import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import BadgeButton from "discourse/components/badge-button";
export default class UserBadge extends Component {
    get showGrantCount() {
        return this.args.count > 1;
    }
    get badgeUrl() {
        // NOTE: I tried using a link-to helper here but the queryParams mean it fails
        let username1 = this.args.user ? .username_lower;
        username1 = username1 ? `?username=${username1}` : "";
        return this.args.badge.url + username1;
    }
    static {
        template(`
    <a class="user-card-badge-link" href={{this.badgeUrl}}>
      <BadgeButton @badge={{@badge}}>
        {{#if this.showGrantCount}}
          <span class="count">&nbsp;(&times;{{@count}})</span>
        {{/if}}
      </BadgeButton>
    </a>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}