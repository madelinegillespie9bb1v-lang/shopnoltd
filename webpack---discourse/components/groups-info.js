import {
    template
} from "@ember/template-compiler";
import {
    hash
} from "@ember/helper";
import {
    or
} from "truth-helpers";
import PluginOutlet from "discourse/components/plugin-outlet";
const GroupsInfo = template(`
  <PluginOutlet
    @name="group-info-details"
    @outletArgs={{hash group=@group}}
    @defaultGlimmer={{true}}
  >
    <span class="group-info-details">
      <span class="groups-info-name">
        {{or @group.full_name @group.displayName}}
      </span>
    </span>
  </PluginOutlet>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default GroupsInfo;