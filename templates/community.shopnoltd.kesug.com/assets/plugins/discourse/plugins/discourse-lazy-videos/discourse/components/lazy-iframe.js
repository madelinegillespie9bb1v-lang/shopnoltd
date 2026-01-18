define("discourse/plugins/discourse-lazy-videos/discourse/components/lazy-iframe", ["exports", "@glimmer/component", "@ember/component", "@ember/template-factory"], function(_exports, _component, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;

    function convertToSeconds(time1) {
        const match1 = time1.toString().match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
        const [hours1, minutes1, seconds1] = match1.slice(1);
        if (hours1 || minutes1 || seconds1) {
            const h1 = parseInt(hours1, 10) || 0;
            const m1 = parseInt(minutes1, 10) || 0;
            const s1 = parseInt(seconds1, 10) || 0;
            return h1 * 3600 + m1 * 60 + s1;
        }
        return time1;
    }
    class LazyIframe extends _component.default {
        get iframeSrc() {
            switch (this.args.providerName) {
                case "youtube":
                    let url1 = `https://www.youtube.com/embed/${this.args.videoId}?autoplay=1&rel=0`;
                    if (this.args.startTime) {
                        url1 += `&start=${convertToSeconds(this.args.startTime)}`;
                    }
                    return url1;
                case "vimeo":
                    return `https://player.vimeo.com/video/${this.args.videoId}${this.args.videoId.includes("?") ? "&" : "?"}autoplay=1`;
                case "tiktok":
                    return `https://www.tiktok.com/embed/v2/${this.args.videoId}`;
            }
        }
        static# _ = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                {{#if @providerName}}
                  <iframe
                    src={{this.iframeSrc}}
                    title={{@title}}
                    allowFullScreen
                    scrolling="no"
                    frameborder="0"
                    seamless="seamless"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                {{/if}}
              
            */
            {
                "id": "GBbnVjZj",
                "block": "[[[1,\"\\n\"],[41,[30,1],[[[1,\"      \"],[10,\"iframe\"],[15,\"src\",[30,0,[\"iframeSrc\"]]],[15,\"title\",[30,2]],[14,\"allowFullScreen\",\"\"],[14,\"scrolling\",\"no\"],[14,\"frameborder\",\"0\"],[14,\"seamless\",\"seamless\"],[14,\"allow\",\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"  \"]],[\"@providerName\",\"@title\"],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-lazy-videos/discourse/components/lazy-iframe.js",
                "isStrictMode": true
            }), this))();
    }
    _exports.default = LazyIframe;
});