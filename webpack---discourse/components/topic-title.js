import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    hash
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import willDestroy from "@ember/render-modifiers/modifiers/will-destroy";
import {
    service
} from "@ember/service";
import PluginOutlet from "discourse/components/plugin-outlet";
import {
    isiPad
} from "discourse/lib/utilities";
import observeIntersection from "discourse/modifiers/observe-intersection";
export let topicTitleDecorators = [];
export function addTopicTitleDecorator(decorator1) {
    topicTitleDecorators.push(decorator1);
}
export function resetTopicTitleDecorators() {
    topicTitleDecorators.length = 0;
}
export default class TopicTitle extends Component {
    @service
    header;
    @action
    applyDecorators(element1) {
        const fancyTitle1 = element1.querySelector(".fancy-title");
        if (fancyTitle1) {
            topicTitleDecorators.forEach((cb1) => cb1(this.args.model, fancyTitle1, "topic-title"));
        }
    }
    @action
    keyDown(e1) {
        if (e1.key === "Escape") {
            e1.preventDefault();
            this.args.cancelled();
        } else if (e1.key === "Enter" && (e1.ctrlKey || e1.metaKey || (isiPad() && e1.altKey))) {
            // Ctrl+Enter or Cmd+Enter
            // iPad physical keyboard does not offer Command or Ctrl detection
            // so use Alt+Enter
            e1.preventDefault();
            this.args.save(undefined, e1);
        }
    }
    @action
    handleIntersectionChange(e1) {
        // Title is in the viewport or  below it – unusual, but can be caused by
        // small viewport and/or large headers. Treat same as if title is on screen.
        this.header.mainTopicTitleVisible = e1.isIntersecting || e1.boundingClientRect.top > 0;
    }
    @action
    handleTitleDestroy() {
        this.header.mainTopicTitleVisible = false;
    }
    static {
        template(`
    {{! template-lint-disable no-invalid-interactive }}
    <div
      {{didInsert this.applyDecorators}}
      {{on "keydown" this.keyDown}}
      {{observeIntersection this.handleIntersectionChange}}
      {{willDestroy this.handleTitleDestroy}}
      id="topic-title"
      class="container"
    >
      <div class="title-wrapper">
        {{yield}}
      </div>

      <PluginOutlet
        @name="topic-title"
        @connectorTagName="div"
        @outletArgs={{hash model=@model}}
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