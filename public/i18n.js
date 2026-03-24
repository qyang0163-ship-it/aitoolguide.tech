// AIToolGuide i18n Engine v3 - 16 Languages, "3+13" L10n, RTL Support
// Works on ALL pages (index, blog, tool) via data-i18n attributes
(function() {
  'use strict';

  var LANGS = [
    { code: 'en', label: 'English', flag: '\u{1F1FA}\u{1F1F8}', rtl: false, tier: 'core' },
    { code: 'zh-CN', label: '\u7B80\u4F53\u4E2D\u6587', flag: '\u{1F1E8}\u{1F1F3}', rtl: false, tier: 'core' },
    { code: 'zh-TW', label: '\u7E41\u9AD4\u4E2D\u6587', flag: '\u{1F1F9}\u{1F1FC}', rtl: false, tier: 'core' },
    { code: 'es', label: 'Espa\u00F1ol', flag: '\u{1F1EA}\u{1F1F8}', rtl: false, tier: 'core' },
    { code: 'ja', label: '\u65E5\u672C\u8A9E', flag: '\u{1F1EF}\u{1F1F5}', rtl: false, tier: 'longtail' },
    { code: 'pt', label: 'Portugu\u00EAs', flag: '\u{1F1E7}\u{1F1F7}', rtl: false, tier: 'longtail' },
    { code: 'vi', label: 'Ti\u1EBFng Vi\u1EC7t', flag: '\u{1F1FB}\u{1F1F3}', rtl: false, tier: 'longtail' },
    { code: 'th', label: '\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22', flag: '\u{1F1F9}\u{1F1ED}', rtl: false, tier: 'longtail' },
    { code: 'id', label: 'Bahasa Indonesia', flag: '\u{1F1EE}\u{1F1E9}', rtl: false, tier: 'longtail' },
    { code: 'hi', label: '\u0939\u093F\u0928\u094D\u0926\u0940', flag: '\u{1F1EE}\u{1F1F3}', rtl: false, tier: 'longtail' },
    { code: 'de', label: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}', rtl: false, tier: 'longtail' },
    { code: 'fr', label: 'Fran\u00E7ais', flag: '\u{1F1EB}\u{1F1F7}', rtl: false, tier: 'longtail' },
    { code: 'ko', label: '\uD55C\uAD6D\uC5B4', flag: '\u{1F1F0}\u{1F1F7}', rtl: false, tier: 'longtail' },
    { code: 'ar', label: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', flag: '\u{1F1F8}\u{1F1E6}', rtl: true, tier: 'longtail' },
    { code: 'ru', label: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}', rtl: false, tier: 'longtail' },
    { code: 'tr', label: 'T\u00FCrk\u00E7e', flag: '\u{1F1F9}\u{1F1F7}', rtl: false, tier: 'longtail' }
  ];

  var LANG_KEY = 'aitg_lang';
  var cache = {};

  function detectLang() {
    var saved = localStorage.getItem(LANG_KEY);
    if (saved && LANGS.some(function(l) { return l.code === saved; })) return saved;
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('zh-tw') === 0 || nav.indexOf('zh-hk') === 0) return 'zh-TW';
    if (nav.indexOf('zh') === 0) return 'zh-CN';
    var prefix = nav.split('-')[0];
    var match = LANGS.find(function(l) { return l.code === prefix || l.code.split('-')[0] === prefix; });
    return match ? match.code : 'en';
  }

  function loadLocale(code, cb) {
    if (cache[code]) { cb(cache[code]); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/locales/' + code + '.json?v=' + Date.now(), true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          cache[code] = JSON.parse(xhr.responseText);
          cb(cache[code]);
        } catch(e) {
          // fallback to en
          if (code !== 'en') loadLocale('en', cb);
        }
      } else if (code !== 'en') {
        loadLocale('en', cb);
      }
    };
    xhr.onerror = function() { if (code !== 'en') loadLocale('en', cb); };
    xhr.send();
  }

  function applyTranslations(t) {
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (t[key] !== undefined) els[i].textContent = t[key];
    }
    // Update meta description
    var meta = document.querySelector('meta[name="description"]');
    if (meta && t.heroDesc) meta.setAttribute('content', t.heroDesc);
  }

  function applyRTL(langObj) {
    var html = document.documentElement;
    if (langObj && langObj.rtl) {
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
    }
  }

  function applyHtmlLang(code) {
    var html = document.documentElement;
    if (code === 'zh-CN') html.lang = 'zh-Hans';
    else if (code === 'zh-TW') html.lang = 'zh-Hant';
    else html.lang = code;
  }

  function showFallbackBanner(t) {
    var notice = t.genericFallbackNotice;
    if (!notice) {
      // Remove existing banner if switching to core market
      var existing = document.getElementById('aitg-fallback-banner');
      if (existing) existing.remove();
      return;
    }
    var existing = document.getElementById('aitg-fallback-banner');
    if (existing) {
      existing.textContent = notice;
      return;
    }
    var banner = document.createElement('div');
    banner.id = 'aitg-fallback-banner';
    banner.textContent = notice;
    banner.style.cssText = 'background:linear-gradient(90deg,#dbeafe,#e0e7ff);padding:10px;text-align:center;font-weight:600;color:#1e40af;font-size:0.9rem;';
    var urgency = document.querySelector('.urgency-banner');
    if (urgency && urgency.parentNode) {
      urgency.parentNode.insertBefore(banner, urgency.nextSibling);
    }
  }

  function setLang(code) {
    localStorage.setItem(LANG_KEY, code);
    var langObj = LANGS.find(function(l) { return l.code === code; });
    applyHtmlLang(code);
    applyRTL(langObj);

    loadLocale(code, function(t) {
      applyTranslations(t);
      showFallbackBanner(t);
    });

    // Update switcher button
    var btn = document.getElementById('aitg-lang-btn');
    if (btn && langObj) {
      btn.innerHTML = langObj.flag + ' ' + langObj.label + ' <span style="font-size:0.7em">\u25BC</span>';
    }
  }

  function createSwitcher() {
    // Remove old switcher if exists
    var old = document.getElementById('aitg-lang-switcher');
    if (old) old.remove();

    var container = document.createElement('div');
    container.id = 'aitg-lang-switcher';
    container.style.cssText = 'position:relative;display:inline-flex;align-items:center;z-index:1001;';

    var btn = document.createElement('button');
    btn.id = 'aitg-lang-btn';
    btn.style.cssText = 'background:linear-gradient(135deg,#0ea5e9,#8b5cf6);color:white;border:none;padding:8px 14px;border-radius:10px;font-weight:600;font-size:0.82rem;cursor:pointer;display:flex;align-items:center;gap:5px;transition:transform 0.2s;white-space:nowrap;';

    var dd = document.createElement('div');
    dd.id = 'aitg-lang-dd';
    dd.style.cssText = 'display:none;position:absolute;top:100%;right:0;margin-top:8px;background:white;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.15);min-width:200px;max-height:400px;overflow-y:auto;border:1px solid #e2e8f0;z-index:9999;';

    for (var i = 0; i < LANGS.length; i++) {
      (function(lang) {
        var item = document.createElement('button');
        item.style.cssText = 'display:flex;align-items:center;gap:10px;width:100%;padding:10px 16px;border:none;background:none;cursor:pointer;font-size:0.9rem;color:#0f172a;text-align:left;transition:background 0.2s;white-space:nowrap;';
        item.innerHTML = '<span style="font-size:1.1rem">' + lang.flag + '</span><span>' + lang.label + '</span>' + (lang.tier === 'core' ? '<span style="font-size:0.6rem;background:#dcfce7;color:#166534;padding:2px 6px;border-radius:8px;margin-left:auto;">\u2605</span>' : '');
        item.onmouseenter = function() { this.style.background = '#f1f5f9'; };
        item.onmouseleave = function() { this.style.background = 'none'; };
        item.onclick = function(e) {
          e.stopPropagation();
          setLang(lang.code);
          dd.style.display = 'none';
        };
        dd.appendChild(item);
      })(LANGS[i]);
    }

    btn.onclick = function(e) {
      e.stopPropagation();
      dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
    };
    document.addEventListener('click', function() { dd.style.display = 'none'; });

    container.appendChild(btn);
    container.appendChild(dd);

    // Insert into nav - works on ALL pages
    var nav = document.querySelector('.nav');
    if (nav) {
      var cta = nav.querySelector('.btn-primary.btn-small, .btn-primary');
      if (cta) {
        nav.insertBefore(container, cta);
      } else {
        nav.appendChild(container);
      }
    }
  }

  function init() {
    createSwitcher();
    setLang(detectLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.AITG_i18n = { setLang: setLang, detectLang: detectLang, LANGS: LANGS };
})();
