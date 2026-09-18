/* =========================================================
   theme.js — Kun / tun rejimini boshqarish
   Saqlash: localStorage['bitmaktab-theme']
   ========================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'bitmaktab-theme';
  var COLORS = { light: '#f8f1dc', dark: '#201a0e' };
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var meta = document.getElementById('metaTheme');

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.setAttribute('aria-checked', String(theme === 'dark'));
    if (meta) meta.setAttribute('content', COLORS[theme]);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* privat rejim */ }
    }
  }

  /* Boshlang'ich holat (head'dagi inline skript allaqachon qo'ygan) */
  apply(current(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      apply(current() === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* Tizim mavzusi o'zgarsa va foydalanuvchi saqlamagan bo'lsa — ergashamiz */
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onChange = function (e) {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) {}
    if (!saved) apply(e.matches ? 'dark' : 'light', false);
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
