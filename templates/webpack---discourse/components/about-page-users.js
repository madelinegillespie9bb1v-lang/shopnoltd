import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    action
} from "@ember/object";
import AboutPageUser from "discourse/components/about-page-user";
import DButton from "discourse/components/d-button";
import i18n from "discourse-common/helpers/i18n";
export default class AboutPageUsers extends Component {
    @tracked
    expanded = false;
    get users() {
        let users1 = this.args.users;
        if (this.showViewMoreButton && !this.expanded) {
            users1 = users1.slice(0, this.args.truncateAt);
        }
        return users1;
    }
    get showViewMoreButton() {
        return (this.args.truncateAt > 0 && this.args.users.length > this.args.truncateAt);
    }
    @action
    toggleExpanded() {
        this.expanded = !this.expanded;
    }
    static {
        template(`
    <div class="about-page-users-list">
      {{#each this.users as |user|}}
        <AboutPageUser @user={{user}} />
      {{/each}}
    </div>
    {{#if this.showViewMoreButton}}
      <DButton
        class="btn-flat about-page-users-list__expand-button"
        @action={{this.toggleExpanded}}
        @icon={{if this.expanded "chevron-up" "chevron-down"}}
        @translatedLabel={{if
          this.expanded
          (i18n "about.view_less")
          (i18n "about.view_more")
        }}
      />
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}