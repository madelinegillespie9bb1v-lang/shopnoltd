import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    cached
} from "@glimmer/tracking";
import {
    array,
    fn,
    hash
} from "@ember/helper";
import {
    getOwner
} from "@ember/owner";
import {
    service
} from "@ember/service";
import routeAction from "discourse/helpers/route-action";
import GroupMessageSectionLink from "discourse/lib/sidebar/user/messages-section/group-message-section-link";
import PersonalMessageSectionLink from "discourse/lib/sidebar/user/messages-section/personal-message-section-link";
import i18n from "discourse-common/helpers/i18n";
import {
    bind
} from "discourse-common/utils/decorators";
import Section from "../section";
import SectionLink from "../section-link";
export const INBOX = "inbox";
export const UNREAD = "unread";
const SENT = "sent";
export const NEW = "new";
const ARCHIVE = "archive";
export const PERSONAL_MESSAGES_INBOX_FILTERS = [
    INBOX,
    NEW,
    UNREAD,
    SENT,
    ARCHIVE
];
export const GROUP_MESSAGES_INBOX_FILTERS = [
    INBOX,
    NEW,
    UNREAD,
    ARCHIVE
];
export default class SidebarUserMessagesSection extends Component {
    @service
    appEvents;
    @service
    pmTopicTrackingState;
    @service
    currentUser;
    @service
    router;
    _pmTopicTrackingStateKey = "messages-section";
    constructor() {
        super(...arguments);
        this.appEvents.on("page:changed", this, this._refreshSectionLinksDisplayState);
        this.pmTopicTrackingState.onStateChange(this._pmTopicTrackingStateKey, this._refreshSectionLinkCounts);
    }
    willDestroy() {
        super.willDestroy(...arguments);
        this.appEvents.off("page:changed", this, this._refreshSectionLinksDisplayState);
        this.pmTopicTrackingState.offStateChange(this._pmTopicTrackingStateKey, this._refreshSectionLinkCounts);
    }
    @bind
    _refreshSectionLinkCounts() {
        for (const sectionLink1 of this.allSectionLinks) {
            sectionLink1.refreshCount();
        }
    }
    _refreshSectionLinksDisplayState() {
        const currentRouteName1 = this.router.currentRoute.name;
        const currentRouteParentName1 = this.router.currentRoute.parent.name;
        const currentRouteParentParams1 = this.router.currentRoute.parent.params;
        if (!currentRouteParentName1.includes("userPrivateMessages") && currentRouteParentName1 !== "topic") {
            for (const sectionLink1 of this.allSectionLinks) {
                sectionLink1.collapse();
            }
        } else {
            const attrs1 = {
                currentRouteName: currentRouteName1,
                currentRouteParentParams: currentRouteParentParams1
            };
            if (currentRouteParentName1 === "topic") {
                const topicController1 = getOwner(this).lookup("controller:topic");
                if (topicController1.model.isPrivateMessage) {
                    attrs1.privateMessageTopic = topicController1.model;
                }
            }
            for (const sectionLink1 of this.allSectionLinks) {
                sectionLink1.pageChanged(attrs1);
            }
        }
    }
    @cached
    get personalMessagesSectionLinks() {
        const links1 = [];
        PERSONAL_MESSAGES_INBOX_FILTERS.forEach((type1) => {
            links1.push(new PersonalMessageSectionLink({
                currentUser: this.currentUser,
                type: type1,
                pmTopicTrackingState: this.pmTopicTrackingState
            }));
        });
        return links1;
    }
    @cached
    get groupMessagesSectionLinks() {
        const links1 = [];
        this.currentUser.groupsWithMessages.sort((a1, b1) => a1.name.localeCompare(b1.name)).forEach((group1) => {
            GROUP_MESSAGES_INBOX_FILTERS.forEach((groupMessageLink1) => {
                links1.push(new GroupMessageSectionLink({
                    group: group1,
                    type: groupMessageLink1,
                    currentUser: this.currentUser,
                    pmTopicTrackingState: this.pmTopicTrackingState
                }));
            });
        });
        return links1;
    }
    get allSectionLinks() {
        return [
            ...this.groupMessagesSectionLinks,
            ...this.personalMessagesSectionLinks
        ];
    }
    static {
        template(`
    <Section
      @sectionName="messages"
      @headerActionIcon="plus"
      @headerActions={{array
        (hash
          action=(fn (routeAction "composePrivateMessage") null null)
          title=(i18n "sidebar.sections.messages.header_action_title")
        )
      }}
      @headerActionsIcon="plus"
      @headerLinkText={{i18n "sidebar.sections.messages.header_link_text"}}
      @collapsable={{@collapsable}}
    >
      {{#each
        this.personalMessagesSectionLinks
        as |personalMessageSectionLink|
      }}
        {{#if personalMessageSectionLink.shouldDisplay}}
          <SectionLink
            @linkName={{personalMessageSectionLink.name}}
            @linkClass={{personalMessageSectionLink.class}}
            @route={{personalMessageSectionLink.route}}
            @model={{personalMessageSectionLink.model}}
            @prefixType={{personalMessageSectionLink.prefixType}}
            @prefixValue={{personalMessageSectionLink.prefixValue}}
            @currentWhen={{personalMessageSectionLink.currentWhen}}
            @content={{personalMessageSectionLink.text}}
          />
        {{/if}}
      {{/each}}

      {{#each this.groupMessagesSectionLinks as |groupMessageSectionLink|}}
        {{#if groupMessageSectionLink.shouldDisplay}}
          <SectionLink
            @linkName={{groupMessageSectionLink.name}}
            @linkClass={{groupMessageSectionLink.class}}
            @route={{groupMessageSectionLink.route}}
            @prefixType={{groupMessageSectionLink.prefixType}}
            @prefixValue={{groupMessageSectionLink.prefixValue}}
            @models={{groupMessageSectionLink.models}}
            @currentWhen={{groupMessageSectionLink.currentWhen}}
            @content={{groupMessageSectionLink.text}}
          />
        {{/if}}
      {{/each}}
    </Section>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}