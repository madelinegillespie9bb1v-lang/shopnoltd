import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    cancel,
    next
} from "@ember/runloop";
import {
    service
} from "@ember/service";
import {
    htmlSafe
} from "@ember/template";
import {
    eq
} from "truth-helpers";
import concatClass from "discourse/helpers/concat-class";
import {
    bind
} from "discourse-common/utils/decorators";
export default class PageLoadingSlider extends Component {
    @service
    loadingSlider;
    @service
    capabilities;
    @tracked
    state = "ready";
    constructor() {
        super(...arguments);
        this.loadingSlider.on("stateChanged", this.stateChanged);
    }
    willDestroy() {
        super.willDestroy(...arguments);
        this.loadingSlider.off("stateChange", this, "stateChange");
    }
    @bind
    stateChanged(loading1) {
        if (this._deferredStateChange) {
            cancel(this._deferredStateChange);
            this._deferredStateChange = null;
        }
        if (loading1 && this.ready) {
            this.state = "loading";
        } else if (loading1) {
            this.state = "ready";
            this._deferredStateChange = next(() => (this.state = "loading"));
        } else {
            this.state = "done";
        }
    }
    get containerStyle() {
        const duration1 = this.loadingSlider.averageLoadingDuration.toFixed(2);
        return htmlSafe(`--loading-duration: ${duration1}s`);
    }
    @action
    onContainerTransitionEnd(event1) {
        if (event1.target === event1.currentTarget && event1.propertyName === "opacity") {
            this.state = "ready";
        }
    }
    @action
    onBarTransitionEnd(event1) {
        if (event1.target === event1.currentTarget && event1.propertyName === "transform" && this.state === "loading") {
            this.state = "still-loading";
        }
    }
    static {
        template(`
    {{#if (eq this.loadingSlider.mode "slider")}}
      <div
        {{on "transitionend" this.onContainerTransitionEnd}}
        style={{this.containerStyle}}
        class={{concatClass
          "loading-indicator-container"
          this.state
          (if this.capabilities.isAppWebview "discourse-hub-webview")
        }}
      >
        <div
          {{on "transitionend" this.onBarTransitionEnd}}
          class="loading-indicator"
        >
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