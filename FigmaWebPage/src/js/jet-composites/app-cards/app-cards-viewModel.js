/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/app-cards-strings', 'ojs/ojcontext', 'ojs/ojknockout','jet-composites/demo-card/loader'], function (ko, componentStrings, Context) {
    
    function ExampleComponentModel(context) {
        var self = this;
        
      this.employees = ko.observableArray([
      {
        name: 'More is more tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S01_GEORGE_143_opt3_FINAL_600x.jpg?v=1746729668',
        title: 'https://store.figma.com/cdn/shop/files/13_5d990355-0309-41fa-9322-0651d06a1ec7_600x.png?v=1747336696',
        work: 35,
        email: ''
      },
      {
        name: 'Rectamgles shorts',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S13_GUSTAVO_086_FINAL_600x.jpg?v=1746729532',
        title: 'https://store.figma.com/cdn/shop/files/15_631cf6f8-2602-49f4-b70f-12090284eb54_600x.png?v=1747336696',
        work: 40,
        email: ''
      },
      {
        name: 'Best buds socks',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S02_GEORGE_030_FINAL_600x.jpg?v=1746729759',
        title: 'https://store.figma.com/cdn/shop/files/19_600x.png?v=1747336696',
        work: 15,
        email: ''
      },
      {
        name: 'Flippy hat',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S10_DMITRI_051_ScreenOpt_FINAL_600x.jpg?v=1746729800',
        title: 'https://store.figma.com/cdn/shop/files/2_ad8fa237-cab1-4a3f-a4b5-1322e767202f_600x.png?v=1747336696',
        work: 22,
        email: ''
      },
      {
        name: 'Unlimited tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S15_KIM_181_FINAL_600x.jpg?v=1746729587',
        title: 'https://store.figma.com/cdn/shop/files/SZN_4_Hover_Images_1_600x.png?v=1747337134',
        work: 35,
        email: ''
      },
      {
        name: 'Flippy bottle',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S14_NALGENE_001_FINAL_600x.jpg?v=1746729862',
        title: 'https://store.figma.com/cdn/shop/files/5_e761b498-c289-4203-959b-5d7e6d3dc080_600x.png?v=1747336696',
        work: 35,
        email: ''
      }
      ,
      {
        name: 'Here, there, everywhere tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S08_RALANDA_049_FINAL_1200x.jpg?v=1746729620',
        title: 'https://store.figma.com/cdn/shop/files/SZN_4_Hover_Images_2_1200x.png?v=1747337338',
        work: 35,
        email: ''
      }
      ,
      {
        name: 'Unlimited tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S03_GALAXIA_050_FINAL_1200x.jpg?v=1746729744',
        title: 'https://store.figma.com/cdn/shop/files/SZN_4_Hover_Images_3_1200x.png?v=1747337419',
        work: 35,
        email: ''
      }
      ,
      {
        name: 'Unlimited tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S12_GUSTAVO_010_FINAL_600x.jpg?v=1747267281',
        title: 'https://store.figma.com/cdn/shop/files/SZN_4_Hover_Images_600x.png?v=1747337083',
        work: 35,
        email: ''
      }
      ,
      {
        name: 'Unlimited tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S14_NAVYA_154_FINAL_600x.jpg?v=1746729545',
        title: 'https://store.figma.com/cdn/shop/files/SZN_4_Hover_Images_600x.png?v=1747337083',
        work: 35,
        email: ''
      }
      ,
      {
        name: 'Unlimited tee',
        avatar: '	https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S04_GALAXIA_077_FINAL_600x.jpg?v=1746729777',
        title: 'https://store.figma.com/cdn/shop/files/16_6c351201-9a2c-4456-8fa7-98147f9b9589_600x.png?v=1747336696',
        work: 35,
        email: ''
      }
      ,
      {
        name: 'Unlimited tee',
        avatar: 'https://store.figma.com/cdn/shop/files/250422_FIGMA_SZN4_S16_OTTO_106_FINAL_600x.jpg?v=1746729485',
        title: '	https://store.figma.com/cdn/shop/files/17_339240af-2792-4b11-a966-b006a9e1d6a9_600x.png?v=1747336696',
        work: 35,
        email: ''
      }

      ]);

        //At the start of your viewModel constructor
        var busyContext = Context.getContext(context.element).getBusyContext();
        var options = {"description": "Web Component Startup - Waiting for data"};
        self.busyResolve = busyContext.addBusyState(options);

        self.composite = context.element;

        //Example observable
        self.messageText = ko.observable('Hello from app-cards');
        self.properties = context.properties;
        self.res = componentStrings['app-cards'];
        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        self.busyResolve();
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
