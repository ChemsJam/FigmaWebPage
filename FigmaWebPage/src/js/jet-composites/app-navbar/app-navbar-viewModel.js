/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/app-navbar-strings', 'ojs/ojcontext', 'ojs/ojknockout'], function (ko, componentStrings, Context) {
    
    function ExampleComponentModel(context) {
        var self = this;
        
        const navbar = document.querySelector('.navbar');
        var lastScrollPos = 0;

        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from app-navbar');
        self.properties = context.properties;
        self.res = componentStrings['app-navbar'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        self.lastScrollPos = 0;
        self.handleScroll = function() {
            var navbar = document.querySelector('.navbar');
            if (!navbar) return;
            var scrollTop = window.pageYOffset;

            if (scrollTop === 0) {
              navbar.style.backgroundColor = "#24cb71"; // Color original
            } else {
              navbar.style.backgroundColor = "#fff"; // Blanco
            }

            if (scrollTop > self.lastScrollPos) {
              // Bajando → ocultar
              navbar.style.transition = 'all .4s ease';
              navbar.style.transform = 'translateY(-100%)';
            } else if (scrollTop < self.lastScrollPos) {
              // Subiendo → mostrar
              navbar.style.transition = 'all .6s ease';
              navbar.style.transform = 'translateY(0)';
            }

            self.lastScrollPos = scrollTop;
        };


        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
    };
    

    ExampleComponentModel.prototype.connected = function() {
        window.addEventListener('scroll', this.handleScroll);
    };
    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.connected = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.disconnected = function(context){
    //};

    //ExampleComponentModel.prototype.propertyChanged = function(context){
    //};

    return ExampleComponentModel;
});
