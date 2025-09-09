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

      self.composite = context.element;
      self.messageText = ko.observable('Hello from app-carousel');
      self.properties = context.properties;
      self.res = componentStrings['app-carousel'];

      // Carousel logic variables
      self.carousel = null;

      self.disconnected = function() {

      };
    }

    ExampleComponentModel.prototype.connected = function() {
      var self = this;

      // Espera a que el DOM del composite esté listo
      setTimeout(function() {
        // Busca los elementos dentro del composite
        var root = self.composite;
        var track = root.querySelector('#carouselTrack');
        var prevBtn = root.querySelector('#prevBtn');
        var nextBtn = root.querySelector('#nextBtn');

        if (!track || !prevBtn || !nextBtn) return;

        // Carousel logic adaptada a OJET
        function InfiniteCarousel() {
          this.track = track;
          this.prevBtn = prevBtn;
          this.nextBtn = nextBtn;

          this.originalSlides = Array.from(this.track.children);
          this.slideWidth = 33;
          this.slideMargin = 2;
          this.currentIndex = 0;
          this.totalSlides = this.originalSlides.length;
          this.isTransitioning = false;

          this.init();
        }

        InfiniteCarousel.prototype.init = function() {
          this.cloneSlides();
          this.attachEvents();
          this.updateCarousel(false);
        };

        InfiniteCarousel.prototype.cloneSlides = function() {
          this.originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            this.track.appendChild(clone);
          });
          [...this.originalSlides].reverse().forEach(slide => {
            const clone = slide.cloneNode(true);
            this.track.insertBefore(clone, this.track.firstChild);
          });
          this.currentIndex = this.totalSlides;
        };



        InfiniteCarousel.prototype.attachEvents = function() {
          this.nextBtn.addEventListener('click', () => this.nextSlide());
          this.prevBtn.addEventListener('click', () => this.prevSlide());

          // Touch/swipe support
          let startX = 0;
          let startY = 0;
          let threshold = 50;

          this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
          });

          this.track.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            let endX = e.changedTouches[0].clientX;
            let endY = e.changedTouches[0].clientY;
            let deltaX = startX - endX;
            let deltaY = startY - endY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
              if (deltaX > 0) {
                this.nextSlide();
              } else {
                this.prevSlide();
              }
            }
            startX = 0;
            startY = 0;
          });
        };

        InfiniteCarousel.prototype.updateCarousel = function(animate = true) {
          const translateX = -this.currentIndex * (this.slideWidth + this.slideMargin);
          if (animate) {
            this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          } else {
            this.track.style.transition = 'none';
          }
          this.track.style.transform = `translateX(${translateX}%)`;
          if (animate) {
            this.isTransitioning = true;
            setTimeout(() => {
              this.isTransitioning = false;
              this.checkInfiniteLoop();
            }, 500);
          }
        };

        InfiniteCarousel.prototype.checkInfiniteLoop = function() {
          this.track.style.transition = 'none';
          if (this.currentIndex >= this.totalSlides * 2) {
            this.currentIndex = this.totalSlides;
            this.updateCarousel(false);
          } else if (this.currentIndex < this.totalSlides) {
            this.currentIndex = this.totalSlides * 2 - 1;
            this.updateCarousel(false);
          }
        };

        InfiniteCarousel.prototype.nextSlide = function() {
          if (this.isTransitioning) return;
          this.currentIndex++;
          this.updateCarousel();
        };

        InfiniteCarousel.prototype.prevSlide = function() {
          if (this.isTransitioning) return;
          this.currentIndex--;
          this.updateCarousel();
        };

        InfiniteCarousel.prototype.goToSlide = function(index) {
          if (this.isTransitioning) return;
          this.currentIndex = index + this.totalSlides;
          this.updateCarousel();
        };

        // Inicializa el carrusel y guarda la instancia para limpiar después
        self.carousel = new InfiniteCarousel();

        // Marca el componente como listo
        if (self.busyResolve) self.busyResolve();
      }, 0);
    };

    return ExampleComponentModel;
});
