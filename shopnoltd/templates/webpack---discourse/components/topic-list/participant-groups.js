import {
    template
} from "@ember/template-compiler";
import icon from "discourse-common/helpers/d-icon";
import i18n from "discourse-common/helpers/i18n";
const ParticipantGroups = template(`
  <div
    role="list"
    aria-label={{i18n "topic.participant_groups"}}
    class="participant-group-wrapper"
  >
    {{#each @groups as |group|}}
      <div class="participant-group">
        <a
          href={{group.url}}
          data-group-card={{group.name}}
          class="user-group trigger-group-card"
        >
          {{icon "users"}}
          {{group.name}}
        </a>
      </div>
    {{/each}}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default ParticipantGroups;