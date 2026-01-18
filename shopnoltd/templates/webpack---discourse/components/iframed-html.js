import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import didUpdate from "@ember/render-modifiers/modifiers/did-update";
import {
    bind
} from "discourse-common/utils/decorators";
export default class IframedHtml extends Component {
    @bind
    writeHtml(element1) {
        const iframeDoc1 = element1.contentWindow.document;
        iframeDoc1.open("text/html", "replace");
        iframeDoc1.write(this.args.html);
        iframeDoc1.close();
    }
    static {
        template(`
    {{! template-lint-disable require-iframe-title }}
    <iframe
      {{didInsert this.writeHtml}}
      {{didUpdate this.witeHtml @html}}
      sandbox="allow-same-origin"
      class={{if @html "iframed-html"}}
      ...attributes
    ></iframe>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}