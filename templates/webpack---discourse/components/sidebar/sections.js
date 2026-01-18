import {
    template
} from "@ember/template-compiler";
import AnonymousSections from "./anonymous/sections";
import UserSections from "./user/sections";
const SidebarSections = template(`
  {{#if @currentUser}}
    <UserSections
      @collapsableSections={{@collapsableSections}}
      @panel={{@panel}}
      @hideApiSections={{@hideApiSections}}
    />
  {{else}}
    <AnonymousSections @collapsableSections={{@collapsableSections}} />
  {{/if}}
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default SidebarSections;