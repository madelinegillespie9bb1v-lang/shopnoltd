import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    hash
} from "@ember/helper";
import {
    action
} from "@ember/object";
import {
    getOwner
} from "@ember/owner";
import {
    service
} from "@ember/service";
import {
    modifier as modifierFn
} from "ember-modifier";
import {
    and,
    eq,
    not,
    or
} from "truth-helpers";
import PluginOutlet from "discourse/components/plugin-outlet";
import DAG from "discourse/lib/dag";
import scrollLock from "discourse/lib/scroll-lock";
import DiscourseURL from "discourse/lib/url";
import {
    scrollTop
} from "discourse/mixins/scroll-top";
import AuthButtons from "./header/auth-buttons";
import Contents from "./header/contents";
import HamburgerDropdownWrapper from "./header/hamburger-dropdown-wrapper";
import Icons from "./header/icons";
import SearchMenuWrapper from "./header/search-menu-wrapper";
import UserMenuWrapper from "./header/user-menu-wrapper";
const SEARCH_BUTTON_ID = "search-button";
const USER_BUTTON_ID = "toggle-current-user";
const HAMBURGER_BUTTON_ID = "toggle-hamburger-menu";
const PANEL_SELECTOR = ".panel-body";
let headerButtons;
resetHeaderButtons();

