import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    concat,
    fn
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import {
    service
} from "@ember/service";
import {
    TrackedSet
} from "@ember-compat/tracked-built-ins";
import {
    gt,
    has,
    or
} from "truth-helpers";
import ConditionalLoadingSpinner from "discourse/components/conditional-loading-spinner";
import loadingSpinner from "discourse/helpers/loading-spinner";
import {
    popupAjaxError
} from "discourse/lib/ajax-error";
import {
    INPUT_DELAY
} from "discourse-common/config/environment";
import i18n from "discourse-common/helpers/i18n";
import discourseDebounce from "discourse-common/lib/debounce";
import EditNavigationMenuModal from "./modal";
export default class SidebarEditNavigationMenuTagsModal extends Component {
    @service
    currentUser;
    @service
    siteSettings;
    @service
    store;
    @tracked
    disableFiltering = false;
    @tracked
    saving = false;
    @tracked
    selectedTags = new TrackedSet([
        ...this.currentUser.sidebarTagNames
    ]);
    @tracked
    tags = [];
    @tracked
    tagsLoading = false;
    observer;
    onlySelected = false;
    onlyUnselected = false;
    constructor() {
        super(...arguments);
        this.#loadTags();
    }
    async# loadTags() {
        this.tagsLoading = true;
        const findArgs1 = {};
        if (this.filter) {
            findArgs1.filter = this.filter;
        }
        if (this.onlySelected) {
            findArgs1.only_tags = [
                ...this.selectedTags
            ].join(",");
        } else if (this.onlyUnselected) {
            findArgs1.exclude_tags = [
                ...this.selectedTags
            ].join(",");
        }
        try {
            const tags1 = await this.store.findAll("listTag", findArgs1);
            this.tags = tags1;
        } catch (error1) {
            popupAjaxError(error1);
        } finally {
            this.tagsLoading = false;
            this.disableFiltering = false;
        }
    }
    @action
    didInsertTag(element1) {
        const tagName1 = element1.dataset.tagName;
        const lastTagName1 = this.tags.content[this.tags.content.length - 1].name;
        if (tagName1 === lastTagName1) {
            if (this.observer) {
                this.observer.disconnect();
            } else {
                const root1 = document.querySelector(".d-modal__body");
                const style1 = window.getComputedStyle(root1);
                const marginTop1 = parseFloat(style1.marginTop);
                const paddingTop1 = parseFloat(style1.paddingTop);
                this.observer = new IntersectionObserver((entries1) => {
                    entries1.forEach((entry1) => {
                        if (entry1.isIntersecting) {
                            this.tags.loadMore();
                        }
                    });
                }, {
                    root: document.querySelector(".d-modal__body"),
                    rootMargin: `0px 0px ${marginTop1 + paddingTop1}px 0px`,
                    threshold: 1.0
                });
            }
            this.observer.observe(element1);
        }
    }
    @action
    resetFilter() {
        this.onlySelected = false;
        this.onlyUnselected = false;
        this.#loadTags();
    }
    @action
    filterSelected() {
        this.onlySelected = true;
        this.onlyUnselected = false;
        this.#loadTags();
    }
    @action
    filterUnselected() {
        this.onlySelected = false;
        this.onlyUnselected = true;
        this.#loadTags();
    }
    @action
    onFilterInput(filter1) {
        this.disableFiltering = true;
        discourseDebounce(this, this.#performFiltering, filter1, INPUT_DELAY);
    }#
    performFiltering(filter1) {
        this.filter = filter1.toLowerCase();
        this.#loadTags();
    }
    @action
    deselectAll() {
        this.selectedTags.clear();
    }
    @action
    resetToDefaults() {
        this.selectedTags = new TrackedSet(this.siteSettings.default_navigation_menu_tags.split("|"));
    }
    @action
    toggleTag(tag1) {
        if (this.selectedTags.has(tag1)) {
            this.selectedTags.delete(tag1);
        } else {
            this.selectedTags.add(tag1);
        }
    }
    @action
    async save() {
        this.saving = true;
        const initialSidebarTags1 = this.currentUser.sidebar_tags;
        this.currentUser.set("sidebar_tag_names", [
            ...this.selectedTags
        ]);
        try {
            const result1 = await this.currentUser.save([
                "sidebar_tag_names"
            ]);
            this.currentUser.set("sidebar_tags", result1.user.sidebar_tags);
            this.args.closeModal();
        } catch (error1) {
            this.currentUser.set("sidebar_tags", initialSidebarTags1);
            popupAjaxError(error1);
        } finally {
            this.saving = false;
        }
    }
    static {
        template(`
    <EditNavigationMenuModal
      @title="sidebar.tags_form_modal.title"
      @saving={{this.saving}}
      @save={{this.save}}
      @showResetDefaultsButton={{gt
        this.siteSettings.default_navigation_menu_tags.length
        0
      }}
      @resetToDefaults={{this.resetToDefaults}}
      @deselectAll={{this.deselectAll}}
      @deselectAllText={{i18n "sidebar.tags_form_modal.subtitle.text"}}
      @inputFilterPlaceholder={{i18n
        "sidebar.tags_form_modal.filter_placeholder"
      }}
      @onFilterInput={{this.onFilterInput}}
      @resetFilter={{this.resetFilter}}
      @filterSelected={{this.filterSelected}}
      @filterUnselected={{this.filterUnselected}}
      @closeModal={{@closeModal}}
      @loading={{or this.tagsLoading this.disableFiltering}}
      class="sidebar__edit-navigation-menu__tags-modal"
    >
      {{#if this.tagsLoading}}
        {{loadingSpinner size="large"}}
      {{else}}
        <form class="sidebar-tags-form">
          {{#each this.tags as |tag|}}
            <div
              {{didInsert this.didInsertTag}}
              data-tag-name={{tag.name}}
              class="sidebar-tags-form__tag"
            >
              <input
                {{on "click" (fn this.toggleTag tag.name)}}
                type="checkbox"
                checked={{has this.selectedTags tag.name}}
                id={{concat "sidebar-tags-form__input--" tag.name}}
                class="sidebar-tags-form__input"
              />

              <label
                for={{concat "sidebar-tags-form__input--" tag.name}}
                class="sidebar-tags-form__tag-label"
              >
                <p>
                  <span class="sidebar-tags-form__tag-label-name">
                    {{tag.name}}
                  </span>

                  <span class="sidebar-tags-form__tag-label-count">
                    ({{tag.topic_count}})
                  </span>
                </p>
              </label>
            </div>
          {{else}}
            <div class="sidebar-tags-form__no-tags">
              {{i18n "sidebar.tags_form_modal.no_tags"}}
            </div>
          {{/each}}
        </form>
      {{/if}}

      <ConditionalLoadingSpinner @condition={{this.tags.loadingMore}} />
    </EditNavigationMenuModal>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}