import {
    template
} from "@ember/template-compiler";
import i18n from "discourse-common/helpers/i18n";
import SectionLink from "../section-link";
const SidebarCommonAllTagsSectionLink = template(`
  <SectionLink
    @linkName="all-tags"
    @content={{i18n "sidebar.all_tags"}}
    @route="tags"
    @prefixType="icon"
    @prefixValue="list"
  />
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default SidebarCommonAllTagsSectionLink;