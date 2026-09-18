/* =========================================================
   Biznes va IT ga ixtisoslashgan Maktab — main.js
   Sof JavaScript: tashqi kutubxonalarsiz
   ========================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. TUN / KUN REJIMI ---------- */
  var root = document.documentElement;
  var themeToggle = $('#themeToggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('bit-theme', theme); } catch (e) {}
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
      themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Kun rejimiga o\'tish' : 'Tun rejimiga o\'tish');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#050a15' : '#0d2454');
  }

  setTheme(root.getAttribute('data-theme') || 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // Tizim sozlamasi o'zgarsa va foydalanuvchi qo'lda tanlamagan bo'lsa
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  if (mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem('bit-theme'); } catch (err) {}
      if (!saved) setTheme(e.matches ? 'dark' : 'light');
    });
  }

  /* ---------- 2. MOBIL MENYU ---------- */
  var nav = $('#primaryNav');
  var navToggle = $('#navToggle');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    $$('.nav-link, .nav-cta', nav).forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) closeNav();
    });
  }

  /* ---------- 3. HEADER HOLATI VA SCROLL PROGRESS ---------- */
  var header = $('#siteHeader');
  var progress = $('#scrollProgress');
  var toTop = $('#toTop');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
    }
    if (toTop) toTop.classList.toggle('is-visible', y > 620);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 4. SKROLLDA PAYDO BO'LISH ---------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 5. RAQAMLAR ANIMATSIYASI ---------- */
  var counters = $$('.count');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = target.toLocaleString('uz-UZ'); return; }
    var start = null, dur = 1500;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('uz-UZ');
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  if (counters.length && 'IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); countIO.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { countIO.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
  }

  /* ---------- 6. NAV LINKLARINI KUZATISH (scroll spy) ---------- */
  var navLinks = $$('.nav-link');
  var sections = navLinks
    .map(function (a) { return $(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spyIO.observe(s); });
  }

  /* ---------- 7. KURSLAR FILTRI ---------- */
  var chips = $$('.chip[data-filter]');
  var courseCards = $$('#courseGrid .course-card');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', String(active));
      });
      courseCards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('is-hidden', !match);
        if (match) card.classList.add('is-visible');
      });
    });
  });

  /* ---------- 8. FIKRLAR SLIDERI ---------- */
  var slider = $('#testimonialSlider');
  if (slider) {
    var slides = $$('.slide', slider);
    var dotsBox = $('#sliderDots');
    var index = 0, timer = null;

    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', (i + 1) + '-fikr');
      b.addEventListener('click', function () { go(i, true); });
      dotsBox.appendChild(b);
    });
    var dots = $$('button', dotsBox);

    function go(i, userAction) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.classList.toggle('is-active', k === index);
        s.setAttribute('aria-hidden', String(k !== index));
      });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === index);
        d.setAttribute('aria-selected', String(k === index));
      });
      if (userAction) restart();
    }

    function restart() {
      if (timer) window.clearInterval(timer);
      if (reduceMotion) return;
      timer = window.setInterval(function () { go(index + 1); }, 7000);
    }

    $('#nextSlide').addEventListener('click', function () { go(index + 1, true); });
    $('#prevSlide').addEventListener('click', function () { go(index - 1, true); });

    slider.addEventListener('mouseenter', function () { if (timer) window.clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);

    // Swipe (mobil)
    var startX = null;
    slider.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true);
      startX = null;
    });

    go(0);
    restart();
  }

  /* ---------- 9. FAQ AKKORDEON ---------- */
  var accItems = $$('.acc-item');
  accItems.forEach(function (item) {
    var head = $('.acc-head', item);
    var body = $('.acc-body', item);

    head.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      accItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        $('.acc-head', other).setAttribute('aria-expanded', 'false');
        $('.acc-body', other).style.maxHeight = '0px';
      });

      item.classList.toggle('is-open', !isOpen);
      head.setAttribute('aria-expanded', String(!isOpen));
      body.style.maxHeight = !isOpen ? body.scrollHeight + 'px' : '0px';
    });
  });
  window.addEventListener('resize', function () {
    accItems.forEach(function (item) {
      if (!item.classList.contains('is-open')) return;
      var body = $('.acc-body', item);
      body.style.maxHeight = body.scrollHeight + 'px';
    });
  });

  /* ---------- 10. GALEREYA LIGHTBOX ---------- */
  var galleryItems = $$('.gallery-item');
  var lb = $('#lightbox');
  if (galleryItems.length && lb) {
    var lbImg = $('#lbImage');
    var lbCap = $('#lbCaption');
    var current = 0, lastFocused = null;
    var placeholderSrc = lbImg.getAttribute('src');

    function show(i) {
      current = (i + galleryItems.length) % galleryItems.length;
      var el = galleryItems[current];
      lbImg.src = el.getAttribute('data-src');
      lbImg.alt = el.querySelector('img').alt;
      lbCap.textContent = el.getAttribute('data-caption') || '';
    }

    function openLb(i) {
      lastFocused = document.activeElement;
      show(i);
      lb.hidden = false;
      window.requestAnimationFrame(function () { lb.classList.add('is-open'); });
      document.body.classList.add('nav-open');
      $('#lbClose').focus();
    }

    function closeLb() {
      lb.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      window.setTimeout(function () { lb.hidden = true; lbImg.src = placeholderSrc; }, 280);
      if (lastFocused) lastFocused.focus();
    }

    galleryItems.forEach(function (el, i) {
      el.addEventListener('click', function () { openLb(i); });
    });

    $('#lbClose').addEventListener('click', closeLb);
    $('#lbNext').addEventListener('click', function () { show(current + 1); });
    $('#lbPrev').addEventListener('click', function () { show(current - 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });

    document.addEventListener('keydown', function (e) {
      if (nav && nav.classList.contains('is-open') && e.key === 'Escape') closeNav();
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });
  } else {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) closeNav();
    });
  }

  /* ---------- 11. ALOQA FORMASI ---------- */
  var form = $('#contactForm');
  if (form) {
    var status = $('#formStatus');

    function setError(input, message) {
      var field = input.closest('.field');
      var box = document.querySelector('.error[data-for="' + input.id + '"]');
      if (field) field.classList.toggle('has-error', !!message);
      if (box) box.textContent = message || '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validatePhone(value) {
      var digits = value.replace(/\D/g, '');
      return digits.length >= 9;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;

      var name = $('#fName');
      var phone = $('#fPhone');
      var agree = $('#fAgree');
      var agreeErr = document.querySelector('.error[data-for="fAgree"]');

      if (name.value.trim().length < 3) {
        setError(name, 'Ism-familiyani to\'liq kiriting (kamida 3 belgi).');
        ok = false;
      } else { setError(name, ''); }

      if (!validatePhone(phone.value)) {
        setError(phone, 'To\'g\'ri telefon raqam kiriting, masalan +998 90 123-45-67.');
        ok = false;
      } else { setError(phone, ''); }

      if (agreeErr) agreeErr.textContent = agree.checked ? '' : 'Rozilik belgilanmagan.';

      if (!ok || !agree.checked) {
        status.textContent = 'Iltimos, belgilangan maydonlarni to\'g\'ri to\'ldiring.';
        status.classList.add('is-error');
        var firstBad = form.querySelector('.has-error input, .has-error select') || (!agree.checked ? agree : null);
        if (firstBad) firstBad.focus();
        return;
      }

      status.classList.remove('is-error');
      status.textContent = 'Rahmat! Arizangiz qabul qilindi — 1 ish kuni ichida bog\'lanamiz.';
      form.reset();
      $$('.field', form).forEach(function (f) { f.classList.remove('has-error'); });
    });

    ['#fName', '#fPhone'].forEach(function (sel) {
      var input = $(sel);
      if (input) input.addEventListener('input', function () { setError(input, ''); });
    });
  }

  /* ---------- 12. YIL ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 13. SILLIQ SKROLL (header balandligini hisobga olib) ---------- */
  $$('a[href^="#"]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href === '#') return;
    link.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var headerH = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    });
  });

})();
