import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    concat,
    hash
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import {
    eq
} from "truth-helpers";
import avatar from "discourse/helpers/bound-avatar-template";
import icon from "discourse-common/helpers/d-icon";
import getURL from "discourse-common/lib/get-url";
export default class Participant extends Component {
    @service
    appEvents;
    get url() {
        return this.args.type === "user" ? this.args.user.path : getURL(`/g/${this.args.username}`);
    }
    @action
    click(e1) {
        this.appEvents.trigger(`topic-header:trigger-${this.args.type}-card`, this.args.username, e1.target, e1);
        e1.preventDefault();
    }
    static {
        template(`
    <span class={{concat "trigger-" @type "-card"}}>
      <a
        class="icon"
        {{on "click" this.click}}
        href={{this.url}}
        data-auto-route="true"
        title={{@username}}
      >
        {{#if (eq @type "user")}}
          {{avatar @user.avatar_template "tiny" (hash title=@username)}}
        {{else}}
          <span>
            {{icon "users"}}
            {{@username}}
          </span>
        {{/if}}
      </a>
    </span>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}