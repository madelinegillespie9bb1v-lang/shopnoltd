define("discourse/plugins/discourse-lazy-videos/discourse/components/lazy-video", ["exports", "@glimmer/component", "@glimmer/tracking", "@ember/helper", "@ember/modifier", "@ember/object", "@ember/template", "discourse/helpers/concat-class", "discourse/plugins/discourse-lazy-videos/discourse/components/lazy-iframe", "@ember/component", "@ember/template-factory"], function(_exports, _component, _tracking, _helper, _modifier, _object, _template2, _concatClass, _lazyIframe, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class LazyVideo extends _component.default {
        static# _ = (() => dt7948.g(this.prototype, "isLoaded", [_tracking.tracked], function() {
            return false;
        }))();#
        isLoaded = (() => (dt7948.i(this, "isLoaded"), void 0))();
        get thumbnailStyle() {
            const color1 = this.args.videoAttributes.dominantColor;
            if (color1 ? .match(/^[0-9A-Fa-f]+$/)) {
                return (0, _template2.htmlSafe)(`background-color: #${color1};`);
            }
        }
        loadEmbed() {
            if (!this.isLoaded) {
                this.isLoaded = true;
                this.args.onLoadedVideo ? .();
            }
        }
        static# _2 = (() => dt7948.n(this.prototype, "loadEmbed", [_object.action]))();
        onKeyPress(event1) {
            if (event1.key === "Enter") {
                event1.preventDefault();
                this.loadEmbed();
            }
        }
        static# _3 = (() => dt7948.n(this.prototype, "onKeyPress", [_object.action]))();
        static# _4 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div
                  data-video-id={{@videoAttributes.id}}
                  data-video-title={{@videoAttributes.title}}
                  data-video-start-time={{@videoAttributes.startTime}}
                  data-provider-name={{@videoAttributes.providerName}}
                  class={{concatClass
                    "lazy-video-container"
                    (concat @videoAttributes.providerName "-onebox")
                    (if this.isLoaded "video-loaded")
                  }}
                >
                  {{#if this.isLoaded}}
                    <LazyIframe
                      @providerName={{@videoAttributes.providerName}}
                      @title={{@videoAttributes.title}}
                      @videoId={{@videoAttributes.id}}
                      @startTime={{@videoAttributes.startTime}}
                    />
                  {{else}}
                    <div
                      {{on "click" this.loadEmbed}}
                      {{on "keypress" this.loadEmbed}}
                      tabindex="0"
                      style={{this.thumbnailStyle}}
                      class={{concatClass "video-thumbnail" @videoAttributes.providerName}}
                    >
                      <img
                        src={{@videoAttributes.thumbnail}}
                        title={{@videoAttributes.title}}
                        loading="lazy"
                        class={{concat @videoAttributes.providerName "-thumbnail"}}
                      />
                      <div
                        class={{concatClass
                          "icon"
                          (concat @videoAttributes.providerName "-icon")
                        }}
                      ></div>
                    </div>
                    <div class="title-container">
                      <div class="title-wrapper">
                        <a
                          href={{@videoAttributes.url}}
                          title={{@videoAttributes.title}}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="title-link"
                        >
                          {{@videoAttributes.title}}
                        </a>
                      </div>
                    </div>
                  {{/if}}
                </div>
              
            */
            {
                "id": "1eaF/Mtc",
                "block": "[[[1,\"\\n    \"],[10,0],[15,\"data-video-id\",[30,1,[\"id\"]]],[15,\"data-video-title\",[30,1,[\"title\"]]],[15,\"data-video-start-time\",[30,1,[\"startTime\"]]],[15,\"data-provider-name\",[30,1,[\"providerName\"]]],[15,0,[28,[32,0],[\"lazy-video-container\",[28,[32,1],[[30,1,[\"providerName\"]],\"-onebox\"],null],[52,[30,0,[\"isLoaded\"]],\"video-loaded\"]],null]],[12],[1,\"\\n\"],[41,[30,0,[\"isLoaded\"]],[[[1,\"        \"],[8,[32,2],null,[[\"@providerName\",\"@title\",\"@videoId\",\"@startTime\"],[[30,1,[\"providerName\"]],[30,1,[\"title\"]],[30,1,[\"id\"]],[30,1,[\"startTime\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[11,0],[24,\"tabindex\",\"0\"],[16,5,[30,0,[\"thumbnailStyle\"]]],[16,0,[28,[32,0],[\"video-thumbnail\",[30,1,[\"providerName\"]]],null]],[4,[32,3],[\"click\",[30,0,[\"loadEmbed\"]]],null],[4,[32,3],[\"keypress\",[30,0,[\"loadEmbed\"]]],null],[12],[1,\"\\n          \"],[10,\"img\"],[15,\"src\",[30,1,[\"thumbnail\"]]],[15,\"title\",[30,1,[\"title\"]]],[14,\"loading\",\"lazy\"],[15,0,[28,[32,1],[[30,1,[\"providerName\"]],\"-thumbnail\"],null]],[12],[13],[1,\"\\n          \"],[10,0],[15,0,[28,[32,0],[\"icon\",[28,[32,1],[[30,1,[\"providerName\"]],\"-icon\"],null]],null]],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"title-container\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"title-wrapper\"],[12],[1,\"\\n            \"],[10,3],[15,6,[30,1,[\"url\"]]],[15,\"title\",[30,1,[\"title\"]]],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[14,0,\"title-link\"],[12],[1,\"\\n              \"],[1,[30,1,[\"title\"]]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n  \"]],[\"@videoAttributes\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-lazy-videos/discourse/components/lazy-video.js",
                "scope": () => [_concatClass.default, _helper.concat, _lazyIframe.default, _modifier.on],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = LazyVideo;
});