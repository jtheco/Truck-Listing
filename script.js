/* ==========================================================================
   1971 Ford F-100 — Listing site JS
   Two small things happen here:
     1. A reveal-on-load / reveal-on-scroll fade-up for sections.
     2. A minimal custom lightbox (~80 lines) — no external dependency.
   ========================================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------------------------
   * 1. Reveal-on-scroll for sections marked .reveal
   *    Uses IntersectionObserver. Falls back to simply showing everything
   *    on browsers that don't support it.
   * ----------------------------------------------------------------- */

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* -------------------------------------------------------------------
   * 2. Lightbox
   *    Every <a class="lightbox-item" href="..."> on the page is
   *    collected into a gallery. Clicking one opens the modal at that
   *    index. Arrow keys / on-screen arrows / swipe move between images.
   *    Esc or clicking the backdrop closes.
   * ----------------------------------------------------------------- */

  var items = Array.prototype.slice.call(document.querySelectorAll('a.lightbox-item'));
  if (!items.length) return;

  var lb        = document.getElementById('lightbox');
  var lbImg     = lb.querySelector('.lb-img');
  var lbCaption = lb.querySelector('.lb-caption');
  var lbCounter = lb.querySelector('.lb-counter');
  var btnClose  = lb.querySelector('.lb-close');
  var btnPrev   = lb.querySelector('.lb-prev');
  var btnNext   = lb.querySelector('.lb-next');

  var current = 0;

  function open(index) {
    current = index;
    render();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function go(delta) {
    current = (current + delta + items.length) % items.length;
    render();
  }

  function render() {
    var a   = items[current];
    var src = a.getAttribute('href');
    var alt = a.querySelector('img') ? a.querySelector('img').getAttribute('alt') : '';
    var cap = a.getAttribute('data-caption') || alt || '';
    lbImg.src = src;
    lbImg.alt = alt;
    lbCaption.textContent = cap;
    lbCounter.textContent = (current + 1) + ' of ' + items.length;
  }

  items.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      open(i);
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { go(-1); });
  btnNext.addEventListener('click', function () { go(+1); });

  // click on backdrop (but not on controls / image)
  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') go(+1);
    else if (e.key === 'ArrowLeft')  go(-1);
  });

  // touch swipe
  var touchStartX = null;
  lb.addEventListener('touchstart', function (e) {
    if (e.changedTouches && e.changedTouches.length) {
      touchStartX = e.changedTouches[0].clientX;
    }
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (touchStartX === null || !e.changedTouches || !e.changedTouches.length) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) go(dx < 0 ? +1 : -1);
    touchStartX = null;
  }, { passive: true });
})();
