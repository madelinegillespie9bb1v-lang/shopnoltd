define("discourse/plugins/discourse-assign/discourse/templates/mobile/components/basic-assigned-topic-list", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <ConditionalLoadingSpinner @condition={{this.loading}}>
          {{#if this.hasIncoming}}
            <div class="show-mores">
              <a
                href
                class="alert alert-info clickable"
                {{on "click" this.showInserted}}
              >
                <CountI18n
                  @key="topic_count_"
                  @suffix="latest"
                  @count={{this.incomingCount}}
                />
              </a>
            </div>
          {{/if}}
  
          {{#if this.topics}}
            <table class="topic-list assigned-topic-list">
              <tbody class="topic-list-body assigned-topic-list-body">
                {{#each this.topics as |topic|}}
                  <AssignedTopicListItem
                    @topic={{topic}}
                    @expandGloballyPinned={{this.expandGloballyPinned}}
                    @expandAllPinned={{this.expandAllPinned}}
                    @lastVisitedTopic={{this.lastVisitedTopic}}
                    @selected={{this.selected}}
                    @tagsForUser={{this.tagsForUser}}
                    @unassign={{this.unassign}}
                    @reassign={{this.reassign}}
                  />
                {{/each}}
              </tbody>
            </table>
          {{else}}
            <div class="alert alert-info">
              {{i18n "choose_topic.none_found"}}
            </div>
          {{/if}}
        </ConditionalLoadingSpinner>
        */
        {
            "id": "Kq2zL5bM",
            "block": "[[[8,[39,0],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"hasIncoming\"]],[[[1,\"    \"],[10,0],[14,0,\"show-mores\"],[12],[1,\"\\n      \"],[11,3],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,2],[\"click\",[30,0,[\"showInserted\"]]],null],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",\"latest\",[30,0,[\"incomingCount\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"topics\"]],[[[1,\"    \"],[10,\"table\"],[14,0,\"topic-list assigned-topic-list\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[14,0,\"topic-list-body assigned-topic-list-body\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"topics\"]]],null]],null],null,[[[1,\"          \"],[8,[39,6],null,[[\"@topic\",\"@expandGloballyPinned\",\"@expandAllPinned\",\"@lastVisitedTopic\",\"@selected\",\"@tagsForUser\",\"@unassign\",\"@reassign\"],[[30,1],[30,0,[\"expandGloballyPinned\"]],[30,0,[\"expandAllPinned\"]],[30,0,[\"lastVisitedTopic\"]],[30,0,[\"selected\"]],[30,0,[\"tagsForUser\"]],[30,0,[\"unassign\"]],[30,0,[\"reassign\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,\"\\n      \"],[1,[28,[35,7],[\"choose_topic.none_found\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]]],[]]]]]],[\"topic\"],false,[\"conditional-loading-spinner\",\"if\",\"on\",\"count-i18n\",\"each\",\"-track-array\",\"assigned-topic-list-item\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/mobile/components/basic-assigned-topic-list.hbs",
            "isStrictMode": false
        });
});