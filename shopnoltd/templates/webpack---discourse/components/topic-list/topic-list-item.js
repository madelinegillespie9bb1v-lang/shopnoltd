import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    concat,
    hash
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import {
    next
} from "@ember/runloop";
import {
    service
} from "@ember/service";
import {
    modifier
} from "ember-modifier";
import {
    eq,
    gt
} from "truth-helpers";
import PluginOutlet from "discourse/components/plugin-outlet";
import ActivityColumn from "discourse/components/topic-list/activity-column";
import PostCountOrBadges from "discourse/components/topic-list/post-count-or-badges";
import PostersColumn from "discourse/components/topic-list/posters-column";
import PostsCountColumn from "discourse/components/topic-list/posts-count-column";
import TopicCell from "discourse/components/topic-list/topic-cell";
import TopicExcerpt from "discourse/components/topic-list/topic-excerpt";
import TopicLink from "discourse/components/topic-list/topic-link";
import TopicStatus from "discourse/components/topic-status";
import {
    topicTitleDecorators
} from "discourse/components/topic-title";
import avatar from "discourse/helpers/avatar";
import categoryLink from "discourse/helpers/category-link";
import concatClass from "discourse/helpers/concat-class";
import discourseTags from "discourse/helpers/discourse-tags";
import formatDate from "discourse/helpers/format-date";
import number from "discourse/helpers/number";
import topicFeaturedLink from "discourse/helpers/topic-featured-link";
import {
    wantsNewWindow
} from "discourse/lib/intercept-click";
import DiscourseURL from "discourse/lib/url";
import icon from "discourse-common/helpers/d-icon";
import i18n from "discourse-common/helpers/i18n";
export default class TopicListItem extends Component {
    @service
    historyStore;
    @service
    site;
    @service
    siteSettings;
    highlightIfNeeded = modifier((element1) => {
        if (this.args.topic.id === this.historyStore.get("lastTopicIdViewed")) {
            element1.dataset.isLastViewedTopic = true;
            this.highlightRow(element1);
            next(() => this.historyStore.delete("lastTopicIdViewed"));
            if (this.shouldFocusLastVisited) {
                element1.querySelector(".main-link .title") ? .focus();
            }
        } else if (this.args.topic.get("highlight")) {
            // highlight new topics that have been loaded from the server or the one we just created
            this.highlightRow(element1);
            next(() => this.args.topic.set("highlight", false));
        }
    });
    get isSelected() {
        return this.args.selected ? .includes(this.args.topic);
    }
    get tagClassNames() {
        return this.args.topic.tags ? .map((tagName1) => `tag-${tagName1}`);
    }
    get expandPinned() {
        if (!this.args.topic.pinned || (this.site.mobileView && !this.siteSettings.show_pinned_excerpt_mobile) || (this.site.desktopView && !this.siteSettings.show_pinned_excerpt_desktop)) {
            return false;
        }
        return ((this.args.expandGloballyPinned && this.args.topic.pinned_globally) || this.args.expandAllPinned);
    }
    get shouldFocusLastVisited() {
        return this.site.desktopView && this.args.focusLastVisitedTopic;
    }
    navigateToTopic(topic1, href1) {
        this.historyStore.set("lastTopicIdViewed", topic1.id);
        DiscourseURL.routeTo(href1 || topic1.url);
    }
    highlightRow(element1) {
        element1.addEventListener("animationend", () => element1.classList.remove("highlighted"), {
            once: true
        });
        element1.classList.add("highlighted");
    }
    @action
    applyTitleDecorators(element1) {
        const rawTopicLink1 = element1.querySelector(".raw-topic-link");
        if (rawTopicLink1) {
            topicTitleDecorators ? .forEach((cb1) => cb1(this.args.topic, rawTopicLink1, "topic-list-item-title"));
        }
    }
    @action
    onBulkSelectToggle(e1) {
        if (e1.target.checked) {
            this.args.selected.addObject(this.args.topic);
            if (this.args.lastCheckedElementId && e1.shiftKey) {
                const bulkSelects1 = Array.from(document.querySelectorAll("input.bulk-select"));
                const from1 = bulkSelects1.indexOf(e1.target);
                const to1 = bulkSelects1.findIndex((el1) => el1.id === this.args.lastCheckedElementId);
                const start1 = Math.min(from1, to1);
                const end1 = Math.max(from1, to1);
                bulkSelects1.slice(start1, end1).filter((el1) => !el1.checked).forEach((checkbox1) => checkbox1.click());
            }
            this.args.updateLastCheckedElementId(e1.target.id);
        } else {
            this.args.selected.removeObject(this.args.topic);
            this.args.updateLastCheckedElementId(null);
        }
    }
    @action
    click(e1) {
        if (e1.target.classList.contains("raw-topic-link") || e1.target.classList.contains("post-activity")) {
            if (wantsNewWindow(e1)) {
                return;
            }
            e1.preventDefault();
            this.navigateToTopic(this.args.topic, e1.target.href);
            return;
        }
        // make full row click target on mobile, due to size constraints
        if (this.site.mobileView && e1.target.matches(".topic-list-data, .main-link, .right, .topic-item-stats, .topic-item-stats__category-tags, .discourse-tags")) {
            if (wantsNewWindow(e1)) {
                return;
            }
            e1.preventDefault();
            this.navigateToTopic(this.args.topic, this.args.topic.lastUnreadUrl);
            return;
        }
        if (e1.target.classList.contains("d-icon-thumbtack") && e1.target.closest("a.topic-status")) {
            e1.preventDefault();
            this.args.topic.togglePinnedForUser();
            return;
        }
    }
    @action
    keyDown(e1) {
        if (e1.key === "Enter" && e1.target.classList.contains("post-activity")) {
            e1.preventDefault();
            this.navigateToTopic(this.args.topic, e1.target.href);
        }
    }
    static {
        template(`
    <tr
      {{! template-lint-disable no-invalid-interactive }}
      {{didInsert this.applyTitleDecorators}}
      {{this.highlightIfNeeded}}
      {{on "keydown" this.keyDown}}
      {{on "click" this.click}}
      data-topic-id={{@topic.id}}
      role={{this.role}}
      aria-level={{this.ariaLevel}}
      class={{concatClass
        "topic-list-item"
        (if @topic.category (concat "category-" @topic.category.fullSlug))
        (if (eq @topic @lastVisitedTopic) "last-visit")
        (if @topic.visited "visited")
        (if @topic.hasExcerpt "has-excerpt")
        (if @topic.unseen "unseen-topic")
        (if @topic.unread_posts "unread-posts")
        (if @topic.liked "liked")
        (if @topic.archived "archived")
        (if @topic.bookmarked "bookmarked")
        (if @topic.pinned "pinned")
        (if @topic.closed "closed")
        this.tagClassNames
      }}
    >
      <PluginOutlet
        @name="above-topic-list-item"
        @outletArgs={{hash topic=@topic}}
      />
      {{#if this.site.desktopView}}
        {{! TODO: column DAG "topic-list-before-columns" }}

        {{#if @bulkSelectEnabled}}
          <td class="bulk-select topic-list-data">
            <label for="bulk-select-{{@topic.id}}">
              <input
                {{on "click" this.onBulkSelectToggle}}
                checked={{this.isSelected}}
                type="checkbox"
                id="bulk-select-{{@topic.id}}"
                class="bulk-select"
              />
            </label>
          </td>
        {{/if}}

        <TopicCell
          @topic={{@topic}}
          @showTopicPostBadges={{@showTopicPostBadges}}
          @hideCategory={{@hideCategory}}
          @tagsForUser={{@tagsForUser}}
          @expandPinned={{this.expandPinned}}
        />

        <PluginOutlet
          @name="topic-list-after-main-link"
          @outletArgs={{hash topic=@topic}}
        />

        {{#if @showPosters}}
          <PostersColumn @posters={{@topic.featuredUsers}} />
        {{/if}}

        <PostsCountColumn @topic={{@topic}} />

        {{#if @showLikes}}
          <td class="num likes topic-list-data">
            {{#if (gt @topic.like_count 0)}}
              <a href={{@topic.summaryUrl}}>
                {{number @topic.like_count}}
                {{icon "heart"}}
              </a>
            {{/if}}
          </td>
        {{/if}}

        {{#if @showOpLikes}}
          <td class="num likes">
            {{#if (gt @topic.op_like_count 0)}}
              <a href={{@topic.summaryUrl}}>
                {{number @topic.op_like_count}}
                {{icon "heart"}}
              </a>
            {{/if}}
          </td>
        {{/if}}

        <td class={{concatClass "num views topic-list-data" @topic.viewsHeat}}>
          <PluginOutlet
            @name="topic-list-before-view-count"
            @outletArgs={{hash topic=@topic}}
          />
          {{number @topic.views numberKey="views_long"}}
        </td>

        <ActivityColumn @topic={{@topic}} class="num topic-list-data" />

        {{! TODO: column DAG "topic-list-after-columns" }}
      {{else}}
        <td class="topic-list-data">
          {{! TODO: column DAG "topic-list-before-columns" }}

          <div class="pull-left">
            {{#if @bulkSelectEnabled}}
              <label for="bulk-select-{{@topic.id}}">
                <input
                  {{on "click" this.onBulkSelectToggle}}
                  checked={{this.isSelected}}
                  type="checkbox"
                  id="bulk-select-{{@topic.id}}"
                  class="bulk-select"
                />
              </label>
            {{else}}
              <a
                href={{@topic.lastPostUrl}}
                aria-label={{i18n
                  "latest_poster_link"
                  username=@topic.lastPosterUser.username
                }}
                data-user-card={{@topic.lastPosterUser.username}}
              >{{avatar @topic.lastPosterUser imageSize="large"}}</a>
            {{/if}}
          </div>

          <div class="topic-item-metadata right">
            {{~! no whitespace ~}}
            <PluginOutlet
              @name="topic-list-before-link"
              @outletArgs={{hash topic=@topic}}
            />

            <div class="main-link">
              {{~! no whitespace ~}}
              <PluginOutlet
                @name="topic-list-before-status"
                @outletArgs={{hash topic=@topic}}
              />
              {{~! no whitespace ~}}
              <TopicStatus @topic={{@topic}} />
              {{~! no whitespace ~}}
              <TopicLink
                {{on "focus" this.onTitleFocus}}
                {{on "blur" this.onTitleBlur}}
                @topic={{@topic}}
                class="raw-link raw-topic-link"
              />
              {{~#if @topic.featured_link~}}
                &nbsp;
                {{~topicFeaturedLink @topic}}
              {{~/if~}}
              <PluginOutlet
                @name="topic-list-after-title"
                @outletArgs={{hash topic=@topic}}
              />
              {{~#if @topic.unseen~}}
                <span class="topic-post-badges">&nbsp;<span
                    class="badge-notification new-topic"
                  ></span></span>
              {{~/if~}}
              {{~#if this.expandPinned~}}
                <TopicExcerpt @topic={{@topic}} />
              {{~/if~}}
              <PluginOutlet
                @name="topic-list-main-link-bottom"
                @outletArgs={{hash topic=@topic}}
              />
            </div>
            {{~! no whitespace ~}}
            <PluginOutlet
              @name="topic-list-after-main-link"
              @outletArgs={{hash topic=@topic}}
            />

            <div class="pull-right">
              <PostCountOrBadges
                @topic={{@topic}}
                @postBadgesEnabled={{@showTopicPostBadges}}
              />
            </div>

            <div class="topic-item-stats clearfix">
              <span class="topic-item-stats__category-tags">
                {{#unless @hideCategory}}
                  <PluginOutlet
                    @name="topic-list-before-category"
                    @outletArgs={{hash topic=@topic}}
                  />
                  {{categoryLink @topic.category}}
                {{/unless}}

                {{discourseTags @topic mode="list"}}
              </span>

              <div class="num activity last">
                <span title={{@topic.bumpedAtTitle}} class="age activity">
                  <a href={{@topic.lastPostUrl}}>{{formatDate
                      @topic.bumpedAt
                      format="tiny"
                      noTitle="true"
                    }}</a>
                </span>
              </div>
            </div>
          </div>
        </td>
      {{/if}}
    </tr>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}