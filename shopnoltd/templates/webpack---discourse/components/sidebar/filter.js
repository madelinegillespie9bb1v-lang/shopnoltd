import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DButton from "discourse/components/d-button";
import {
    translateModKey
} from "discourse/lib/utilities";
import i18n from "discourse-common/helpers/i18n";
export default class Filter extends Component {
    @service
    sidebarState;
    willDestroy() {
        super.willDestroy(...arguments);
        this.sidebarState.clearFilter();
    }
    get shouldDisplay() {
        return this.sidebarState.currentPanel.filterable;
    }
    get displayClearFilter() {
        return this.sidebarState.filter.length > 0;
    }
    @action
    setFilter(event1) {
        this.sidebarState.filter = event1.target.value;
    }
    @action
    handleEscape(event1) {
        if (event1.key === "Escape") {
            event1.stopPropagation();
            if (this.sidebarState.filter.length > 0) {
                this.sidebarState.filter = "";
            } else {
                event1.target.blur();
            }
        }
    }
    @action
    clearFilter() {
        this.sidebarState.clearFilter();
        document.querySelector(".sidebar-filter__input").focus();
    }
    get showShortcutCombo() {
        return !this.displayClearFilter;
    }
    get sidebarShortcutCombo() {
        return `${translateModKey("Meta")}+/`;
    }
    static {
        template(`
    {{#if this.shouldDisplay}}
      <div class="sidebar-filter">
        <div class="sidebar-filter__input-container">
          <input
            {{on "input" this.setFilter}}
            {{on "keydown" this.handleEscape}}
            value={{this.sidebarState.filter}}
            placeholder={{i18n "sidebar.filter"}}
            type="text"
            enterkeyhint="done"
            class="sidebar-filter__input"
          />
          {{#if this.showShortcutCombo}}
            <span
              class="sidebar-filter__shortcut-hint"
            >{{this.sidebarShortcutCombo}}</span>
          {{/if}}

          {{#if this.displayClearFilter}}
            <DButton
              @action={{this.clearFilter}}
              @icon="xmark"
              class="sidebar-filter__clear"
            />
          {{/if}}
        </div>
      </div>
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}