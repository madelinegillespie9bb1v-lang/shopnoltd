define("@ember/routing/lib/utils", ["exports", "@ember/-internals/metal", "@ember/-internals/owner", "@ember/debug", "@ember/engine/instance", "router_js"], function(_exports, _metal, _owner, _debug, _instance, _router_js) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.calculateCacheKey = calculateCacheKey;
    _exports.extractRouteArgs = extractRouteArgs;
    _exports.getActiveTargetName = getActiveTargetName;
    _exports.normalizeControllerQueryParams = normalizeControllerQueryParams;
    _exports.prefixRouteNameArg = prefixRouteNameArg;
    _exports.resemblesURL = resemblesURL;
    _exports.shallowEqual = shallowEqual;
    _exports.stashParamNames = stashParamNames;
    var ALL_PERIODS_REGEX = /\./g;

    function extractRouteArgs(args) {
        // SAFETY: This should just be the same thing
        args = args.slice();
        var possibleOptions = args[args.length - 1];
        var queryParams;
        if (isRouteOptions(possibleOptions)) {
            args.pop(); // Remove options
            queryParams = possibleOptions.queryParams;
        } else {
            queryParams = {};
        }
        var routeName;
        if (typeof args[0] === 'string') {
            routeName = args.shift();
            // We just checked this!
            (false && !(typeof routeName === 'string') && (0, _debug.assert)('routeName is a string', typeof routeName === 'string'));
        }
        // SAFTEY: We removed the name and options if they existed, only models left.
        var models = args;
        return {
            routeName,
            models,
            queryParams
        };
    }

    function getActiveTargetName(router) {
        var routeInfos = router.activeTransition ? router.activeTransition[_router_js.STATE_SYMBOL].routeInfos : router.state.routeInfos;
        var lastRouteInfo = routeInfos[routeInfos.length - 1];
        (false && !(lastRouteInfo) && (0, _debug.assert)('has last route info', lastRouteInfo));
        return lastRouteInfo.name;
    }

    function stashParamNames(router, routeInfos) {
        if (routeInfos['_namesStashed']) {
            return;
        }
        // This helper exists because router.js/route-recognizer.js awkwardly
        // keeps separate a routeInfo's list of parameter names depending
        // on whether a URL transition or named transition is happening.
        // Hopefully we can remove this in the future.
        var routeInfo = routeInfos[routeInfos.length - 1];
        (false && !(routeInfo) && (0, _debug.assert)('has route info', routeInfo));
        var targetRouteName = routeInfo.name;
        var recogHandlers = router._routerMicrolib.recognizer.handlersFor(targetRouteName);
        var dynamicParent;
        for (var i = 0; i < routeInfos.length; ++i) {
            var _routeInfo = routeInfos[i];
            (false && !(_routeInfo) && (0, _debug.assert)('has route info', _routeInfo));
            var names = recogHandlers[i].names;
            if (names.length) {
                dynamicParent = _routeInfo;
            }
            _routeInfo['_names'] = names;
            var route = _routeInfo.route;
            route._stashNames(_routeInfo, dynamicParent);
        }
        routeInfos['_namesStashed'] = true;
    }

    function _calculateCacheValuePrefix(prefix, part) {
        // calculates the dot separated sections from prefix that are also
        // at the start of part - which gives us the route name
        // given : prefix = site.article.comments, part = site.article.id
        //      - returns: site.article (use get(values[site.article], 'id') to get the dynamic part - used below)
        // given : prefix = site.article, part = site.article.id
        //      - returns: site.article. (use get(values[site.article], 'id') to get the dynamic part - used below)
        var prefixParts = prefix.split('.');
        var currPrefix = '';
        for (var i = 0; i < prefixParts.length; i++) {
            var currPart = prefixParts.slice(0, i + 1).join('.');
            if (part.indexOf(currPart) !== 0) {
                break;
            }
            currPrefix = currPart;
        }
        return currPrefix;
    }
    /*
      Stolen from Controller
    */
    function calculateCacheKey(prefix, parts, values) {
        if (parts === void 0) {
            parts = [];
        }
        var suffixes = '';
        for (var part of parts) {
            var cacheValuePrefix = _calculateCacheValuePrefix(prefix, part);
            var value = void 0;
            if (values) {
                if (cacheValuePrefix && cacheValuePrefix in values) {
                    var partRemovedPrefix = part.indexOf(cacheValuePrefix) === 0 ? part.substring(cacheValuePrefix.length + 1) : part;
                    value = (0, _metal.get)(values[cacheValuePrefix], partRemovedPrefix);
                } else {
                    value = (0, _metal.get)(values, part);
                }
            }
            suffixes += `::${part}:${value}`;
        }
        return prefix + suffixes.replace(ALL_PERIODS_REGEX, '-');
    }
    /*
      Controller-defined query parameters can come in three shapes:
  
      Array
        queryParams: ['foo', 'bar']
      Array of simple objects where value is an alias
        queryParams: [
          {
            'foo': 'rename_foo_to_this'
          },
          {
            'bar': 'call_bar_this_instead'
          }
        ]
      Array of fully defined objects
        queryParams: [
          {
            'foo': {
              as: 'rename_foo_to_this'
            },
          }
          {
            'bar': {
              as: 'call_bar_this_instead',
              scope: 'controller'
            }
          }
        ]
  
      This helper normalizes all three possible styles into the
      'Array of fully defined objects' style.
    */
    function normalizeControllerQueryParams(queryParams) {
        var qpMap = {};
        for (var queryParam of queryParams) {
            accumulateQueryParamDescriptors(queryParam, qpMap);
        }
        return qpMap;
    }

    function accumulateQueryParamDescriptors(_desc, accum) {
        var desc = typeof _desc === 'string' ? {
            [_desc]: {
                as: null
            }
        } : _desc;
        for (var key in desc) {
            if (!Object.prototype.hasOwnProperty.call(desc, key)) {
                return;
            }
            var _singleDesc = desc[key];
            var singleDesc = typeof _singleDesc === 'string' ? {
                as: _singleDesc
            } : _singleDesc;
            var partialVal = accum[key] || {
                as: null,
                scope: 'model'
            };
            var val = {
                ...partialVal,
                ...singleDesc
            };
            accum[key] = val;
        }
    }
    /*
      Check if a routeName resembles a url instead
  
      @private
    */
    function resemblesURL(str) {
        return typeof str === 'string' && (str === '' || str[0] === '/');
    }
    /*
      Returns an arguments array where the route name arg is prefixed based on the mount point
  
      @private
    */
    function prefixRouteNameArg(route, args) {
        var routeName;
        var owner = (0, _owner.getOwner)(route);
        (false && !(owner instanceof _instance.default) && (0, _debug.assert)('Expected route to have EngineInstance as owner', owner instanceof _instance.default));
        var prefix = owner.mountPoint;
        // only alter the routeName if it's actually referencing a route.
        if (owner.routable && typeof args[0] === 'string') {
            routeName = args[0];
            if (resemblesURL(routeName)) {
                throw new Error('Programmatic transitions by URL cannot be used within an Engine. Please use the route name instead.');
            } else {
                routeName = `${prefix}.${routeName}`;
                args[0] = routeName;
            }
        }
        return args;
    }

    function shallowEqual(a, b) {
        var aCount = 0;
        var bCount = 0;
        for (var kA in a) {
            if (Object.prototype.hasOwnProperty.call(a, kA)) {
                if (a[kA] !== b[kA]) {
                    return false;
                }
                aCount++;
            }
        }
        for (var kB in b) {
            if (Object.prototype.hasOwnProperty.call(b, kB)) {
                bCount++;
            }
        }
        return aCount === bCount;
    }

    function isRouteOptions(value) {
        if (value && typeof value === 'object') {
            var qps = value.queryParams;
            if (qps && typeof qps === 'object') {
                return Object.keys(qps).every(k => typeof k === 'string');
            }
        }
        return false;
    }
});