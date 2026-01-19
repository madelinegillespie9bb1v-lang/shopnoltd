import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    Input
} from "@ember/component";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    getOwner
} from "@ember/owner";
import {
    service
} from "@ember/service";
import {
    htmlSafe
} from "@ember/template";
import {
    Promise
} from "rsvp";
import ConditionalLoadingSection from "discourse/components/conditional-loading-section";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import RadioButton from "discourse/components/radio-button";
import {
    categoryBadgeHTML
} from "discourse/helpers/category-link";
import {
    topicLevels
} from "discourse/lib/notification-levels";
import Category from "discourse/models/category";
import Topic from "discourse/models/topic";
import autoFocus from "discourse/modifiers/auto-focus";
import i18n from "discourse-common/helpers/i18n";
import CategoryChooser from "select-kit/components/category-chooser";
import TagChooser from "select-kit/components/tag-chooser";
const _customActions = {};
export function addBulkDropdownAction(name1, customAction1) {
    _customActions[name1] = customAction1;
}
export default class BulkTopicActions extends Component {
    @service
    router;
    @service
    toasts;
    @tracked
    activeComponent = null;
    @tracked
    tags = [];
    @tracked
    categoryId;
    @tracked
    loading;
    @tracked
    errors;
    @tracked
    isSilent = false;
    @tracked
    closeNote = null;
    notificationLevelId = null;
    constructor() {
        super(...arguments);
        if (this.model.initialAction === "set-component") {
            if (this.model.initialActionLabel in _customActions) {
                _customActions[this.model.initialActionLabel]({
                    setComponent: this.setComponent.bind(this)
                });
            }
        }
    }
    async perform(operation1) {
        if (this.model.bulkSelectHelper.selected.length > 20) {
            this.showProgress = true;
        }
        try {
            return await this._processChunks(operation1);
        } catch {
            this.errors = true;
            this.showToast();
        } finally {
            this.processedTopicCount = 0;
            this.showProgress = false;
        }
    }
    _generateTopicChunks(allTopics1) {
        let startIndex1 = 0;
        const chunkSize1 = 30;
        const chunks1 = [];
        while (startIndex1 < allTopics1.length) {
            chunks1.push(allTopics1.slice(startIndex1, startIndex1 + chunkSize1));
            startIndex1 += chunkSize1;
        }
        return chunks1;
    }
    _processChunks(operation1) {
        const allTopics1 = this.model.bulkSelectHelper.selected;
        const topicChunks1 = this._generateTopicChunks(allTopics1);
        const topicIds1 = [];
        const options1 = {};
        if (this.isSilent) {
            const newType1 = operation1.type === "close" ? "silent_close" : operation1.type;
            operation1.type = newType1;
        }
        if (this.isCloseAction && this.closeNote) {
            operation1["message"] = this.closeNote;
        }
        const tasks1 = topicChunks1.map((topics1) => async () => {
            const result1 = await Topic.bulkOperation(topics1, operation1, options1);
            this.processedTopicCount += topics1.length;
            return result1;
        });
        return new Promise((resolve1, reject1) => {
            const resolveNextTask1 = async () => {
                if (tasks1.length === 0) {
                    const topics1 = topicIds1.map((id1) => allTopics1.findBy("id", id1));
                    return resolve1(topics1);
                }
                const task1 = tasks1.shift();
                try {
                    const result1 = await task1();
                    if (result1 ? .topic_ids) {
                        topicIds1.push(...result1.topic_ids);
                    }
                    resolveNextTask1();
                } catch {
                    reject1();
                }
            };
            resolveNextTask1();
        });
    }
    @action
    setComponent(component1) {
        this.activeComponent = component1;
    }
    @action
    registerCustomAction(customAction1) {
        this.customAction = customAction1;
    }
    @action
    performAction() {
        this.loading = true;
        switch (this.model.action) {
            case "close":
                this.forEachPerformed({
                    type: "close"
                }, (t1) => t1.set("closed", true));
                break;
            case "archive":
                this.forEachPerformed({
                    type: "archive"
                }, (t1) => t1.set("archived", true));
                break;
            case "archive_messages":
            case "move_messages_to_inbox":
                let userPrivateMessages1 = getOwner(this).lookup("controller:user-private-messages");
                let params1 = {
                    type: this.model.action
                };
                if (userPrivateMessages1.isGroup) {
                    params1.group = userPrivateMessages1.groupFilter;
                }
                this.performAndRefresh(params1);
                break;
            case "unlist":
                this.forEachPerformed({
                    type: "unlist"
                }, (t1) => t1.set("unlisted", true));
                break;
            case "relist":
                this.forEachPerformed({
                    type: "relist"
                }, (t1) => t1.set("unlisted", false));
                break;
            case "append-tags":
                this.performAndRefresh({
                    type: "append_tags",
                    tags: this.tags
                });
                break;
            case "replace-tags":
                this.performAndRefresh({
                    type: "change_tags",
                    tags: this.tags
                });
                break;
            case "remove-tags":
                this.performAndRefresh({
                    type: "remove_tags"
                });
                break;
            case "delete":
                this.performAndRefresh({
                    type: "delete"
                });
                break;
            case "reset-bump-dates":
                this.performAndRefresh({
                    type: "reset_bump_dates"
                });
                break;
            case "defer":
                this.performAndRefresh({
                    type: "destroy_post_timing"
                });
                break;
            case "update-notifications":
                this.performAndRefresh({
                    type: "change_notification_level",
                    notification_level_id: this.notificationLevelId
                });
                break;
            case "update-category":
                this.forEachPerformed({
                    type: "change_category",
                    category_id: this.categoryId
                }, (t1) => t1.set("category_id", this.categoryId));
                break;
            default:
                // Plugins can register their own custom actions via onRegisterAction
                // when the activeComponent is rendered.
                if (this.customAction) {
                    this.customAction(this.performAndRefresh.bind(this));
                } else {
                    _customActions[this.model.initialActionLabel](this);
                }
        }
    }
    showToast() {
        this.loading = false;
        if (this.errors) {
            this.toasts.error({
                duration: 3000,
                data: {
                    message: i18n("generic_error")
                }
            });
        } else {
            this.toasts.success({
                duration: 3000,
                data: {
                    message: i18n("topics.bulk.completed")
                }
            });
        }
    }
    @action
    async forEachPerformed(operation1, cb1) {
        const topics1 = await this.perform(operation1);
        if (topics1) {
            topics1.forEach(cb1);
            this.model.refreshClosure ? .();
            this.args.closeModal();
            this.model.bulkSelectHelper.toggleBulkSelect();
            this.showToast();
        }
    }
    @action
    async performAndRefresh(operation1) {
        await this.perform(operation1);
        this.model.refreshClosure ? .().then(() => {
            this.args.closeModal();
            this.model.bulkSelectHelper.toggleBulkSelect();
            this.showToast();
        });
    }
    get isTagAction() {
        return (this.model.action === "append-tags" || this.model.action === "replace-tags");
    }
    get isNotificationAction() {
        return this.model.action === "update-notifications";
    }
    get isCategoryAction() {
        return this.model.action === "update-category";
    }
    get isCloseAction() {
        return this.model.action === "close";
    }
    @action
    updateCloseNote(event1) {
        event1.preventDefault();
        this.closeNote = event1.target.value;
    }
    get model() {
        return this.args.model;
    }
    get notificationLevels() {
        return topicLevels.map((level1) => ({
            id: level1.id.toString(),
            name: i18n(`topic.notifications.${level1.key}.title`),
            description: i18n(`topic.notifications.${level1.key}.description`)
        }));
    }
    get soleCategoryId() {
        if (this.model.bulkSelectHelper.selectedCategoryIds.length === 1) {
            return this.model.bulkSelectHelper.selectedCategoryIds[0];
        }
        return null;
    }
    get soleCategory() {
        if (!this.soleCategoryId) {
            return null;
        }
        return Category.findById(this.soleCategoryId);
    }
    get soleCategoryBadgeHTML() {
        return categoryBadgeHTML(this.soleCategory, {
            allowUncategorized: true
        });
    }
    get showSoleCategoryTip() {
        return this.soleCategory && this.isTagAction;
    }
    @action
    onCategoryChange(categoryId1) {
        this.categoryId = categoryId1;
    }
    static {
        template(`
    <DModal
      @title={{@model.title}}
      @subtitle={{@model.description}}
      @closeModal={{@closeModal}}
      class="topic-bulk-actions-modal -large"
    >
      <:body>
        <ConditionalLoadingSection
          @isLoading={{this.loading}}
          @title={{i18n "topics.bulk.performing"}}
        >
          <div class="topic-bulk-actions-modal__selection-info">

            {{#if this.showSoleCategoryTip}}
              {{htmlSafe
                (i18n
                  "topics.bulk.selected_sole_category"
                  count=@model.bulkSelectHelper.selected.length
                )
              }}
              {{htmlSafe this.soleCategoryBadgeHTML}}
            {{else}}
              {{htmlSafe
                (i18n
                  "topics.bulk.selected"
                  count=@model.bulkSelectHelper.selected.length
                )
              }}

            {{/if}}
          </div>

          {{#if this.isCategoryAction}}
            <p>
              <CategoryChooser
                @value={{this.categoryId}}
                @onChange={{this.onCategoryChange}}
              />
            </p>
          {{/if}}

          {{#if this.isNotificationAction}}
            <div class="bulk-notification-list">
              {{#each this.notificationLevels as |level|}}
                <div class="controls">
                  <label class="radio notification-level-radio checkbox-label">
                    <RadioButton
                      @value={{level.id}}
                      @name="notification_level"
                      @selection={{this.notificationLevelId}}
                    />
                    <strong>{{level.name}}</strong>
                    <div class="description">{{htmlSafe
                        level.description
                      }}</div>
                  </label>
                </div>
              {{/each}}
            </div>
          {{/if}}

          {{#if this.isTagAction}}
            <p><TagChooser
                @tags={{this.tags}}
                @categoryId={{this.soleCategoryId}}
              /></p>
          {{/if}}

          {{#if this.activeComponent}}
            {{component
              this.activeComponent
              onRegisterAction=this.registerCustomAction
            }}
          {{/if}}

          {{#if this.isCloseAction}}
            <div class="bulk-close-note-section">
              <label>
                {{i18n "topic_bulk_actions.close_topics.note"}}&nbsp;<span
                  class="label-optional"
                >{{i18n "topic_bulk_actions.close_topics.optional"}}</span>
              </label>

              <textarea
                id="bulk-close-note"
                {{on "input" this.updateCloseNote}}
                {{autoFocus}}
              >{{this.closeNote}}</textarea>
            </div>
          {{/if}}
        </ConditionalLoadingSection>
      </:body>

      <:footer>
        {{#if @model.allowSilent}}
          <div class="topic-bulk-actions-options">
            <label
              for="topic-bulk-action-options__silent"
              class="checkbox-label"
            >
              <Input
                id="topic-bulk-action-options__silent"
                @type="checkbox"
                @checked={{this.isSilent}}
              />{{i18n "topics.bulk.silent"}}</label>
          </div>
        {{/if}}

        <DButton
          @action={{@closeModal}}
          @label="cancel"
          class="btn-transparent d-modal-cancel"
          id="bulk-topics-cancel"
        />
        <DButton
          @action={{this.performAction}}
          @disabled={{this.loading}}
          @icon="check"
          @label="topics.bulk.confirm"
          id="bulk-topics-confirm"
          class="btn-primary"
        />
      </:footer>

    </DModal>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}