import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    cached
} from "@glimmer/tracking";
import {
    getOwner,
    setOwner
} from "@ember/owner";
import {
    service
} from "@ember/service";
import ApiSection from "./api-section";
import PanelHeader from "./panel-header";
export default class SidebarApiSections extends Component {
    @service
    router;
    @service
    sidebarState;
    get sections() {
        let sectionConfigs1;
        if (this.sidebarState.combinedMode) {
            sectionConfigs1 = this.sidebarState.panels.filter((panel1) => !panel1.hidden).flatMap((panel1) => panel1.sections);
        } else {
            sectionConfigs1 = this.sidebarState.currentPanel.sections;
        }
        return sectionConfigs1.map((Section1) => {
            const SidebarSection1 = prepareSidebarSectionClass(Section1, this.router);
            const sectionInstance1 = new SidebarSection1({
                filterable: !this.sidebarState.combinedMode && this.sidebarState.currentPanel.filterable,
                sidebarState: this.sidebarState
            });
            setOwner(sectionInstance1, getOwner(this));
            return sectionInstance1;
        });
    }
    get filteredSections() {
        return this.sections.filter((section1) => section1.filtered);
    }
    static {
        template(`
    <PanelHeader @sections={{this.filteredSections}} />

    {{#each this.filteredSections as |section|}}
      <ApiSection
        @section={{section}}
        @collapsable={{@collapsable}}
        @expandWhenActive={{@expandActiveSection}}
        @scrollActiveLinkIntoView={{@scrollActiveLinkIntoView}}
      />
    {{/each}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}
// extends the class provided for the section to add functionality we don't want to be overridable when defining custom
// sections using the plugin API, like for example the filtering capabilities
function prepareSidebarSectionClass(Section1, routerService1) {
    return class extends Section1 {
        constructor({
            filterable: filterable1,
            sidebarState: sidebarState1
        }) {
            super();
            this.filterable = filterable1;
            this.sidebarState = sidebarState1;
        }
        @cached
        get filteredLinks() {
            if (!this.filterable || !this.sidebarState.filter) {
                return this.links;
            }
            if (this.text ? .toLowerCase() ? .match(this.sidebarState.sanitizedFilter)) {
                return this.links;
            }
            return this.links.filter((link1) => {
                return (link1.text.toString().toLowerCase().match(this.sidebarState.sanitizedFilter) || link1.keywords.navigation.some((keyword1) => keyword1.match(this.sidebarState.sanitizedFilter)));
            });
        }
        get activeLink() {
            return this.filteredLinks.find((link1) => {
                try {
                    const currentWhen1 = link1.currentWhen;
                    if (typeof currentWhen1 === "boolean") {
                        return currentWhen1;
                    }
                    // TODO detect active links using the href field
                    const queryParams1 = link1.query || {};
                    let models1;
                    if (link1.model) {
                        models1 = [
                            link1.model
                        ];
                    } else if (link1.models) {
                        models1 = link1.models;
                    } else {
                        models1 = [];
                    }
                    if (typeof currentWhen1 === "string") {
                        return currentWhen1.split(" ").some((route1) => routerService1.isActive(route1, ...models1, {
                            queryParams: queryParams1
                        }));
                    }
                    return routerService1.isActive(link1.route, ...models1, {
                        queryParams: queryParams1
                    });
                } catch (e1) {
                    // false if ember throws an exception while checking the routes
                    return false;
                }
            });
        }
        get filtered() {
            return !this.filterable || this.filteredLinks ? .length > 0;
        }
    };
}