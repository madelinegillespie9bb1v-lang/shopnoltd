define("@ember/routing/route", ["exports", "@ember/-internals/container", "@ember/-internals/metal", "@ember/-internals/owner", "@ember/routing/-internals", "@ember/object", "@ember/object/evented", "@ember/array", "@ember/-internals/runtime", "@ember/utils", "@ember/-internals/utils", "@ember/controller", "@ember/debug", "@ember/engine/instance", "@ember/object/compat", "@ember/runloop", "router_js", "@ember/routing/router", "@ember/routing/lib/utils"], function(_exports, _container, _metal, _owner, _internals, _object, _evented, _array, _runtime, _utils, _utils2, _controller2, _debug, _instance, _compat, _runloop, _router_js, _router, _utils3) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.defaultSerialize = _exports.default = _exports.ROUTE_CONNECTIONS = void 0;
    _exports.getFullQueryParams = getFullQueryParams;
    _exports.hasDefaultSerialize = hasDefaultSerialize;
    var __decorate = void 0 && (void 0).__decorate || function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    function isStoreLike(store) {
        return typeof store === 'object' && store !== null && typeof store.find === 'function';
    }
    var ROUTE_CONNECTIONS = _exports.ROUTE_CONNECTIONS = new WeakMap();
    var RENDER = Symbol('render');
    class Route extends _object.default.extend(_runtime.ActionHandler, _evented.default) {
        constructor(owner) {
            super(owner);
            // These properties will end up appearing in the public interface because we
            // `implements IRoute` from `router.js`, which has them as part of *its*
            // public contract. We mark them as `@internal` so they at least signal to
            // people subclassing `Route` that they should not use them.
            /** @internal */
            this.context = {};
            if (owner) {
                var router = owner.lookup('router:main');
                var bucketCache = owner.lookup((0, _container.privatize)
                    `-bucket-cache:main`);
                (false && !(router instanceof _router.default && bucketCache instanceof _internals.BucketCache) && (0, _debug.assert)('ROUTER BUG: Expected route injections to be defined on the route. This is an internal bug, please open an issue on Github if you see this message!', router instanceof _router.default && bucketCache instanceof _internals.BucketCache));
                this._router = router;
                this._bucketCache = bucketCache;
                this._topLevelViewTemplate = owner.lookup('template:-outlet');
                this._environment = owner.lookup('-environment:main');
            }
        }
        /**
          A hook you can implement to convert the route's model into parameters
          for the URL.
             ```app/router.js
          // ...
             Router.map(function() {
            this.route('post', { path: '/posts/:post_id' });
          });
             ```
             ```app/routes/post.js
          import Route from '@ember/routing/route';
             export default class PostRoute extends Route {
            model({ post_id }) {
              // the server returns `{ id: 12 }`
              return fetch(`/posts/${post_id}`;
            }
               serialize(model) {
              // this will make the URL `/posts/12`
              return { post_id: model.id };
            }
          }
          ```
             The default `serialize` method will insert the model's `id` into the
          route's dynamic segment (in this case, `:post_id`) if the segment contains '_id'.
          If the route has multiple dynamic segments or does not contain '_id', `serialize`
          will return `getProperties(model, params)`
             This method is called when `transitionTo` is called with a context
          in order to populate the URL.
             @method serialize
          @param {Object} model the routes model
          @param {Array} params an Array of parameter names for the current
            route (in the example, `['post_id']`.
          @return {Object} the serialized parameters
          @since 1.0.0
          @public
        */
        serialize(model, params) {
            if (params.length < 1 || !model) {
                return;
            }
            var object = {};
            if (params.length === 1) {
                var [name] = params;
                (false && !(name) && (0, _debug.assert)('has name', name));
                if (typeof model === 'object' && name in model) {
                    object[name] = (0, _object.get)(model, name);
                } else if (/_id$/.test(name)) {
                    object[name] = (0, _object.get)(model, 'id');
                } else if ((0, _utils2.isProxy)(model)) {
                    object[name] = (0, _object.get)(model, name);
                }
            } else {
                object = (0, _object.getProperties)(model, params);
            }
            return object;
        }
        /**
          Sets the name for this route, including a fully resolved name for routes
          inside engines.
             @private
          @method _setRouteName
          @param {String} name
        */
        _setRouteName(name) {
            this.routeName = name;
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner instanceof _instance.default) && (0, _debug.assert)('Expected route to have EngineInstance as owner', owner instanceof _instance.default));
            this.fullRouteName = getEngineRouteName(owner, name);
        }
        /**
          @private
             @method _stashNames
        */
        _stashNames(routeInfo, dynamicParent) {
            if (this._names) {
                return;
            }
            var names = this._names = routeInfo['_names'];
            if (!names.length) {
                routeInfo = dynamicParent;
                names = routeInfo && routeInfo['_names'] || [];
            }
            // SAFETY: Since `_qp` is protected we can't infer the type
            var qps = (0, _object.get)(this, '_qp').qps;
            var namePaths = new Array(names.length);
            for (var a = 0; a < names.length; ++a) {
                namePaths[a] = `${routeInfo.name}.${names[a]}`;
            }
            for (var qp of qps) {
                if (qp.scope === 'model') {
                    qp.parts = namePaths;
                }
            }
        }
        /**
          @private
             @property _activeQPChanged
        */
        _activeQPChanged(qp, value) {
            this._router._activeQPChanged(qp.scopedPropertyName, value);
        }
        /**
          @private
          @method _updatingQPChanged
        */
        _updatingQPChanged(qp) {
            this._router._updatingQPChanged(qp.urlKey);
        }
        /**
          Returns a hash containing the parameters of an ancestor route.
             You may notice that `this.paramsFor` sometimes works when referring to a
          child route, but this behavior should not be relied upon as only ancestor
          routes are certain to be loaded in time.
             Example
             ```app/router.js
          // ...
             Router.map(function() {
            this.route('member', { path: ':name' }, function() {
              this.route('interest', { path: ':interest' });
            });
          });
          ```
             ```app/routes/member.js
          import Route from '@ember/routing/route';
             export default class MemberRoute extends Route {
            queryParams = {
              memberQp: { refreshModel: true }
            }
          }
          ```
             ```app/routes/member/interest.js
          import Route from '@ember/routing/route';
             export default class MemberInterestRoute extends Route {
            queryParams = {
              interestQp: { refreshModel: true }
            }
               model() {
              return this.paramsFor('member');
            }
          }
          ```
             If we visit `/turing/maths?memberQp=member&interestQp=interest` the model for
          the `member.interest` route is a hash with:
             * `name`: `turing`
          * `memberQp`: `member`
             @method paramsFor
          @param {String} name
          @return {Object} hash containing the parameters of the route `name`
          @since 1.4.0
          @public
        */
        paramsFor(name) {
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner) && (0, _debug.assert)('Route is unexpectedly missing an owner', owner));
            var route = owner.lookup(`route:${name}`);
            if (route === undefined) {
                return {};
            }
            var transition = this._router._routerMicrolib.activeTransition;
            var state = transition ? transition[_router_js.STATE_SYMBOL] : this._router._routerMicrolib.state;
            var fullName = route.fullRouteName;
            var params = {
                ...state.params[fullName]
            };
            var queryParams = getQueryParamsFor(route, state);
            return Object.entries(queryParams).reduce((params, _ref) => {
                var [key, value] = _ref;
                (false && !(!params[key]) && (0, _debug.assert)(`The route '${this.routeName}' has both a dynamic segment and query param with name '${key}'. Please rename one to avoid collisions.`, !params[key]));
                params[key] = value;
                return params;
            }, params);
        }
        /**
          Serializes the query parameter key
             @method serializeQueryParamKey
          @param {String} controllerPropertyName
          @private
        */
        serializeQueryParamKey(controllerPropertyName) {
            return controllerPropertyName;
        }
        /**
          Serializes value of the query parameter based on defaultValueType
             @method serializeQueryParam
          @param {Object} value
          @param {String} urlKey
          @param {String} defaultValueType
          @private
        */
        serializeQueryParam(value, _urlKey, defaultValueType) {
            // urlKey isn't used here, but anyone overriding
            // can use it to provide serialization specific
            // to a certain query param.
            return this._router._serializeQueryParam(value, defaultValueType);
        }
        /**
          Deserializes value of the query parameter based on defaultValueType
             @method deserializeQueryParam
          @param {Object} value
          @param {String} urlKey
          @param {String} defaultValueType
          @private
        */
        deserializeQueryParam(value, _urlKey, defaultValueType) {
            // urlKey isn't used here, but anyone overriding
            // can use it to provide deserialization specific
            // to a certain query param.
            return this._router._deserializeQueryParam(value, defaultValueType);
        }
        /**
          @private
             @property _optionsForQueryParam
        */
        _optionsForQueryParam(qp) {
            var queryParams = (0, _object.get)(this, 'queryParams');
            return (0, _object.get)(queryParams, qp.urlKey) || (0, _object.get)(queryParams, qp.prop) || queryParams[qp.urlKey] || queryParams[qp.prop] || {};
        }
        /**
          A hook you can use to reset controller values either when the model
          changes or the route is exiting.
             ```app/routes/articles.js
          import Route from '@ember/routing/route';
             export default class ArticlesRoute extends Route {
            resetController(controller, isExiting, transition) {
              if (isExiting && transition.targetName !== 'error') {
                controller.set('page', 1);
              }
            }
          }
          ```
             @method resetController
          @param {Controller} controller instance
          @param {Boolean} isExiting
          @param {Object} transition
          @since 1.7.0
          @public
        */
        resetController(_controller, _isExiting, _transition) {
            // We document that subclasses do not have to return *anything* and in fact
            // do not even have to call super, so whiel we *do* return `this`, we need
            // to be explicit in the types that our return type is *effectively* `void`.
            return this;
        }
        /**
          @private
             @method exit
        */
        exit(transition) {
            this.deactivate(transition);
            this.trigger('deactivate', transition);
            this.teardownViews();
        }
        /**
          @private
             @method _internalReset
          @since 3.6.0
        */
        _internalReset(isExiting, transition) {
            var controller = this.controller;
            // SAFETY: Since `_qp` is protected we can't infer the type
            controller['_qpDelegate'] = (0, _object.get)(this, '_qp').states.inactive;
            this.resetController(controller, isExiting, transition);
        }
        /**
          @private
             @method enter
        */
        enter(transition) {
            ROUTE_CONNECTIONS.set(this, []);
            this.activate(transition);
            this.trigger('activate', transition);
        }
        /**
          This event is triggered when the router enters the route. It is
          not executed when the model for the route changes.
             ```app/routes/application.js
          import { on } from '@ember/object/evented';
          import Route from '@ember/routing/route';
             export default Route.extend({
            collectAnalytics: on('activate', function(){
              collectAnalytics();
            })
          });
          ```
             @event activate
          @since 1.9.0
          @public
        */
        /**
          This event is triggered when the router completely exits this
          route. It is not executed when the model for the route changes.
             ```app/routes/index.js
          import { on } from '@ember/object/evented';
          import Route from '@ember/routing/route';
             export default Route.extend({
            trackPageLeaveAnalytics: on('deactivate', function(){
              trackPageLeaveAnalytics();
            })
          });
          ```
             @event deactivate
          @since 1.9.0
          @public
        */
        /**
          This hook is executed when the router completely exits this route. It is
          not executed when the model for the route changes.
             @method deactivate
          @param {Transition} transition
          @since 1.0.0
          @public
        */
        deactivate(_transition) {}
        /**
          This hook is executed when the router enters the route. It is not executed
          when the model for the route changes.
             @method activate
          @param {Transition} transition
          @since 1.0.0
          @public
        */
        activate(_transition) {}
        /**
          Perform a synchronous transition into another route without attempting
          to resolve promises, update the URL, or abort any currently active
          asynchronous transitions (i.e. regular transitions caused by
          `transitionTo` or URL changes).
             This method is handy for performing intermediate transitions on the
          way to a final destination route, and is called internally by the
          default implementations of the `error` and `loading` handlers.
             @method intermediateTransitionTo
          @param {String} name the name of the route
          @param {...Object} models the model(s) to be used while transitioning
          to the route.
          @since 1.2.0
          @public
         */
        intermediateTransitionTo() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }
            var [name, ...preparedArgs] = (0, _utils3.prefixRouteNameArg)(this, args);
            this._router.intermediateTransitionTo(name, ...preparedArgs);
        }
        /**
          Refresh the model on this route and any child routes, firing the
          `beforeModel`, `model`, and `afterModel` hooks in a similar fashion
          to how routes are entered when transitioning in from other route.
          The current route params (e.g. `article_id`) will be passed in
          to the respective model hooks, and if a different model is returned,
          `setupController` and associated route hooks will re-fire as well.
             An example usage of this method is re-querying the server for the
          latest information using the same parameters as when the route
          was first entered.
             Note that this will cause `model` hooks to fire even on routes
          that were provided a model object when the route was initially
          entered.
             @method refresh
          @return {Transition} the transition object associated with this
            attempted transition
          @since 1.4.0
          @public
         */
        refresh() {
            return this._router._routerMicrolib.refresh(this);
        }
        /**
          This hook is the entry point for router.js
             @private
          @method setup
        */
        setup(context, transition) {
            var controllerName = this.controllerName || this.routeName;
            var definedController = this.controllerFor(controllerName, true);
            var controller = definedController ? ? this.generateController(controllerName);
            // SAFETY: Since `_qp` is protected we can't infer the type
            var queryParams = (0, _object.get)(this, '_qp');
            // Assign the route's controller so that it can more easily be
            // referenced in action handlers. Side effects. Side effects everywhere.
            if (!this.controller) {
                var propNames = queryParams.propertyNames;
                addQueryParamsObservers(controller, propNames);
                this.controller = controller;
            }
            var states = queryParams.states;
            controller._qpDelegate = states.allowOverrides;
            if (transition) {
                // Update the model dep values used to calculate cache keys.
                (0, _utils3.stashParamNames)(this._router, transition[_router_js.STATE_SYMBOL].routeInfos);
                var cache = this._bucketCache;
                var params = transition[_router_js.PARAMS_SYMBOL];
                var allParams = queryParams.propertyNames;
                allParams.forEach(prop => {
                    var aQp = queryParams.map[prop];
                    (false && !(aQp) && (0, _debug.assert)('expected aQp', aQp));
                    aQp.values = params;
                    var cacheKey = (0, _utils3.calculateCacheKey)(aQp.route.fullRouteName, aQp.parts, aQp.values);
                    var value = cache.lookup(cacheKey, prop, aQp.undecoratedDefaultValue);
                    (0, _object.set)(controller, prop, value);
                });
                var qpValues = getQueryParamsFor(this, transition[_router_js.STATE_SYMBOL]);
                (0, _object.setProperties)(controller, qpValues);
            }
            this.setupController(controller, context, transition);
            if (this._environment.options.shouldRender) {
                this[RENDER]();
            }
            // Setup can cause changes to QPs which need to be propogated immediately in
            // some situations. Eventually, we should work on making these async somehow.
            (0, _metal.flushAsyncObservers)(false);
        }
        /*
          Called when a query parameter for this route changes, regardless of whether the route
          is currently part of the active route hierarchy. This will update the query parameter's
          value in the cache so if this route becomes active, the cache value has been updated.
        */
        _qpChanged(prop, value, qp) {
            if (!qp) {
                return;
            }
            // Update model-dep cache
            var cache = this._bucketCache;
            var cacheKey = (0, _utils3.calculateCacheKey)(qp.route.fullRouteName, qp.parts, qp.values);
            cache.stash(cacheKey, prop, value);
        }
        beforeModel(_transition) {}
        afterModel(_resolvedModel, _transition) {}
        /**
          A hook you can implement to optionally redirect to another route.
             Calling `this.router.transitionTo` from inside of the `redirect` hook will
          abort the current transition (into the route that has implemented `redirect`).
             `redirect` and `afterModel` behave very similarly and are
          called almost at the same time, but they have an important
          distinction when calling `this.router.transitionTo` to a child route
          of the current route. From `afterModel`, this new transition
          invalidates the current transition, causing `beforeModel`,
          `model`, and `afterModel` hooks to be called again. But the
          same transition started from `redirect` does _not_ invalidate
          the current transition. In other words, by the time the `redirect`
          hook has been called, both the resolved model and the attempted
          entry into this route are considered fully validated.
             @method redirect
          @param {Object} model the model for this route
          @param {Transition} transition the transition object associated with the current transition
          @since 1.0.0
          @public
        */
        redirect(_model, _transition) {}
        /**
          Called when the context is changed by router.js.
             @private
          @method contextDidChange
        */
        contextDidChange() {
            this.currentModel = this.context;
        }
        /**
          A hook you can implement to convert the URL into the model for
          this route.
             ```app/router.js
          // ...
             Router.map(function() {
            this.route('post', { path: '/posts/:post_id' });
          });
             export default Router;
          ```
             Note that for routes with dynamic segments, this hook is not always
          executed. If the route is entered through a transition (e.g. when
          using the `link-to` Handlebars helper or the `transitionTo` method
          of routes), and a model context is already provided this hook
          is not called.
             A model context does not include a primitive string or number,
          which does cause the model hook to be called.
             Routes without dynamic segments will always execute the model hook.
             ```javascript
          // no dynamic segment, model hook always called
          this.router.transitionTo('posts');
             // model passed in, so model hook not called
          thePost = store.findRecord('post', 1);
          this.router.transitionTo('post', thePost);
             // integer passed in, model hook is called
          this.router.transitionTo('post', 1);
             // model id passed in, model hook is called
          // useful for forcing the hook to execute
          thePost = store.findRecord('post', 1);
          this.router.transitionTo('post', thePost.id);
          ```
             This hook follows the asynchronous/promise semantics
          described in the documentation for `beforeModel`. In particular,
          if a promise returned from `model` fails, the error will be
          handled by the `error` hook on `Route`.
             Note that the legacy behavior of automatically defining a model
          hook when a dynamic segment ending in `_id` is present is
          [deprecated](https://deprecations.emberjs.com/v5.x#toc_deprecate-implicit-route-model).
          You should explicitly define a model hook whenever any segments are
          present.
             Example
             ```app/routes/post.js
          import Route from '@ember/routing/route';
          import { service } from '@ember/service';
             export default class PostRoute extends Route {
            @service store;
               model(params) {
              return this.store.findRecord('post', params.post_id);
            }
          }
          ```
             @method model
          @param {Object} params the parameters extracted from the URL
          @param {Transition} transition
          @return {any | Promise<any>} the model for this route. If
            a promise is returned, the transition will pause until
            the promise resolves, and the resolved value of the promise
            will be used as the model for this route.
          @since 1.0.0
          @public
        */
        model(params, transition) {
            var name, sawParams, value;
            // SAFETY: Since `_qp` is protected we can't infer the type
            var queryParams = (0, _object.get)(this, '_qp').map;
            for (var prop in params) {
                if (prop === 'queryParams' || queryParams && prop in queryParams) {
                    continue;
                }
                var match = prop.match(/^(.*)_id$/);
                if (match !== null) {
                    name = match[1];
                    value = params[prop];
                }
                sawParams = true;
            }
            if (!name) {
                if (sawParams) {
                    // SAFETY: This should be equivalent
                    return Object.assign({}, params);
                } else {
                    if (transition.resolveIndex < 1) {
                        return;
                    }
                    // SAFETY: This should be correct, but TS is unable to infer this.
                    return transition[_router_js.STATE_SYMBOL].routeInfos[transition.resolveIndex - 1].context;
                }
            }
            return this.findModel(name, value);
        }
        /**
          @private
          @method deserialize
          @param {Object} params the parameters extracted from the URL
          @param {Transition} transition
          @return {any | Promise<any>} the model for this route.
             Router.js hook.
         */
        deserialize(_params, transition) {
            return this.model(this._paramsFor(this.routeName, _params), transition);
        }
        /**
             @method findModel
          @param {String} type the model type
          @param {Object} value the value passed to find
          @private
        */
        findModel(type, value) {
            (true && !(false) && (0, _debug.deprecate)(`The implicit model loading behavior for routes is deprecated. ` + `Please define an explicit model hook for ${this.fullRouteName}.`, false, {
                id: 'deprecate-implicit-route-model',
                for: 'ember-source',
                since: {
                    available: '5.3.0',
                    enabled: '5.3.0'
                },
                until: '6.0.0',
                url: 'https://deprecations.emberjs.com/v5.x/#toc_deprecate-implicit-route-model'
            }));
            var store = 'store' in this ? this.store : (0, _object.get)(this, '_store');
            (false && !(isStoreLike(store)) && (0, _debug.assert)('Expected route to have a store with a find method', isStoreLike(store))); // SAFETY: We don't actually know it will return this, but this code path is also deprecated.
            return store.find(type, value);
        }
        /**
          A hook you can use to setup the controller for the current route.
             This method is called with the controller for the current route and the
          model supplied by the `model` hook.
             By default, the `setupController` hook sets the `model` property of
          the controller to the specified `model` when it is not `undefined`.
             If you implement the `setupController` hook in your Route, it will
          prevent this default behavior. If you want to preserve that behavior
          when implementing your `setupController` function, make sure to call
          `super`:
             ```app/routes/photos.js
          import Route from '@ember/routing/route';
          import { service } from '@ember/service';
             export default class PhotosRoute extends Route {
            @service store;
               model() {
              return this.store.findAll('photo');
            }
               setupController(controller, model) {
              super.setupController(controller, model);
                 this.controllerFor('application').set('showingPhotos', true);
            }
          }
          ```
             The provided controller will be one resolved based on the name
          of this route.
             If no explicit controller is defined, Ember will automatically create one.
             As an example, consider the router:
             ```app/router.js
          // ...
             Router.map(function() {
            this.route('post', { path: '/posts/:post_id' });
          });
             export default Router;
          ```
             If you have defined a file for the post controller,
          the framework will use it.
          If it is not defined, a basic `Controller` instance would be used.
             @example Behavior of a basic Controller
             ```app/routes/post.js
          import Route from '@ember/routing/route';
             export default class PostRoute extends Route {
            setupController(controller, model) {
              controller.set('model', model);
            }
          });
          ```
             @method setupController
          @param {Controller} controller instance
          @param {Object} model
          @param {Transition} [transition]
          @since 1.0.0
          @public
        */
        setupController(controller, context, _transition) {
            if (controller && context !== undefined) {
                (0, _object.set)(controller, 'model', context);
            }
        }
        controllerFor(name, _skipAssert) {
            if (_skipAssert === void 0) {
                _skipAssert = false;
            }
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner) && (0, _debug.assert)('Route is unexpectedly missing an owner', owner));
            var route = owner.lookup(`route:${name}`);
            if (route && route.controllerName) {
                name = route.controllerName;
            }
            var controller = owner.lookup(`controller:${name}`);
            // NOTE: We're specifically checking that skipAssert is true, because according
            //   to the old API the second parameter was model. We do not want people who
            //   passed a model to skip the assertion.
            (false && !(controller !== undefined || _skipAssert === true) && (0, _debug.assert)(`The controller named '${name}' could not be found. Make sure that this route exists and has already been entered at least once. If you are accessing a controller not associated with a route, make sure the controller class is explicitly defined.`, controller !== undefined || _skipAssert === true));
            (false && !(controller === undefined || controller instanceof _controller2.default) && (0, _debug.assert)(`Expected controller:${name} to be an instance of Controller`, controller === undefined || controller instanceof _controller2.default));
            return controller;
        }
        /**
          Generates a controller for a route.
             Example
             ```app/routes/post.js
          import Route from '@ember/routing/route';
             export default class Post extends Route {
            setupController(controller, post) {
              super.setupController(controller, post);
                 this.generateController('posts');
            }
          }
          ```
             @method generateController
          @param {String} name the name of the controller
          @private
        */
        generateController(name) {
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner) && (0, _debug.assert)('Route is unexpectedly missing an owner', owner));
            return (0, _internals.generateController)(owner, name);
        }
        /**
          Returns the resolved model of a parent (or any ancestor) route
          in a route hierarchy.  During a transition, all routes
          must resolve a model object, and if a route
          needs access to a parent route's model in order to
          resolve a model (or just reuse the model from a parent),
          it can call `this.modelFor(theNameOfParentRoute)` to
          retrieve it. If the ancestor route's model was a promise,
          its resolved result is returned.
             Example
             ```app/router.js
          // ...
             Router.map(function() {
            this.route('post', { path: '/posts/:post_id' }, function() {
              this.route('comments');
            });
          });
             export default Router;
          ```
             ```app/routes/post/comments.js
          import Route from '@ember/routing/route';
             export default class PostCommentsRoute extends Route {
            model() {
              let post = this.modelFor('post');
                 return post.comments;
            }
          }
          ```
             @method modelFor
          @param {String} name the name of the route
          @return {Object} the model object
          @since 1.0.0
          @public
        */
        modelFor(_name) {
            var name;
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner instanceof _instance.default) && (0, _debug.assert)('Expected router owner to be an EngineInstance', owner instanceof _instance.default));
            var transition = this._router && this._router._routerMicrolib ? this._router._routerMicrolib.activeTransition : undefined;
            // Only change the route name when there is an active transition.
            // Otherwise, use the passed in route name.
            if (owner.routable && transition !== undefined) {
                name = getEngineRouteName(owner, _name);
            } else {
                name = _name;
            }
            var route = owner.lookup(`route:${name}`);
            // If we are mid-transition, we want to try and look up
            // resolved parent contexts on the current transitionEvent.
            if (transition !== undefined && transition !== null) {
                var modelLookupName = route && route.routeName || name;
                if (Object.prototype.hasOwnProperty.call(transition.resolvedModels, modelLookupName)) {
                    return transition.resolvedModels[modelLookupName];
                }
            }
            return route ? .currentModel;
        }
        /**
          `this[RENDER]` is used to render a template into a region of another template
          (indicated by an `{{outlet}}`).
             @method this[RENDER]
          @param {String} name the name of the template to render
          @param {Object} [options] the options
          @param {String} [options.into] the template to render into,
                          referenced by name. Defaults to the parent template
          @param {String} [options.outlet] the outlet inside `options.into` to render into.
                          Defaults to 'main'
          @param {String|Object} [options.controller] the controller to use for this template,
                          referenced by name or as a controller instance. Defaults to the Route's paired controller
          @param {Object} [options.model] the model object to set on `options.controller`.
                          Defaults to the return value of the Route's model hook
          @private
         */
        [RENDER](name, options) {
            var renderOptions = buildRenderOptions(this, name, options);
            ROUTE_CONNECTIONS.get(this).push(renderOptions);
            (0, _runloop.once)(this._router, '_setOutlets');
        }
        willDestroy() {
            this.teardownViews();
        }
        /**
          @private
             @method teardownViews
        */
        teardownViews() {
            var connections = ROUTE_CONNECTIONS.get(this);
            if (connections !== undefined && connections.length > 0) {
                ROUTE_CONNECTIONS.set(this, []);
                (0, _runloop.once)(this._router, '_setOutlets');
            }
        }
        buildRouteInfoMetadata() {}
        _paramsFor(routeName, params) {
            var transition = this._router._routerMicrolib.activeTransition;
            if (transition !== undefined) {
                return this.paramsFor(routeName);
            }
            return params;
        }
        /** @deprecated Manually define your own store, such as with `@service store` */
        get _store() {
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner) && (0, _debug.assert)('Route is unexpectedly missing an owner', owner));
            var routeName = this.routeName;
            return {
                find(name, value) {
                    var modelClass = owner.factoryFor(`model:${name}`);
                    (false && !(Boolean(modelClass)) && (0, _debug.assert)(`You used the dynamic segment \`${name}_id\` in your route ` + `\`${routeName}\` for which Ember requires you provide a ` + `data-loading implementation. Commonly, that is done by ` + `adding a model hook implementation on the route ` + `(\`model({${name}_id}) {\`) or by injecting an implemention of ` + `a data store: \`@service store;\`.`, Boolean(modelClass)));
                    if (!modelClass) {
                        return;
                    }
                    modelClass = modelClass.class;
                    (false && !(typeof modelClass.find === 'function') && (0, _debug.assert)(`You used the dynamic segment \`${name}_id\` in your route ` + `\`${routeName}\` for which Ember requires you provide a ` + `data-loading implementation. Commonly, that is done by ` + `adding a model hook implementation on the route ` + `(\`model({${name}_id}) {\`) or by injecting an implemention of ` + `a data store: \`@service store;\`.\n\n` + `Rarely, applications may attempt to use a legacy behavior where ` + `the model class (in this case \`${name}\`) is resolved and the ` + `\`find\` method on that class is invoked to load data. In this ` + `application, a model of \`${name}\` was found but it did not ` + `provide a \`find\` method. You should not add a \`find\` ` + `method to your model. Instead, please implement an appropriate ` + `\`model\` hook on the \`${routeName}\` route.`, typeof modelClass.find === 'function'));
                    return modelClass.find(value);
                }
            };
        }
        /**
          @private
          @property _qp
          */
        get _qp() {
            var combinedQueryParameterConfiguration = {};
            var controllerName = this.controllerName || this.routeName;
            var owner = (0, _owner.getOwner)(this);
            (false && !(owner) && (0, _debug.assert)('Route is unexpectedly missing an owner', owner));
            var controller = owner.lookup(`controller:${controllerName}`);
            var queryParameterConfiguraton = (0, _object.get)(this, 'queryParams');
            var hasRouterDefinedQueryParams = Object.keys(queryParameterConfiguraton).length > 0;
            if (controller) {
                (false && !(controller instanceof _controller2.default) && (0, _debug.assert)('Expected an instance of controller', controller instanceof _controller2.default)); // the developer has authored a controller class in their application for
                // this route find its query params and normalize their object shape them
                // merge in the query params for the route. As a mergedProperty,
                // Route#queryParams is always at least `{}`
                var controllerDefinedQueryParameterConfiguration = (0, _object.get)(controller, 'queryParams') || [];
                var normalizedControllerQueryParameterConfiguration = (0, _utils3.normalizeControllerQueryParams)(controllerDefinedQueryParameterConfiguration);
                combinedQueryParameterConfiguration = mergeEachQueryParams(normalizedControllerQueryParameterConfiguration, queryParameterConfiguraton);
            } else if (hasRouterDefinedQueryParams) {
                // the developer has not defined a controller but *has* supplied route query params.
                // Generate a class for them so we can later insert default values
                controller = (0, _internals.generateController)(owner, controllerName);
                combinedQueryParameterConfiguration = queryParameterConfiguraton;
            }
            var qps = [];
            var map = {};
            var propertyNames = [];
            for (var propName in combinedQueryParameterConfiguration) {
                if (!Object.prototype.hasOwnProperty.call(combinedQueryParameterConfiguration, propName)) {
                    continue;
                }
                // to support the dubious feature of using unknownProperty
                // on queryParams configuration
                if (propName === 'unknownProperty' || propName === '_super') {
                    // possible todo: issue deprecation warning?
                    continue;
                }
                var desc = combinedQueryParameterConfiguration[propName];
                (false && !(desc) && (0, _debug.assert)(`[BUG] missing query parameter configuration for ${propName}`, desc));
                var scope = desc.scope || 'model';
                var parts = undefined;
                if (scope === 'controller') {
                    parts = [];
                }
                var urlKey = desc.as || this.serializeQueryParamKey(propName);
                var defaultValue = (0, _object.get)(controller, propName);
                defaultValue = copyDefaultValue(defaultValue);
                var type = desc.type || (0, _utils.typeOf)(defaultValue);
                var defaultValueSerialized = this.serializeQueryParam(defaultValue, urlKey, type);
                var scopedPropertyName = `${controllerName}:${propName}`;
                var qp = {
                    undecoratedDefaultValue: (0, _object.get)(controller, propName),
                    defaultValue,
                    serializedDefaultValue: defaultValueSerialized,
                    serializedValue: defaultValueSerialized,
                    type,
                    urlKey,
                    prop: propName,
                    scopedPropertyName,
                    controllerName,
                    route: this,
                    parts,
                    values: null,
                    scope
                };
                map[propName] = map[urlKey] = map[scopedPropertyName] = qp;
                qps.push(qp);
                propertyNames.push(propName);
            }
            return {
                qps,
                map,
                propertyNames,
                states: {
                    /*
                      Called when a query parameter changes in the URL, this route cares
                      about that query parameter, but the route is not currently
                      in the active route hierarchy.
                    */
                    inactive: (prop, value) => {
                        var qp = map[prop];
                        (false && !(qp) && (0, _debug.assert)('expected inactive callback to only be called for registered qps', qp));
                        this._qpChanged(prop, value, qp);
                    },
                    /*
                      Called when a query parameter changes in the URL, this route cares
                      about that query parameter, and the route is currently
                      in the active route hierarchy.
                    */
                    active: (prop, value) => {
                        var qp = map[prop];
                        (false && !(qp) && (0, _debug.assert)('expected active callback to only be called for registered qps', qp));
                        this._qpChanged(prop, value, qp);
                        return this._activeQPChanged(qp, value);
                    },
                    /*
                      Called when a value of a query parameter this route handles changes in a controller
                      and the route is currently in the active route hierarchy.
                    */
                    allowOverrides: (prop, value) => {
                        var qp = map[prop];
                        (false && !(qp) && (0, _debug.assert)('expected allowOverrides callback to only be called for registered qps', qp));
                        this._qpChanged(prop, value, qp);
                        return this._updatingQPChanged(qp);
                    }
                }
            };
        }
    }
    Route.isRouteFactory = true;
    __decorate([_object.computed], Route.prototype, "_store", null);
    __decorate([_object.computed], Route.prototype, "_qp", null);

    function parentRoute(route) {
        var routeInfo = routeInfoFor(route, route._router._routerMicrolib.state.routeInfos, -1);
        return routeInfo && routeInfo.route;
    }

    function routeInfoFor(route, routeInfos, offset) {
        if (offset === void 0) {
            offset = 0;
        }
        if (!routeInfos) {
            return;
        }
        var current;
        for (var i = 0; i < routeInfos.length; i++) {
            var routeInfo = routeInfos[i];
            (false && !(routeInfo) && (0, _debug.assert)('has current routeInfo', routeInfo));
            current = routeInfo.route;
            if (current === route) {
                return routeInfos[i + offset];
            }
        }
        return;
    }

    function buildRenderOptions(route, nameOrOptions, options) {
        var isDefaultRender = !nameOrOptions && !options;
        var _name;
        if (!isDefaultRender) {
            if (typeof nameOrOptions === 'object' && !options) {
                _name = route.templateName || route.routeName;
                options = nameOrOptions;
            } else {
                (false && !(!(0, _utils.isEmpty)(nameOrOptions)) && (0, _debug.assert)('The name in the given arguments is undefined or empty string', !(0, _utils.isEmpty)(nameOrOptions))); // SAFETY: the check for `nameOrOptions` above should be validating this,
                // and as of TS 5.1.0-dev.2023-0417 it is *not*. This cast can go away if
                // TS validates it correctly *or* if we refactor this entire function to
                // be less wildly dynamic in its argument handling.
                _name = nameOrOptions;
            }
        }
        (false && !(isDefaultRender || !(options && 'outlet' in options && options.outlet === undefined)) && (0, _debug.assert)('You passed undefined as the outlet name.', isDefaultRender || !(options && 'outlet' in options && options.outlet === undefined)));
        var owner = (0, _owner.getOwner)(route);
        (false && !(owner) && (0, _debug.assert)('Route is unexpectedly missing an owner', owner));
        var name, templateName, into, outlet, model;
        var controller;
        if (options) {
            into = options.into && options.into.replace(/\//g, '.');
            outlet = options.outlet;
            controller = options.controller;
            model = options.model;
        }
        outlet = outlet || 'main';
        if (isDefaultRender) {
            name = route.routeName;
            templateName = route.templateName || name;
        } else {
            name = _name.replace(/\//g, '.');
            templateName = name;
        }
        if (controller === undefined) {
            if (isDefaultRender) {
                controller = route.controllerName || owner.lookup(`controller:${name}`);
            } else {
                controller = owner.lookup(`controller:${name}`) || route.controllerName || route.routeName;
            }
        }
        if (typeof controller === 'string') {
            var controllerName = controller;
            controller = owner.lookup(`controller:${controllerName}`);
            (false && !(isDefaultRender || controller !== undefined) && (0, _debug.assert)(`You passed \`controller: '${controllerName}'\` into the \`render\` method, but no such controller could be found.`, isDefaultRender || controller !== undefined));
        }
        (false && !(controller instanceof _controller2.default) && (0, _debug.assert)('Expected an instance of controller', controller instanceof _controller2.default));
        if (model === undefined) {
            model = route.currentModel;
        } else {
            controller.set('model', model);
        }
        var template = owner.lookup(`template:${templateName}`);
        (false && !(isDefaultRender || template !== undefined) && (0, _debug.assert)(`Could not find "${templateName}" template, view, or component.`, isDefaultRender || template !== undefined));
        var parent;
        if (into && (parent = parentRoute(route)) && into === parent.routeName) {
            into = undefined;
        }
        var renderOptions = {
            owner,
            into,
            outlet,
            name,
            controller,
            model,
            template: template !== undefined ? template(owner) : route._topLevelViewTemplate(owner)
        };
        if (false /* DEBUG */ ) {
            var LOG_VIEW_LOOKUPS = (0, _object.get)(route._router, 'namespace.LOG_VIEW_LOOKUPS');
            if (LOG_VIEW_LOOKUPS && !template) {
                (0, _debug.info)(`Could not find "${name}" template. Nothing will be rendered`, {
                    fullName: `template:${name}`
                });
            }
        }
        return renderOptions;
    }

    function getFullQueryParams(router, state) {
        if (state.fullQueryParams) {
            return state.fullQueryParams;
        }
        var haveAllRouteInfosResolved = state.routeInfos.every(routeInfo => routeInfo.route);
        var fullQueryParamsState = {
            ...state.queryParams
        };
        router._deserializeQueryParams(state.routeInfos, fullQueryParamsState);
        // only cache query params state if all routeinfos have resolved; it's possible
        // for lazy routes to not have resolved when `getFullQueryParams` is called, so
        // we wait until all routes have resolved prior to caching query params state
        if (haveAllRouteInfosResolved) {
            state.fullQueryParams = fullQueryParamsState;
        }
        return fullQueryParamsState;
    }

    function getQueryParamsFor(route, state) {
        state.queryParamsFor = state.queryParamsFor || {};
        var name = route.fullRouteName;
        var existing = state.queryParamsFor[name];
        if (existing) {
            return existing;
        }
        var fullQueryParams = getFullQueryParams(route._router, state);
        var params = state.queryParamsFor[name] = {};
        // Copy over all the query params for this route/controller into params hash.
        // SAFETY: Since `_qp` is protected we can't infer the type
        var qps = (0, _object.get)(route, '_qp').qps;
        for (var qp of qps) {
            // Put deserialized qp on params hash.
            var qpValueWasPassedIn = qp.prop in fullQueryParams;
            params[qp.prop] = qpValueWasPassedIn ? fullQueryParams[qp.prop] : copyDefaultValue(qp.defaultValue);
        }
        return params;
    }
    // FIXME: This should probably actually return a `NativeArray` if the passed in value is an Array.
    function copyDefaultValue(value) {
        if (Array.isArray(value)) {
            // SAFETY: We lost the type data about the array if we don't cast.
            return (0, _array.A)(value.slice());
        }
        return value;
    }
    /*
      Merges all query parameters from a controller with those from
      a route, returning a new object and avoiding any mutations to
      the existing objects.
    */
    function mergeEachQueryParams(controllerQP, routeQP) {
        var qps = {};
        var keysAlreadyMergedOrSkippable = {
            defaultValue: true,
            type: true,
            scope: true,
            as: true
        };
        // first loop over all controller qps, merging them with any matching route qps
        // into a new empty object to avoid mutating.
        for (var cqpName in controllerQP) {
            if (!Object.prototype.hasOwnProperty.call(controllerQP, cqpName)) {
                continue;
            }
            qps[cqpName] = {
                ...controllerQP[cqpName],
                ...routeQP[cqpName]
            };
            // allows us to skip this QP when we check route QPs.
            keysAlreadyMergedOrSkippable[cqpName] = true;
        }
        // loop over all route qps, skipping those that were merged in the first pass
        // because they also appear in controller qps
        for (var rqpName in routeQP) {
            if (!Object.prototype.hasOwnProperty.call(routeQP, rqpName) || keysAlreadyMergedOrSkippable[rqpName]) {
                continue;
            }
            qps[rqpName] = {
                ...routeQP[rqpName],
                ...controllerQP[rqpName]
            };
        }
        return qps;
    }

    function addQueryParamsObservers(controller, propNames) {
        propNames.forEach(prop => {
            if ((0, _metal.descriptorForProperty)(controller, prop) === undefined) {
                var desc = (0, _utils2.lookupDescriptor)(controller, prop);
                if (desc !== null && (typeof desc.get === 'function' || typeof desc.set === 'function')) {
                    (0, _metal.defineProperty)(controller, prop, (0, _compat.dependentKeyCompat)({
                        get: desc.get,
                        set: desc.set
                    }));
                }
            }
            (0, _metal.addObserver)(controller, `${prop}.[]`, controller, controller._qpChanged, false);
        });
    }

    function getEngineRouteName(engine, routeName) {
        if (engine.routable) {
            var prefix = engine.mountPoint;
            if (routeName === 'application') {
                return prefix;
            } else {
                return `${prefix}.${routeName}`;
            }
        }
        return routeName;
    }
    var defaultSerialize = _exports.defaultSerialize = Route.prototype.serialize;

    function hasDefaultSerialize(route) {
        return route.serialize === defaultSerialize;
    }
    // Set these here so they can be overridden with extend
    Route.reopen({
        mergedProperties: ['queryParams'],
        queryParams: {},
        templateName: null,
        controllerName: null,
        send() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }
            (false && !(!this.isDestroying && !this.isDestroyed) && (0, _debug.assert)(`Attempted to call .send() with the action '${args[0]}' on the destroyed route '${this.routeName}'.`, !this.isDestroying && !this.isDestroyed));
            if (this._router && this._router._routerMicrolib || !(0, _debug.isTesting)()) {
                this._router.send(...args);
            } else {
                var name = args.shift();
                var action = this.actions[name];
                if (action) {
                    return action.apply(this, args);
                }
            }
        },
        /**
          The controller associated with this route.
             Example
             ```app/routes/form.js
          import Route from '@ember/routing/route';
          import { action } from '@ember/object';
             export default class FormRoute extends Route {
            @action
            willTransition(transition) {
              if (this.controller.get('userHasEnteredData') &&
                  !confirm('Are you sure you want to abandon progress?')) {
                transition.abort();
              } else {
                // Bubble the `willTransition` action so that
                // parent routes can decide whether or not to abort.
                return true;
              }
            }
          }
          ```
             @property controller
          @type Controller
          @since 1.6.0
          @public
        */
        actions: {
            /**
            This action is called when one or more query params have changed. Bubbles.
                 @method queryParamsDidChange
            @param changed {Object} Keys are names of query params that have changed.
            @param totalPresent {Object} Keys are names of query params that are currently set.
            @param removed {Object} Keys are names of query params that have been removed.
            @returns {boolean}
            @private
            */
            queryParamsDidChange(changed, _totalPresent, removed) {
                // SAFETY: Since `_qp` is protected we can't infer the type
                var qpMap = (0, _object.get)(this, '_qp').map;
                var totalChanged = Object.keys(changed).concat(Object.keys(removed));
                for (var change of totalChanged) {
                    var qp = qpMap[change];
                    if (qp) {
                        var options = this._optionsForQueryParam(qp);
                        (false && !(options && typeof options === 'object') && (0, _debug.assert)('options exists', options && typeof options === 'object'));
                        if ((0, _object.get)(options, 'refreshModel') && this._router.currentState) {
                            this.refresh();
                            break;
                        }
                    }
                }
                return true;
            },
            finalizeQueryParamChange(params, finalParams, transition) {
                if (this.fullRouteName !== 'application') {
                    return true;
                }
                // Transition object is absent for intermediate transitions.
                if (!transition) {
                    return;
                }
                var routeInfos = transition[_router_js.STATE_SYMBOL].routeInfos;
                var router = this._router;
                var qpMeta = router._queryParamsFor(routeInfos);
                var changes = router._qpUpdates;
                var qpUpdated = false;
                var replaceUrl;
                (0, _utils3.stashParamNames)(router, routeInfos);
                for (var qp of qpMeta.qps) {
                    var route = qp.route;
                    var controller = route.controller;
                    var presentKey = qp.urlKey in params && qp.urlKey;
                    // Do a reverse lookup to see if the changed query
                    // param URL key corresponds to a QP property on
                    // this controller.
                    var value = void 0;
                    var svalue = void 0;
                    if (changes.has(qp.urlKey)) {
                        // Value updated in/before setupController
                        value = (0, _object.get)(controller, qp.prop);
                        svalue = route.serializeQueryParam(value, qp.urlKey, qp.type);
                    } else {
                        if (presentKey) {
                            svalue = params[presentKey];
                            if (svalue !== undefined) {
                                value = route.deserializeQueryParam(svalue, qp.urlKey, qp.type);
                            }
                        } else {
                            // No QP provided; use default value.
                            svalue = qp.serializedDefaultValue;
                            value = copyDefaultValue(qp.defaultValue);
                        }
                    }
                    // SAFETY: Since `_qp` is protected we can't infer the type
                    controller._qpDelegate = (0, _object.get)(route, '_qp').states.inactive;
                    var thisQueryParamChanged = svalue !== qp.serializedValue;
                    if (thisQueryParamChanged) {
                        if (transition.queryParamsOnly && replaceUrl !== false) {
                            var options = route._optionsForQueryParam(qp);
                            var replaceConfigValue = (0, _object.get)(options, 'replace');
                            if (replaceConfigValue) {
                                replaceUrl = true;
                            } else if (replaceConfigValue === false) {
                                // Explicit pushState wins over any other replaceStates.
                                replaceUrl = false;
                            }
                        }
                        (0, _object.set)(controller, qp.prop, value);
                        qpUpdated = true;
                    }
                    // Stash current serialized value of controller.
                    qp.serializedValue = svalue;
                    var thisQueryParamHasDefaultValue = qp.serializedDefaultValue === svalue;
                    if (!thisQueryParamHasDefaultValue) {
                        finalParams.push({
                            value: svalue,
                            visible: true,
                            key: presentKey || qp.urlKey
                        });
                    }
                }
                // Some QPs have been updated, and those changes need to be propogated
                // immediately. Eventually, we should work on making this async somehow.
                if (qpUpdated === true) {
                    (0, _metal.flushAsyncObservers)(false);
                }
                if (replaceUrl) {
                    transition.method('replace');
                }
                qpMeta.qps.forEach(qp => {
                    // SAFETY: Since `_qp` is protected we can't infer the type
                    var routeQpMeta = (0, _object.get)(qp.route, '_qp');
                    var finalizedController = qp.route.controller;
                    finalizedController['_qpDelegate'] = (0, _object.get)(routeQpMeta, 'states.active');
                });
                router._qpUpdates.clear();
                return;
            }
        }
    });
    var _default = _exports.default = Route;
});