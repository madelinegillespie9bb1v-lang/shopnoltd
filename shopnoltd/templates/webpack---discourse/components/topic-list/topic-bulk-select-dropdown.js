import {
    template
} from "@ember/template-compiler";
import BulkSelectTopicsDropdown from "discourse/components/bulk-select-topics-dropdown";
import i18n from "discourse-common/helpers/i18n";
const TopicBulkSelectDropdown = template(`
  <div class="bulk-select-topics-dropdown">
    <span class="bulk-select-topic-dropdown__count">
      {{i18n
        "topics.bulk.selected_count"
        count=@bulkSelectHelper.selected.length
      }}
    </span>
    <BulkSelectTopicsDropdown
      @bulkSelectHelper={{@bulkSelectHelper}}
      @afterBulkActionComplete={{@afterBulkActionComplete}}
    />
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default TopicBulkSelectDropdown;