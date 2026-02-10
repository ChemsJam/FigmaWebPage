/**
  Copyright (c) 2015, 2025, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
'use strict';
define(
  ['knockout', 'ojs/ojcontext', 'ojs/ojknockout'],
  function (ko, Context) {

    function ExampleComponentModel(context) {
      const self = this;
      self.composite = context.element;
      self.carousel = null;

      self.connected = function () {
        // Esperar a que el DOM esté completamente renderizado
        setTimeout(() => {
          const track = self.composite.querySelector('#carouselTrack');
          console.log('Track encontrado:', track); // DEBUG
          
          if (track) {
            self.carousel = new InfiniteCarousel(track);
            console.log('Carousel inicializado'); // DEBUG
          } else {
            console.error('No se encontró #carouselTrack');
          }
        }, 100);
      };

      self.disconnected = function () {
        if (self.carousel) {
          self.carousel.destroy();
          self.carousel = null;
        }
      };
    }

    /* ================= CAROUSEL ================= */

    function InfiniteCarousel(track) {
      const self = this;
      
      self.track = track;
      self.slides = Array.from(track.children);
      self.slideCount = self.slides.length;
      self.currentIndex = self.slideCount;
      self.isAnimating = false;
      self.isDragging = false;
      self.startX = 0;
      self.currentTranslate = 0;
      self.prevTranslate = 0;

      console.log('Slides encontrados:', self.slideCount); // DEBUG

      self.init();
    }

    InfiniteCarousel.prototype.init = function () {
      const self = this;
      
      self.cloneSlides();

      const initialX = -self.slideCount * self.slideWidth();
      self.currentTranslate = initialX;
      self.prevTranslate = initialX;
      self.track.style.transform = `translateX(${initialX}px)`;

      self.attachEvents();
      
      console.log('Carousel init completado, slideWidth:', self.slideWidth()); // DEBUG
    };

    InfiniteCarousel.prototype.cloneSlides = function () {
  const self = this;
  
  // Para el final: slides en orden normal
  const clonesAfter = self.slides.map(s => s.cloneNode(true));
  
  // Para el inicio: slides en orden INVERSO
  const clonesBefore = [...self.slides].reverse().map(s => s.cloneNode(true));

  // Agregar al final
  clonesAfter.forEach(s => self.track.appendChild(s));
  
  // Agregar al inicio
  clonesBefore.forEach(s => self.track.insertBefore(s, self.track.firstChild));

  self.allSlides = Array.from(self.track.children);
  
  console.log('Orden final de slides:', self.allSlides.length); // DEBUG
};

    InfiniteCarousel.prototype.slideWidth = function () {
      const self = this;
      return self.allSlides[0].offsetWidth || 650;
    };

    InfiniteCarousel.prototype.update = function (animate = true) {
      const self = this;
      const x = -self.currentIndex * self.slideWidth();

      self.track.style.transition = animate ? 'transform 0.4s ease' : 'none';
      self.track.style.transform = `translateX(${x}px)`;

      self.currentTranslate = x;
      self.prevTranslate = x;

      if (animate) {
        self.isAnimating = true;
        setTimeout(() => {
          self.isAnimating = false;
          self.checkInfiniteLoop(); // Usar el nuevo método
        }, 400);
      }
    };

    InfiniteCarousel.prototype.loopCheck = function () {
      const self = this;
      
      if (self.currentIndex >= self.slideCount * 2) {
        self.currentIndex = self.slideCount;
        self.update(false);
      }
      if (self.currentIndex < self.slideCount) {
        self.currentIndex = self.slideCount * 2 - 1;
        self.update(false);
      }
    };

    InfiniteCarousel.prototype.snapToClosest = function() {
      const self = this;
      const slideWidth = self.slideWidth();
      
      // Calcular el índice más cercano basado en la posición actual
      let targetIndex = Math.round(-self.currentTranslate / slideWidth);
      
      // Hacer snap con animación
      const targetX = -targetIndex * slideWidth;
      self.track.style.transition = 'transform 0.3s ease';
      self.track.style.transform = `translateX(${targetX}px)`;
      
      self.currentTranslate = targetX;
      self.prevTranslate = targetX;
      self.currentIndex = targetIndex;
      
      // DESPUÉS de la animación, verificar si necesitamos hacer el loop (sin que se vea)
      setTimeout(() => {
        self.checkInfiniteLoop();
      }, 300);
    };

    InfiniteCarousel.prototype.checkInfiniteLoop = function() {
      const self = this;
      const slideWidth = self.slideWidth();
      
      // Si estamos en las copias del final, saltar instantáneamente a las originales
      if (self.currentIndex >= self.slideCount * 2) {
        self.currentIndex -= self.slideCount;
        const newX = -self.currentIndex * slideWidth;
        
        self.track.style.transition = 'none'; // SIN animación
        self.track.style.transform = `translateX(${newX}px)`;
        
        self.currentTranslate = newX;
        self.prevTranslate = newX;
      }
      
      // Si estamos en las copias del inicio, saltar instantáneamente al final
      if (self.currentIndex < self.slideCount) {
        self.currentIndex += self.slideCount;
        const newX = -self.currentIndex * slideWidth;
        
        self.track.style.transition = 'none'; // SIN animación
        self.track.style.transform = `translateX(${newX}px)`;
        
        self.currentTranslate = newX;
        self.prevTranslate = newX;
      }
    };


    InfiniteCarousel.prototype.attachEvents = function () {
      const self = this;
      
      const handleMouseDown = function(e) {
        console.log('MOUSEDOWN!!!', e.clientX); // DEBUG
        if (self.isAnimating) return;
        
        self.isDragging = true;
        self.startX = e.clientX;
        self.prevTranslate = self.currentTranslate;
        self.track.style.transition = 'none';
        self.track.style.cursor = 'grabbing';
        
        console.log('Dragging iniciado'); // DEBUG
      };
      
      const handleMouseMove = function(e) {
        if (!self.isDragging) return;
        
        e.preventDefault();
        const delta = e.clientX - self.startX;
        self.currentTranslate = self.prevTranslate + delta;
        self.track.style.transform = `translateX(${self.currentTranslate}px)`;
        
        console.log('Moviendo:', delta); // DEBUG
      };
      
      const handleMouseUp = function() {
        if (!self.isDragging) return;
        
        console.log('MOUSEUP!!!'); // DEBUG
        self.isDragging = false;
        self.track.style.cursor = 'grab';
        self.snapToClosest();
      };
      
      const handleTouchStart = function(e) {
        handleMouseDown({ clientX: e.touches[0].clientX });
      };
      
      const handleTouchMove = function(e) {
        if (self.isDragging) {
          e.preventDefault();
          handleMouseMove({ 
            clientX: e.touches[0].clientX,
            preventDefault: () => {}
          });
        }
      };
      
      const handleTouchEnd = function() {
        handleMouseUp();
      };
      
      // Guardar referencias para poder removerlas después
      self._handleMouseDown = handleMouseDown;
      self._handleMouseMove = handleMouseMove;
      self._handleMouseUp = handleMouseUp;
      self._handleTouchStart = handleTouchStart;
      self._handleTouchMove = handleTouchMove;
      self._handleTouchEnd = handleTouchEnd;
      
      self.track.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      self.track.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      self.track.addEventListener('dragstart', (e) => e.preventDefault());
      
      console.log('Eventos adjuntados'); // DEBUG
    };

    InfiniteCarousel.prototype.destroy = function () {
      const self = this;
      
      if (self._handleMouseDown) {
        self.track.removeEventListener('mousedown', self._handleMouseDown);
        document.removeEventListener('mousemove', self._handleMouseMove);
        document.removeEventListener('mouseup', self._handleMouseUp);
        
        self.track.removeEventListener('touchstart', self._handleTouchStart);
        document.removeEventListener('touchmove', self._handleTouchMove);
        document.removeEventListener('touchend', self._handleTouchEnd);
      }
    };

    return ExampleComponentModel;
  }
);