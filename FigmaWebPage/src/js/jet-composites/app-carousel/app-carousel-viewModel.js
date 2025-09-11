/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
  ['knockout', 'ojL10n!./resources/nls/app-carousel-strings', 'ojs/ojcontext', 'ojs/ojknockout'], 
  function (ko, componentStrings, Context) {

    function ExampleComponentModel(context) {
      var self = this;

      var busyContext = Context.getContext(context.element).getBusyContext();
      var options = {"description": "Web Component Startup - Waiting for data"};
      self.busyResolve = busyContext.addBusyState(options);
      /*
      self.composite = context.element;
      self.messageText = ko.observable('Hello from app-carousel');
      self.properties = context.properties;
      self.res = componentStrings['app-carousel'];

      self.carousel = null;
*/
      self.disconnected = function() {

      };
    }

    ExampleComponentModel.prototype.connected = function() {
      var self = this;

      setTimeout(function() {
        var root = self.composite;
        

        if (self.busyResolve) self.busyResolve();
      }, 0);
    };

    return ExampleComponentModel;
});
