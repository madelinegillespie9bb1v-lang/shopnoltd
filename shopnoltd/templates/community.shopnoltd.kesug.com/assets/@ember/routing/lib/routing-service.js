define("@ember/routing/lib/routing-service", ["exports", "@ember/-internals/owner", "@ember/debug", "@ember/object/computed", "@ember/service", "@ember/routing/router", "@ember/routing/router-service"], function(_exports, _owner, _debug, _computed, _service, _router2, _routerService) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    /**
    @module ember
    */

    /**
      The Routing service is used by LinkTo, and provides facilities for
      the component/view layer to interact with the router.
  
      This is a private service for internal usage only. For public usage,
      refer to the `Router` service.
  
      @private
      @class RoutingService
    */
    class RoutingService extends _service.default {
        get router() {
            var router = this[_routerService.ROUTER];
            if (router !== undefined) {
                return router;
            }
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner) && (0, _debug.assert)('RoutingService is unexpectedly missing an owner', owner));
            var _router = owner.lookup('router:main');
            (false && !(_router instanceof _router2.default) && (0, _debug.assert)('ROUTING SERVICE BUG: Expected router to be an instance of EmberRouter', _router instanceof _router2.default));
            _router.setupRouter();
            return this[_routerService.ROUTER] = _router;
        }
        hasRoute(routeName) {
            return this.router.hasRoute(routeName);
        }
        transitionTo(routeName, models, queryParams, shouldReplace) {
            var transition = this.router._doTransition(routeName, models, queryParams);
            if (shouldReplace) {
                transition.method('replace');
            }
            return transition;
        }
        normalizeQueryParams(routeName, models, queryParams) {
            this.router._prepareQueryParams(routeName, models, queryParams);
        }
        _generateURL(routeName, models, queryParams) {
            var visibleQueryParams = {};
            if (queryParams) {
                Object.assign(visibleQueryParams, queryParams);
                this.normalizeQueryParams(routeName, models, visibleQueryParams);
            }
            return this.router.generate(routeName, ...models, {
                queryParams: visibleQueryParams
            });
        }
        generateURL(routeName, models, queryParams) {
            if (this.router._initialTransitionStarted) {
                return this._generateURL(routeName, models, queryParams);
            } else {
                // Swallow error when transition has not started.
                // When rendering in tests without visit(), we cannot infer the route context which <LinkTo/> needs be aware of
                try {
                    return this._generateURL(routeName, models, queryParams);
                } catch (_e) {
                    return;
                }
            }
        }
        isActiveForRoute(contexts, queryParams, routeName, routerState) {
            var handlers = this.router._routerMicrolib.recognizer.handlersFor(routeName);
            var leafName = handlers[handlers.length - 1].handler;
            var maximumContexts = numberOfContextsAcceptedByHandler(routeName, handlers);
            // NOTE: any ugliness in the calculation of activeness is largely
            // due to the fact that we support automatic normalizing of
            // `resource` -> `resource.index`, even though there might be
            // dynamic segments / query params defined on `resource.index`
            // which complicates (and makes somewhat ambiguous) the calculation
            // of activeness for links that link to `resource` instead of
            // directly to `resource.index`.
            // if we don't have enough contexts revert back to full route name
            // this is because the leaf route will use one of the contexts
            if (contexts.length > maximumContexts) {
                routeName = leafName;
            }
            return routerState.isActiveIntent(routeName, contexts, queryParams);
        }
    }
    _exports.default = RoutingService;
    RoutingService.reopen({
        targetState: (0, _computed.readOnly)('router.targetState'),
        currentState: (0, _computed.readOnly)('router.currentState'),
        currentRouteName: (0, _computed.readOnly)('router.currentRouteName'),
        currentPath: (0, _computed.readOnly)('router.currentPath')
    });

    function numberOfContextsAcceptedByHandler(handlerName, handlerInfos) {
        var req = 0;
        for (var i = 0; i < handlerInfos.length; i++) {
            req += handlerInfos[i].names.length;
            if (handlerInfos[i].handler === handlerName) {
                break;
            }
        }
        return req;
    }
});