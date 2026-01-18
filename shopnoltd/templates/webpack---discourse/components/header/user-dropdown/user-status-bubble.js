import {
    template
} from "@ember/template-compiler";
import {
    concat
} from "@ember/helper";
import emoji from "discourse/helpers/emoji";
import escape from "discourse-common/lib/escape";
import I18n from "discourse-i18n";
const title = (description1, endsAt1, timezone1) => {
    let content1 = escape(description1);
    if (endsAt1) {
        const until1 = moment.tz(endsAt1, timezone1).format(I18n.t("dates.long_date_without_year"));
        content1 += `\n${I18n.t("until")} ${until1}`;
    }
    return content1;
};
const UserStatusBubble = template(`
  <div class="user-status-background">
    {{emoji
      @status.emoji
      title=(title @status.description @status.ends_at @timezone)
      alt=(concat ":" @status.emoji ":")
    }}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default UserStatusBubble;