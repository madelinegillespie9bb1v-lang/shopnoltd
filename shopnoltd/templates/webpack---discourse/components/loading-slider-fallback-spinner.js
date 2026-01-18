import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";
import bodyClass from "discourse/helpers/body-class";
import hideApplicationFooter from "discourse/helpers/hide-application-footer";
import loadingSpinner from "discourse/helpers/loading-spinner";
export default class LoadingSliderFallbackSpinner extends Component {
    @service
    loadingSlider;
    get shouldDisplay() {
        const {
            mode: mode1,
            loading: loading1,
            stillLoading: stillLoading1
        } = this.loadingSlider;
        return ((mode1 === "spinner" && loading1) || (mode1 === "slider" && stillLoading1));
    }
    static {
        template(`
    {{#if this.shouldDisplay}}
      <div class="route-loading-spinner">{{loadingSpinner}}</div>
      {{bodyClass "has-route-loading-spinner"}}
      {{hideApplicationFooter}}
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}