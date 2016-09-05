(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Backbone.BabySitter
// -------------------
// v0.1.11
//
// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.babysitter

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return factory(Backbone, _);
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(Backbone, _);
  } else {
    factory(root.Backbone, root._);
  }

}(this, function(Backbone, _) {
  'use strict';

  var previousChildViewContainer = Backbone.ChildViewContainer;

  // BabySitter.ChildViewContainer
  // -----------------------------
  //
  // Provide a container to store, retrieve and
  // shut down child views.
  
  Backbone.ChildViewContainer = (function (Backbone, _) {
  
    // Container Constructor
    // ---------------------
  
    var Container = function(views){
      this._views = {};
      this._indexByModel = {};
      this._indexByCustom = {};
      this._updateLength();
  
      _.each(views, this.add, this);
    };
  
    // Container Methods
    // -----------------
  
    _.extend(Container.prototype, {
  
      // Add a view to this container. Stores the view
      // by `cid` and makes it searchable by the model
      // cid (and model itself). Optionally specify
      // a custom key to store an retrieve the view.
      add: function(view, customIndex){
        var viewCid = view.cid;
  
        // store the view
        this._views[viewCid] = view;
  
        // index it by model
        if (view.model){
          this._indexByModel[view.model.cid] = viewCid;
        }
  
        // index by custom
        if (customIndex){
          this._indexByCustom[customIndex] = viewCid;
        }
  
        this._updateLength();
        return this;
      },
  
      // Find a view by the model that was attached to
      // it. Uses the model's `cid` to find it.
      findByModel: function(model){
        return this.findByModelCid(model.cid);
      },
  
      // Find a view by the `cid` of the model that was attached to
      // it. Uses the model's `cid` to find the view `cid` and
      // retrieve the view using it.
      findByModelCid: function(modelCid){
        var viewCid = this._indexByModel[modelCid];
        return this.findByCid(viewCid);
      },
  
      // Find a view by a custom indexer.
      findByCustom: function(index){
        var viewCid = this._indexByCustom[index];
        return this.findByCid(viewCid);
      },
  
      // Find by index. This is not guaranteed to be a
      // stable index.
      findByIndex: function(index){
        return _.values(this._views)[index];
      },
  
      // retrieve a view by its `cid` directly
      findByCid: function(cid){
        return this._views[cid];
      },
  
      // Remove a view
      remove: function(view){
        var viewCid = view.cid;
  
        // delete model index
        if (view.model){
          delete this._indexByModel[view.model.cid];
        }
  
        // delete custom index
        _.any(this._indexByCustom, function(cid, key) {
          if (cid === viewCid) {
            delete this._indexByCustom[key];
            return true;
          }
        }, this);
  
        // remove the view from the container
        delete this._views[viewCid];
  
        // update the length
        this._updateLength();
        return this;
      },
  
      // Call a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.call`.
      call: function(method){
        this.apply(method, _.tail(arguments));
      },
  
      // Apply a method on every view in the container,
      // passing parameters to the call method one at a
      // time, like `function.apply`.
      apply: function(method, args){
        _.each(this._views, function(view){
          if (_.isFunction(view[method])){
            view[method].apply(view, args || []);
          }
        });
      },
  
      // Update the `.length` attribute on this container
      _updateLength: function(){
        this.length = _.size(this._views);
      }
    });
  
    // Borrowing this code from Backbone.Collection:
    // http://backbonejs.org/docs/backbone.html#section-106
    //
    // Mix in methods from Underscore, for iteration, and other
    // collection related features.
    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
      'select', 'reject', 'every', 'all', 'some', 'any', 'include',
      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
      'last', 'without', 'isEmpty', 'pluck', 'reduce'];
  
    _.each(methods, function(method) {
      Container.prototype[method] = function() {
        var views = _.values(this._views);
        var args = [views].concat(_.toArray(arguments));
        return _[method].apply(_, args);
      };
    });
  
    // return the public API
    return Container;
  })(Backbone, _);
  

  Backbone.ChildViewContainer.VERSION = '0.1.11';

  Backbone.ChildViewContainer.noConflict = function () {
    Backbone.ChildViewContainer = previousChildViewContainer;
    return this;
  };

  return Backbone.ChildViewContainer;

}));

},{"backbone":7,"underscore":33}],2:[function(require,module,exports){
// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v2.4.1
//
// Copyright (c)2015 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com

(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'backbone.wreqr', 'backbone.babysitter'], function(Backbone, _) {
      return (root.Marionette = root.Mn = factory(root, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var Wreqr = require('backbone.wreqr');
    var BabySitter = require('backbone.babysitter');
    module.exports = factory(root, Backbone, _);
  } else {
    root.Marionette = root.Mn = factory(root, root.Backbone, root._);
  }

}(this, function(root, Backbone, _) {
  'use strict';

  var previousMarionette = root.Marionette;
  var previousMn = root.Mn;

  var Marionette = Backbone.Marionette = {};

  Marionette.VERSION = '2.4.1';

  Marionette.noConflict = function() {
    root.Marionette = previousMarionette;
    root.Mn = previousMn;
    return this;
  };

  // Get the Deferred creator for later use
  Marionette.Deferred = Backbone.$.Deferred;

  Marionette.FEATURES = {
  };
  
  Marionette.isEnabled = function(name) {
    return !!Marionette.FEATURES[name];
  };
  
  /* jshint unused: false *//* global console */
  
  // Helpers
  // -------
  
  // Marionette.extend
  // -----------------
  
  // Borrow the Backbone `extend` method so we can use it as needed
  Marionette.extend = Backbone.Model.extend;
  
  // Marionette.isNodeAttached
  // -------------------------
  
  // Determine if `el` is a child of the document
  Marionette.isNodeAttached = function(el) {
    return Backbone.$.contains(document.documentElement, el);
  };
  
  // Merge `keys` from `options` onto `this`
  Marionette.mergeOptions = function(options, keys) {
    if (!options) { return; }
    _.extend(this, _.pick(options, keys));
  };
  
  // Marionette.getOption
  // --------------------
  
  // Retrieve an object, function or other value from a target
  // object or its `options`, with `options` taking precedence.
  Marionette.getOption = function(target, optionName) {
    if (!target || !optionName) { return; }
    if (target.options && (target.options[optionName] !== undefined)) {
      return target.options[optionName];
    } else {
      return target[optionName];
    }
  };
  
  // Proxy `Marionette.getOption`
  Marionette.proxyGetOption = function(optionName) {
    return Marionette.getOption(this, optionName);
  };
  
  // Similar to `_.result`, this is a simple helper
  // If a function is provided we call it with context
  // otherwise just return the value. If the value is
  // undefined return a default value
  Marionette._getValue = function(value, context, params) {
    if (_.isFunction(value)) {
      value = params ? value.apply(context, params) : value.call(context);
    }
    return value;
  };
  
  // Marionette.normalizeMethods
  // ----------------------
  
  // Pass in a mapping of events => functions or function names
  // and return a mapping of events => functions
  Marionette.normalizeMethods = function(hash) {
    return _.reduce(hash, function(normalizedHash, method, name) {
      if (!_.isFunction(method)) {
        method = this[method];
      }
      if (method) {
        normalizedHash[name] = method;
      }
      return normalizedHash;
    }, {}, this);
  };
  
  // utility method for parsing @ui. syntax strings
  // into associated selector
  Marionette.normalizeUIString = function(uiString, ui) {
    return uiString.replace(/@ui\.[a-zA-Z_$0-9]*/g, function(r) {
      return ui[r.slice(4)];
    });
  };
  
  // allows for the use of the @ui. syntax within
  // a given key for triggers and events
  // swaps the @ui with the associated selector.
  // Returns a new, non-mutated, parsed events hash.
  Marionette.normalizeUIKeys = function(hash, ui) {
    return _.reduce(hash, function(memo, val, key) {
      var normalizedKey = Marionette.normalizeUIString(key, ui);
      memo[normalizedKey] = val;
      return memo;
    }, {});
  };
  
  // allows for the use of the @ui. syntax within
  // a given value for regions
  // swaps the @ui with the associated selector
  Marionette.normalizeUIValues = function(hash, ui, properties) {
    _.each(hash, function(val, key) {
      if (_.isString(val)) {
        hash[key] = Marionette.normalizeUIString(val, ui);
      } else if (_.isObject(val) && _.isArray(properties)) {
        _.extend(val, Marionette.normalizeUIValues(_.pick(val, properties), ui));
        /* Value is an object, and we got an array of embedded property names to normalize. */
        _.each(properties, function(property) {
          var propertyVal = val[property];
          if (_.isString(propertyVal)) {
            val[property] = Marionette.normalizeUIString(propertyVal, ui);
          }
        });
      }
    });
    return hash;
  };
  
  // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  // Borrowing this code from Backbone.Collection:
  // http://backbonejs.org/docs/backbone.html#section-121
  Marionette.actAsCollection = function(object, listProperty) {
    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
      'select', 'reject', 'every', 'all', 'some', 'any', 'include',
      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
      'last', 'without', 'isEmpty', 'pluck'];
  
    _.each(methods, function(method) {
      object[method] = function() {
        var list = _.values(_.result(this, listProperty));
        var args = [list].concat(_.toArray(arguments));
        return _[method].apply(_, args);
      };
    });
  };
  
  var deprecate = Marionette.deprecate = function(message, test) {
    if (_.isObject(message)) {
      message = (
        message.prev + ' is going to be removed in the future. ' +
        'Please use ' + message.next + ' instead.' +
        (message.url ? ' See: ' + message.url : '')
      );
    }
  
    if ((test === undefined || !test) && !deprecate._cache[message]) {
      deprecate._warn('Deprecation warning: ' + message);
      deprecate._cache[message] = true;
    }
  };
  
  deprecate._warn = typeof console !== 'undefined' && (console.warn || console.log) || function() {};
  deprecate._cache = {};
  
  /* jshint maxstatements: 14, maxcomplexity: 7 */
  
  // Trigger Method
  // --------------
  
  Marionette._triggerMethod = (function() {
    // split the event name on the ":"
    var splitter = /(^|:)(\w)/gi;
  
    // take the event section ("section1:section2:section3")
    // and turn it in to uppercase name
    function getEventName(match, prefix, eventName) {
      return eventName.toUpperCase();
    }
  
    return function(context, event, args) {
      var noEventArg = arguments.length < 3;
      if (noEventArg) {
        args = event;
        event = args[0];
      }
  
      // get the method name from the event name
      var methodName = 'on' + event.replace(splitter, getEventName);
      var method = context[methodName];
      var result;
  
      // call the onMethodName if it exists
      if (_.isFunction(method)) {
        // pass all args, except the event name
        result = method.apply(context, noEventArg ? _.rest(args) : args);
      }
  
      // trigger the event, if a trigger method exists
      if (_.isFunction(context.trigger)) {
        if (noEventArg + args.length > 1) {
          context.trigger.apply(context, noEventArg ? args : [event].concat(_.drop(args, 0)));
        } else {
          context.trigger(event);
        }
      }
  
      return result;
    };
  })();
  
  // Trigger an event and/or a corresponding method name. Examples:
  //
  // `this.triggerMethod("foo")` will trigger the "foo" event and
  // call the "onFoo" method.
  //
  // `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
  // call the "onFooBar" method.
  Marionette.triggerMethod = function(event) {
    return Marionette._triggerMethod(this, arguments);
  };
  
  // triggerMethodOn invokes triggerMethod on a specific context
  //
  // e.g. `Marionette.triggerMethodOn(view, 'show')`
  // will trigger a "show" event or invoke onShow the view.
  Marionette.triggerMethodOn = function(context) {
    var fnc = _.isFunction(context.triggerMethod) ?
                  context.triggerMethod :
                  Marionette.triggerMethod;
  
    return fnc.apply(context, _.rest(arguments));
  };
  
  // DOM Refresh
  // -----------
  
  // Monitor a view's state, and after it has been rendered and shown
  // in the DOM, trigger a "dom:refresh" event every time it is
  // re-rendered.
  
  Marionette.MonitorDOMRefresh = function(view) {
  
    // track when the view has been shown in the DOM,
    // using a Marionette.Region (or by other means of triggering "show")
    function handleShow() {
      view._isShown = true;
      triggerDOMRefresh();
    }
  
    // track when the view has been rendered
    function handleRender() {
      view._isRendered = true;
      triggerDOMRefresh();
    }
  
    // Trigger the "dom:refresh" event and corresponding "onDomRefresh" method
    function triggerDOMRefresh() {
      if (view._isShown && view._isRendered && Marionette.isNodeAttached(view.el)) {
        if (_.isFunction(view.triggerMethod)) {
          view.triggerMethod('dom:refresh');
        }
      }
    }
  
    view.on({
      show: handleShow,
      render: handleRender
    });
  };
  
  /* jshint maxparams: 5 */
  
  // Bind Entity Events & Unbind Entity Events
  // -----------------------------------------
  //
  // These methods are used to bind/unbind a backbone "entity" (e.g. collection/model)
  // to methods on a target object.
  //
  // The first parameter, `target`, must have the Backbone.Events module mixed in.
  //
  // The second parameter is the `entity` (Backbone.Model, Backbone.Collection or
  // any object that has Backbone.Events mixed in) to bind the events from.
  //
  // The third parameter is a hash of { "event:name": "eventHandler" }
  // configuration. Multiple handlers can be separated by a space. A
  // function can be supplied instead of a string handler name.
  
  (function(Marionette) {
    'use strict';
  
    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function bindFromStrings(target, entity, evt, methods) {
      var methodNames = methods.split(/\s+/);
  
      _.each(methodNames, function(methodName) {
  
        var method = target[methodName];
        if (!method) {
          throw new Marionette.Error('Method "' + methodName +
            '" was configured as an event handler, but does not exist.');
        }
  
        target.listenTo(entity, evt, method);
      });
    }
  
    // Bind the event to a supplied callback function
    function bindToFunction(target, entity, evt, method) {
      target.listenTo(entity, evt, method);
    }
  
    // Bind the event to handlers specified as a string of
    // handler names on the target object
    function unbindFromStrings(target, entity, evt, methods) {
      var methodNames = methods.split(/\s+/);
  
      _.each(methodNames, function(methodName) {
        var method = target[methodName];
        target.stopListening(entity, evt, method);
      });
    }
  
    // Bind the event to a supplied callback function
    function unbindToFunction(target, entity, evt, method) {
      target.stopListening(entity, evt, method);
    }
  
    // generic looping function
    function iterateEvents(target, entity, bindings, functionCallback, stringCallback) {
      if (!entity || !bindings) { return; }
  
      // type-check bindings
      if (!_.isObject(bindings)) {
        throw new Marionette.Error({
          message: 'Bindings must be an object or function.',
          url: 'marionette.functions.html#marionettebindentityevents'
        });
      }
  
      // allow the bindings to be a function
      bindings = Marionette._getValue(bindings, target);
  
      // iterate the bindings and bind them
      _.each(bindings, function(methods, evt) {
  
        // allow for a function as the handler,
        // or a list of event names as a string
        if (_.isFunction(methods)) {
          functionCallback(target, entity, evt, methods);
        } else {
          stringCallback(target, entity, evt, methods);
        }
  
      });
    }
  
    // Export Public API
    Marionette.bindEntityEvents = function(target, entity, bindings) {
      iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
    };
  
    Marionette.unbindEntityEvents = function(target, entity, bindings) {
      iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
    };
  
    // Proxy `bindEntityEvents`
    Marionette.proxyBindEntityEvents = function(entity, bindings) {
      return Marionette.bindEntityEvents(this, entity, bindings);
    };
  
    // Proxy `unbindEntityEvents`
    Marionette.proxyUnbindEntityEvents = function(entity, bindings) {
      return Marionette.unbindEntityEvents(this, entity, bindings);
    };
  })(Marionette);
  

  // Error
  // -----
  
  var errorProps = ['description', 'fileName', 'lineNumber', 'name', 'message', 'number'];
  
  Marionette.Error = Marionette.extend.call(Error, {
    urlRoot: 'http://marionettejs.com/docs/v' + Marionette.VERSION + '/',
  
    constructor: function(message, options) {
      if (_.isObject(message)) {
        options = message;
        message = options.message;
      } else if (!options) {
        options = {};
      }
  
      var error = Error.call(this, message);
      _.extend(this, _.pick(error, errorProps), _.pick(options, errorProps));
  
      this.captureStackTrace();
  
      if (options.url) {
        this.url = this.urlRoot + options.url;
      }
    },
  
    captureStackTrace: function() {
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Marionette.Error);
      }
    },
  
    toString: function() {
      return this.name + ': ' + this.message + (this.url ? ' See: ' + this.url : '');
    }
  });
  
  Marionette.Error.extend = Marionette.extend;
  
  // Callbacks
  // ---------
  
  // A simple way of managing a collection of callbacks
  // and executing them at a later point in time, using jQuery's
  // `Deferred` object.
  Marionette.Callbacks = function() {
    this._deferred = Marionette.Deferred();
    this._callbacks = [];
  };
  
  _.extend(Marionette.Callbacks.prototype, {
  
    // Add a callback to be executed. Callbacks added here are
    // guaranteed to execute, even if they are added after the
    // `run` method is called.
    add: function(callback, contextOverride) {
      var promise = _.result(this._deferred, 'promise');
  
      this._callbacks.push({cb: callback, ctx: contextOverride});
  
      promise.then(function(args) {
        if (contextOverride) { args.context = contextOverride; }
        callback.call(args.context, args.options);
      });
    },
  
    // Run all registered callbacks with the context specified.
    // Additional callbacks can be added after this has been run
    // and they will still be executed.
    run: function(options, context) {
      this._deferred.resolve({
        options: options,
        context: context
      });
    },
  
    // Resets the list of callbacks to be run, allowing the same list
    // to be run multiple times - whenever the `run` method is called.
    reset: function() {
      var callbacks = this._callbacks;
      this._deferred = Marionette.Deferred();
      this._callbacks = [];
  
      _.each(callbacks, function(cb) {
        this.add(cb.cb, cb.ctx);
      }, this);
    }
  });
  
  // Controller
  // ----------
  
  // A multi-purpose object to use as a controller for
  // modules and routers, and as a mediator for workflow
  // and coordination of other objects, views, and more.
  Marionette.Controller = function(options) {
    this.options = options || {};
  
    if (_.isFunction(this.initialize)) {
      this.initialize(this.options);
    }
  };
  
  Marionette.Controller.extend = Marionette.extend;
  
  // Controller Methods
  // --------------
  
  // Ensure it can trigger events with Backbone.Events
  _.extend(Marionette.Controller.prototype, Backbone.Events, {
    destroy: function() {
      Marionette._triggerMethod(this, 'before:destroy', arguments);
      Marionette._triggerMethod(this, 'destroy', arguments);
  
      this.stopListening();
      this.off();
      return this;
    },
  
    // import the `triggerMethod` to trigger events with corresponding
    // methods if the method exists
    triggerMethod: Marionette.triggerMethod,
  
    // A handy way to merge options onto the instance
    mergeOptions: Marionette.mergeOptions,
  
    // Proxy `getOption` to enable getting options from this or this.options by name.
    getOption: Marionette.proxyGetOption
  
  });
  
  // Object
  // ------
  
  // A Base Class that other Classes should descend from.
  // Object borrows many conventions and utilities from Backbone.
  Marionette.Object = function(options) {
    this.options = _.extend({}, _.result(this, 'options'), options);
  
    this.initialize.apply(this, arguments);
  };
  
  Marionette.Object.extend = Marionette.extend;
  
  // Object Methods
  // --------------
  
  // Ensure it can trigger events with Backbone.Events
  _.extend(Marionette.Object.prototype, Backbone.Events, {
  
    //this is a noop method intended to be overridden by classes that extend from this base
    initialize: function() {},
  
    destroy: function() {
      this.triggerMethod('before:destroy');
      this.triggerMethod('destroy');
      this.stopListening();
  
      return this;
    },
  
    // Import the `triggerMethod` to trigger events with corresponding
    // methods if the method exists
    triggerMethod: Marionette.triggerMethod,
  
    // A handy way to merge options onto the instance
    mergeOptions: Marionette.mergeOptions,
  
    // Proxy `getOption` to enable getting options from this or this.options by name.
    getOption: Marionette.proxyGetOption,
  
    // Proxy `bindEntityEvents` to enable binding view's events from another entity.
    bindEntityEvents: Marionette.proxyBindEntityEvents,
  
    // Proxy `unbindEntityEvents` to enable unbinding view's events from another entity.
    unbindEntityEvents: Marionette.proxyUnbindEntityEvents
  });
  
  /* jshint maxcomplexity: 16, maxstatements: 45, maxlen: 120 */
  
  // Region
  // ------
  
  // Manage the visual regions of your composite application. See
  // http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
  
  Marionette.Region = Marionette.Object.extend({
    constructor: function(options) {
  
      // set options temporarily so that we can get `el`.
      // options will be overriden by Object.constructor
      this.options = options || {};
      this.el = this.getOption('el');
  
      // Handle when this.el is passed in as a $ wrapped element.
      this.el = this.el instanceof Backbone.$ ? this.el[0] : this.el;
  
      if (!this.el) {
        throw new Marionette.Error({
          name: 'NoElError',
          message: 'An "el" must be specified for a region.'
        });
      }
  
      this.$el = this.getEl(this.el);
      Marionette.Object.call(this, options);
    },
  
    // Displays a backbone view instance inside of the region.
    // Handles calling the `render` method for you. Reads content
    // directly from the `el` attribute. Also calls an optional
    // `onShow` and `onDestroy` method on your view, just after showing
    // or just before destroying the view, respectively.
    // The `preventDestroy` option can be used to prevent a view from
    // the old view being destroyed on show.
    // The `forceShow` option can be used to force a view to be
    // re-rendered if it's already shown in the region.
    show: function(view, options) {
      if (!this._ensureElement()) {
        return;
      }
  
      this._ensureViewIsIntact(view);
  
      var showOptions     = options || {};
      var isDifferentView = view !== this.currentView;
      var preventDestroy  = !!showOptions.preventDestroy;
      var forceShow       = !!showOptions.forceShow;
  
      // We are only changing the view if there is a current view to change to begin with
      var isChangingView = !!this.currentView;
  
      // Only destroy the current view if we don't want to `preventDestroy` and if
      // the view given in the first argument is different than `currentView`
      var _shouldDestroyView = isDifferentView && !preventDestroy;
  
      // Only show the view given in the first argument if it is different than
      // the current view or if we want to re-show the view. Note that if
      // `_shouldDestroyView` is true, then `_shouldShowView` is also necessarily true.
      var _shouldShowView = isDifferentView || forceShow;
  
      if (isChangingView) {
        this.triggerMethod('before:swapOut', this.currentView, this, options);
      }
  
      if (this.currentView) {
        delete this.currentView._parent;
      }
  
      if (_shouldDestroyView) {
        this.empty();
  
      // A `destroy` event is attached to the clean up manually removed views.
      // We need to detach this event when a new view is going to be shown as it
      // is no longer relevant.
      } else if (isChangingView && _shouldShowView) {
        this.currentView.off('destroy', this.empty, this);
      }
  
      if (_shouldShowView) {
  
        // We need to listen for if a view is destroyed
        // in a way other than through the region.
        // If this happens we need to remove the reference
        // to the currentView since once a view has been destroyed
        // we can not reuse it.
        view.once('destroy', this.empty, this);
        view.render();
  
        view._parent = this;
  
        if (isChangingView) {
          this.triggerMethod('before:swap', view, this, options);
        }
  
        this.triggerMethod('before:show', view, this, options);
        Marionette.triggerMethodOn(view, 'before:show', view, this, options);
  
        if (isChangingView) {
          this.triggerMethod('swapOut', this.currentView, this, options);
        }
  
        // An array of views that we're about to display
        var attachedRegion = Marionette.isNodeAttached(this.el);
  
        // The views that we're about to attach to the document
        // It's important that we prevent _getNestedViews from being executed unnecessarily
        // as it's a potentially-slow method
        var displayedViews = [];
  
        var triggerBeforeAttach = showOptions.triggerBeforeAttach || this.triggerBeforeAttach;
        var triggerAttach = showOptions.triggerAttach || this.triggerAttach;
  
        if (attachedRegion && triggerBeforeAttach) {
          displayedViews = this._displayedViews(view);
          this._triggerAttach(displayedViews, 'before:');
        }
  
        this.attachHtml(view);
        this.currentView = view;
  
        if (attachedRegion && triggerAttach) {
          displayedViews = this._displayedViews(view);
          this._triggerAttach(displayedViews);
        }
  
        if (isChangingView) {
          this.triggerMethod('swap', view, this, options);
        }
  
        this.triggerMethod('show', view, this, options);
        Marionette.triggerMethodOn(view, 'show', view, this, options);
  
        return this;
      }
  
      return this;
    },
  
    triggerBeforeAttach: true,
    triggerAttach: true,
  
    _triggerAttach: function(views, prefix) {
      var eventName = (prefix || '') + 'attach';
      _.each(views, function(view) {
        Marionette.triggerMethodOn(view, eventName, view, this);
      }, this);
    },
  
    _displayedViews: function(view) {
      return _.union([view], _.result(view, '_getNestedViews') || []);
    },
  
    _ensureElement: function() {
      if (!_.isObject(this.el)) {
        this.$el = this.getEl(this.el);
        this.el = this.$el[0];
      }
  
      if (!this.$el || this.$el.length === 0) {
        if (this.getOption('allowMissingEl')) {
          return false;
        } else {
          throw new Marionette.Error('An "el" ' + this.$el.selector + ' must exist in DOM');
        }
      }
      return true;
    },
  
    _ensureViewIsIntact: function(view) {
      if (!view) {
        throw new Marionette.Error({
          name: 'ViewNotValid',
          message: 'The view passed is undefined and therefore invalid. You must pass a view instance to show.'
        });
      }
  
      if (view.isDestroyed) {
        throw new Marionette.Error({
          name: 'ViewDestroyedError',
          message: 'View (cid: "' + view.cid + '") has already been destroyed and cannot be used.'
        });
      }
    },
  
    // Override this method to change how the region finds the DOM
    // element that it manages. Return a jQuery selector object scoped
    // to a provided parent el or the document if none exists.
    getEl: function(el) {
      return Backbone.$(el, Marionette._getValue(this.options.parentEl, this));
    },
  
    // Override this method to change how the new view is
    // appended to the `$el` that the region is managing
    attachHtml: function(view) {
      this.$el.contents().detach();
  
      this.el.appendChild(view.el);
    },
  
    // Destroy the current view, if there is one. If there is no
    // current view, it does nothing and returns immediately.
    empty: function(options) {
      var view = this.currentView;
  
      var preventDestroy = Marionette._getValue(options, 'preventDestroy', this);
      // If there is no view in the region
      // we should not remove anything
      if (!view) { return; }
  
      view.off('destroy', this.empty, this);
      this.triggerMethod('before:empty', view);
      if (!preventDestroy) {
        this._destroyView();
      }
      this.triggerMethod('empty', view);
  
      // Remove region pointer to the currentView
      delete this.currentView;
  
      if (preventDestroy) {
        this.$el.contents().detach();
      }
  
      return this;
    },
  
    // call 'destroy' or 'remove', depending on which is found
    // on the view (if showing a raw Backbone view or a Marionette View)
    _destroyView: function() {
      var view = this.currentView;
  
      if (view.destroy && !view.isDestroyed) {
        view.destroy();
      } else if (view.remove) {
        view.remove();
  
        // appending isDestroyed to raw Backbone View allows regions
        // to throw a ViewDestroyedError for this view
        view.isDestroyed = true;
      }
    },
  
    // Attach an existing view to the region. This
    // will not call `render` or `onShow` for the new view,
    // and will not replace the current HTML for the `el`
    // of the region.
    attachView: function(view) {
      this.currentView = view;
      return this;
    },
  
    // Checks whether a view is currently present within
    // the region. Returns `true` if there is and `false` if
    // no view is present.
    hasView: function() {
      return !!this.currentView;
    },
  
    // Reset the region by destroying any existing view and
    // clearing out the cached `$el`. The next time a view
    // is shown via this region, the region will re-query the
    // DOM for the region's `el`.
    reset: function() {
      this.empty();
  
      if (this.$el) {
        this.el = this.$el.selector;
      }
  
      delete this.$el;
      return this;
    }
  
  },
  
  // Static Methods
  {
  
    // Build an instance of a region by passing in a configuration object
    // and a default region class to use if none is specified in the config.
    //
    // The config object should either be a string as a jQuery DOM selector,
    // a Region class directly, or an object literal that specifies a selector,
    // a custom regionClass, and any options to be supplied to the region:
    //
    // ```js
    // {
    //   selector: "#foo",
    //   regionClass: MyCustomRegion,
    //   allowMissingEl: false
    // }
    // ```
    //
    buildRegion: function(regionConfig, DefaultRegionClass) {
      if (_.isString(regionConfig)) {
        return this._buildRegionFromSelector(regionConfig, DefaultRegionClass);
      }
  
      if (regionConfig.selector || regionConfig.el || regionConfig.regionClass) {
        return this._buildRegionFromObject(regionConfig, DefaultRegionClass);
      }
  
      if (_.isFunction(regionConfig)) {
        return this._buildRegionFromRegionClass(regionConfig);
      }
  
      throw new Marionette.Error({
        message: 'Improper region configuration type.',
        url: 'marionette.region.html#region-configuration-types'
      });
    },
  
    // Build the region from a string selector like '#foo-region'
    _buildRegionFromSelector: function(selector, DefaultRegionClass) {
      return new DefaultRegionClass({el: selector});
    },
  
    // Build the region from a configuration object
    // ```js
    // { selector: '#foo', regionClass: FooRegion, allowMissingEl: false }
    // ```
    _buildRegionFromObject: function(regionConfig, DefaultRegionClass) {
      var RegionClass = regionConfig.regionClass || DefaultRegionClass;
      var options = _.omit(regionConfig, 'selector', 'regionClass');
  
      if (regionConfig.selector && !options.el) {
        options.el = regionConfig.selector;
      }
  
      return new RegionClass(options);
    },
  
    // Build the region directly from a given `RegionClass`
    _buildRegionFromRegionClass: function(RegionClass) {
      return new RegionClass();
    }
  });
  
  // Region Manager
  // --------------
  
  // Manage one or more related `Marionette.Region` objects.
  Marionette.RegionManager = Marionette.Controller.extend({
    constructor: function(options) {
      this._regions = {};
      this.length = 0;
  
      Marionette.Controller.call(this, options);
  
      this.addRegions(this.getOption('regions'));
    },
  
    // Add multiple regions using an object literal or a
    // function that returns an object literal, where
    // each key becomes the region name, and each value is
    // the region definition.
    addRegions: function(regionDefinitions, defaults) {
      regionDefinitions = Marionette._getValue(regionDefinitions, this, arguments);
  
      return _.reduce(regionDefinitions, function(regions, definition, name) {
        if (_.isString(definition)) {
          definition = {selector: definition};
        }
        if (definition.selector) {
          definition = _.defaults({}, definition, defaults);
        }
  
        regions[name] = this.addRegion(name, definition);
        return regions;
      }, {}, this);
    },
  
    // Add an individual region to the region manager,
    // and return the region instance
    addRegion: function(name, definition) {
      var region;
  
      if (definition instanceof Marionette.Region) {
        region = definition;
      } else {
        region = Marionette.Region.buildRegion(definition, Marionette.Region);
      }
  
      this.triggerMethod('before:add:region', name, region);
  
      region._parent = this;
      this._store(name, region);
  
      this.triggerMethod('add:region', name, region);
      return region;
    },
  
    // Get a region by name
    get: function(name) {
      return this._regions[name];
    },
  
    // Gets all the regions contained within
    // the `regionManager` instance.
    getRegions: function() {
      return _.clone(this._regions);
    },
  
    // Remove a region by name
    removeRegion: function(name) {
      var region = this._regions[name];
      this._remove(name, region);
  
      return region;
    },
  
    // Empty all regions in the region manager, and
    // remove them
    removeRegions: function() {
      var regions = this.getRegions();
      _.each(this._regions, function(region, name) {
        this._remove(name, region);
      }, this);
  
      return regions;
    },
  
    // Empty all regions in the region manager, but
    // leave them attached
    emptyRegions: function() {
      var regions = this.getRegions();
      _.invoke(regions, 'empty');
      return regions;
    },
  
    // Destroy all regions and shut down the region
    // manager entirely
    destroy: function() {
      this.removeRegions();
      return Marionette.Controller.prototype.destroy.apply(this, arguments);
    },
  
    // internal method to store regions
    _store: function(name, region) {
      if (!this._regions[name]) {
        this.length++;
      }
  
      this._regions[name] = region;
    },
  
    // internal method to remove a region
    _remove: function(name, region) {
      this.triggerMethod('before:remove:region', name, region);
      region.empty();
      region.stopListening();
  
      delete region._parent;
      delete this._regions[name];
      this.length--;
      this.triggerMethod('remove:region', name, region);
    }
  });
  
  Marionette.actAsCollection(Marionette.RegionManager.prototype, '_regions');
  

  // Template Cache
  // --------------
  
  // Manage templates stored in `<script>` blocks,
  // caching them for faster access.
  Marionette.TemplateCache = function(templateId) {
    this.templateId = templateId;
  };
  
  // TemplateCache object-level methods. Manage the template
  // caches from these method calls instead of creating
  // your own TemplateCache instances
  _.extend(Marionette.TemplateCache, {
    templateCaches: {},
  
    // Get the specified template by id. Either
    // retrieves the cached version, or loads it
    // from the DOM.
    get: function(templateId, options) {
      var cachedTemplate = this.templateCaches[templateId];
  
      if (!cachedTemplate) {
        cachedTemplate = new Marionette.TemplateCache(templateId);
        this.templateCaches[templateId] = cachedTemplate;
      }
  
      return cachedTemplate.load(options);
    },
  
    // Clear templates from the cache. If no arguments
    // are specified, clears all templates:
    // `clear()`
    //
    // If arguments are specified, clears each of the
    // specified templates from the cache:
    // `clear("#t1", "#t2", "...")`
    clear: function() {
      var i;
      var args = _.toArray(arguments);
      var length = args.length;
  
      if (length > 0) {
        for (i = 0; i < length; i++) {
          delete this.templateCaches[args[i]];
        }
      } else {
        this.templateCaches = {};
      }
    }
  });
  
  // TemplateCache instance methods, allowing each
  // template cache object to manage its own state
  // and know whether or not it has been loaded
  _.extend(Marionette.TemplateCache.prototype, {
  
    // Internal method to load the template
    load: function(options) {
      // Guard clause to prevent loading this template more than once
      if (this.compiledTemplate) {
        return this.compiledTemplate;
      }
  
      // Load the template and compile it
      var template = this.loadTemplate(this.templateId, options);
      this.compiledTemplate = this.compileTemplate(template, options);
  
      return this.compiledTemplate;
    },
  
    // Load a template from the DOM, by default. Override
    // this method to provide your own template retrieval
    // For asynchronous loading with AMD/RequireJS, consider
    // using a template-loader plugin as described here:
    // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
    loadTemplate: function(templateId, options) {
      var template = Backbone.$(templateId).html();
  
      if (!template || template.length === 0) {
        throw new Marionette.Error({
          name: 'NoTemplateError',
          message: 'Could not find template: "' + templateId + '"'
        });
      }
  
      return template;
    },
  
    // Pre-compile the template before caching it. Override
    // this method if you do not need to pre-compile a template
    // (JST / RequireJS for example) or if you want to change
    // the template engine used (Handebars, etc).
    compileTemplate: function(rawTemplate, options) {
      return _.template(rawTemplate, options);
    }
  });
  
  // Renderer
  // --------
  
  // Render a template with data by passing in the template
  // selector and the data to render.
  Marionette.Renderer = {
  
    // Render a template with data. The `template` parameter is
    // passed to the `TemplateCache` object to retrieve the
    // template function. Override this method to provide your own
    // custom rendering and template handling for all of Marionette.
    render: function(template, data) {
      if (!template) {
        throw new Marionette.Error({
          name: 'TemplateNotFoundError',
          message: 'Cannot render the template since its false, null or undefined.'
        });
      }
  
      var templateFunc = _.isFunction(template) ? template : Marionette.TemplateCache.get(template);
  
      return templateFunc(data);
    }
  };
  

  /* jshint maxlen: 114, nonew: false */
  // View
  // ----
  
  // The core view class that other Marionette views extend from.
  Marionette.View = Backbone.View.extend({
    isDestroyed: false,
  
    constructor: function(options) {
      _.bindAll(this, 'render');
  
      options = Marionette._getValue(options, this);
  
      // this exposes view options to the view initializer
      // this is a backfill since backbone removed the assignment
      // of this.options
      // at some point however this may be removed
      this.options = _.extend({}, _.result(this, 'options'), options);
  
      this._behaviors = Marionette.Behaviors(this);
  
      Backbone.View.call(this, this.options);
  
      Marionette.MonitorDOMRefresh(this);
    },
  
    // Get the template for this view
    // instance. You can set a `template` attribute in the view
    // definition or pass a `template: "whatever"` parameter in
    // to the constructor options.
    getTemplate: function() {
      return this.getOption('template');
    },
  
    // Serialize a model by returning its attributes. Clones
    // the attributes to allow modification.
    serializeModel: function(model) {
      return model.toJSON.apply(model, _.rest(arguments));
    },
  
    // Mix in template helper methods. Looks for a
    // `templateHelpers` attribute, which can either be an
    // object literal, or a function that returns an object
    // literal. All methods and attributes from this object
    // are copies to the object passed in.
    mixinTemplateHelpers: function(target) {
      target = target || {};
      var templateHelpers = this.getOption('templateHelpers');
      templateHelpers = Marionette._getValue(templateHelpers, this);
      return _.extend(target, templateHelpers);
    },
  
    // normalize the keys of passed hash with the views `ui` selectors.
    // `{"@ui.foo": "bar"}`
    normalizeUIKeys: function(hash) {
      var uiBindings = _.result(this, '_uiBindings');
      return Marionette.normalizeUIKeys(hash, uiBindings || _.result(this, 'ui'));
    },
  
    // normalize the values of passed hash with the views `ui` selectors.
    // `{foo: "@ui.bar"}`
    normalizeUIValues: function(hash, properties) {
      var ui = _.result(this, 'ui');
      var uiBindings = _.result(this, '_uiBindings');
      return Marionette.normalizeUIValues(hash, uiBindings || ui, properties);
    },
  
    // Configure `triggers` to forward DOM events to view
    // events. `triggers: {"click .foo": "do:foo"}`
    configureTriggers: function() {
      if (!this.triggers) { return; }
  
      // Allow `triggers` to be configured as a function
      var triggers = this.normalizeUIKeys(_.result(this, 'triggers'));
  
      // Configure the triggers, prevent default
      // action and stop propagation of DOM events
      return _.reduce(triggers, function(events, value, key) {
        events[key] = this._buildViewTrigger(value);
        return events;
      }, {}, this);
    },
  
    // Overriding Backbone.View's delegateEvents to handle
    // the `triggers`, `modelEvents`, and `collectionEvents` configuration
    delegateEvents: function(events) {
      this._delegateDOMEvents(events);
      this.bindEntityEvents(this.model, this.getOption('modelEvents'));
      this.bindEntityEvents(this.collection, this.getOption('collectionEvents'));
  
      _.each(this._behaviors, function(behavior) {
        behavior.bindEntityEvents(this.model, behavior.getOption('modelEvents'));
        behavior.bindEntityEvents(this.collection, behavior.getOption('collectionEvents'));
      }, this);
  
      return this;
    },
  
    // internal method to delegate DOM events and triggers
    _delegateDOMEvents: function(eventsArg) {
      var events = Marionette._getValue(eventsArg || this.events, this);
  
      // normalize ui keys
      events = this.normalizeUIKeys(events);
      if (_.isUndefined(eventsArg)) {this.events = events;}
  
      var combinedEvents = {};
  
      // look up if this view has behavior events
      var behaviorEvents = _.result(this, 'behaviorEvents') || {};
      var triggers = this.configureTriggers();
      var behaviorTriggers = _.result(this, 'behaviorTriggers') || {};
  
      // behavior events will be overriden by view events and or triggers
      _.extend(combinedEvents, behaviorEvents, events, triggers, behaviorTriggers);
  
      Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
    },
  
    // Overriding Backbone.View's undelegateEvents to handle unbinding
    // the `triggers`, `modelEvents`, and `collectionEvents` config
    undelegateEvents: function() {
      Backbone.View.prototype.undelegateEvents.apply(this, arguments);
  
      this.unbindEntityEvents(this.model, this.getOption('modelEvents'));
      this.unbindEntityEvents(this.collection, this.getOption('collectionEvents'));
  
      _.each(this._behaviors, function(behavior) {
        behavior.unbindEntityEvents(this.model, behavior.getOption('modelEvents'));
        behavior.unbindEntityEvents(this.collection, behavior.getOption('collectionEvents'));
      }, this);
  
      return this;
    },
  
    // Internal helper method to verify whether the view hasn't been destroyed
    _ensureViewIsIntact: function() {
      if (this.isDestroyed) {
        throw new Marionette.Error({
          name: 'ViewDestroyedError',
          message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
        });
      }
    },
  
    // Default `destroy` implementation, for removing a view from the
    // DOM and unbinding it. Regions will call this method
    // for you. You can specify an `onDestroy` method in your view to
    // add custom code that is called after the view is destroyed.
    destroy: function() {
      if (this.isDestroyed) { return this; }
  
      var args = _.toArray(arguments);
  
      this.triggerMethod.apply(this, ['before:destroy'].concat(args));
  
      // mark as destroyed before doing the actual destroy, to
      // prevent infinite loops within "destroy" event handlers
      // that are trying to destroy other views
      this.isDestroyed = true;
      this.triggerMethod.apply(this, ['destroy'].concat(args));
  
      // unbind UI elements
      this.unbindUIElements();
  
      this.isRendered = false;
  
      // remove the view from the DOM
      this.remove();
  
      // Call destroy on each behavior after
      // destroying the view.
      // This unbinds event listeners
      // that behaviors have registered for.
      _.invoke(this._behaviors, 'destroy', args);
  
      return this;
    },
  
    bindUIElements: function() {
      this._bindUIElements();
      _.invoke(this._behaviors, this._bindUIElements);
    },
  
    // This method binds the elements specified in the "ui" hash inside the view's code with
    // the associated jQuery selectors.
    _bindUIElements: function() {
      if (!this.ui) { return; }
  
      // store the ui hash in _uiBindings so they can be reset later
      // and so re-rendering the view will be able to find the bindings
      if (!this._uiBindings) {
        this._uiBindings = this.ui;
      }
  
      // get the bindings result, as a function or otherwise
      var bindings = _.result(this, '_uiBindings');
  
      // empty the ui so we don't have anything to start with
      this.ui = {};
  
      // bind each of the selectors
      _.each(bindings, function(selector, key) {
        this.ui[key] = this.$(selector);
      }, this);
    },
  
    // This method unbinds the elements specified in the "ui" hash
    unbindUIElements: function() {
      this._unbindUIElements();
      _.invoke(this._behaviors, this._unbindUIElements);
    },
  
    _unbindUIElements: function() {
      if (!this.ui || !this._uiBindings) { return; }
  
      // delete all of the existing ui bindings
      _.each(this.ui, function($el, name) {
        delete this.ui[name];
      }, this);
  
      // reset the ui element to the original bindings configuration
      this.ui = this._uiBindings;
      delete this._uiBindings;
    },
  
    // Internal method to create an event handler for a given `triggerDef` like
    // 'click:foo'
    _buildViewTrigger: function(triggerDef) {
      var hasOptions = _.isObject(triggerDef);
  
      var options = _.defaults({}, (hasOptions ? triggerDef : {}), {
        preventDefault: true,
        stopPropagation: true
      });
  
      var eventName = hasOptions ? options.event : triggerDef;
  
      return function(e) {
        if (e) {
          if (e.preventDefault && options.preventDefault) {
            e.preventDefault();
          }
  
          if (e.stopPropagation && options.stopPropagation) {
            e.stopPropagation();
          }
        }
  
        var args = {
          view: this,
          model: this.model,
          collection: this.collection
        };
  
        this.triggerMethod(eventName, args);
      };
    },
  
    setElement: function() {
      var ret = Backbone.View.prototype.setElement.apply(this, arguments);
  
      // proxy behavior $el to the view's $el.
      // This is needed because a view's $el proxy
      // is not set until after setElement is called.
      _.invoke(this._behaviors, 'proxyViewProperties', this);
  
      return ret;
    },
  
    // import the `triggerMethod` to trigger events with corresponding
    // methods if the method exists
    triggerMethod: function() {
      var ret = Marionette._triggerMethod(this, arguments);
  
      this._triggerEventOnBehaviors(arguments);
      this._triggerEventOnParentLayout(arguments[0], _.rest(arguments));
  
      return ret;
    },
  
    _triggerEventOnBehaviors: function(args) {
      var triggerMethod = Marionette._triggerMethod;
      var behaviors = this._behaviors;
      // Use good ol' for as this is a very hot function
      for (var i = 0, length = behaviors && behaviors.length; i < length; i++) {
        triggerMethod(behaviors[i], args);
      }
    },
  
    _triggerEventOnParentLayout: function(eventName, args) {
      var layoutView = this._parentLayoutView();
      if (!layoutView) {
        return;
      }
  
      // invoke triggerMethod on parent view
      var eventPrefix = Marionette.getOption(layoutView, 'childViewEventPrefix');
      var prefixedEventName = eventPrefix + ':' + eventName;
  
      Marionette._triggerMethod(layoutView, [prefixedEventName, this].concat(args));
  
      // call the parent view's childEvents handler
      var childEvents = Marionette.getOption(layoutView, 'childEvents');
      var normalizedChildEvents = layoutView.normalizeMethods(childEvents);
  
      if (!!normalizedChildEvents && _.isFunction(normalizedChildEvents[eventName])) {
        normalizedChildEvents[eventName].apply(layoutView, [this].concat(args));
      }
    },
  
    // This method returns any views that are immediate
    // children of this view
    _getImmediateChildren: function() {
      return [];
    },
  
    // Returns an array of every nested view within this view
    _getNestedViews: function() {
      var children = this._getImmediateChildren();
  
      if (!children.length) { return children; }
  
      return _.reduce(children, function(memo, view) {
        if (!view._getNestedViews) { return memo; }
        return memo.concat(view._getNestedViews());
      }, children);
    },
  
    // Internal utility for building an ancestor
    // view tree list.
    _getAncestors: function() {
      var ancestors = [];
      var parent  = this._parent;
  
      while (parent) {
        ancestors.push(parent);
        parent = parent._parent;
      }
  
      return ancestors;
    },
  
    // Returns the containing parent view.
    _parentLayoutView: function() {
      var ancestors = this._getAncestors();
      return _.find(ancestors, function(parent) {
        return parent instanceof Marionette.LayoutView;
      });
    },
  
    // Imports the "normalizeMethods" to transform hashes of
    // events=>function references/names to a hash of events=>function references
    normalizeMethods: Marionette.normalizeMethods,
  
    // A handy way to merge passed-in options onto the instance
    mergeOptions: Marionette.mergeOptions,
  
    // Proxy `getOption` to enable getting options from this or this.options by name.
    getOption: Marionette.proxyGetOption,
  
    // Proxy `bindEntityEvents` to enable binding view's events from another entity.
    bindEntityEvents: Marionette.proxyBindEntityEvents,
  
    // Proxy `unbindEntityEvents` to enable unbinding view's events from another entity.
    unbindEntityEvents: Marionette.proxyUnbindEntityEvents
  });
  
  // Item View
  // ---------
  
  // A single item view implementation that contains code for rendering
  // with underscore.js templates, serializing the view's model or collection,
  // and calling several methods on extended views, such as `onRender`.
  Marionette.ItemView = Marionette.View.extend({
  
    // Setting up the inheritance chain which allows changes to
    // Marionette.View.prototype.constructor which allows overriding
    constructor: function() {
      Marionette.View.apply(this, arguments);
    },
  
    // Serialize the model or collection for the view. If a model is
    // found, the view's `serializeModel` is called. If a collection is found,
    // each model in the collection is serialized by calling
    // the view's `serializeCollection` and put into an `items` array in
    // the resulting data. If both are found, defaults to the model.
    // You can override the `serializeData` method in your own view definition,
    // to provide custom serialization for your view's data.
    serializeData: function() {
      if (!this.model && !this.collection) {
        return {};
      }
  
      var args = [this.model || this.collection];
      if (arguments.length) {
        args.push.apply(args, arguments);
      }
  
      if (this.model) {
        return this.serializeModel.apply(this, args);
      } else {
        return {
          items: this.serializeCollection.apply(this, args)
        };
      }
    },
  
    // Serialize a collection by serializing each of its models.
    serializeCollection: function(collection) {
      return collection.toJSON.apply(collection, _.rest(arguments));
    },
  
    // Render the view, defaulting to underscore.js templates.
    // You can override this in your view definition to provide
    // a very specific rendering for your view. In general, though,
    // you should override the `Marionette.Renderer` object to
    // change how Marionette renders views.
    render: function() {
      this._ensureViewIsIntact();
  
      this.triggerMethod('before:render', this);
  
      this._renderTemplate();
      this.isRendered = true;
      this.bindUIElements();
  
      this.triggerMethod('render', this);
  
      return this;
    },
  
    // Internal method to render the template with the serialized data
    // and template helpers via the `Marionette.Renderer` object.
    // Throws an `UndefinedTemplateError` error if the template is
    // any falsely value but literal `false`.
    _renderTemplate: function() {
      var template = this.getTemplate();
  
      // Allow template-less item views
      if (template === false) {
        return;
      }
  
      if (!template) {
        throw new Marionette.Error({
          name: 'UndefinedTemplateError',
          message: 'Cannot render the template since it is null or undefined.'
        });
      }
  
      // Add in entity data and template helpers
      var data = this.mixinTemplateHelpers(this.serializeData());
  
      // Render and add to el
      var html = Marionette.Renderer.render(template, data, this);
      this.attachElContent(html);
  
      return this;
    },
  
    // Attaches the content of a given view.
    // This method can be overridden to optimize rendering,
    // or to render in a non standard way.
    //
    // For example, using `innerHTML` instead of `$el.html`
    //
    // ```js
    // attachElContent: function(html) {
    //   this.el.innerHTML = html;
    //   return this;
    // }
    // ```
    attachElContent: function(html) {
      this.$el.html(html);
  
      return this;
    }
  });
  
  /* jshint maxstatements: 14 */
  
  // Collection View
  // ---------------
  
  // A view that iterates over a Backbone.Collection
  // and renders an individual child view for each model.
  Marionette.CollectionView = Marionette.View.extend({
  
    // used as the prefix for child view events
    // that are forwarded through the collectionview
    childViewEventPrefix: 'childview',
  
    // flag for maintaining the sorted order of the collection
    sort: true,
  
    // constructor
    // option to pass `{sort: false}` to prevent the `CollectionView` from
    // maintaining the sorted order of the collection.
    // This will fallback onto appending childView's to the end.
    //
    // option to pass `{comparator: compFunction()}` to allow the `CollectionView`
    // to use a custom sort order for the collection.
    constructor: function(options) {
  
      this.once('render', this._initialEvents);
      this._initChildViewStorage();
  
      Marionette.View.apply(this, arguments);
  
      this.on('show', this._onShowCalled);
  
      this.initRenderBuffer();
    },
  
    // Instead of inserting elements one by one into the page,
    // it's much more performant to insert elements into a document
    // fragment and then insert that document fragment into the page
    initRenderBuffer: function() {
      this._bufferedChildren = [];
    },
  
    startBuffering: function() {
      this.initRenderBuffer();
      this.isBuffering = true;
    },
  
    endBuffering: function() {
      this.isBuffering = false;
      this._triggerBeforeShowBufferedChildren();
  
      this.attachBuffer(this);
  
      this._triggerShowBufferedChildren();
      this.initRenderBuffer();
    },
  
    _triggerBeforeShowBufferedChildren: function() {
      if (this._isShown) {
        _.each(this._bufferedChildren, _.partial(this._triggerMethodOnChild, 'before:show'));
      }
    },
  
    _triggerShowBufferedChildren: function() {
      if (this._isShown) {
        _.each(this._bufferedChildren, _.partial(this._triggerMethodOnChild, 'show'));
  
        this._bufferedChildren = [];
      }
    },
  
    // Internal method for _.each loops to call `Marionette.triggerMethodOn` on
    // a child view
    _triggerMethodOnChild: function(event, childView) {
      Marionette.triggerMethodOn(childView, event);
    },
  
    // Configured the initial events that the collection view
    // binds to.
    _initialEvents: function() {
      if (this.collection) {
        this.listenTo(this.collection, 'add', this._onCollectionAdd);
        this.listenTo(this.collection, 'remove', this._onCollectionRemove);
        this.listenTo(this.collection, 'reset', this.render);
  
        if (this.getOption('sort')) {
          this.listenTo(this.collection, 'sort', this._sortViews);
        }
      }
    },
  
    // Handle a child added to the collection
    _onCollectionAdd: function(child, collection, opts) {
      var index;
      if (opts.at !== undefined) {
        index = opts.at;
      } else {
        index = _.indexOf(this._filteredSortedModels(), child);
      }
  
      if (this._shouldAddChild(child, index)) {
        this.destroyEmptyView();
        var ChildView = this.getChildView(child);
        this.addChild(child, ChildView, index);
      }
    },
  
    // get the child view by model it holds, and remove it
    _onCollectionRemove: function(model) {
      var view = this.children.findByModel(model);
      this.removeChildView(view);
      this.checkEmpty();
    },
  
    _onShowCalled: function() {
      this.children.each(_.partial(this._triggerMethodOnChild, 'show'));
    },
  
    // Render children views. Override this method to
    // provide your own implementation of a render function for
    // the collection view.
    render: function() {
      this._ensureViewIsIntact();
      this.triggerMethod('before:render', this);
      this._renderChildren();
      this.isRendered = true;
      this.triggerMethod('render', this);
      return this;
    },
  
    // Reorder DOM after sorting. When your element's rendering
    // do not use their index, you can pass reorderOnSort: true
    // to only reorder the DOM after a sort instead of rendering
    // all the collectionView
    reorder: function() {
      var children = this.children;
      var models = this._filteredSortedModels();
      var modelsChanged = _.find(models, function(model) {
        return !children.findByModel(model);
      });
  
      // If the models we're displaying have changed due to filtering
      // We need to add and/or remove child views
      // So render as normal
      if (modelsChanged) {
        this.render();
      } else {
        // get the DOM nodes in the same order as the models
        var els = _.map(models, function(model) {
          return children.findByModel(model).el;
        });
  
        // since append moves elements that are already in the DOM,
        // appending the elements will effectively reorder them
        this.triggerMethod('before:reorder');
        this._appendReorderedChildren(els);
        this.triggerMethod('reorder');
      }
    },
  
    // Render view after sorting. Override this method to
    // change how the view renders after a `sort` on the collection.
    // An example of this would be to only `renderChildren` in a `CompositeView`
    // rather than the full view.
    resortView: function() {
      if (Marionette.getOption(this, 'reorderOnSort')) {
        this.reorder();
      } else {
        this.render();
      }
    },
  
    // Internal method. This checks for any changes in the order of the collection.
    // If the index of any view doesn't match, it will render.
    _sortViews: function() {
      var models = this._filteredSortedModels();
  
      // check for any changes in sort order of views
      var orderChanged = _.find(models, function(item, index) {
        var view = this.children.findByModel(item);
        return !view || view._index !== index;
      }, this);
  
      if (orderChanged) {
        this.resortView();
      }
    },
  
    // Internal reference to what index a `emptyView` is.
    _emptyViewIndex: -1,
  
    // Internal method. Separated so that CompositeView can append to the childViewContainer
    // if necessary
    _appendReorderedChildren: function(children) {
      this.$el.append(children);
    },
  
    // Internal method. Separated so that CompositeView can have
    // more control over events being triggered, around the rendering
    // process
    _renderChildren: function() {
      this.destroyEmptyView();
      this.destroyChildren();
  
      if (this.isEmpty(this.collection)) {
        this.showEmptyView();
      } else {
        this.triggerMethod('before:render:collection', this);
        this.startBuffering();
        this.showCollection();
        this.endBuffering();
        this.triggerMethod('render:collection', this);
  
        // If we have shown children and none have passed the filter, show the empty view
        if (this.children.isEmpty()) {
          this.showEmptyView();
        }
      }
    },
  
    // Internal method to loop through collection and show each child view.
    showCollection: function() {
      var ChildView;
  
      var models = this._filteredSortedModels();
  
      _.each(models, function(child, index) {
        ChildView = this.getChildView(child);
        this.addChild(child, ChildView, index);
      }, this);
    },
  
    // Allow the collection to be sorted by a custom view comparator
    _filteredSortedModels: function() {
      var models;
      var viewComparator = this.getViewComparator();
  
      if (viewComparator) {
        if (_.isString(viewComparator) || viewComparator.length === 1) {
          models = this.collection.sortBy(viewComparator, this);
        } else {
          models = _.clone(this.collection.models).sort(_.bind(viewComparator, this));
        }
      } else {
        models = this.collection.models;
      }
  
      // Filter after sorting in case the filter uses the index
      if (this.getOption('filter')) {
        models = _.filter(models, function(model, index) {
          return this._shouldAddChild(model, index);
        }, this);
      }
  
      return models;
    },
  
    // Internal method to show an empty view in place of
    // a collection of child views, when the collection is empty
    showEmptyView: function() {
      var EmptyView = this.getEmptyView();
  
      if (EmptyView && !this._showingEmptyView) {
        this.triggerMethod('before:render:empty');
  
        this._showingEmptyView = true;
        var model = new Backbone.Model();
        this.addEmptyView(model, EmptyView);
  
        this.triggerMethod('render:empty');
      }
    },
  
    // Internal method to destroy an existing emptyView instance
    // if one exists. Called when a collection view has been
    // rendered empty, and then a child is added to the collection.
    destroyEmptyView: function() {
      if (this._showingEmptyView) {
        this.triggerMethod('before:remove:empty');
  
        this.destroyChildren();
        delete this._showingEmptyView;
  
        this.triggerMethod('remove:empty');
      }
    },
  
    // Retrieve the empty view class
    getEmptyView: function() {
      return this.getOption('emptyView');
    },
  
    // Render and show the emptyView. Similar to addChild method
    // but "add:child" events are not fired, and the event from
    // emptyView are not forwarded
    addEmptyView: function(child, EmptyView) {
  
      // get the emptyViewOptions, falling back to childViewOptions
      var emptyViewOptions = this.getOption('emptyViewOptions') ||
                            this.getOption('childViewOptions');
  
      if (_.isFunction(emptyViewOptions)) {
        emptyViewOptions = emptyViewOptions.call(this, child, this._emptyViewIndex);
      }
  
      // build the empty view
      var view = this.buildChildView(child, EmptyView, emptyViewOptions);
  
      view._parent = this;
  
      // Proxy emptyView events
      this.proxyChildEvents(view);
  
      // trigger the 'before:show' event on `view` if the collection view
      // has already been shown
      if (this._isShown) {
        Marionette.triggerMethodOn(view, 'before:show');
      }
  
      // Store the `emptyView` like a `childView` so we can properly
      // remove and/or close it later
      this.children.add(view);
  
      // Render it and show it
      this.renderChildView(view, this._emptyViewIndex);
  
      // call the 'show' method if the collection view
      // has already been shown
      if (this._isShown) {
        Marionette.triggerMethodOn(view, 'show');
      }
    },
  
    // Retrieve the `childView` class, either from `this.options.childView`
    // or from the `childView` in the object definition. The "options"
    // takes precedence.
    // This method receives the model that will be passed to the instance
    // created from this `childView`. Overriding methods may use the child
    // to determine what `childView` class to return.
    getChildView: function(child) {
      var childView = this.getOption('childView');
  
      if (!childView) {
        throw new Marionette.Error({
          name: 'NoChildViewError',
          message: 'A "childView" must be specified'
        });
      }
  
      return childView;
    },
  
    // Render the child's view and add it to the
    // HTML for the collection view at a given index.
    // This will also update the indices of later views in the collection
    // in order to keep the children in sync with the collection.
    addChild: function(child, ChildView, index) {
      var childViewOptions = this.getOption('childViewOptions');
      childViewOptions = Marionette._getValue(childViewOptions, this, [child, index]);
  
      var view = this.buildChildView(child, ChildView, childViewOptions);
  
      // increment indices of views after this one
      this._updateIndices(view, true, index);
  
      this._addChildView(view, index);
  
      view._parent = this;
  
      return view;
    },
  
    // Internal method. This decrements or increments the indices of views after the
    // added/removed view to keep in sync with the collection.
    _updateIndices: function(view, increment, index) {
      if (!this.getOption('sort')) {
        return;
      }
  
      if (increment) {
        // assign the index to the view
        view._index = index;
      }
  
      // update the indexes of views after this one
      this.children.each(function(laterView) {
        if (laterView._index >= view._index) {
          laterView._index += increment ? 1 : -1;
        }
      });
    },
  
    // Internal Method. Add the view to children and render it at
    // the given index.
    _addChildView: function(view, index) {
      // set up the child view event forwarding
      this.proxyChildEvents(view);
  
      this.triggerMethod('before:add:child', view);
  
      // trigger the 'before:show' event on `view` if the collection view
      // has already been shown
      if (this._isShown && !this.isBuffering) {
        Marionette.triggerMethodOn(view, 'before:show');
      }
  
      // Store the child view itself so we can properly
      // remove and/or destroy it later
      this.children.add(view);
      this.renderChildView(view, index);
  
      if (this._isShown && !this.isBuffering) {
        Marionette.triggerMethodOn(view, 'show');
      }
  
      this.triggerMethod('add:child', view);
    },
  
    // render the child view
    renderChildView: function(view, index) {
      view.render();
      this.attachHtml(this, view, index);
      return view;
    },
  
    // Build a `childView` for a model in the collection.
    buildChildView: function(child, ChildViewClass, childViewOptions) {
      var options = _.extend({model: child}, childViewOptions);
      return new ChildViewClass(options);
    },
  
    // Remove the child view and destroy it.
    // This function also updates the indices of
    // later views in the collection in order to keep
    // the children in sync with the collection.
    removeChildView: function(view) {
  
      if (view) {
        this.triggerMethod('before:remove:child', view);
  
        // call 'destroy' or 'remove', depending on which is found
        if (view.destroy) {
          view.destroy();
        } else if (view.remove) {
          view.remove();
        }
  
        delete view._parent;
        this.stopListening(view);
        this.children.remove(view);
        this.triggerMethod('remove:child', view);
  
        // decrement the index of views after this one
        this._updateIndices(view, false);
      }
  
      return view;
    },
  
    // check if the collection is empty
    isEmpty: function() {
      return !this.collection || this.collection.length === 0;
    },
  
    // If empty, show the empty view
    checkEmpty: function() {
      if (this.isEmpty(this.collection)) {
        this.showEmptyView();
      }
    },
  
    // You might need to override this if you've overridden attachHtml
    attachBuffer: function(collectionView) {
      collectionView.$el.append(this._createBuffer(collectionView));
    },
  
    // Create a fragment buffer from the currently buffered children
    _createBuffer: function(collectionView) {
      var elBuffer = document.createDocumentFragment();
      _.each(collectionView._bufferedChildren, function(b) {
        elBuffer.appendChild(b.el);
      });
      return elBuffer;
    },
  
    // Append the HTML to the collection's `el`.
    // Override this method to do something other
    // than `.append`.
    attachHtml: function(collectionView, childView, index) {
      if (collectionView.isBuffering) {
        // buffering happens on reset events and initial renders
        // in order to reduce the number of inserts into the
        // document, which are expensive.
        collectionView._bufferedChildren.splice(index, 0, childView);
      } else {
        // If we've already rendered the main collection, append
        // the new child into the correct order if we need to. Otherwise
        // append to the end.
        if (!collectionView._insertBefore(childView, index)) {
          collectionView._insertAfter(childView);
        }
      }
    },
  
    // Internal method. Check whether we need to insert the view into
    // the correct position.
    _insertBefore: function(childView, index) {
      var currentView;
      var findPosition = this.getOption('sort') && (index < this.children.length - 1);
      if (findPosition) {
        // Find the view after this one
        currentView = this.children.find(function(view) {
          return view._index === index + 1;
        });
      }
  
      if (currentView) {
        currentView.$el.before(childView.el);
        return true;
      }
  
      return false;
    },
  
    // Internal method. Append a view to the end of the $el
    _insertAfter: function(childView) {
      this.$el.append(childView.el);
    },
  
    // Internal method to set up the `children` object for
    // storing all of the child views
    _initChildViewStorage: function() {
      this.children = new Backbone.ChildViewContainer();
    },
  
    // Handle cleanup and other destroying needs for the collection of views
    destroy: function() {
      if (this.isDestroyed) { return this; }
  
      this.triggerMethod('before:destroy:collection');
      this.destroyChildren();
      this.triggerMethod('destroy:collection');
  
      return Marionette.View.prototype.destroy.apply(this, arguments);
    },
  
    // Destroy the child views that this collection view
    // is holding on to, if any
    destroyChildren: function() {
      var childViews = this.children.map(_.identity);
      this.children.each(this.removeChildView, this);
      this.checkEmpty();
      return childViews;
    },
  
    // Return true if the given child should be shown
    // Return false otherwise
    // The filter will be passed (child, index, collection)
    // Where
    //  'child' is the given model
    //  'index' is the index of that model in the collection
    //  'collection' is the collection referenced by this CollectionView
    _shouldAddChild: function(child, index) {
      var filter = this.getOption('filter');
      return !_.isFunction(filter) || filter.call(this, child, index, this.collection);
    },
  
    // Set up the child view event forwarding. Uses a "childview:"
    // prefix in front of all forwarded events.
    proxyChildEvents: function(view) {
      var prefix = this.getOption('childViewEventPrefix');
  
      // Forward all child view events through the parent,
      // prepending "childview:" to the event name
      this.listenTo(view, 'all', function() {
        var args = _.toArray(arguments);
        var rootEvent = args[0];
        var childEvents = this.normalizeMethods(_.result(this, 'childEvents'));
  
        args[0] = prefix + ':' + rootEvent;
        args.splice(1, 0, view);
  
        // call collectionView childEvent if defined
        if (typeof childEvents !== 'undefined' && _.isFunction(childEvents[rootEvent])) {
          childEvents[rootEvent].apply(this, args.slice(1));
        }
  
        this.triggerMethod.apply(this, args);
      });
    },
  
    _getImmediateChildren: function() {
      return _.values(this.children._views);
    },
  
    getViewComparator: function() {
      return this.getOption('viewComparator');
    }
  });
  
  /* jshint maxstatements: 17, maxlen: 117 */
  
  // Composite View
  // --------------
  
  // Used for rendering a branch-leaf, hierarchical structure.
  // Extends directly from CollectionView and also renders an
  // a child view as `modelView`, for the top leaf
  Marionette.CompositeView = Marionette.CollectionView.extend({
  
    // Setting up the inheritance chain which allows changes to
    // Marionette.CollectionView.prototype.constructor which allows overriding
    // option to pass '{sort: false}' to prevent the CompositeView from
    // maintaining the sorted order of the collection.
    // This will fallback onto appending childView's to the end.
    constructor: function() {
      Marionette.CollectionView.apply(this, arguments);
    },
  
    // Configured the initial events that the composite view
    // binds to. Override this method to prevent the initial
    // events, or to add your own initial events.
    _initialEvents: function() {
  
      // Bind only after composite view is rendered to avoid adding child views
      // to nonexistent childViewContainer
  
      if (this.collection) {
        this.listenTo(this.collection, 'add', this._onCollectionAdd);
        this.listenTo(this.collection, 'remove', this._onCollectionRemove);
        this.listenTo(this.collection, 'reset', this._renderChildren);
  
        if (this.getOption('sort')) {
          this.listenTo(this.collection, 'sort', this._sortViews);
        }
      }
    },
  
    // Retrieve the `childView` to be used when rendering each of
    // the items in the collection. The default is to return
    // `this.childView` or Marionette.CompositeView if no `childView`
    // has been defined
    getChildView: function(child) {
      var childView = this.getOption('childView') || this.constructor;
  
      return childView;
    },
  
    // Serialize the model for the view.
    // You can override the `serializeData` method in your own view
    // definition, to provide custom serialization for your view's data.
    serializeData: function() {
      var data = {};
  
      if (this.model) {
        data = _.partial(this.serializeModel, this.model).apply(this, arguments);
      }
  
      return data;
    },
  
    // Renders the model and the collection.
    render: function() {
      this._ensureViewIsIntact();
      this._isRendering = true;
      this.resetChildViewContainer();
  
      this.triggerMethod('before:render', this);
  
      this._renderTemplate();
      this._renderChildren();
  
      this._isRendering = false;
      this.isRendered = true;
      this.triggerMethod('render', this);
      return this;
    },
  
    _renderChildren: function() {
      if (this.isRendered || this._isRendering) {
        Marionette.CollectionView.prototype._renderChildren.call(this);
      }
    },
  
    // Render the root template that the children
    // views are appended to
    _renderTemplate: function() {
      var data = {};
      data = this.serializeData();
      data = this.mixinTemplateHelpers(data);
  
      this.triggerMethod('before:render:template');
  
      var template = this.getTemplate();
      var html = Marionette.Renderer.render(template, data, this);
      this.attachElContent(html);
  
      // the ui bindings is done here and not at the end of render since they
      // will not be available until after the model is rendered, but should be
      // available before the collection is rendered.
      this.bindUIElements();
      this.triggerMethod('render:template');
    },
  
    // Attaches the content of the root.
    // This method can be overridden to optimize rendering,
    // or to render in a non standard way.
    //
    // For example, using `innerHTML` instead of `$el.html`
    //
    // ```js
    // attachElContent: function(html) {
    //   this.el.innerHTML = html;
    //   return this;
    // }
    // ```
    attachElContent: function(html) {
      this.$el.html(html);
  
      return this;
    },
  
    // You might need to override this if you've overridden attachHtml
    attachBuffer: function(compositeView) {
      var $container = this.getChildViewContainer(compositeView);
      $container.append(this._createBuffer(compositeView));
    },
  
    // Internal method. Append a view to the end of the $el.
    // Overidden from CollectionView to ensure view is appended to
    // childViewContainer
    _insertAfter: function(childView) {
      var $container = this.getChildViewContainer(this, childView);
      $container.append(childView.el);
    },
  
    // Internal method. Append reordered childView'.
    // Overidden from CollectionView to ensure reordered views
    // are appended to childViewContainer
    _appendReorderedChildren: function(children) {
      var $container = this.getChildViewContainer(this);
      $container.append(children);
    },
  
    // Internal method to ensure an `$childViewContainer` exists, for the
    // `attachHtml` method to use.
    getChildViewContainer: function(containerView, childView) {
      if ('$childViewContainer' in containerView) {
        return containerView.$childViewContainer;
      }
  
      var container;
      var childViewContainer = Marionette.getOption(containerView, 'childViewContainer');
      if (childViewContainer) {
  
        var selector = Marionette._getValue(childViewContainer, containerView);
  
        if (selector.charAt(0) === '@' && containerView.ui) {
          container = containerView.ui[selector.substr(4)];
        } else {
          container = containerView.$(selector);
        }
  
        if (container.length <= 0) {
          throw new Marionette.Error({
            name: 'ChildViewContainerMissingError',
            message: 'The specified "childViewContainer" was not found: ' + containerView.childViewContainer
          });
        }
  
      } else {
        container = containerView.$el;
      }
  
      containerView.$childViewContainer = container;
      return container;
    },
  
    // Internal method to reset the `$childViewContainer` on render
    resetChildViewContainer: function() {
      if (this.$childViewContainer) {
        delete this.$childViewContainer;
      }
    }
  });
  
  // Layout View
  // -----------
  
  // Used for managing application layoutViews, nested layoutViews and
  // multiple regions within an application or sub-application.
  //
  // A specialized view class that renders an area of HTML and then
  // attaches `Region` instances to the specified `regions`.
  // Used for composite view management and sub-application areas.
  Marionette.LayoutView = Marionette.ItemView.extend({
    regionClass: Marionette.Region,
  
    options: {
      destroyImmediate: false
    },
  
    // used as the prefix for child view events
    // that are forwarded through the layoutview
    childViewEventPrefix: 'childview',
  
    // Ensure the regions are available when the `initialize` method
    // is called.
    constructor: function(options) {
      options = options || {};
  
      this._firstRender = true;
      this._initializeRegions(options);
  
      Marionette.ItemView.call(this, options);
    },
  
    // LayoutView's render will use the existing region objects the
    // first time it is called. Subsequent calls will destroy the
    // views that the regions are showing and then reset the `el`
    // for the regions to the newly rendered DOM elements.
    render: function() {
      this._ensureViewIsIntact();
  
      if (this._firstRender) {
        // if this is the first render, don't do anything to
        // reset the regions
        this._firstRender = false;
      } else {
        // If this is not the first render call, then we need to
        // re-initialize the `el` for each region
        this._reInitializeRegions();
      }
  
      return Marionette.ItemView.prototype.render.apply(this, arguments);
    },
  
    // Handle destroying regions, and then destroy the view itself.
    destroy: function() {
      if (this.isDestroyed) { return this; }
      // #2134: remove parent element before destroying the child views, so
      // removing the child views doesn't retrigger repaints
      if (this.getOption('destroyImmediate') === true) {
        this.$el.remove();
      }
      this.regionManager.destroy();
      return Marionette.ItemView.prototype.destroy.apply(this, arguments);
    },
  
    showChildView: function(regionName, view) {
      return this.getRegion(regionName).show(view);
    },
  
    getChildView: function(regionName) {
      return this.getRegion(regionName).currentView;
    },
  
    // Add a single region, by name, to the layoutView
    addRegion: function(name, definition) {
      var regions = {};
      regions[name] = definition;
      return this._buildRegions(regions)[name];
    },
  
    // Add multiple regions as a {name: definition, name2: def2} object literal
    addRegions: function(regions) {
      this.regions = _.extend({}, this.regions, regions);
      return this._buildRegions(regions);
    },
  
    // Remove a single region from the LayoutView, by name
    removeRegion: function(name) {
      delete this.regions[name];
      return this.regionManager.removeRegion(name);
    },
  
    // Provides alternative access to regions
    // Accepts the region name
    // getRegion('main')
    getRegion: function(region) {
      return this.regionManager.get(region);
    },
  
    // Get all regions
    getRegions: function() {
      return this.regionManager.getRegions();
    },
  
    // internal method to build regions
    _buildRegions: function(regions) {
      var defaults = {
        regionClass: this.getOption('regionClass'),
        parentEl: _.partial(_.result, this, 'el')
      };
  
      return this.regionManager.addRegions(regions, defaults);
    },
  
    // Internal method to initialize the regions that have been defined in a
    // `regions` attribute on this layoutView.
    _initializeRegions: function(options) {
      var regions;
      this._initRegionManager();
  
      regions = Marionette._getValue(this.regions, this, [options]) || {};
  
      // Enable users to define `regions` as instance options.
      var regionOptions = this.getOption.call(options, 'regions');
  
      // enable region options to be a function
      regionOptions = Marionette._getValue(regionOptions, this, [options]);
  
      _.extend(regions, regionOptions);
  
      // Normalize region selectors hash to allow
      // a user to use the @ui. syntax.
      regions = this.normalizeUIValues(regions, ['selector', 'el']);
  
      this.addRegions(regions);
    },
  
    // Internal method to re-initialize all of the regions by updating the `el` that
    // they point to
    _reInitializeRegions: function() {
      this.regionManager.invoke('reset');
    },
  
    // Enable easy overriding of the default `RegionManager`
    // for customized region interactions and business specific
    // view logic for better control over single regions.
    getRegionManager: function() {
      return new Marionette.RegionManager();
    },
  
    // Internal method to initialize the region manager
    // and all regions in it
    _initRegionManager: function() {
      this.regionManager = this.getRegionManager();
      this.regionManager._parent = this;
  
      this.listenTo(this.regionManager, 'before:add:region', function(name) {
        this.triggerMethod('before:add:region', name);
      });
  
      this.listenTo(this.regionManager, 'add:region', function(name, region) {
        this[name] = region;
        this.triggerMethod('add:region', name, region);
      });
  
      this.listenTo(this.regionManager, 'before:remove:region', function(name) {
        this.triggerMethod('before:remove:region', name);
      });
  
      this.listenTo(this.regionManager, 'remove:region', function(name, region) {
        delete this[name];
        this.triggerMethod('remove:region', name, region);
      });
    },
  
    _getImmediateChildren: function() {
      return _.chain(this.regionManager.getRegions())
        .pluck('currentView')
        .compact()
        .value();
    }
  });
  

  // Behavior
  // --------
  
  // A Behavior is an isolated set of DOM /
  // user interactions that can be mixed into any View.
  // Behaviors allow you to blackbox View specific interactions
  // into portable logical chunks, keeping your views simple and your code DRY.
  
  Marionette.Behavior = Marionette.Object.extend({
    constructor: function(options, view) {
      // Setup reference to the view.
      // this comes in handle when a behavior
      // wants to directly talk up the chain
      // to the view.
      this.view = view;
      this.defaults = _.result(this, 'defaults') || {};
      this.options  = _.extend({}, this.defaults, options);
      // Construct an internal UI hash using
      // the views UI hash and then the behaviors UI hash.
      // This allows the user to use UI hash elements
      // defined in the parent view as well as those
      // defined in the given behavior.
      this.ui = _.extend({}, _.result(view, 'ui'), _.result(this, 'ui'));
  
      Marionette.Object.apply(this, arguments);
    },
  
    // proxy behavior $ method to the view
    // this is useful for doing jquery DOM lookups
    // scoped to behaviors view.
    $: function() {
      return this.view.$.apply(this.view, arguments);
    },
  
    // Stops the behavior from listening to events.
    // Overrides Object#destroy to prevent additional events from being triggered.
    destroy: function() {
      this.stopListening();
  
      return this;
    },
  
    proxyViewProperties: function(view) {
      this.$el = view.$el;
      this.el = view.el;
    }
  });
  
  /* jshint maxlen: 143 */
  // Behaviors
  // ---------
  
  // Behaviors is a utility class that takes care of
  // gluing your behavior instances to their given View.
  // The most important part of this class is that you
  // **MUST** override the class level behaviorsLookup
  // method for things to work properly.
  
  Marionette.Behaviors = (function(Marionette, _) {
    // Borrow event splitter from Backbone
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  
    function Behaviors(view, behaviors) {
  
      if (!_.isObject(view.behaviors)) {
        return {};
      }
  
      // Behaviors defined on a view can be a flat object literal
      // or it can be a function that returns an object.
      behaviors = Behaviors.parseBehaviors(view, behaviors || _.result(view, 'behaviors'));
  
      // Wraps several of the view's methods
      // calling the methods first on each behavior
      // and then eventually calling the method on the view.
      Behaviors.wrap(view, behaviors, _.keys(methods));
      return behaviors;
    }
  
    var methods = {
      behaviorTriggers: function(behaviorTriggers, behaviors) {
        var triggerBuilder = new BehaviorTriggersBuilder(this, behaviors);
        return triggerBuilder.buildBehaviorTriggers();
      },
  
      behaviorEvents: function(behaviorEvents, behaviors) {
        var _behaviorsEvents = {};
  
        _.each(behaviors, function(b, i) {
          var _events = {};
          var behaviorEvents = _.clone(_.result(b, 'events')) || {};
  
          // Normalize behavior events hash to allow
          // a user to use the @ui. syntax.
          behaviorEvents = Marionette.normalizeUIKeys(behaviorEvents, getBehaviorsUI(b));
  
          var j = 0;
          _.each(behaviorEvents, function(behaviour, key) {
            var match     = key.match(delegateEventSplitter);
  
            // Set event name to be namespaced using the view cid,
            // the behavior index, and the behavior event index
            // to generate a non colliding event namespace
            // http://api.jquery.com/event.namespace/
            var eventName = match[1] + '.' + [this.cid, i, j++, ' '].join('');
            var selector  = match[2];
  
            var eventKey  = eventName + selector;
            var handler   = _.isFunction(behaviour) ? behaviour : b[behaviour];
  
            _events[eventKey] = _.bind(handler, b);
          }, this);
  
          _behaviorsEvents = _.extend(_behaviorsEvents, _events);
        }, this);
  
        return _behaviorsEvents;
      }
    };
  
    _.extend(Behaviors, {
  
      // Placeholder method to be extended by the user.
      // The method should define the object that stores the behaviors.
      // i.e.
      //
      // ```js
      // Marionette.Behaviors.behaviorsLookup: function() {
      //   return App.Behaviors
      // }
      // ```
      behaviorsLookup: function() {
        throw new Marionette.Error({
          message: 'You must define where your behaviors are stored.',
          url: 'marionette.behaviors.html#behaviorslookup'
        });
      },
  
      // Takes care of getting the behavior class
      // given options and a key.
      // If a user passes in options.behaviorClass
      // default to using that. Otherwise delegate
      // the lookup to the users `behaviorsLookup` implementation.
      getBehaviorClass: function(options, key) {
        if (options.behaviorClass) {
          return options.behaviorClass;
        }
  
        // Get behavior class can be either a flat object or a method
        return Marionette._getValue(Behaviors.behaviorsLookup, this, [options, key])[key];
      },
  
      // Iterate over the behaviors object, for each behavior
      // instantiate it and get its grouped behaviors.
      parseBehaviors: function(view, behaviors) {
        return _.chain(behaviors).map(function(options, key) {
          var BehaviorClass = Behaviors.getBehaviorClass(options, key);
  
          var behavior = new BehaviorClass(options, view);
          var nestedBehaviors = Behaviors.parseBehaviors(view, _.result(behavior, 'behaviors'));
  
          return [behavior].concat(nestedBehaviors);
        }).flatten().value();
      },
  
      // Wrap view internal methods so that they delegate to behaviors. For example,
      // `onDestroy` should trigger destroy on all of the behaviors and then destroy itself.
      // i.e.
      //
      // `view.delegateEvents = _.partial(methods.delegateEvents, view.delegateEvents, behaviors);`
      wrap: function(view, behaviors, methodNames) {
        _.each(methodNames, function(methodName) {
          view[methodName] = _.partial(methods[methodName], view[methodName], behaviors);
        });
      }
    });
  
    // Class to build handlers for `triggers` on behaviors
    // for views
    function BehaviorTriggersBuilder(view, behaviors) {
      this._view      = view;
      this._behaviors = behaviors;
      this._triggers  = {};
    }
  
    _.extend(BehaviorTriggersBuilder.prototype, {
      // Main method to build the triggers hash with event keys and handlers
      buildBehaviorTriggers: function() {
        _.each(this._behaviors, this._buildTriggerHandlersForBehavior, this);
        return this._triggers;
      },
  
      // Internal method to build all trigger handlers for a given behavior
      _buildTriggerHandlersForBehavior: function(behavior, i) {
        var triggersHash = _.clone(_.result(behavior, 'triggers')) || {};
  
        triggersHash = Marionette.normalizeUIKeys(triggersHash, getBehaviorsUI(behavior));
  
        _.each(triggersHash, _.bind(this._setHandlerForBehavior, this, behavior, i));
      },
  
      // Internal method to create and assign the trigger handler for a given
      // behavior
      _setHandlerForBehavior: function(behavior, i, eventName, trigger) {
        // Unique identifier for the `this._triggers` hash
        var triggerKey = trigger.replace(/^\S+/, function(triggerName) {
          return triggerName + '.' + 'behaviortriggers' + i;
        });
  
        this._triggers[triggerKey] = this._view._buildViewTrigger(eventName);
      }
    });
  
    function getBehaviorsUI(behavior) {
      return behavior._uiBindings || behavior.ui;
    }
  
    return Behaviors;
  
  })(Marionette, _);
  

  // App Router
  // ----------
  
  // Reduce the boilerplate code of handling route events
  // and then calling a single method on another object.
  // Have your routers configured to call the method on
  // your object, directly.
  //
  // Configure an AppRouter with `appRoutes`.
  //
  // App routers can only take one `controller` object.
  // It is recommended that you divide your controller
  // objects in to smaller pieces of related functionality
  // and have multiple routers / controllers, instead of
  // just one giant router and controller.
  //
  // You can also add standard routes to an AppRouter.
  
  Marionette.AppRouter = Backbone.Router.extend({
  
    constructor: function(options) {
      this.options = options || {};
  
      Backbone.Router.apply(this, arguments);
  
      var appRoutes = this.getOption('appRoutes');
      var controller = this._getController();
      this.processAppRoutes(controller, appRoutes);
      this.on('route', this._processOnRoute, this);
    },
  
    // Similar to route method on a Backbone Router but
    // method is called on the controller
    appRoute: function(route, methodName) {
      var controller = this._getController();
      this._addAppRoute(controller, route, methodName);
    },
  
    // process the route event and trigger the onRoute
    // method call, if it exists
    _processOnRoute: function(routeName, routeArgs) {
      // make sure an onRoute before trying to call it
      if (_.isFunction(this.onRoute)) {
        // find the path that matches the current route
        var routePath = _.invert(this.getOption('appRoutes'))[routeName];
        this.onRoute(routeName, routePath, routeArgs);
      }
    },
  
    // Internal method to process the `appRoutes` for the
    // router, and turn them in to routes that trigger the
    // specified method on the specified `controller`.
    processAppRoutes: function(controller, appRoutes) {
      if (!appRoutes) { return; }
  
      var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes
  
      _.each(routeNames, function(route) {
        this._addAppRoute(controller, route, appRoutes[route]);
      }, this);
    },
  
    _getController: function() {
      return this.getOption('controller');
    },
  
    _addAppRoute: function(controller, route, methodName) {
      var method = controller[methodName];
  
      if (!method) {
        throw new Marionette.Error('Method "' + methodName + '" was not found on the controller');
      }
  
      this.route(route, methodName, _.bind(method, controller));
    },
  
    mergeOptions: Marionette.mergeOptions,
  
    // Proxy `getOption` to enable getting options from this or this.options by name.
    getOption: Marionette.proxyGetOption,
  
    triggerMethod: Marionette.triggerMethod,
  
    bindEntityEvents: Marionette.proxyBindEntityEvents,
  
    unbindEntityEvents: Marionette.proxyUnbindEntityEvents
  });
  
  // Application
  // -----------
  
  // Contain and manage the composite application as a whole.
  // Stores and starts up `Region` objects, includes an
  // event aggregator as `app.vent`
  Marionette.Application = Marionette.Object.extend({
    constructor: function(options) {
      this._initializeRegions(options);
      this._initCallbacks = new Marionette.Callbacks();
      this.submodules = {};
      _.extend(this, options);
      this._initChannel();
      Marionette.Object.call(this, options);
    },
  
    // Command execution, facilitated by Backbone.Wreqr.Commands
    execute: function() {
      this.commands.execute.apply(this.commands, arguments);
    },
  
    // Request/response, facilitated by Backbone.Wreqr.RequestResponse
    request: function() {
      return this.reqres.request.apply(this.reqres, arguments);
    },
  
    // Add an initializer that is either run at when the `start`
    // method is called, or run immediately if added after `start`
    // has already been called.
    addInitializer: function(initializer) {
      this._initCallbacks.add(initializer);
    },
  
    // kick off all of the application's processes.
    // initializes all of the regions that have been added
    // to the app, and runs all of the initializer functions
    start: function(options) {
      this.triggerMethod('before:start', options);
      this._initCallbacks.run(options, this);
      this.triggerMethod('start', options);
    },
  
    // Add regions to your app.
    // Accepts a hash of named strings or Region objects
    // addRegions({something: "#someRegion"})
    // addRegions({something: Region.extend({el: "#someRegion"}) });
    addRegions: function(regions) {
      return this._regionManager.addRegions(regions);
    },
  
    // Empty all regions in the app, without removing them
    emptyRegions: function() {
      return this._regionManager.emptyRegions();
    },
  
    // Removes a region from your app, by name
    // Accepts the regions name
    // removeRegion('myRegion')
    removeRegion: function(region) {
      return this._regionManager.removeRegion(region);
    },
  
    // Provides alternative access to regions
    // Accepts the region name
    // getRegion('main')
    getRegion: function(region) {
      return this._regionManager.get(region);
    },
  
    // Get all the regions from the region manager
    getRegions: function() {
      return this._regionManager.getRegions();
    },
  
    // Create a module, attached to the application
    module: function(moduleNames, moduleDefinition) {
  
      // Overwrite the module class if the user specifies one
      var ModuleClass = Marionette.Module.getClass(moduleDefinition);
  
      var args = _.toArray(arguments);
      args.unshift(this);
  
      // see the Marionette.Module object for more information
      return ModuleClass.create.apply(ModuleClass, args);
    },
  
    // Enable easy overriding of the default `RegionManager`
    // for customized region interactions and business-specific
    // view logic for better control over single regions.
    getRegionManager: function() {
      return new Marionette.RegionManager();
    },
  
    // Internal method to initialize the regions that have been defined in a
    // `regions` attribute on the application instance
    _initializeRegions: function(options) {
      var regions = _.isFunction(this.regions) ? this.regions(options) : this.regions || {};
  
      this._initRegionManager();
  
      // Enable users to define `regions` in instance options.
      var optionRegions = Marionette.getOption(options, 'regions');
  
      // Enable region options to be a function
      if (_.isFunction(optionRegions)) {
        optionRegions = optionRegions.call(this, options);
      }
  
      // Overwrite current regions with those passed in options
      _.extend(regions, optionRegions);
  
      this.addRegions(regions);
  
      return this;
    },
  
    // Internal method to set up the region manager
    _initRegionManager: function() {
      this._regionManager = this.getRegionManager();
      this._regionManager._parent = this;
  
      this.listenTo(this._regionManager, 'before:add:region', function() {
        Marionette._triggerMethod(this, 'before:add:region', arguments);
      });
  
      this.listenTo(this._regionManager, 'add:region', function(name, region) {
        this[name] = region;
        Marionette._triggerMethod(this, 'add:region', arguments);
      });
  
      this.listenTo(this._regionManager, 'before:remove:region', function() {
        Marionette._triggerMethod(this, 'before:remove:region', arguments);
      });
  
      this.listenTo(this._regionManager, 'remove:region', function(name) {
        delete this[name];
        Marionette._triggerMethod(this, 'remove:region', arguments);
      });
    },
  
    // Internal method to setup the Wreqr.radio channel
    _initChannel: function() {
      this.channelName = _.result(this, 'channelName') || 'global';
      this.channel = _.result(this, 'channel') || Backbone.Wreqr.radio.channel(this.channelName);
      this.vent = _.result(this, 'vent') || this.channel.vent;
      this.commands = _.result(this, 'commands') || this.channel.commands;
      this.reqres = _.result(this, 'reqres') || this.channel.reqres;
    }
  });
  
  /* jshint maxparams: 9 */
  
  // Module
  // ------
  
  // A simple module system, used to create privacy and encapsulation in
  // Marionette applications
  Marionette.Module = function(moduleName, app, options) {
    this.moduleName = moduleName;
    this.options = _.extend({}, this.options, options);
    // Allow for a user to overide the initialize
    // for a given module instance.
    this.initialize = options.initialize || this.initialize;
  
    // Set up an internal store for sub-modules.
    this.submodules = {};
  
    this._setupInitializersAndFinalizers();
  
    // Set an internal reference to the app
    // within a module.
    this.app = app;
  
    if (_.isFunction(this.initialize)) {
      this.initialize(moduleName, app, this.options);
    }
  };
  
  Marionette.Module.extend = Marionette.extend;
  
  // Extend the Module prototype with events / listenTo, so that the module
  // can be used as an event aggregator or pub/sub.
  _.extend(Marionette.Module.prototype, Backbone.Events, {
  
    // By default modules start with their parents.
    startWithParent: true,
  
    // Initialize is an empty function by default. Override it with your own
    // initialization logic when extending Marionette.Module.
    initialize: function() {},
  
    // Initializer for a specific module. Initializers are run when the
    // module's `start` method is called.
    addInitializer: function(callback) {
      this._initializerCallbacks.add(callback);
    },
  
    // Finalizers are run when a module is stopped. They are used to teardown
    // and finalize any variables, references, events and other code that the
    // module had set up.
    addFinalizer: function(callback) {
      this._finalizerCallbacks.add(callback);
    },
  
    // Start the module, and run all of its initializers
    start: function(options) {
      // Prevent re-starting a module that is already started
      if (this._isInitialized) { return; }
  
      // start the sub-modules (depth-first hierarchy)
      _.each(this.submodules, function(mod) {
        // check to see if we should start the sub-module with this parent
        if (mod.startWithParent) {
          mod.start(options);
        }
      });
  
      // run the callbacks to "start" the current module
      this.triggerMethod('before:start', options);
  
      this._initializerCallbacks.run(options, this);
      this._isInitialized = true;
  
      this.triggerMethod('start', options);
    },
  
    // Stop this module by running its finalizers and then stop all of
    // the sub-modules for this module
    stop: function() {
      // if we are not initialized, don't bother finalizing
      if (!this._isInitialized) { return; }
      this._isInitialized = false;
  
      this.triggerMethod('before:stop');
  
      // stop the sub-modules; depth-first, to make sure the
      // sub-modules are stopped / finalized before parents
      _.invoke(this.submodules, 'stop');
  
      // run the finalizers
      this._finalizerCallbacks.run(undefined, this);
  
      // reset the initializers and finalizers
      this._initializerCallbacks.reset();
      this._finalizerCallbacks.reset();
  
      this.triggerMethod('stop');
    },
  
    // Configure the module with a definition function and any custom args
    // that are to be passed in to the definition function
    addDefinition: function(moduleDefinition, customArgs) {
      this._runModuleDefinition(moduleDefinition, customArgs);
    },
  
    // Internal method: run the module definition function with the correct
    // arguments
    _runModuleDefinition: function(definition, customArgs) {
      // If there is no definition short circut the method.
      if (!definition) { return; }
  
      // build the correct list of arguments for the module definition
      var args = _.flatten([
        this,
        this.app,
        Backbone,
        Marionette,
        Backbone.$, _,
        customArgs
      ]);
  
      definition.apply(this, args);
    },
  
    // Internal method: set up new copies of initializers and finalizers.
    // Calling this method will wipe out all existing initializers and
    // finalizers.
    _setupInitializersAndFinalizers: function() {
      this._initializerCallbacks = new Marionette.Callbacks();
      this._finalizerCallbacks = new Marionette.Callbacks();
    },
  
    // import the `triggerMethod` to trigger events with corresponding
    // methods if the method exists
    triggerMethod: Marionette.triggerMethod
  });
  
  // Class methods to create modules
  _.extend(Marionette.Module, {
  
    // Create a module, hanging off the app parameter as the parent object.
    create: function(app, moduleNames, moduleDefinition) {
      var module = app;
  
      // get the custom args passed in after the module definition and
      // get rid of the module name and definition function
      var customArgs = _.drop(arguments, 3);
  
      // Split the module names and get the number of submodules.
      // i.e. an example module name of `Doge.Wow.Amaze` would
      // then have the potential for 3 module definitions.
      moduleNames = moduleNames.split('.');
      var length = moduleNames.length;
  
      // store the module definition for the last module in the chain
      var moduleDefinitions = [];
      moduleDefinitions[length - 1] = moduleDefinition;
  
      // Loop through all the parts of the module definition
      _.each(moduleNames, function(moduleName, i) {
        var parentModule = module;
        module = this._getModule(parentModule, moduleName, app, moduleDefinition);
        this._addModuleDefinition(parentModule, module, moduleDefinitions[i], customArgs);
      }, this);
  
      // Return the last module in the definition chain
      return module;
    },
  
    _getModule: function(parentModule, moduleName, app, def, args) {
      var options = _.extend({}, def);
      var ModuleClass = this.getClass(def);
  
      // Get an existing module of this name if we have one
      var module = parentModule[moduleName];
  
      if (!module) {
        // Create a new module if we don't have one
        module = new ModuleClass(moduleName, app, options);
        parentModule[moduleName] = module;
        // store the module on the parent
        parentModule.submodules[moduleName] = module;
      }
  
      return module;
    },
  
    // ## Module Classes
    //
    // Module classes can be used as an alternative to the define pattern.
    // The extend function of a Module is identical to the extend functions
    // on other Backbone and Marionette classes.
    // This allows module lifecyle events like `onStart` and `onStop` to be called directly.
    getClass: function(moduleDefinition) {
      var ModuleClass = Marionette.Module;
  
      if (!moduleDefinition) {
        return ModuleClass;
      }
  
      // If all of the module's functionality is defined inside its class,
      // then the class can be passed in directly. `MyApp.module("Foo", FooModule)`.
      if (moduleDefinition.prototype instanceof ModuleClass) {
        return moduleDefinition;
      }
  
      return moduleDefinition.moduleClass || ModuleClass;
    },
  
    // Add the module definition and add a startWithParent initializer function.
    // This is complicated because module definitions are heavily overloaded
    // and support an anonymous function, module class, or options object
    _addModuleDefinition: function(parentModule, module, def, args) {
      var fn = this._getDefine(def);
      var startWithParent = this._getStartWithParent(def, module);
  
      if (fn) {
        module.addDefinition(fn, args);
      }
  
      this._addStartWithParent(parentModule, module, startWithParent);
    },
  
    _getStartWithParent: function(def, module) {
      var swp;
  
      if (_.isFunction(def) && (def.prototype instanceof Marionette.Module)) {
        swp = module.constructor.prototype.startWithParent;
        return _.isUndefined(swp) ? true : swp;
      }
  
      if (_.isObject(def)) {
        swp = def.startWithParent;
        return _.isUndefined(swp) ? true : swp;
      }
  
      return true;
    },
  
    _getDefine: function(def) {
      if (_.isFunction(def) && !(def.prototype instanceof Marionette.Module)) {
        return def;
      }
  
      if (_.isObject(def)) {
        return def.define;
      }
  
      return null;
    },
  
    _addStartWithParent: function(parentModule, module, startWithParent) {
      module.startWithParent = module.startWithParent && startWithParent;
  
      if (!module.startWithParent || !!module.startWithParentIsConfigured) {
        return;
      }
  
      module.startWithParentIsConfigured = true;
  
      parentModule.addInitializer(function(options) {
        if (module.startWithParent) {
          module.start(options);
        }
      });
    }
  });
  

  return Marionette;
}));

},{"backbone":7,"backbone.babysitter":1,"backbone.wreqr":6,"underscore":3}],3:[function(require,module,exports){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

},{}],4:[function(require,module,exports){
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  (function(factory) {
    if (typeof define === "function" && define.amd) {
      return define(["underscore", "backbone", "exports"], factory);
    } else if (typeof exports === "object") {
      return factory(require("underscore"), require("backbone"), exports);
    } else {
      return factory(_, Backbone, {});
    }
  })(function(_, Backbone, Modal) {
    Modal = (function(_super) {
      __extends(Modal, _super);

      Modal.prototype.prefix = 'bbm';

      Modal.prototype.animate = true;

      Modal.prototype.keyControl = true;

      Modal.prototype.showViewOnRender = true;

      function Modal() {
        this.triggerCancel = __bind(this.triggerCancel, this);
        this.triggerSubmit = __bind(this.triggerSubmit, this);
        this.triggerView = __bind(this.triggerView, this);
        this.clickOutsideElement = __bind(this.clickOutsideElement, this);
        this.clickOutside = __bind(this.clickOutside, this);
        this.checkKey = __bind(this.checkKey, this);
        this.rendererCompleted = __bind(this.rendererCompleted, this);
        this.args = Array.prototype.slice.apply(arguments);
        Backbone.View.prototype.constructor.apply(this, this.args);
        this.setUIElements();
      }

      Modal.prototype.render = function(options) {
        var data, _ref;
        data = this.serializeData();
        if (!options || _.isEmpty(options)) {
          options = 0;
        }
        this.$el.addClass("" + this.prefix + "-wrapper");
        this.modalEl = Backbone.$('<div />').addClass("" + this.prefix + "-modal");
        if (this.template) {
          this.modalEl.html(this.buildTemplate(this.template, data));
        }
        this.$el.html(this.modalEl);
        if (this.viewContainer) {
          this.viewContainerEl = this.modalEl.find(this.viewContainer);
          this.viewContainerEl.addClass("" + this.prefix + "-modal__views");
        } else {
          this.viewContainerEl = this.modalEl;
        }
        Backbone.$(':focus').blur();
        if (((_ref = this.views) != null ? _ref.length : void 0) > 0 && this.showViewOnRender) {
          this.openAt(options);
        }
        if (typeof this.onRender === "function") {
          this.onRender();
        }
        this.delegateModalEvents();
        if (this.$el.fadeIn && this.animate) {
          this.modalEl.css({
            opacity: 0
          });
          this.$el.fadeIn({
            duration: 100,
            complete: this.rendererCompleted
          });
        } else {
          this.rendererCompleted();
        }
        return this;
      };

      Modal.prototype.rendererCompleted = function() {
        var _ref;
        if (this.keyControl) {
          Backbone.$('body').on('keyup.bbm', this.checkKey);
          this.$el.on('mouseup.bbm', this.clickOutsideElement);
          this.$el.on('click.bbm', this.clickOutside);
        }
        this.modalEl.css({
          opacity: 1
        }).addClass("" + this.prefix + "-modal--open");
        if (typeof this.onShow === "function") {
          this.onShow();
        }
        return (_ref = this.currentView) != null ? typeof _ref.onShow === "function" ? _ref.onShow() : void 0 : void 0;
      };

      Modal.prototype.setUIElements = function() {
        var _ref;
        this.template = this.getOption('template');
        this.views = this.getOption('views');
        if ((_ref = this.views) != null) {
          _ref.length = _.size(this.views);
        }
        this.viewContainer = this.getOption('viewContainer');
        this.animate = this.getOption('animate');
        if (_.isUndefined(this.template) && _.isUndefined(this.views)) {
          throw new Error('No template or views defined for Backbone.Modal');
        }
        if (this.template && this.views && _.isUndefined(this.viewContainer)) {
          throw new Error('No viewContainer defined for Backbone.Modal');
        }
      };

      Modal.prototype.getOption = function(option) {
        if (!option) {
          return;
        }
        if (this.options && __indexOf.call(this.options, option) >= 0 && (this.options[option] != null)) {
          return this.options[option];
        } else {
          return this[option];
        }
      };

      Modal.prototype.serializeData = function() {
        var data;
        data = {};
        if (this.model) {
          data = _.extend(data, this.model.toJSON());
        }
        if (this.collection) {
          data = _.extend(data, {
            items: this.collection.toJSON()
          });
        }
        return data;
      };

      Modal.prototype.delegateModalEvents = function() {
        var cancelEl, key, match, selector, submitEl, trigger, _results;
        this.active = true;
        cancelEl = this.getOption('cancelEl');
        submitEl = this.getOption('submitEl');
        if (submitEl) {
          this.$el.on('click', submitEl, this.triggerSubmit);
        }
        if (cancelEl) {
          this.$el.on('click', cancelEl, this.triggerCancel);
        }
        _results = [];
        for (key in this.views) {
          if (_.isString(key) && key !== 'length') {
            match = key.match(/^(\S+)\s*(.*)$/);
            trigger = match[1];
            selector = match[2];
            _results.push(this.$el.on(trigger, selector, this.views[key], this.triggerView));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Modal.prototype.undelegateModalEvents = function() {
        var cancelEl, key, match, selector, submitEl, trigger, _results;
        this.active = false;
        cancelEl = this.getOption('cancelEl');
        submitEl = this.getOption('submitEl');
        if (submitEl) {
          this.$el.off('click', submitEl, this.triggerSubmit);
        }
        if (cancelEl) {
          this.$el.off('click', cancelEl, this.triggerCancel);
        }
        _results = [];
        for (key in this.views) {
          if (_.isString(key) && key !== 'length') {
            match = key.match(/^(\S+)\s*(.*)$/);
            trigger = match[1];
            selector = match[2];
            _results.push(this.$el.off(trigger, selector, this.views[key], this.triggerView));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Modal.prototype.checkKey = function(e) {
        if (this.active) {
          switch (e.keyCode) {
            case 27:
              return this.triggerCancel(e);
            case 13:
              return this.triggerSubmit(e);
          }
        }
      };

      Modal.prototype.clickOutside = function(e) {
        var _ref;
        if (((_ref = this.outsideElement) != null ? _ref.hasClass("" + this.prefix + "-wrapper") : void 0) && this.active) {
          return this.triggerCancel();
        }
      };

      Modal.prototype.clickOutsideElement = function(e) {
        return this.outsideElement = Backbone.$(e.target);
      };

      Modal.prototype.buildTemplate = function(template, data) {
        var templateFunction;
        if (typeof template === 'function') {
          templateFunction = template;
        } else {
          templateFunction = _.template(Backbone.$(template).html());
        }
        return templateFunction(data);
      };

      Modal.prototype.buildView = function(viewType, options) {
        var view;
        if (!viewType) {
          return;
        }
        if (options && _.isFunction(options)) {
          options = options();
        }
        if (_.isFunction(viewType)) {
          view = new viewType(options || this.args[0]);
          if (view instanceof Backbone.View) {
            return {
              el: view.render().$el,
              view: view
            };
          } else {
            return {
              el: viewType(options || this.args[0])
            };
          }
        }
        return {
          view: viewType,
          el: viewType.$el
        };
      };

      Modal.prototype.triggerView = function(e) {
        var index, instance, key, options, _base, _base1, _ref;
        if (e != null) {
          if (typeof e.preventDefault === "function") {
            e.preventDefault();
          }
        }
        options = e.data;
        instance = this.buildView(options.view, options.viewOptions);
        if (this.currentView) {
          this.previousView = this.currentView;
          if (!((_ref = options.openOptions) != null ? _ref.skipSubmit : void 0)) {
            if ((typeof (_base = this.previousView).beforeSubmit === "function" ? _base.beforeSubmit(e) : void 0) === false) {
              return;
            }
            if (typeof (_base1 = this.previousView).submit === "function") {
              _base1.submit();
            }
          }
        }
        this.currentView = instance.view || instance.el;
        index = 0;
        for (key in this.views) {
          if (options.view === this.views[key].view) {
            this.currentIndex = index;
          }
          index++;
        }
        if (options.onActive) {
          if (_.isFunction(options.onActive)) {
            options.onActive(this);
          } else if (_.isString(options.onActive)) {
            this[options.onActive].call(this, options);
          }
        }
        if (this.shouldAnimate) {
          return this.animateToView(instance.el);
        } else {
          this.shouldAnimate = true;
          return this.$(this.viewContainerEl).html(instance.el);
        }
      };

      Modal.prototype.animateToView = function(view) {
        var container, newHeight, previousHeight, style, tester, _base, _ref;
        style = {
          position: 'relative',
          top: -9999,
          left: -9999
        };
        tester = Backbone.$('<tester/>').css(style);
        tester.html(this.$el.clone().css(style));
        if (Backbone.$('tester').length !== 0) {
          Backbone.$('tester').replaceWith(tester);
        } else {
          Backbone.$('body').append(tester);
        }
        if (this.viewContainer) {
          container = tester.find(this.viewContainer);
        } else {
          container = tester.find("." + this.prefix + "-modal");
        }
        container.removeAttr('style');
        previousHeight = container.outerHeight();
        container.html(view);
        newHeight = container.outerHeight();
        if (previousHeight === newHeight) {
          this.$(this.viewContainerEl).html(view);
          if (typeof (_base = this.currentView).onShow === "function") {
            _base.onShow();
          }
          return (_ref = this.previousView) != null ? typeof _ref.destroy === "function" ? _ref.destroy() : void 0 : void 0;
        } else {
          if (this.animate) {
            this.$(this.viewContainerEl).css({
              opacity: 0
            });
            return this.$(this.viewContainerEl).animate({
              height: newHeight
            }, 100, (function(_this) {
              return function() {
                var _base1, _ref1;
                _this.$(_this.viewContainerEl).css({
                  opacity: 1
                }).removeAttr('style');
                _this.$(_this.viewContainerEl).html(view);
                if (typeof (_base1 = _this.currentView).onShow === "function") {
                  _base1.onShow();
                }
                return (_ref1 = _this.previousView) != null ? typeof _ref1.destroy === "function" ? _ref1.destroy() : void 0 : void 0;
              };
            })(this));
          } else {
            return this.$(this.viewContainerEl).css({
              height: newHeight
            }).html(view);
          }
        }
      };

      Modal.prototype.triggerSubmit = function(e) {
        var _ref, _ref1;
        if (e != null) {
          e.preventDefault();
        }
        if (Backbone.$(e.target).is('textarea')) {
          return;
        }
        if (this.beforeSubmit) {
          if (this.beforeSubmit(e) === false) {
            return;
          }
        }
        if (this.currentView && this.currentView.beforeSubmit) {
          if (this.currentView.beforeSubmit(e) === false) {
            return;
          }
        }
        if (!this.submit && !((_ref = this.currentView) != null ? _ref.submit : void 0) && !this.getOption('submitEl')) {
          return this.triggerCancel();
        }
        if ((_ref1 = this.currentView) != null) {
          if (typeof _ref1.submit === "function") {
            _ref1.submit();
          }
        }
        if (typeof this.submit === "function") {
          this.submit();
        }
        if (this.regionEnabled) {
          return this.trigger('modal:destroy');
        } else {
          return this.destroy();
        }
      };

      Modal.prototype.triggerCancel = function(e) {
        if (e != null) {
          e.preventDefault();
        }
        if (this.beforeCancel) {
          if (this.beforeCancel() === false) {
            return;
          }
        }
        if (typeof this.cancel === "function") {
          this.cancel();
        }
        if (this.regionEnabled) {
          return this.trigger('modal:destroy');
        } else {
          return this.destroy();
        }
      };

      Modal.prototype.destroy = function() {
        var removeViews;
        Backbone.$('body').off('keyup.bbm', this.checkKey);
        this.$el.off('mouseup.bbm', this.clickOutsideElement);
        this.$el.off('click.bbm', this.clickOutside);
        Backbone.$('tester').remove();
        if (typeof this.onDestroy === "function") {
          this.onDestroy();
        }
        this.shouldAnimate = false;
        this.modalEl.addClass("" + this.prefix + "-modal--destroy");
        removeViews = (function(_this) {
          return function() {
            var _ref;
            if ((_ref = _this.currentView) != null) {
              if (typeof _ref.remove === "function") {
                _ref.remove();
              }
            }
            return _this.remove();
          };
        })(this);
        if (this.$el.fadeOut && this.animate) {
          this.$el.fadeOut({
            duration: 200
          });
          return _.delay(function() {
            return removeViews();
          }, 200);
        } else {
          return removeViews();
        }
      };

      Modal.prototype.openAt = function(options) {
        var atIndex, attr, i, key, view;
        if (_.isNumber(options)) {
          atIndex = options;
        } else if (_.isNumber(options._index)) {
          atIndex = options._index;
        }
        i = 0;
        for (key in this.views) {
          if (key !== 'length') {
            if (_.isNumber(atIndex)) {
              if (i === atIndex) {
                view = this.views[key];
              }
              i++;
            } else if (_.isObject(options)) {
              for (attr in this.views[key]) {
                if (options[attr] === this.views[key][attr]) {
                  view = this.views[key];
                }
              }
            }
          }
        }
        if (view) {
          this.currentIndex = _.indexOf(this.views, view);
          this.triggerView({
            data: _.extend(view, {
              openOptions: options
            })
          });
        }
        return this;
      };

      Modal.prototype.next = function(options) {
        if (options == null) {
          options = {};
        }
        if (this.currentIndex + 1 < this.views.length) {
          return this.openAt(_.extend(options, {
            _index: this.currentIndex + 1
          }));
        }
      };

      Modal.prototype.previous = function(options) {
        if (options == null) {
          options = {};
        }
        if (this.currentIndex - 1 < this.views.length - 1) {
          return this.openAt(_.extend(options, {
            _index: this.currentIndex - 1
          }));
        }
      };

      return Modal;

    })(Backbone.View);
    Backbone.Modal = Modal;
    return Backbone.Modal;
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(factory) {
    if (typeof define === "function" && define.amd) {
      return define(["underscore", "backbone", "backbone.marionette", "exports"], factory);
    } else if (typeof exports === "object") {
      return factory(require("underscore"), require("backbone"), require("backbone.marionette"), exports);
    } else {
      return factory(_, Backbone, Backbone.Marionette, {});
    }
  })(function(_, Backbone, Marionette, Modals) {
    Modals = (function(_super) {
      __extends(Modals, _super);

      function Modals() {
        this.destroy = __bind(this.destroy, this);
        return Modals.__super__.constructor.apply(this, arguments);
      }

      Modals.prototype.modals = [];

      Modals.prototype.zIndex = 0;

      Modals.prototype.show = function(view, options) {
        var lastModal, modalView, secondLastModal, _i, _j, _len, _len1, _ref, _ref1;
        if (options == null) {
          options = {};
        }
        this._ensureElement();
        Backbone.$('body').css({
          overflow: 'hidden'
        });
        if (this.modals.length > 0) {
          lastModal = _.last(this.modals);
          lastModal.modalEl.addClass("" + lastModal.prefix + "-view--stacked");
          secondLastModal = this.modals[this.modals.length - 1];
          if (secondLastModal != null) {
            secondLastModal.modalEl.removeClass("" + secondLastModal.prefix + "-modal--stacked-reverse");
          }
        }
        view.render(options);
        view.regionEnabled = true;
        this.triggerMethod('before:swap', view);
        this.triggerMethod('before:show', view);
        Marionette.triggerMethodOn(view, 'before:show');
        this.triggerMethod('swapOut', this.currentView);
        this.$el.append(view.el);
        this.currentView = view;
        this.triggerMethod('swap', view);
        _ref = this.modals;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          modalView = _ref[_i];
          modalView.undelegateModalEvents();
        }
        _ref1 = this.modals;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          modalView = _ref1[_j];
          modalView.$el.css({
            background: 'none'
          });
        }
        view.on('modal:destroy', this.destroy);
        this.modals.push(view);
        return this.zIndex++;
      };

      Modals.prototype.destroy = function() {
        var lastModal, view;
        view = this.currentView;
        if (!view) {
          return;
        }
        if (view.destroy && !view.isDestroyed) {
          view.destroy();
        } else if (view.remove) {
          view.remove();
        }
        view.off('modal:destroy', this.destroy);
        this.modals.splice(_.indexOf(this.modals, view), 1);
        this.zIndex--;
        this.currentView = this.modals[this.zIndex - 1];
        lastModal = _.last(this.modals);
        if (lastModal) {
          lastModal.$el.removeAttr('style');
          lastModal.modalEl.addClass("" + lastModal.prefix + "-modal--stacked-reverse");
          _.delay((function(_this) {
            return function() {
              return lastModal.modalEl.removeClass("" + lastModal.prefix + "-modal--stacked");
            };
          })(this), 300);
          if (this.zIndex !== 0) {
            lastModal.delegateModalEvents();
          }
        }
        if (this.zIndex === 0) {
          Backbone.$('body').css({
            overflow: 'visible'
          });
        }
        return this.triggerMethod('modal:destroy', view);
      };

      Modals.prototype.destroyAll = function() {
        var view, _i, _len, _ref, _results;
        _ref = this.modals;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(this.destroy());
        }
        return _results;
      };

      return Modals;

    })(Marionette.Region);
    Marionette.Modals = Modals;
    return Marionette.Modals;
  });

}).call(this);

},{"backbone":7,"backbone.marionette":2,"underscore":33}],5:[function(require,module,exports){
// Backbone.Stickit v0.9.2, MIT Licensed
// Copyright (c) 2012-2015 The New York Times, CMS Group, Matthew DeLambo <delambo@gmail.com>

(function (factory) {

  // Set up Stickit appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd)
    define(['underscore', 'backbone', 'exports'], factory);

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object')
    factory(require('underscore'), require('backbone'), exports);

  // Finally, as a browser global.
  else
    factory(_, Backbone, {});

}(function (_, Backbone, Stickit) {

  // Stickit Namespace
  // --------------------------

  // Export onto Backbone object
  Backbone.Stickit = Stickit;

  Stickit._handlers = [];

  Stickit.addHandler = function(handlers) {
    // Fill-in default values.
    handlers = _.map(_.flatten([handlers]), function(handler) {
      return _.defaults({}, handler, {
        updateModel: true,
        updateView: true,
        updateMethod: 'text'
      });
    });
    this._handlers = this._handlers.concat(handlers);
  };

  // Backbone.View Mixins
  // --------------------

  Stickit.ViewMixin = {

    // Collection of model event bindings.
    //   [{model,event,fn,config}, ...]
    _modelBindings: null,

    // Unbind the model and event bindings from `this._modelBindings` and
    // `this.$el`. If the optional `model` parameter is defined, then only
    // delete bindings for the given `model` and its corresponding view events.
    unstickit: function(model, bindingSelector) {

      // Support passing a bindings hash in place of bindingSelector.
      if (_.isObject(bindingSelector)) {
        _.each(bindingSelector, function(v, selector) {
          this.unstickit(model, selector);
        }, this);
        return;
      }

      var models = [], destroyFns = [];
      this._modelBindings = _.reject(this._modelBindings, function(binding) {
        if (model && binding.model !== model) return;
        if (bindingSelector && binding.config.selector != bindingSelector) return;

        binding.model.off(binding.event, binding.fn);
        destroyFns.push(binding.config._destroy);
        models.push(binding.model);
        return true;
      });

      // Trigger an event for each model that was unbound.
      _.invoke(_.uniq(models), 'trigger', 'stickit:unstuck', this.cid);

      // Call `_destroy` on a unique list of the binding callbacks.
      _.each(_.uniq(destroyFns), function(fn) { fn.call(this); }, this);

      this.$el.off('.stickit' + (model ? '.' + model.cid : ''), bindingSelector);
    },

    // Initilize Stickit bindings for the view. Subsequent binding additions
    // can either call `stickit` with the new bindings, or add them directly
    // with `addBinding`. Both arguments to `stickit` are optional.
    stickit: function(optionalModel, optionalBindingsConfig) {
      var model = optionalModel || this.model,
          bindings = optionalBindingsConfig || _.result(this, "bindings") || {};

      this._modelBindings || (this._modelBindings = []);

      // Add bindings in bulk using `addBinding`.
      this.addBinding(model, bindings);

      // Wrap `view.remove` to unbind stickit model and dom events.
      var remove = this.remove;
      if (!remove.stickitWrapped) {
        this.remove = function() {
          var ret = this;
          this.unstickit();
          if (remove) ret = remove.apply(this, arguments);
          return ret;
        };
      }
      this.remove.stickitWrapped = true;
      return this;
    },

    // Add a single Stickit binding or a hash of bindings to the model. If
    // `optionalModel` is ommitted, will default to the view's `model` property.
    addBinding: function(optionalModel, selector, binding) {
      var model = optionalModel || this.model,
          namespace = '.stickit.' + model.cid;

      binding = binding || {};

      // Support jQuery-style {key: val} event maps.
      if (_.isObject(selector)) {
        var bindings = selector;
        _.each(bindings, function(val, key) {
          this.addBinding(model, key, val);
        }, this);
        return;
      }

      // Special case the ':el' selector to use the view's this.$el.
      var $el = selector === ':el' ? this.$el : this.$(selector);

      // Clear any previous matching bindings.
      this.unstickit(model, selector);

      // Fail fast if the selector didn't match an element.
      if (!$el.length) return;

      // Allow shorthand setting of model attributes - `'selector':'observe'`.
      if (_.isString(binding)) binding = {observe: binding};

      // Handle case where `observe` is in the form of a function.
      if (_.isFunction(binding.observe)) binding.observe = binding.observe.call(this);

      // Find all matching Stickit handlers that could apply to this element
      // and store in a config object.
      var config = getConfiguration($el, binding);

      // The attribute we're observing in our config.
      var modelAttr = config.observe;

      // Store needed properties for later.
      config.selector = selector;
      config.view = this;

      // Create the model set options with a unique `bindId` so that we
      // can avoid double-binding in the `change:attribute` event handler.
      var bindId = config.bindId = _.uniqueId();

      // Add a reference to the view for handlers of stickitChange events
      var options = _.extend({stickitChange: config}, config.setOptions);

      // Add a `_destroy` callback to the configuration, in case `destroy`
      // is a named function and we need a unique function when unsticking.
      config._destroy = function() {
        applyViewFn.call(this, config.destroy, $el, model, config);
      };

      initializeAttributes($el, config, model, modelAttr);
      initializeVisible($el, config, model, modelAttr);
      initializeClasses($el, config, model, modelAttr);

      if (modelAttr) {
        // Setup one-way (input element -> model) bindings.
        _.each(config.events, function(type) {
          var eventName = type + namespace;
          var listener = function(event) {
            var val = applyViewFn.call(this, config.getVal, $el, event, config, slice.call(arguments, 1));

            // Don't update the model if false is returned from the `updateModel` configuration.
            var currentVal = evaluateBoolean(config.updateModel, val, event, config);
            if (currentVal) setAttr(model, modelAttr, val, options, config);
          };
          var sel = selector === ':el'? '' : selector;
          this.$el.on(eventName, sel, _.bind(listener, this));
        }, this);

        // Setup a `change:modelAttr` observer to keep the view element in sync.
        // `modelAttr` may be an array of attributes or a single string value.
        _.each(_.flatten([modelAttr]), function(attr) {
          observeModelEvent(model, 'change:' + attr, config, function(m, val, options) {
            var changeId = options && options.stickitChange && options.stickitChange.bindId;
            if (changeId !== bindId) {
              var currentVal = getAttr(model, modelAttr, config);
              updateViewBindEl($el, config, currentVal, model);
            }
          });
        });

        var currentVal = getAttr(model, modelAttr, config);
        updateViewBindEl($el, config, currentVal, model, true);
      }

      // After each binding is setup, call the `initialize` callback.
      applyViewFn.call(this, config.initialize, $el, model, config);
    }
  };

  _.extend(Backbone.View.prototype, Stickit.ViewMixin);

  // Helpers
  // -------

  var slice = [].slice;

  // Evaluates the given `path` (in object/dot-notation) relative to the given
  // `obj`. If the path is null/undefined, then the given `obj` is returned.
  var evaluatePath = function(obj, path) {
    var parts = (path || '').split('.');
    var result = _.reduce(parts, function(memo, i) { return memo[i]; }, obj);
    return result == null ? obj : result;
  };

  // If the given `fn` is a string, then view[fn] is called, otherwise it is
  // a function that should be executed.
  var applyViewFn = function(fn) {
    fn = _.isString(fn) ? evaluatePath(this, fn) : fn;
    if (fn) return (fn).apply(this, slice.call(arguments, 1));
  };

  // Given a function, string (view function reference), or a boolean
  // value, returns the truthy result. Any other types evaluate as false.
  // The first argument must be `reference` and the last must be `config`, but
  // middle arguments can be variadic.
  var evaluateBoolean = function(reference, val, config) {
    if (_.isBoolean(reference)) {
      return reference;
    } else if (_.isFunction(reference) || _.isString(reference)) {
      var view = _.last(arguments).view;
      return applyViewFn.apply(view, arguments);
    }
    return false;
  };

  // Setup a model event binding with the given function, and track the event
  // in the view's _modelBindings.
  var observeModelEvent = function(model, event, config, fn) {
    var view = config.view;
    model.on(event, fn, view);
    view._modelBindings.push({model:model, event:event, fn:fn, config:config});
  };

  // Prepares the given `val`ue and sets it into the `model`.
  var setAttr = function(model, attr, val, options, config) {
    var value = {}, view = config.view;
    if (config.onSet) {
      val = applyViewFn.call(view, config.onSet, val, config);
    }

    if (config.set) {
      applyViewFn.call(view, config.set, attr, val, options, config);
    } else {
      value[attr] = val;
      // If `observe` is defined as an array and `onSet` returned
      // an array, then map attributes to their values.
      if (_.isArray(attr) && _.isArray(val)) {
        value = _.reduce(attr, function(memo, attribute, index) {
          memo[attribute] = _.has(val, index) ? val[index] : null;
          return memo;
        }, {});
      }
      model.set(value, options);
    }
  };

  // Returns the given `attr`'s value from the `model`, escaping and
  // formatting if necessary. If `attr` is an array, then an array of
  // respective values will be returned.
  var getAttr = function(model, attr, config) {
    var view = config.view;
    var retrieveVal = function(field) {
      return model[config.escape ? 'escape' : 'get'](field);
    };
    var sanitizeVal = function(val) {
      return val == null ? '' : val;
    };
    var val = _.isArray(attr) ? _.map(attr, retrieveVal) : retrieveVal(attr);
    if (config.onGet) val = applyViewFn.call(view, config.onGet, val, config);
    return _.isArray(val) ? _.map(val, sanitizeVal) : sanitizeVal(val);
  };

  // Find handlers in `Backbone.Stickit._handlers` with selectors that match
  // `$el` and generate a configuration by mixing them in the order that they
  // were found with the given `binding`.
  var getConfiguration = Stickit.getConfiguration = function($el, binding) {
    var handlers = [{
      updateModel: false,
      updateMethod: 'text',
      update: function($el, val, m, opts) { if ($el[opts.updateMethod]) $el[opts.updateMethod](val); },
      getVal: function($el, e, opts) { return $el[opts.updateMethod](); }
    }];
    handlers = handlers.concat(_.filter(Stickit._handlers, function(handler) {
      return $el.is(handler.selector);
    }));
    handlers.push(binding);

    // Merge handlers into a single config object. Last props in wins.
    var config = _.extend.apply(_, handlers);

    // `updateView` is defaulted to false for configutrations with
    // `visible`; otherwise, `updateView` is defaulted to true.
    if (!_.has(config, 'updateView')) config.updateView = !config.visible;
    return config;
  };

  // Setup the attributes configuration - a list that maps an attribute or
  // property `name`, to an `observe`d model attribute, using an optional
  // `onGet` formatter.
  //
  //     attributes: [{
  //       name: 'attributeOrPropertyName',
  //       observe: 'modelAttrName'
  //       onGet: function(modelAttrVal, modelAttrName) { ... }
  //     }, ...]
  //
  var initializeAttributes = function($el, config, model, modelAttr) {
    var props = ['autofocus', 'autoplay', 'async', 'checked', 'controls',
      'defer', 'disabled', 'hidden', 'indeterminate', 'loop', 'multiple',
      'open', 'readonly', 'required', 'scoped', 'selected'];

    var view = config.view;

    _.each(config.attributes || [], function(attrConfig) {
      attrConfig = _.clone(attrConfig);
      attrConfig.view = view;

      var lastClass = '';
      var observed = attrConfig.observe || (attrConfig.observe = modelAttr);
      var updateAttr = function() {
        var updateType = _.contains(props, attrConfig.name) ? 'prop' : 'attr',
            val = getAttr(model, observed, attrConfig);

        // If it is a class then we need to remove the last value and add the new.
        if (attrConfig.name === 'class') {
          $el.removeClass(lastClass).addClass(val);
          lastClass = val;
        } else {
          $el[updateType](attrConfig.name, val);
        }
      };

      _.each(_.flatten([observed]), function(attr) {
        observeModelEvent(model, 'change:' + attr, config, updateAttr);
      });

      // Initialize the matched element's state.
      updateAttr();
    });
  };

  var initializeClasses = function($el, config, model, modelAttr) {
    _.each(config.classes || [], function(classConfig, name) {
      if (_.isString(classConfig)) classConfig = {observe: classConfig};
      classConfig.view = config.view;

      var observed = classConfig.observe;
      var updateClass = function() {
        var val = getAttr(model, observed, classConfig);
        $el.toggleClass(name, !!val);
      };

      _.each(_.flatten([observed]), function(attr) {
        observeModelEvent(model, 'change:' + attr, config, updateClass);
      });
      updateClass();
    });
  };

  // If `visible` is configured, then the view element will be shown/hidden
  // based on the truthiness of the modelattr's value or the result of the
  // given callback. If a `visibleFn` is also supplied, then that callback
  // will be executed to manually handle showing/hiding the view element.
  //
  //     observe: 'isRight',
  //     visible: true, // or function(val, options) {}
  //     visibleFn: function($el, isVisible, options) {} // optional handler
  //
  var initializeVisible = function($el, config, model, modelAttr) {
    if (config.visible == null) return;
    var view = config.view;

    var visibleCb = function() {
      var visible = config.visible,
          visibleFn = config.visibleFn,
          val = getAttr(model, modelAttr, config),
          isVisible = !!val;

      // If `visible` is a function then it should return a boolean result to show/hide.
      if (_.isFunction(visible) || _.isString(visible)) {
        isVisible = !!applyViewFn.call(view, visible, val, config);
      }

      // Either use the custom `visibleFn`, if provided, or execute the standard show/hide.
      if (visibleFn) {
        applyViewFn.call(view, visibleFn, $el, isVisible, config);
      } else {
        $el.toggle(isVisible);
      }
    };

    _.each(_.flatten([modelAttr]), function(attr) {
      observeModelEvent(model, 'change:' + attr, config, visibleCb);
    });

    visibleCb();
  };

  // Update the value of `$el` using the given configuration and trigger the
  // `afterUpdate` callback. This action may be blocked by `config.updateView`.
  //
  //     update: function($el, val, model, options) {},  // handler for updating
  //     updateView: true, // defaults to true
  //     afterUpdate: function($el, val, options) {} // optional callback
  //
  var updateViewBindEl = function($el, config, val, model, isInitializing) {
    var view = config.view;
    if (!evaluateBoolean(config.updateView, val, config)) return;
    applyViewFn.call(view, config.update, $el, val, model, config);
    if (!isInitializing) applyViewFn.call(view, config.afterUpdate, $el, val, config);
  };

  // Default Handlers
  // ----------------

  Stickit.addHandler([{
    selector: '[contenteditable]',
    updateMethod: 'html',
    events: ['input', 'change']
  }, {
    selector: 'input',
    events: ['propertychange', 'input', 'change'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) {
      return $el.val();
    }
  }, {
    selector: 'textarea',
    events: ['propertychange', 'input', 'change'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) { return $el.val(); }
  }, {
    selector: 'input[type="radio"]',
    events: ['change'],
    update: function($el, val) {
      $el.filter('[value="'+val+'"]').prop('checked', true);
    },
    getVal: function($el) {
      return $el.filter(':checked').val();
    }
  }, {
    selector: 'input[type="checkbox"]',
    events: ['change'],
    update: function($el, val, model, options) {
      if ($el.length > 1) {
        // There are multiple checkboxes so we need to go through them and check
        // any that have value attributes that match what's in the array of `val`s.
        val || (val = []);
        $el.each(function(i, el) {
          var checkbox = Backbone.$(el);
          var checked = _.contains(val, checkbox.val());
          checkbox.prop('checked', checked);
        });
      } else {
        var checked = _.isBoolean(val) ? val : val === $el.val();
        $el.prop('checked', checked);
      }
    },
    getVal: function($el) {
      var val;
      if ($el.length > 1) {
        val = _.reduce($el, function(memo, el) {
          var checkbox = Backbone.$(el);
          if (checkbox.prop('checked')) memo.push(checkbox.val());
          return memo;
        }, []);
      } else {
        val = $el.prop('checked');
        // If the checkbox has a value attribute defined, then
        // use that value. Most browsers use "on" as a default.
        var boxval = $el.val();
        if (boxval !== 'on' && boxval != null) {
          val = val ? $el.val() : null;
        }
      }
      return val;
    }
  }, {
    selector: 'select',
    events: ['change'],
    update: function($el, val, model, options) {
      var optList,
        selectConfig = options.selectOptions,
        list = selectConfig && selectConfig.collection || undefined,
        isMultiple = $el.prop('multiple');

      // If there are no `selectOptions` then we assume that the `<select>`
      // is pre-rendered and that we need to generate the collection.
      if (!selectConfig) {
        selectConfig = {};
        var getList = function($el) {
          return $el.map(function(index, option) {
            // Retrieve the text and value of the option, preferring "stickit-bind-val"
            // data attribute over value property.
            var dataVal = Backbone.$(option).data('stickit-bind-val');
            return {
              value: dataVal !== undefined ? dataVal : option.value,
              label: option.text
            };
          }).get();
        };
        if ($el.find('optgroup').length) {
          list = {opt_labels:[]};
          // Search for options without optgroup
          if ($el.find('> option').length) {
            list.opt_labels.push(undefined);
            _.each($el.find('> option'), function(el) {
              list[undefined] = getList(Backbone.$(el));
            });
          }
          _.each($el.find('optgroup'), function(el) {
            var label = Backbone.$(el).attr('label');
            list.opt_labels.push(label);
            list[label] = getList(Backbone.$(el).find('option'));
          });
        } else {
          list = getList($el.find('option'));
        }
      }

      // Fill in default label and path values.
      selectConfig.valuePath = selectConfig.valuePath || 'value';
      selectConfig.labelPath = selectConfig.labelPath || 'label';
      selectConfig.disabledPath = selectConfig.disabledPath || 'disabled';

      var addSelectOptions = function(optList, $el, fieldVal) {
        _.each(optList, function(obj) {
          var option = Backbone.$('<option/>'), optionVal = obj;

          var fillOption = function(text, val, disabled) {
            option.text(text);
            optionVal = val;
            // Save the option value as data so that we can reference it later.
            option.data('stickit-bind-val', optionVal);
            if (!_.isArray(optionVal) && !_.isObject(optionVal)) option.val(optionVal);

            if (disabled === true) option.prop('disabled', 'disabled');
          };

          var text, val, disabled;
          if (obj === '__default__') {
            text = fieldVal.label,
            val = fieldVal.value,
            disabled = fieldVal.disabled;
          } else {
            text = evaluatePath(obj, selectConfig.labelPath),
            val = evaluatePath(obj, selectConfig.valuePath),
            disabled = evaluatePath(obj, selectConfig.disabledPath);
          }
          fillOption(text, val, disabled);

          // Determine if this option is selected.
          var isSelected = function() {
            if (!isMultiple && optionVal != null && fieldVal != null && optionVal === fieldVal) {
              return true;
            } else if (_.isObject(fieldVal) && _.isEqual(optionVal, fieldVal)) {
              return true;
            }
            return false;
          };

          if (isSelected()) {
            option.prop('selected', true);
          } else if (isMultiple && _.isArray(fieldVal)) {
            _.each(fieldVal, function(val) {
              if (_.isObject(val)) val = evaluatePath(val, selectConfig.valuePath);
              if (val === optionVal || (_.isObject(val) && _.isEqual(optionVal, val)))
                option.prop('selected', true);
            });
          }

          $el.append(option);
        });
      };

      $el.find('*').remove();

      // The `list` configuration is a function that returns the options list or a string
      // which represents the path to the list relative to `window` or the view/`this`.
      if (_.isString(list)) {
        var context = window;
        if (list.indexOf('this.') === 0) context = this;
        list = list.replace(/^[a-z]*\.(.+)$/, '$1');
        optList = evaluatePath(context, list);
      } else if (_.isFunction(list)) {
        optList = applyViewFn.call(this, list, $el, options);
      } else {
        optList = list;
      }

      // Support Backbone.Collection and deserialize.
      if (optList instanceof Backbone.Collection) {
        var collection = optList;
        var refreshSelectOptions = function() {
          var currentVal = getAttr(model, options.observe, options);
          applyViewFn.call(this, options.update, $el, currentVal, model, options);
        };
        // We need to call this function after unstickit and after an update so we don't end up
        // with multiple listeners doing the same thing
        var removeCollectionListeners = function() {
          collection.off('add remove reset sort', refreshSelectOptions);
        };
        var removeAllListeners = function() {
          removeCollectionListeners();
          collection.off('stickit:selectRefresh');
          model.off('stickit:selectRefresh');
        };
        // Remove previously set event listeners by triggering a custom event
        collection.trigger('stickit:selectRefresh');
        collection.once('stickit:selectRefresh', removeCollectionListeners, this);

        // Listen to the collection and trigger an update of the select options
        collection.on('add remove reset sort', refreshSelectOptions, this);

        // Remove the previous model event listener
        model.trigger('stickit:selectRefresh');
        model.once('stickit:selectRefresh', function() {
          model.off('stickit:unstuck', removeAllListeners);
        });
        // Remove collection event listeners once this binding is unstuck
        model.once('stickit:unstuck', removeAllListeners, this);
        optList = optList.toJSON();
      }

      if (selectConfig.defaultOption) {
        var option = _.isFunction(selectConfig.defaultOption) ?
          selectConfig.defaultOption.call(this, $el, options) :
          selectConfig.defaultOption;
        addSelectOptions(["__default__"], $el, option);
      }

      if (_.isArray(optList)) {
        addSelectOptions(optList, $el, val);
      } else if (optList.opt_labels) {
        // To define a select with optgroups, format selectOptions.collection as an object
        // with an 'opt_labels' property, as in the following:
        //
        //     {
        //       'opt_labels': ['Looney Tunes', 'Three Stooges'],
        //       'Looney Tunes': [{id: 1, name: 'Bugs Bunny'}, {id: 2, name: 'Donald Duck'}],
        //       'Three Stooges': [{id: 3, name : 'moe'}, {id: 4, name : 'larry'}, {id: 5, name : 'curly'}]
        //     }
        //
        _.each(optList.opt_labels, function(label) {
          var $group = Backbone.$('<optgroup/>').attr('label', label);
          addSelectOptions(optList[label], $group, val);
          $el.append($group);
        });
        // With no 'opt_labels' parameter, the object is assumed to be a simple value-label map.
        // Pass a selectOptions.comparator to override the default order of alphabetical by label.
      } else {
        var opts = [], opt;
        for (var i in optList) {
          opt = {};
          opt[selectConfig.valuePath] = i;
          opt[selectConfig.labelPath] = optList[i];
          opts.push(opt);
        }
        opts = _.sortBy(opts, selectConfig.comparator || selectConfig.labelPath);
        addSelectOptions(opts, $el, val);
      }
    },
    getVal: function($el) {
      var selected = $el.find('option:selected');

      if ($el.prop('multiple')) {
        return _.map(selected, function(el) {
          return Backbone.$(el).data('stickit-bind-val');
        });
      } else {
        return selected.data('stickit-bind-val');
      }
    }
  }]);

  return Stickit;

}));

},{"backbone":7,"underscore":33}],6:[function(require,module,exports){
// Backbone.Wreqr (Backbone.Marionette)
// ----------------------------------
// v1.3.6
//
// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/marionettejs/backbone.wreqr


(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return factory(Backbone, _);
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(Backbone, _);
  } else {
    factory(root.Backbone, root._);
  }

}(this, function(Backbone, _) {
  "use strict";

  var previousWreqr = Backbone.Wreqr;

  var Wreqr = Backbone.Wreqr = {};

  Backbone.Wreqr.VERSION = '1.3.6';

  Backbone.Wreqr.noConflict = function () {
    Backbone.Wreqr = previousWreqr;
    return this;
  };

  // Handlers
  // --------
  // A registry of functions to call, given a name
  
  Wreqr.Handlers = (function(Backbone, _){
    "use strict";
    
    // Constructor
    // -----------
  
    var Handlers = function(options){
      this.options = options;
      this._wreqrHandlers = {};
      
      if (_.isFunction(this.initialize)){
        this.initialize(options);
      }
    };
  
    Handlers.extend = Backbone.Model.extend;
  
    // Instance Members
    // ----------------
  
    _.extend(Handlers.prototype, Backbone.Events, {
  
      // Add multiple handlers using an object literal configuration
      setHandlers: function(handlers){
        _.each(handlers, function(handler, name){
          var context = null;
  
          if (_.isObject(handler) && !_.isFunction(handler)){
            context = handler.context;
            handler = handler.callback;
          }
  
          this.setHandler(name, handler, context);
        }, this);
      },
  
      // Add a handler for the given name, with an
      // optional context to run the handler within
      setHandler: function(name, handler, context){
        var config = {
          callback: handler,
          context: context
        };
  
        this._wreqrHandlers[name] = config;
  
        this.trigger("handler:add", name, handler, context);
      },
  
      // Determine whether or not a handler is registered
      hasHandler: function(name){
        return !! this._wreqrHandlers[name];
      },
  
      // Get the currently registered handler for
      // the specified name. Throws an exception if
      // no handler is found.
      getHandler: function(name){
        var config = this._wreqrHandlers[name];
  
        if (!config){
          return;
        }
  
        return function(){
          return config.callback.apply(config.context, arguments);
        };
      },
  
      // Remove a handler for the specified name
      removeHandler: function(name){
        delete this._wreqrHandlers[name];
      },
  
      // Remove all handlers from this registry
      removeAllHandlers: function(){
        this._wreqrHandlers = {};
      }
    });
  
    return Handlers;
  })(Backbone, _);
  
  // Wreqr.CommandStorage
  // --------------------
  //
  // Store and retrieve commands for execution.
  Wreqr.CommandStorage = (function(){
    "use strict";
  
    // Constructor function
    var CommandStorage = function(options){
      this.options = options;
      this._commands = {};
  
      if (_.isFunction(this.initialize)){
        this.initialize(options);
      }
    };
  
    // Instance methods
    _.extend(CommandStorage.prototype, Backbone.Events, {
  
      // Get an object literal by command name, that contains
      // the `commandName` and the `instances` of all commands
      // represented as an array of arguments to process
      getCommands: function(commandName){
        var commands = this._commands[commandName];
  
        // we don't have it, so add it
        if (!commands){
  
          // build the configuration
          commands = {
            command: commandName, 
            instances: []
          };
  
          // store it
          this._commands[commandName] = commands;
        }
  
        return commands;
      },
  
      // Add a command by name, to the storage and store the
      // args for the command
      addCommand: function(commandName, args){
        var command = this.getCommands(commandName);
        command.instances.push(args);
      },
  
      // Clear all commands for the given `commandName`
      clearCommands: function(commandName){
        var command = this.getCommands(commandName);
        command.instances = [];
      }
    });
  
    return CommandStorage;
  })();
  
  // Wreqr.Commands
  // --------------
  //
  // A simple command pattern implementation. Register a command
  // handler and execute it.
  Wreqr.Commands = (function(Wreqr, _){
    "use strict";
  
    return Wreqr.Handlers.extend({
      // default storage type
      storageType: Wreqr.CommandStorage,
  
      constructor: function(options){
        this.options = options || {};
  
        this._initializeStorage(this.options);
        this.on("handler:add", this._executeCommands, this);
  
        Wreqr.Handlers.prototype.constructor.apply(this, arguments);
      },
  
      // Execute a named command with the supplied args
      execute: function(name){
        name = arguments[0];
        var args = _.rest(arguments);
  
        if (this.hasHandler(name)){
          this.getHandler(name).apply(this, args);
        } else {
          this.storage.addCommand(name, args);
        }
  
      },
  
      // Internal method to handle bulk execution of stored commands
      _executeCommands: function(name, handler, context){
        var command = this.storage.getCommands(name);
  
        // loop through and execute all the stored command instances
        _.each(command.instances, function(args){
          handler.apply(context, args);
        });
  
        this.storage.clearCommands(name);
      },
  
      // Internal method to initialize storage either from the type's
      // `storageType` or the instance `options.storageType`.
      _initializeStorage: function(options){
        var storage;
  
        var StorageType = options.storageType || this.storageType;
        if (_.isFunction(StorageType)){
          storage = new StorageType();
        } else {
          storage = StorageType;
        }
  
        this.storage = storage;
      }
    });
  
  })(Wreqr, _);
  
  // Wreqr.RequestResponse
  // ---------------------
  //
  // A simple request/response implementation. Register a
  // request handler, and return a response from it
  Wreqr.RequestResponse = (function(Wreqr, _){
    "use strict";
  
    return Wreqr.Handlers.extend({
      request: function(name){
        if (this.hasHandler(name)) {
          return this.getHandler(name).apply(this, _.rest(arguments));
        }
      }
    });
  
  })(Wreqr, _);
  
  // Event Aggregator
  // ----------------
  // A pub-sub object that can be used to decouple various parts
  // of an application through event-driven architecture.
  
  Wreqr.EventAggregator = (function(Backbone, _){
    "use strict";
    var EA = function(){};
  
    // Copy the `extend` function used by Backbone's classes
    EA.extend = Backbone.Model.extend;
  
    // Copy the basic Backbone.Events on to the event aggregator
    _.extend(EA.prototype, Backbone.Events);
  
    return EA;
  })(Backbone, _);
  
  // Wreqr.Channel
  // --------------
  //
  // An object that wraps the three messaging systems:
  // EventAggregator, RequestResponse, Commands
  Wreqr.Channel = (function(Wreqr){
    "use strict";
  
    var Channel = function(channelName) {
      this.vent        = new Backbone.Wreqr.EventAggregator();
      this.reqres      = new Backbone.Wreqr.RequestResponse();
      this.commands    = new Backbone.Wreqr.Commands();
      this.channelName = channelName;
    };
  
    _.extend(Channel.prototype, {
  
      // Remove all handlers from the messaging systems of this channel
      reset: function() {
        this.vent.off();
        this.vent.stopListening();
        this.reqres.removeAllHandlers();
        this.commands.removeAllHandlers();
        return this;
      },
  
      // Connect a hash of events; one for each messaging system
      connectEvents: function(hash, context) {
        this._connect('vent', hash, context);
        return this;
      },
  
      connectCommands: function(hash, context) {
        this._connect('commands', hash, context);
        return this;
      },
  
      connectRequests: function(hash, context) {
        this._connect('reqres', hash, context);
        return this;
      },
  
      // Attach the handlers to a given message system `type`
      _connect: function(type, hash, context) {
        if (!hash) {
          return;
        }
  
        context = context || this;
        var method = (type === 'vent') ? 'on' : 'setHandler';
  
        _.each(hash, function(fn, eventName) {
          this[type][method](eventName, _.bind(fn, context));
        }, this);
      }
    });
  
  
    return Channel;
  })(Wreqr);
  
  // Wreqr.Radio
  // --------------
  //
  // An object that lets you communicate with many channels.
  Wreqr.radio = (function(Wreqr, _){
    "use strict";
  
    var Radio = function() {
      this._channels = {};
      this.vent = {};
      this.commands = {};
      this.reqres = {};
      this._proxyMethods();
    };
  
    _.extend(Radio.prototype, {
  
      channel: function(channelName) {
        if (!channelName) {
          throw new Error('Channel must receive a name');
        }
  
        return this._getChannel( channelName );
      },
  
      _getChannel: function(channelName) {
        var channel = this._channels[channelName];
  
        if(!channel) {
          channel = new Wreqr.Channel(channelName);
          this._channels[channelName] = channel;
        }
  
        return channel;
      },
  
      _proxyMethods: function() {
        _.each(['vent', 'commands', 'reqres'], function(system) {
          _.each( messageSystems[system], function(method) {
            this[system][method] = proxyMethod(this, system, method);
          }, this);
        }, this);
      }
    });
  
  
    var messageSystems = {
      vent: [
        'on',
        'off',
        'trigger',
        'once',
        'stopListening',
        'listenTo',
        'listenToOnce'
      ],
  
      commands: [
        'execute',
        'setHandler',
        'setHandlers',
        'removeHandler',
        'removeAllHandlers'
      ],
  
      reqres: [
        'request',
        'setHandler',
        'setHandlers',
        'removeHandler',
        'removeAllHandlers'
      ]
    };
  
    var proxyMethod = function(radio, system, method) {
      return function(channelName) {
        var messageSystem = radio._getChannel(channelName)[system];
  
        return messageSystem[method].apply(messageSystem, _.rest(arguments));
      };
    };
  
    return new Radio();
  
  })(Wreqr, _);
  

  return Backbone.Wreqr;

}));

},{"backbone":7,"underscore":33}],7:[function(require,module,exports){
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

},{"underscore":33}],8:[function(require,module,exports){
/*!
 * colpick Color Picker
 * https://github.com/mrgrain/colpick
 *
 * Copyright 2013, 2015 Moritz Kornher, Jose Vargas, Stefan Petre
 * Released under the MIT license and GPLv2 license
 * https://github.com/mrgrain/colpick/blob/master/LICENSE
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var colpick = function () {
        var
            tpl = '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',
            defaults = {
                showEvent: 'click',
                onShow: function () {
                },
                onBeforeShow: function () {
                },
                onHide: function () {
                },
                onChange: function () {
                },
                onSubmit: function () {
                },
                colorScheme: 'light',
                color: 'auto',
                livePreview: true,
                flat: false,
                layout: 'full',
                submit: 1,
                submitText: 'OK',
                height: 156,
                polyfill: false,
                styles: false
            },
        //Fill the inputs of the plugin
            fillRGBFields = function (hsb, cal) {
                var rgb = hsbToRgb(hsb);
                $(cal).data('colpick').fields
                    .eq(1).val(rgb.r).end()
                    .eq(2).val(rgb.g).end()
                    .eq(3).val(rgb.b).end();
            },
            fillHSBFields = function (hsb, cal) {
                $(cal).data('colpick').fields
                    .eq(4).val(Math.round(hsb.h)).end()
                    .eq(5).val(Math.round(hsb.s)).end()
                    .eq(6).val(Math.round(hsb.b)).end();
            },
            fillHexFields = function (hsb, cal) {
                $(cal).data('colpick').fields.eq(0).val(hsbToHex(hsb));
            },
        //Set the round selector position
            setSelector = function (hsb, cal) {
                $(cal).data('colpick').selector.css('backgroundColor', '#' + hsbToHex({h: hsb.h, s: 100, b: 100}));
                $(cal).data('colpick').selectorIndic.css({
                    left: parseInt($(cal).data('colpick').height * hsb.s / 100, 10),
                    top: parseInt($(cal).data('colpick').height * (100 - hsb.b) / 100, 10)
                });
            },
        //Set the hue selector position
            setHue = function (hsb, cal) {
                $(cal).data('colpick').hue.css('top', parseInt($(cal).data('colpick').height - $(cal).data('colpick').height * hsb.h / 360, 10));
            },
        //Set current and new colors
            setCurrentColor = function (hsb, cal) {
                $(cal).data('colpick').currentColor.css('backgroundColor', '#' + hsbToHex(hsb));
            },
            setNewColor = function (hsb, cal) {
                $(cal).data('colpick').newColor.css('backgroundColor', '#' + hsbToHex(hsb));
            },
        //Called when the new color is changed
            change = function () {
                var cal = $(this).parent().parent(), col;
                if (this.parentNode.className.indexOf('_hex') > 0) {
                    cal.data('colpick').color = col = hexToHsb(fixHex(this.value));
                    fillRGBFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                } else if (this.parentNode.className.indexOf('_hsb') > 0) {
                    cal.data('colpick').color = col = fixHSB({
                        h: parseInt(cal.data('colpick').fields.eq(4).val(), 10),
                        s: parseInt(cal.data('colpick').fields.eq(5).val(), 10),
                        b: parseInt(cal.data('colpick').fields.eq(6).val(), 10)
                    });
                    fillRGBFields(col, cal.get(0));
                    fillHexFields(col, cal.get(0));
                } else {
                    cal.data('colpick').color = col = rgbToHsb(fixRGB({
                        r: parseInt(cal.data('colpick').fields.eq(1).val(), 10),
                        g: parseInt(cal.data('colpick').fields.eq(2).val(), 10),
                        b: parseInt(cal.data('colpick').fields.eq(3).val(), 10)
                    }));
                    fillHexFields(col, cal.get(0));
                    fillHSBFields(col, cal.get(0));
                }
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
                cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 0]);
            },
        //Change style on blur and on focus of inputs
            blur = function () {
                $(this).parent().removeClass('colpick_focus');
            },
            focus = function () {
                $(this).parent().parent().data('colpick').fields.parent().removeClass('colpick_focus');
                $(this).parent().addClass('colpick_focus');
            },
        //Increment/decrement arrows functions
            downIncrement = function (ev) {
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                var field = $(this).parent().find('input').focus();
                var current = {
                    el: $(this).parent().addClass('colpick_slider'),
                    max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
                    y: ev.pageY,
                    field: field,
                    val: parseInt(field.val(), 10),
                    preview: $(this).parent().parent().data('colpick').livePreview
                };
                $(document).mouseup(current, upIncrement);
                $(document).mousemove(current, moveIncrement);
            },
            moveIncrement = function (ev) {
                ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val - ev.pageY + ev.data.y, 10))));
                if (ev.data.preview) {
                    change.apply(ev.data.field.get(0), [true]);
                }
                return false;
            },
            upIncrement = function (ev) {
                change.apply(ev.data.field.get(0), [true]);
                ev.data.el.removeClass('colpick_slider').find('input').focus();
                $(document).off('mouseup', upIncrement);
                $(document).off('mousemove', moveIncrement);
                return false;
            },
        //Hue slider functions
            downHue = function (ev) {
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                var current = {
                    cal: $(this).parent(),
                    y: $(this).offset().top
                };
                $(document).on('mouseup touchend', current, upHue);
                $(document).on('mousemove touchmove', current, moveHue);

                var pageY = ((ev.type == 'touchstart') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY );
                change.apply(
                    current.cal.data('colpick')
                        .fields.eq(4).val(parseInt(360 * (current.cal.data('colpick').height - (pageY - current.y)) / current.cal.data('colpick').height, 10))
                        .get(0),
                    [current.cal.data('colpick').livePreview]
                );
                return false;
            },
            moveHue = function (ev) {
                var pageY = ((ev.type == 'touchmove') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY );
                change.apply(
                    ev.data.cal.data('colpick')
                        .fields.eq(4).val(parseInt(360 * (ev.data.cal.data('colpick').height - Math.max(0, Math.min(ev.data.cal.data('colpick').height, (pageY - ev.data.y)))) / ev.data.cal.data('colpick').height, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upHue = function (ev) {
                fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                $(document).off('mouseup touchend', upHue);
                $(document).off('mousemove touchmove', moveHue);
                return false;
            },
        //Color selector functions
            downSelector = function (ev) {
                ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                var current = {
                    cal: $(this).parent(),
                    pos: $(this).offset()
                };
                current.preview = current.cal.data('colpick').livePreview;

                $(document).on('mouseup touchend', current, upSelector);
                $(document).on('mousemove touchmove', current, moveSelector);

                var pageX, pageY;
                if (ev.type == 'touchstart') {
                    pageX = ev.originalEvent.changedTouches[0].pageX;
                    pageY = ev.originalEvent.changedTouches[0].pageY;
                } else {
                    pageX = ev.pageX;
                    pageY = ev.pageY;
                }

                change.apply(
                    current.cal.data('colpick').fields
                        .eq(6).val(parseInt(100 * (current.cal.data('colpick').height - (pageY - current.pos.top)) / current.cal.data('colpick').height, 10)).end()
                        .eq(5).val(parseInt(100 * (pageX - current.pos.left) / current.cal.data('colpick').height, 10))
                        .get(0),
                    [current.preview]
                );
                return false;
            },
            moveSelector = function (ev) {
                var pageX, pageY;
                if (ev.type == 'touchmove') {
                    pageX = ev.originalEvent.changedTouches[0].pageX;
                    pageY = ev.originalEvent.changedTouches[0].pageY;
                } else {
                    pageX = ev.pageX;
                    pageY = ev.pageY;
                }

                change.apply(
                    ev.data.cal.data('colpick').fields
                        .eq(6).val(parseInt(100 * (ev.data.cal.data('colpick').height - Math.max(0, Math.min(ev.data.cal.data('colpick').height, (pageY - ev.data.pos.top)))) / ev.data.cal.data('colpick').height, 10)).end()
                        .eq(5).val(parseInt(100 * (Math.max(0, Math.min(ev.data.cal.data('colpick').height, (pageX - ev.data.pos.left)))) / ev.data.cal.data('colpick').height, 10))
                        .get(0),
                    [ev.data.preview]
                );
                return false;
            },
            upSelector = function (ev) {
                fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
                $(document).off('mouseup touchend', upSelector);
                $(document).off('mousemove touchmove', moveSelector);
                return false;
            },
        //Submit button
            clickSubmit = function () {
                var cal = $(this).parent();
                var col = cal.data('colpick').color;
                cal.data('colpick').origColor = col;
                setCurrentColor(col, cal.get(0));
                cal.data('colpick').onSubmit(col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el);
            },
        //Show/hide the color picker
            show = function (ev) {
                if (ev) {
                    // Prevent the trigger of any direct parent
                    ev.stopPropagation();
                }
                var cal = $('#' + $(this).data('colpickId'));
                if (ev && !cal.data('colpick').polyfill) {
                    ev.preventDefault();
                }
                cal.data('colpick').onBeforeShow.apply(this, [cal.get(0)]);
                var pos = $(this).offset();
                var top = pos.top + this.offsetHeight;
                var left = pos.left;
                var viewPort = getViewport();
                var calW = cal.width();
                if (left + calW > viewPort.l + viewPort.w) {
                    left -= calW;
                }
                cal.css({left: left + 'px', top: top + 'px'});
                if (cal.data('colpick').onShow.apply(this, [cal.get(0)]) != false) {
                    cal.show();
                }
                //Hide when user clicks outside
                $('html').mousedown({cal: cal}, hide);
                cal.mousedown(function (ev) {
                    ev.stopPropagation();
                })
            },
            hide = function (ev) {
                var cal = $('#' + $(this).data('colpickId'));
                if (ev) {
                    cal = ev.data.cal;
                }
                if (cal.data('colpick').onHide.apply(this, [cal.get(0)]) != false) {
                    cal.hide();
                }
                $('html').off('mousedown', hide);
            },
            getViewport = function () {
                var m = document.compatMode == 'CSS1Compat';
                return {
                    l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
                    w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth)
                };
            },
        //Fix the values if the user enters a negative or high value
            fixHSB = function (hsb) {
                return {
                    h: Math.min(360, Math.max(0, hsb.h)),
                    s: Math.min(100, Math.max(0, hsb.s)),
                    b: Math.min(100, Math.max(0, hsb.b))
                };
            },
            fixRGB = function (rgb) {
                return {
                    r: Math.min(255, Math.max(0, rgb.r)),
                    g: Math.min(255, Math.max(0, rgb.g)),
                    b: Math.min(255, Math.max(0, rgb.b))
                };
            },
            fixHex = function (hex) {
                var len = 6 - hex.length;
                if (len == 3) {
                    var e = [];
                    for (var j = 0; j < len; j++) {
                        e.push(hex[j]);
                        e.push(hex[j]);
                    }
                    hex = e.join('');
                } else {
                    if (len > 0) {
                        var o = [];
                        for (var i = 0; i < len; i++) {
                            o.push('0');
                        }
                        o.push(hex);
                        hex = o.join('');
                    }
                }
                return hex;
            },
            restoreOriginal = function () {
                var cal = $(this).parent();
                var col = cal.data('colpick').origColor;
                cal.data('colpick').color = col;
                fillRGBFields(col, cal.get(0));
                fillHexFields(col, cal.get(0));
                fillHSBFields(col, cal.get(0));
                setSelector(col, cal.get(0));
                setHue(col, cal.get(0));
                setNewColor(col, cal.get(0));
            };
        return {
            init: function (opt) {
                opt = $.extend({}, defaults, opt || {});
                //Set color
                if (opt.color === 'auto') {
                } else if (typeof opt.color == 'string') {
                    opt.color = hexToHsb(opt.color);
                } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
                    opt.color = rgbToHsb(opt.color);
                } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
                    opt.color = fixHSB(opt.color);
                } else {
                    return this;
                }

                //For each selected DOM element
                return this.each(function () {
                    //If the element does not have an ID
                    if (!$(this).data('colpickId')) {
                        var options = $.extend({}, opt);
                        //Color
                        if (opt.color === 'auto') {
                            options.color = $(this).val() ? hexToHsb($(this).val()) : {h: 0, s: 0, b: 0};
                        }
                        options.origColor = options.color;

                        //Polyfill
                        if (typeof opt.polyfill == 'function') {
                            options.polyfill = opt.polyfill(this);
                        }
                        if (options.polyfill && $(this).is('input') && this.type === "color") {
                            return;
                        }

                        //Generate and assign a random ID
                        var id = 'collorpicker_' + parseInt(Math.random() * 1000);
                        $(this).data('colpickId', id);
                        //Set the tpl's ID and get the HTML
                        var cal = $(tpl).attr('id', id);
                        //Add class according to layout
                        cal.addClass('colpick_' + options.layout + (options.submit ? '' : ' colpick_' + options.layout + '_ns'));
                        //Add class if the color scheme is not default
                        if (options.colorScheme != 'light') {
                            cal.addClass('colpick_' + options.colorScheme);
                        }
                        //Setup submit button
                        cal.find('div.colpick_submit').html(options.submitText).click(clickSubmit);
                        //Setup input fields
                        options.fields = cal.find('input').change(change).blur(blur).focus(focus);
                        cal.find('div.colpick_field_arrs').mousedown(downIncrement).end().find('div.colpick_current_color').click(restoreOriginal);
                        //Setup hue selector
                        options.selector = cal.find('div.colpick_color').on('mousedown touchstart', downSelector);
                        options.selectorIndic = options.selector.find('div.colpick_selector_outer');
                        //Store parts of the plugin
                        options.el = this;
                        options.hue = cal.find('div.colpick_hue_arrs');
                        var huebar = options.hue.parent();
                        //Paint the hue bar
                        var UA = navigator.userAgent.toLowerCase();
                        var isIE = navigator.appName === 'Microsoft Internet Explorer';
                        var IEver = isIE ? parseFloat(UA.match(/msie ([0-9]*[\.0-9]+)/)[1]) : 0;
                        var ngIE = ( isIE && IEver < 10 );
                        var stops = ['#ff0000', '#ff0080', '#ff00ff', '#8000ff', '#0000ff', '#0080ff', '#00ffff', '#00ff80', '#00ff00', '#80ff00', '#ffff00', '#ff8000', '#ff0000'];
                        if (ngIE) {
                            var i, div;
                            for (i = 0; i <= 11; i++) {
                                div = $('<div></div>').attr('style', 'height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + stops[i] + ', endColorstr=' + stops[i + 1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + stops[i] + ', endColorstr=' + stops[i + 1] + ')";');
                                huebar.append(div);
                            }
                        } else {
                            var stopList = stops.join(',');
                            huebar.attr('style', 'background:-webkit-linear-gradient(top,' + stopList + '); background: -o-linear-gradient(top,' + stopList + '); background: -ms-linear-gradient(top,' + stopList + '); background:-moz-linear-gradient(top,' + stopList + '); -webkit-linear-gradient(top,' + stopList + '); background:linear-gradient(to bottom,' + stopList + '); ');
                        }
                        cal.find('div.colpick_hue').on('mousedown touchstart', downHue);
                        options.newColor = cal.find('div.colpick_new_color');
                        options.currentColor = cal.find('div.colpick_current_color');
                        //Store options and fill with default color
                        cal.data('colpick', options);
                        fillRGBFields(options.color, cal.get(0));
                        fillHSBFields(options.color, cal.get(0));
                        fillHexFields(options.color, cal.get(0));
                        setHue(options.color, cal.get(0));
                        setSelector(options.color, cal.get(0));
                        setCurrentColor(options.color, cal.get(0));
                        setNewColor(options.color, cal.get(0));
                        //Append to body if flat=false, else show in place
                        if (options.flat) {
                            cal.appendTo(options.appendTo || this).show();
                            cal.css(options.styles || {
                                position: 'relative',
                                display: 'block'
                            });
                        } else {
                            cal.appendTo(options.appendTo || document.body);
                            $(this).on(options.showEvent, show);
                            cal.css(options.styles || {
                                position: 'absolute'
                            });
                        }
                    }
                });
            },
            //Shows the picker
            showPicker: function () {
                return this.each(function () {
                    if ($(this).data('colpickId')) {
                        show.apply(this);
                    }
                });
            },
            //Hides the picker
            hidePicker: function () {
                return this.each(function () {
                    if ($(this).data('colpickId')) {
                        hide.apply(this);
                    }
                });
            },
            //Sets a color as new and current (default)
            setColor: function (col, setCurrent) {
                setCurrent = (typeof setCurrent === "undefined") ? 1 : setCurrent;
                if (typeof col == 'string') {
                    col = hexToHsb(col);
                } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
                    col = rgbToHsb(col);
                } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
                    col = fixHSB(col);
                } else {
                    return this;
                }
                return this.each(function () {
                    if ($(this).data('colpickId')) {
                        var cal = $('#' + $(this).data('colpickId'));
                        cal.data('colpick').color = col;
                        cal.data('colpick').origColor = col;
                        fillRGBFields(col, cal.get(0));
                        fillHSBFields(col, cal.get(0));
                        fillHexFields(col, cal.get(0));
                        setHue(col, cal.get(0));
                        setSelector(col, cal.get(0));

                        setNewColor(col, cal.get(0));
                        cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 1]);
                        if (setCurrent) {
                            setCurrentColor(col, cal.get(0));
                        }
                    }
                });
            },
            destroy: function () {
                $('#' + $(this).data('colpickId')).remove();
            }
        };
    }();
    //Color space conversions
    var hexToRgb = function (hex) {
        hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
    };
    var hexToHsb = function (hex) {
        return rgbToHsb(hexToRgb(hex));
    };
    var rgbToHsb = function (rgb) {
        var hsb = {h: 0, s: 0, b: 0};
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
            else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
            else hsb.h = 4 + (rgb.r - rgb.g) / delta;
        } else hsb.h = -1;
        hsb.h *= 60;
        if (hsb.h < 0) hsb.h += 360;
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    };
    var hsbToRgb = function (hsb) {
        var rgb = {};
        var h = hsb.h;
        var s = hsb.s * 255 / 100;
        var v = hsb.b * 255 / 100;
        if (s == 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h == 360) h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0
            }
        }
        return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
    };
    var rgbToHex = function (rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        $.each(hex, function (nr, val) {
            if (val.length == 1) {
                hex[nr] = '0' + val;
            }
        });
        return hex.join('');
    };
    var hsbToHex = function (hsb) {
        return rgbToHex(hsbToRgb(hsb));
    };
    $.fn.extend({
        colpick: colpick.init,
        colpickHide: colpick.hidePicker,
        colpickShow: colpick.showPicker,
        colpickSetColor: colpick.setColor,
        colpickDestroy: colpick.destroy
    });
    $.extend({
        colpick: {
            rgbToHex: rgbToHex,
            rgbToHsb: rgbToHsb,
            hsbToHex: hsbToHex,
            hsbToRgb: hsbToRgb,
            hexToHsb: hexToHsb,
            hexToRgb: hexToRgb
        }
    });
}));

},{"jquery":10}],9:[function(require,module,exports){
/*!
 * jQuery UI Widget 1.12.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery", "./version" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

var widgetUuid = 0;
var widgetSlice = Array.prototype.slice;

$.cleanData = ( function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; ( elem = elems[ i ] ) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// Http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
} )( $.cleanData );

$.widget = function( name, base, prototype ) {
	var existingConstructor, constructor, basePrototype;

	// ProxiedPrototype allows the provided prototype to remain unmodified
	// so that it can be used as a mixin for multiple widgets (#8876)
	var proxiedPrototype = {};

	var namespace = name.split( "." )[ 0 ];
	name = name.split( "." )[ 1 ];
	var fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	if ( $.isArray( prototype ) ) {
		prototype = $.extend.apply( null, [ {} ].concat( prototype ) );
	}

	// Create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {

		// Allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// Allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	// Extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,

		// Copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),

		// Track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	} );

	basePrototype = new base();

	// We need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = ( function() {
			function _super() {
				return base.prototype[ prop ].apply( this, arguments );
			}

			function _superApply( args ) {
				return base.prototype[ prop ].apply( this, args );
			}

			return function() {
				var __super = this._super;
				var __superApply = this._superApply;
				var returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		} )();
	} );
	constructor.prototype = $.widget.extend( basePrototype, {

		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? ( basePrototype.widgetEventPrefix || name ) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	} );

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// Redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor,
				child._proto );
		} );

		// Remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widgetSlice.call( arguments, 1 );
	var inputIndex = 0;
	var inputLength = input.length;
	var key;
	var value;

	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {

				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :

						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );

				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string";
		var args = widgetSlice.call( arguments, 1 );
		var returnValue = this;

		if ( isMethodCall ) {
			this.each( function() {
				var methodValue;
				var instance = $.data( this, fullName );

				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}

				if ( !instance ) {
					return $.error( "cannot call methods on " + name +
						" prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}

				if ( !$.isFunction( instance[ options ] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name +
						" widget instance" );
				}

				methodValue = instance[ options ].apply( instance, args );

				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			} );
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat( args ) );
			}

			this.each( function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			} );
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",

	options: {
		classes: {},
		disabled: false,

		// Callbacks
		create: null
	},

	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widgetUuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();
		this.classesElementLookup = {};

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			} );
			this.document = $( element.style ?

				// Element within the document
				element.ownerDocument :

				// Element is window or document
				element.document || element );
			this.window = $( this.document[ 0 ].defaultView || this.document[ 0 ].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();

		if ( this.options.disabled ) {
			this._setOptionDisabled( this.options.disabled );
		}

		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},

	_getCreateOptions: function() {
		return {};
	},

	_getCreateEventData: $.noop,

	_create: $.noop,

	_init: $.noop,

	destroy: function() {
		var that = this;

		this._destroy();
		$.each( this.classesElementLookup, function( key, value ) {
			that._removeClass( value, key );
		} );

		// We can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.off( this.eventNamespace )
			.removeData( this.widgetFullName );
		this.widget()
			.off( this.eventNamespace )
			.removeAttr( "aria-disabled" );

		// Clean up events and states
		this.bindings.off( this.eventNamespace );
	},

	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;
		var parts;
		var curOption;
		var i;

		if ( arguments.length === 0 ) {

			// Don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {

			// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},

	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},

	_setOption: function( key, value ) {
		if ( key === "classes" ) {
			this._setOptionClasses( value );
		}

		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this._setOptionDisabled( value );
		}

		return this;
	},

	_setOptionClasses: function( value ) {
		var classKey, elements, currentElements;

		for ( classKey in value ) {
			currentElements = this.classesElementLookup[ classKey ];
			if ( value[ classKey ] === this.options.classes[ classKey ] ||
					!currentElements ||
					!currentElements.length ) {
				continue;
			}

			// We are doing this to create a new jQuery object because the _removeClass() call
			// on the next line is going to destroy the reference to the current elements being
			// tracked. We need to save a copy of this collection so that we can add the new classes
			// below.
			elements = $( currentElements.get() );
			this._removeClass( currentElements, classKey );

			// We don't use _addClass() here, because that uses this.options.classes
			// for generating the string of classes. We want to use the value passed in from
			// _setOption(), this is the new value of the classes option which was passed to
			// _setOption(). We pass this value directly to _classes().
			elements.addClass( this._classes( {
				element: elements,
				keys: classKey,
				classes: value,
				add: true
			} ) );
		}
	},

	_setOptionDisabled: function( value ) {
		this._toggleClass( this.widget(), this.widgetFullName + "-disabled", null, !!value );

		// If the widget is becoming disabled, then nothing is interactive
		if ( value ) {
			this._removeClass( this.hoverable, null, "ui-state-hover" );
			this._removeClass( this.focusable, null, "ui-state-focus" );
		}
	},

	enable: function() {
		return this._setOptions( { disabled: false } );
	},

	disable: function() {
		return this._setOptions( { disabled: true } );
	},

	_classes: function( options ) {
		var full = [];
		var that = this;

		options = $.extend( {
			element: this.element,
			classes: this.options.classes || {}
		}, options );

		function processClassString( classes, checkOption ) {
			var current, i;
			for ( i = 0; i < classes.length; i++ ) {
				current = that.classesElementLookup[ classes[ i ] ] || $();
				if ( options.add ) {
					current = $( $.unique( current.get().concat( options.element.get() ) ) );
				} else {
					current = $( current.not( options.element ).get() );
				}
				that.classesElementLookup[ classes[ i ] ] = current;
				full.push( classes[ i ] );
				if ( checkOption && options.classes[ classes[ i ] ] ) {
					full.push( options.classes[ classes[ i ] ] );
				}
			}
		}

		if ( options.keys ) {
			processClassString( options.keys.match( /\S+/g ) || [], true );
		}
		if ( options.extra ) {
			processClassString( options.extra.match( /\S+/g ) || [] );
		}

		return full.join( " " );
	},

	_removeClass: function( element, keys, extra ) {
		return this._toggleClass( element, keys, extra, false );
	},

	_addClass: function( element, keys, extra ) {
		return this._toggleClass( element, keys, extra, true );
	},

	_toggleClass: function( element, keys, extra, add ) {
		add = ( typeof add === "boolean" ) ? add : extra;
		var shift = ( typeof element === "string" || element === null ),
			options = {
				extra: shift ? keys : extra,
				keys: shift ? element : keys,
				element: shift ? this.element : element,
				add: add
			};
		options.element.toggleClass( this._classes( options ), add );
		return this;
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement;
		var instance = this;

		// No suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// No element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {

				// Allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
						$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// Copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ );
			var eventName = match[ 1 ] + instance.eventNamespace;
			var selector = match[ 2 ];

			if ( selector ) {
				delegateElement.on( eventName, selector, handlerProxy );
			} else {
				element.on( eventName, handlerProxy );
			}
		} );
	},

	_off: function( element, eventName ) {
		eventName = ( eventName || "" ).split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.off( eventName ).off( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				this._addClass( $( event.currentTarget ), null, "ui-state-hover" );
			},
			mouseleave: function( event ) {
				this._removeClass( $( event.currentTarget ), null, "ui-state-hover" );
			}
		} );
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				this._addClass( $( event.currentTarget ), null, "ui-state-focus" );
			},
			focusout: function( event ) {
				this._removeClass( $( event.currentTarget ), null, "ui-state-focus" );
			}
		} );
	},

	_trigger: function( type, event, data ) {
		var prop, orig;
		var callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();

		// The original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// Copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[ 0 ], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}

		var hasOptions;
		var effectName = !options ?
			method :
			options === true || typeof options === "number" ?
				defaultEffect :
				options.effect || defaultEffect;

		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}

		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;

		if ( options.delay ) {
			element.delay( options.delay );
		}

		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue( function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			} );
		}
	};
} );

return $.widget;

} ) );

},{}],10:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],11:[function(require,module,exports){
'use strict';

module.exports = require('./src/js/adaptor/jquery');

},{"./src/js/adaptor/jquery":12}],12:[function(require,module,exports){
'use strict';

var ps = require('../main');
var psInstances = require('../plugin/instances');

function mountJQuery(jQuery) {
  jQuery.fn.perfectScrollbar = function (settingOrCommand) {
    return this.each(function () {
      if (typeof settingOrCommand === 'object' ||
          typeof settingOrCommand === 'undefined') {
        // If it's an object or none, initialize.
        var settings = settingOrCommand;

        if (!psInstances.get(this)) {
          ps.initialize(this, settings);
        }
      } else {
        // Unless, it may be a command.
        var command = settingOrCommand;

        if (command === 'update') {
          ps.update(this);
        } else if (command === 'destroy') {
          ps.destroy(this);
        }
      }
    });
  };
}

if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define(['jquery'], mountJQuery);
} else {
  var jq = window.jQuery ? window.jQuery : window.$;
  if (typeof jq !== 'undefined') {
    mountJQuery(jq);
  }
}

module.exports = mountJQuery;

},{"../main":18,"../plugin/instances":29}],13:[function(require,module,exports){
'use strict';

function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return Array.prototype.slice.apply(element.classList);
  } else {
    return element.className.split(' ');
  }
};

},{}],14:[function(require,module,exports){
'use strict';

var DOM = {};

DOM.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;

},{}],15:[function(require,module,exports){
'use strict';

var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;

},{}],16:[function(require,module,exports){
'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

},{}],17:[function(require,module,exports){
'use strict';

var cls = require('./class');
var dom = require('./dom');

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

var clone = exports.clone = function (obj) {
  if (obj === null) {
    return null;
  } else if (obj.constructor === Array) {
    return obj.map(clone);
  } else if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = clone(original);
  for (var key in source) {
    result[key] = clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};

},{"./class":13,"./dom":14}],18:[function(require,module,exports){
'use strict';

var destroy = require('./plugin/destroy');
var initialize = require('./plugin/initialize');
var update = require('./plugin/update');

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};

},{"./plugin/destroy":20,"./plugin/initialize":28,"./plugin/update":32}],19:[function(require,module,exports){
'use strict';

module.exports = {
  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  stopPropagationOnClick: true,
  suppressScrollX: false,
  suppressScrollY: false,
  swipePropagation: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
  theme: 'default'
};

},{}],20:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};

},{"../lib/dom":14,"../lib/helper":17,"./instances":29}],21:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  if (i.settings.stopPropagationOnClick) {
    i.event.bind(i.scrollbarY, 'click', stopPropagation);
  }
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var halfOfScrollbarLength = _.toInt(i.scrollbarYHeight / 2);
    var positionTop = i.railYRatio * (e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top - halfOfScrollbarLength);
    var maxPositionTop = i.railYRatio * (i.railYHeight - i.scrollbarYHeight);
    var positionRatio = positionTop / maxPositionTop;

    if (positionRatio < 0) {
      positionRatio = 0;
    } else if (positionRatio > 1) {
      positionRatio = 1;
    }

    updateScroll(element, 'top', (i.contentHeight - i.containerHeight) * positionRatio);
    updateGeometry(element);

    e.stopPropagation();
  });

  if (i.settings.stopPropagationOnClick) {
    i.event.bind(i.scrollbarX, 'click', stopPropagation);
  }
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var halfOfScrollbarLength = _.toInt(i.scrollbarXWidth / 2);
    var positionLeft = i.railXRatio * (e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left - halfOfScrollbarLength);
    var maxPositionLeft = i.railXRatio * (i.railXWidth - i.scrollbarXWidth);
    var positionRatio = positionLeft / maxPositionLeft;

    if (positionRatio < 0) {
      positionRatio = 0;
    } else if (positionRatio > 1) {
      positionRatio = 1;
    }

    updateScroll(element, 'left', ((i.contentWidth - i.containerWidth) * positionRatio) - i.negativeScrollAdjustment);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};

},{"../../lib/helper":17,"../instances":29,"../update-geometry":30,"../update-scroll":31}],22:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};

},{"../../lib/dom":14,"../../lib/helper":17,"../instances":29,"../update-geometry":30,"../update-scroll":31}],23:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      deltaX = -30;
      break;
    case 38: // up
      deltaY = 30;
      break;
    case 39: // right
      deltaX = 30;
      break;
    case 40: // down
      deltaY = -30;
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};

},{"../../lib/dom":14,"../../lib/helper":17,"../instances":29,"../update-geometry":30,"../update-scroll":31}],24:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      if (child.tagName !== 'TEXTAREA' && !window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};

},{"../instances":29,"../update-geometry":30,"../update-scroll":31}],25:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};

},{"../instances":29,"../update-geometry":30}],26:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};

},{"../../lib/helper":17,"../instances":29,"../update-geometry":30,"../update-scroll":31}],27:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  }

  if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};

},{"../../lib/helper":17,"../instances":29,"../update-geometry":30,"../update-scroll":31}],28:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');

// Handlers
var handlers = {
  'click-rail': require('./handler/click-rail'),
  'drag-scrollbar': require('./handler/drag-scrollbar'),
  'keyboard': require('./handler/keyboard'),
  'wheel': require('./handler/mouse-wheel'),
  'touch': require('./handler/touch'),
  'selection': require('./handler/selection')
};
var nativeScrollHandler = require('./handler/native-scroll');

module.exports = function (element, userSettings) {
  userSettings = typeof userSettings === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = _.extend(i.settings, userSettings);
  cls.add(element, 'ps-theme-' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};

},{"../lib/class":13,"../lib/helper":17,"./handler/click-rail":21,"./handler/drag-scrollbar":22,"./handler/keyboard":23,"./handler/mouse-wheel":24,"./handler/native-scroll":25,"./handler/selection":26,"./handler/touch":27,"./instances":29,"./update-geometry":30}],29:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var defaultSettings = require('./default-setting');
var dom = require('../lib/dom');
var EventManager = require('../lib/event-manager');
var guid = require('../lib/guid');

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = _.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    cls.add(element, 'ps-focus');
  }

  function blur() {
    cls.remove(element, 'ps-focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};

},{"../lib/class":13,"../lib/dom":14,"../lib/event-manager":15,"../lib/guid":16,"../lib/helper":17,"./default-setting":19}],30:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateScroll = require('./update-scroll');

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    cls.add(element, 'ps-active-x');
  } else {
    cls.remove(element, 'ps-active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    cls.add(element, 'ps-active-y');
  } else {
    cls.remove(element, 'ps-active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};

},{"../lib/class":13,"../lib/dom":14,"../lib/helper":17,"./instances":29,"./update-scroll":31}],31:[function(require,module,exports){
'use strict';

var instances = require('./instances');

var upEvent = document.createEvent('Event');
var downEvent = document.createEvent('Event');
var leftEvent = document.createEvent('Event');
var rightEvent = document.createEvent('Event');
var yEvent = document.createEvent('Event');
var xEvent = document.createEvent('Event');
var xStartEvent = document.createEvent('Event');
var xEndEvent = document.createEvent('Event');
var yStartEvent = document.createEvent('Event');
var yEndEvent = document.createEvent('Event');
var lastTop;
var lastLeft;

upEvent.initEvent('ps-scroll-up', true, true);
downEvent.initEvent('ps-scroll-down', true, true);
leftEvent.initEvent('ps-scroll-left', true, true);
rightEvent.initEvent('ps-scroll-right', true, true);
yEvent.initEvent('ps-scroll-y', true, true);
xEvent.initEvent('ps-scroll-x', true, true);
xStartEvent.initEvent('ps-x-reach-start', true, true);
xEndEvent.initEvent('ps-x-reach-end', true, true);
yStartEvent.initEvent('ps-y-reach-start', true, true);
yEndEvent.initEvent('ps-y-reach-end', true, true);

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(yStartEvent);
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(xStartEvent);
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(yEndEvent);
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(xEndEvent);
  }

  if (!lastTop) {
    lastTop = element.scrollTop;
  }

  if (!lastLeft) {
    lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < lastTop) {
    element.dispatchEvent(upEvent);
  }

  if (axis === 'top' && value > lastTop) {
    element.dispatchEvent(downEvent);
  }

  if (axis === 'left' && value < lastLeft) {
    element.dispatchEvent(leftEvent);
  }

  if (axis === 'left' && value > lastLeft) {
    element.dispatchEvent(rightEvent);
  }

  if (axis === 'top') {
    element.scrollTop = lastTop = value;
    element.dispatchEvent(yEvent);
  }

  if (axis === 'left') {
    element.scrollLeft = lastLeft = value;
    element.dispatchEvent(xEvent);
  }

};

},{"./instances":29}],32:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');
var updateScroll = require('./update-scroll');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};

},{"../lib/dom":14,"../lib/helper":17,"./instances":29,"./update-geometry":30,"./update-scroll":31}],33:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],34:[function(require,module,exports){
'use strict';

var Marionette = require('backbone.marionette');
window.VideoEssenceApp = new Marionette.Application();
window.VideoEssenceApp.on('start', function() {
	console.log('Application start');
});

module.exports = window.VideoEssenceApp;

},{"backbone.marionette":2}],35:[function(require,module,exports){
var Backbone  =  require('backbone');
var Channel = require('../models/Channel.js');

var Channels = Backbone.Collection.extend({
	initialize: function (models, options) {
		options = options || {};
		this.category = options.category || '';
        this.youtubeNextPageToken = options.youtubeNextPageToken || '';
	},
	model: Channel,
    parse: function(response) {
        return response.channels;
    },
	url: function () {
		return '/site/category?type=json&name=' + this.category + '&youtubeNextPageToken=' + this.youtubeNextPageToken;
	}
});
module.exports = Channels;
},{"../models/Channel.js":48,"backbone":7}],36:[function(require,module,exports){
var Channel = require('../models/Channel.js');
var FollowedChannelCollection = Backbone.Collection.extend({
    model: Channel,
    channelProcess: function(isFollowed, data){
        var channel = new Channel();
        channel.set(data);

        if (isFollowed) {
            this.remove(channel);
        } else {
            this.add(channel);
        }
    }
});
module.exports = FollowedChannelCollection;

},{"../models/Channel.js":48}],37:[function(require,module,exports){
var GooglePost = require('../models/GooglePost.js');
var GooglePostCollection = Backbone.Collection.extend({
	model: GooglePost,
	url : '/post/search-google-posts'
});
module.exports = GooglePostCollection;
},{"../models/GooglePost.js":49}],38:[function(require,module,exports){
var Image = require('../models/Image.js');
var ImagesGalley = Backbone.Collection.extend({
	model: Image
});
module.exports = ImagesGalley;

},{"../models/Image.js":50}],39:[function(require,module,exports){
var LinkPost = require('../models/LinkPost.js');
var LinkPosts = Backbone.Collection.extend({
	initialize: function(models, options){
		try {
		}catch(err){}
	},
	model: LinkPost
});
module.exports = LinkPosts;
},{"../models/LinkPost.js":52}],40:[function(require,module,exports){
var VideoModel = require('../models/Video.js');
var PocketVideosCollection = Backbone.Collection.extend({
    model: VideoModel
});
module.exports = PocketVideosCollection;

},{"../models/Video.js":58}],41:[function(require,module,exports){
var PostCategory = require('../models/PostCategory.js');
var PostCategoriesCollection = Backbone.Collection.extend({
    model: PostCategory,
    parse: function(response) {
        return response;
    },
    url: function () {
        return '/post/get-categories';
    }
});
module.exports = PostCategoriesCollection;

},{"../models/PostCategory.js":54}],42:[function(require,module,exports){
var PostPage = require('../models/PostPage.js');
var PostPagesCollection = Backbone.Collection.extend({
    model: PostPage,
    parse: function(response) {
        return response;
    },
    url: function () {
        return '/page/index';
    }
});
module.exports = PostPagesCollection;

},{"../models/PostPage.js":55}],43:[function(require,module,exports){
var SimilarKeyword = require('../models/SimilarKeyword.js');
var SimilarKeywords = Backbone.Collection.extend({
	model: SimilarKeyword
});
module.exports = SimilarKeywords;
},{"../models/SimilarKeyword.js":56}],44:[function(require,module,exports){
var Twitter = require('../models/Twitter.js');
var Twitters = Backbone.Collection.extend({
	model: Twitter,
	url: function () {
		return '/post/twitters';
	}
});
module.exports = Twitters;
},{"../models/Twitter.js":57}],45:[function(require,module,exports){
var VideoROI = require('../models/VideoROI.js');
var VideoROICollection = Backbone.Collection.extend({
	model: VideoROI
});
module.exports = VideoROICollection;
},{"../models/VideoROI.js":59}],46:[function(require,module,exports){
var VideoModel = require('../models/Video.js');
var VideosCollection = Backbone.Collection.extend({
	initialize: function(models, options){
		try {
		//	options || (options = {});
			this.urlSearch = options.urlSearch || '';
			this.urlForChannelVideos = options.urlForChannelVideos || '';
			this.youtubeNextPageToken = options.youtubeNextPageToken || '';
		}catch(err){}
	},
	model: VideoModel,
    parse: function(response) {
        return response.videos;
    },
    channelVideos: function(channel_type, channel_id){
        this.urlSearch = this.urlForChannelVideos + '?channel_type=' + channel_type + '&channel_id=' + channel_id;
        this.youtubeNextPageToken = '';
        VideoEssenceApp.VideoExplore.videosView.resetOffset();
    },
	url:function(){
		if(this.urlSearch.indexOf('?') == -1){
			return this.urlSearch + '?youtubeNextPageToken=' + this.youtubeNextPageToken;
		}
		else {
			return this.urlSearch + '&youtubeNextPageToken=' + this.youtubeNextPageToken;
		}
	}
});
module.exports = VideosCollection;
},{"../models/Video.js":58}],47:[function(require,module,exports){
'use strict';
var VideoEssenceApp = require('./app.js');

VideoEssenceApp.on('start', function() {
	var CategoryModule = require('./modules/CategoryModule.js');
	VideoEssenceApp.module("Category", CategoryModule);

	var VideoExploreModule = require('./modules/VideoExplore.js');
	VideoEssenceApp.module("VideoExplore", VideoExploreModule);

	var SearchPanelModule = require('./modules/SearchPanel.js');
	VideoEssenceApp.module("SearchPanel", SearchPanelModule);

	var FollowPanelModule = require('./modules/FollowPanel.js');
	VideoEssenceApp.module("FollowPanel", FollowPanelModule);

	var PocketModule = require('./modules/Pocket.js');
	VideoEssenceApp.module("Pocket", PocketModule);

	var SimilarKeywordModule = require('./modules/SimilarKeywordModule.js');
	VideoEssenceApp.module("SimilarKeyword", SimilarKeywordModule);

	var MediaManagerModule = require('./modules/MediaManagerModule.js');
	VideoEssenceApp.module("MediaManager", MediaManagerModule);

	var PostCreateModule = require('./modules/PostCreateModule.js');
	VideoEssenceApp.module("PostCreate", PostCreateModule);

	var PostPublishModule = require('./modules/PostPublishModule.js');
	VideoEssenceApp.module("PostPublish", PostPublishModule);

	var GalleryModule = require('./modules/GalleryModule.js');
	VideoEssenceApp.module("Gallery", GalleryModule);

    var PostCategoriesModule = require('./modules/PostCategoriesModule.js');
    VideoEssenceApp.module("PostCategories", PostCategoriesModule);

    var PostPagesModule = require('./modules/PostPagesModule.js');
    VideoEssenceApp.module("PostPages", PostPagesModule);
});


},{"./app.js":34,"./modules/CategoryModule.js":60,"./modules/FollowPanel.js":61,"./modules/GalleryModule.js":62,"./modules/MediaManagerModule.js":63,"./modules/Pocket.js":64,"./modules/PostCategoriesModule.js":65,"./modules/PostCreateModule.js":66,"./modules/PostPagesModule.js":67,"./modules/PostPublishModule.js":68,"./modules/SearchPanel.js":69,"./modules/SimilarKeywordModule.js":70,"./modules/VideoExplore.js":71}],48:[function(require,module,exports){
var Channel = Backbone.Model.extend({
	defaults: {
	},
	initialize : function(){
		this.bind("change:followed", this.followChannel)
	},
	followChannel:function(){
        console.log("Channel");
		var url = !(this.get('followed'))?"/site/unfollow-channel":"/site/follow-channel";

        var isFollowed = !this.get('followed');

        var channelImg = this.get('image') != undefined ? this.get('image') :
            this.get('channelInfo') != undefined ? this.get('channelInfo').snippet.thumbnails.default : "";

        VideoEssenceApp.FollowPanel.followedChannelCollectionFull.channelProcess(isFollowed, {
            id:  encodeURIComponent(this.get('id')),
            title:  this.get('title'),
            type:  this.get('type'),
            url: this.get('url'),
            image: channelImg
        });

		var jqxhr = $.ajax(url, {

			method: 'post',
			data: {
				id: encodeURIComponent(this.get('id')),
				type:this.get('type'),
				subtype:this.get('subtype'),
				name:this.get('title'),
                image: channelImg
			}
		});
	}
});
module.exports = Channel;
},{}],49:[function(require,module,exports){
var GooglePost = Backbone.Model.extend({
	defaults: {
		author: "",
		author_id: "",
		author_url: "",
		published: "",
		url: "",
		content: "",
		saved: false
	}
});
module.exports = GooglePost;
},{}],50:[function(require,module,exports){
var Image = Backbone.Model.extend({
	defaults: {
		"path": "",
		"name": "",
		"info": "",
		"filesize": "",
		"description": "",
		"loaded_date": "",
		"timestamp": "",
		"uploaded": true
	}
});
module.exports = Image;
},{}],51:[function(require,module,exports){
var ImageSearch = Backbone.Model.extend({
	defaults: {
		"previewURL": "",
		"webformatURL": ""
	}
});
VideoEssenceApp.ImageSearch = ImageSearch;
module.exports = ImageSearch;
},{}],52:[function(require,module,exports){
var LinkPost = Backbone.Model.extend({
	defaults: {
		video_id: 1,
		type: "youtube",
		title: "this is title",
		description: "this is description"
	}
});
module.exports = LinkPost;
},{}],53:[function(require,module,exports){
var Post = Backbone.Model.extend({
    defaults: {
        id: null,
        title: '',
        placeholder: 'New page title',
        content: '',
        videos: [],
        images: [],
        author: null,
        date: null,
        saved: false,
	    first_video_id:'',
	    first_video_type:''
    },
    validate: function() {
        // this.checkEmptyTitle();
        // this.checkEmptyLines();
    },
    export: function() {

    },
	save: function () {
		var self = this;
		var jqxhr = $.ajax('/post/save', {
			method: 'post',
			data: {
				id: this.get('id'),
				title: this.get('title'),
				content: this.get('content'),
				images: this.get('images'),
				video_id: this.get('video_id'),
				video_type: this.get('video_type')
			},
			success: function (data) {
				if (data.status == 'success' && !_.isUndefined(data.data.id)) {
					var id = data.data.id;
					self.set({'id': id});
					// window.location.href = "/post/publish/" + id;
				}
				// console.log('post save')
			}
		})
	}
});
module.exports = Post;

},{}],54:[function(require,module,exports){
var PostCategory = Backbone.Model.extend({
    defaults: {
        id:"",
        label:"",
        open:false,
        inode:false,
        checkbox:true,
        radio:false,
        checked:false,
        trashed: 0,
        posts_count: 0,
        barge: ""
    }
});
module.exports = PostCategory;
},{}],55:[function(require,module,exports){
var PostPage = Backbone.Model.extend({
    defaults: {
        id: "",
        author: "",
        created_at: "",
        title: "",
        placeholder: 'New page title',
        content: "",
        status: 0,
        trashed: 0,
        comments_count: 0,
        checked: 0
    }
});
module.exports = PostPage;
},{}],56:[function(require,module,exports){
var Channel = require('./Channel.js');
var SimilarKeyword = Channel.extend({
	defaults: {
		type: 'search',
		subtype: 'search'
	}
});
module.exports = SimilarKeyword;
},{"./Channel.js":48}],57:[function(require,module,exports){
var Twitter = Backbone.Model.extend({
	defaults: {
		created_at: "",
		id: "",
		text: "",
		user: "",
        saved: false
	}
});
module.exports = Twitter;
},{}],58:[function(require,module,exports){
var VideoModel = Backbone.Model.extend({
	defaults: {
        saved: false,
        showButtonVideoHide:false
	},

	initialize : function(){
		this.set('saved', this.isVideoInPocket() );
        if(!_.isUndefined(VideoEssenceApp.FollowPanel)) {
            this.set('followed', VideoEssenceApp.FollowPanel.isHave(this.get('channel_id')));
        }
        this.bind("change:followed", this.followVideo);
	},
    followVideo:function(){
        console.log("VideoModel");
        var url = !(this.get('followed'))?"/site/unfollow-channel":"/site/follow-channel";

        var jqxhr = $.ajax(url, {

            method: 'post',
            data: {
                id:this.get('channel_id'),
                type:this.get('type'),
                subtype:this.get('channel_subtype'),
                name:this.get('channel_title')
            }

        })
    },
    hide:function(){
        var url = "/site/hide-video/?id="+ this.get('id')+'&type='+this.get('type');
        var jqxhr = $.ajax(url)
    },
    isVideoInPocket: function() {
        var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
        var resultVideos = _.where(videoModelsArr,{
            id:this.get('id')
        });
        return resultVideos.length;
    },
});
module.exports = VideoModel;
},{}],59:[function(require,module,exports){
var VideoROI = Backbone.Model.extend({
    types: {
        'lead': {
            title: 'Lead capture form',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_06.png'
        },
        'annotation': {
            title: 'Annotation',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_08.png'
        },
        'cta': {
            title: 'CTA button',
            img: 'http://res.cloudinary.com/diyo0e4ky/image/upload/v1415374378/VideoEssence/campaigns_12.png'
        }
    },
    colors: ['#FF3333', '#FF6633', '#FFCC33', '#99CC00', '#3399FF', '#003399', '#6633FF', ],
    fontSizes: [12, 14, 16, 18, 20, 22, 24, 26],
    emailProviders: ['aweber', 'getresponse', 'mailchimp', 'constantcontact', 'icontact', 'htmlform'],
    defaults: {
        type: 'lead',
        headline: 'Add keyword',
        subHeadline: 'We never spam your mailbox, you can unsubscribe\n from our channel at any time.',
        buttonText: null,
        targetUrl: 'http://',
        text: null,
        textFontSizenull: 12,
        textColor: '#000000',
        buttonColor: '#FF3333',
        left: 2,
        top: 2,
        backgroundColor: '#3399FF',
        opacity: 70,
        emailServiceProvider: null,
        timeStart: 0,
        timeStop: 0,
        displayOnPause: false,
        askNames: false,
        allowSkip: true,
        showCloseButton: true
    },
    video: {
        length: 500,
        thumbnail: 'http://i.ytimg.com/vi/UKY3scPIMd8/hqdefault.jpg'
    },
    initialize: function(attributes, options) {
        _.extend(this.video, _.result(options, 'video', {}));
        this.defaults.timeStop = this.video.length;
    },
    validate: function() {
        console.log('validation');
        if (this.get('type') === 'lead') {
            this.set({timeStop: 0}, {silent: true});
        }
        return true;
    }
});
module.exports = VideoROI;
},{}],60:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var CategoryModule = Marionette.Module.extend({
	startWithParent: false,
	onStart: function (options) {
		console.log('Category Module start');
		this.region = new Marionette.Region({
			el: ".video-wrapper"
		});
		var Channels = require('../collections/Channels.js');

		this.channels = new Channels(options.channels, {
			category: options.category,
			youtubeNextPageToken: options.youtubeNextPageToken
		});

        console.log('this.channels', this.channels);

		var ChannelsView = require('../views/ChannelsView.js');
		this.channelsView = new ChannelsView({
			collection: this.channels
		}, {
            name: options.name,
            imgs: options.imgs
        });
		this.region.show(this.channelsView);

        console.log(this.channelsView);

		this.scrollListener();
	},
	scrollListener : function () {
		var self = this;
		$(window).on("scroll", function () {
			if ($(window).scrollTop() >= $(document).height() - $(window).height() - 200 && !self.channelsView.works) {
				self.channelsView.getItems();
			}
		});
	}
});
module.exports = CategoryModule;
},{"../collections/Channels.js":35,"../views/ChannelsView.js":73,"backbone.marionette":2}],61:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var FollowVideosView = require('../views/FollowVideosView.js');
var FollowedChannelCollection = require('../collections/FollowedChannel.js');

var FollowPanelModule = Marionette.Module.extend({
	initialize: function (moduleName, app, options) {


            console.log('initialize FollowPanelModule');
            //console.log($("#main-view .left-column .followed-panel-wrapper").height());

            $(".followed-more .followed-more-wrapper").on('mousewheel DOMMouseScroll', function (e) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;

                this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                e.preventDefault();
            });

            //$(document).on("click", ".followed-more .more", function(){
            //    if ($(".followed-more .more .followed-more-wrapper").css("display") == "none"){
            //        $(".followed-more .more .followed-more-wrapper").show();
            //        $(".followed-more .more").css("background-color", "#333333").css("color", "#ffffff");
            //    }
            //});

            $(document).on("mouseOut", ".followed-more .more .followed-more-wrapper", function () {
                $(".followed-more .more .followed-more-wrapper").hide();
                $(".followed-more .more").css("background-color", "transparent").css("color", "#393939");
            });

            $(window).resize(function (e) {
                //var followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
                //var followedAdditionalHeight = window.innerHeight - 98 - 6;
                //var followedCount = Math.floor(followedHeight/42);

                var followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
                var followedAdditionalHeight = window.innerHeight - 98 - 6 - 80;
                var followedCount = Math.floor(followedHeight / 42);

                if (window.innerWidth > 800) {
                    $(".left-column .followed-panel .followed-panel-wrapper").height(followedHeight);
                    $(".left-column .followed-panel .followed-more .followed-more-wrapper").height(followedAdditionalHeight);
                }
                else {
                    $("#mobile-view-menu").height(window.innerHeight);
                    $("#mobile-view-menu").on('mousewheel DOMMouseScroll', function (e) {
                        var e0 = e.originalEvent,
                            delta = e0.wheelDelta || -e0.detail;

                        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                        e.preventDefault();
                    });
                }

                var followedChannelCollectionFull = VideoEssenceApp.FollowPanel.followedChannelCollectionFull;
                var followedChannelCollectionLeft = VideoEssenceApp.FollowPanel.followedChannelCollectionLeft;
                var followedChannelCollectionAdditional = VideoEssenceApp.FollowPanel.followedChannelCollectionAdditional;

                var followPanelRegion = VideoEssenceApp.FollowPanel.followPanelRegion;
                var mobileFollowedPanelRegnon = VideoEssenceApp.FollowPanel.mobileFollowedPanelRegnon;
                var followPanelRegionAdditional = VideoEssenceApp.FollowPanel.followPanelRegionAdditional;


                var followVideosView = "";
                var followVideosAdditionalView = "";

                if (followedChannelCollectionFull.length > followedCount) {
                    $(".followed-panel .followed-more").show();

                    followedChannelCollectionLeft.reset();
                    followedChannelCollectionLeft.add(followedChannelCollectionFull.slice(0, followedCount));
                    followedChannelCollectionAdditional.reset();
                    followedChannelCollectionAdditional.add(followedChannelCollectionFull.slice(followedCount));

                    followVideosView = new FollowVideosView({
                        collection: followedChannelCollectionLeft
                    });
                    followPanelRegion.show(followVideosView);

                    followVideosAdditionalView = new FollowVideosView({
                        collection: followedChannelCollectionAdditional
                    });
                    followPanelRegionAdditional.show(followVideosAdditionalView);

                    var mobileFollowVideosView = new FollowVideosView({
                        collection: followedChannelCollectionFull
                    });
                    mobileFollowedPanelRegnon.show(mobileFollowVideosView);

                } else {
                    $(".followed-panel .followed-more").hide();

                    followedChannelCollectionLeft.reset();
                    followedChannelCollectionLeft.add(followedChannelCollectionFull.models);

                    followVideosView = new FollowVideosView({
                        collection: followedChannelCollectionLeft
                    });

                    var mobileFollowVideosView = new FollowVideosView({
                        collection: followedChannelCollectionLeft
                    });

                    followPanelRegion.show(followVideosView);
                    mobileFollowedPanelRegnon.show(mobileFollowVideosView);
                }
            });

            this.mobileFollowedPanelRegnon = new Marionette.Region({
                el: "#mobile-view-menu .followed-panel-wrapper"
            });

            this.followPanelRegion = new Marionette.Region({
                el: "#main-view .followed-panel-wrapper"
            });

            this.followPanelRegionAdditional = new Marionette.Region({
                el: "#main-view .followed-more-wrapper"
            });

            this.followedChannelCollectionLeft = new FollowedChannelCollection();
            this.followedChannelCollectionAdditional = new FollowedChannelCollection();
            this.followedChannelCollectionFull = new FollowedChannelCollection();

            this.followedChannelCollectionFull.on("add remove", function () {
                if (this.followedChannelCollectionFull.length == 0) {
                    $(".followed-panel .followed-header, .followed-panel .followed-panel-wrapper").hide();
                    $(".followed-panel .new-user-message").show();
                    $(".followed-panel .followed-more").hide();
                }
                if (this.followedChannelCollectionFull.length > 0) {
                    $(".followed-panel .followed-header, .followed-panel .followed-panel-wrapper").show();
                    $(".followed-panel .new-user-message").hide();
                }

                this.followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
                this.followedAdditionalHeight = window.innerHeight - 98 - 6 - 80;
                this.followedCount = Math.floor(this.followedHeight / 42);

                $(".followed-panel .followed-header").find("span").text(this.followedChannelCollectionFull.length);
                //$("#mobile-view-menu .followed-header").find("span").text(this.followedChannelCollectionFull.length);

                if (window.innerWidth > 800) {
                    $(".left-column .followed-panel .followed-panel-wrapper").height(this.followedHeight);
                    $(".left-column .followed-panel .followed-more .followed-more-wrapper").height(this.followedAdditionalHeight);
                }
                else {
                    $("#mobile-view-menu").height(window.innerHeight);
                    $("#mobile-view-menu").on('mousewheel DOMMouseScroll', function (e) {
                        var e0 = e.originalEvent,
                            delta = e0.wheelDelta || -e0.detail;

                        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                        e.preventDefault();
                    });
                }

                var followVideosView = "";
                var followVideosAdditionalView = "";

                console.log(this.followedChannelCollectionFull.length, this.followedCount)
                if (this.followedChannelCollectionFull.length > this.followedCount) {
                    $(".followed-panel .followed-more").show();

                    this.followedChannelCollectionLeft.reset();
                    this.followedChannelCollectionLeft.add(this.followedChannelCollectionFull.slice(0, this.followedCount));
                    this.followedChannelCollectionAdditional.reset();
                    this.followedChannelCollectionAdditional.add(this.followedChannelCollectionFull.slice(this.followedCount));

                    followVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionLeft
                    });
                    this.followPanelRegion.show(followVideosView);

                    followVideosAdditionalView = new FollowVideosView({
                        collection: this.followedChannelCollectionAdditional
                    });
                    this.followPanelRegionAdditional.show(followVideosAdditionalView);
                    var mobileFollowVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionFull
                    });
                    this.mobileFollowedPanelRegnon.show(mobileFollowVideosView);

                } else {
                    $(".followed-panel .followed-more").hide();

                    this.followedChannelCollectionLeft.reset();
                    this.followedChannelCollectionLeft.add(this.followedChannelCollectionFull.models);

                    followVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionLeft
                    });

                    var mobileFollowVideosView = new FollowVideosView({
                        collection: this.followedChannelCollectionLeft
                    });

                    this.followPanelRegion.show(followVideosView);
                    this.mobileFollowedPanelRegnon.show(mobileFollowVideosView);
                }
            }, this);


            this.rerender = function () {
                console.log("this.rerender");
                //if ($(".followed-panel-wrapper").length) {
                //	var followVideosView = new FollowVideosView({
                //		collection: this.followedChannelCollectionLeft
                //	});
                //	this.followPanelRegion.show(followVideosView);
                //
                //   var mobileFollowVideosView = new FollowVideosView({
                //       collection: this.followedChannelCollectionLeft
                //   });
                //
                //	this.mobileFollowedPanelRegnon.show(mobileFollowVideosView);
                //}
            };

            this.isHave = function (videoId) {
                return this.followedChannelCollectionFull.get(videoId) != undefined;
            };

            this.add = function (channel) {
                this.followedChannelCollectionFull.add(channel);
            };

            this.remove = function (title) {
                var SearchModel = this.followedChannelCollectionFull.where({title: title});
                this.followedChannelCollectionFull.remove(SearchModel);
            };

            this.exist = function (channel_id) {
                var exist = this.followedChannelCollectionFull.where({title: channel_id});
                return exist.length > 0;
            };


		return false;
	},
	fillChannels: function (channels) {
        this.followedHeight = 0;
        this.followedCount = 0;

        if (window.innerWidth > 800){
            this.followedHeight = window.innerHeight - 98 - 6 - 64 - 28 - 42 - 20;
            this.followedAdditionalHeight = window.innerHeight - 98 - 6 - 80;
            this.followedCount = Math.floor(this.followedHeight/42);
            $(".left-column .followed-panel .followed-panel-wrapper").height(this.followedHeight);
            $(".left-column .followed-panel .followed-more .followed-more-wrapper").height(this.followedAdditionalHeight);
        }

        this.followedChannelCollectionFull.add(channels);
	}
});
module.exports = FollowPanelModule;
},{"../collections/FollowedChannel.js":36,"../views/FollowVideosView.js":75,"backbone.marionette":2}],62:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ImagesGallery = require('../collections/ImagesGallery.js');
var GalleryManager = require('../views/GalleryManager.js');

var GalleryModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function () {
		
	},
	onStart: function(options) {
		this.imagesGalleryCollection = new ImagesGallery(options.images_gallery);
		this.imagesPostsCollection = new ImagesGallery(options.images_posts);
		this.show();
	},
	show: function () {
		var $regionGallery = $(".page-content");
		this.galleryRegion = new Marionette.Region({
			el: $regionGallery[0]
		});
		this.Gallery = new GalleryManager();
		this.galleryRegion.show(this.Gallery);
	}
});

module.exports = GalleryModule;
},{"../collections/ImagesGallery.js":38,"../views/GalleryManager.js":78,"backbone.marionette":2}],63:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var MediaManagerModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function () {
		//this.imagesGalleyCollection = new VideoEssenceApp.ImagesGalley();
	},
	onStart: function(options) {
		var ImagesGallery = require('../collections/ImagesGallery.js')
		VideoEssenceApp.Gallery.imagesGalleryCollection = new ImagesGallery();
		VideoEssenceApp.Gallery.imagesGalleryCollection.set(options.images_gallery);
	},
	show: function (options) {
		var ModalMediaManager = require('../views/ModalMediaManager.js');

		this.modalView = new ModalMediaManager(options);

		$('.app').html(this.modalView.render().el);
	},
	hide: function () {
		this.modalView.destroy();
	}
});
module.exports = MediaManagerModule;
},{"../collections/ImagesGallery.js":38,"../views/ModalMediaManager.js":91,"backbone.marionette":2}],64:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var PocketModule = Marionette.Module.extend({
	initialize: function (moduleName, app, options) {
		console.log('initialize PocketModule');
		this.fillDataFromLS();

		var PocketView = require('../views/PocketView.js');
		this.view = new PocketView({
			model: new Backbone.Model({
				isMinification: this.isMinification,
				countVideo: this.pocketVideosCollection.length
			}),
			collection: this.pocketVideosCollection
		});

        //console.log("this.view", this.view);
        //console.log("this.pocketVideosCollection", this.pocketVideosCollection);

	},
	onStart: function () {
        if ($('.pocket').length == 0) {
            return;
        }
        //console.log("Pocket start");
		this.view.render();
	},
	fillDataFromLS: function () {
        //console.log("fillDataFromLS");
		var PocketVideosCollection = require('../collections/PocketVideos.js');
		this.pocketVideosCollection = new PocketVideosCollection();
		this.isMinification = false;
		this.fillVideosCollection();
		this.fillMinificationOption();
	},
	fillVideosCollection: function () {
		try {
			var VideoModel = require('../models/Video.js');
			var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
			var videoModels = [];
			for (var i in videoModelsArr) {
				var videoModel = videoModelsArr[i];
				videoModels.push(new VideoModel(videoModel));
			}
			this.pocketVideosCollection.set(videoModels);
		} catch (e) {
		}
	},
	fillMinificationOption: function () {
		var minificationOption = localStorage.getItem("pocketVideosMinification");
		if (!_.isNull(minificationOption)) {
			minificationOption = (minificationOption === 'true');
			this.isMinification = minificationOption;
		}
	},
	rerender: function () {
		this.view.render();
	}
});
module.exports = PocketModule;

},{"../collections/PocketVideos.js":40,"../models/Video.js":58,"../views/PocketView.js":99,"backbone.marionette":2}],65:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoriesListView = require('../views/PostCategoriesListView.js'),
    PostCategoriesTabView = require('../views/PostCategoriesTabView.js');

var PostCategoriesModule = Marionette.Module.extend({
    startWithParent: false,
    initialize: function (moduleName, app, options) {
        console.log("PostCategoriesModule initialized");
    },
    onStart: function(options){
        console.log("PostCategoriesModule onStart options", options);

        this.PostCategoriesTabView = new PostCategoriesTabView();

        this.postCategoriesListRegion = new Backbone.Marionette.Region({
            el: '#grid-view'
        });

        this.postCategoriesListRegion.show(this.PostCategoriesTabView );

        this.postCategoriesParams = {
            allCount: 0,
            trashedCount: 0,
            curTab: 0
        };

        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');

        //var territories = require("../../territories.json");
        //
        //this.territories = JSON.parse(territories);

    },
    initList: function(){

    }
});
module.exports = PostCategoriesModule;
},{"../collections/PostCategoriesCollection.js":41,"../views/PostCategoriesListView.js":102,"../views/PostCategoriesTabView.js":103,"../views/PostCategoryModal.js":106,"backbone.marionette":2}],66:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoROI = require('../models/VideoROI.js');
var ModalVideoCustomSelect = require('../views/ModalVideoCustomSelect.js');
var PostCreateModule = Marionette.Module.extend({
    postVideo: null,
	startWithParent: false,
    onStart: function (postData) {
        //console.log("postData", postData);

	    this.postData = postData;
        this.initRegions();

        this.showEditor();
    },
    initRegions: function() {
        this.editorRegion = new Backbone.Marionette.Region({
            el: '#post-editor'
        });
        this.modalRegion = new Backbone.Marionette.Region({
            el: '.app'
        });
    },
    showEditor: function() {
	    var Post = require('../models/Post.js');
        this.post = new Post(this.postData);

        console.log("this.post", this.post);

	    var PostEditorView = require('../views/PostEditorView.js');
        this.editor = new PostEditorView({model: this.post});
        this.listenTo(this.editor, 'video:custom:click', this.showCustomize);

        this.editorRegion.show(this.editor);
    },
    showCustomize: function(video, nodeId) {
        var roi = new VideoROI({}, {video: video});
        this.customView = new ModalVideoCustomSelect({model: roi});
        var callback = this.applyCustomize.bind(this, nodeId);
        this.listenTo(this.customView, 'video:custom:apply', callback);
        this.modalRegion.show(this.customView);
    },
    applyCustomize: function(nodeId, roi) {
        var customs = roi.video.customs;
        customs.push(roi.toJSON());
        this.editor.trigger('video:custom:update', nodeId, customs);
    }
});
module.exports = PostCreateModule;

},{"../models/Post.js":53,"../models/VideoROI.js":59,"../views/ModalVideoCustomSelect.js":96,"../views/PostEditorView.js":108,"backbone.marionette":2}],67:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostPagesCollection = require('../collections/PostPagesCollection.js'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostPagesLayoutView = require('../views/PostPagesLayoutView.js')
    //,PostPageEditor = require('../views/PostPageEditor.js')
    ;

var PostPagesModule = Marionette.Module.extend({
    startWithParent: false,
    initialize: function (moduleName, app, options) {
        console.log("PagesModule initialized");
    },
    onStart: function(options){
        // console.log("PagesModule onStart options", options);

        // список страниц
        this.PostPagesLayoutView = new PostPagesLayoutView();
        this.postPagesListRegion = new Backbone.Marionette.Region({
            el: '#post-pages-wp'
        });
        this.postPagesListRegion.show(this.PostPagesLayoutView );
        // end список страниц

        // редактор страницы
        this.editorWpRegion = new Backbone.Marionette.Region({
            el: '#page-editor-wp'
        });

        this.editorRegion = new Backbone.Marionette.Region({
            el: '#page-editor'
        });

        // end редактор страницы

    },
    goToEditPage: function(){
        this.postPagesListRegion.$el.hide();
        this.editorWpRegion.$el.show();

        this.showEditor();
    },
    goToPagesList: function(){
        this.postPagesListRegion.$el.show();
        this.editorWpRegion.$el.hide();

        clearInterval(this.editor.autosave);

        this.PostPagesLayoutView.model.fetch({
            method: 'POST',
            data: {}
        });

        //this.PostPagesLayoutView.render();
        this.postPagesListRegion.show(this.PostPagesLayoutView );
    },
    showEditor: function() {
        var Page = require('../models/PostPage.js');

        //var Pages = new (Backbone.Model.extend({
        //    defaults: {},
        //    parse: function(response) {
        //        return response;
        //    },
        //    url: function () {
        //        return '/page/index';
        //    }
        //}))();
        //Pages.fetch({
        //    method: 'POST'
        //})

        this.editPage = new Page();

        this.editPage.parse = function(response) {return response;};
        this.editPage.url = function () {return '/page/edit'; };

        //var pageId = 6; // todo: pageId устанавливается исходя из edit или new

        var pageForEditId = VideoEssenceApp.PostPages.PostPagesLayoutView.model.get('pageForEdit')

        this.editPage.set('id', parseInt(pageForEditId));

        console.log('pageForEditId', pageForEditId);

        var PostPageEditorView = require('../views/PostPageEditorView.js');

        console.log('test');

        this.editor = new PostPageEditorView({model: this.editPage});

        console.log('this.editor', this.editor.model);

        this.editorRegion.show(this.editor);
    }
});
module.exports = PostPagesModule;
},{"../collections/PostCategoriesCollection.js":41,"../collections/PostPagesCollection.js":42,"../models/PostPage.js":55,"../views/PostPageEditorView.js":109,"../views/PostPagesLayoutView.js":112,"backbone.marionette":2}],68:[function(require,module,exports){
var Marionette = require('backbone.marionette')
    //PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    //PostCategoriesView = require('./PostCategoriesView.js'),
    //PostCategoryView = require('./PostCategoryView.js'),
    //PostCategory = require('../models/PostCategory.js')
    ;

var VideoROI = require('../models/VideoROI.js');
var ModalVideoCustomSelect = require('../views/ModalVideoCustomSelect.js');

var PostPublishModule = Marionette.Module.extend({
    startWithParent: false,
    postVideo: null,
    onStart: function(options){
        //console.log("PostPublishModule onStart options");
// --------------------------------------------  Publish  --------------------------------------------------------------
        this.additinonalInfo = options.additinonalInfo;
        this.postInformationShowRelated = options.postInformationShowRelated;
        this.postInformationTags = options.postInformationTags;

        var PostPublishView = require('../views/PostPublishView.js');

        this.publishView = new PostPublishView({}, {
            additinonalInfo: this.additinonalInfo
        });
        this.publishView.render();


        this.currentPostRelation = new Backbone.Collection();
        this.postRelation = new Backbone.Collection();

        //this.initTagInputs();

        var LinkPosts = require('../collections/LinkPosts.js');
        this.linkPostsCollection = new LinkPosts();

        var LinkPostsView = require('../views/LinkPostView.js');
        this.linkPostsView = new LinkPostsView({
            collection: this.linkPostsCollection
        });
        var RelatedModal = require('../views/RelatedModal.js');
        $(".relations-popup").click(function () {
            $('.app').html(new RelatedModal().render().el);
        });

        //var PostCategoryModal = require('../views/PostCategoryModal.js');
        //$(".post-add-category").click(function () {
        //    $('.app').html(new PostCategoryModal().render().el);
        //});

        $('.search-post').bind("enterKey",function(e){
            VideoEssenceApp.RelatedModal.search();
        });
        $('.search-post').keydown(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterKey");
            }
        });
// ---------------------------------------------  Edit Post  -----------------------------------------------------------
        this.postData = options.postData;

        //console.log("options", options);
        //console.log("this.postData", this.postData);

        this.initRegions();

        this.showEditor();
// ----------------------------------------  end Edit Post  ------------------------------------------------------------
    },
	initialize: function (moduleName, app, options) {
        console.log("PostPublishModule initialized");
	},
	initTagInputs: function (opt) {

		var postTags = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace
		});
		postTags.initialize();
        postTags.add([{val: 'dog'}]);

        //console.log("initTagInputs postTags", postTags);

		this.tagsBlock = $('.input-post-tags');
		this.tagsBlock.tagsinput({
			typeaheadjs: {
				name: 'posttags',
				displayKey: 'name',
				valueKey: 'name',
				source: postTags.ttAdapter()
			},
            value: "Amsterdam,Washington,Sydney,Beijing,Cairo"
		});
        for (val in opt){
            if (!opt.hasOwnProperty(val)) continue;
            this.tagsBlock.tagsinput('add', opt[val]);
        }
	},

// editor --------------------------------------------------------------------------------------------------------------

    initRegions: function() {
        this.editorRegion = new Backbone.Marionette.Region({
            el: '#post-editor'
        });
        this.modalRegion = new Backbone.Marionette.Region({
            el: '.app'
        });
    },
    showEditor: function() {
        var Post = require('../models/Post.js');

        //console.log("PostPublishModule showEditor");

        //console.log("showEditor", this.postData);
        this.postData.content = decodeURIComponent(this.postData.content);
        //console.log("showEditor this.postData.content", this.postData.content);

        this.post = new Post(this.postData);

        var PostEditorView = require('../views/PostEditorView.js');

        //console.log("PostPublishModule this.post", this.post);

        this.editor = new PostEditorView({model: this.post});
        this.listenTo(this.editor, 'video:custom:click', this.showCustomize);

        this.editorRegion.show(this.editor);
    },
    showCustomize: function(video, nodeId) {
        //console.log("PostPublishModule showCustomize", video);

        var roi = new VideoROI({}, {video: video});
        this.customView = new ModalVideoCustomSelect({model: roi});
        var callback = this.applyCustomize.bind(this, nodeId);
        this.listenTo(this.customView, 'video:custom:apply', callback);
        this.modalRegion.show(this.customView);
    },
    applyCustomize: function(nodeId, roi) {
        var customs = roi.video.customs;
        customs.push(roi.toJSON());
        this.editor.trigger('video:custom:update', nodeId, customs);
    }
});
module.exports = PostPublishModule;

},{"../collections/LinkPosts.js":39,"../models/Post.js":53,"../models/VideoROI.js":59,"../views/LinkPostView.js":85,"../views/ModalVideoCustomSelect.js":96,"../views/PostEditorView.js":108,"../views/PostPublishView.js":115,"../views/RelatedModal.js":116,"backbone.marionette":2}],69:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var SearchPanelModule = Marionette.Module.extend({
    initialize: function( moduleName, app, options ) {
	    console.log('initialize SearchPanel');

	    var Channels = require('../collections/Channels.js');
	    this.searchChannelCollection = new Channels();
	    this.searchChannelCollection.url = '/site/getchannelbykeyword';
	    //this.searchPanelRegionMobile = new Marionette.Region({
		 //   el: "#mobile-view-menu .search-panel-wrapper"
	    //});
        //this.searchChannelCollection.on("request", function(model, xhr, options){
         //   //console.log("request", this, model, xhr, options);
         //   console.log("request", this.first(3), model.first(3));
        //});
        this.searchChannelCollection.on("sync", function(model, resp, options){
            //console.log("request", this, model, resp, options);
            console.log("sync", this.first(3), model.first(3), model);
            //model.reset();
            //model.add(model.first(3));

            //var f3 = model.first(3);
            //model.url = '/site/getchannelbykeyword';

        });

        this.searchPanelRegionNormal = new Marionette.Region({
            el: ".search-wp .channel-wp"
	    });

	    return false;
    },
	fillChannels: function (keyword) {
		this.searchChannelCollection.fetch({
			remove: false,
			add: true,
			merge: false,
			data: {"textToSearch": keyword}
		});

        //this.searchChannelCollection.reset(this.searchChannelCollection.first(3));
        console.log("this.searchChannelCollection1",
            this.searchChannelCollection,
            _.first(this.searchChannelCollection, 3),
            this.searchChannelCollection.first(3)
        );

        //console.log("this.searchChannelCollection.models", this.searchChannelCollection.models);

		var SearchVideosView = require('../views/SearchVideosView.js');
		//var videosViewMobile = new SearchVideosView({
		//	collection: this.searchChannelCollection
		//});
        var videosViewNormal = new SearchVideosView({
            collection: this.searchChannelCollection
        });
        //console.log("videosViewNormal ", videosViewNormal.collection, _.first(videosViewNormal.collection, 3));
		if($(".search-panel-wrapper").length > 0 || $(".search-wp .channel-wp").length > 0) {
            this.searchPanelRegionNormal.show(videosViewNormal);
            //this.searchPanelRegionMobile.show(videosViewMobile);
		}
	}
});
module.exports = SearchPanelModule;
},{"../collections/Channels.js":35,"../views/SearchVideosView.js":118,"backbone.marionette":2}],70:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var SimilarKeywordModule = Marionette.Module.extend({
	startWithParent: false,
	initialize: function( moduleName, app, options ) {
		//this.regionMobile = new Backbone.Marionette.Region({
		//	el: "#mobile-view-menu .similar-keyword-wrapper"
		//});

        this.regionNormal = new Backbone.Marionette.Region({
			el: ".search-wp .topic-wp"
		});

	},
	onStart: function(options) {
		this.textToSearch = options.textToSearch;
        //console.log("options.textToSearch", options.textToSearch);

		var similar_keywords_query = document.createElement('script');
		similar_keywords_query.setAttribute('src','https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q='+options.textToSearch+'&xhr=t&callback=createSimilarKeywords');
		document.head.appendChild(similar_keywords_query);

	},
	showPanel: function(data) {
		var SimilarKeywordsView = require('../views/SimilarKeywordsView.js');
		var SimilarKeywords = require('../collections/SimilarKeywords.js');
		var collection = new SimilarKeywords();
		//this.viewMobile = new SimilarKeywordsView({
		//	collection: collection,
         //   className: "thisViewMobile"
		//});
        this.viewNormal = new SimilarKeywordsView({
			collection: collection,
            className: "thisViewNormal"
		});
        //this.viewNormal.className = "thisViewNormal";

        //console.log("showPanel this.textToSearch", this.textToSearch);
        //console.log("showPanel collection", collection);

        this.textToSearch = data[0].trim();

		collection.push({
			title: this.textToSearch,
			id: this.textToSearch,
            url: "/site/channelvideos?channel_type=search&channel_id="+encodeURIComponent(this.textToSearch)
		});

        //console.log("collection data", data, _.first(data[1], [5]));

        // todo: 6 - max limit for topics (5 + 1)
		collection.add(_.map(_.first(data[1], [5]), function(element){
			var query = element[0].replace(/<b>/gi," ").replace(/<\/b>/gi," ").trim();
			return {
				title: query,
				id: query,
                url: "/site/channelvideos?channel_type=search&channel_id="+encodeURIComponent(query)
			};
		}));

        //console.log("collection", collection, collection.first(6));

		//this.regionMobile.show(this.viewMobile);
		this.regionNormal.show(this.viewNormal);
	}
});
module.exports = SimilarKeywordModule;
},{"../collections/SimilarKeywords.js":43,"../views/SimilarKeywordsView.js":119,"backbone.marionette":2}],71:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideosCollection = require('../collections/Videos.js');

var VideoExplore = Marionette.Module.extend({
	startWithParent: false,
	initialize: function (moduleName, app, options) {
		console.log('initialize VideoExplore');
		this.videosCollection = new VideosCollection([]);
		this.videoRegion = new Marionette.Region({
            el: ".explore-video-wrapper"
        });
		var self = this;
		VideoEssenceApp.vent.on("pocket:videoRemove", function (model) {
			var videoInCanvas = self.videosCollection.get(model);
			if (!_.isUndefined(videoInCanvas)) {
				videoInCanvas.set('saved', false);
			}
		});
	},
	onStart: function (options) {
		this.videosCollection = new VideosCollection([], options.collectionOptions);
        console.log("options.videos", options.videos);
		this.videosCollection.set(options.videos);

		var VideosView = require('../views/VideosView.js');
		this.videosView = new VideosView({
			collection: this.videosCollection
		}, {
            channelInfo: options.channelInfo,
            followChannels: options.followChannels,
            categoryName: (parseInt(options.categoryName) != 0 ) ? options.categoryName : "Categories",
            isSearch: options.isSearch != undefined ? options.isSearch : false
        });
		this.videoRegion.show(this.videosView);

		if (options.stopPaging) {
			this.videosView.stopGetting();
		} else {
			this.videosView.getItems(true);
		}
	},

    embededHtml: function(type, url, node_name, cls, videoWidth, videoHeight) {
        var width = 840,
            height = this.normalizeSizeVideo('width', width);

        console.log('embededHtml', type, url, node_name, cls );

    	try {
    		videojs(node_name).dispose();
    	} catch (e) {
    		
    	}

        if (cls == 'mini-frame') {
            width = 420;
            height = 237;
        } else if (cls == 'full-width') {
            width = '100%';
            height = 'auto';
            //width = 840;
            //height = 468;
        }
        switch(type) {
            case 'vimeo':
                return "<video contenteditable='false' frameborder='0' id='" + node_name + "' data-width='" + videoWidth + "' " +
                    "data-height='" + videoHeight + "' class='video-js video-js-vimeo vjs-default-skin " +
                    cls + "' webkitallowfullscreen mozallowfullscreen allowfullscreen controls autoplay preload='auto' " +
                    "width='" + width + "' height='" + height + "' ></video>";
            case 'youtube':
                return "<video contenteditable='false' id='" + node_name + "' src='' class='video-js vjs-default-skin " + cls + "' controls autoplay preload='auto' width='" + width + "' height='" + height + "' data-setup='{ \"techOrder\": [\"youtube\"], \"src\": \"" + url + "\"}'></video>";
        }
        return null;
    },
    embededVideo: function (node, html, node_name, videoModel) {
        var video, videoNode;
        node.addClass("is-ve-video").addClass("done");
        node.html(html);

        console.log('embededVideo', node, html, node_name, videoModel);

        videoNode = node.find('video');

        if (videoNode.hasClass('full-width')) {
        	var height = this.normalizeSizeVideo('width', videoNode.width(), videoModel.get('width'), videoModel.get('height'));
        	//console.log(height);
        	//console.log(videoNode.width());
        	videoNode.attr('height', height);
        	//console.log(videoNode.height());
        }

        if(videoModel.get('type') == 'vimeo') {
            video = videojs(node_name, {
                //techOrder: ["html5", "youtube", "flash"],
                techOrder: ["vimeo"],
                //example_option: true,
                autoplay: false,
                controls: true,
                preload: "auto",
                src: videoModel.get('url'),
                poster: videoModel.get('poster')
            }).ready(function(){
                //console.log('this', this);

                var videoJsVimeo = $('.video-js-vimeo');

                video.load();
                video.on('fullscreenchange', function(e){
                    var self = $(e.target);

                    var normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo(
                        'height',
                        self.parent().height(),
                        videoModel.get('width'),
                        videoModel.get('height')
                    );

                    var bigView = 0;
                    if (VideoEssenceApp.VideoExplore.videosView != undefined)
                        bigView = VideoEssenceApp.VideoExplore.videosView.model.get('bigView');

                    if (window.innerHeight == self.height()) {
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo(
                            'height',
                            window.innerHeight,
                            videoModel.get('width'),
                            videoModel.get('height')
                        );
                        $('.vjs-fullscreen .vjs-tech-vimeo')
                            .css('height', window.innerHeight + 400 + 'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', (bigView) ? 0 : (window.innerWidth - normalizeWidth) / 2 )
                        ;
                    }else{
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo(
                            'height',
                            self.parent().height(),
                            videoModel.get('width'),
                            videoModel.get('height')
                        );
                        $('.vjs-tech-vimeo')
                            .css('height', self.parent().height() + 400 +'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', 0 )
                        ;
                    }
                });
            });
        } else {
            video = videojs(node_name).on("ended", function () {
                this.play();
            });
        }

        return video;
    },
    showModal: function (e, m) {
        e.preventDefault();
        var model = new Backbone.Model({
            id : m.get("id"),
            type : m.get("type"),
            title : m.get("title")
        });

        var ModalHandelbars = require('../views/ModalHandlebars.js');
        var TabModal = ModalHandelbars.extend({
            template: VideoEssenceApp.templates['modal-template'],
            cancelEl: '.modal-close',
            model:model
        });
        var tabModal = new TabModal();

        $('.app').html(tabModal.render().el);

        var node = $('.video-frame-popup');
        var content = this.embededHtml(m.get('type'), m.get('url'), m.id, 'full-width', m.get('width'), m.get('height'));
        this.embededVideo(node, content, m.id, m);
    },

    normalizeSizeVideo: function (param, value, width, height) {
        var w = 12, h = 9;
        console.log(height / width != .75, height / width, width, height)
        if (height / width != .75){
            w = 16;
        }
    	switch (param) {
    		case 'width':
    			//return (value / 16) * 9;
    			return (value / w) * h;
    		case 'height':
    			//return (value / 9) * 16;
    			return (value / h) * w;
    	}
    	return null;
    }
});
module.exports = VideoExplore;
},{"../collections/Videos.js":46,"../views/ModalHandlebars.js":89,"../views/VideosView.js":131,"backbone.marionette":2}],72:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var ChannelView = Marionette.ItemView.extend({
	className: "video-item-wrapper",
	template:  VideoEssenceApp.templates['row-category-template'],
	events: {
		'click .button-like .following': 'clickedButton',
		'mouseover  .button-like .following': 'hoverFollowIn',
		'mouseout  .button-like .following': 'hoverFollowOut'
	},

	clickedButton: function() {
		var isSaved = this.model.get('followed');

		this.model.set('followed', !isSaved);
		this.render();
	},
    hoverFollowIn: function(e){
        //console.log("in", this.model.attributes);
        var self = $(e.target);
        if (self.hasClass("followed")){
            self.text("Unfollow").css("background-color", "#bcc4c5").css("color", "#ffffff");
        }
        else{
            self.css("color", "#ffffff").css("background-color", "#fc3768");
        }
    },
    hoverFollowOut: function(e){
        //console.log("out", e.target);
        var self = $(e.target);
        if (self.hasClass("followed")){
            self.text("Following").css("background-color", "#ffffff").css("color", "#bcc4c5");
        }
        else{
            self.css("color", "#fc3768").css("background-color", "#ffffff");
        }
    }
});
module.exports = ChannelView;
},{"backbone.marionette":2}],73:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var ChannelView = require('./ChannelView.js');

var ChannelsView = Marionette.CompositeView.extend({
    offset: 20,
    limit: 20,
    works: false,
    model: new Backbone.Model({
        gettingIsStop: false
    }),
	childView: ChannelView,
    template:  VideoEssenceApp.templates['category-template'],
    childViewContainer: '.list',
    getItems: function(){
        this.works = true;
        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"offset": this.offset, "limit": this.limit},
            success: _.bind(function(model, response, options){
                if(response.channels.length>0)
                {
                    this.works = false;
                    this.offset += this.limit;
                    this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
                }
                else
                {
                    this.stopGetting();
                }
            }, this),
            error: _.bind(function(){
                this.stopGetting();
            }, this)
        });
    },
    stopGetting: function(){
        this.works = false;
        this.model.set('gettingIsStop', true);
        this.render();
    },
    constructor: function (params, options) {
        Marionette.CompositeView.prototype.constructor.apply(this, arguments);

        this.model.set("nameCat",  options.name);
        this.model.set("imgs",  options.imgs);
        this.model.set("retina", window.devicePixelRatio > 1);

    }
});
module.exports = ChannelsView;

},{"./ChannelView.js":72,"backbone":7,"backbone.marionette":2}],74:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var FollowVideoView = Marionette.ItemView.extend({
	template:  VideoEssenceApp.templates['followed-video-template'],
	events: {
		'click .url': 'showChannelVideos'
	},
	showChannelVideos: function (e) {
        e.preventDefault();
        if (window.location.href.match(/\/site\/channelvideos/gi) == null || window.location.href.match(/\/site\/channelvideos/gi).length == 0){
            window.location.href = '/site/channelvideos?channel_type='+this.model.attributes.type+'&channel_id='+this.model.attributes.id;
        }
        else {
            VideoEssenceApp.VideoExplore.videosCollection.urlForChannelVideos = '/site/channelvideos';
            VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
            VideoEssenceApp.VideoExplore.videosView.getItems();
        }
		return false;
	}
});
module.exports = FollowVideoView;
},{"backbone.marionette":2}],75:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var FollowVideoView = require('./FollowVideoView.js');
var FollowVideosView = Marionette.CollectionView.extend({
	childView: FollowVideoView
});
module.exports = FollowVideosView;

},{"./FollowVideoView.js":74,"backbone.marionette":2}],76:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ModalImageDetails = require('./ModalImageDetails');

var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
	template: VideoEssenceApp.templates['gallery-image-template'],
	events: {
		'click .checkbox': 'toggleItem',
		'click .delete-image': 'deleteItem',
		'click .cancel-upload': 'cancelUpload',
		'click .open-image-details': 'imageDetails'
	},
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'change:uploaded', this.render);
		this.listenTo(this.model, 'change:progress', this.render);
		this.listenTo(this.model, 'change:error', this.render);
	},
	onRender: function () {
		$(this.$el.find('.image-actions')).popover({
			content: '<span class="open-image-details">Details</span><span class="delete-image">Delete</span>',
			html: true,
			placement: 'bottom'
		});

		var date = moment.unix(this.model.get('timestamp')),
			diffd = date.diff(moment(), 'days'),
			diffy = date.diff(moment(), 'years'),
			date_text;

		if (Math.abs(diffy) > 0)
			date_text = date.format("MMMM, D, YYYY");
		else if (Math.abs(diffd) > 2)
			date_text = date.format("MMMM, D");
		else
			date_text = date.fromNow();

		this.model.set('date_text', date_text);
	},

	imageDetails: function () {
		var self = this,
			image;
		self.model.set('size_str', self.bytesToSize(self.model.get('filesize')))
		var modal = new ModalImageDetails({
			model: self.model
		});

		modal.show();
	},

	bytesToSize: function (bytes) {
	    var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
	    if (bytes == 0) return '0 Byte';
	    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	},

	toggleItem: function () {
		if (this.$el.hasClass('selected-item-gallery')) {
			this.model.set('selected', false);
			this.$el.removeClass('selected-item-gallery');
		} else {
			this.model.set('selected', true);
			this.$el.addClass('selected-item-gallery');
		}
		this.render();
	},
	deleteItem: function () {
		this.model.destroy({url: "/image/delete/" + this.model.get('id')});
	},
	cancelUpload: function () {
		this.model.set({'canceled': true});
	}
});

module.exports = ImageView;
},{"./ModalImageDetails":90,"backbone.marionette":2}],77:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var GalleryImageView = require('./GalleryImageView.js');

var GalleryImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: GalleryImageView
});

module.exports = GalleryImagesView;

},{"./GalleryImageView.js":76,"backbone.marionette":2}],78:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
	ImagesCollection = require('../collections/ImagesGallery.js'),
	ImagesView = require('./GalleryImagesView.js'),
	ImageView = require('./GalleryImageView.js'),
	ImageModel = require('../models/Image.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);

var GalleryManager = Marionette.ItemView.extend({
	tagName: 'div',
	id: 'image-library-content',
	template:  VideoEssenceApp.templates['gallery-template'],
	events: {
		// 'click .tab-image-library': 'renderLibrary',
		// 'click .tab-image-posts': 'renderLibraryPosts',
		'click .action-delete': 'deleteItems',
		'click .action-add': 'actionUpload'
	},
	currentTab: '',
	parallelUploads: 1,
	maxFileSize: 3,
	errorCode: {
		0: 'Error',
		1: 'File size too big',
		2: 'Uploading error',
		3: 'Uploading canceled'
	},

	galleryRegion: '#gallery-media-region',
	emptyRegion: '#gallery-empty-region',

	onRender: function () {
		var self = this.$el;

		this.renderLibrary();
		this.changeRegion();

		this.listenTo(this.collection, 'destroy', this.changeRegion);
		this.listenTo(this.collection, 'add', this.changeRegion);

		this.listenTo(this.collection, 'add', this.generateTextDate);
	},

	changeRegion: function () {
		this.$el.find(this.galleryRegion).hide();
		this.$el.find(this.emptyRegion).hide();

		if (this.collection.length == 0)
			this.$el.find(this.emptyRegion).show()
		else
			this.$el.find(this.galleryRegion).show();

		this.changeCount();
	},

	changeTab: function (tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
	},
	hideAllBeforeSelect: function () {
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.tab-content-gallery').hide();
	},
	renderLibrary: function () {
		this.changeTab('.tab-image-library', '#tab-image-library');
		this.collection = VideoEssenceApp.Gallery.imagesGalleryCollection;
		var collectionView = new ImagesView({
			collection: this.collection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$(".tab-image-library-result")
		});
		this.imagesRegion.show(collectionView);
		this.$('.tab-image-library span').text(this.collection.length);
		this.initScrollbar($('.tab-image-library-result'));
	},
	renderLibraryPosts: function () {
		this.changeTab('.tab-image-posts', '#tab-image-posts');
		var collectionView = new ImagesView({
			collection: VideoEssenceApp.Gallery.imagesPostsCollection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$(".tab-image-posts-result")
		});
		this.imagesRegion.show(collectionView);
		this.initScrollbar($('.tab-image-posts-result'));
	},
	changeCount: function () {
		this.$('.tab-image-library span').text(this.collection.length);
	},
	deleteItems: function () {
		var model,
			collectionSelected = new ImagesCollection(this.collection.where({'selected': true}));
		while (model = collectionSelected.first()) {
		    model.destroy({url: "/image/delete/" + model.get('id')});
		}
	},
	actionUpload: function () {
                console.log(VideoEssenceApp.MediaManager);
		VideoEssenceApp.MediaManager.show({'onlyupload': true});
	},
	
	initScrollbar: function (elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function (elem) {
		elem.perfectScrollbar('update');
	}
});

module.exports = GalleryManager;

},{"../collections/ImagesGallery.js":38,"../models/Image.js":50,"./GalleryImageView.js":76,"./GalleryImagesView.js":77,"backbone.marionette":2,"jquery":10,"perfect-scrollbar/jquery":11}],79:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var GooglePostView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['post-google'],
	className: 'col-md-6 col-xs-12',
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	initialize: function () {
		this.listenTo(this.model, 'change:saved', this.renderItem);
	},
	embed: function(){
		var self = this;
		self.model.set('onhover', false);
		this.model.set('saved', true);
		this.$el.find('.remove-btn').mouseleave(function() {
			self.model.set('onhover', true);
			self.renderItem();
		});
	},
	removeSelect: function(){
		this.model.set('onhover', true);
		this.model.set('saved', false);
	},
	renderItem: function () {
		this.render();
	},
	onRender: function () {
		VideoEssenceApp.on('tick', _.bind(this.tick, this));
	},
	tick: function () {
		this.$el.find('.time-ago').html(moment(this.model.get('published')).fromNow());
	},
	onShow: function () {
		this.$el.find('a').attr('target', '_blank');
	}
});
module.exports = GooglePostView;
},{"backbone.marionette":2}],80:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var GooglePostView= require('./GooglePostView.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);
	
var GooglePostsView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: GooglePostView,
	initialize: function() {
		this.listenTo(this.collection, "add", this.updateScrollbar);	
	},
	updateScrollbar: function () {
		$('.modal-social-search-result').perfectScrollbar();
		$('.modal-social-embeded-result').perfectScrollbar();
	}
});
module.exports = GooglePostsView;
},{"./GooglePostView.js":79,"backbone.marionette":2,"jquery":10,"perfect-scrollbar/jquery":11}],81:[function(require,module,exports){
var SocialSearchModal = require('./SocialSearchModal.js');
var GooglePostCollection =  require('../collections/GooglePosts.js');
var GooglePostsView = require('./GooglePostsView.js');
var GooglePostView = require('./GooglePostView.js');
var GoogleSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		this.collection = new GooglePostCollection();

		this.collection.fetch({
			data: {"keyword": key}
		});
		var GooglePostsView = require('./GooglePostsView.js');
		var collectionView = new GooglePostsView({
			collection: this.collection
		});
		this.resultsRegion.show(collectionView);

		if (!this.collectionEmbeded) {
			this.collectionEmbeded = new GooglePostCollection();
			var collectionViewEmbeded = new GooglePostsView({
				collection: this.collectionEmbeded
			});
			this.resultsRegionEmbeded.show(collectionViewEmbeded);
		}

		this.listenTo(this.collection, 'change:saved', this.addToEmbeded);
		this.listenTo(this.collection, 'change:saved', this.setCount);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for(var i in selectedPosts) {
				console.log(selectedPosts[i]);
				html += new GooglePostView ({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['post-editor-google']
					}
				).render().$el.html();
			}
			//VideoEssenceApp.PostCreate.editor.btnGoogleP.insertHtml(html);
            if (VideoEssenceApp.PostPublish.editor != undefined)
			    VideoEssenceApp.PostPublish.editor.btnGoogleP.insertHtml(html);
            if (VideoEssenceApp.PostPages.editor != undefined)
                VideoEssenceApp.PostPages.editor.btnGoogleP.insertHtml(html);
		}
	},
	setCount: function() {
		this.$el.find('.tab-embedded-posts-social span').html(this.model.get('count_select'));
	},
	addToEmbeded: function(model, saved) {
		if (saved) 
			this.collectionEmbeded.add(model);
		else
			this.collectionEmbeded.remove(model);
		this.model.set('count_select',this.collectionEmbeded.length);
	}
});
module.exports = GoogleSearchModal;
},{"../collections/GooglePosts.js":37,"./GooglePostView.js":79,"./GooglePostsView.js":80,"./SocialSearchModal.js":120}],82:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ImageView = require('./ImageView.js');
var ImageSearchsView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-search-result-inner",
	childView: ImageView
});
module.exports = ImageSearchsView;
},{"./ImageView.js":83,"backbone.marionette":2}],83:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "image-gallery-item",
	template: VideoEssenceApp.templates['image-template'],

	events: {
		'click .close-button': 'deleteItem'
	},
	initialize: function () {

	},
	deleteItem: function () {
		this.model.destroy({url: "/image/delete/" + this.model.get('id')});
	}
});
module.exports = ImageView;
},{"backbone.marionette":2}],84:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ImageView = require('./ImageView.js');
var ImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: ImageView
});
module.exports = ImagesView;

},{"./ImageView.js":83,"backbone.marionette":2}],85:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var LinkPostView = Marionette.ItemView.extend({
	model: new Backbone.Model({
		linked: false,
		escape: false
	}),
	template:   VideoEssenceApp.templates['related-post'],
    className: "related-post",
	events: {
		'click .post-link': 'addLink'
	},
	addLink:function(){
		if (VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}).length < 5)
		{
			this.model.set('linked', !this.model.get('linked'));
			this.render();
			VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
		}
	}
});
module.exports = LinkPostView;
},{"backbone.marionette":2}],86:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var LinkPostView = require('./LinkPostView.js');
var LinkPostsView = Marionette.CollectionView.extend({
	childView: LinkPostView
});
module.exports = LinkPostsView;
},{"./LinkPostView.js":85,"backbone.marionette":2}],87:[function(require,module,exports){
var LinkPostView = require('./LinkPostView.js');
var LinkRelatedPostView = LinkPostView.extend({
	addLink:function(){
		this.model.set('linked', !this.model.get('linked'));
		this.render();
		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

		hasPost = VideoEssenceApp.PostPublish.currentPostRelation.where({id:this.model.get('id')});
		if(hasPost.length>0){
			VideoEssenceApp.linkPostsView.collection.remove(this.model);
		} else {
			VideoEssenceApp.linkPostsView.collection.add(this.model);
		}
	}
});
module.exports = LinkRelatedPostView;
},{"./LinkPostView.js":85}],88:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var LinkRelatedPostView = require('./LinkRelatedPostView.js');
var LinkRelatedPostsView = Marionette.CollectionView.extend({
	childView: LinkRelatedPostView
});
module.exports = LinkRelatedPostsView;
},{"./LinkRelatedPostView.js":87,"backbone.marionette":2}],89:[function(require,module,exports){
require('backbone.modal');
var Backbone = require('backbone');

var ModalHandelbars = Backbone.Modal.extend({
	buildTemplate: function (template, data) {
		var templateFunction;
		if (typeof template === 'function') {
			templateFunction = template;
		} else {
			templateFunction = Handlebars.compile(Backbone.$(template).html());
		}

		if (this.args[0] && this.args[0].onlyupload !== undefined) 
			data.onlyupload = this.args[0].onlyupload;

		return templateFunction(data);
	},
	checkKey: function (e) {
		if (this.active) {
			switch (e.keyCode) {
				case 27:
					return this.triggerCancel(e);
			}
		}
	},
	render: function (options) {
		if (typeof this.beforeRender === "function") {
			this.beforeRender();
		}
		ModalHandelbars.__super__.render.apply(this, arguments);
		return this;
	}
});
module.exports = ModalHandelbars;

},{"backbone":7,"backbone.modal":4}],90:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
	ModalHandelbars = require('./ModalHandlebars.js');

var ModalImageDetails = ModalHandelbars.extend({
	prefix: 'bbm',
	template: VideoEssenceApp.templates['modal-image-details-template'],
	cancelEl: '.modal-close',
	events: {
		'click .action-update': 'updateImage'
	},

	onRender: function() {
		
	},

	show: function (options) {
		$('.app').html(this.render().el);
	},

	updateImage: function () {
		var self = this,
			name = self.$el.find('[name="image-details-name"]').val(),
			description = self.$el.find('[name="image-details-description"]').val();
			
		self.model.set('name', $.trim(name));
		self.model.set('description', $.trim(description));

		$.ajax({
			url: '/gallery/update',
			type: 'POST',
			data: {
				id : self.model.get('id'),
				name : self.model.get('name'),
				description : self.model.get('description')
			},
			success: function(data) {
				self.hide();
			}
		})
	},

	hide: function () {
		this.destroy();
	}
});
module.exports = ModalImageDetails;
},{"./ModalHandlebars.js":89,"backbone.marionette":2}],91:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
	ModalHandelbars = require('./ModalHandlebars.js'),
	ImagesView = require('./ImagesView.js'),
	ImageView = require('./ImageView.js'),
	ImageModel = require('../models/Image.js'),
	ImageSearch = require('../models/ImageSearch.js'),
	ImageSearchsView = require('./ImageSearchsView.js'),
	ImagesCollection = require('../collections/ImagesGallery.js'),
	UploadImagesView = require('./UploadImagesView.js');

var $ = require('jquery');
require('perfect-scrollbar/jquery')($);

var ModalMediaManager = ModalHandelbars.extend({
	prefix: 'bim',
	template: VideoEssenceApp.templates['modal-media-manager-template'],
	cancelEl: '.bbm-button',
	events: {
		'click .tab-upload': 'showDropZone',
		'click .tab-library': 'showImageLibrary',
		'click .tab-search': 'showSearch',
		'click .tab-url': 'showUrl',
		'keyup .search-url': 'searchImagesInput',
		'click .search-images-button': 'searchImages',
		// 'keyup .insert-url': 'insertImages',
		'click .modal-close': 'triggerCancel',
		'click .action-cancel': 'triggerCancel',
		'click .action-add': 'addImageToPost',
		'click .action-add-library': 'addImageInLibrary',
		'click .image-gallery-item': 'selectItem',
		'click .action-upload': 'actionUpload'
	},
	currentTab: '',
	currentItem: '',
	parallelUploads: 1,
	maxFileSize: 3,
	onlyupload: false,
	errorCode: {
		0: 'Error',
		1: 'File size too big',
		2: 'Uploading error',
		3: 'Uploading canceled'
	},
	searchPage: 1,
	searchScrollYPx: 300,
	searchLoading: false,

	onRender: function() {
		if (this.args[0] && this.args[0].onlyupload !== undefined) 
			this.onlyupload = this.args[0].onlyupload;

		if (this.onlyupload === true)
			this.$el.addClass('onlyupload');

		this.initDropzone();
		this.insertImages();
		this.uploadCollection.reset();
		this.changeTab('.tab-upload', '#media-library-image-load');

		if (this.onlyupload === false)
			this.rerenderGallery();

		this.listenTo(this.uploadCollection, 'add', this.uploadImage);

		this.listenTo(this.uploadCollection, 'change:uploaded', this.checkQueue);
		this.listenTo(this.uploadCollection, 'change:error', this.checkQueue);
		this.listenTo(this.uploadCollection, 'change:canceled', this.cancelUpload);
	},
	changeTab: function(tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
	},
	selectItem: function(e) {
		if (this.onlyupload === true && $(e.target.closest('#media-library-image-search')).size() == 0)
			return;

		var el = $(e.target.closest('.image-gallery-item'));
		if (el.find('.error').length > 0)
			return true;
		this.$el.find('.selected-item').removeClass('selected-item');
		this.currentItem = el;
		this.currentItem.addClass('selected-item');
	},
	addImageToPost: function() {
		if (this.currentItem != '') {
			//VideoEssenceApp.PostCreate.editor.btnImage.insertImage(this.currentItem.find('img').attr('data-path'));
            if (VideoEssenceApp.PostPublish.editor != undefined)
			    VideoEssenceApp.PostPublish.editor.btnImage.insertImage(this.currentItem.find('img').attr('data-path'));
            if (VideoEssenceApp.PostPages.editor != undefined)
                VideoEssenceApp.PostPages.editor.btnImage.insertImage(this.currentItem.find('img').attr('data-path'));

			VideoEssenceApp.MediaManager.hide();
		}
	},
	addImageInLibrary: function() {
		if (!this.currentItem)
			return false;

		var self = this;
		if (event.keyCode == 13 || $('.insert-url').change()) {
			var jqxhr = $.ajax({
					url: "/post/save-image?url=" + encodeURIComponent(self.currentItem.find('img').attr('data-path')),
					beforeSend: function () {
						VideoEssenceApp.MediaManager.hide();
					}
				})
				.done(function(data) {
					if (data.status !== 'error' && data.data.id) {
						data.data.preview = data.data.path;
						var model = new ImageModel(data.data);
						var item = new ImageView({
							model: model
						});
						item.render();
						data.data.isAlreadyUpload = true;
						VideoEssenceApp.Gallery.imagesGalleryCollection.add(data.data);
						if (this.onlyupload === false)
							self.rerenderGallery();
					}
				});
		}
	},
	hideAllBeforeSelect: function() {
		this.currentItem = '';
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.media-library-image-content').hide();
	},
	showImageLibrary: function() {
		this.changeTab('.tab-library', '#media-library-image-collection');
		this.initScrollbar($('#media-library-image-collection .media-gallery-wrapper'));
	},
	showDropZone: function() {
		this.uploadCollection.reset();
		this.$('.dz-message').show();
		this.changeTab('.tab-upload', '#media-library-image-load');
	},
	showSearch: function() {
		var self = this;
		this.changeTab('.tab-search', '#media-library-image-search');
		this.initScrollbar($('#media-library-image-search .image-search-result'));
		$('.image-search-result').on('scroll', function() {
			var scrollTop = $(this).scrollTop();
			if ($('.image-search-result').height() + scrollTop + self.searchScrollYPx > $('.image-search-result-inner').outerHeight(true) && self.searchLoading === false) {
				self.searchLoading = true;
				self.searchPage++;
				self.searchImages(false);
			}
		});
	},
	showUrl: function() {
		this.changeTab('.tab-url', '#media-library-image-url');
	},
	rerenderGallery: function() {
		this.videoEssenceApp = new ImagesView({
			collection: VideoEssenceApp.Gallery.imagesGalleryCollection
		});
		this.imagesRegion = new Marionette.Region({
			el: this.$(".media-gallery-wrapper")
		});
		this.imagesRegion.show(this.videoEssenceApp);
		this.initScrollbar($('#media-library-image-collection .media-gallery-wrapper'));
	},
	initScrollbar: function(elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function(elem) {
		elem.perfectScrollbar('update');
	},
	actionUpload: function() {
		$('#upload-gallery-images').click();
	},
	initDropzone: function() {
		var self = this;
		this.uploadCollection = new ImagesCollection();

		var collectionView = new UploadImagesView({
			collection: this.uploadCollection
		});
		this.uploadRegion = new Marionette.Region({
			el: this.$(".gallery-upload-images")
		});
		this.uploadRegion.show(collectionView);

		this.initScrollbar($('#media-library-image-load .gallery-upload-images'));

		this.$('#upload-gallery-images').on('change', function() {
			self.addToUploadCollection(this.files);
		});

		this.$("#media-library-image-load .dropzone").on("dragover", function(event) {
			event.preventDefault();
			$(this).addClass('dragging');
		});

		this.$("#media-library-image-load .dropzone").on("dragleave", function(event) {
			event.preventDefault();
			$(this).removeClass('dragging');
		});

		this.$("#media-library-image-load .dropzone").on("drop", function(event) {
			event.preventDefault();
			self.addToUploadCollection(event.originalEvent.dataTransfer.files);
		});
	},
	addToUploadCollection: function(files) {
		var self = this;
		$.each(files, function(i, file) {
			if (!file.type.match(/image.*/))
				return true;
			var reader = new FileReader();
			reader.onload = (function(e) {
				var preview = self.createPreview(e.target.result);
				file.preview = preview;
				self.uploadCollection.add({
					preview: preview,
					path: e.target.result,
					name: file.name.split('.')[0],
					size: file.size,
					type: file.type,
					uploaded: false,
					uploading: false,
					canceled: false,
					error: false,
					progress: 0,
					file: file
				});
				self.$('.dz-message').hide();
				self.initScrollbar($('#media-library-image-load .gallery-upload-images'));
			});
			reader.readAsDataURL(file);
		});
	},
	createPreview: function(src) {
		var img = new Image();
		img.src = src;
		var MAX_WIDTH = 175;
		var MAX_HEIGHT = 175;
		var width = img.width;
		var height = img.height;

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
		}
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);
		var dataurl = canvas.toDataURL("image/png");
		return dataurl;
	},
	uploadImage: function(model) {
		if (model.get('size') > (this.maxFileSize * 1000000)) {
			this.errorUpload(1, model);
		} else {
			this.uploadFile(model);
		}
	},
	cancelUpload: function(model) {
		var ajax = model.get('ajax');
		if (ajax)
			ajax.abort();
		else
			this.errorUpload(3, model);
	},
	errorUpload: function(code, model) {
		var errMsg = this.errorCode[code];
		if (!errMsg)
			errMsg = this.errorCode[0];
		model.set({
			'error': true,
			'errorText': errMsg,
			'uploading': false,
			'uploaded': false
		});
	},
	uploadFile: function(model) {
		if (this.uploadCollection.where({
				'uploading': true
			}).length >= this.parallelUploads)
			return true;

		var self = this;
		model.set({
			'uploading': true
		});

		var formdata = new FormData();
		formdata.append('images', model.get('file'));

		model.set({
			'ajax': new XMLHttpRequest()
		});

		var ajax = model.get('ajax');

		ajax.upload.addEventListener("progress", function(event) {
			return self.progressHandler(event, model);
		}, false);

		ajax.addEventListener("load", function(event) {
			return self.completeHandler(event, model);
		}, false);

		ajax.addEventListener("error", function(event) {
			return self.errorHandler(event, model);
		}, false);

		ajax.addEventListener("abort", function(event) {
			return self.abortHandler(event, model);
		}, false);

		ajax.open("POST", "/gallery/upload");
		ajax.send(formdata);
	},
	checkQueue: function(model) {
		var lengthQueue = this.uploadCollection.where({
			'uploading': true
		}).length;
		if (lengthQueue < this.parallelUploads) {
			var count = this.parallelUploads - lengthQueue;
			var collection = this.uploadCollection.where({
				'uploading': false,
				'uploaded': false,
				'error': false
			});
			for (i in collection) {
				if (i < count)
					this.uploadFile(collection[i]);
			}
		}
	},
	progressHandler: function(event, model) {
		var percent = (event.loaded / event.total) * 100;
		model.set({
			'progress': parseInt(percent)
		});
	},
	completeHandler: function(event, model) {
		var data = JSON.parse(event.target.response);
		if (data.status == 'success') {
			model.set({
				'id': data.data[0].id,
				'preview': data.data[0].preview,
				'path': data.data[0].path,
				'loaded_date': data.data[0].loaded_date,
				'info': data.data[0].info,
				'filesize': data.data[0].filesize,
				'timestamp': data.data[0].timestamp,
				'uploaded': true,
				'uploading': false
			});
			VideoEssenceApp.Gallery.imagesGalleryCollection.add(model);
		} else {
			this.errorUpload(2, model);
		}
	},
	errorHandler: function(event, model) {
		this.errorUpload(2, model);
	},
	abortHandler: function(event, model) {
		this.errorUpload(3, model);
	},

	searchImagesInput: function(event) {
		if (event.keyCode == 13) {
			this.searchImages();
		}
	},
	searchImages: function(refresh) {
		var self = this,
			ImagesCollection = Backbone.Collection.extend({
				model: ImageSearch
			});

		if (refresh !== false) {
			this.searchPage = 1;
			$('.image-search-result').scrollTop(0);
		}

		if(this.searchPage == 1)
			this.searchImagesCollection = new ImagesCollection();

		var jqxhr = $.ajax({
				url: "/post/search-images-from-key?key=" + encodeURIComponent(this.$('.search-url').val()) + '&page=' + self.searchPage,
				beforeSend: function() {
					$('.image-search-result').append(self.getLoader());
				}
			})
			.done(function(data) {
				$('.image-search-result .loader-big').remove();
				if (data.status === "success") {
					if (_.isArray(data.data) && data.data.length > 0) {
						for (var i in data.data) {
							var image = data.data[i];
							var re = /([\S]+\/)([\S]+)\./;
							var title = image.previewURL.match(re)[2];
							self.searchLoading = false;
							self.searchImagesCollection.push(
								new ImageSearch({
									'path': image.webformatURL,
									'preview': image.previewURL,
									'name': title
								})
							);
						}
						self.fillSearchResults(self.searchImagesCollection);

					} else {
						self.$(".image-search-result").text('No results');
					}
				}
			});
	},
	fillSearchResults: function(imagesCollection) {
		var imageSearchesView = new ImageSearchsView({
			collection: imagesCollection
		});
		var imageSearcheRegion = new Marionette.Region({
			el: this.$(".image-search-result")
		});
		imageSearcheRegion.show(imageSearchesView);
		this.updateScrollbar($('#media-library-image-search .image-search-result'));
	},
	insertImages: function(event) {
		var self = this;
		self.$el.find('.insert-url').on('input', function () {
			var jqxhr = $.ajax({
					url: "/post/save-image?url=" + encodeURIComponent(self.$('.insert-url').val()),
					beforeSend: function() {
						$('.url-search-result .message').hide();
						$('.url-search-result').append(self.getLoader());
					}
				})
				.done(function(data) {
					if (data.status !== 'error' && data.data.id) {
						data.data.preview = data.data.path;
						var model = new ImageModel(data.data);
						var item = new ImageView({
							model: model
						});
						item.render();
						$('.url-search-result div').not('.message').remove();
						$('.url-search-result .message').hide();
						$('.url-search-result').append(item.$el);
						VideoEssenceApp.Gallery.imagesGalleryCollection.add(data.data);
						if (this.onlyupload === false)
							self.rerenderGallery();
					} else {
						$('.url-search-result div').not('.message').remove();
						$('.url-search-result .message').show();
					}
				});
			})
	},
	saveImage: function(bigUrl) {
		//VideoEssenceApp.PostCreate.editor.btnImage.insertImage(bigUrl);
		VideoEssenceApp.Gallery.imagesGalleryCollection.push({
			path: bigUrl
		});
		VideoEssenceApp.MediaManager.hide();
	},
	getLoader: function() {
		return '<div class="loader-big"></div>';
	}
});
module.exports = ModalMediaManager;
},{"../collections/ImagesGallery.js":38,"../models/Image.js":50,"../models/ImageSearch.js":51,"./ImageSearchsView.js":82,"./ImageView.js":83,"./ImagesView.js":84,"./ModalHandlebars.js":89,"./UploadImagesView.js":125,"backbone.marionette":2,"jquery":10,"perfect-scrollbar/jquery":11}],92:[function(require,module,exports){
var Backbone = require('backbone');
var _ = require('underscore');
require('backbone.stickit');
require('jquery-ui');
require('jquery-colpick');

Backbone.Stickit.addHandler([{
    selector: '.sliderWidget',
    initialize: function($el, model, options) {
        var params = options.params || {};
        var onSlide = function(event, ui) {
            model.set(options.observe, ui.value);
        }
        params.value = model.get(options.observe);
        params.slide = onSlide;
        $el.slider(params);
        options.initialized = true;
    },
    update: function($el, val, model, options) {
        if (options.initialized) $el.slider('value', val);
    }
}, {
    selector: '.draggable',
    initialize: function($el, model, options) {
        var params = options.params || {};
        var onStop = function(event, ui) {
            model.set(ui.position);
        }
        params.containment = "parent";
        params.stop = onStop;
        $el.draggable(params);
    },
    update: function($el, val, model, options) {
        $el.css({
            'background-color': val[0],
            left: val[1],
            top: val[2]
        });
    }
}, {
    selector: '.colorSelector',
    initialize: function($el, model, options) {
        var val = model.get(options.observe);
        var applyColor = function(color) {
            $el.find('.no-color-holder').text(color);
            $el.find('.color-holder i').css({background: color});
            $el.find('input').val(color);
        }
        var params = _.extend(options.params || {}, {
            layout: 'hex',
            submit: false,
            color: '000000',
            showEvent: '',
            onChange: function(hsl, hex, rgb) {
                var color = '#' + hex.toUpperCase();
                applyColor(color);
                model.set(options.observe, color);
            }
        });
        applyColor('#' + params.color)
        if (options.single || !_.include(model.colors, val)) {
            params.color = val.slice(1,7);
        }
        if (val.slice(1,7) == params.color) {
            $el.find('input').trigger('click');
        }
        $el.colpick(params);
        $el.on('click', '.color-picking', function(){
            $el.colpickShow();
        });
        options.initialized = true;
    },
    update: function($el, val, model, options) {
        if (options.initialized) {
            if (options.single || !_.include(model.colors, val)) {
                $el.colpickSetColor(val.slice(1,7), false);
            }
        }
    }
}]);

var Marionette = require('backbone.marionette');

var ModalVideoCustom = Marionette.ItemView.extend({
    templateHelpers: function () {
        return {
            colors:         this.model.colors,
            fontSizes:      this.model.fontSizes,
            emailProviders: this.model.emailProviders,
            thumbnail:      this.model.video.thumbnail,
        }
    },
    events: {
        'click .color-picking': 'changeColor',
        'click .closeAnnotation': function(event) {
            event.preventDefault();
        },
    },
    bindings: {
        '#displayOnPause': 'displayOnPause',
        '#showCloseButton': 'showCloseButton',
        '#allowSkip': 'allowSkip',
        '#askNames': 'askNames',
        '#text': 'text',
        '#headline': 'headline',
        '#subHeadline': 'subHeadline',
        '#buttonText': 'buttonText',
        '#targetUrl': 'targetUrl',
        '#emailServiceProvider': 'emailServiceProvider',
        '#textFontSize': 'textFontSize',
        '#textColor .color-pick': 'textColor',
        '#textColor .colorSelector': {
            observe: 'textColor',
            single: true,
        },
        '#buttonColor .color-pick': 'buttonColor',
        '#buttonColor .colorSelector': 'buttonColor',
        '#backgroundColor .color-pick': 'backgroundColor',
        '#backgroundColor .colorSelector': 'backgroundColor',
        '#opacity': 'opacity',
        '#opacitySlider': {
            observe: 'opacity',
            params: {max: 100}
        },
        '#timeStart': {
            observe: 'timeStart',
            onGet: 'formatTime',
            onSet: 'parseTime'
        },
        '#timeStop': {
            observe: 'timeStop',
            onGet: 'formatTime',
            onSet: 'parseTime'
        },
        '#previewCta .cta': {
            observe: ['buttonColor', 'left', 'top'],
        },
        '#previewCta .button': {
            observe: 'buttonText',
            updateModel: false,
        },
        '#previewAnnotation .annotation': {
            observe: ['backgroundColor', 'left', 'top']
        },
        '#previewAnnotation .text': {
            observe: 'text',
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['textColor', 'textFontSize'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'color:'+values[0],
                        'font-size:'+values[1]+'px'
                    ].join(';');
                }
            }]
        },
        '#previewAnnotation .closeAnnotation': {
            observe: 'showCloseButton',
            updateModel: false,
            visible: function(val) {
                return val == true;
            }
        },
        '#previewLead .background': {
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['backgroundColor', 'opacity'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'background-color:'+values[0],
                        'opacity:'+(values[1]/100)
                    ].join(';');
                }
            }]
        },
        '#previewLead .headline': {
            observe: 'headline',
            updateModel: false
        },
        '#previewLead .subheadline': {
            observe: 'subHeadline',
            updateModel: false
        },
        '#previewLead .form': {
            classes: {
                'with-name': 'askNames',
            }
        },
        '#previewLead .skip': {
            observe: 'allowSkip',
            updateModel: false,
            visible: function(val) {
                return val == true;
            }
        },
        '#previewLead .button': {
            observe: 'buttonText',
            updateModel: false,
            attributes: [{
                name: 'style',
                observe: ['buttonColor'],
                updateModel: false,
                onGet: function(values, options) {
                    return [
                        'background-color:'+values[0]
                    ].join(';');
                }
            }]
        },
    },
    onRender: function() {
        this.addBinding(null, '#timeStartSlider', {
            observe: 'timeStart',
            params: {max: this.model.video.length}
        });
        this.addBinding(null, '#timeStopSlider', {
            observe: 'timeStop',
            params: {max: this.model.video.length}
        });
        this.stickit();
    },
    onDestroy: function() {
        this.unstickit();
    },
    changeColor: function(event) {
        $(event.currentTarget).prev(':radio').trigger('click');
    },
    parseTime: function(time) {
        var match = /^(\d+)(:(\d{0,}))?$/.exec(time);
        var min = match && match[1]|0 || 0,
            sec = match && match[2]|0 || 0;
        return min * 60 + sec;
    },
    formatTime: function(seconds) {
        var min = ~~(seconds/60),
            sec = seconds % 60;
        return min + ':' + ("00" + sec).slice(-2);
    }
});

module.exports = ModalVideoCustom;

},{"backbone":7,"backbone.marionette":2,"backbone.stickit":5,"jquery-colpick":8,"jquery-ui":9,"underscore":33}],93:[function(require,module,exports){
var ModalVideoCustom = require('./ModalVideoCustom.js');

var ModalVideoCustomAnnotation = ModalVideoCustom.extend({
    template:  VideoEssenceApp.templates['modal-video-custom-annotation']
});

module.exports = ModalVideoCustomAnnotation;

},{"./ModalVideoCustom.js":92}],94:[function(require,module,exports){
var ModalVideoCustom = require('./ModalVideoCustom.js');

var ModalVideoCustomCta = ModalVideoCustom.extend({
    template:  VideoEssenceApp.templates['modal-video-custom-cta']
});

module.exports = ModalVideoCustomCta;

},{"./ModalVideoCustom.js":92}],95:[function(require,module,exports){
var ModalVideoCustom = require('./ModalVideoCustom.js');

var ModalVideoCustomLead = ModalVideoCustom.extend({
    template:  VideoEssenceApp.templates['modal-video-custom-lead']
});

module.exports = ModalVideoCustomLead;

},{"./ModalVideoCustom.js":92}],96:[function(require,module,exports){
require('backbone.stickit');

var ModalHandelbars = require('./ModalHandlebars.js');

var ModalVideoCustomLead = require('./ModalVideoCustomLead.js');
var ModalVideoCustomAnnotation = require('./ModalVideoCustomAnnotation.js');
var ModalVideoCustomCta = require('./ModalVideoCustomCta.js');

var ModalVideoCustomSelect = ModalHandelbars.extend({
    prefix: 'vcm',
    template: VideoEssenceApp.templates['modal-video-custom'],
    viewContainer: '.my-container',
    cancelEl: '.close',
    submitEl: '#addCompaign',
    views: {
        'select': {
            name: 'select',
            view: VideoEssenceApp.templates['modal-video-custom-select'],
        },
        'lead': {
            name: 'lead',
            view: ModalVideoCustomLead,
        },
        'annotation': {
            name: 'annotation',
            view: ModalVideoCustomAnnotation,
        },
        'cta': {
            name: 'cta',
            view: ModalVideoCustomCta,
        }
    },
    events: {
        'click #customize': 'startCampaign',
    },
    bindings: {
        '.tab_radio': 'type',
    },
    setActive: function(options) {
        console.log('set active', options, this)
    },
    onRender: function() {
        this.stickit();
        this.listenTo(this.model, 'change:type', this.changeCampaign);
        this.changeCampaign();
    },
    onDestroy: function() {
        this.unstickit();
        this.stopListening();
    },
    startCampaign: function() {
        this.openAt({name: this.model.get('type')});
    },
    changeCampaign: function() {
        var type = this.model.get('type');
        this.$el.find('.campaign-preview.active').removeClass('active');
        this.$el.find('.campaign-preview#'+type).addClass('active');
    },
    beforeSubmit: function() {
        return this.model.validate()
    },
    submit: function() {
        console.log('submit');
        this.trigger('video:custom:apply', this.model);
    }
});
module.exports = ModalVideoCustomSelect;

},{"./ModalHandlebars.js":89,"./ModalVideoCustomAnnotation.js":93,"./ModalVideoCustomCta.js":94,"./ModalVideoCustomLead.js":95,"backbone.stickit":5}],97:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoPocketView = require('./ModalVideoPocketView.js');
var VideosView = Marionette.CollectionView.extend({
	className: 'video-pocket-inner',
	childView: VideoPocketView
});
module.exports = VideosView;
},{"./ModalVideoPocketView.js":98,"backbone.marionette":2}],98:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoPocketView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-search-template'],
    className: 'modal-video-item',
    events: {
        'click .action-select': 'select',
        'click .action-unselect': 'unselect',
    },
    select: function() {
    	this.$('.action-select').removeClass('action-select').addClass('action-unselect');
    	this.model.set('selected', true);
    },
    unselect: function() {
    	this.$('.action-unselect').removeClass('action-unselect').addClass('action-select');
    	this.model.set('selected', false);
    }
});
module.exports = VideoPocketView;
},{"backbone.marionette":2}],99:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoPocketView = require('./VideoPocketView.js');

var PocketView = Marionette.CompositeView.extend({
	el: '.pocket',
	template: VideoEssenceApp.templates['pocket'],
	childView: VideoPocketView,
	childViewContainer: ".pocket-wrapper",
	events: {
		'click .maximize': 'maximize',
		'click .minimize': 'minimize'
	},
	collectionEvents: {
		"add": "collectionChange",
		"remove": "collectionChange"
	},
	modelEvents: {
		"change:isMinification": "minificationChange"
	},
	initialize: function () {
		var self = this;
        //console.log("pocket add");
		VideoEssenceApp.vent.on("pocket:videoRemove", function (model) {
			self.removeItemFromLocalStorage(model);
			self.collection.remove(model);
		});
		VideoEssenceApp.vent.on("pocket:videoAdd", function (model) {
			self.addItemFromLocalStorage(model);
		});
	},
	minificationChange: function() {
		if(this.model.get('isMinification')) {
			this.$el.find('.pocket-wrapper').animate({ maxHeight: '0' }, 600, 'easeOutBounce');
			this.$el.find('.minimize').removeClass('minimize').addClass('maximize');

		} else {
			this.$el.find('.pocket-wrapper').animate({ maxHeight: '480px' }, 600, 'easeOutBounce');
			this.$el.find('.maximize').removeClass('maximize').addClass('minimize');
		}

	},
	collectionChange: function () {
		this.model.set({countVideo: this.collection.length});
		this.$el.find('.header-title').html('<b>Pocket</b><br/>' + this.collection.length + ' videos');
		var pocketInner = this.$el.find('.pocket-inner');
		if(this.collection.length) {
			pocketInner.show();
		} else {
			pocketInner.hide();
		}
	},
	maximize: function () {
		var isMinification = false;
		localStorage.setItem('pocketVideosMinification', isMinification);
		this.model.set({isMinification: isMinification});
	},
	minimize: function () {
		var isMinification = true;
		localStorage.setItem('pocketVideosMinification', isMinification);
		this.model.set({isMinification: isMinification});
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b;
	},
	removeItemFromLocalStorage: function (model) {
		var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));

		var newVideoModels = [];
		_.each(videoModelsArr, function (videoInLS) {
			if (videoInLS.id != model.get('id')) {
				newVideoModels.push(videoInLS);
			}
		});
		localStorage.setItem("pocketVideosCollection", JSON.stringify(newVideoModels));
	},
	addItemFromLocalStorage: function (model) {
		//console.log('addItemFromLocalStorage');
		this.collection.unshift(model.clone());
		localStorage.setItem("pocketVideosCollection", JSON.stringify(this.collection.toJSON()));
	}
});
module.exports = PocketView;
},{"./VideoPocketView.js":126,"backbone.marionette":2}],100:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
    model: new Backbone.Model({
        listType: 'all'
    }),
    template:  VideoEssenceApp.templates['modal-template-post-categories-barge'],
    cancelEl: '.bbm-button, .post-category-add-close-barge',
    events: {
        'change #avatarInput': 'prepareCropFile',
        'click .post-category-add-create-barge': 'submitBarge'
    },
    initialize: function(){
        this.support = {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        };

        this.support.datauri = this.support.fileList && this.support.blobURLs;

        //if (!this.support.formData) {
        //    this.initIframe();
        //}
        //
        //this.initTooltip();
        //this.initModal();
        //this.addListener();
    },
    onShow: function(){
        console.log("this", this);

        this.$avatarModal = this.$el.find('.post-middle');

        this.$avatarForm = this.$avatarModal.find('.avatar-form');
        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
        this.$avatarData = this.$avatarForm.find('.avatar-data');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');
        this.$avatarSave = this.$avatarForm.find('.avatar-save');
        this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');

        //var url = this.$avatar.attr('src');

        var url = "";

        this.$avatarPreview.html('<img src="' + url + '">');

    },
    isImageFile: function (file) {
        if (file.type) {
            return /^image\/\w+$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png|gif)$/.test(file);
        }
    },
    startCropper: function () {
        var _this = this;

        if (this.cropperActive) {
            this.$img.cropper('replace', this.url);
        } else {
            this.$img = $('<img src="' + this.url + '">');
            this.$avatarWrapper.empty().html(this.$img);
            this.$img.cropper({
                aspectRatio: 1,
                preview: this.$avatarPreview.selector,
                strict: false,
                crop: function (e) {
                    var json = [
                        '{"x":' + e.x,
                        '"y":' + e.y,
                        '"height":' + e.height,
                        '"width":' + e.width,
                        '"rotate":' + e.rotate + '}'
                    ].join();

                    _this.$avatarData.val(json);
                }
            });

            this.cropperActive = true;
        }

        //this.$avatarModal.one('hidden.bs.modal', function () {
        //    _this.$avatarPreview.empty();
        //    _this.stopCropper();
        //});
    },
    stopCropper: function () {
        if (this.active) {
            this.$img.cropper('destroy');
            this.$img.remove();
            this.active = false;
        }
    },
    syncUpload: function () {
        this.$avatarSave.click();
    },
    prepareCropFile: function(e){
        var files;
        var file;

        console.log("0", this.support);
        if (this.support.datauri) {
            files = this.$avatarInput.prop('files');

            if (files.length > 0) {
                file = files[0];

                if (this.isImageFile(file)) {

                    if (this.url) {
                        URL.revokeObjectURL(this.url); // Revoke the old one
                    }

                    this.url = URL.createObjectURL(file);

                    console.log(this.url);

                    this.startCropper();
                }
            }
        } else {
            //console.log("8");
            file = this.$avatarInput.val();

            if (this.isImageFile(file)) {
                //this.syncUpload();
            }
        }
    },
    submitBarge: function (e){
        e.preventDefault();

        console.log("serializeArray", this.$el.find("form").serializeArray());

        //var data_files = new FormData();
        //$.each($('#avatarInput')[0].files, function(i, file) {
        //    data_files.append('file-'+i, file);
        //});
        //console.log("data_files", data_files);

        var data_files = new FormData(this.$avatarForm[0]);
        console.log(this.$avatarForm, data_files, this.$avatarForm[0]);

        //var data = this.$el.find("form").serializeArray();

        $.ajax({
            url: '/post/save-barge',
            type: 'post',
            data: data_files,
            //dataType: 'html',
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (resp) {
                console.log("success", resp);

                if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {

                    this.curCategory =
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection
                            .where({activeModel: 1})[0]
                    ;

                    this.curCategory.attributes.image_url = resp["result"];

                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(this.curCategory);

                    console.log("VideoEssenceApp", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

                    $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
                }

                if (VideoEssenceApp.PostPublish.publishView != undefined){
                    this.curCategory =
                        VideoEssenceApp.PostPublish.publishView.categories
                            .where({activeModel: 1})[0]
                    ;

                    this.curCategory.attributes.image_url = resp["result"];

                    VideoEssenceApp.PostPublish.publishView.categories.add(this.curCategory);

                    console.log("VideoEssenceApp", VideoEssenceApp.PostPublish.publishView.categories);

                    console.log(VideoEssenceApp.PostCategoryModal);

                    $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
                }

                //if (resp.state == 200){
                //
                //}
            },
            error: function ( jqXHR, textStatus, errorThrown) {
                //alert('Some error on server');
                console.log("jqXHR, textStatus, errorThrown", jqXHR, textStatus, errorThrown);
            }
        });

        return false;
    }
});
module.exports = RelatedModal;
},{"../collections/LinkPosts.js":39,"./LinkPostsView.js":86,"./LinkRelatedPostsView.js":88,"./ModalHandlebars.js":89,"backbone.marionette":2}],101:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var PostCategoriesListMenuView = Marionette.ItemView.extend({
    el: '#post-cvategories-menu-all-wp',
    template: false,
    events: {
        'click .menu-categories .all': 'menuAll',
        'click .menu-categories .deleted': 'menuDeleted',
        'click .menu-categories .delete-category': 'buttonDelete',
        'click .new-category a': 'addCategoryModal',
        'click .post-search-title': 'searchCategory',

        'click #no-one-category button': 'addCategoryModal'
    },
    switchView: function(opt){
        if (opt == 0){
            $("#no-one-category").show();
            $(".menu-categories-wp").hide();
            $(".post-categories-filters").hide();
            $("#grid-view").hide();
        }
        if (opt != 0){
            $("#no-one-category").hide();
            $(".menu-categories-wp").show();
            $(".post-categories-filters").show();
            $("#grid-view").show();
        }
    },
    searchCategory: function(e){
        e.preventDefault();

        VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 2;

        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": 0},
            success: function(){
                var textToSearch = $(".search-post").val();

                var resultOfSearch = _.filter(
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                    function(el){
                        //console.log("textToSearch", textToSearch, el.attributes.label, el.attributes.label.toLowerCase().indexOf(textToSearch.toLowerCase()));

                        if (textToSearch.trim() != ""){
                            return (el.attributes.label.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1) ||
                                (el.attributes.desc.toLowerCase().indexOf(textToSearch.toLowerCase()) > -1);
                        }
                        else{
                            return true;
                        }
                    }
                );
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(resultOfSearch);

                if (textToSearch.trim() == ""){
                    $(".delete-category").hide().text("Delete");

                    $(".post-categories-table input[type='checkbox']").each(function(){
                        var self = $(this);
                        self.parent().find(".my-checked-off").show();
                        self.parent().find(".my-checked-on").hide();
                        self.parent().find("input[type='checkbox']").prop("checked", false);
                    });

                    $(".menu-categories li a").removeClass("active");
                    $(".menu-categories li a.all").addClass("active");

                    //VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 0;
                }
            }
        });

        return false;
    },
    addCategoryModal: function(e){
        e.preventDefault();

        _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(value){
            value.attributes.activeModel = 0;
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
        });

        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');
        $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
        return false;
    },
    menuAll: function(e){
        e.preventDefault();

        $(".delete-category").hide().text("Delete");

        $(".post-categories-table input[type='checkbox']").each(function(){
            var self = $(this);
            self.parent().find(".my-checked-off").show();
            self.parent().find(".my-checked-on").hide();
            self.parent().find("input[type='checkbox']").prop("checked", false);
        });

        var self = $(e.target);
        this.$el.find(".menu-categories li a").removeClass("active");
        self.addClass("active");

        VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 0;

        //console.log("menuAllEvent", e);

        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": 0}
        });


        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

        return false;
    },
    menuDeleted: function(e){
        e.preventDefault();

        $(".delete-category").hide().text("Untrash");

        $(".post-categories-table input[type='checkbox']").each(function(){
            var self = $(this);
            self.parent().find(".my-checked-off").show();
            self.parent().find(".my-checked-on").hide();
            self.parent().find("input[type='checkbox']").prop("checked", false);
        });

        var self = $(e.target);
        this.$el.find(".menu-categories li a").removeClass("active");
        self.addClass("active");

        VideoEssenceApp.PostCategories.postCategoriesParams.curTab = 1;

        console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({trashed: 1})
        );

        return false;
    },
    buttonDelete: function(e){
        e.preventDefault();

        //console.log("buttonDelete", e);

        $(".post-categories-table tbody tr").each(function(i){
            var self = $(this);
            if (self.find(".category-checkbox input[type='checkbox']").prop("checked")){
                //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                //    _.filter(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(el){
                //        return el.attributes.id == self.data("key");
                //    }) // self.data("key")
                //);
                var curCat = _.filter(
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                    function(el){
                        return el.attributes.id == self.data("key");
                    }
                )[0];

                var trashLink = $(self.find(".cat-trash"));
                if (VideoEssenceApp.PostCategories.postCategoriesParams.curTab == 1){
                    //console.log("1", .find(".cat-trash"), trashLink.find(".cat-trash").hasClass("trashed"));
                    if (trashLink.hasClass("trashed")) {
                        trashLink.text("Trash");
                        if (curCat.attributes.trashed == 1) {
                            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount--;
                        }
                        curCat.attributes.trashed = 0;

                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(curCat);

                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(
                            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({trashed: 1})
                        );
                    }
                }
                else {
                    if (!trashLink.hasClass("trashed")) {
                        trashLink.text("Untrash");
                        if (curCat.attributes.trashed == 0) {
                            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount++;
                        }
                        curCat.attributes.trashed = 1;

                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(curCat);
                    }
                }

                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .deleted").text(
                    "Deleted (" + VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount + ")"
                );

                $.ajax({
                    url: '/post/add-category',
                    data: {
                        category: curCat.attributes.label,
                        description: curCat.attributes.desc,
                        image_id: "",
                        category_id: curCat.attributes.id,
                        trashed: curCat.get("trashed"),
                        last_modified: (new Date).toJSON()
                    },
                    dataType: 'html',
                    success: function (html) {

                        $(".post-categories-table input[type='checkbox']").each(function(){
                            var self = $(this);

                            self.parent().find(".my-checked-off").show();
                            self.parent().find(".my-checked-on").hide();
                            self.parent().find("input[type='checkbox']").prop("checked", false);

                        });

                        if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.render();
                        }
                    },
                    error: function () {
                        alert('Some error on server');
                    }
                });
            }
        });

        $(".delete-category").hide();

        //VideoEssenceApp.beutifyCheckbox();
        //console.log($(".post-categories-table input[type='checkbox']"));

        return false;
    },
    onRender: function(){
        console.log("PostCategoriesListMenuView onRender");
    }
});
module.exports = PostCategoriesListMenuView;
},{"../views/PostCategoryModal.js":106,"backbone.marionette":2}],102:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoryListView = require('./PostCategoryListView.js');

var PostCategoriesListView = Marionette.CollectionView.extend({
    tagName: "tbody",
    //className: "PostCategoriesListView",
    childView: PostCategoryListView,
    onStart: function(){},
    onRender: function(){
        this.collection.comparator = 'id';

        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": 0},
            success: function(resp){
                //console.log("resp", resp);
                //VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount++;
                VideoEssenceApp.PostCategories.postCategoriesParams.allCount = resp.length;

                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .all").text("All ("+resp.length+")");

                var res = _.filter(resp.models, function(el){
                    return (el.attributes.trashed == true || el.attributes.trashed == 1)
                });

                VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount = res.length

                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .deleted").text(
                    "Deleted (" + VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount + ")"
                );

                if (VideoEssenceApp.PostCategories.postCategoriesParams.curTab == 1){
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.set(
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({trashed: 1})
                    ,{ ignore: 1 }
                    );
                }
            }
        });
        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);
        //console.log("PostCategoriesListView this.collection", this.collection);
    }
});
module.exports = PostCategoriesListView;
},{"../collections/PostCategoriesCollection.js":41,"./PostCategoryListView.js":105,"backbone.marionette":2}],103:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoriesListView = require('../views/PostCategoriesListView.js'),
    PostCategoriesListMenuView = require('../views/PostCategoriesListMenuView.js');

var PostCategoriesTabView = Marionette.LayoutView.extend({
    tagName: "div",
    className: "PostCategoriesTabView",
    template: VideoEssenceApp.templates['post-categories-list-template'],
    regions: {
      "categories": ".post-categories-table",
      "menu": ".menu-categories-wp",
      "test": ".test-backgrid-view"
    },
    onShow: function(){
        this.categories = new PostCategoriesCollection();

        this.categories.on("sync", function(resp){
            if (VideoEssenceApp.PostCategories.postCategoriesParams.curTab != 1 &&
                VideoEssenceApp.PostCategories.postCategoriesParams.curTab != 2)
                VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.switchView(resp.length);

            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add({
                barge: 0,
                checkbox: true,
                checked: false,
                desc: "",
                id: 0,
                inode: false,
                label: 'Uncategorized',
                last_modified: new Date(),
                open: false,
                parent: 'None',
                parent_id: -1,
                posts_count: VideoEssenceApp.PostCategories.uncategorisedPostsCount,
                radio: false,
                trashed: 0
            });

            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.sort(['id']);


        });

        this.categories.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {post_id : 0}
        });


        //console.log("PostCategoriesTabView onShow", this.categories);

        this.postCategoriesListView = new PostCategoriesListView({
            collection: this.categories
        });

        //console.log(this.regions)

        this.getRegion('categories').show(this.postCategoriesListView );

        this.listCategoriesTHead = '<thead>' +
        '<tr class="first">' +
        '<th class="header-categories-checkbox">' +
        '<input type="checkbox" class="select-on-check-all" name="selection_all" value="-2">'  +
        '</th>' +
        '<th class="header-categories-name">Name</th>' +
        '<th class="header-categories-description">Description</th>' +
        '<th class="header-categories-barge">Barge</th>' +
        '<th class="header-categories-parent">Parent category</th>' +
        '<th class="header-categories-posts-count">Post count</th>' +
        '</tr>' +
        '</thead>';

        this.$el.find("table").prepend(this.listCategoriesTHead);

        VideoEssenceApp.beutifyCheckbox();

        //if (this.postCategoriesListView.collection)
        //
        //    this.postCategoriesListView

        this.PostCategoriesListMenuView = new PostCategoriesListMenuView();
        this.PostCategoriesListMenuView.render();

        $(VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .all"))
            .text("All ("+VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models.length+")")

        //console.log("this.PostCategoriesListMenuView", this.postCategoriesListView.collection.length);
    }
});
module.exports = PostCategoriesTabView;
},{"../collections/PostCategoriesCollection.js":41,"../views/PostCategoriesListMenuView.js":101,"../views/PostCategoriesListView.js":102,"backbone.marionette":2}],104:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var PostCategoryView = require('./PostCategoryView.js');
var PostCategoriesView = Marionette.CollectionView.extend({
    tagName: "div",
    className: "post-categories-wrapper",
    childView: PostCategoryView,
    onRender: function(){
        //console.log("PostCategoriesView rendered");
        //console.log("PostCategoriesView collection", this.collection);
        this.collection.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": window.post_id}
        });
    }
});
module.exports = PostCategoriesView;


},{"./PostCategoryView.js":107,"backbone.marionette":2}],105:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var PostCategoryView = Marionette.ItemView.extend({
    tagName: "tr",
    //className: "category",
    attributes: {},
    template: VideoEssenceApp.templates['post-category-list-template'],
    activeModel: "",
    events: {

        'click .cat-edit': 'catEdit',
        'click .cat-trash': 'catTrash',
        'click .cat-view': 'catShowLinkedPosts'
    },

    catEdit: function(e){
        e.preventDefault();

        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models);

        _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(value){
            value.attributes.activeModel = 0;
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
        });

        this.model.set("activeModel", 1);

        //console.log(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models);

        //this.activeModel = this.$el.data("key");

        //VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView

        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');
        $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);

        return false;
    },
    catTrash: function(e){
        e.preventDefault();

        var self = $(e.target);
        if (!self.hasClass("trashed")) {
            self.text("Untrash");
            this.model.set("trashed", 1);

            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount++;
        }
        else{
            self.text("Trash");
            this.model.set("trashed", 0);

            VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount--;
        }

        VideoEssenceApp.PostCategories.PostCategoriesTabView.PostCategoriesListMenuView.$el.find(".menu-categories .deleted").text(
            "Deleted (" + VideoEssenceApp.PostCategories.postCategoriesParams.trashedCount + ")"
        );

        $.ajax({
            url: '/post/add-category',
            //method: "POST",
            data: {
                category: this.model.attributes.label,
                description: this.model.attributes.desc,
                image_id: "",
                category_id: this.model.attributes.id,
                trashed: this.model.get("trashed"),
                last_modified: (new Date).toJSON()
            },
            dataType: 'html',
            success: function (html) {
                if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.render();
                }
            },
            error: function () {
                alert('Some error on server');
            }
        });

        return false;
    },
    catShowLinkedPosts: function(e){
        e.preventDefault();

        //console.log("catShowLinkedPosts", this);

        if (this.model.attributes.id != -1) {
            window.location = "/post/index?PostSearch%5BselectDate%5D=All+time&PostSearch%5Btitle%5D=&PostSearch%5Bcategory%5D=" +
            encodeURIComponent(this.model.attributes.label);
        }
        else{
            window.location = "/post/index?PostSearch%5BselectDate%5D=All+time&PostSearch%5Btitle%5D=&PostSearch%5Bcategory%5D=-1";
        }


        return false;
    },
    onRender: function(){
        this.$el.attr("data-key", this.model.id);

        //console.log("onRender this.model", this.model);

        VideoEssenceApp.beutifyCheckbox();
    },
    onShow: function(){
        VideoEssenceApp.beutifyCheckbox();
    },
    //delCategory: function(){
    //    this.model.destroy({url: "/post/del-category?id=" + this.model.get('id')});
    //},
    initialize: function () {},
    deleteItem: function () {}
});
module.exports = PostCategoryView;
},{"../views/PostCategoryModal.js":106,"backbone.marionette":2}],106:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
    model: new Backbone.Model({
        listType: 'all'
    }),
    template:  VideoEssenceApp.templates['modal-template-post-categories'],
    cancelEl: '.bbm-button, .post-category-add-close',
    events: {
        "click #post-search" : "search",
        'keyup .search-post': 'searchFromInput',
        "click .post-btn" : "addRelations",
        "click .post-category-add-create" : "addPostCategoryWP",
        'keyup #category-name': 'nameCategory',
        "click .all-posts" : "showAll",
        "click .related-posts" : "showRelated",
        'click .change-barge': "bargeImage"
    },
    templateHelpers: function () {
        return {
            onlyupload: false
        };
    },
    onClose: function(){
        _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function(value){
            value.attributes.activeModel = 0;
            VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
        });
    },
    addPostCategoryWP: function(e){
        e.preventDefault();
        this.addPostCategory();
        return false;
    },
    addPostCategory: function(opt){
        var catName = $(this.$el.find("#category-name"));
        var catDesc = $(this.$el.find("#category-desc"));
        var catImg = $(this.$el.find("#category-image"));
        var catBarge = $(this.$el.find("#category-image"));
        var catParent = $(this.$el.find("#category-parent"));

        //if (catName.val().trim() != '' ) {
            $.ajax({
                url: '/post/add-category',
                data: {
                    category: catName.val(),
                    description: catDesc.val(),
                    image_id: catImg.val(),
                    parent_id: catParent.val(),
                    image_url: catBarge.val(),
                    last_modified: (new Date).toJSON(),
                    opt: opt,
                    category_id: (
                        this.curCategory != undefined &&
                        this.curCategory.attributes != undefined &&
                        this.curCategory.attributes.id != undefined
                    ) ? this.curCategory.attributes.id : 0
                },
                dataType: 'html',
                success: function (resp) {
                    console.log("success addPostCategory", resp);

                    //VideoEssenceApp.curCategoryId =  resp;


                    if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                        VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.fetch({
                            remove: false,
                            add: true,
                            merge: true,
                            data: {post_id: 0},
                            success: function () {
                                //console.log("collection", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models);

                                var curCat = _.filter(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function (el) {
                                    return el.id == resp;
                                })[0];

                                curCat.attributes.activeModel = 1;

                                if (curCat.attributes.image_url != undefined) {
                                    curCat.attributes.barge = curCat.attributes.image_url;
                                }

                                //console.log("curCat !@#!@#", curCat);

                                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(curCat);

                                //console.log("curCat", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);

                                if (opt != undefined && opt == "barge") {
                                    var PostCategoriesBargeImage = require('../views/PostCategoriesBargeImage.js');
                                    $('.app').html(new PostCategoriesBargeImage().render().el);
                                }

                                if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
                                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.render();
                                }
                            }
                        });
                    }

                    if (VideoEssenceApp.PostPublish.publishView != undefined) {

                        VideoEssenceApp.PostPublish.publishView.categories.fetch({
                                //remove: false,
                                add: true,
                                merge: true,
                                data: {post_id: 0},
                                success: function () {
                                    var curCat = _.filter(VideoEssenceApp.PostPublish.publishView.categories.models, function (el) {
                                        return el.id == resp;
                                    })[0];

                                    console.log('models', VideoEssenceApp.PostPublish.publishView.categories.models);
                                    console.log('curCat', curCat);

                                    curCat.attributes.activeModel = 1;

                                    if (curCat.attributes.image_url != undefined) {
                                        curCat.attributes.barge = curCat.attributes.image_url;
                                    }

                                    console.log('categories0', VideoEssenceApp.PostPublish.publishView.categories);

                                    VideoEssenceApp.PostPublish.publishView.categories.add(curCat);

                                    console.log('categories1', VideoEssenceApp.PostPublish.publishView.categories);

                                    if (opt != undefined && opt == "barge") {
                                        var PostCategoriesBargeImage = require('../views/PostCategoriesBargeImage.js');
                                        $('.app').html(new PostCategoriesBargeImage().render().el);
                                    }

                                    VideoEssenceApp.PostPublish.publishView.postCategoriesView.render();
                                }
                        });
                    }
                },
                error: function () {
                    alert('Some error on server');
                }
            });
        //}

        if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
            _.map(VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models, function (value) {
                if (value.attributes.activeModel == 1) {
                    value.attributes.label = catName.val();
                    value.attributes.desc = catDesc.val();
                    value.attributes.parent_id = catParent.val();
                    //value.attributes.label = catImg.val();
                }
                value.attributes.activeModel = 0;
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(value);
            });
        }

        if (opt == undefined || opt != "barge")
            this.triggerCancel();

        return false;
    },
    bargeImage: function(e){
        e.preventDefault();

        this.addPostCategory("barge");

        console.log("barge");

        //VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection

        return false;
    },
    nameCategory : function(e){
        //console.log("this.region", e.target, e.keyCode == 13 && $(e.target).val()!='', $(e.target).val());
        //console.log("testCategoryKeyUp", this);
        var input = this.$el.find("#category-name");
        var firstLetter = this.$el.find(".category-img-wp .first-letter");
        var $input = $(input);

        if(e.keyCode != 13 && $input.val()!='' && ($("#category-barge").val() == '' || $("#category-image").val() == ''))
        {
            $(firstLetter).text($input.val().toString()[0].toUpperCase());

        }
    },
    beforeCancel: function(e){},
    beforeSubmit: function(){
        this.model.set('headline', $("#headline").text());
        $('input[name=related_headline]').val($("#headline").text());
    },
    showAll: function() {
        this.model.set({
            listType: 'all',
            keyword: ''
        });
        this.render();
        VideoEssenceApp.linkPostsView = new LinkPostsView({
            collection: VideoEssenceApp.PostPublish.linkPostsCollection
        });

        VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
    },
    showRelated: function() {
        this.model.set({
            listType: 'related',
            keyword: ''
        });
        this.render();
        VideoEssenceApp.linkPostsView = new LinkRelatedPostsView({
            collection:
                new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
        });
        VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
    },

    onRender: function(){

        //console.log("VideoEssenceApp.catBarge", VideoEssenceApp.catBarge);
        //
        //if (VideoEssenceApp.catBarge != undefined){
        //    $("#category-image").val(VideoEssenceApp.catBarge);
        //    this.model.bargeImg = VideoEssenceApp.catBarge;
        //    console.log("this.model.bargeImg", this.model.bargeImg)
        //    //this.render();
        //}

        //console.log("onRender option", option, this.model);
        //console.log("RelatedModal activeModel", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({activeModel: 1}));
        //
        //this.curCategory = VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.where({activeModel: 1})[0];
        //console.log("this.curCategory", this.curCategory, this.curCategory.attributes.label, this.curCategory.attributes.desc);
        //if (this.curCategory.length > 0){
        //    console.log(this.$el);
        //    $(this.$el.find("#category-name")).val(this.curCategory.attributes.label);
        //    $(this.$el.find("#category-desc")).text(this.curCategory.attributes.desc);
        //}
    },
    onShow : function(){
        //console.log("onShow");

        if (this.$el.find('.post-container').length > 0) {

            VideoEssenceApp.linkPostsRegion = new Marionette.Region({
                el: this.$el.find('.post-container')
            });
            VideoEssenceApp.linkPostsView = new LinkPostsView({
                collection: VideoEssenceApp.PostPublish.linkPostsCollection
            });

            VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

            $("#headline").keypress(function (e) {
                return e.which != 13;
            });
        }

        //.fetch({
        //    remove: false,
        //    add: true,
        //    merge: false,
        //    data: {"post_id": window.post_id}
        //});

        //console.log('PostPublish', VideoEssenceApp.PostPublish.publishView.categories);

        if (VideoEssenceApp.PostPublish.publishView != undefined){
            this.curCategory =
                VideoEssenceApp.PostPublish.publishView.categories
                    .where({activeModel: 1})[0]
            ;

            VideoEssenceApp.PostPublish.publishView.categories.add({
                barge: 0,
                checkbox: true,
                checked: false,
                desc: "",
                id: 0,
                inode: false,
                label: 'Uncategorized',
                last_modified: new Date(),
                open: false,
                parent: 'None',
                parent_id: -1,
                radio: false,
                trashed: 0
            });

            this.parentCategories =_.filter(
                VideoEssenceApp.PostPublish.publishView.categories.models,
                function(el){
                    return el.attributes.activeModel == undefined || el.attributes.activeModel == 0;
                }
            );

            var parent_id = (this.curCategory != undefined) ? this.curCategory.attributes.parent_id : 0;

            var parentCategories = "";
            if (this.parentCategories.length > 0){
                parentCategories = _.reduce(
                    _.map(
                        this.parentCategories,
                        function(el){
                            var selected = "";
                            if (parent_id == el.attributes.id ){
                                selected = "selected='true'";
                            }

                            return "<option value='"+ el.attributes.id +"' " + selected + " >" + el.attributes.label + "</option>"
                        }
                    ),
                    function(el1, el2){
                        return el1 + el2
                    }
                );
            }

            $(this.$el.find("#category-parent")).html(
                /*"<option value='0'></option>" + */ parentCategories
            );

            if (this.curCategory != undefined) {
                $(this.$el.find("#category-name")).val(this.curCategory.attributes.label);
                $(this.$el.find("#category-desc")).text(this.curCategory.attributes.desc);
                $(this.$el.find("#category-parent")).select(this.curCategory.attributes.parent_id);
                $(this.$el.find(".first-letter")).text(this.curCategory.attributes.label.substring(0, 1).toUpperCase());

                if (this.curCategory.attributes.barge != undefined && this.curCategory.attributes.barge != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.barge + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.barge);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.barge);
                }
                if (this.curCategory.attributes.image_url != undefined && this.curCategory.attributes.image_url != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.image_url + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.image_url);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.image_url);
                    this.curCategory.barge = this.curCategory.attributes.image_url;
                    VideoEssenceApp.PostPublish.publishView.categories.add(this.curCategory);
                }

            }
        }

        if (VideoEssenceApp.PostCategories.PostCategoriesTabView != undefined) {
            //console.log("!@#", VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection);
            this.curCategory =
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection
                .where({activeModel: 1})[0]
            ;

            this.parentCategories =_.filter(
                VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.models,
                function(el){
                    return el.attributes.activeModel == undefined || el.attributes.activeModel == 0;
                }
            );

            var parent_id = (this.curCategory != undefined) ? this.curCategory.attributes.parent_id : 0;

            var parentCategories = "";
            if (this.parentCategories.length > 0){
                parentCategories = _.reduce(
                    _.map(
                        this.parentCategories,
                        function(el){
                            var selected = "";
                            if (parent_id == el.attributes.id ){
                                selected = "selected='true'";
                            }

                            return "<option value='"+ el.attributes.id +"' " + selected + " >" + el.attributes.label + "</option>"
                        }
                    ),
                    function(el1, el2){
                        return el1 + el2
                    }
                );
            }

            $(this.$el.find("#category-parent")).html(
                /*"<option value='0'></option>" + */ parentCategories
            );

            if (this.curCategory != undefined) {
                $(this.$el.find("#category-name")).val(this.curCategory.attributes.label);
                $(this.$el.find("#category-desc")).text(this.curCategory.attributes.desc);
                $(this.$el.find("#category-parent")).select(this.curCategory.attributes.parent_id);
                $(this.$el.find(".first-letter")).text(this.curCategory.attributes.label.substring(0, 1).toUpperCase());

                if (this.curCategory.attributes.barge != undefined && this.curCategory.attributes.barge != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.barge + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.barge);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.barge);
                }
                if (this.curCategory.attributes.image_url != undefined && this.curCategory.attributes.image_url != 0) {
                    $(this.$el.find(".category-img-wp .first-letter"))
                        //.attr("style", "background: url('" + this.curCategory.attributes.image_url + "') 0 0 no-repeat;")
                        .attr("style", "")
                        .text("")
                        .html("<img width='30' height='30' src='" + this.curCategory.attributes.image_url + "' />")
                    ;
                    $(this.$el.find("#category-image")).val(this.curCategory.attributes.image_url);
                    $(this.$el.find("#category-barge")).val(this.curCategory.attributes.image_url);
                    this.curCategory.barge = this.curCategory.attributes.image_url;
                    VideoEssenceApp.PostCategories.PostCategoriesTabView.postCategoriesListView.collection.add(this.curCategory);
                }

            }
        }

        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 4 //,
            //showIcon: false
            //showContent: false
        });
    },
    searchFromInput: function(event) {
        if(event.keyCode == 13){
            this.search();
        }
    },
    search: function(){
        var keyword = this.$(".search-post").val();
        this.model.set({
            listType: 'all',
            keyword: keyword
        });
        this.render();
        findResult = new Backbone.Collection();
        VideoEssenceApp.PostPublish.linkPostsCollection.each(function(post) {
            postTitle = post.get('title');
            if(postTitle.indexOf(keyword) > -1){
                findResult.add(post);
            }
        });
        VideoEssenceApp.linkPostsView = new LinkPostsView({
            collection: findResult
        });

        VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

    },
    addRelations:function(){
        this.model.set('listType', 'all');
        $(this.el).hide();
    }
});
module.exports = RelatedModal;
},{"../collections/LinkPosts.js":39,"../views/PostCategoriesBargeImage.js":100,"./LinkPostsView.js":86,"./LinkRelatedPostsView.js":88,"./ModalHandlebars.js":89,"backbone.marionette":2}],107:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var PostCategoryView = Marionette.ItemView.extend({
    tagName: "div",
    className: "post-category",
    template: VideoEssenceApp.templates['post-category-template'],
    events: {
        //'mouseenter .cat': 'showDeleteIcon',
        //'mouseout .cat': 'hideDeleteIcon'
        'click .delete-image': 'delCategory'
    },
    //template: false,
    //showDeleteIcon: function(){
    //
    //},
    delCategory: function(){
        this.model.destroy({url: "/post/del-category?id=" + this.model.get('id')});
    },
    initialize: function () {},
    deleteItem: function () {}
});
module.exports = PostCategoryView;
},{"backbone.marionette":2}],108:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView = require('./LinkRelatedPostsView.js');

require('../../js/dragManager.js');

var PostEditorView = Marionette.ItemView.extend({
    tagName: "form",
    template: VideoEssenceApp.templates['post-editor'],

    events: {
        'click #post-submit': 'goToPublishStep',
        'click .close-button': 'closeTweet',
        'click .is-ve-video-b': 'clickCustomButton'
    },

    editor: null,
    videoInPost: {},

    initialize: function() {
        var ImageTooltip = require('../../js/danteImageTooltip.js');
        this.btnImage = new ImageTooltip();

        var VideoTooltip = require('../../js/danteVideoTooltip.js');
        this.btnVideo = new VideoTooltip();

        //var FacebookTooltip = require('../../js/danteFacebookTooltip.js');
        //this.btnFаcebook = new FacebookTooltip();

        var GooglePTooltip = require('../../js/danteGooglePTooltip.js');
        this.btnGoogleP = new GooglePTooltip();

        var TwitterTooltip = require('../../js/danteTwitterTooltip.js');
        this.btnTwitter = new TwitterTooltip;

        this.listenTo(this, 'video:custom:update', this.updateVideo);
    },
    onShow: function() {
        var self = this;

        this.editor = new Dante.Editor({
            el: this.$el.find('#editor'),
            debugMode: true,
            upload_url: "/images.json",
            extra_tooltip_widgets: [this.btnVideo, this.btnImage, /*this.btnFаcebook,*/ this.btnGoogleP, this.btnTwitter],
            base_widgets: ["embed_extract"],
            disable_title: true,
            body_placeholder: 'Tell your story',
            //debug: true,
            //
            //store_url: "/post/test-store",
            //store_method: "POST",
            //store_interval: 1000,

            afterInit: function() {
                self.initResizable();
                self.initDraggable();

                self.initContent();
                self.initVideo();
                //self.initEditVideo();
            }
        });

        this.editor.getNode = function() {
            var node, range, root;
            node = void 0;
            root = $(this.el).find(".section-inner")[0];
            if (this.selection().rangeCount < 1) {
                return;
            }
            range = this.selection().getRangeAt(0);
            node = range.commonAncestorContainer;
            if (!node || node === root) {
                return null;
            }
            while (node && (node.nodeType !== 1 || !$(node).hasClass("graf")) && (node.parentNode !== root)) {
                node = node.parentNode;
            }
            if (!$(node).hasClass("graf--li")) {
                while (node && (node.parentNode !== root)) {
                    node = node.parentNode;
                }
            }
            if (root) {
                if (root.contains(node))
                    return node;
                else if ($(root).find('.graf.is-selected').size() == 1) {
                    return $(root).find('.graf.is-selected')[0];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };

        this.btnImage.current_editor = this.editor;
        this.btnVideo.current_editor = this.editor;
        //this.btnFаcebook.current_editor = this.editor;
        this.btnGoogleP.current_editor = this.editor;
        this.btnTwitter.current_editor = this.editor;
        this.editor.start();

        this.$el.find('#editor').on('click', '.close-button', function() {
            $(this).parent().remove();
            return false;
        });

        this.$el.find('#editor').on('click', '.close-button-socials', function() {
            $(this).closest('.edit-wrap').remove();
            return false;
        });

        this.linkRelatedPosts = new Marionette.Region({
            el: this.$el.find('#postsRelatedShow')
        });

        this.linkPostsView = new LinkPostsView({
            collection: new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({
                linked: true
            }))
        });

        this.linkRelatedPosts.show(this.linkPostsView);

    },
    initVideo: function() { // теперь не нужно, работает по-другому ?
        var videos = this.model.get('videos');
        var self = this;

        //console.log("initVideo", videos);

        for (index in videos) {
            //console.log(videos, videos[index]['id']);
            if (videos.hasOwnProperty(index) && videos[index]['id']) {

                if (videos[index].type == "youtube")
                    videos[index].embeded_url = "https://www.youtube.com/embed/" + videos[index].id + "?autoplay=1";
                if (videos[index].type == "vimeo")
                    videos[index].url = "https://vimeo.com/" + videos[index].id;

                self.btnVideo.pasteVideo(videos[index]);
            }
        }
    },

    //todo нужна initEditVideo?
    initEditVideo: function() {
        var self = this;
        this.editor.$el.find('.video-with-custom').each(function() {
            var video = $(this).data('video');
            self.btnVideo.pasteVideo(video, $(this).parent());
        });
    },

    // add event listener resizable
    initResizable: function () {
        if ($('#post-editor').hasClass('post-view-content'))
            return true;

        $('#editor').on('imageAdd', function (event, images) {
            var images = $(images);
            images.each(function (index) {
                var image = $(images[index]);
                setTimeout(function () {
                    image.resizable({
                        maxWidth: $('#editor').width(),
                        aspectRatio: image.width() / image.height()
                    });
                }, 300);
            });
        });
    },

    // add event listener draggable
    initDraggable: function () {
        if ($('#post-editor').hasClass('post-view-content'))
            return true;

        $('#editor').DragManager({
            drag: ['sp', 'ui-wrapper', 'video-js'],
            zIndex: 90
        });
    },

    initContent: function() {
        if (this.model.get('title')) {
            this.$el.find('.title-input').val(this.model.get('title'));
        }
        var $editor = this.$el.find('#editor');
        if (!_.isEmpty(this.model.get('content'))) {
            var postContent = JSON.parse(this.model.get('content'));
            $editor.find(".section-inner").html('<p class="graf graf--p graf--last is-selected" ><br></p>');

            var contentHtml = "";

            //console.log("postContent", postContent);

            for (var i in postContent) {
                if (!postContent.hasOwnProperty(i)) continue;

                //console.log("postContent[prop].elType", postContent[i].elType, postContent[i]);

                var currentNode = "";

                if (postContent[i].elType != "video" && postContent[i].elType != "social" &&
                    (postContent[i].tagName == 'p' ||
                        postContent[i].tagName == 'blockquote')
                ) {
                    var nodeId = window.Dante.utils.generateUniqueName();
                    contentHtml = "<"+postContent[i].tagName+" class='graf graf--"+postContent[i].tagName+"' name='"+nodeId+"'>"+
                    postContent[i].content +
                    "</"+postContent[i].tagName+">";

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));
                    currentNode.before(contentHtml);

                }
                if (postContent[i].elType == "social"){
                    var nodeId = window.Dante.utils.generateUniqueName()
                    var nodeHtml = "<"+postContent[i].tagName+" class='graf graf--"+postContent[i].tagName+"' name='"+nodeId+"'>"+
                    "</"+postContent[i].tagName+">";

                    var lastGraf = $($editor.find(".section-inner").find(".graf:last"));
                    if (lastGraf.hasClass("graf--last") && $.trim(lastGraf.text()) == "")
                        lastGraf.remove();

                    $editor.find(".section-inner").append(nodeHtml);

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    contentHtml = postContent[i].content;
                    currentNode.append(contentHtml);

                    if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last"))
                        $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" name="'+window.Dante.utils.generateUniqueName()+'" ><br></p>');
                }
                if (postContent[i].elType == "video") {
                    var graf = $('<p class="graf graf--p" data-video-id="' + postContent[i].videoId +
                        '" data-video-type="' + postContent[i].videoType + '"><br></p>');

                    var video = {
                        id: postContent[i].videoId,
                        type: postContent[i].videoType,
                        url: postContent[i].videoUrl,
                        poster: postContent[i].videoPoster,
                        width: postContent[i].content.width,
                        height: postContent[i].content.height
                    };

                    //console.log('pasteVideo video', postContent[i], " | ", video, JSON.parse(postContent[i].content));
                    console.log('pasteVideo video', video);

                    if (postContent[i].videoType == "youtube")
                        video.embeded_url = "https://www.youtube.com/embed/" + postContent[i].videoId + "?autoplay=1";
                    else
                        video.embeded_url = "https://vimeo.com/" + postContent[i].videoId;

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    currentNode.before(graf);

                    VideoEssenceApp.PostPublish.editor.btnVideo.pasteVideo(video, graf);
                }
            }
            if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last"))
                $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" ><br></p>');
        }

        // init resizable after render
        $($editor.find('.graf--p')).each(function(i){
            if ($($editor.find('.graf--p').get(i)).find('img').length > 0) {
                $($editor.find('.graf--p').get(i)).find('img').load(function(){
                    $('#editor').trigger('imageAdd', $($editor.find('.graf--p').get(i)).children('img'));
                });
            }
        });

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        if (getParameterByName("isView") == "Y"){
            var $editorContent = $("#editor").find(".section-inner");
            $editorContent.attr("contenteditable", false);
            $("#editor").attr("contenteditable", false);
            $editorContent.addClass("no-user-select");
            $("#editor").parent().find(".inlineTooltip.is-active").css("display", "none");
            $(".action-buttons-post").hide();
            $("#header, .gray-space").hide();

            var postEditorTitle = $("#post-editor").find(".title-input");

            postEditorTitle
                .attr("contenteditable", false)
                .attr("readonly", "readonly")
                .addClass("no-user-select")
            ;
        }
    },

    //todo нужна pasteVideo?
    //pasteVideo: function(video) {
    //    //console.log('video', video);
    //    //console.log("pasteVideo", video);
    //    //console.log(this.btnVideo);
    //    //this.btnVideo.pasteVideo(video);
    //
    //    //this.afterPasteVideo(video);
    //},
    //todo нужна afterPasteVideo?
    afterPasteVideo: function(video, nodeId, player) {
        var VideoROICollection = require('../collections/VideoROICollection.js');
        this.videoInPost[nodeId] = {
            video: video,
            player: player,
            views: {},
            customs: new VideoROICollection(video.customs)
        };
        var self = this;
        this.initVideoCustom(nodeId);
        player.on('play', function() {
            // self.initVideoCustom(nodeId);
        }).on('ended', function() {
            self.destroyVideoCustom(nodeId);
        }).on('pause', function() {
            self.onVideoPause(nodeId);
        }).on('timeupdate', function() {
            self.onVideoPlaying(nodeId, player.currentTime());
        });
    },
    closeTweet: function(event) {
        event.preventDefault();
        $(event.currentTarget).parent().remove();
    },
    preparePostVideo: function() {
        var content = this.editor.$el.find('.section-inner').clone();
        for (var nodeId in this.videoInPost) {
            if (this.videoInPost.hasOwnProperty(nodeId) && this.videoInPost[nodeId].video) {
                var video = this.videoInPost[nodeId].video;
                var data = JSON.stringify(video);
                var html = this.btnVideo.embededHtml(video.type, video.url, nodeId);
                var field = content.find('#' + nodeId);
                var roi = field.find('.custom-rois');
                roi.children().hide();
                var html = "<span class=\"video-with-custom\" data-video='" + data + "' data-roi='" + JSON.stringify(roi.html()) + "'></span>";
                field.replaceWith(html);
            }
        }
        return content.html();
    },
    savePost: function(e) {
        e.preventDefault();

        var content = this.preparePostVideo(),
            firstVideo = this.prepareFirstVideo(),
            images = this.prepareImages(content);
        this.model.set('video_id', firstVideo.id);
        this.model.set('video_type', firstVideo.type);
        this.model.set('images', images);
        this.model.set('content', JSON.stringify(content));
        this.model.set('title', this.$el.find('.title-input').val());
        this.model.validate();
        this.model.save();

        return false;
    },
    goToPublishStep: function (e) {
        e.preventDefault();
        $('.publish-block-wp').addClass('show-publish').slideDown("slow");
        $('.action-buttons-post').fadeOut('slow');
        var $editorContent = $("#editor").find(".section-inner");
        $editorContent
            .attr("contenteditable", false)
            .addClass("no-user-select")
        ;
        $("#editor").parent().find(".inlineTooltip.is-active").css("display", "none");

        $("#editor").attr("contenteditable", false);

        var postEditorTitle = $("#post-editor").find(".title-input");

        postEditorTitle
            .attr("contenteditable", false)
            .attr("readonly", "readonly")
            .addClass("no-user-select")
        ;
    },

    prepareFirstVideo: function() {
        var nodeId = this.$el.find('.video-js')[0].id;
        if (_.isUndefined(nodeId)) {
            return {};
        }
        var video = this.videoInPost[nodeId];
        if (_.isUndefined(video)) {
            return {};
        }
        return {
            id: video.video.id,
            type: video.video.type
        };
    },
    prepareVideos: function() {

    },

    prepareImages: function(content) {
        var jqHtml = $('<div/>').html(content),
            imgCollection = jqHtml.find('img'),
            imgArray = [];

        imgCollection.each(function(i, el) {
            imgArray[i] = $(el).attr('src');
        });
        return imgArray;
    },

    showCustomizeButton: function(event) {
        $(event.currentTarget).prepend('<a contenteditable="false" href="#" class="is-ve-video-b">Customize</a>');
    },
    hideCustomizeButton: function(event) {
        $(event.currentTarget).find('.is-ve-video-b').remove();
    },
    clickCustomButton: function(event) {
        var nodeId = $(event.currentTarget).siblings('.video-js').attr('id');

        var node = this.videoInPost[nodeId];
        if (!node) return;

        var video = node.video;
        node.player.pause();
        this.trigger('video:custom:click', video, nodeId);
    },
    updateVideo: function(nodeId, customs) {
        this.videoInPost[nodeId].customs.reset(customs);
    },
    initVideoCustom: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || node.views.isRendered || !node.customs) return;

        var container = this.$el.find('#' + nodeId);
        var el = $('<div class="custom-rois"></div>').appendTo(container);

        var VideoROIView = require('./VideoROIView.js');
        var VideoROICollectionView = require('./VideoROICollectionView.js');
        node.views = new VideoROICollectionView({
            childView: VideoROIView,
            collection: node.customs,
            el: el
        });
        node.views.render();
    },
    destroyVideoCustom: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.destroy();
        this.$el.find('#' + nodeId).find('.custom-rois').detach();
    },
    onVideoPlaying: function(nodeId, time) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.showForTime(time);
    },
    onVideoPause: function(nodeId) {
        var node = this.videoInPost[nodeId];
        if (!node || !node.views.isRendered) return;

        node.views.showPause();
    }
});
module.exports = PostEditorView;
},{"../../js/danteGooglePTooltip.js":132,"../../js/danteImageTooltip.js":133,"../../js/danteTwitterTooltip.js":134,"../../js/danteVideoTooltip.js":135,"../../js/dragManager.js":136,"../collections/LinkPosts.js":39,"../collections/VideoROICollection.js":45,"./LinkPostsView.js":86,"./LinkRelatedPostsView.js":88,"./VideoROICollectionView.js":127,"./VideoROIView.js":128,"backbone.marionette":2}],109:[function(require,module,exports){
var Marionette = require('backbone.marionette');

require('../../js/dragManager.js');

var PostPageEditorView = Marionette.ItemView.extend({
    tagName: "form",
    template: VideoEssenceApp.templates['page-editor'],
    events: {
        //'click #page-submit': 'savePage'
        'click #page-submit': 'publishPage',
        'click #page-cancel': 'cancelPage',
        'click #editor .section-inner': 'clearPlaceholder',
        'focus #editor .section-inner': 'clearPlaceholder'
    },
    editor: null,
    initialize: function(){
        var ImageTooltip = require('../../js/danteImageTooltip.js');
        this.btnImage = new ImageTooltip();

        var VideoTooltip = require('../../js/danteVideoTooltip.js');
        this.btnVideo = new VideoTooltip();

        var GooglePTooltip = require('../../js/danteGooglePTooltip.js');
        this.btnGoogleP = new GooglePTooltip();

        var TwitterTooltip = require('../../js/danteTwitterTooltip.js');
        this.btnTwitter = new TwitterTooltip;

        //console.log('PostPageEditorView initialized');
    },
    //modelEvents: {
    //    "change": "modelChanged"
    //},
    //modelChanged: function(){
    //    console.log('editor modelChanged', this.model);
    //},
    onShow: function(){
        var self = this;

        //console.log('PostPageEditorView onShow');

        this.editor = new Dante.Editor({
            el: this.$el.find('#editor'),
            debugMode: true,
            upload_url: "/images.json",
            extra_tooltip_widgets: [this.btnVideo, this.btnImage, this.btnGoogleP, this.btnTwitter],
            base_widgets: ["embed_extract"],
            disable_title: true,
            body_placeholder: 'About new page',
            //debug: true,
            //
            //store_url: "/post/test-store",
            //store_method: "POST",
            //store_interval: 1000,

            afterInit: function() {
                //console.log('VideoEssenceApp.PostPages.editor.model.id', VideoEssenceApp.PostPages.editor.model.id);

                VideoEssenceApp.PostPages.editor.model.fetch({
                    method: 'POST',
                    data: {
                        id: VideoEssenceApp.PostPages.editor.model.id,
                        action: 'open'
                    },
                    success: function(){
                        self.initResizable();
                        self.initDraggable();

                        self.initContent();
                        self.initVideo();
                        //self.initEditVideo();
                    }
                });
            }
        });

        this.editor.getNode = function() {
            var node, range, root;
            node = void 0;
            root = $(this.el).find(".section-inner")[0];
            if (this.selection().rangeCount < 1) {
                return;
            }
            range = this.selection().getRangeAt(0);
            node = range.commonAncestorContainer;
            if (!node || node === root) {
                return null;
            }
            while (node && (node.nodeType !== 1 || !$(node).hasClass("graf")) && (node.parentNode !== root)) {
                node = node.parentNode;
            }
            if (!$(node).hasClass("graf--li")) {
                while (node && (node.parentNode !== root)) {
                    node = node.parentNode;
                }
            }
            if (root) {
                if (root.contains(node))
                    return node;
                else if ($(root).find('.graf.is-selected').size() == 1) {
                    return $(root).find('.graf.is-selected')[0];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };

        this.btnImage.current_editor = this.editor;
        this.btnVideo.current_editor = this.editor;
        //this.btnFаcebook.current_editor = this.editor;
        this.btnGoogleP.current_editor = this.editor;
        this.btnTwitter.current_editor = this.editor;
        this.editor.start();

        this.$el.find('#editor').on('click', '.close-button', function() {
            $(this).parent().remove();
            return false;
        });

        this.autosave = setInterval(function(){
            VideoEssenceApp.PostPages.editor.model.set('status', 1);
            VideoEssenceApp.PostPages.editor.savePage();
        }, 15000);
    },
    // add event listener resizable
    initResizable: function () {
        if ($('#post-editor').hasClass('post-view-content'))
            return true;

        $('#editor').on('imageAdd', function (event, images) {
            var images = $(images);
            images.each(function (index) {
                var image = $(images[index]);
                setTimeout(function () {
                    image.resizable({
                        maxWidth: $('#editor').width(),
                        aspectRatio: image.width() / image.height(),
                    });
                }, 111);
            });
        });
    },

    // add event listener draggable
    initDraggable: function () {
        if ($('#post-editor').hasClass('post-view-content'))
            return true;

        $('#editor').DragManager({
            drag: ['sp', 'ui-wrapper', 'video-js'],
            zIndex: 90
        });
    },
    initVideo: function() { // теперь не нужно, работает по-другому
        var videos = this.model.get('videos');
        var self = this;

        console.log("initVideo", videos);

        for (index in videos) {
            //console.log(videos, videos[index]['id']);
            if (videos.hasOwnProperty(index) && videos[index]['id']) {

                if (videos[index].type == "youtube")
                    videos[index].embeded_url = "https://www.youtube.com/embed/" + videos[index].id + "?autoplay=1";



                self.btnVideo.pasteVideo(videos[index]);
            }
        }
    },
    initContent: function() {
        //console.log('initContent', VideoEssenceApp.PostPages.PostPagesLayoutView.model, this.$el, this);


        var allPages = VideoEssenceApp.PostPages.PostPagesLayoutView.model.get('pages');
        //console.log('allPages', allPages);

        var pagesMiniListView = require('../views/PostPageMiniListView.js');

        var draggablePagesView = Backbone.View.extend( {
            template : _.template( "<%= title %>" ),
            events: {
                'dblclick': 'showPage',
                'mouseover': 'showBars',
                'mouseleave': 'hideBars'
            },
            showBars: function(e){
                var self = $(e.target);
                //console.log('showBars self', self, self.parent().find('.fa-bars').length);
                if (self.parent().find('.fa-bars').length == 0)
                    self.after('<i class="fa fa-bars"></i>')
            },
            hideBars: function(e){
                var self = $(e.target);
                //console.log('hideBars self', self, self.find('i'));
                self.parent().find('i').remove();
            },
            showPage: function(e){
                var self = $(e.target);
                //console.log('showPage self', self);

                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
                postPagesLayoutView.model.set('pageForEdit', this.$el.data('page-id'));

                VideoEssenceApp.PostPages.goToEditPage();
            },
            render : function() {
                var emp = this.model.toJSON();
                if (emp.id == VideoEssenceApp.PostPages.PostPagesLayoutView.model.get('pageForEdit')){
                    this.$el.addClass('active');
                }

                this.$el.attr('data-page-id', emp.id);

                var html = this.template( emp );
                this.$el.append( html );
            }
        });

        var draggablePage = Backbone.Model.extend( {} );
        var draggablePages = Backbone.Collection.extend( {
            model : draggablePage
        } );

        function createACollection () {
            return new draggablePages(
                _.map(_.sortBy(allPages, function(page){
                    return page.order
                }), function (page) {
                    return new draggablePage(page)
                })
            );
        }

        this.pagesDraggableList  = new Backbone.CollectionView( {
            el : VideoEssenceApp.PostPages.editorWpRegion.$el.find('.pages-order-list'),
            //el : $('.pages-order-list'),
            selectable : true,
            sortable : true,
            collection : createACollection(),
            modelView : draggablePagesView
        });

        this.pagesDraggableList.render();

        if (this.model.get('title')) {
            this.$el.find('.title-input').val(this.model.get('title'));
        }
        var $editor = this.$el.find('#editor');
        if (!_.isEmpty(this.model.get('content'))) {
            var pageContent = JSON.parse(this.model.get('content'));

            //console.log('pageContent', pageContent);

            //console.log("pageContent", pageContent, pageContent != [], pageContent.length == 0);

            if (pageContent.length > 0) {
                $editor.find(".section-inner").html('<p class="graf graf--p graf--last is-selected" ><br></p>');
            }

            var contentHtml = "";

            //console.log("pageContent", pageContent);

            for (var i in pageContent) {
                if (!pageContent.hasOwnProperty(i)) continue;

                //console.log("pageContent[prop].elType", pageContent[i].elType, pageContent[i]);

                var currentNode = "";

                if (pageContent[i].elType != "video" && pageContent[i].elType != "social" &&
                    (pageContent[i].tagName == 'p' ||
                    pageContent[i].tagName == 'blockquote')
                ) {
                    var nodeId = window.Dante.utils.generateUniqueName();
                    contentHtml = "<"+pageContent[i].tagName+" class='graf graf--"+pageContent[i].tagName+"' name='"+nodeId+"'>"+
                    pageContent[i].content +
                    "</"+pageContent[i].tagName+">";

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));
                    currentNode.before(contentHtml);

                    // init resizable after render
                    if ($($editor.find('.graf--' + pageContent[i].tagName).get(i)).find('img').length > 0)
                        $('#editor').trigger('imageAdd', $($editor.find('.graf--' + pageContent[i].tagName).get(i)).children('img'));
                }
                if (pageContent[i].elType == "social"){
                    var nodeId = window.Dante.utils.generateUniqueName()
                    var nodeHtml = "<"+pageContent[i].tagName+" class='graf graf--"+pageContent[i].tagName+"' name='"+nodeId+"'>"+
                        "</"+pageContent[i].tagName+">";

                    var lastGraf = $($editor.find(".section-inner").find(".graf:last"));
                    if (lastGraf.hasClass("graf--last") && $.trim(lastGraf.text()) == "")
                        lastGraf.remove();

                    $editor.find(".section-inner").append(nodeHtml);

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    contentHtml = pageContent[i].content;
                    currentNode.append(contentHtml);

                    if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last"))
                        $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" name="'+window.Dante.utils.generateUniqueName()+'" ><br></p>');
                }
                if (pageContent[i].elType == "video") {
                    var graf = $('<p class="graf graf--p" data-video-id="' + pageContent[i].videoId +
                    '" data-video-type="' + pageContent[i].videoType + '"><br></p>');

                    var video = {
                        id: pageContent[i].videoId,
                        type: pageContent[i].videoType,
                        url: pageContent[i].videoUrl,
                        poster: pageContent[i].videoPoster
                    };

                    if (pageContent[i].videoType == "youtube")
                        video.embeded_url = "https://www.youtube.com/embed/" + pageContent[i].videoId + "?autoplay=1";

                    currentNode = $($editor.find(".section-inner").find(".graf:last"));

                    currentNode.before(graf);

                    VideoEssenceApp.PostPages.editor.btnVideo.pasteVideo(video, graf);
                }
            }

            //console.log('test', $editor.find('.section-inner .graf').length, $editor.find('.section-inner .graf').html().trim(),
            //    _.reduce(_.map($editor.find('.section-inner .graf'), function(el){
            //        return $(el).html() == '<br>';
            //
            //    }), function(n, m){
            //        return n*m;
            //    })
            //);

            //console.log('ourPlaceholder', $editor.find('.section-inner .graf .ourPlaceholder'));

            //if (
            //    ( $editor.find('.section-inner .graf').length == 1 &&
            //    $editor.find('.section-inner .graf').html().trim() == '<br>') ||
            //    (_.reduce(_.map($editor.find('.section-inner .graf'), function(el){
            //        console.log($(el).html(), $(el).html() == '<br>', parseInt($(el).html() == '<br>'));
            //        return ($(el).html() == '<br>' || $(el).html().trim() == '');
            //
            //    }), function(n, m){
            //        return n*m;
            //    }) && $editor.find('.section-inner .graf .ourPlaceholder').length == 0)
            //){
            //    $($editor.find('.section-inner .graf')[0]).html('<div class="ourPlaceholder">About new page</div>');
            //    //$($editor.find('.section-inner .graf')[0]).attr('placeholder', 'About new page');
            //}

            //console.log('pageContent2',
            //    pageContent,
            //    !$editor.find(".section-inner").find(".graf:last").hasClass("graf--last") && pageContent != [],
            //    pageContent != '[]'
            //);

            if (!$editor.find(".section-inner").find(".graf:last").hasClass("graf--last") && pageContent.length > 0) {
                $editor.find(".section-inner").append('<p class="graf graf--p graf--last is-selected" ><br></p>');
            }
        }

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.get('pageForView') == 1

        if (postPagesLayoutView.model.get('pageForView') == 1){
            var $editorContent = $("#editor").find(".section-inner");
            $editorContent.attr("contenteditable", false);
            $("#editor").attr("contenteditable", false);
            $editorContent.addClass("no-user-select");
            $("#editor").parent().find(".inlineTooltip.is-active").css("display", "none");
            $(".action-buttons-page").hide();
            $(".page-editor-left").hide();
            $("#header, .gray-space").hide();
            $(".pocket").hide();


            var postEditorTitle = $("#post-editor").find(".title-input");

            postEditorTitle
                .attr("contenteditable", false)
                .attr("readonly", "readonly")
                .addClass("no-user-select")
            ;
        }
    },
    publishPage: function(e){
        e.preventDefault();

        this.model.set('status', 2);
        //this.model.set('goToList', 1);
        this.savePage();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', 0);

        VideoEssenceApp.PostPages.goToPagesList();

        return false;
    },
    cancelPage: function(e){
        e.preventDefault();

        this.savePage();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', 0);

        VideoEssenceApp.PostPages.goToPagesList();

        return false;
    },
    savePage: function(){
        //e.preventDefault();

        var $editor = this.$el.find('#editor');

        if ($editor.find('.ourPlaceholder')){
            $editor.find('.ourPlaceholder').remove();
        }

        var pageContent = [];

        $editor.find(".section-content").find(".section-inner .defaultValue").remove();

        $editor.find(".section-content").find(".section-inner").children().each(function(i){
            var self = $(this);

            var tagName = self.prop("tagName").toLowerCase();

            var editorEl = {
                tagName : tagName,
                content : self.html(),
                elType  : tagName
            };

            if (self.children("div") > 0){
                editorEl.elType = "other";
            }

            if (self.hasClass("is-ve-video")){
                editorEl.elType = "video";
                editorEl.videoId = self.data("video-id");
                editorEl.videoType = self.data("video-type");
            }

            //console.log('self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length', self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length);

            if (self.hasClass("is-ve-image") && self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length == 0){
                editorEl.elType = "img";
            }

            if (self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length > 0){
                editorEl.elType = "social";
            }

            //console.log("editorEl", editorEl);

            pageContent.push(editorEl);
        });

        //var pageImage = VideoEssenceApp.PostPublish.postData.videos[0].poster;
        //var pageContent = $("#editor").find(".section-content").find(".section-inner").html();

        var pageTitle = $("#page-editor").find(".title-input").val();

        //console.log('pages-order-list', $('.pages-order-list'),
        //_.map($('.pages-order-list').find('li div'), function(el){
        //    return  $(el).attr('data-page-id')
        //}));
        //
        ////_.map($('.pages-order-list').find('li div'), function(el){
        ////    console.log(el);
        ////   return  el;
        ////});

        var pageOrder = _.map($('.pages-order-list').find('li div'), function(el){
            return  $(el).attr('data-page-id')
        });

        //console.log("pageContent", pageContent);

        this.model.fetch({
            method: 'POST',
            data: {
                action: 'save',
                id: this.model.get('id'),
                status: this.model.get('status'),
                content: pageContent,
                title: pageTitle,
                order: pageOrder
            },
            success: function(){
               $('.pageDraftSaved').css('display', 'inline-block');
                setTimeout(function(){
                    $('.pageDraftSaved').fadeOut();
                }, 1000);
            }
        });

        return false;
    },
    clearPlaceholder: function(e){
        var self = $(e.target);
        var $editor = this.$el.find('#editor');
        //console.log('clearPlaceholder', e.target, $editor.find('.ourPlaceholder'));
        if ($editor.find('.ourPlaceholder')){
            $editor.find('.ourPlaceholder').parent().html('<br>');
            //$editor.find('.ourPlaceholder').remove();
        }
    }
});
module.exports = PostPageEditorView;
},{"../../js/danteGooglePTooltip.js":132,"../../js/danteImageTooltip.js":133,"../../js/danteTwitterTooltip.js":134,"../../js/danteVideoTooltip.js":135,"../../js/dragManager.js":136,"../views/PostPageMiniListView.js":111,"backbone.marionette":2}],110:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var askStatus = {
    all: -1,
    draft: 1,
    publish: 2,
    trash: 3
};

var PostPageListView = Marionette.ItemView.extend({
    tagName: "tr",
    //className: "page",
    attributes: {},
    template: VideoEssenceApp.templates['post-page-list-template'],
    activeModel: "",
    events: {
        'click .page-edit': 'pageEdit',
        'click .page-view': 'pageView',

        'click .page-publish': 'pagePublish',
        'click .page-draft': 'pageDraft',
        'click .page-trash': 'pageTrash',
        'click .page-restore': 'pageRestore',
        'click .page-delete': 'pageDelete',

        'click .pages-checkbox span': 'changeCheckbox'

    },
    modelEvents: {
        "change": "modelChanged"
    },
    modelChanged: function(){
        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var checkedPages = _.filter(postPagesLayoutView.postPagesListView.collection.models, function(page){
            return page.attributes.checked == 1
        });

        if (checkedPages.length > 0){
            postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'inline-block');
        }else{
            postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'none');
        }
        //console.log('checkedPages', checkedPages, checkedPages.length);
    },

    pageView: function(e){
        e.preventDefault();

        var self = $(e.target);

        //console.log('pageView', this.model.get('id'));

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForView', 1);
        postPagesLayoutView.model.set('pageForEdit', this.model.get('id'));

        VideoEssenceApp.PostPages.goToEditPage();

        return false;
    },
    pageEdit: function(e){
        e.preventDefault();
        var self = $(e.target);

        //console.log('pageEdit', this.model.get('id'));

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', this.model.get('id'));

        VideoEssenceApp.PostPages.goToEditPage();

        return false;
    },
    changeCheckbox: function(e){
        var self = $(e.target);
        var headerCheckbox = $(".post-pages-table .header-pages-checkbox");

        if (self.hasClass('my-checked-on')){
            self.parent().find(".my-checked-off").show();
            self.parent().find(".my-checked-on").hide();
            self.parent().find("input[type='checkbox']").prop("checked", false);

            headerCheckbox.find(".my-checked-off").show();
            headerCheckbox.find(".my-checked-on").hide();
            headerCheckbox.find("input[type='checkbox']").prop("checked", false);

            this.model.set('checked', 0)
        }
        if (self.hasClass('my-checked-off')){
            self.parent().find(".my-checked-off").hide();
            self.parent().find(".my-checked-on").show();
            self.parent().find("input[type='checkbox']").prop("checked", true);

            this.model.set('checked', 1)
        }
    },

    pagePublish: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
            .$el.find('.menu-pages-wp .menu-pages li a.active')
            .data('tabaction')
        ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                publish: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageDraft: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
            .$el.find('.menu-pages-wp .menu-pages li a.active')
            .data('tabaction')
        ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                draft: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageTrash: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
                .$el.find('.menu-pages-wp .menu-pages li a.active')
                .data('tabaction')
            ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                trash: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageRestore: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
                .$el.find('.menu-pages-wp .menu-pages li a.active')
                .data('tabaction')
            ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                restore: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    pageDelete: function(e){
        e.preventDefault();
        var self = $(e.target);

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        var tabaction = postPagesLayoutView.PostPagesListMenuView
                .$el.find('.menu-pages-wp .menu-pages li a.active')
                .data('tabaction')
            ;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                delete: [ self.data('id') ],
                status: askStatus[tabaction]
            }
        });

        return false;
    },

    catShowLinkedPosts: function(e){
        e.preventDefault();

        return false;
    },
    onRender: function(){
        this.$el.attr("data-key", this.model.id);

        //console.log("onRender this.model", this.model);
        //VideoEssenceApp.beutifyCheckbox();
    },
    onShow: function(){
        //VideoEssenceApp.beutifyCheckbox();
    },
    //delPage: function(){
    //    this.model.destroy({url: "/post/del-page?id=" + this.model.get('id')});
    //},
    initialize: function () {
        //console.log('PostPageListView initialize', this.model.attributes);
    },
    deleteItem: function () {}
});
module.exports = PostPageListView;
},{"backbone.marionette":2}],111:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var PostPageMiniListView = Marionette.ItemView.extend({
    tagName: "li",
    template: VideoEssenceApp.templates['post-page-mini-list-template'],
    activeModel: ""
});
module.exports = PostPageMiniListView;
},{"backbone.marionette":2}],112:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostPagesListMenuView = require('../views/PostPagesListMenuView.js')
    ;

var PostPagesLayoutView = Marionette.LayoutView.extend({
    el: '.post-pages',
    template: false,

    regions: {
        "pages": ".pages-grid-view",
        "menu": ".menu-pages-wp"
    },

    onShow: function(){

        this.model = new (Backbone.Model.extend({
            defaults: {},
            parse: function(response) {
                return response;
            },
            url: function () {
                return '/page/index';
            }
        }))();

        this.model.fetch({
            method: 'POST',
            remove: false,
            add: true,
            merge: false,
            data: {}
        });

        this.PostPagesListMenuView = new PostPagesListMenuView();

        this.model.on('sync', function(resp){

            // todo учесть пагинацию
            var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView,
                PostPagesListView = require('../views/PostPagesListView.js'),
                PostPagesCollection = require('../collections/PostPagesCollection.js');

            postPagesLayoutView.postPagesListView = new PostPagesListView({
                collection: new PostPagesCollection()
            });

            if ( resp.get('allCount') > 0 ){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
                postPagesLayoutView.PostPagesListMenuView.switchView(1);
            }

            if ( resp.get('allCount') == 0 ){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
                postPagesLayoutView.PostPagesListMenuView.switchView(0);
            }

            postPagesLayoutView.postPagesListView.collection.add(resp.get('pages'));

            //console.log('collection', postPagesLayoutView.postPagesListView.collection, resp.get('pages'))

            postPagesLayoutView.getRegion('pages').show(
                postPagesLayoutView.postPagesListView
            );

            postPagesLayoutView.listPagesTHead =
                '<thead>'+
                '<tr class="first">'+
                '<th class="header-pages-checkbox">'+
                '<input type="checkbox" class="select-on-check-all" name="selection_all" value="-2"><span class="my-checked-on fa fa-check-square" style="display: none;"></span><span class="my-checked-off fa fa-square-o" style="display: inline-block;"></span></th>'+
                '<th class="header-pages-title">Title</th>'+
                '<th class="header-pages-author">Author</th>'+
                '<th class="header-pages-comments">Comments</th>'+
                '<th class="header-pages-created">Created</th>'+
                '</tr>'+
                '</thead>'
            ;
            postPagesLayoutView.$el.find(".pages-grid-view").prepend(postPagesLayoutView.listPagesTHead);

            postPagesLayoutView.$el.find('.post-pages-table .header-pages-checkbox span').on('click', function(e){
                var self = $(e.target);
                var groupCheckbox = $(".post-pages-table .pages-checkbox");

                if (self.hasClass("my-checked-on")) {
                    self.parent().find(".my-checked-off").show();
                    self.parent().find(".my-checked-on").hide();
                    self.parent().find("input[type='checkbox']").prop("checked", false);

                    groupCheckbox.find(".my-checked-off").show();
                    groupCheckbox.find(".my-checked-on").hide();
                    groupCheckbox.find("input[type='checkbox']").prop("checked", false);

                    _.each(postPagesLayoutView.postPagesListView.collection.models, function(page){
                        page.attributes.checked = 0;
                    });

                    postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'none');

                    //postPagesLayoutView.postPagesListView.collection.set(postPagesLayoutView.postPagesListView.collection.models);

                    //console.log(postPagesLayoutView.postPagesListView.collection.models, postPagesLayoutView.postPagesListView.collection);
                }
                if (self.hasClass("my-checked-off")) {
                    self.parent().find(".my-checked-off").hide();
                    self.parent().find(".my-checked-on").show();
                    self.parent().find("input[type='checkbox']").prop("checked", true);

                    groupCheckbox.find(".my-checked-off").hide();
                    groupCheckbox.find(".my-checked-on").show();
                    groupCheckbox.find("input[type='checkbox']").prop("checked", true);

                    _.each(postPagesLayoutView.postPagesListView.collection.models, function(page){
                        page.attributes.checked = 1;
                    });

                    postPagesLayoutView.$el.find('.menu-pages .trash-pages').css('display', 'inline-block');

                    //console.log(postPagesLayoutView.postPagesListView.collection.models, postPagesLayoutView.postPagesListView.collection);
                }
            });

            postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').on('click', function(e){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

                var title = $(postPagesLayoutView.$el.find('.post-pages-table .header-pages-title'));

                if (title.find('i').length == 0){
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    title.append('<i class="fa fa-caret-up"></i>');
                    postPagesLayoutView.postPagesListView.collection.comparator = 'title';
                    postPagesLayoutView.postPagesListView.collection.sort();
                } else if(title.find('i.fa-caret-up').length > 0){
                    title.find('i').remove();
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    title.append('<i class="fa fa-caret-down"></i>');

                    postPagesLayoutView.postPagesListView.collection.comparator = function(a, b){
                        return -(a.get('title').localeCompare(b.get('title')));
                    };
                    postPagesLayoutView.postPagesListView.collection.sort();

                } else if(title.find('i.fa-caret-down').length > 0){
                    title.find('i').remove();

                    postPagesLayoutView.postPagesListView.collection.comparator = 'order';
                    postPagesLayoutView.postPagesListView.collection.sort();
                }

            });

            postPagesLayoutView.$el.find('.post-pages-table .header-pages-author').on('click', function(e){
                var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

                var author = $(postPagesLayoutView.$el.find('.post-pages-table .header-pages-author'));

                if (author.find('i').length == 0){
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    author.append('<i class="fa fa-caret-up"></i>');
                    postPagesLayoutView.postPagesListView.collection.comparator = function(a, b){
                        //console.log(a.get('author'));
                        var c = a.get('author').name.toString()[0].toUpperCase() + a.get('author').lastname.toString()[0].toUpperCase();
                        var d = b.get('author').name.toString()[0].toUpperCase() + b.get('author').lastname.toString()[0].toUpperCase();
                        return c.localeCompare(d);
                    };
                    postPagesLayoutView.postPagesListView.collection.sort();
                } else if(author.find('i.fa-caret-up').length > 0){
                    author.find('i').remove();
                    postPagesLayoutView.$el.find('.post-pages-table .header-pages-title').parent().find('.fa-caret-up, .fa-caret-down').remove();
                    author.append('<i class="fa fa-caret-down"></i>');

                    postPagesLayoutView.postPagesListView.collection.comparator = function(a, b){
                        //console.log(a.get('author'));
                        var c = a.get('author').name.toString()[0].toUpperCase() + a.get('author').lastname.toString()[0].toUpperCase();
                        var d = b.get('author').name.toString()[0].toUpperCase() + b.get('author').lastname.toString()[0].toUpperCase();
                        return -(c.localeCompare(d));
                    };
                    postPagesLayoutView.postPagesListView.collection.sort();

                } else if(author.find('i.fa-caret-down').length > 0){
                    author.find('i').remove();

                    postPagesLayoutView.postPagesListView.collection.comparator = 'order';
                    postPagesLayoutView.postPagesListView.collection.sort();
                }
            });

            //VideoEssenceApp.beutifyCheckbox(); // todo: чекбоксы  beutifyCheckbox

            postPagesLayoutView.PostPagesListMenuView.model.set({
                all: resp.get('allCount'),
                draft: resp.get('draftCount'),
                publish: resp.get('publishCount'),
                trash: resp.get('trashCount'),
                search: resp.get('textToSearch')
            });
        });
    }
});
module.exports = PostPagesLayoutView;
},{"../collections/PostPagesCollection.js":42,"../views/PostPagesListMenuView.js":113,"../views/PostPagesListView.js":114,"backbone.marionette":2}],113:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var STATUS_ALL 	 = -1;
var STATUS_DRAFT   = 1;
var STATUS_PUBLISH = 2;
var STATUS_TRASH 	 = 3;

var PostPagesListMenuView = Marionette.ItemView.extend({
    el: '.post-page-top-menu-wp',
    template: false,
    events: {
        'click .menu-pages .all': 'menuAll',
        'click .menu-pages .draft': 'menuDraft',
        'click .menu-pages .published': 'menuPublished',
        'click .menu-pages .trashed': 'menuTrashed',

        'click .menu-pages .trash-pages': 'buttonTrash',

        'click .post-search-title': 'searchPage',

        'click .post-pages-filters .select-time-dropdown li a': 'selectTime',

        'click .menu-pages-wp .new-page a': 'newPage',
        'click #no-one-page button': 'newPage'
    },
    newPage: function(e){
        e.preventDefault();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;
        postPagesLayoutView.model.set('pageForEdit', 0);

        VideoEssenceApp.PostPages.goToEditPage();

        return false;
    },
    modelEvents: {
        "change": "modelChanged"
    },
    switchView: function(opt){
        if (opt == 0){
            $("#no-one-page").show();

            $('.menu-pages-wp .menu-pages li a').removeClass('active');
            $('.menu-pages-wp .menu-pages li a.all').addClass('active');

            $(".menu-pages-wp").hide();
            $(".post-pages-filters").hide();
            $("#grid-view").hide();
        }
        if (opt != 0){
            $("#no-one-page").hide();
            $(".menu-pages-wp").show();
            $(".post-pages-filters").show();
            $("#grid-view").show();
        }
    },
    selectTime: function(e){
        //e.preventDefault();

        var self = $(e.target);
        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                selectDate: self.data("select-time")
            }
        });

        //return false;
    },
    searchPage: function(e){
        e.preventDefault();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                search: this.$el.find('.pages-search .search-text-wp input.search-post').val()
            }
        });

        return false;
    },
    menuAll: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_ALL
            }
        });

        return false;
    },
    menuDraft: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_DRAFT
            }
        });

        return false;
    },
    menuPublished: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_PUBLISH
            }
        });

        return false;
    },
    menuTrashed: function(e){
        e.preventDefault();

        var self = $(e.target);
        this.$el.find('.menu-pages-wp .menu-pages li a').removeClass('active');
        self.addClass('active');

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                status: STATUS_TRASH
            }
        });

        return false;
    },
    buttonTrash: function(e){
        e.preventDefault();

        var postPagesLayoutView = VideoEssenceApp.PostPages.PostPagesLayoutView;

        postPagesLayoutView.model.fetch({
            method: 'POST',
            data: {
                trash: _.pluck(
                            _.filter(postPagesLayoutView.postPagesListView.collection.models, function(page){
                                return page.attributes.checked == 1;
                            }
                        ), 'id')
            }
        });

        return false;
    },
    onRender: function(){
        //console.log("PostPagesListMenuView onRender");
    },
    initialize: function(){
        this.model = new (Backbone.Model.extend({
            defaults: {
                all: 0,
                draft: 0,
                publish: 0,
                trash: 0,
                search: ''
                //, status: -1
            }
        }))();
    },
    modelChanged: function(e){
        this.$el.find('.menu-pages-wp .all').text('All (' + this.model.get('all') + ')');
        this.$el.find('.menu-pages-wp .draft').text('Draft (' + this.model.get('draft') + ')');
        this.$el.find('.menu-pages-wp .published').text('Published (' + this.model.get('publish') + ')');
        this.$el.find('.menu-pages-wp .trashed').text('Trashed (' + this.model.get('trash') + ')');
        this.$el.find('.menu-pages-wp .search-post').val(this.model.get('search'));
    }
});
module.exports = PostPagesListMenuView;
},{"backbone.marionette":2}],114:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostPagesCollection = require('../collections/PostPagesCollection.js'),
    PostPageListView = require('./PostPageListView.js');

var PostPagesListView = Marionette.CollectionView.extend({
    tagName: "tbody",
    //className: "PostPagesListView",
    childView: PostPageListView,
    onStart: function(){},
    onBeforeRender: function(){
        //this.collection.comparator = 'order';
        //this.collection.sort();
    },
    onRender: function(){
        //this.collection.comparator = 'id';
        //this.collection.sort();
    }
});
module.exports = PostPagesListView;
},{"../collections/PostPagesCollection.js":42,"./PostPageListView.js":110,"backbone.marionette":2}],115:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    PostCategoriesCollection = require('../collections/PostCategoriesCollection.js'),
    PostCategoriesView = require('./PostCategoriesView.js'),
    PostCategoryView = require('./PostCategoryView.js'),
    PostCategory = require('../models/PostCategory.js');

var PostPublishView = Marionette.ItemView.extend({
    el: '.publish-block',
    //template: false,
    template: VideoEssenceApp.templates['post-publish'],
    events: {
        //'keyup .add-category input': 'testCategoryKeyUp',

        'click .cat-checkbox-wp .my-checked-on': 'checkboxChange',
        'click .cat-checkbox-wp .my-checked-off': 'checkboxChange',
        'submit #post-publish': 'submitPublishForm',
        'click .relations-popup': 'relatedModal',
        'click .post-add-category': 'postCategoryModal',
        'focusout .bootstrap-tagsinput .tt-input': 'tagFocusOut',
        'click .post-close': 'goToEditStep'
    },
    tagFocusOut: function(e){
        setTimeout(function () {
            $('.bootstrap-tagsinput .tt-input').val('');
        }, 1);
    },
    goToEditStep: function (e) {
        e.preventDefault();
        $('.publish-block-wp').slideUp('slow');
        $('.action-buttons-post').fadeIn('slow');
        var $editorContent = $("#editor").find(".section-inner");
        $editorContent
            .attr("contenteditable", true)
            .removeClass("no-user-select")
        ;
        $("#editor").parent().find(".inlineTooltip.is-active").css("display", "block");
        var postEditorTitle = $("#post-editor").find(".title-input");

        $("#editor").attr("contenteditable", true);

        postEditorTitle
            .attr("contenteditable", true)
            .removeAttr("readonly")
            .removeClass("no-user-select")
        ;
    },
    constructor: function (params, options) {
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        this.model = new Backbone.Model();

        this.model.set("additinonalInfo", options.additinonalInfo);
    },
    relatedModal: function(){
        var RelatedModal = require('../views/RelatedModal.js');
        $('.app').html(new RelatedModal().render().el);
    },
    postCategoryModal: function(){
        //var PostCategoryModal = require('../views/PostCategoryModal.js');
        //$('.app').html(new PostCategoryModal().render().el);
        VideoEssenceApp.PostCategoryModal = require('../views/PostCategoryModal.js');
        $('.app').html(new VideoEssenceApp.PostCategoryModal().render().el);
    },
    onRender: function(e){
        //console.log("onRender", this);
        //console.log("VideoEssenceApp.PostPublish", VideoEssenceApp.PostPublish.currentPostRelation);

        this.categories = new PostCategoriesCollection();

        this.categories.fetch({
            remove: false,
            add: true,
            merge: false,
            data: {"post_id": window.post_id}
        });

        //console.log("onRender", this.categories);

        this.postCategoriesView = new PostCategoriesView({
            collection: this.categories
        });

        this.postCategoriesRegion = new Backbone.Marionette.Region({
            el: '#tree'
        });

        this.postCategoriesRegion.show(this.postCategoriesView);
        
        if (VideoEssenceApp.PostPublish.postInformationShowRelated)
            this.$('input[name="switch-field-1"]').attr('checked', 'checked');

        //console.log("VideoEssenceApp.PostPublish", VideoEssenceApp.PostPublish);

        VideoEssenceApp.PostPublish.initTagInputs(VideoEssenceApp.PostPublish.additinonalInfo.tags);
    },
    onBeforeRender: function(){
        //console.log("onBeforeRender", this);
    },
    checkboxChange: function(e){
        //console.log("checkboxChange", event.target);
        //console.log("checkboxChange", e.target);

        var self = $(e.target);

        var checked = false;
        if (self.hasClass("my-checked-off"))
            checked = true;

        if (checked){
            self.parent().find(".my-checked-off").hide();
            self.parent().find(".my-checked-on").css("display", "inline-block");
            self.parent().find("input[type='checkbox']").prop("checked", true).val(1);

            VideoEssenceApp.checkedCategories.push(self.parents(".cat").data("id"));
        }
        else{
            self.parent().find(".my-checked-on").hide();
            self.parent().find(".my-checked-off").css("display", "inline-block");
            self.parent().find("input[type='checkbox']").prop("checked", false).val(0);

            VideoEssenceApp.checkedCategories.splice(VideoEssenceApp.checkedCategories.indexOf(self.parents(".cat").data("id")), 1)
        }

    },
    submitPublishForm: function(e){
        //e.preventDefault();

        var jsonRelations = JSON.stringify(
            _.pluck(
                VideoEssenceApp.PostPublish.linkPostsCollection.
                    where({linked: true}),
                'id'
            ));

        var checkedCategories = JSON.stringify(VideoEssenceApp.checkedCategories);

        if($('.customize-switcher input[type="checkbox"]')[0].checked){
            $('#post-publish-show_related').val(1);
        }
        $('#post-publish-relations').val(jsonRelations);
        $('#post-publish-tags').val($(".publish-block .input-post-tags").val());
        $('#post-publish-selected-categories').val(checkedCategories);

        var postContent = [];
        try {
            // destroy resizable before save
            $("#editor").find('img').resizable('destroy');
            $("#editor").find('.draggable').removeClass('draggable');
        } catch (e) {

        }

        $("#editor").find(".section-content").find(".section-inner").children().each(function(i){
            var self = $(this);

            var tagName = self.prop("tagName").toLowerCase();

            var editorEl = {
                tagName : tagName,
                content : self.html(),
                elType  : tagName
            };

            if (self.children("div") > 0){
                editorEl.elType = "other";
            }

            if (self.hasClass("is-ve-video")){
                editorEl.elType = "video";
                editorEl.videoId = self.data("video-id");
                editorEl.videoType = self.data("video-type");
                editorEl.content = {
                    width: self.find('.video-js-vimeo-dante').data('width'),
                    height: self.find('.video-js-vimeo-dante').data('height')
                };
                console.log("editorEl", editorEl);
            }

            //console.log('self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length', self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length);

            if (self.hasClass("is-ve-image") && self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length == 0){
                editorEl.elType = "img";
            }

            if (self.find(".videoessenceGooglePost, .videoessenceTwitterPost").length > 0){
                editorEl.elType = "social";
            }

            //console.log("editorEl", editorEl);

            postContent.push(editorEl);
        });



        //var postContent = $("#editor").find(".section-content").find(".section-inner").html();
        //console.log("postContent p.graf--p", postContent);

        var postTitle = $("#post-editor").find(".title-input").val();
        var postImage = VideoEssenceApp.PostPublish.postData.videos[0].poster;
    
        $.ajax({
            url: $('#post-publish').attr("action"),
            method: 'POST',
            data: {
                tags: $(".publish-block .input-post-tags").val(),
                selectedCategories: checkedCategories,
                relations: jsonRelations,
                show_related: $('.customize-switcher input[type="checkbox"]')[0].checked ? 1 : 0,
                related_headline: "",
                content: postContent,
                title: postTitle,
                videoImage: postImage
            },
            dataType: 'html',
            success: function(response){
                if (response == "ok"){
                    window.location = "/post/index";
                }
                //console.log("html", html);
            },
            error: function(){
                alert('Some error on server');
            }
        });

        return false;
    }
});
module.exports = PostPublishView;
},{"../collections/PostCategoriesCollection.js":41,"../models/PostCategory.js":54,"../views/PostCategoryModal.js":106,"../views/RelatedModal.js":116,"./PostCategoriesView.js":104,"./PostCategoryView.js":107,"backbone.marionette":2}],116:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var LinkPostsView = require('./LinkPostsView.js');
var LinkPosts = require('../collections/LinkPosts.js');
var LinkRelatedPostsView =  require('./LinkRelatedPostsView.js');

var RelatedModal = ModalHandelbars.extend({
	model: new Backbone.Model({
		listType: 'all'
	}),
	template:  VideoEssenceApp.templates['modal-template-related-posts'],
	cancelEl: '.bbm-button, .modal-related-posts-controls-cancel, .modal-related-posts-controls-add',
	events: {
		"click #post-search" : "search",
		'keyup .search-post': 'searchFromInput',
		"click .post-btn" : "addRelations",
		"click .all-posts" : "showAll",
		"click .related-posts" : "showRelated"
	},
	beforeCancel: function(){
		this.model.set('headline', $("#headline").text());
		$('input[name=related_headline]').val($("#headline").text());
        //console.log("VideoEssenceApp.PostPublish.editor", VideoEssenceApp.PostPublish.editor);

        //VideoEssenceApp.PostPublish.editor.linkPostsView = new LinkPostsView({
        //    collection: new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
        //});

        //VideoEssenceApp.PostPublish.editor.linkRelatedPosts.show(VideoEssenceApp.PostPublish.editor.linkPostsView);
	},
	beforeSubmit: function(){
		this.model.set('headline', $("#headline").text());
		$('input[name=related_headline]').val($("#headline").text());
	},
	showAll: function() {
		this.model.set({
			listType: 'all',
			keyword: ''
		});
		this.render();
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: VideoEssenceApp.PostPublish.linkPostsCollection
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
	},
	showRelated: function() {
		this.model.set({
			listType: 'related',
			keyword: ''
		});
		this.render();
		VideoEssenceApp.linkPostsView = new LinkRelatedPostsView({
			collection:
				new LinkPosts(VideoEssenceApp.PostPublish.linkPostsCollection.where({linked: true}))
		});
		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);
	},
	beforeRender : function(){
		this.model.set({
			headline: $('input[name=related_headline]').val()
		});
	},
	onShow : function(){
		VideoEssenceApp.linkPostsRegion = new Marionette.Region({
			el: this.$el.find('.post-container')
		});
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: VideoEssenceApp.PostPublish.linkPostsCollection
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

		$("#headline").keypress(function(e){ return e.which != 13; });
	},
	searchFromInput: function(event) {
		if(event.keyCode == 13){
			this.search();
		}
	},
	search: function(){
		var keyword = this.$(".search-post").val();
		this.model.set({
			listType: 'all',
			keyword: keyword
		});
		this.render();
		findResult = new Backbone.Collection();
		VideoEssenceApp.PostPublish.linkPostsCollection.each(function(post) {
			postTitle = post.get('title');
			if(postTitle.indexOf(keyword) > -1){
				findResult.add(post);
			}
		});
		VideoEssenceApp.linkPostsView = new LinkPostsView({
			collection: findResult
		});

		VideoEssenceApp.linkPostsRegion.show(VideoEssenceApp.linkPostsView);

	},
	addRelations:function(){
		this.model.set('listType', 'all');
		$(this.el).hide();
	}
});
module.exports = RelatedModal;
},{"../collections/LinkPosts.js":39,"./LinkPostsView.js":86,"./LinkRelatedPostsView.js":88,"./ModalHandlebars.js":89,"backbone.marionette":2}],117:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var SearchVideoView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['found-channel-template'],
    events: {
        'click .url': 'showChannelVideos',
        'click .found-channel-like': 'clickFollow',
        'mouseover .found-channel-like a' : 'onFollowHoverIn',
        'mouseout .found-channel-like a' : 'onFollowHoverOut'
    },

    initialize: function () {
        //todo: подумать как без silient
        this.model.set('followed', VideoEssenceApp.FollowPanel.isHave(encodeURIComponent(this.model.get('id'))), {silent: true});
        this.model.set('ourUrl', "/site/channelvideos?channel_type=" + this.model.get("type") + "&channel_id=" + this.model.get("id"));

    },

    showChannelVideos: function(){
        VideoEssenceApp.VideoExplore.videosCollection.channelVideos(this.model.get('type'), this.model.get('id'));
        VideoEssenceApp.VideoExplore.videosView.getItems();
        return false;
    },

    clickFollow: function(e) {
        e.preventDefault();
        //console.log("clickFollow", e);
        var isFollowed = this.model.get('followed');

        //console.log({
        //    id:   encodeURIComponent(this.model.get('id')),
        //    title:  this.model.get('title'),
        //    type:  this.model.get('type'),
        //    url: this.model.get('url')
        //});

        VideoEssenceApp.FollowPanel.followedChannelCollectionFull.channelProcess(isFollowed, {
            id:   encodeURIComponent(this.model.get('id')),
            title:  this.model.get('title'),
            type:  this.model.get('type'),
            url: this.model.get('url'),
            image: this.model.get('image')
        });
        this.model.set('followed', !isFollowed);
        this.render();
    },

    onFollowHoverIn: function(e){
        //console.log("onFollowHoverIn", e);
        //var followLink = $(".found-channel-like a");
        var followLink = $(e.target);
        if (followLink.hasClass("followed")){
            followLink.text("Unfollow");
        }
        else{
            followLink.text("Follow");
        }
    },
    onFollowHoverOut: function(e){
        //console.log("onFollowHoverOut", e);
        var followLink = $(".found-channel-like a");
        var followLink = $(e.target);
        if (followLink.hasClass("followed")){
            followLink.text("Following");
        }
        else{
            followLink.text("Follow");
        }
    }
});
module.exports = SearchVideoView;
},{"backbone.marionette":2}],118:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var SearchVideoView = require('./SearchVideoView.js');
var SearchVideosView = Marionette.CollectionView.extend({
	childView: SearchVideoView
});
module.exports = SearchVideosView;
},{"./SearchVideoView.js":117,"backbone.marionette":2}],119:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var SearchVideoView = require('./SearchVideoView.js');

var SimilarKeywordsView = Marionette.CollectionView.extend({
	childView: SearchVideoView
});
module.exports = SimilarKeywordsView;
},{"./SearchVideoView.js":117,"backbone.marionette":2}],120:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);

var SocialSearchModal = ModalHandelbars.extend({
	events: {
		"click .search-images-button": "search",
		'keyup .post-search-field': 'searchFromInput',
		'click .tab-all-posts-social': 'showAllSocPosts',
		'click .tab-embedded-posts-social': 'showEmbeddedSocPosts'
	},
	template: VideoEssenceApp.templates['modal-social-search'],
	cancelEl: '.modal-close, .action-cancel',
	submitEl: '.action-add',
	currentTab: '',

	onRender: function () {
		var $result_el = this.$el.find(".modal-social-search-result");
		var $result_el_embeded = this.$el.find(".modal-social-embeded-result");
		this.resultsRegion = new Marionette.Region({
			el: $result_el[0]
		});
		this.resultsRegionEmbeded = new Marionette.Region({
			el: $result_el_embeded[0]
		});
		this.showAllSocPosts();
	},
	changeTab: function (tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
		this.updateScrollbar($('.modal-social-search-result'));
		this.updateScrollbar($('.modal-social-embeded-result'));
	},
	hideAllBeforeSelect: function () {
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.modal-social-tab').hide();
	},
	showAllSocPosts: function() {
		this.initScrollbar($('.modal-social-search-result'));
		this.changeTab('.tab-all-posts-social', '#modal-social-posts-search');
	},
	showEmbeddedSocPosts: function() {
		this.initScrollbar($('.modal-social-embeded-result'));
		this.changeTab('.tab-embedded-posts-social', '#modal-social-posts-embedded');
	},
	searchFromInput: function (evt) {
		if (evt.keyCode == 13) {
			this.search();
		}
	},

	search: function () {
		this.insertSelectedItems();
		var key = $('.post-search-field').val();
		this.afterSearch(key);
	},
	afterSearch: function (key) {

	},
	submit: function () {
		this.insertSelectedItems();
	},
	insertSelectedItems: function () {

	},
	initScrollbar: function (elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function (elem) {
		elem.perfectScrollbar('update');
	}
});
module.exports = SocialSearchModal;
},{"./ModalHandlebars.js":89,"backbone.marionette":2,"jquery":10,"perfect-scrollbar/jquery":11}],121:[function(require,module,exports){
var SocialSearchModal = require('./SocialSearchModal.js');
var Twitters = require('../collections/Twitters.js');
var TwittersView = require('./TwittersView.js');
var TwitterView = require('./TwitterView.js');
var TwitterSearchModal = SocialSearchModal.extend({
	afterSearch: function (key) {
		this.collection = new Twitters();
		this.collection.fetch({
			data: {"keyword": key}
		});

		this.resultsRegion.show(new TwittersView({
			collection: this.collection
		}));

		if (!this.collectionEmbeded) {
			this.collectionEmbeded = new Twitters();
			var collectionViewEmbeded = new TwittersView({
				collection: this.collectionEmbeded
			});
			this.resultsRegionEmbeded.show(collectionViewEmbeded);
		}

		this.listenTo(this.collection, 'change:saved', this.addToEmbeded);
		this.listenTo(this.collection, 'change:saved', this.setCount);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.collection) && !!this.collection.length) {
			var selectedPosts = this.collection.where({saved: true});
			var html = '';
			for (var i in selectedPosts) {
				html += new TwitterView({
						model: selectedPosts[i],
						template: VideoEssenceApp.templates['twitter-editor-template']
					}
				).render().$el.html();
			}
			//VideoEssenceApp.PostCreate.editor.btnTwitter.insertHtml(html);
            if (VideoEssenceApp.PostPublish.editor != undefined)
			    VideoEssenceApp.PostPublish.editor.btnTwitter.insertHtml(html);
            if (VideoEssenceApp.PostPages.editor != undefined)
			    VideoEssenceApp.PostPages.editor.btnTwitter.insertHtml(html);


			this.initScrollbar($('#modal-social-posts-search .modal-social-search-result'));
			this.collection.reset();
		}
	},
	setCount: function () {
		this.$el.find('.tab-embedded-posts-social span').html(this.model.get('count_select'));
	},
	addToEmbeded: function(model, saved) {
		if (saved) 
			this.collectionEmbeded.add(model);
		else
			this.collectionEmbeded.remove(model);
		this.model.set('count_select',this.collectionEmbeded.length);
	}
});
module.exports = TwitterSearchModal;
},{"../collections/Twitters.js":44,"./SocialSearchModal.js":120,"./TwitterView.js":122,"./TwittersView.js":123}],122:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var TwitterView = Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['twitter-template'],
	className: 'col-md-6 col-xs-12',
	events: {
		'click .embed-btn': 'embed',
		'click .remove-btn': 'removeSelect'
	},
	initialize: function () {
		this.listenTo(this.model, 'change:saved', this.renderItem);
	},
	embed: function(){
		var self = this;
		self.model.set('onhover', false);
		this.model.set('saved', true);
		this.$el.find('.remove-btn').mouseleave(function() {
			self.model.set('onhover', true);
			self.renderItem();
		});
	},
	removeSelect: function(){
		this.model.set('onhover', true);
		this.model.set('saved', false);
	},
	renderItem: function () {
		this.render();
	},
	onRender: function () {
		this.listenTo(VideoEssenceApp, 'tick', this.tick);
	},
	tick: function () {
		if(!_.isUndefined(this.model) ){
			this.$el.find('.time-ago').html(moment(this.model.get('created_at')).fromNow());
		}
	},
	onDestroy: function(){
		this.stopListening();
	},
	onShow: function () {
		this.$el.find('a').attr('target', '_blank');
	}
});
module.exports = TwitterView;
},{"backbone.marionette":2}],123:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var TwitterView = require('./TwitterView.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);
	
var TwittersView = Marionette.CollectionView.extend({
	className: 'image-search-result-inner',
	childView: TwitterView,
	initialize: function() {
		this.listenTo(this.collection, "add", this.updateScrollbar);
	},
	updateScrollbar: function () {
		$('.modal-social-search-result').perfectScrollbar();
		$('.modal-social-embeded-result').perfectScrollbar();
	}
});
module.exports = TwittersView;
},{"./TwitterView.js":122,"backbone.marionette":2,"jquery":10,"perfect-scrollbar/jquery":11}],124:[function(require,module,exports){
var Marionette = require('backbone.marionette');

var ImageView = Marionette.ItemView.extend({
	tagName: "div",
	className: "col-xs-6 col-md-4",
	template: VideoEssenceApp.templates['upload-image-template'],
	events: {
		'click .checkbox': 'toggleItem',
		'click .delete-image': 'deleteItem',
		'click .cancel-upload': 'cancelUpload'
	},
	initialize: function () {
		this.listenTo(this.model, 'change:uploaded', this.render);
		this.listenTo(this.model, 'change:progress', this.render);
		this.listenTo(this.model, 'change:error', this.render);
	},
	toggleItem: function () {
		if (this.$el.hasClass('selected-item-gallery')) {
			this.model.set('selected', false);
			this.$el.removeClass('selected-item-gallery');
		} else {
			this.model.set('selected', true);
			this.$el.addClass('selected-item-gallery');
		}
		this.render();
	},
	deleteItem: function () {
		this.model.destroy({url: "/image/delete/" + this.model.get('id')});
	},
	cancelUpload: function () {
		this.model.set({'canceled': true});
	}
});

module.exports = ImageView;
},{"backbone.marionette":2}],125:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var UploadImageView = require('./UploadImageView.js');

var UploadImagesView = Marionette.CollectionView.extend({
	tagName: "div",
	className: "image-gallery-wrapper",
	childView: UploadImageView
});

module.exports = UploadImagesView;

},{"./UploadImageView.js":124,"backbone.marionette":2}],126:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoPocketView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-pocket-template'],
    events: {
        'click .delete-from-pocket': 'clickedButton',
        'click .thumbnail': 'openModal'
    },
    initialize:function(){
        $(".pocket").find(".pocket-wrapper").on( 'mousewheel DOMMouseScroll', function ( e ) {
            //console.log("mousewheel DOMMouseScroll");
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;

            this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
            e.preventDefault();
        });
    },
    clickedButton: function() {
        VideoEssenceApp.vent.trigger("pocket:videoRemove", this.model);
    },
    openModal: function(event) {
        event.preventDefault();
        VideoEssenceApp.VideoExplore.showModal(event, this.model);
    }
});
module.exports = VideoPocketView;
},{"backbone.marionette":2}],127:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoROICollectionView = Marionette.CollectionView.extend({
    template: VideoEssenceApp.templates['video-roi-collection'],
    showForTime: function(time) {
        this.children.each(function(view){
            view.applyPlay(time);
        });
    },
    showPause: function() {
        this.children.each(function(view){
            view.applyPause();
        });
    }
});
module.exports = VideoROICollectionView;
},{"backbone.marionette":2}],128:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var VideoROIView = Marionette.ItemView.extend({
    template: VideoEssenceApp.templates['video-roi'],
    templateHelpers: function () {
        var self = this;
        var equal = function(need, data) {
            return need === data;
        }
        return {
            display: function() {
                return self.model.get('displayOnPause') ? 1 : 0;
            },
            typeIsLead: equal('lead', this.model.get('type')),
            typeIsAnnotation: equal('annotation', this.model.get('type')),
            typeIsCta: equal('cta', this.model.get('type')),
            opacity: function() {
                return self.model.get('opacity')/100;
            }
        }
    },
    events: {
        'click .closeAnnotation': 'skip',
        'click .skip': 'skip',
    },
    isPause: false,
    skiped: false,
    skipedOnPause: false,
    skip: function() {
        if (this.isPause) {
            this.skipedOnPause = true;
        } else {
            this.skiped = true;
        }
        this.hide();
    },
    onRender: function() {
        this.hide();
    },
    show: function() {
        if (!this.skiped) {
            this.$el.show();
        }
    },
    showOnPause: function() {
        if (!this.skipedOnPause) {
            this.$el.show();
        }
    },
    hide: function() {
        this.$el.hide();
    },
    applyPlay: function(time) {
        this.isPause = false;
        if (time > this.model.get('timeStart')) {
            this.show();
        } else {
            this.hide();
        }
        if (time >= this.model.get('timeStop') && this.model.get('timeStop') > 0) {
            this.hide();
        }
    },
    applyPause: function() {
        this.isPause = true;
        if (this.model.get('displayOnPause')) {
            this.showOnPause();
        }
    }
});
module.exports = VideoROIView;
},{"backbone.marionette":2}],129:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var ModalHandelbars = require('./ModalHandlebars.js');
var VideosView = require('./ModalVideoPocket.js');
var VideoView = require('./ModalVideoPocketView.js');
var VideoModel = require('../models/Video.js');
var Videos = require('../collections/PocketVideos.js');

var $ = require('jquery');
	require('perfect-scrollbar/jquery')($);

var SocialSearchModal = ModalHandelbars.extend({
	events: {
		"click .search-video-button": "searchVideos",
		'keyup .post-search-field': 'searchVideosInput',
		'click .tab-video-pocket': 'showVideoPocket',
		'click .tab-video-search': 'showVideoSearch',
		'click .action-add': 'insertSelectedItems'
	},
	template: VideoEssenceApp.templates['modal-video-search'],
	cancelEl: '.modal-close, .action-cancel',
	submitEl: '.action-add',
	currentTab: '',
	currentNode: '',

	onRender: function () {
		//this.currentNode = $(VideoEssenceApp.PostCreate.editor.editor.getNode());
        if (VideoEssenceApp.PostPublish.editor != undefined)
		    this.currentNode = $(VideoEssenceApp.PostPublish.editor.editor.getNode());

        if (VideoEssenceApp.PostPages.editor != undefined)
		    this.currentNode = $(VideoEssenceApp.PostPages.editor.editor.getNode());

		var $result_el = this.$el.find(".modal-video-pocket-result");
		var $result_el_embeded = this.$el.find(".modal-video-search-result");
		this.resultsRegion = new Marionette.Region({
			el: $result_el[0]
		});
		this.resultsRegionEmbeded = new Marionette.Region({
			el: $result_el_embeded[0]
		});
		this.showVideoPocket();
	},
	changeTab: function (tab, content) {
		this.hideAllBeforeSelect();
		this.$(tab).addClass('selected');
		this.currentTab = this.$(content);
		this.currentTab.show();
		this.updateScrollbar($('.result-wrapper-scroll'));
	},
	hideAllBeforeSelect: function () {
		this.currentTab = '';
		this.$('.ve-tab').removeClass('selected');
		this.$('.modal-social-tab').hide();
	},
	selectVideo: function (model, selected) {
		if (!this.videosSelectedCollection) {
			this.videosSelectedCollection = new Videos();
		}
		if (selected) 
			this.videosSelectedCollection.add(model);
		else
			this.videosSelectedCollection.remove(model);
	},
	insertSelectedItems: function () {
		if(!_.isUndefined(this.videosSelectedCollection) && !!this.videosSelectedCollection.length) {
			var selectedVideos = this.videosSelectedCollection.where({selected: true});
            console.log("!@# selectedVideos", selectedVideos);
            var sendVideosUrls = {videos: []};
            var recivedVideosUrls = [];
            for(var i in selectedVideos) {
                sendVideosUrls.videos.push({
                    video_id: selectedVideos[i].attributes.id,
                    video_type: selectedVideos[i].attributes.type
                });
            }

            var curentNode = this.currentNode;

            $.ajax({
                url: "/post/video-url",
                method: 'POST',
                data: {
                    sendVideosUrls: sendVideosUrls
                },
                dataType: 'json',
                success: function(responseVideoUrls){
                    if (VideoEssenceApp.PostPublish.editor != undefined)
                        var currentNode = $(VideoEssenceApp.PostPublish.editor.editor.getNode());
                    if (VideoEssenceApp.PostPages.editor != undefined)
                        var currentNode = $(VideoEssenceApp.PostPages.editor.editor.getNode());

                    console.log("success currentNode", currentNode);

                    for(var i in selectedVideos) {
                        var graf = $('<p class="graf graf--p graf--empty" data-video-id="'+selectedVideos[i].attributes.id+
                        '" data-video-type="'+selectedVideos[i].attributes.type+'"><br></p>');

                        //console.log("i currentNode", currentNode);

                        if (currentNode.hasClass('graf--last'))
                            currentNode.before(graf);
                        else
                            currentNode.after(graf);

                        selectedVideos[i].set({
                            url: responseVideoUrls[i].url,
                            poster: responseVideoUrls[i].poster
                        });

                        if (VideoEssenceApp.PostPublish.editor != undefined)
                            VideoEssenceApp.PostPublish.editor.btnVideo.pasteVideo(selectedVideos[i].attributes, graf);
                        if (VideoEssenceApp.PostPages.editor != undefined)
                            VideoEssenceApp.PostPages.editor.btnVideo.pasteVideo(selectedVideos[i].attributes, graf);
                    }

                },
                error: function(){
                    alert('Some error on server');
                }
            });




			this.videosSelectedCollection.reset();
		}
	},
	showVideoPocket: function () {
		var self = this;
		if (!this.pocketVideosCollection) {
			this.pocketVideosCollection = new Videos();
			var videoModelsArr = JSON.parse(localStorage.getItem("pocketVideosCollection"));
			var videoModels = [];
			for (var i in videoModelsArr) {
				var model_video = videoModelsArr[i];
				videoModelsArr[i]['published_at'] = moment(videoModelsArr[i]['published_at']).fromNow();
				videoModels.push(new VideoModel(model_video));
			}
			this.pocketVideosCollection.set(videoModels);
			this.listenTo(this.pocketVideosCollection, 'change:selected', this.selectVideo);
		}
		this.resultsRegion.show(new VideosView({
			collection: this.pocketVideosCollection
		}));
		setTimeout(function() {
			self.initScrollbar($('.modal-video-pocket-result'));
		}, 1);
		this.changeTab('.tab-video-pocket', '#modal-video-pocket');
	},
	showVideoSearch: function() {
		this.initScrollbar($('.modal-video-search-result'));
		this.changeTab('.tab-video-search', '#modal-video-search');
	},
	searchVideosInput: function (event) {
		if(event.keyCode == 13){
			this.searchVideos();
		}
	},
	searchVideos:  function () {
		var self = this;
		self.showVideoSearch();
		if (!self.videosCollectionSearch) {
			var VideosCollection = Backbone.Collection.extend({
				model: VideoModel
			});
			self.videosCollectionSearch = new VideosCollection();
			this.listenTo(this.videosCollectionSearch, 'change:selected', this.selectVideo);
		} else {
			self.videosCollectionSearch.reset();
			self.updateScrollbar($('.result-wrapper-scroll'));
		}
		var jqxhr = $.ajax({
			url: "/site/videosearch?textToSearch=" + encodeURIComponent(self.$('.post-search-field').val()),
			beforeSend: function () {
				$('.modal-video-search-result').append(self.getLoader());
			}
		})
		.done(function (data) {
			var data = JSON.parse(data);
			$('.modal-video-search-result .loader-big').remove();
			if (data.videos.length) {
				for (var i in data.videos) {
					var model_video = data.videos[i];
					model_video['published_at'] = moment(model_video['published_at']).fromNow();
					self.videosCollectionSearch.push(new VideoModel(model_video));
				}
				self.resultsRegionEmbeded.show(new VideosView({
					collection: self.videosCollectionSearch
				}));
				self.updateScrollbar($('.result-wrapper-scroll'));
			} else {
				$('.modal-video-search-result').text('No results');
			}
		});
	},
	initScrollbar: function (elem) {
		elem.perfectScrollbar();
	},
	updateScrollbar: function (elem) {
		elem.perfectScrollbar('update');
	},
	getLoader: function () {
		return '<div class="loader-big"></div>';
	}
});
module.exports = SocialSearchModal;
},{"../collections/PocketVideos.js":40,"../models/Video.js":58,"./ModalHandlebars.js":89,"./ModalVideoPocket.js":97,"./ModalVideoPocketView.js":98,"backbone.marionette":2,"jquery":10,"perfect-scrollbar/jquery":11}],130:[function(require,module,exports){
var VideoTooltip = require('../../js/danteVideoTooltip.js');
var VideoView = Backbone.Marionette.ItemView.extend({
	template: VideoEssenceApp.templates['video-template'],
	className: "video-container-wrapper",

	events: {
		//'click .fa-plus-circle': 'clickedButton',
		'click .to-add-video': 'clickedButton',
		'click .button-like': 'clickFollow',
		'click .popover-content': 'hideVideo',
		'click .thumbnail-wrapper .image-view': 'imageClickProceed',
		'click .thumbnail-wrapper .icon-play': 'imageClickProceed',
		'click .video-description .lockup-title a': 'showModal'
	},

	initialize: function () {
		// this.listenTo(this.model, 'change:saved', this.render);
		if (this.model.get('type') == 'youtube') {
			this.model.set({'embeded_url': 'https://www.youtube.com/embed/' + this.model.get('id') + '?autoplay=1'});
		} else {
			this.model.set({'embeded_url': 'https://player.vimeo.com/video/' + this.model.get('id') + '?autoplay=1'});
		}
	},
	imageClickProceed: function (evt) {
		var node = this.$el.find('.video-frame');
		var content = VideoEssenceApp.VideoExplore.embededHtml(this.model.get('type'), this.model.get('url'), this.model.id, 'mini-frame');

		if(this.model.get('bigView')) {
			VideoEssenceApp.VideoExplore.embededVideo(node, content, this.model.id, this.model);
		} else {
			this.showModal(evt);
		}
		evt.preventDefault();
	},

	showModal: function (e) {
        e.preventDefault();
        VideoEssenceApp.VideoExplore.showModal(e, this.model);
        //console.log('showModal', this.model);
	},
	hideVideo: function () {
		this.model.hide();
		this.destroy();
	},
	hideVideoButton: function () {
		this.model.set('showButtonVideoHide', !this.model.get('showButtonVideoHide'));
		this.render();
	},
	clickedButton: function (e) {
		var isSaved = this.model.get('saved');
		if (isSaved) {
			VideoEssenceApp.vent.trigger("pocket:videoRemove", this.model);
			$(e.currentTarget).removeClass('added');
		} else {
			VideoEssenceApp.vent.trigger("pocket:videoAdd",this.model);
			$(e.currentTarget).addClass('added');
		}
		this.model.set('saved', !isSaved, {silent: true});
	},
	clickFollow: function () {
		var isFollowed = this.model.get('followed');

		var channelOptions = {
			id: encodeURIComponent(this.model.get('channel_id')),
			title: this.model.get('channel_title'),
			type: this.model.get('type'),
			url: this.model.get('channel_url'),
			subtype: this.model.get('channel_subtype')
		};
        VideoEssenceApp.FollowPanel.followedChannelCollectionFull.channelProcess(isFollowed, channelOptions);

		VideoEssenceApp.VideoExplore.videosView.checkFollowedByChannel(isFollowed, this.model.get('channel_id'));
		if(!_.isUndefined(VideoEssenceApp.SearchPanel)){
			VideoEssenceApp.SearchPanel.fillChannels([]); //update list of search channels If channel was followed
		}

        VideoEssenceApp.FollowPanel.rerender();
	},
	onRender: function() {
		this.$el.find('.fa-ellipsis-v').popover({
			content:"Don’t show me this",
			html:true,
			placement:"bottom"
		});
	}
});
module.exports = VideoView;
},{"../../js/danteVideoTooltip.js":135}],131:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var Channel = require('../models/Channel.js');

var VideoView = require('./VideoView.js');
var VideosView = Marionette.CompositeView.extend({
    offset: 20,
    limit: 20,
    works: false,
    childView: VideoView,
    template: VideoEssenceApp.templates['videos-template'],
    childViewContainer: '.list',
    events: {
        'click .video-list-controls .do-big': 'toBigSizeList',
        'click .video-list-controls .do-small': 'toSmallSizeList',

        'mouseover  .channel .title .following': 'hoverFollowIn',
        'mouseout  .channel .title .following': 'hoverFollowOut',
        'click  .channel .title .following': 'clickedButton'

    },
    initViewModeFromLocalStorage: function() {
        var videosViewMode = (localStorage.getItem("videosViewMode") === 'true');
        if (!_.isNull(videosViewMode)) {
            this.model.set({
                bigView: videosViewMode
            });
        }
    },
    resetOffset: function() {
        this.collection.reset();
        this.offset = 0;
        this.model.set('gettingIsStop', false);
        this.render();
    },
    constructor: function(params, options) {
        Marionette.CompositeView.prototype.constructor.apply(this, arguments);

        var channelInfoJson = {
            gettingIsStop: false,
            bigView: false
        };

        if (options.channelInfo != undefined && options.channelInfo != 0) {
            //console.log("options.followChannels", options.followChannels, options.channelInfo.id);

            var followed = false;
            for (var iter in options.followChannels) {
                if (!options.followChannels.hasOwnProperty(iter)) continue;

                //console.log("constructor", options.followChannels[iter].id.trim(), encodeURIComponent(options.channelInfo.id).trim());

                if (options.followChannels[iter].id.trim() == encodeURIComponent(options.channelInfo.id).trim())
                    followed = true;
            }

            var channelTypeLink = "#channelType";
            if (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "youtube") {
                channelTypeLink = "http://www.youtube.com/channel/" + options.channelInfo.id;
            }
            if (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "vimeo") {
                channelTypeLink = "https://vimeo.com/channels/" + options.channelInfo.id;
            }

            channelInfoJson = {
                followed: followed,
                channelTypeLink: channelTypeLink,

                id: options.channelInfo.id,
                title: options.channelInfo.snippet.title,
                type: options.channelInfo.type.toLowerCase(),
                subtype: (options.channelInfo.type.toLowerCase() != "search") ? "channel" : "search",

                smallBanner: options.channelInfo.banners['690'],
                normalBanner: options.channelInfo.banners['1138'],
                bigBanner: options.channelInfo.banners['2278'],

                channelInfo: options.channelInfo
            };
        }

        channelInfoJson.gettingIsStop = false;
        channelInfoJson.bigView = false;

        this.model = new Channel(channelInfoJson);
        this.initViewModeFromLocalStorage();

        //this.model.set("categoryName", '<i class="fa fa-long-arrow-left"></i>&nbsp;&nbsp;' + options.categoryName);
        this.model.set("categoryName", '<span class="arrow-back"></span>' + options.categoryName);
        if (options.categoryName != "Categories")
            this.model.set("categoryLink", '/site/category?name=' + encodeURIComponent(options.categoryName));
        else
            this.model.set("categoryLink", '/site/explore');

        this.model.set("isSearch", options.isSearch);
        if (options.channelInfo == undefined ||
            (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "search") ||
            channelInfoJson.normalBanner == null ||
            channelInfoJson.bigBanner == null
        ) {
            this.model.set("noBanner", true);
        }
        this.model.set("showLink", true);
        if (options.channelInfo == undefined ||
            (options.channelInfo.type != undefined && options.channelInfo.type.toLowerCase() == "search")) {
            this.model.set("showLink", false);
        }

        this.model.set('retina', window.devicePixelRatio > 1);
    },
    onBeforeRender: function() {
        this.collection.invoke('set', {
            bigView: this.model.get('bigView')
        });
    },
    onRender: function() {
        var self = this;
        $(window).scroll(function() {
            self.loadItems();
        });
    },
    loadItems: function() {
        //console.log("scrollTop height works", $(window).scrollTop() >= this.$el.height() - $(window).height() - 200, this.works)

        if ($(window).scrollTop() >= this.$el.height() - $(window).height() - 200 && !this.works) {
            this.getItems();
        }
    },
    getItems: function(without_adding_results) {
        //console.log("getItems");
        var self = this;
        without_adding_results = without_adding_results || false;
        //console.log("getItems this.offset", this.offset);

        if (without_adding_results) {
            this.collection.fetch({
                remove: false,
                add: false, //TODO здесь возникают ошибки id
                merge: false,
                data: {
                    "offset": this.offset,
                    "limit": this.limit
                }
                //success: function(resp){
                //    //console.log('resp', resp);
                //}
            });
        } else {
            this.works = true;
            console.log("getItems this", this, this.works);
            var length = this.collection.length;

            this.collection.fetch({
                remove: false,
                add: true,
                merge: false,
                data: {
                    offset: this.offset,
                    limit: this.limit,
                    youtubeNextPageToken:  this.youtubeNextPageToken
                },
                success: _.bind(function(model, response, length, options) {
                    //console.log(response);
                    //console.log('response youtubeNextPageToken this',  this.youtubeNextPageToken, 'response',
                    //    response.youtubeNextPageToken, 'global',
                    //    VideoEssenceApp.VideoExplore.videosCollection.youtubeNextPageToken);

                    this.works = false;
                    this.youtubeNextPageToken = response.youtubeNextPageToken;
                    if (response.videos.length > 0)
                        this.offset += 20;
                    VideoEssenceApp.VideoExplore.videosCollection.youtubeNextPageToken = response.youtubeNextPageToken;
                    if (response.channelInfo) {
                        self.prepareVideosChannel(model, response, length, options);
                            //this.youtubeNextPageToken = response.youtubeNextPageToken;
                            //this.works = false;
                            //console.log("getItems this", this, this.works, response);
                    } else {
                        self.prepareVideosSearch(model, response, length, options);
                    }
                    //console.log('youtubeNextPageToken', this.youtubeNextPageToken, VideoEssenceApp.VideoExplore.videosCollection.youtubeNextPageToken);

                }, this),
                error: _.bind(function() {
                    this.stopGetting();
                }, this)
            });
        }
    },

    prepareVideosChannel: function(model, response, length, options) {
        var channelInfo = response.channelInfo;

        var channelTypeLink = "#channelType";
        if (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "youtube") {
            channelTypeLink = "http://www.youtube.com/channel/" + channelInfo.id;
        }
        if (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "vimeo") {
            channelTypeLink = "https://vimeo.com/channels/" + channelInfo.id;
        }

        var channelInfoJson = {
            gettingIsStop: false,
            bigView: true,

            followed: true,
            channelTypeLink: channelTypeLink,

            id: channelInfo.id,
            title: channelInfo.snippet.title,
            type: channelInfo.type.toLowerCase(),
            subtype: (channelInfo.type.toLowerCase() != "search") ? "channel" : "search",

            smallBanner: channelInfo.banners['690'],
            normalBanner: channelInfo.banners['1138'],
            bigBanner: channelInfo.banners['2278'],

            channelInfo: channelInfo
        };

        this.model = new Channel(channelInfoJson);

        this.model.set("categoryName", '<span class="arrow-back"></span>' + "Categories");
        this.model.set("categoryLink", '/site/explore');

        if (channelInfo == undefined ||
            (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "search") ||
            channelInfoJson.normalBanner == null ||
            channelInfoJson.bigBanner == null
        ) {
            this.model.set("noBanner", true);
        }
        this.model.set("showLink", true);
        if (channelInfo == undefined ||
            (channelInfo.type != undefined && channelInfo.type.toLowerCase() == "search")) {
            this.model.set("showLink", false);
        }

        this.model.set('retina', window.devicePixelRatio > 1);
        this.initViewModeFromLocalStorage();

        this.render();

        if (this.collection.length > length) {
            this.works = false;
            this.offset += this.limit;
            this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
            this.loadItems();
            this.getItems(true);
        } else {
            this.stopGetting();
        }
    },

    prepareVideosSearch: function(model, response, length, options) {
        var responseVideos = response.videos;

        if (!responseVideos || !responseVideos.length)
            return true;

        for (var i = 0; i < responseVideos.length; i++) {
            var channelTypeLink = "http://www.youtube.com/channel/" + responseVideos[i].channel_id;

            var channelInfoJson = {
                gettingIsStop: false,
                bigView: true,

                followed: true,
                channelTypeLink: channelTypeLink,

                id: responseVideos[i].id,
                title: responseVideos[i].channel_title,
                type: responseVideos[i].type.toLowerCase(),
                subtype: "search",

                smallBanner: null,
                normalBanner: null,
                bigBanner: null,

                channelInfo: null
            };

            this.model = new Channel(channelInfoJson);

            this.model.set("categoryName", '<span class="arrow-back"></span>' + "Categories");
            this.model.set("categoryLink", '/site/explore');
            this.model.set("noBanner", true);
            this.model.set("showLink", false);

            this.model.set('retina', window.devicePixelRatio > 1);
            this.initViewModeFromLocalStorage();

            this.render();

        };

        if (this.collection.length > length) {
            this.works = false;
            this.offset += this.limit;
            this.collection.youtubeNextPageToken = response.youtubeNextPageToken;
            this.loadItems();
            this.getItems(true);
        } else {
            this.stopGetting();
        }
    },

    stopGetting: function() {
        this.model.set('gettingIsStop', true);
        this.render();
    },
    checkFollowedByChannel: function(isFollowed, channel_id) {
        var followedVideo = this.collection.where({
            channel_id: channel_id
        });
        for (var i = 0; followedVideo.length > i; i++) {
            followedVideo[i].set('followed', !isFollowed);
        }

        this.render();
    },
    toBigSizeList: function() {
        this.setSizeList(true);
    },
    toSmallSizeList: function() {
        this.setSizeList(false);
    },
    setSizeList: function(result) {
        this.model.set({
            bigView: result
        });
        localStorage.setItem('videosViewMode', result);
        this.render();
    },
    hoverFollowIn: function(e) {
        //console.log("in", this.model.attributes);
        var self = $(e.target);
        if (self.hasClass("followed")) {
            self.text("Unfollow");
        } else {
            self.text("Follow");
        }
    },
    hoverFollowOut: function(e) {
        //console.log("out", e.target);
        var self = $(e.target);
        if (self.hasClass("followed")) {
            self.text("Following");
        } else {
            self.text("Follow");
        }
    },
    clickedButton: function() {
        var isSaved = this.model.get('followed');

        this.model.set('followed', !isSaved);

        this.render();
    }
});
module.exports = VideosView;
},{"../models/Channel.js":48,"./VideoView.js":130,"backbone.marionette":2}],132:[function(require,module,exports){
var GooglePTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-google-plus";
		this.title = opts.title || "Add google post";
		this.action = opts.action || "menu-google";
		return this.current_editor = opts.current_editor;
	},

	handleClick: function (ev) {
		return this.imageSelect(ev);
	},

	imageSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		$(this.node).html(ph).addClass("is-ve-image");
		this.current_editor.setRangeAt(this.node);

		var GoogleSearchModal = require('../app/views/GoogleSearchModal.js');
		var socialSearchModal = new GoogleSearchModal({
			model: new Backbone.Model({
				placeholder: 'Enter a keyword or Google+ post link',
				embedded_title: 'Embedded Google+ Posts',
				embedded_name: 'Google+',
				count_embedded_posts: 0,
				count_select: 0
			})
		});
		$('.app').html(socialSearchModal.render().el);
		this.hide();
	},


	insertHtml: function (src) {
		$(this.node).html(src);
        var lastGraf = $("#editor").find(".section-inner .graf").last();
        
        if(lastGraf.text() != ''){
        	$("#editor").find(".section-inner .graf--last").removeClass('graf--last');

            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');
        }
	}
});
module.exports = GooglePTooltip;
},{"../app/views/GoogleSearchModal.js":81}],133:[function(require,module,exports){
var ImageTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-image";
		this.title = opts.title || "Add an image";
		this.action = opts.action || "menu-image";
		return this.current_editor = opts.current_editor;
	},

	handleClick: function (ev) {
		return this.imageSelect(ev);
	},

	imageSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		$(this.node).html(ph).addClass("is-ve-image");
		this.current_editor.setRangeAt(this.node);
		VideoEssenceApp.MediaManager.show();
		this.hide();
	},

	insertImage: function (src) {
		var self = this;

		$(this.node).html('<img src="' + src + '">');
        var lastGraf = $("#editor").find(".section-inner").find(".graf--last");
        //console.log(lastGraf, lastGraf.html(), lastGraf.length);
        if(lastGraf.length > 0){
            lastGraf.removeClass("graf--last");
            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');
        }
        else {
            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');
        }

        $('#editor').trigger('imageAdd', $(self.node).children('img'));
	}
});
module.exports = ImageTooltip;
},{}],134:[function(require,module,exports){
TwitterTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-twitter";
		this.title = opts.title || "Add a twitter posts";
		this.action = opts.action || "menu-twitter";
		return this.current_editor = opts.current_editor;
	},

	handleClick: function (ev) {
		return this.twitterSelect(ev);
	},

	twitterSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		//$(this.node).html(ph).addClass("twitter-block");
		this.current_editor.setRangeAt(this.node);
		var TwitterSearchModal = require('../app/views/TwitterSearchModal.js');
		var socialSearchModal = new TwitterSearchModal({
			model: new Backbone.Model({
				placeholder: 'Enter a keyword or Twitter post link',
				embedded_title: 'Embedded Twitter Posts',
				embedded_name: 'Tweets',
				count_embedded_posts: 0,
				count_select: 0
			})
		});
		$('.app').html(socialSearchModal.render().el);
		this.hide();
	},

	insertHtml: function (src) {
		$(this.node).html(src);
        var lastGraf = $("#editor").find(".section-inner .graf").last();
        
        if(lastGraf.text() != ''){
        	$("#editor").find(".section-inner .graf--last").removeClass('graf--last');

            $("#editor")
                .find(".section-inner")
                .append('<p class="graf graf--p graf--empty graf--last is-selected" name="' + window.Dante.utils.generateUniqueName() + '"><br/></p>');
        }
	}
});
module.exports = TwitterTooltip;
},{"../app/views/TwitterSearchModal.js":121}],135:[function(require,module,exports){
var VideoTooltip = Dante.View.TooltipWidget.extend({
	initialize: function (opts) {
		if (opts == null) {
			opts = {};
		}
		this.icon = opts.icon || "icon-video";
		this.title = opts.title || "Add a video";
		this.action = opts.action || "custom-embed-simple";
        this.afterPaste = opts.afterPaste || undefined;
		return this.current_editor = opts.current_editor;
	},
	handleClick: function (ev) {
		return this.VideoSelect(ev);
	},
	VideoSelect: function (ev) {
		var ph;
		ph = '<br>';
		this.node = this.current_editor.getNode();
		this.current_editor.setRangeAt(this.node);
		var VideoSearchModal = require('../app/views/VideoSearchModal.js');
		var searchModal = new VideoSearchModal({
			model: new Backbone.Model({
				video_count: JSON.parse(localStorage.getItem("pocketVideosCollection")).length
			})
		});
		$('.app').html(searchModal.render().el);
		this.hide();
	},
	handleEnterKey: function (ev, $node) {
		if ($node.hasClass("is-ve-video")) {
			return this.getEmbedFromNode($node);
		}
	},
	getVimeoId: function (url) {
		var regExp = /http(s)*:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

		var match = url.match(regExp);

		return match ? match[3] : false;
	},
	getEmbedFromNode: function (node) {
		var $node = $(node);
		var url =$node.text();
		this.embedVideoFromUrl(url, $node)
	},
	embedVideoFromUrl: function (url, node) {
		this.node = node;
		this.node_name = this.node.attr("name");
		this.node.addClass("spinner");

		var _this = this;
        $.get('/post/video-info', {video_url: url}, function(data){
            _this.node.addClass("done");
            _this.node.removeClass("spinner");
            _this.pasteVideo(data, _this.node);
        });
	},
    pasteVideo: function (video, node) {

        if (!node) {
            node = this.current_editor.$el.find('.graf--p').first();
            $(node).attr("data-video-id", video.id).attr("data-video-type", video.type)
            console.log(node);
        }
        //$(node).remove();

        console.log('pasteVideo dante', video, video.width, video.height);

        var nodeId = window.Dante.utils.generateUniqueName();
        var cls = video.class ? video.class : '';
        var html = this.embededHtml(video.type, video.embeded_url, nodeId, cls, video.width, video.height);
        if (!html) return;
        var player = this.embededVideo(node, html, nodeId, video);
        if (_.isFunction(this.afterPaste)) {
            this.afterPaste(video, nodeId, player);
        }
    },
    embededHtml: function(type, url, node_name, cls, videoWidth, videoHeight) {
    	var width = 640,
    		height = 360;
    	if (cls == 'mini-frame') {
    		width = 420;
    		height = 240;
    	}
        switch(type) {
            case 'vimeo':
                return "<video contenteditable='false' frameborder='0' id='" + node_name + "' data-width='" + videoWidth + "' " +
                    "data-height='" + videoHeight + "' class='video-js video-js-vimeo-dante video-js-vimeo vjs-default-skin " +
                    cls + "' webkitallowfullscreen mozallowfullscreen allowfullscreen controls autoplay preload='auto'" +
                    " width='" + width + "' height='" + height + "' ></video>";
            case 'youtube':
                return "<video contenteditable='false' id='" + node_name + "' src='' class='video-js vjs-default-skin " + cls + "' controls autoplay preload='auto' width='" + width + "' height='" + height + "' data-setup='{ \"techOrder\": [\"youtube\"], \"src\": \"" + url + "\"}'></video>";
        }
        return null;
    },
    embededVideo: function (node, html, node_name, videoModel) {
	    var video;
	    node.addClass("is-ve-video").addClass("done");
        node.html(html);

        //console.log("embededVideo", node, html, node_name, videoModel);
        //console.log('videoModel', videoModel);
        //console.log('node_name', node_name);

	    if(videoModel.type == 'vimeo') {
            video = videojs(node_name, {
                //techOrder: ["html5", "youtube", "flash"],
                techOrder: ["vimeo"],
                //example_option: true,
                autoplay: false,
                controls: true,
                preload: "auto",
                src: videoModel.url,
                poster: videoModel.poster,
                callFrom: 'danteVideoTooltip'
            }).ready(function(){
                //console.log('this', this);

                //console.log('options.callFrom', player, options, ready,
                //    $(this.player_el_).hasClass('.video-js-vimeo-dante'),
                //    $player.find('.video-js-vimeo-dante').length,
                //    $(player.el_).hasClass('.video-js-vimeo-dante'),
                //    $(player.el_).find('.video-js-vimeo-dante').length
                //);

                //var self = $(this);
                //console.log('vimeo ready', this, video, self.hasClass('video-js-vimeo-dante'));

                //var videoJsVimeo = $('.video-js-vimeo');

                video.load();

                video.on('fullscreenchange', function(e){
                    var self = $(e.target);
                    console.log('fullscreenchange', e, window.innerHeight, self.height(), self.width(), self.parent().height(),
                        self.data('width'),
                        self.data('height')
                    );
                    //width: 100%;
                    //height: 120%;
                    //margin:-10% auto 0;

                    var normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo('height', self.parent().height(),
                        self.data('width'),
                        self.data('height')
                    );

                    if (window.innerHeight == self.height()) {
                        console.log('left 0:', (self.parent().width() - normalizeWidth) / 2 );
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo('height', window.innerHeight);

                        $('.vjs-fullscreen .vjs-tech-vimeo')
                            .css('height', window.innerHeight + 400 + 'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', (window.innerWidth - normalizeWidth) / 2 )
                        ;

                    }else{
                        normalizeWidth = VideoEssenceApp.VideoExplore.normalizeSizeVideo('height', self.parent().height(),
                            self.data('width'),
                            self.data('height')
                        );
                        console.log('left 0:', (self.parent().width() - normalizeWidth) / 2 );
                        $('.vjs-tech-vimeo')
                            .css('height', self.parent().height() + 400 +'px')
                            .css('margin', '-200px auto 0')
                            .css('width', normalizeWidth + 'px')
                            .css('left', (self.parent().width() - normalizeWidth - 60) / 2 )
                        ;
                    }

                });
                //console.log('iframe', $('.video-frame-popup .vjs-default-skin iframe').contents().find("#player .controls"));
            });

        //console.log($('.video-frame-popup .vjs-default-skin iframe').contents().find("#player .controls"));
	    } else {
		    video = videojs(node_name, {controls: true, usingNativeControls: false}).on("ended", function () {
                this.play();
            });
	    }

	    return video;
    }
});
module.exports = VideoTooltip;

},{"../app/views/VideoSearchModal.js":129}],136:[function(require,module,exports){
(function($) {
  $.fn.DragManager = function(options) {
    var settings = $.extend( {
      'drag'   : 'draggable', // drag elements classes
      'drop'   : '.graf', // drop zones classes
      'zIndex' : 9999
    }, options);

    document.onmousedown = onMouseDown;
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;

    var Manager = {};
    Manager.container = this;
    Manager.drag = {};
    Manager.drop = {};

    function onMouseDown(e) {

      if (e.which != 1 || $(e.target).hasClass('ui-resizable-handle')) return;

      var elem;
      if (Object.prototype.toString.call(options.drag) === '[object Array]') {
        for (var i = 0; i < options.drag.length; i++) {
          if (elem = e.target.closest('.' + options.drag[i])) break;
        };
      } else {
        elem = e.target.closest('.' + options.drag);
      }
      if (!elem) return;

      Manager.drag.elem = elem;

      Manager.drag.downX = e.pageX;
      Manager.drag.downY = e.pageY;

      return false;
    }

    function onMouseMove(e) {
      if (!Manager.drag.elem) return;

      if (!Manager.drag.avatar) {
        var moveX = e.pageX - Manager.drag.downX;
        var moveY = e.pageY - Manager.drag.downY;

        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        }

        // начинаем перенос
        createAvatar(e); // создать аватар
        if (!Manager.drag.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
          Manager.drag = {};
          return;
        }

        // аватар создан успешно
        // создать вспомогательные свойства shiftX/shiftY
        var coords = getCoords(Manager.drag.elem);
        Manager.drag.shiftX = Manager.drag.downX - coords.left;
        Manager.drag.shiftY = Manager.drag.downY - coords.top;

        startDrag(e); // отобразить начало переноса
      }

      // отобразить перенос объекта при каждом движении мыши
      Manager.drag.avatar.style.left = e.pageX - Manager.drag.shiftX + 'px';
      Manager.drag.avatar.style.top = e.pageY - Manager.drag.shiftY + 'px';

      return false;
    }

    function onMouseUp(e) {
      if (Manager.drag.avatar) {
        finishDrag(e);
      }

      Manager.drag = {};
    }

    function finishDrag(e) {
      Manager.drop = findDroppable(e);

      if (!Manager.drop) {
        DragCancel();
      } else {
        DragEnd(e);
      }
    }

    function DragCancel() {
      $(Manager.drag.avatar).remove();
    }

    function DragEnd(event) {
      var insert = 'after',
          drop;

      if (Math.abs(event.pageY - getCoords(Manager.drop).top) < ($(Manager.drop).height()/2))
        insert = 'before';

      $(Manager.drag.avatar).remove();

      var previousNode = Manager.container.find('p[name="' + Manager.drag.elem.parentNode.getAttribute('name') + '"]');

      if (($(Manager.drag.elem).hasClass('sp') && $(Manager.drop).find('.sp').length == 0) || 
          !$(Manager.drag.elem).hasClass('sp')) {

        drop = document.createElement('p');
        drop.className = 'graf graf--p';
        drop.setAttribute('name', window.Dante.utils.generateUniqueName());
        if (insert == 'after')
          $(Manager.drop).after(drop);
        else
          $(Manager.drop).before(drop);

        Manager.drop = drop;
      } else {
        if (Math.abs(event.pageX - getCoords(Manager.drop).left) < ($(Manager.drop).width()/2))
          insert = 'before';
        else
          insert = 'after';
      }

      if (insert == 'after')
        $(Manager.drop).append(Manager.drag.elem);
      else
        $(Manager.drop).prepend(Manager.drag.elem);

      if (previousNode.children().length == 0)
        $(previousNode).remove();
    }

    function createAvatar(e) {
      Manager.drag.avatar = document.createElement('div');
      Manager.drag.avatar.className = 'droppable-element-avatar';

      Manager.drag.avatar.rollback = function() {

      };
    }

    function startDrag(e) {
      document.body.appendChild(Manager.drag.avatar);

      Manager.drag.avatar.style.zIndex = options.zIndex;
      Manager.drag.avatar.style.position = 'absolute';
      Manager.drag.avatar.style.height = $(Manager.drag.elem).height() + 'px';
      Manager.drag.avatar.style.width = $(Manager.drag.elem).width() + 'px';
    }

    function findDroppable(event) {
      $(Manager.drag.avatar).hide();

      // получить самый вложенный элемент под курсором мыши
      var elem = document.elementFromPoint(event.clientX, event.clientY);

      $(Manager.drag.avatar).show();

      if (elem == null) {
        // такое возможно, если курсор мыши "вылетел" за границу окна
        return null;
      }

      return elem.closest('.graf');
    }


    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    }

    return this;
  };
})(jQuery);
},{}],137:[function(require,module,exports){
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;
},{"backbone":7,"jquery":10}]},{},[137,47])