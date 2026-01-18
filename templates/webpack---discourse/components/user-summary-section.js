import {
    template
} from "@ember/template-compiler";
import {
    concat
} from "@ember/helper";
import i18n from "discourse-common/helpers/i18n";
const UserSummarySection = template(`
  <div class="top-sub-section" ...attributes>
    <h3 class="stats-title">{{i18n (concat "user.summary." @title)}}</h3>
    {{yield}}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default UserSummarySection;