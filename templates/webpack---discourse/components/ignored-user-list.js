import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DButton from "discourse/components/d-button";
import {
    popupAjaxError
} from "discourse/lib/ajax-error";
import User from "discourse/models/user";
import i18n from "discourse-common/helpers/i18n";
import IgnoredUserListItem from "./ignored-user-list-item";
import IgnoreDurationModal from "./modal/ignore-duration-with-username";
export default class IgnoredUserList extends Component {
    @service
    modal;
    @action
    async removeIgnoredUser(item1) {
        this.args.items.removeObject(item1);
        try {
            const user1 = await User.findByUsername(item1);
            await user1.updateNotificationLevel({
                level: "normal",
                actingUser: this.args.model
            });
        } catch (e1) {
            popupAjaxError(e1);
        }
    }
    @action
    newIgnoredUser() {
        this.modal.show(IgnoreDurationModal, {
            model: {
                actingUser: this.args.model,
                ignoredUsername: null,
                onUserIgnored: (username1) => {
                    this.args.items.addObject(username1);
                }
            }
        });
    }
    static {
        template(`
    <div>
      <div class="ignored-list">
        {{#each @items as |item|}}
          <IgnoredUserListItem
            @item={{item}}
            @onRemoveIgnoredUser={{this.removeIgnoredUser}}
          />
        {{else}}
          {{i18n "user.user_notifications.ignore_no_users"}}
        {{/each}}
      </div>
      <div class="instructions">{{i18n "user.ignored_users_instructions"}}</div>
      <div>
        <DButton
          @action={{this.newIgnoredUser}}
          @icon="plus"
          @label="user.user_notifications.add_ignored_user"
          class="btn-default"
        />
      </div>
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}