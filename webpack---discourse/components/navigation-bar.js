import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    concat,
    hash
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DropdownMenu from "discourse/components/dropdown-menu";
import NavigationItem from "discourse/components/navigation-item";
import PluginOutlet from "discourse/components/plugin-outlet";
import {
    filterTypeForMode
} from "discourse/lib/filter-mode";
import icon from "discourse-common/helpers/d-icon";
import DMenu from "float-kit/components/d-menu";
export default class NavigationBarComponent extends Component {
    @service
    site;
    get filterType() {
        return filterTypeForMode(this.args.filterMode);
    }
    get selectedNavItem() {
        const {
            navItems: navItems1
        } = this.args;
        let item1 = navItems1.find((i1) => i1.active === true);
        item1 = item1 || navItems1.find((i1) => i1.filterType === this.filterType);
        return item1 || navItems1[0];
    }
    @action
    onRegisterApi(api1) {
        this.dMenu = api1;
    }
    static {
        template(`
    <ul id="navigation-bar" class="nav nav-pills">
      {{#if this.site.mobileView}}
        <li>
          <DMenu
            @modalForMobile={{true}}
            @autofocus={{true}}
            @identifier="list-control-toggle-link"
            @onRegisterApi={{this.onRegisterApi}}
          >
            <:trigger>
              <span
                class="list-control-toggle-link__text"
              >{{this.selectedNavItem.displayName}}</span>
              {{icon "discourse-chevron-expand"}}
            </:trigger>

            <:content>
              <DropdownMenu {{on "click" this.dMenu.close}} as |dropdown|>
                {{#each @navItems as |navItem|}}
                  <NavigationItem
                    @content={{navItem}}
                    @filterMode={{@filterMode}}
                    @category={{@category}}
                    class={{concat "nav-item_" navItem.name}}
                  />

                {{/each}}
                <dropdown.item>
                  <PluginOutlet
                    @name="extra-nav-item"
                    @connectorTagName="span"
                    @outletArgs={{hash
                      category=@category
                      tag=@tag
                      filterMode=@filterMode
                    }}
                  />
                </dropdown.item>
              </DropdownMenu>
            </:content>
          </DMenu>
        </li>
        <li>
          <PluginOutlet
            @name="inline-extra-nav-item"
            @connectorTagName="span"
            @outletArgs={{hash category=@category filterMode=@filterMode}}
          />
        </li>
      {{else}}
        {{#each @navItems as |navItem|}}
          <NavigationItem
            @content={{navItem}}
            @filterMode={{@filterMode}}
            @category={{@category}}
            class={{concat "nav-item_" navItem.name}}
          />
        {{/each}}
        <PluginOutlet
          @name="extra-nav-item"
          @connectorTagName="li"
          @outletArgs={{hash
            category=@category
            tag=@tag
            filterMode=@filterMode
          }}
        />

      {{/if}}
    </ul>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}