define("@ember/service/index", ["exports", "@ember/object/-internals", "@ember/-internals/metal"], function(_exports, _internals, _metal) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    _exports.inject = inject;
    _exports.service = service;

    function inject() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return (0, _metal.inject)('service', ...args);
    }

    function service() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }
        return (0, _metal.inject)('service', ...args);
    }
    /**
      @class Service
      @extends EmberObject
      @since 1.10.0
      @public
    */
    class Service extends _internals.FrameworkObject {}
    Service.isServiceFactory = true;
    var _default = _exports.default = Service;
});