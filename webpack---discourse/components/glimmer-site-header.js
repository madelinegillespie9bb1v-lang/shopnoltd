import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    DEBUG
} from "@glimmer/env";
import {
    tracked
} from "@glimmer/tracking";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import {
    cancel,
    schedule
} from "@ember/runloop";
import {
    service
} from "@ember/service";
import {
    waitForPromise
} from "@ember/test-waiters";
import ItsATrap from "@discourse/itsatrap";
import concatClass from "discourse/helpers/concat-class";
import scrollLock from "discourse/lib/scroll-lock";
import {
    getMaxAnimationTimeMs,
    shouldCloseMenu
} from "discourse/lib/swipe-events";
import {
    isDocumentRTL
} from "discourse/lib/text-direction";
import swipe from "discourse/modifiers/swipe";
import {
    isTesting
} from "discourse-common/config/environment";
import discourseLater from "discourse-common/lib/later";
import {
    bind,
    debounce
} from "discourse-common/utils/decorators";
import Header from "./header";
let _menuPanelClassesToForceDropdown = [];
const PANEL_WIDTH = 340;
export default class GlimmerSiteHeader extends Component {
    @service
    appEvents;
    @service
    currentUser;
    @service
    site;
    @service
    header;
    docking;
    pxClosed;
    headerElement;
    @tracked
    _dockedHeader = false;
    _animate = false;
    _headerWrap;
    _swipeMenuOrigin;
    _applicationElement;
    _resizeObserver;
    _docAt;
    constructor() {
        super(...arguments);
        this.docking = new Docking(this.dockCheck);
        if (this.currentUser ? .staff) {
            document.body.classList.add("staff");
        }
        schedule("afterRender", () => this.animateMenu());
    }
    get dropDownHeaderEnabled() {
        return !this.sidebarEnabled || this.site.narrowDesktopView;
    }
    get slideInMode() {
        return this.site.mobileView || this.site.narrowDesktopView;
    }
    get leftMenuClass() {
        if (isDocumentRTL()) {
            return "user-menu";
        } else {
            return "hamburger-panel";
        }
    }
    @bind
    updateHeaderOffset() {
        // Safari likes overscolling the page (on both iOS and macOS).
        // This shows up as a negative value in window.scrollY.
        // We can use this to offset the headerWrap's top offset to avoid
        // jitteriness and bad positioning.
        const windowOverscroll1 = Math.min(0, window.scrollY);
        // The headerWrap's top offset can also be a negative value on Safari,
        // because of the changing height of the viewport (due to the URL bar).
        // For our use case, it's best to ensure this is clamped to 0.
        const headerWrapTop1 = Math.max(0, Math.floor(this._headerWrap.getBoundingClientRect().top));
        let offsetTop1 = headerWrapTop1 + windowOverscroll1;
        if (DEBUG && isTesting()) {
            offsetTop1 -= document.getElementById("ember-testing-container").getBoundingClientRect().top;
            offsetTop1 -= 1; // For 1px border on testing container
        }
        const documentStyle1 = document.documentElement.style;
        const currentValue1 = parseInt(documentStyle1.getPropertyValue("--header-offset"), 10) || 0;
        const newValue1 = this._headerWrap.offsetHeight + offsetTop1;
        if (currentValue1 !== newValue1) {
            documentStyle1.setProperty("--header-offset", `${newValue1}px`);
        }
    }
    @bind
    _onScroll() {
        schedule("afterRender", this.updateHeaderOffset);
    }
    @action
    setupHeader() {
        this.appEvents.on("user-menu:rendered", this, this.animateMenu);
        if (this.dropDownHeaderEnabled) {
            this.appEvents.on("sidebar-hamburger-dropdown:rendered", this, this.animateMenu);
        }
        this._headerWrap = document.querySelector(".d-header-wrap");
        if (this._headerWrap) {
            schedule("afterRender", () => {
                this.headerElement = this._headerWrap.querySelector("header.d-header");
                this.updateHeaderOffset();
                document.documentElement.style.setProperty("--header-top", `${this.headerElement.offsetTop}px`);
            });
            window.addEventListener("scroll", this._onScroll, {
                passive: true
            });
            this._itsatrap = new ItsATrap(this.headerElement);
            const dirs1 = [
                "up",
                "down"
            ];
            this._itsatrap.bind(dirs1, (e1) => this._handleArrowKeysNav(e1));
            this._resizeObserver = new ResizeObserver((entries1) => {
                for (let entry1 of entries1) {
                    if (entry1.contentRect) {
                        const headerTop1 = this.headerElement ? .offsetTop;
                        document.documentElement.style.setProperty("--header-top", `${headerTop1}px`);
                        this.updateHeaderOffset();
                    }
                }
            });
            this._resizeObserver.observe(this._headerWrap);
        }
    }
    _handleArrowKeysNav(event1) {
        const activeTab1 = document.querySelector(".menu-tabs-container .btn.active");
        if (activeTab1) {
            let activeTabNumber1 = Number(document.activeElement.dataset.tabNumber || activeTab1.dataset.tabNumber);
            const maxTabNumber1 = document.querySelectorAll(".menu-tabs-container .btn").length - 1;
            const isNext1 = event1.key === "ArrowDown";
            let nextTab1 = isNext1 ? activeTabNumber1 + 1 : activeTabNumber1 - 1;
            if (isNext1 && nextTab1 > maxTabNumber1) {
                nextTab1 = 0;
            }
            if (!isNext1 && nextTab1 < 0) {
                nextTab1 = maxTabNumber1;
            }
            event1.preventDefault();
            document.querySelector(`.menu-tabs-container .btn[data-tab-number='${nextTab1}']`).focus();
        }
    }
    @action
    animateMenu() {
        const menuPanels1 = document.querySelectorAll(".menu-panel");
        if (menuPanels1.length === 0) {
            this._animate = this.slideInMode;
            return;
        }
        let viewMode1 = this.slideInMode ? "slide-in" : "drop-down";
        menuPanels1.forEach((panel1) => {
            if (menuPanelContainsClass(panel1)) {
                viewMode1 = "drop-down";
                this._animate = false;
            }
            const cloakElement1 = document.querySelector(".header-cloak");
            panel1.classList.remove("drop-down");
            panel1.classList.remove("slide-in");
            panel1.classList.add(viewMode1);
            if (this._animate) {
                let animationFinished1 = null;
                let finalPosition1 = PANEL_WIDTH;
                this._swipeMenuOrigin = "right";
                if (this.slideInMode && panel1.parentElement.classList.contains(this.leftMenuClass)) {
                    this._swipeMenuOrigin = "left";
                    finalPosition1 = -PANEL_WIDTH;
                }
                animationFinished1 = panel1.animate([{
                    transform: `translate3d(${finalPosition1}px, 0, 0)`
                }], {
                    fill: "forwards"
                }).finished;
                waitForPromise(animationFinished1);
                cloakElement1.animate([{
                    opacity: 0
                }], {
                    fill: "forwards"
                });
                cloakElement1.style.display = "block";
                animationFinished1.then(() => {
                    if (isTesting()) {
                        this._animateOpening(panel1);
                    } else {
                        discourseLater(() => this._animateOpening(panel1));
                    }
                });
            }
            this._animate = false;
        });
    }
    @bind
    dockCheck() {
        if (this._docAt === undefined || this._docAt === null) {
            if (!this.headerElement) {
                return;
            }
            this._docAt = this.headerElement.offsetTop;
        }
        const main1 = (this._applicationElement ? ? = document.querySelector(".ember-application"));
        const offsetTop1 = main1 ? .offsetTop ? ? 0;
        const offset1 = window.pageYOffset - offsetTop1;
        if (offset1 >= this._docAt) {
            if (!this._dockedHeader) {
                document.body.classList.add("docked");
                this._dockedHeader = true;
            }
        } else {
            if (this._dockedHeader) {
                document.body.classList.remove("docked");
                this._dockedHeader = false;
            }
        }
    }
    @bind
    _animateOpening(panel1, event1 = null) {
        const cloakElement1 = document.querySelector(".header-cloak");
        let durationMs1 = getMaxAnimationTimeMs();
        if (event1 && this.pxClosed > 0) {
            durationMs1 = getMaxAnimationTimeMs(this.pxClosed / Math.abs(event1.velocityX));
        }
        const timing1 = {
            duration: durationMs1 > 0 ? durationMs1 : 0,
            fill: "forwards",
            easing: "ease-out"
        };
        panel1.animate([{
            transform: `translate3d(0, 0, 0)`
        }], timing1);
        cloakElement1 ? .animate ? .([{
            opacity: 1
        }], timing1);
        this.pxClosed = null;
    }
    @bind
    _animateClosing(event1, panel1, menuOrigin1) {
        this._animate = true;
        const cloakElement1 = document.querySelector(".header-cloak");
        let durationMs1 = getMaxAnimationTimeMs();
        if (event1 && this.pxClosed > 0) {
            const distancePx1 = PANEL_WIDTH - this.pxClosed;
            durationMs1 = getMaxAnimationTimeMs(distancePx1 / Math.abs(event1.velocityX));
        }
        const timing1 = {
            duration: durationMs1 > 0 ? durationMs1 : 0,
            fill: "forwards"
        };
        let endPosition1 = -PANEL_WIDTH; //origin left
        if (menuOrigin1 === "right") {
            endPosition1 = PANEL_WIDTH;
        }
        panel1.animate([{
            transform: `translate3d(${endPosition1}px, 0, 0)`
        }], timing1);
        if (cloakElement1) {
            cloakElement1.animate([{
                opacity: 0
            }], timing1);
            cloakElement1.style.display = "none";
            // to ensure that the cloak is cleared after animation we need to toggle any active menus
            if (this.header.hamburgerVisible || this.header.userVisible) {
                this.header.hamburgerVisible = false;
                this.header.userVisible = false;
            }
        }
        this.pxClosed = null;
    }
    @bind
    onSwipeStart(swipeEvent1) {
        const center1 = swipeEvent1.center;
        const swipeOverValidElement1 = document.elementsFromPoint(center1.x, center1.y).some((ele1) => ele1.classList.contains("panel-body") || ele1.classList.contains("header-cloak"));
        if (swipeOverValidElement1 && (swipeEvent1.direction === "left" || swipeEvent1.direction === "right")) {
            scrollLock(true, document.querySelector(".panel-body"));
        } else {
            event.preventDefault();
        }
    }
    @bind
    onSwipeEnd(swipeEvent1) {
        const menuPanels1 = document.querySelectorAll(".menu-panel");
        scrollLock(false, document.querySelector(".panel-body"));
        menuPanels1.forEach((panel1) => {
            if (shouldCloseMenu(swipeEvent1, this._swipeMenuOrigin)) {
                this._animateClosing(swipeEvent1, panel1, this._swipeMenuOrigin);
                scrollLock(false);
            } else {
                this._animateOpening(panel1, swipeEvent1);
            }
        });
    }
    @bind
    onSwipeCancel() {
        const menuPanels1 = document.querySelectorAll(".menu-panel");
        scrollLock(false, document.querySelector(".panel-body"));
        menuPanels1.forEach((panel1) => {
            this._animateOpening(panel1);
        });
    }
    @bind
    onSwipe(swipeEvent1) {
        const movingElement1 = document.querySelector(".menu-panel");
        const cloakElement1 = document.querySelector(".header-cloak");
        //origin left
        this.pxClosed = Math.max(0, -swipeEvent1.deltaX);
        let translation1 = -this.pxClosed;
        if (this._swipeMenuOrigin === "right") {
            this.pxClosed = Math.max(0, swipeEvent1.deltaX);
            translation1 = this.pxClosed;
        }
        movingElement1.animate([{
            transform: `translate3d(${translation1}px, 0, 0)`
        }], {
            fill: "forwards"
        });
        cloakElement1 ? .animate ? .([{
            opacity: (PANEL_WIDTH - this.pxClosed) / PANEL_WIDTH
        }], {
            fill: "forwards"
        });
    }
    willDestroy() {
        super.willDestroy(...arguments);
        this.docking.destroy();
        this.appEvents.off("user-menu:rendered", this, this.animateMenu);
        if (this.dropDownHeaderEnabled) {
            this.appEvents.off("sidebar-hamburger-dropdown:rendered", this, this.animateMenu);
        }
        this._itsatrap ? .destroy();
        this._itsatrap = null;
        window.removeEventListener("scroll", this._onScroll);
        this._resizeObserver ? .disconnect();
    }
    static {
        template(`
    <div
      class={{concatClass
        (unless this.slideInMode "drop-down-mode")
        "d-header-wrap"
      }}
      {{didInsert this.setupHeader}}
      {{swipe
        onDidStartSwipe=this.onSwipeStart
        onDidEndSwipe=this.onSwipeEnd
        onDidCancelSwipe=this.onSwipeCancel
        onDidSwipe=this.onSwipe
        lockBody=false
      }}
    >
      <Header
        @canSignUp={{@canSignUp}}
        @showSidebar={{@showSidebar}}
        @sidebarEnabled={{@sidebarEnabled}}
        @toggleSidebar={{@toggleSidebar}}
        @showCreateAccount={{@showCreateAccount}}
        @showLogin={{@showLogin}}
        @animateMenu={{this.animateMenu}}
        @topicInfo={{this.header.topicInfo}}
        @topicInfoVisible={{this.header.topicInfoVisible}}
      />
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}
const INITIAL_DELAY_MS = 50;
const DEBOUNCE_MS = 5;
let Docking = class Docking {
    dockCheck = null;
    _initialTimer = null;
    _queuedTimer = null;
    constructor(dockCheck1) {
        this.dockCheck = dockCheck1;
        window.addEventListener("scroll", this.queueDockCheck, {
            passive: true
        });
        // dockCheck might happen too early on full page refresh
        this._initialTimer = discourseLater(this, this.dockCheck, INITIAL_DELAY_MS);
    }
    @debounce(DEBOUNCE_MS)
    queueDockCheck() {
        this._queuedTimer = this.dockCheck;
    }
    @action
    destroy() {
        if (this._queuedTimer) {
            cancel(this._queuedTimer);
        }
        cancel(this._initialTimer);
        window.removeEventListener("scroll", this.queueDockCheck);
    }
};

function menuPanelContainsClass(menuPanel1) {
    if (!_menuPanelClassesToForceDropdown) {
        return false;
    }
    for (let className1 of _menuPanelClassesToForceDropdown) {
        if (menuPanel1.classList.contains(className1)) {
            return true;
        }
    }
    return false;
}
export function forceDropdownForMenuPanels(classNames1) {
    if (typeof classNames1 === "string") {
        classNames1 = [
            classNames1
        ];
    }
    return _menuPanelClassesToForceDropdown.push(...classNames1);
}