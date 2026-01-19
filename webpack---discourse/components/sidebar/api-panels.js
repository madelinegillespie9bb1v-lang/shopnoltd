import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";
import ApiSections from "./api-sections";
export default class SidebarApiPanels extends Component {
    @service
    sidebarState;
    get panelCssClass() {
        return `${this.sidebarState.currentPanel.key}-panel`;
    }
    static {
        template(`
    <div class="sidebar-sections {{this.panelCssClass}}">
      <ApiSections
        @collapsable={{@collapsableSections}}
        @expandActiveSection={{this.sidebarState.currentPanel.expandActiveSection}}
        @scrollActiveLinkIntoView={{this.sidebarState.currentPanel.scrollActiveLinkIntoView}}
      />
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}