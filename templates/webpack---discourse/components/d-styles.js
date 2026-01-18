import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";
import {
    getURLWithCDN
} from "discourse-common/lib/get-url";
export default class DStyles extends Component {
    @service
    session;
    @service
    site;
    get categoryColors() {
        return [
            ":root {",
            ...this.site.categories.map((category1) => `--category-${category1.id}-color: #${category1.color};`),
            "}"
        ].join("\n");
    }
    get categoryBackgrounds() {
        const css1 = [];
        const darkCss1 = [];
        this.site.categories.forEach((category1) => {
            const lightUrl1 = category1.uploaded_background ? .url;
            const darkUrl1 = this.session.defaultColorSchemeIsDark || this.session.darkModeAvailable ? category1.uploaded_background_dark ? .url : null;
            const defaultUrl1 = darkUrl1 && this.session.defaultColorSchemeIsDark ? darkUrl1 : lightUrl1;
            if (defaultUrl1) {
                const url1 = getURLWithCDN(defaultUrl1);
                css1.push(`body.category-${category1.fullSlug} { background-image: url(${url1}); }`);
            }
            if (darkUrl1 && defaultUrl1 !== darkUrl1) {
                const url1 = getURLWithCDN(darkUrl1);
                darkCss1.push(`body.category-${category1.fullSlug} { background-image: url(${url1}); }`);
            }
        });
        if (darkCss1.length > 0) {
            css1.push("@media (prefers-color-scheme: dark) {", ...darkCss1, "}");
        }
        return css1.join("\n");
    }
    get categoryBadges() {
        const css1 = [];
        this.site.categories.forEach((category1) => {
            css1.push(`.badge-category[data-category-id="${category1.id}"] { ` + `--category-badge-color: var(--category-${category1.id}-color); ` + `--category-badge-text-color: #${category1.text_color}; ` + `}`);
            if (category1.isParent) {
                css1.push(`.badge-category[data-parent-category-id="${category1.id}"] { ` + `--parent-category-badge-color: var(--category-${category1.id}-color); ` + `}`);
            }
        });
        return css1.join("\n");
    }
    static {
        template(`
    {{! template-lint-disable no-forbidden-elements }}
    <style id="d-styles">
      {{#if this.site.categories}}
        {{this.categoryColors}}
        {{this.categoryBackgrounds}}
        {{this.categoryBadges}}
      {{/if}}
    </style>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}