import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    hash
} from "@ember/helper";
import {
    htmlSafe
} from "@ember/template";
import {
    isEmpty
} from "@ember/utils";
import {
    eq,
    not
} from "truth-helpers";
import DButton from "discourse/components/d-button";
import iconOrImage from "discourse/helpers/icon-or-image";
import number from "discourse/helpers/number";
import {
    emojiUnescape,
    sanitize
} from "discourse/lib/text";
import dIcon from "discourse-common/helpers/d-icon";
import i18n from "discourse-common/helpers/i18n";
import PluginOutlet from "./plugin-outlet";
export default class BadgeCard extends Component {
    @tracked
    size = this.args.size || "medium";
    get url() {
        const {
            badge: badge1,
            filterUser: filterUser1,
            username: username1
        } = this.args;
        return filterUser1 ? `${badge1.url}?username=${username1}` : badge1.url;
    }
    get displayCount() {
        const {
            count: count1,
            badge: badge1
        } = this.args;
        if (count1 == null) {
            return badge1.grant_count;
        }
        if (count1 > 1) {
            return count1;
        }
    }
    get summary() {
        const {
            size: size1,
            badge: badge1
        } = this.args;
        if (size1 === "large" && !isEmpty(badge1.long_description)) {
            return emojiUnescape(sanitize(badge1.long_description));
        }
        return sanitize(badge1.description);
    }
    get showFavorite() {
        const {
            badge: badge1
        } = this.args;
        return ![
            1,
            2,
            3,
            4
        ].includes(badge1.id);
    }
    static {
        template(`
    <div
      class="badge-card --badge-{{this.size}}"
      data-badge-slug={{@badge.slug}}
    >
      <div class="badge-contents">
        <PluginOutlet
          @name="badge-contents-top"
          @outletArgs={{hash badge=@badge url=this.url}}
        />
        <span
          class="badge-icon {{@badge.badgeTypeClassName}}"
          aria-hidden="true"
        >
          {{iconOrImage @badge}}
        </span>
        <div class="badge-info">
          <div class="badge-info-item">
            <h3>
              {{#if (eq this.size "large")}}
                {{@badge.name}}
              {{else}}
                <a
                  href={{this.url}}
                  class="badge-link"
                  aria-describedby="badge-summary-{{@badge.slug}} badge-granted-{{@badge.slug}} badge-awarded-{{@badge.slug}}"
                >
                  {{@badge.name}}
                </a>
              {{/if}}
            </h3>
            <div id="badge-summary-{{@badge.slug}}" class="badge-summary">
              {{htmlSafe this.summary}}
            </div>
            {{#if this.displayCount}}
              <div id="badge-granted-{{@badge.slug}}" class="badge-granted">
                {{htmlSafe
                  (i18n
                    "badges.awarded"
                    count=this.displayCount
                    number=(number this.displayCount)
                  )
                }}
              </div>
            {{/if}}
          </div>
        </div>
      </div>

      {{#if @badge.has_badge}}
        <div
          id="badge-awarded-{{@badge.slug}}"
          class="check-display status-checked"
          aria-label={{i18n "notifications.titles.granted_badge"}}
        >
          {{dIcon "check"}}
        </div>
      {{/if}}

      {{#if @canFavorite}}
        {{#if @isFavorite}}
          <DButton
            @icon="star"
            @action={{@onFavoriteClick}}
            class="favorite-btn"
          />
        {{else}}
          <DButton
            @icon="far-star"
            @action={{@onFavoriteClick}}
            @title={{if
              @canFavoriteMoreBadges
              "badges.favorite_max_not_reached"
              "badges.favorite_max_reached"
            }}
            @disabled={{not @canFavoriteMoreBadges}}
            class="favorite-btn"
          />
        {{/if}}
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