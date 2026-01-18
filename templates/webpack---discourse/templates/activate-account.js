import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import RouteTemplate from "ember-route-template";
import DButton from "discourse/components/d-button";
import SignupProgressBar from "discourse/components/signup-progress-bar";
import WelcomeHeader from "discourse/components/welcome-header";
import bodyClass from "discourse/helpers/body-class";
import hideApplicationHeaderButtons from "discourse/helpers/hide-application-header-buttons";
import hideApplicationSidebar from "discourse/helpers/hide-application-sidebar";
import {
    ajax
} from "discourse/lib/ajax";
import {
    popupAjaxError
} from "discourse/lib/ajax-error";
import i18n from "discourse-common/helpers/i18n";
import getURL from "discourse-common/lib/get-url";
export default RouteTemplate(class extends Component {
    @service
    siteSettings;
    @tracked
    accountActivated = false;
    @tracked
    isLoading = false;
    @tracked
    needsApproval = false;
    @tracked
    errorMessage = null;
    get signupStep() {
        if (this.needsApproval) {
            return "approve";
        } else if (this.accountActivated) {
            return "login";
        } else {
            return "activate";
        }
    }
    @action
    async activate() {
        this.isLoading = true;
        let hp1;
        try {
            hp1 = await ajax("/session/hp");
        } catch (error1) {
            this.isLoading = false;
            popupAjaxError(error1);
            return;
        }
        try {
            const response1 = await ajax(`/u/activate-account/${this.args.model.token}.json`, {
                type: "PUT",
                data: {
                    password_confirmation: hp1.value,
                    challenge: hp1.challenge.split("").reverse().join("")
                }
            });
            if (!response1.success) {
                this.errorMessage = i18n("user.activate_account.already_done");
                return;
            }
            this.accountActivated = true;
            if (response1.redirect_to) {
                window.location.href = response1.redirect_to;
            } else if (response1.needs_approval) {
                this.needsApproval = true;
            } else {
                setTimeout(this.loadHomepage, 2000);
            }
        } catch (error1) {
            this.errorMessage = i18n("user.activate_account.already_done");
        }
    }
    @action
    loadHomepage() {
        window.location.href = getURL("/");
    }
    static {
        template(`
      {{bodyClass "activate-account-page"}}
      {{hideApplicationHeaderButtons "search" "login" "signup"}}
      {{hideApplicationSidebar}}
      {{#if this.errorMessage}}
        <div class="alert alert-error">
          {{this.errorMessage}}
        </div>
      {{else}}
        <div class="activate-account">
          <SignupProgressBar @step={{this.signupStep}} />
          <WelcomeHeader
            @header={{i18n
              "user.activate_account.welcome_to"
              site_name=this.siteSettings.title
            }}
          />
          <br />
          {{#if this.accountActivated}}
            <div class="account-activated">
              <div class="tada-image">
                <img src="/images/wizard/tada.svg" alt="tada emoji" />
              </div>
              {{#if this.needsApproval}}
                <p>{{i18n "user.activate_account.approval_required"}}</p>
              {{else}}
                <p>{{i18n "user.activate_account.please_continue"}}</p>
                <DButton
                  class="continue-button"
                  @translatedLabel={{i18n
                    "user.activate_account.continue_button"
                    site_name=this.siteSettings.title
                  }}
                  @action={{this.loadHomepage}}
                />
              {{/if}}
            </div>
          {{else}}
            <DButton
              class="activate-account-button btn-primary"
              @action={{this.activate}}
              @label="user.activate_account.action"
              @disabled={{this.isLoading}}
            />
          {{/if}}
        </div>
      {{/if}}
    `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
});