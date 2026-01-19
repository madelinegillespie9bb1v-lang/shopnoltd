import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import replaceEmoji from "discourse/helpers/replace-emoji";
import and from "truth-helpers/helpers/and";
const TRUNCATE_LENGTH_LIMIT = 85;
export default class TopicMapLink extends Component {
    get linkClasses() {
        return this.args.attachment ? "topic-link track-link attachment" : "topic-link track-link";
    }
    get truncatedContent() {
        const content1 = this.args.title || this.args.url;
        return content1.length > TRUNCATE_LENGTH_LIMIT ? `${content1.slice(0, TRUNCATE_LENGTH_LIMIT).trim()}...` : content1;
    }
    static {
        template(`
    <a
      class={{this.linkClasses}}
      href={{@url}}
      title={{@url}}
      data-user-id={{@userId}}
      data-ignore-post-id="true"
      target="_blank"
      rel="nofollow ugc noopener noreferrer"
    >
      {{#if @title}}
        {{replaceEmoji this.truncatedContent}}
      {{else}}
        {{this.truncatedContent}}
      {{/if}}
    </a>
    {{#if (and @title @rootDomain)}}
      <span class="domain">
        {{@rootDomain}}
      </span>
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}