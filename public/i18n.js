// AIToolGuide i18n Engine v4 - 16 Languages, Auto-Translation for Hardcoded Content
// Works on ALL pages (index, blog, tool) via data-i18n attributes + auto-translation
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
  var currentLang = 'en';

  // Auto-translation dictionary for common Chinese text on sub-pages
  var autoTranslateDict = {
    'en': {
      '赚钱工具': 'Money Tools',
      '变现方法': 'Methods',
      '成功案例': 'Success Stories',
      '立即开始': 'Get Started',
      '预期收入': 'Income',
      '上手难度': 'Difficulty',
      '首单时间': 'First Income',
      '你需要准备这些': 'What You Need',
      '操作步骤：': 'Steps:',
      '去哪里接单？': 'Where to Get Orders?',
      '去接单 →': 'Get Orders →',
      '新手必看FAQ': 'FAQ for Beginners',
      '准备好开始赚钱了吗？': 'Ready to Start Earning?',
      '现在行动，比别人更快一步！': 'Act now, get ahead!',
      '前100名用户可获得专属赚钱工具包': 'First 100 get exclusive toolkit',
      '人实现收入增长': 'people increased income',
      '免费使用': 'Free Trial',
      '立即学习赚钱方法': 'Learn Methods Now',
      '查看接单平台': 'View Platforms',
      '查看更多赚钱工具': 'View All Tools',
      '老司机的经验总结': 'Pro Tips',
      '常见问题': 'FAQ',
      '重点': 'Key Point',
      '方法': 'Method',
      '限时福利': 'Limited Offer',
      '赚钱版': 'Money Edition',
      '种方式': 'Ways',
      '专属赚钱工具包': 'Exclusive Money Toolkit',
      '已有': 'Already',
      '通过': 'through',
      '实现收入增长': 'increased income',
      '准备': 'Ready',
      '开始': 'Start',
      '赚钱': 'Earning',
      '文案代写服务': 'Copywriting Service',
      '论文辅助写作': 'Academic Writing Help',
      '短视频脚本创作': 'Short Video Script Writing',
      '简历优化服务': 'Resume Optimization',
      'AI提示词售卖': 'AI Prompt Sales',
      '头像定制服务': 'Avatar Customization',
      '电商设计接单': 'E-commerce Design',
      '壁纸/表情包制作': 'Wallpaper/Sticker Creation',
      '插画设计外包': 'Illustration Design',
      '模板售卖': 'Template Sales',
      '知识付费课程': 'Knowledge Courses',
      '个人效率咨询': 'Productivity Consulting'
    },
    'ja': {
      '赚钱工具': '稼ぐツール',
      '变现方法': '稼ぎ方',
      '成功案例': '成功例',
      '立即开始': '始める',
      '预期收入': '収入',
      '上手难度': '難易度',
      '首单时间': '初注文時間',
      '你需要准备这些': '必要なもの',
      '操作步骤：': '手順：',
      '去哪里接单？': 'どこで受注？',
      '去接单 →': '受注する →',
      '新手必看FAQ': '初心者FAQ',
      '准备好开始赚钱了吗？': '稼ぎ始める準備は？',
      '现在行动，比别人更快一步！': '今すぐ行動して先を行こう！',
      '前100名用户可获得专属赚钱工具包': '先着100名に専用ツールキット',
      '人实现收入增长': '人が収入増加',
      '免费使用': '無料で使う',
      '立即学习赚钱方法': '今すぐ稼ぎ方を学ぶ',
      '查看接单平台': '受注プラットフォーム',
      '查看更多赚钱工具': 'ツールを見る',
      '老司机的经验总结': 'プロのコツ',
      '常见问题': 'よくある質問',
      '重点': 'ポイント',
      '方法': '方法',
      '限时福利': '限定特典',
      '赚钱版': '稼ぎ版',
      '种方式': 'つの方法',
      '专属赚钱工具包': '専用稼ぎツールキット',
      '已有': '既に',
      '通过': 'で',
      '实现收入增长': '収入増加実現',
      '准备': '準備',
      '开始': '開始',
      '赚钱': '稼ぐ'
    },
    'es': {
      '赚钱工具': 'Herramientas',
      '变现方法': 'Métodos',
      '成功案例': 'Casos de Éxito',
      '立即开始': 'Empezar',
      '预期收入': 'Ingresos',
      '上手难度': 'Dificultad',
      '首单时间': 'Primera Venta',
      '你需要准备这些': 'Lo Que Necesitas',
      '操作步骤：': 'Pasos:',
      '去哪里接单？': '¿Dónde Conseguir Clientes?',
      '去接单 →': 'Conseguir →',
      '新手必看FAQ': 'FAQ Principiantes',
      '准备好开始赚钱了吗？': '¿Listo para Ganar?',
      '现在行动，比别人更快一步！': '¡Actúa ahora, adelántate!',
      '前100名用户可获得专属赚钱工具包': 'Primeros 100 reciben toolkit exclusivo',
      '人实现收入增长': 'personas aumentaron ingresos',
      '免费使用': 'Prueba Gratis',
      '立即学习赚钱方法': 'Aprender Métodos',
      '查看接单平台': 'Ver Plataformas',
      '查看更多赚钱工具': 'Ver Más Herramientas',
      '老司机的经验总结': 'Consejos Pro',
      '常见问题': 'Preguntas Frecuentes',
      '重点': 'Clave',
      '方法': 'Método',
      '限时福利': 'Oferta Limitada',
      '赚钱版': 'Edición Dinero',
      '种方式': 'Formas',
      '专属赚钱工具包': 'Toolkit Exclusivo',
      '已有': 'Ya',
      '通过': 'con',
      '实现收入增长': 'ingresos aumentados',
      '准备': 'Listo',
      '开始': 'Empezar',
      '赚钱': 'Ganar'
    }
  };

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
    // 1. Translate elements with data-i18n attributes
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute('data-i18n');
      if (t[key] !== undefined) els[i].textContent = t[key];
    }
    
    // 2. Auto-translate hardcoded Chinese text on sub-pages
    if (currentLang !== 'zh-CN' && currentLang !== 'zh-TW') {
      var dict = autoTranslateDict[currentLang] || autoTranslateDict['en'];
      if (dict) {
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        var node;
        while (node = walker.nextNode()) {
          var text = node.textContent;
          if (/[\u4e00-\u9fa5]/.test(text)) {
            var translated = text;
            for (var cn in dict) {
              if (dict.hasOwnProperty(cn)) {
                translated = translated.split(cn).join(dict[cn]);
              }
            }
            if (translated !== text) {
              node.textContent = translated;
            }
          }
        }
      }
    }
    
    // 3. Currency conversion for income badges (¥ to $ for English, etc.)
    // Exchange rate: 1 USD = 7 CNY
    var incomeEls = document.querySelectorAll('[data-income-min][data-income-max]');
    for (var j = 0; j < incomeEls.length; j++) {
      var el = incomeEls[j];
      var min = parseInt(el.getAttribute('data-income-min'));
      var max = parseInt(el.getAttribute('data-income-max'));
      
      // Define currency settings per locale
      var currencySettings = {
        'en': { symbol: '$', rate: 1 / 7, divisor: 1 },
        'zh-CN': { symbol: '¥', rate: 1, divisor: 1 },
        'zh-TW': { symbol: 'NT$', rate: 4.5, divisor: 1 },
        'ja': { symbol: '¥', rate: 20, divisor: 1000 },
        'ko': { symbol: '₩', rate: 180, divisor: 10000 },
        'es': { symbol: '€', rate: 1 / 7.5, divisor: 1 },
        'fr': { symbol: '€', rate: 1 / 7.5, divisor: 1 },
        'de': { symbol: '€', rate: 1 / 7.5, divisor: 1 },
        'pt': { symbol: 'R$', rate: 0.7, divisor: 1 },
        'ru': { symbol: '₽', rate: 12, divisor: 1000 },
        'ar': { symbol: '$', rate: 1 / 7, divisor: 1 },
        'hi': { symbol: '₹', rate: 12, divisor: 1 },
        'th': { symbol: '฿', rate: 5, divisor: 1 },
        'tr': { symbol: '₺', rate: 4, divisor: 1 },
        'vi': { symbol: '₫', rate: 3500, divisor: 1000000 },
        'id': { symbol: 'Rp', rate: 2200, divisor: 1000000 }
      };
      
      var settings = currencySettings[currentLang] || currencySettings['en'];
      var convertedMin = Math.round(min * settings.rate / settings.divisor);
      var convertedMax = Math.round(max * settings.rate / settings.divisor);
      
      var suffix = settings.divisor >= 1000000 ? 'M' : settings.divisor >= 1000 ? 'K' : '';
      el.textContent = settings.symbol + convertedMin + '-' + convertedMax + suffix + '/month';
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
    currentLang = code;
    localStorage.setItem(LANG_KEY, code);
    var langObj = LANGS.find(function(l) { return l.code === code; });
    applyHtmlLang(code);
    applyRTL(langObj);

    loadLocale(code, function(t) {
      applyTranslations(t);
      showFallbackBanner(t);
    });

    var btn = document.getElementById('aitg-lang-btn');
    if (btn && langObj) {
      btn.innerHTML = langObj.flag + ' ' + langObj.label + ' <span style="font-size:0.7em">\u25BC</span>';
    }
  }

  function createSwitcher() {
    var old = document.getElementById('aitg-lang-switcher');
    if (old) old.remove();

    var container = document.createElement('div');
    container.id = 'aitg-lang-switcher';
    container.style.cssText = 'position:relative;display:inline-flex;align-items:center;z-index:1001;';

    var btn = document.createElement('button');
    btn.id = 'aitg-lang-btn';
    btn.style.cssText = 'background:linear-gradient(135deg,#635bff,#00d4aa);color:white;border:none;padding:8px 14px;border-radius:10px;font-weight:600;font-size:0.82rem;cursor:pointer;display:flex;align-items:center;gap:5px;transition:transform 0.2s;white-space:nowrap;';

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

    // Try to insert in nav-actions, fallback to nav
    var navActions = document.querySelector('.nav-actions');
    var nav = document.querySelector('.nav');
    
    if (navActions) {
      // Insert at the end of nav-actions
      navActions.appendChild(container);
    } else if (nav) {
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
