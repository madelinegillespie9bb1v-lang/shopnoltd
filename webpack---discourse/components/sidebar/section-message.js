import {
    template
} from "@ember/template-compiler";
const SidebarSectionMessage = template(`
  <div class="sidebar-section-message-wrapper sidebar-row">
    <div class="sidebar-section-message">
      {{yield}}
    </div>
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default SidebarSectionMessage;