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
import DiscourseURL from "discourse/lib/url";
export default class BootstrapModeNotice extends Component {
    @service
    siteSettings;
    @action
    routeToAdminGuide() {
        DiscourseURL.routeTo(`/t/-/${this.siteSettings.admin_quick_start_topic_id}`);
    }
    static {
        template(`
    <DButton
      @action={{this.routeToAdminGuide}}
      @label="bootstrap_mode"
      class="btn-default bootstrap-mode"
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}