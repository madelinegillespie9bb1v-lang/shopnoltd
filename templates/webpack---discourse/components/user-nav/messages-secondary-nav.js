import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
export default class MessagesSecondaryNav extends Component {
    get messagesNav() {
        return document.getElementById("user-navigation-secondary__horizontal-nav");
    }
    static {
        template(`
    {{#in-element this.messagesNav}}
      {{yield}}
    {{/in-element}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}