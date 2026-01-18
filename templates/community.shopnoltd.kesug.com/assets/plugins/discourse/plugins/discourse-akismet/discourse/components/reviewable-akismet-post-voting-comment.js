define("discourse/plugins/discourse-akismet/discourse/components/reviewable-akismet-post-voting-comment", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/service", "@ember/template-factory"], function(_exports, _component, _component2, _tracking, _service, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="post-topic">
          <a class="title-text" href={{this.post.url}}>
            {{html-safe @reviewable.topic.fancyTitle}}</a>
          {{category-badge @reviewable.category}}
        </div>
  
        <div class="post-contents-wrapper">
          <ReviewableCreatedBy @user={{@reviewable.target_created_by}} @tagName="" />
          <div class="post-contents">
            <ReviewablePostHeader
              @reviewable={{@reviewable}}
              @createdBy={{@reviewable.target_created_by}}
              @tagName=""
            />
  
            <div class="post-body">
              {{html-safe (or @reviewable.payload.comment_cooked @reviewable.cooked)}}
            </div>
  
            {{#if @reviewable.payload.transcript_topic_id}}
              <div class="transcript">
                <LinkTo
                  @route="topic"
                  @models={{array "-" @reviewable.payload.transcript_topic_id}}
                  class="btn btn-small"
                >
                  {{i18n "review.transcript.view"}}
                </LinkTo>
              </div>
            {{/if}}
  
            {{yield}}
          </div>
        </div>
        */
        {
            "id": "T2dDyPfy",
            "block": "[[[10,0],[14,0,\"post-topic\"],[12],[1,\"\\n  \"],[10,3],[14,0,\"title-text\"],[15,6,[30,0,[\"post\",\"url\"]]],[12],[1,\"\\n    \"],[1,[28,[35,0],[[30,1,[\"topic\",\"fancyTitle\"]]],null]],[13],[1,\"\\n  \"],[1,[28,[35,1],[[30,1,[\"category\"]]],null]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"post-contents-wrapper\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@user\",\"@tagName\"],[[30,1,[\"target_created_by\"]],\"\"]],null],[1,\"\\n  \"],[10,0],[14,0,\"post-contents\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@reviewable\",\"@createdBy\",\"@tagName\"],[[30,1],[30,1,[\"target_created_by\"]],\"\"]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"post-body\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[[28,[37,4],[[30,1,[\"payload\",\"comment_cooked\"]],[30,1,[\"cooked\"]]],null]],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"payload\",\"transcript_topic_id\"]],[[[1,\"      \"],[10,0],[14,0,\"transcript\"],[12],[1,\"\\n        \"],[8,[39,6],[[24,0,\"btn btn-small\"]],[[\"@route\",\"@models\"],[\"topic\",[28,[37,7],[\"-\",[30,1,[\"payload\",\"transcript_topic_id\"]]],null]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,8],[\"review.transcript.view\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[18,2,null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@reviewable\",\"&default\"],false,[\"html-safe\",\"category-badge\",\"reviewable-created-by\",\"reviewable-post-header\",\"or\",\"if\",\"link-to\",\"array\",\"i18n\",\"yield\"]]",
            "moduleName": "discourse/plugins/discourse-akismet/discourse/components/reviewable-akismet-post-voting-comment.hbs",
            "isStrictMode": false
        });
    class ReviewableAkismetPostVotingComment extends _component2.default {
        static# _ = (() => dt7948.g(this.prototype, "store", [_service.inject]))();#
        store = (() => (dt7948.i(this, "store"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "post", [_tracking.tracked]))();#
        post = (() => (dt7948.i(this, "post"), void 0))();
        constructor() {
            super(...arguments);
            this.fetchPost();
        }
        async fetchPost() {
            this.post = await this.store.find("post", this.args.reviewable.post_id);
        }
    }
    _exports.default = ReviewableAkismetPostVotingComment;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ReviewableAkismetPostVotingComment);
});