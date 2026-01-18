import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    fn,
    hash
} from "@ember/helper";
import {
    service
} from "@ember/service";
import {
    eq,
    or
} from "truth-helpers";
import PluginOutlet from "discourse/components/plugin-outlet";
import TopicListHeader from "discourse/components/topic-list/topic-list-header";
import TopicListItem from "discourse/components/topic-list/topic-list-item";
import concatClass from "discourse/helpers/concat-class";
import i18n from "discourse-common/helpers/i18n";
export default class TopicList extends Component {
    @service
    currentUser;
    @tracked
    lastCheckedElementId;
    get selected() {
        return this.args.bulkSelectHelper ? .selected;
    }
    get bulkSelectEnabled() {
        return this.args.bulkSelectHelper ? .bulkSelectEnabled;
    }
    get canDoBulkActions() {
        return this.currentUser ? .canManageTopic && this.selected ? .length;
    }
    get toggleInTitle() {
        return !this.bulkSelectEnabled && this.args.canBulkSelect;
    }
    get sortable() {
        return !!this.args.changeSort;
    }
    get showLikes() {
        return this.args.order === "likes";
    }
    get showOpLikes() {
        return this.args.order === "op_likes";
    }
    get lastVisitedTopic() {
        const {
            topics: topics1,
            order: order1,
            ascending: ascending1,
            top: top1,
            hot: hot1
        } = this.args;
        if (!this.args.highlightLastVisited || top1 || hot1 || ascending1 || !topics1 || topics1.length === 1 || (order1 && order1 !== "activity") || !this.currentUser ? .get("previous_visit_at")) {
            return;
        }
        // work backwards
        // this is more efficient cause we keep appending to list
        const start1 = topics1.findIndex((topic1) => !topic1.get("pinned"));
        let lastVisitedTopic1, topic1;
        for (let i1 = topics1.length - 1; i1 >= start1; i1--) {
            if (topics1[i1].get("bumpedAt") > this.currentUser.get("previousVisitAt")) {
                lastVisitedTopic1 = topics1[i1];
                break;
            }
            topic1 = topics1[i1];
        }
        if (!lastVisitedTopic1 || !topic1) {
            return;
        }
        // end of list that was scanned
        if (topic1.get("bumpedAt") > this.currentUser.get("previousVisitAt")) {
            return;
        }
        return lastVisitedTopic1;
    }
    get showTopicPostBadges() {
        return this.args.showTopicPostBadges ? ? true;
    }
    static {
        template(`
    {{! template-lint-disable table-groups }}
    <table
      class={{concatClass
        "topic-list"
        (if this.bulkSelectEnabled "sticky-header")
      }}
    >
      <caption class="sr-only">{{i18n "sr_topic_list_caption"}}</caption>
      <thead class="topic-list-header">
        <TopicListHeader
          @canBulkSelect={{@canBulkSelect}}
          @toggleInTitle={{this.toggleInTitle}}
          @category={{@category}}
          @hideCategory={{@hideCategory}}
          @showPosters={{@showPosters}}
          @showLikes={{this.showLikes}}
          @showOpLikes={{this.showOpLikes}}
          @order={{@order}}
          @changeSort={{@changeSort}}
          @ascending={{@ascending}}
          @sortable={{this.sortable}}
          @listTitle={{or @listTitle "topic.title"}}
          @bulkSelectEnabled={{this.bulkSelectEnabled}}
          @bulkSelectHelper={{@bulkSelectHelper}}
          @canDoBulkActions={{this.canDoBulkActions}}
          @showTopicsAndRepliesToggle={{@showTopicsAndRepliesToggle}}
          @newListSubset={{@newListSubset}}
          @newRepliesCount={{@newRepliesCount}}
          @newTopicsCount={{@newTopicsCount}}
          @changeNewListSubset={{@changeNewListSubset}}
        />
      </thead>

      <PluginOutlet
        @name="before-topic-list-body"
        @outletArgs={{hash
          topics=@topics
          selected=this.selected
          bulkSelectEnabled=this.bulkSelectEnabled
          lastVisitedTopic=this.lastVisitedTopic
          discoveryList=@discoveryList
          hideCategory=@hideCategory
        }}
      />

      <tbody class="topic-list-body">
        {{#each @topics as |topic index|}}
          <TopicListItem
            @topic={{topic}}
            @bulkSelectEnabled={{this.bulkSelectEnabled}}
            @showTopicPostBadges={{this.showTopicPostBadges}}
            @hideCategory={{@hideCategory}}
            @showPosters={{@showPosters}}
            @showLikes={{this.showLikes}}
            @showOpLikes={{this.showOpLikes}}
            @expandGloballyPinned={{@expandGloballyPinned}}
            @expandAllPinned={{@expandAllPinned}}
            @lastVisitedTopic={{this.lastVisitedTopic}}
            @selected={{this.selected}}
            @lastCheckedElementId={{this.lastCheckedElementId}}
            @updateLastCheckedElementId={{fn (mut this.lastCheckedElementId)}}
            @tagsForUser={{@tagsForUser}}
            @focusLastVisitedTopic={{@focusLastVisitedTopic}}
            @index={{index}}
          />

          {{#if (eq topic this.lastVisitedTopic)}}
            <tr class="topic-list-item-separator">
              <td class="topic-list-data" colspan="6">
                <span>
                  {{i18n "topics.new_messages_marker"}}
                </span>
              </td>
            </tr>
          {{/if}}

          <PluginOutlet
            @name="after-topic-list-item"
            @outletArgs={{hash topic=topic index=index}}
            @connectorTagName="tr"
          />
        {{/each}}
      </tbody>

      <PluginOutlet
        @name="after-topic-list-body"
        @outletArgs={{hash
          topics=@topics
          selected=this.selected
          bulkSelectEnabled=this.bulkSelectEnabled
          lastVisitedTopic=this.lastVisitedTopic
          discoveryList=@discoveryList
          hideCategory=@hideCategory
        }}
      />
    </table>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}