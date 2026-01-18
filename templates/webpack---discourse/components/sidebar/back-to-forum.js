import {
    template
} from "@ember/template-compiler";
import icon from "discourse-common/helpers/d-icon";
import i18n from "discourse-common/helpers/i18n";
import getURL from "discourse-common/lib/get-url";
const BackToForum = template(`
  <a href={{getURL "/"}} class="sidebar-sections__back-to-forum">
    {{icon "arrow-left"}}

    <span>{{i18n "sidebar.back_to_forum"}}</span>
  </a>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default BackToForum;