function resetHeaderButtons() {
    headerButtons = new DAG({
        defaultPosition: {
            before: "auth"
        }
    });
    headerButtons.add("auth");
}
export function headerButtonsDAG() {
    return headerButtons;
}
export function clearExtraHeaderButtons() {
    resetHeaderButtons();
}
export default class GlimmerHeader extends Component {
    @service
    router;
    @service
    search;
    @service
    currentUser;
    @service
    siteSettings;
    @service
    site;
    @service
    appEvents;
    @service
    header;
    @tracked
    skipSearchContext = this.site.mobileView;
    appEventsListeners = modifierFn(() => {
        this.appEvents.on("header:keyboard-trigger", this, this.headerKeyboardTrigger);
        return () => {
            this.appEvents.off("header:keyboard-trigger", this, this.headerKeyboardTrigger);
        };
    });
    handleFocus = modifierFn((element1) => {
        const panelBody1 = element1.querySelector(PANEL_SELECTOR);
        if (!panelBody1) {
            return;
        }
        let isKeyboardEvent1 = false;
        const handleKeydown1 = (event1) => {
            if (event1.key) {
                isKeyboardEvent1 = true;
            }
        };
        // avoid triggering focusout on click
        // otherwise we can double-trigger the menu toggle
        const handleMousedown1 = () => {
            isKeyboardEvent1 = false;
        };
        const focusOutHandler1 = (event1) => {
            if (!isKeyboardEvent1) {
                return;
            }
            // don't remove focus from newly opened modal
            const isFocusInModal1 = document.querySelector(".d-modal") ? .contains(event1.relatedTarget);
            if (!panelBody1.contains(event1.relatedTarget) && !isFocusInModal1) {
                this.closeCurrentMenu();
            }
        };
        panelBody1.addEventListener("keydown", handleKeydown1);
        panelBody1.addEventListener("mousedown", handleMousedown1);
        panelBody1.addEventListener("focusout", focusOutHandler1);
        return () => {
            panelBody1.removeEventListener("keydown", handleKeydown1);
            panelBody1.removeEventListener("mousedown", handleMousedown1);
            panelBody1.removeEventListener("focusout", focusOutHandler1);
        };
    });
    @action
    closeCurrentMenu() {
        if (this.search.visible) {
            this.toggleSearchMenu();
        } else if (this.header.userVisible) {
            this.toggleUserMenu();
            document.getElementById(USER_BUTTON_ID) ? .focus();
        } else if (this.header.hamburgerVisible) {
            this.toggleHamburger();
            document.getElementById(HAMBURGER_BUTTON_ID) ? .focus();
        }
    }
    @action
    headerKeyboardTrigger(msg1) {
        switch (msg1.type) {
            case "search":
                this.toggleSearchMenu();
                break;
            case "user":
                this.toggleUserMenu();
                break;
            case "hamburger":
                this.toggleNavigationMenu();
                break;
            case "page-search":
                if (!this.togglePageSearch()) {
                    msg1.event.preventDefault();
                    msg1.event.stopPropagation();
                }
                break;
        }
    }
    @action
    toggleSearchMenu() {
        if (this.site.mobileView) {
            const context1 = this.search.searchContext;
            let params1 = "";
            if (context1) {
                params1 = `?context=${context1.type}&context_id=${context1.id}&skip_context=${this.skipSearchContext}`;
            }
            if (this.router.currentRouteName === "full-page-search") {
                scrollTop();
                document.querySelector(".full-page-search").focus();
                return false;
            } else {
                return DiscourseURL.routeTo("/search" + params1);
            }
        }
        this.search.visible = !this.search.visible;
        if (!this.search.visible) {
            this.search.highlightTerm = "";
            this.search.inTopicContext = false;
            document.getElementById(SEARCH_BUTTON_ID) ? .focus();
        }
    }
    @action
    togglePageSearch() {
        this.search.inTopicContext = false;
        let showSearch1 = this.router.currentRouteName.startsWith("topic.");
        // If we're viewing a topic, only intercept search if there are cloaked posts
        if (showSearch1) {
            const container1 = getOwner(this);
            const topic1 = container1.lookup("controller:topic");
            const total1 = topic1.get("model.postStream.stream.length") || 0;
            const chunkSize1 = topic1.get("model.chunk_size") || 0;
            showSearch1 = total1 > chunkSize1 && document.querySelectorAll(".topic-post .cooked, .small-action:not(.time-gap)") ? .length < total1;
        }
        if (this.search.visible) {
            this.toggleSearchMenu();
            return showSearch1;
        }
        if (showSearch1) {
            this.search.inTopicContext = true;
            this.toggleSearchMenu();
            return false;
        }
        return true;
    }
    @action
    toggleUserMenu() {
        this.header.userVisible = !this.header.userVisible;
        this.toggleBodyScrolling(this.header.userVisible);
        this.args.animateMenu();
    }
    @action
    toggleNavigationMenu(override1 = null) {
        if (override1 === "sidebar") {
            return this.toggleSidebar();
        }
        if (override1 === "hamburger") {
            return this.toggleHamburger();
        }
        if (this.args.sidebarEnabled && !this.site.narrowDesktopView) {
            this.toggleSidebar();
        } else {
            this.toggleHamburger();
        }
    }
    @action
    toggleHamburger() {
        this.header.hamburgerVisible = !this.header.hamburgerVisible;
        this.toggleBodyScrolling(this.header.hamburgerVisible);
        this.args.animateMenu();
    }
    @action
    toggleSidebar() {
        this.args.toggleSidebar();
        this.args.animateMenu();
    }
    @action
    toggleBodyScrolling(bool1) {
        if (this.site.mobileView) {
            scrollLock(bool1);
        }
    }
    static {
        template(`
    <header class="d-header" {{this.appEventsListeners}}>
      <div class="wrap">
        <Contents
          @sidebarEnabled={{@sidebarEnabled}}
          @toggleNavigationMenu={{this.toggleNavigationMenu}}
          @showSidebar={{@showSidebar}}
          @topicInfo={{@topicInfo}}
          @topicInfoVisible={{@topicInfoVisible}}
        >
          <span class="header-buttons">
            {{#each (headerButtons.resolve) as |entry|}}
              {{#if (and (eq entry.key "auth") (not this.currentUser))}}
                <AuthButtons
                  @topicInfoVisible={{@topicInfoVisible}}
                  @showCreateAccount={{@showCreateAccount}}
                  @showLogin={{@showLogin}}
                  @canSignUp={{@canSignUp}}
                />
              {{else if entry.value}}
                <entry.value />
              {{/if}}
            {{/each}}
          </span>

          {{#if
            (not (and this.siteSettings.login_required (not this.currentUser)))
          }}
            <Icons
              @sidebarEnabled={{@sidebarEnabled}}
              @toggleSearchMenu={{this.toggleSearchMenu}}
              @toggleNavigationMenu={{this.toggleNavigationMenu}}
              @toggleUserMenu={{this.toggleUserMenu}}
              @searchButtonId={{SEARCH_BUTTON_ID}}
            />
          {{/if}}

          {{#if this.search.visible}}
            <SearchMenuWrapper
              @closeSearchMenu={{this.toggleSearchMenu}}
              {{this.handleFocus}}
            />
          {{else if this.header.hamburgerVisible}}
            <HamburgerDropdownWrapper
              @toggleNavigationMenu={{this.toggleNavigationMenu}}
              @sidebarEnabled={{@sidebarEnabled}}
              {{this.handleFocus}}
            />
          {{else if this.header.userVisible}}
            <UserMenuWrapper
              @toggleUserMenu={{this.toggleUserMenu}}
              {{this.handleFocus}}
            />
          {{/if}}

          {{#if
            (and
              (or this.site.mobileView this.site.narrowDesktopView)
              (or this.header.hamburgerVisible this.header.userVisible)
            )
          }}
            <div class="header-cloak"></div>
          {{/if}}
        </Contents>
      </div>
      <PluginOutlet
        @name="after-header"
        @outletArgs={{hash minimized=(@topicInfoVisible)}}
      />
    </header>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}