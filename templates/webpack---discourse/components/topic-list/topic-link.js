import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    htmlSafe
} from "@ember/template";
export default class TopicLink extends Component {
    get url() {
        return this.args.topic.linked_post_number ? this.args.topic.urlForPostNumber(this.args.topic.linked_post_number) : this.args.topic.lastUnreadUrl;
    }
    static {
        template(`
    {{~! no whitespace ~}}
    <a
      href={{this.url}}
      data-topic-id={{@topic.id}}
      class="title"
      ...attributes
    >{{htmlSafe @topic.fancyTitle}}</a>
    {{~! no whitespace ~}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}