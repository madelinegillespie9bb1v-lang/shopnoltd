import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    fn
} from "@ember/helper";
import {
    action
} from "@ember/object";
import {
    service
} from "@ember/service";
import DButton from "discourse/components/d-button";
import DropdownMenu from "discourse/components/dropdown-menu";
import BulkTopicActions, {
    addBulkDropdownAction
} from "discourse/components/modal/bulk-topic-actions";
import concatClass from "discourse/helpers/concat-class";
import icon from "discourse-common/helpers/d-icon";
import i18n from "discourse-common/helpers/i18n";
import DMenu from "float-kit/components/d-menu";
const _customButtons = [];
const _customOnSelection = {};
export function addBulkDropdownButton(opts1) {
    _customButtons.push({
        id: opts1.id,
        icon: opts1.icon,
        name: i18n(opts1.label),
        visible: opts1.visible,
        class: opts1.class
    });
    addBulkDropdownAction(opts1.id, opts1.action);
    const actionOpts1 = {
        label: opts1.label,
        setComponent: true
    };
    if (opts1.actionType === "performAndRefresh") {
        actionOpts1.setComponent = false;
    }
    _customOnSelection[opts1.id] = actionOpts1;
}
export default class BulkSelectTopicsDropdown extends Component {
    @service
    modal;
    @service
    currentUser;
    @service
    siteSettings;
    get buttons() {
        let options1 = [{
                id: "update-category",
                icon: "pencil",
                name: i18n("topic_bulk_actions.update_category.name"),
                visible: ({
                    topics: topics1
                }) => {
                    return !topics1.some((t1) => t1.isPrivateMessage);
                }
            },
            {
                id: "update-notifications",
                icon: "d-regular",
                name: i18n("topic_bulk_actions.update_notifications.name")
            },
            {
                id: "reset-bump-dates",
                icon: "anchor",
                name: i18n("topic_bulk_actions.reset_bump_dates.name")
            },
            {
                id: "defer",
                icon: "circle",
                name: i18n("topic_bulk_actions.defer.name"),
                visible: ({
                    currentUser: currentUser1
                }) => currentUser1.user_option.enable_defer
            },
            {
                id: "close-topics",
                icon: "lock",
                name: i18n("topic_bulk_actions.close_topics.name")
            },
            {
                id: "archive-topics",
                icon: "folder",
                name: i18n("topic_bulk_actions.archive_topics.name"),
                visible: ({
                    topics: topics1
                }) => !topics1.some((t1) => t1.isPrivateMessage)
            },
            {
                id: "archive-messages",
                icon: "box-archive",
                name: i18n("topic_bulk_actions.archive_messages.name"),
                visible: ({
                    topics: topics1
                }) => topics1.every((t1) => t1.isPrivateMessage)
            },
            {
                id: "move-messages-to-inbox",
                icon: "envelope",
                name: i18n("topic_bulk_actions.move_messages_to_inbox.name"),
                visible: ({
                    topics: topics1
                }) => topics1.every((t1) => t1.isPrivateMessage)
            },
            {
                id: "unlist-topics",
                icon: "far-eye-slash",
                name: i18n("topic_bulk_actions.unlist_topics.name"),
                visible: ({
                    topics: topics1
                }) => topics1.some((t1) => t1.visible) && !topics1.some((t1) => t1.isPrivateMessage)
            },
            {
                id: "relist-topics",
                icon: "far-eye",
                name: i18n("topic_bulk_actions.relist_topics.name"),
                visible: ({
                    topics: topics1
                }) => topics1.some((t1) => !t1.visible) && !topics1.some((t1) => t1.isPrivateMessage)
            },
            {
                id: "append-tags",
                icon: "tag",
                name: i18n("topic_bulk_actions.append_tags.name"),
                visible: ({
                    currentUser: currentUser1,
                    siteSettings: siteSettings1
                }) => siteSettings1.tagging_enabled && currentUser1.canManageTopic
            },
            {
                id: "replace-tags",
                icon: "tag",
                name: i18n("topic_bulk_actions.replace_tags.name"),
                visible: ({
                    currentUser: currentUser1,
                    siteSettings: siteSettings1
                }) => siteSettings1.tagging_enabled && currentUser1.canManageTopic
            },
            {
                id: "remove-tags",
                icon: "tag",
                name: i18n("topic_bulk_actions.remove_tags.name"),
                visible: ({
                    currentUser: currentUser1,
                    siteSettings: siteSettings1
                }) => siteSettings1.tagging_enabled && currentUser1.canManageTopic
            },
            {
                id: "delete-topics",
                icon: "trash-can",
                name: i18n("topic_bulk_actions.delete_topics.name"),
                visible: ({
                    currentUser: currentUser1
                }) => currentUser1.staff
            }
        ];
        return [
            ...options1,
            ..._customButtons
        ].filter(({
            visible: visible1
        }) => {
            if (visible1) {
                return visible1({
                    topics: this.args.bulkSelectHelper.selected,
                    currentUser: this.currentUser,
                    siteSettings: this.siteSettings
                });
            } else {
                return true;
            }
        });
    }
    showBulkTopicActionsModal(actionName1, title1, opts1 = {}) {
        let allowSilent1 = false;
        let initialAction1 = null;
        let initialActionLabel1 = null;
        let description1 = null;
        if (opts1.allowSilent === true) {
            allowSilent1 = true;
        }
        if (opts1.custom === true) {
            title1 = i18n(_customOnSelection[actionName1].label);
            initialActionLabel1 = actionName1;
            if (opts1.setComponent === true) {
                initialAction1 = "set-component";
            }
        } else {
            title1 = i18n(`topics.bulk.${title1}`);
        }
        if (opts1.description) {
            description1 = opts1.description;
        }
        this.modal.show(BulkTopicActions, {
            model: {
                action: actionName1,
                title: title1,
                description: description1,
                bulkSelectHelper: this.args.bulkSelectHelper,
                refreshClosure: () => this.args.afterBulkActionComplete(),
                allowSilent: allowSilent1,
                initialAction: initialAction1,
                initialActionLabel: initialActionLabel1
            }
        });
    }
    @action
    async onSelect(actionId1) {
        await this.dMenu.close();
        switch (actionId1) {
            case "update-category":
                this.showBulkTopicActionsModal(actionId1, "change_category", {
                    description: i18n(`topic_bulk_actions.update_category.description`)
                });
                break;
            case "update-notifications":
                this.showBulkTopicActionsModal(actionId1, "notification_level", {
                    description: i18n(`topic_bulk_actions.update_notifications.description`)
                });
                break;
            case "close-topics":
                this.showBulkTopicActionsModal("close", "close_topics", {
                    allowSilent: true
                });
                break;
            case "archive-topics":
                this.showBulkTopicActionsModal("archive", "archive_topics");
                break;
            case "archive-messages":
                this.showBulkTopicActionsModal("archive_messages", "archive_messages");
                break;
            case "move-messages-to-inbox":
                this.showBulkTopicActionsModal("move_messages_to_inbox", "move_messages_to_inbox");
                break;
            case "unlist-topics":
                this.showBulkTopicActionsModal("unlist", "unlist_topics");
                break;
            case "relist-topics":
                this.showBulkTopicActionsModal("relist", "relist_topics");
                break;
            case "append-tags":
                this.showBulkTopicActionsModal(actionId1, "choose_append_tags");
                break;
            case "replace-tags":
                this.showBulkTopicActionsModal(actionId1, "change_tags");
                break;
            case "remove-tags":
                this.showBulkTopicActionsModal(actionId1, "remove_tags");
                break;
            case "delete-topics":
                this.showBulkTopicActionsModal("delete", "delete");
                break;
            case "reset-bump-dates":
                this.showBulkTopicActionsModal(actionId1, "reset_bump_dates", {
                    description: i18n(`topic_bulk_actions.reset_bump_dates.description`)
                });
                break;
            case "defer":
                this.showBulkTopicActionsModal(actionId1, "defer", {
                    description: i18n(`topic_bulk_actions.defer.description`)
                });
                break;
            default:
                if (_customOnSelection[actionId1]) {
                    this.showBulkTopicActionsModal(actionId1, _customOnSelection[actionId1].label, {
                        custom: true,
                        setComponent: _customOnSelection[actionId1].setComponent
                    });
                }
        }
    }
    @action
    onRegisterApi(api1) {
        this.dMenu = api1;
    }
    static {
        template(`
    <DMenu
      @modalForMobile={{true}}
      @autofocus={{true}}
      @identifier="bulk-select-topics-dropdown"
      @onRegisterApi={{this.onRegisterApi}}
    >
      <:trigger>
        <span class="d-button-label">
          {{i18n "select_kit.components.bulk_select_topics_dropdown.title"}}
        </span>
        {{icon "angle-down"}}
      </:trigger>

      <:content>
        <DropdownMenu as |dropdown|>
          {{#each this.buttons as |button|}}
            <dropdown.item>
              <DButton
                @translatedLabel={{button.name}}
                @icon={{button.icon}}
                class={{concatClass "btn-transparent" button.id button.class}}
                @action={{fn this.onSelect button.id}}
              />
            </dropdown.item>
          {{/each}}
        </DropdownMenu>
      </:content>
    </DMenu>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}