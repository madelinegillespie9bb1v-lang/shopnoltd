import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    concat,
    fn,
    get
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
    eq,
    gt,
    has
} from "truth-helpers";
import DButton from "discourse/components/d-button";
import EditNavigationMenuModal from "discourse/components/sidebar/edit-navigation-menu/modal";
import borderColor from "discourse/helpers/border-color";
import categoryBadge from "discourse/helpers/category-badge";
import dirSpan from "discourse/helpers/dir-span";
import loadingSpinner from "discourse/helpers/loading-spinner";
import {
    popupAjaxError
} from "discourse/lib/ajax-error";
import Category from "discourse/models/category";
import {
    INPUT_DELAY
} from "discourse-common/config/environment";
import i18n from "discourse-common/helpers/i18n";
import discourseDebounce from "discourse-common/lib/debounce";
let ActionSerializer = class ActionSerializer {
    constructor(perform1) {
        this.perform = perform1;
        this.processing = false;
        this.queued = false;
    }
    async trigger() {
        this.queued = true;
        if (!this.processing) {
            this.processing = true;
            while (this.queued) {
                this.queued = false;
                await this.perform();
            }
            this.processing = false;
        }
    }
};
// Given an async method that takes no parameters, produce a method that
// triggers the original method only if it is not currently executing it,
// otherwise it will queue up to one execution of the method
function serialized(target1, key1, descriptor1) {
    const originalMethod1 = descriptor1.value;
    descriptor1.value = function() {
        this[`_${key1}_serializer`] || = new ActionSerializer(() => originalMethod1.apply(this));
        this[`_${key1}_serializer`].trigger();
    };
    return descriptor1;
}
// Given a list, break into chunks starting a new chunk whenever the predicate
// is true for an element.
function splitWhere(elements1, f1) {
    return elements1.reduce((acc1, el1, i1) => {
        if (i1 === 0 || f1(el1)) {
            acc1.push([]);
        }
        acc1[acc1.length - 1].push(el1);
        return acc1;
    }, []);
}
// categories must be topologically sorted so that the parents appear before
// the children
function findPartialCategories(categories1) {
    const categoriesById1 = new Map(categories1.map((category1) => [
        category1.id,
        category1
    ]));
    const subcategoryCounts1 = new Map();
    const subcategoryCountsRecursive1 = new Map();
    const partialCategoryInfos1 = new Map();
    for (const category1 of categories1.slice().reverse()) {
        const count1 = subcategoryCounts1.get(category1.parent_category_id) || 0;
        subcategoryCounts1.set(category1.parent_category_id, count1 + 1);
        const recursiveCount1 = subcategoryCountsRecursive1.get(category1.parent_category_id) || 0;
        subcategoryCountsRecursive1.set(category1.parent_category_id, recursiveCount1 + (subcategoryCountsRecursive1.get(category1.id) || 0) + 1);
    }
    for (const [id1, count1] of subcategoryCounts1) {
        if (count1 === 5 && categoriesById1.has(id1)) {
            partialCategoryInfos1.set(id1, {
                level: categoriesById1.get(id1).level + 1,
                offset: subcategoryCountsRecursive1.get(id1)
            });
        }
    }
    return partialCategoryInfos1;
}
export default class SidebarEditNavigationMenuCategoriesModal extends Component {
    @service
    currentUser;
    @service
    site;
    @service
    siteSettings;
    @tracked
    initialLoad = true;
    @tracked
    fetchedCategoriesGroupings = [];
    @tracked
    selectedCategoryIds = new TrackedSet([
        ...this.currentUser.sidebar_category_ids
    ]);
    selectedFilter = "";
    selectedMode = "everything";
    loadedFilter;
    loadedMode;
    loadedPage;
    saving = false;
    loadAnotherPage = false;
    unseenCategoryIdsChanged = false;
    observer = new IntersectionObserver(([entry1]) => {
        if (entry1.isIntersecting) {
            this.observer.disconnect();
            this.loadMore();
        }
    }, {
        threshold: 1.0
    });
    constructor() {
        super(...arguments);
        this.subcategoryLoadList = [];
        this.performSearch();
    }
    recomputeGroupings() {
        const categoriesWithShowMores1 = this.fetchedCategories.flatMap((el1, i1) => {
            const result1 = [{
                type: "category",
                category: el1
            }];
            const elID1 = el1.id;
            const elParentID1 = el1.parent_category_id;
            const nextParentID1 = this.fetchedCategories[i1 + 1] ? .parent_category_id;
            const nextIsSibling1 = nextParentID1 === elParentID1;
            const nextIsChild1 = nextParentID1 === elID1;
            if (!nextIsSibling1 && !nextIsChild1 && this.partialCategoryInfos.has(elParentID1)) {
                const {
                    level: level1,
                    offset: offset1
                } = this.partialCategoryInfos.get(elParentID1);
                result1.push({
                    type: "show-more",
                    id: elParentID1,
                    level: level1,
                    offset: offset1
                });
            }
            return result1;
        }, []);
        this.fetchedCategoriesGroupings = splitWhere(categoriesWithShowMores1, (c1) => c1.type === "category" && c1.category.parent_category_id === undefined);
    }
    setFetchedCategories(categories1) {
        this.fetchedCategories = categories1;
        this.partialCategoryInfos = findPartialCategories(categories1);
        this.recomputeGroupings();
    }
    concatFetchedCategories(categories1) {
        this.fetchedCategories = this.fetchedCategories.concat(categories1);
        // In order to find partially loaded categories correctly, we need to
        // ensure that we account for categories that may have been partially
        // loaded, because the total number of categories in the response clipped
        // them off.
        if (categories1[0].parent_category_id !== undefined) {
            const index1 = this.fetchedCategories.findLastIndex((element1) => element1.parent_category_id === undefined);
            categories1 = [
                ...this.fetchedCategories.slice(index1),
                ...categories1
            ];
        }
        this.partialCategoryInfos = new Map([
            ...this.partialCategoryInfos,
            ...findPartialCategories(categories1)
        ]);
        this.recomputeGroupings();
    }
    substituteInFetchedCategories(id1, subcategories1, offset1) {
        this.partialCategoryInfos.delete(id1);
        this.recomputeGroupings();
        if (subcategories1.length !== 0) {
            const index1 = this.fetchedCategories.findLastIndex((c1) => c1.parent_category_id === id1) + 1;
            this.fetchedCategories = [
                ...this.fetchedCategories.slice(0, index1),
                ...subcategories1,
                ...this.fetchedCategories.slice(index1)
            ];
            this.partialCategoryInfos = new Map([
                ...this.partialCategoryInfos,
                ...findPartialCategories(subcategories1)
            ]);
            this.partialCategoryInfos.set(id1, {
                offset: offset1 + subcategories1.length
            });
            this.recomputeGroupings();
        }
    }
    @action
    didInsert(element1) {
        this.observer.disconnect();
        this.observer.observe(element1);
    }
    searchOpts() {
        const requestedMode1 = this.selectedMode;
        const requestedCategoryIds1 = [
            ...this.selectedCategoryIds
        ];
        const opts1 = {
            includeUncategorized: false
        };
        if (requestedMode1 === "only-selected") {
            opts1.only = requestedCategoryIds1;
        } else if (requestedMode1 === "only-unselected") {
            opts1.except = requestedCategoryIds1;
        }
        return opts1;
    }
    @serialized
    async performSearch() {
        const requestedFilter1 = this.selectedFilter;
        const requestedMode1 = this.selectedMode;
        const selectedCategoriesNeedsUpdate1 = this.unseenCategoryIdsChanged && requestedMode1 !== "everything";
        // Is the current set of displayed categories up-to-date?
        if (requestedFilter1 === this.loadedFilter && requestedMode1 === this.loadedMode && !selectedCategoriesNeedsUpdate1) {
            // The shown categories are up-to-date, so we can do elaboration
            if (this.loadAnotherPage && !this.lastPage) {
                const requestedPage1 = this.loadedPage + 1;
                const opts1 = {
                    page: requestedPage1,
                    ...this.searchOpts()
                };
                const categories1 = await Category.asyncHierarchicalSearch(requestedFilter1, opts1);
                if (categories1.length === 0) {
                    this.lastPage = true;
                } else {
                    this.concatFetchedCategories(categories1);
                }
                this.loadAnotherPage = false;
                this.loadedPage = requestedPage1;
            } else if (this.subcategoryLoadList.length !== 0) {
                const {
                    id: id1,
                    offset: offset1
                } = this.subcategoryLoadList.shift();
                const opts1 = {
                    parentCategoryId: id1,
                    offset: offset1,
                    ...this.searchOpts()
                };
                let subcategories1 = await Category.asyncHierarchicalSearch(requestedFilter1, opts1);
                this.substituteInFetchedCategories(id1, subcategories1, offset1);
            }
        } else {
            // The shown categories are stale, refresh everything
            const requestedCategoryIds1 = [
                ...this.selectedCategoryIds
            ];
            this.unseenCategoryIdsChanged = false;
            this.setFetchedCategories(await Category.asyncHierarchicalSearch(requestedFilter1, this.searchOpts()));
            this.loadedFilter = requestedFilter1;
            this.loadedMode = requestedMode1;
            this.loadedCategoryIds = requestedCategoryIds1;
            this.loadedPage = 1;
            this.lastPage = false;
            this.initialLoad = false;
            this.loadAnotherPage = false;
        }
    }
    async loadMore() {
        this.loadAnotherPage = true;
        this.debouncedSendRequest();
    }
    @action
    async loadSubcategories(id1, offset1) {
        this.subcategoryLoadList.push({
            id: id1,
            offset: offset1
        });
        this.debouncedSendRequest();
    }
    debouncedSendRequest() {
        discourseDebounce(this, this.performSearch, INPUT_DELAY);
    }
    @action
    resetFilter() {
        this.selectedMode = "everything";
        this.debouncedSendRequest();
    }
    @action
    filterSelected() {
        this.selectedMode = "only-selected";
        this.debouncedSendRequest();
    }
    @action
    filterUnselected() {
        this.selectedMode = "only-unselected";
        this.debouncedSendRequest();
    }
    @action
    onFilterInput(filter1) {
        this.selectedFilter = filter1.toLowerCase().trim();
        this.debouncedSendRequest();
    }
    @action
    deselectAll() {
        this.selectedCategoryIds.clear();
        this.unseenCategoryIdsChanged = true;
        this.debouncedSendRequest();
    }
    @action
    toggleCategory(categoryId1) {
        if (this.selectedCategoryIds.has(categoryId1)) {
            this.selectedCategoryIds.delete(categoryId1);
        } else {
            this.selectedCategoryIds.add(categoryId1);
        }
    }
    @action
    resetToDefaults() {
        this.selectedCategoryIds = new TrackedSet(this.siteSettings.default_navigation_menu_categories.split("|").map((id1) => parseInt(id1, 10)));
        this.unseenCategoryIdsChanged = true;
        this.debouncedSendRequest();
    }
    @action
    async save() {
        this.saving = true;
        const initialSidebarCategoryIds1 = this.currentUser.sidebar_category_ids;
        this.currentUser.set("sidebar_category_ids", [
            ...this.selectedCategoryIds
        ]);
        try {
            await this.currentUser.save([
                "sidebar_category_ids"
            ]);
            this.args.closeModal();
        } catch (error1) {
            this.currentUser.set("sidebar_category_ids", initialSidebarCategoryIds1);
            popupAjaxError(error1);
        } finally {
            this.saving = false;
        }
    }
    static {
        template(`
    <EditNavigationMenuModal
      @title="sidebar.categories_form_modal.title"
      @disableSaveButton={{this.saving}}
      @save={{this.save}}
      @showResetDefaultsButton={{gt
        this.siteSettings.default_navigation_menu_categories.length
        0
      }}
      @resetToDefaults={{this.resetToDefaults}}
      @deselectAll={{this.deselectAll}}
      @deselectAllText={{i18n "sidebar.categories_form_modal.subtitle.text"}}
      @inputFilterPlaceholder={{i18n
        "sidebar.categories_form_modal.filter_placeholder"
      }}
      @onFilterInput={{this.onFilterInput}}
      @resetFilter={{this.resetFilter}}
      @filterSelected={{this.filterSelected}}
      @filterUnselected={{this.filterUnselected}}
      @closeModal={{@closeModal}}
      class="sidebar__edit-navigation-menu__categories-modal"
    >
      <form class="sidebar-categories-form">
        {{#if this.initialLoad}}
          <div class="sidebar-categories-form__loading">
            {{loadingSpinner size="small"}}
          </div>
        {{else}}
          {{#each this.fetchedCategoriesGroupings as |categories|}}
            <div
              style={{borderColor (get categories "0.category.color") "left"}}
              class="sidebar-categories-form__row"
            >
              {{#each categories as |c|}}
                {{#if (eq c.type "category")}}
                  <div
                    {{didInsert this.didInsert}}
                    data-category-id={{c.category.id}}
                    data-category-level={{c.category.level}}
                    class="sidebar-categories-form__category-row"
                  >
                    <label
                      for={{concat
                        "sidebar-categories-form__input--"
                        c.category.id
                      }}
                      class="sidebar-categories-form__category-label"
                    >
                      <div class="sidebar-categories-form__category-wrapper">
                        <div class="sidebar-categories-form__category-badge">
                          {{categoryBadge c.category}}
                        </div>

                        {{#unless c.category.parentCategory}}
                          <div
                            class="sidebar-categories-form__category-description"
                          >
                            {{dirSpan
                              c.category.description_excerpt
                              htmlSafe="true"
                            }}
                          </div>
                        {{/unless}}
                      </div>

                      <input
                        {{on "click" (fn this.toggleCategory c.category.id)}}
                        type="checkbox"
                        checked={{has this.selectedCategoryIds c.category.id}}
                        id={{concat
                          "sidebar-categories-form__input--"
                          c.category.id
                        }}
                        class="sidebar-categories-form__input"
                      />
                    </label>
                  </div>
                {{else}}
                  <div
                    {{didInsert this.didInsert}}
                    data-category-level={{c.level}}
                    class="sidebar-categories-form__category-row"
                  >
                    <label class="sidebar-categories-form__category-label">
                      <div class="sidebar-categories-form__category-wrapper">
                        <div class="sidebar-categories-form__category-badge">
                          <DButton
                            @label="sidebar.categories_form_modal.show_more"
                            @action={{fn this.loadSubcategories c.id c.offset}}
                            class="btn-flat"
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                {{/if}}
              {{/each}}
            </div>
          {{else}}
            <div class="sidebar-categories-form__no-categories">
              {{i18n "sidebar.categories_form_modal.no_categories"}}
            </div>
          {{/each}}
        {{/if}}
      </form>
    </EditNavigationMenuModal>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}