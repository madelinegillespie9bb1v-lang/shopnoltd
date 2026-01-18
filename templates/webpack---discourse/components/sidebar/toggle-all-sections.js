import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DButton from "discourse/components/d-button";
import {
    getCollapsedSidebarSectionKey
} from "discourse/lib/sidebar/helpers";
export default class ToggleAllSections extends Component {
    @service
    sidebarState;
    @service
    keyValueStore;
    get collapsableSections() {
        return this.args.sections.filter((section1) => section1.displaySection && !section1.hideSectionHeader);
    }
    get allSectionsExpanded() {
        return this.collapsableSections.every((section1) => {
            return !this.sidebarState.collapsedSections.has(getCollapsedSidebarSectionKey(section1.name));
        });
    }
    get title() {
        return this.allSectionsExpanded ? "sidebar.collapse_all_sections" : "sidebar.expand_all_sections";
    }
    get icon() {
        return this.allSectionsExpanded ? "angles-up" : "angles-down";
    }
    @action
    toggleAllSections() {
        const collapse1 = this.allSectionsExpanded;
        this.collapsableSections.forEach((section1) => {
            if (collapse1) {
                this.sidebarState.collapseSection(section1.name);
            } else {
                this.sidebarState.expandSection(section1.name);
            }
        });
    }
    static {
        template(`
    <DButton
      @action={{this.toggleAllSections}}
      @icon={{this.icon}}
      @title={{this.title}}
      class="btn-transparent sidebar-toggle-all-sections"
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}