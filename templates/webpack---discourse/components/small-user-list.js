import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";
import avatar from "discourse/helpers/bound-avatar-template";
import {
    userPath
} from "discourse/lib/url";
import i18n from "discourse-common/helpers/i18n";
import getURL from "discourse-common/lib/get-url";
export default class SmallUserList extends Component {
    @service
    currentUser;
    smallUserAtts(user1) {
        return {
            template: user1.avatar_template,
            username: user1.username,
            post_url: user1.post_url,
            url: userPath(user1.username_lower),
            unknown: user1.unknown
        };
    }
    get users() {
        let users1 = this.args.data.users;
        if (this.args.data.addSelf && !users1.some((u1) => u1.username === this.currentUser.username)) {
            users1 = users1.concat(this.smallUserAtts(this.currentUser));
        }
        return users1;
    }
    get postUrl() {
        const url1 = this.users.find((user1) => user1.post_url);
        if (url1) {
            return getURL(url1);
        }
    }
    static {
        template(`
    {{#each this.users as |user|}}
      {{#if user.unknown}}
        <div
          title={{i18n "post.unknown_user"}}
          class="unknown"
          role="listitem"
        ></div>
      {{else}}
        <a
          class="trigger-user-card"
          data-user-card={{user.username}}
          title={{user.username}}
          aria-hidden="false"
          role="listitem"
        >
          {{avatar user.template "tiny"}}
        </a>
      {{/if}}
    {{/each}}

    {{#if @data.description}}
      {{#if this.postUrl}}
        <a href={{this.postUrl}}>
          <span aria-hidden="true" class="list-description">
            {{i18n @data.description count=@data.count}}
          </span>
        </a>
      {{else}}
        <span aria-hidden="true" class="list-description">
          {{i18n @data.description count=@data.count}}
        </span>
      {{/if}}
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}