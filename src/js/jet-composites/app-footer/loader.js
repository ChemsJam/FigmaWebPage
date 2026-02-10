/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./app-footer-view.html', './app-footer-viewModel', 'text!./component.json', 'css!./app-footer-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('app-footer', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);