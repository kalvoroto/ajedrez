// ==========================================
// TH-KIT / MOTION
// Utilidades de animación (revelado suave de elementos).
// ==========================================

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Revela elementos con [data-motion] al montarse.
  function initMotion() {
    const targets = document.querySelectorAll('[data-motion]');
    if (!targets.length) return;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      targets.forEach(el => el.classList.add('motion-in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();
