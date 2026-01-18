import {
    template
} from "@ember/template-compiler";
import DButton from "discourse/components/d-button";
const SidebarSectionHeader = template(`
  {{#if @collapsable}}
    <DButton
      @title="sidebar.toggle_section"
      @action={{@toggleSectionDisplay}}
      @forwardEvent={{true}}
      aria-controls={{@sidebarSectionContentId}}
      aria-expanded={{if @isExpanded "true" "false"}}
      class="sidebar-section-header sidebar-section-header-collapsable btn-transparent"
    >
      {{yield}}
    </DButton>
  {{else}}
    <span class="sidebar-section-header">
      {{yield}}
    </span>
  {{/if}}
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default SidebarSectionHeader;