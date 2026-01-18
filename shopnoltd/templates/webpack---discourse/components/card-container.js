import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    inject as controller
} from "@ember/controller";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import GroupCardContents from "discourse/components/group-card-contents";
import UserCardContents from "discourse/components/user-card-contents";
import routeAction from "discourse/helpers/route-action";
import DiscourseURL, {
    groupPath,
    userPath
} from "discourse/lib/url";
import PluginOutlet from "./plugin-outlet";
export default class CardContainer extends Component {
    @service
    site;
    @controller
    topic;
    @action
    filterPosts(user1) {
        this.topic.send("filterParticipant", user1);
    }
    @action
    showUser(user1) {
        DiscourseURL.routeTo(userPath(user1.username_lower));
    }
    @action
    showGroup(group1) {
        DiscourseURL.routeTo(groupPath(group1.name));
    }
    static {
        template(`
    {{#if this.site.mobileView}}
      <div class="card-cloak hidden"></div>
    {{/if}}

    <PluginOutlet @name="user-card-content-container">
      <UserCardContents
        @topic={{this.topic.model}}
        @showUser={{this.showUser}}
        @filterPosts={{this.filterPosts}}
        @composePrivateMessage={{routeAction "composePrivateMessage"}}
        role="dialog"
      />
    </PluginOutlet>

    <GroupCardContents
      @topic={{this.topic.model}}
      @showUser={{this.showUser}}
      @showGroup={{this.showGroup}}
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}