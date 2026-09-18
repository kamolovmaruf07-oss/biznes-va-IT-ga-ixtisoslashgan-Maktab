/* =========================================================
   main.js — Barcha interaktivlik: nav, reveal, counter,
   tablar, filtr, galereya-lightbox, slider, forma, toast
   ========================================================= */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Scroll progress + header + to-top ---------- */
  var progress = $('#scrollProgress');
  var header = $('#siteHeader');
  var toTop = $('#toTop');

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var y = window.scrollY || doc.scrollTop;
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (header) header.classList.toggle('scrolled', y > 10);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 2. Burger menyu ---------- */
  var burger = $('#burger');
  var nav = $('#mainNav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 3. Scrollspy (faol nav link) ---------- */
  var navLinks = $$('.nav-link');
  var sections = navLinks
    .map(function (a) { return $(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 4. Reveal on scroll ---------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 5. Counterlar ---------- */
  var counters = $$('.counter');
  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }
    var start = null;
    var dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- 6. Tablar (yo'nalishlar) ---------- */
  var tabs = $$('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.hidden = !active;
          if (active) {
            panel.style.animation = 'none';
            void panel.offsetWidth; /* reflow — animatsiyani qayta ishga tushirish */
            panel.style.animation = '';
          }
        }
      });
    });
  });

  /* ---------- 7. Kurslar filtri ---------- */
  var chips = $$('.filter-chip');
  var cards = $$('#courseGrid .course-card');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
      var f = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.classList.toggle('is-hidden', !show);
        if (show && !reduced) {
          card.classList.remove('pop');
          void card.offsetWidth;
          card.classList.add('pop');
        }
      });
    });
  });

  /* ---------- 8. Galereya lightbox ---------- */
  var gItems = $$('.g-item');
  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var lbIndex = 0;

  function openLb(i) {
    lbIndex = (i + gItems.length) % gItems.length;
    var img = $('img', gItems[lbIndex]);
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = gItems[lbIndex].getAttribute('data-caption') || img.alt;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = '';
    gItems[lbIndex].focus();
  }
  gItems.forEach(function (item, i) {
    item.addEventListener('click', function () { openLb(i); });
  });
  if (lb) {
    $('#lbClose').addEventListener('click', closeLb);
    $('#lbPrev').addEventListener('click', function () { openLb(lbIndex - 1); });
    $('#lbNext').addEventListener('click', function () { openLb(lbIndex + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') openLb(lbIndex - 1);
      if (e.key === 'ArrowRight') openLb(lbIndex + 1);
    });
  }

  /* ---------- 9. Fikrlar slideri ---------- */
  var track = $('#sliderTrack');
  var slides = track ? $$('.slide', track) : [];
  var dotsWrap = $('#sliderDots');
  var slideIdx = 0;
  var autoTimer = null;

  function goSlide(i) {
    slideIdx = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + slideIdx * 100 + '%)';
    $$('#sliderDots button').forEach(function (d, di) {
      d.classList.toggle('is-active', di === slideIdx);
      d.setAttribute('aria-selected', String(di === slideIdx));
    });
  }
  if (slides.length && dotsWrap) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', (i + 1) + '-fikr');
      b.addEventListener('click', function () { goSlide(i); restartAuto(); });
      dotsWrap.appendChild(b);
    });
    goSlide(0);

    var prev = $('#slidePrev');
    var next = $('#slideNext');
    if (prev) prev.addEventListener('click', function () { goSlide(slideIdx - 1); restartAuto(); });
    if (next) next.addEventListener('click', function () { goSlide(slideIdx + 1); restartAuto(); });

    var slider = $('#slider');
    function startAuto() {
      if (reduced) return;
      autoTimer = setInterval(function () { goSlide(slideIdx + 1); }, 6000);
    }
    function restartAuto() { clearInterval(autoTimer); startAuto(); }
    if (slider) {
      slider.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
      slider.addEventListener('mouseleave', startAuto);
    }
    startAuto();
  }

  /* ---------- 10. Hero tilt effekti ---------- */
  var heroMedia = $('.hero-media');
  var heroFrame = $('.hero-frame');
  if (heroMedia && heroFrame && !reduced && window.matchMedia('(pointer: fine)').matches) {
    heroMedia.addEventListener('mousemove', function (e) {
      var r = heroMedia.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      heroFrame.style.transform = 'perspective(900px) rotateY(' + (x * 5).toFixed(2) + 'deg) rotateX(' + (-y * 5).toFixed(2) + 'deg)';
    });
    heroMedia.addEventListener('mouseleave', function () {
      heroFrame.style.transform = '';
    });
  }

  /* ---------- 11. Forma validatsiyasi + toast ---------- */
  var form = $('#contactForm');
  var toast = $('#toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    $('#toastMsg').textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 4200);
  }

  function setErr(field, msg) {
    var wrap = field.closest('.field');
    var err = $('.err', wrap);
    wrap.classList.toggle('invalid', !!msg);
    if (err) err.textContent = msg || '';
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var name = $('#fName');
      var phone = $('#fPhone');
      var email = $('#fEmail');
      var dir = $('#fDir');

      if (name.value.trim().length < 3) { setErr(name, 'Ism va familiyani to\'liq kiriting'); ok = false; }
      else setErr(name, '');

      var phoneClean = phone.value.replace(/[\s()-]/g, '');
      if (!/^\+?\d{9,13}$/.test(phoneClean)) { setErr(phone, 'Telefon raqami noto\'g\'ri'); ok = false; }
      else setErr(phone, '');

      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setErr(email, 'Email formati noto\'g\'ri'); ok = false;
      } else setErr(email, '');

      if (!dir.value) { setErr(dir, 'Yo\'nalishni tanlang'); ok = false; }
      else setErr(dir, '');

      if (!ok) {
        showToast('Iltimos, xatolarni to\'g\'rilang.');
        return;
      }
      form.reset();
      showToast('Arizangiz qabul qilindi! Tez orada bog\'lanamiz.');
    });

    /* Yozayotganda xatoni tozalash */
    $$('.field input, .field select', form).forEach(function (inp) {
      inp.addEventListener('input', function () { setErr(inp, ''); });
    });
  }

  /* ---------- 12. Yil ---------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
