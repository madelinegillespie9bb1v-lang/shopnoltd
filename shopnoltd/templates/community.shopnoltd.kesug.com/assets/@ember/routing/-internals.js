define("@ember/routing/-internals", ["exports", "@ember/routing/lib/router_state", "@ember/routing/lib/routing-service", "@ember/routing/lib/utils", "@ember/routing/lib/generate_controller", "@ember/routing/lib/cache", "@ember/routing/lib/dsl", "@ember/routing/lib/controller_for"], function(_exports, _router_state, _routingService, _utils, _generate_controller, _cache, _dsl, _controller_for) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    Object.defineProperty(_exports, "BucketCache", {
        enumerable: true,
        get: function() {
            return _cache.default;
        }
    });
    Object.defineProperty(_exports, "DSL", {
        enumerable: true,
        get: function() {
            return _dsl.default;
        }
    });
    Object.defineProperty(_exports, "RouterState", {
        enumerable: true,
        get: function() {
            return _router_state.default;
        }
    });
    Object.defineProperty(_exports, "RoutingService", {
        enumerable: true,
        get: function() {
            return _routingService.default;
        }
    });
    Object.defineProperty(_exports, "controllerFor", {
        enumerable: true,
        get: function() {
            return _controller_for.default;
        }
    });
    Object.defineProperty(_exports, "generateController", {
        enumerable: true,
        get: function() {
            return _generate_controller.default;
        }
    });
    Object.defineProperty(_exports, "generateControllerFactory", {
        enumerable: true,
        get: function() {
            return _generate_controller.generateControllerFactory;
        }
    });
    Object.defineProperty(_exports, "prefixRouteNameArg", {
        enumerable: true,
        get: function() {
            return _utils.prefixRouteNameArg;
        }
    });
});