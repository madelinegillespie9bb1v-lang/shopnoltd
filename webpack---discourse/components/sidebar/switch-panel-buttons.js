import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    fn
} from "@ember/helper";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DButton from "discourse/components/d-button";
export default class SwitchPanelButtons extends Component {
    @service
    router;
    @service
    sidebarState;
    @tracked
    isSwitching = false;
    @action
    async switchPanel(panel1) {
        this.isSwitching = true;
        this.sidebarState.currentPanel.lastKnownURL = this.router.currentURL;
        const destination1 = panel1 ? .switchButtonDefaultUrl || panel1 ? .lastKnownURL;
        if (!destination1) {
            return;
        }
        try {
            await this.router.transitionTo(destination1).followRedirects();
            this.sidebarState.setPanel(panel1.key);
        } catch (e1) {
            if (e1.name !== "TransitionAborted") {
                throw e1;
            }
        } finally {
            this.isSwitching = false;
        }
    }
    static {
        template(`
    {{#each @buttons as |button|}}
      <DButton
        @action={{fn this.switchPanel button}}
        @icon={{button.switchButtonIcon}}
        @disabled={{this.isSwitching}}
        @translatedLabel={{button.switchButtonLabel}}
        data-key={{button.key}}
        class="btn-default sidebar__panel-switch-button"
      />
    {{/each}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}