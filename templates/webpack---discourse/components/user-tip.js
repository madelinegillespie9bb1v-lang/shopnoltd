import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    getOwner
} from "@ember/owner";
import {
    schedule
} from "@ember/runloop";
import {
    service
} from "@ember/service";
import {
    modifier
} from "ember-modifier";
import UserTipContainer from "discourse/components/user-tip-container";
import escape from "discourse-common/lib/escape";
import {
    iconHTML
} from "discourse-common/lib/icon-library";
import I18n from "discourse-i18n";
import DTooltipInstance from "float-kit/lib/d-tooltip-instance";
export default class UserTip extends Component {
    @service
    currentUser;
    @service
    userTips;
    @service
    tooltip;
    registerTip = modifier(() => {
        const tip1 = {
            id: this.args.id,
            priority: this.args.priority ? ? 0
        };
        this.userTips.addAvailableTip(tip1);
        return () => {
            this.userTips.removeAvailableTip(tip1);
        };
    });
    tip = modifier((element1) => {
        let instance1;
        schedule("afterRender", () => {
            const trigger1 = this.args.triggerSelector && document.querySelector(this.args.triggerSelector);
            let buttonText1 = escape(I18n.t(this.args.buttonLabel || "user_tips.button"));
            if (this.args.buttonIcon) {
                buttonText1 = `${iconHTML(this.args.buttonIcon)} ${buttonText1}`;
            }
            instance1 = new DTooltipInstance(getOwner(this), {
                identifier: "user-tip",
                interactive: true,
                closeOnScroll: false,
                closeOnClickOutside: true,
                placement: this.args.placement,
                component: UserTipContainer,
                data: {
                    id: this.args.id,
                    titleText: escape(this.args.titleText),
                    contentHtml: this.args.contentHtml || null,
                    contentText: this.args.contentText ? escape(this.args.contentText) : null,
                    buttonText: buttonText1,
                    buttonSkipText: I18n.t("user_tips.skip"),
                    showSkipButton: this.args.showSkipButton
                }
            });
            instance1.trigger = trigger1 || element1;
            instance1.detachedTrigger = true;
            this.tooltip.show(instance1);
            if (this.shouldRenderTip) {
                // mark tooltip directly as seen so that
                // refreshing, clicking outside, etc. won't show it again
                this.userTips.markAsSeen(this.args.id);
            }
        });
        return () => {
            instance1 ? .destroy();
        };
    });
    get shouldRenderTip() {
        return this.userTips.shouldRender(this.args.id);
    }
    static {
        template(`
    <div {{this.registerTip}}>
      {{#if this.shouldRenderTip}}
        <span {{this.tip}}></span>
      {{/if}}
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}