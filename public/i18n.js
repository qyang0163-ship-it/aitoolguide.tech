// AIToolGuide i18n - 16 Language Support
// Core: en, zh-CN, zh-TW, es | Long-tail: ja, pt, vi, th, id, hi, de, fr, ko, ar, ru, tr
(function() {
  'use strict';

  const LANGS = [
    { code: 'en', label: 'English', flag: '🇺🇸', rtl: false },
    { code: 'zh-CN', label: '简体中文', flag: '🇨🇳', rtl: false },
    { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼', rtl: false },
    { code: 'es', label: 'Español', flag: '🇪🇸', rtl: false },
    { code: 'ja', label: '日本語', flag: '🇯🇵', rtl: false },
    { code: 'pt', label: 'Português', flag: '🇧🇷', rtl: false },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
    { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭', rtl: false },
    { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', rtl: false },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', rtl: false },
    { code: 'fr', label: 'Français', flag: '🇫🇷', rtl: false },
    { code: 'ko', label: '한국어', flag: '🇰🇷', rtl: false },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', rtl: true },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', rtl: false },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷', rtl: false }
  ];

  const LANG_KEY = 'aitg_lang';
  const DEFAULT_LANG = 'en';

  // Core translations (fully localized)
  const coreTranslations = {
    en: {
      navTools: "Money Tools", navMethods: "Methods", navStories: "Success Stories", navStart: "Get Started", navCta: "Start Earning Free →",
      platformFreelance: "Upwork, Fiverr, Freelancer", platformTraffic: "X, TikTok, Reddit", platformPayment: "Stripe, PayPal, Wise",
      genericFallbackNotice: "",
      heroBadge: "💸 #1 Side Hustle", heroSocial: "Helped 10,000+ people",
      heroTitle1: "Make Money", heroTitle2: "with AI Tools", heroTitle3: "Beginners Can Earn $1,000+/Month",
      heroDesc: "No coding needed. No design experience. Just learn AI tools and seize 2026's biggest opportunity.",
      heroCta1: "🔥 Try Free Now", heroCta2: "See Methods →", heroCta3: "Success Stories",
      urgencyBanner: "🔥 Limited: First 100 get 'AI Money Toolkit' + Exclusive Channels"
    },
    'zh-CN': {
      navTools: "赚钱工具", navMethods: "变现方法", navStories: "成功案例", navStart: "立即开始", navCta: "免费开始赚钱 →",
      platformFreelance: "闲鱼, 小红书, 猪八戒", platformTraffic: "抖音, 微信, B站", platformPayment: "支付宝, 微信支付",
      genericFallbackNotice: "",
      heroBadge: "💸 副业首选", heroSocial: "已帮助10,000+人",
      heroTitle1: "用AI工具", heroTitle2: "轻松赚钱", heroTitle3: "普通人月入过万",
      heroDesc: "不需要编程，不需要设计经验，会用AI工具就能抓住2026年最大红利。",
      heroCta1: "🔥 立即免费试用", heroCta2: "查看方法 →", heroCta3: "成功案例",
      urgencyBanner: "🔥 限时：前100名送《AI赚钱工具包》+独家渠道"
    },
    'zh-TW': {
      navTools: "賺錢工具", navMethods: "變現方法", navStories: "成功案例", navStart: "立即開始", navCta: "免費開始賺錢 →",
      platformFreelance: "蝦皮, 小紅書, 豬八戒", platformTraffic: "抖音, 臉書, YouTube", platformPayment: "街口支付, PayPal",
      genericFallbackNotice: "",
      heroBadge: "💸 副業首選", heroSocial: "已幫助10,000+人",
      heroTitle1: "用AI工具", heroTitle2: "輕鬆賺錢", heroTitle3: "普通人月入過萬",
      heroDesc: "不需要編程，不需要設計經驗，會用AI工具就能抓住2026年最大紅利。",
      heroCta1: "🔥 立即免費試用", heroCta2: "查看方法 →", heroCta3: "成功案例",
      urgencyBanner: "🔥 限時：前100名送《AI賺錢工具包》+獨家渠道"
    },
    es: {
      navTools: "Herramientas", navMethods: "Métodos", navStories: "Casos", navStart: "Comenzar", navCta: "Empieza Gratis →",
      platformFreelance: "Workana, Fiverr, Hotmart", platformTraffic: "Instagram, TikTok, Facebook", platformPayment: "PayPal, Payoneer",
      genericFallbackNotice: "",
      heroBadge: "💸 #1 Ingresos Extra", heroSocial: "Ayudó a 10,000+ personas",
      heroTitle1: "Gana Dinero", heroTitle2: "con IA", heroTitle3: "Principiantes $1,000+/mes",
      heroDesc: "Sin código. Sin diseño. Solo aprende herramientas IA y aprovecha 2026.",
      heroCta1: "🔥 Prueba Gratis", heroCta2: "Ver Métodos →", heroCta3: "Casos de Éxito",
      urgencyBanner: "🔥 Limitado: Primeros 100 reciben 'Kit IA' + Canales Exclusivos"
    }
  };

  // Long-tail translations (fallback to EN platforms, localized UI)
  const longTailTranslations = {
    ja: { navTools: "稼ぐツール", navMethods: "方法", navStories: "成功例", navStart: "始める", navCta: "無料で始める →", heroCta1: "🔥 無料で試す", heroCta2: "方法を見る →", heroCta3: "成功例" },
    pt: { navTools: "Ferramentas", navMethods: "Métodos", navStories: "Casos", navStart: "Começar", navCta: "Comece Grátis →", heroCta1: "🔥 Teste Grátis", heroCta2: "Ver Métodos →", heroCta3: "Casos de Sucesso" },
    vi: { navTools: "Công Cụ", navMethods: "Phương Pháp", navStories: "Thành Công", navStart: "Bắt Đầu", navCta: "Bắt Đầu Miễn Phí →", heroCta1: "🔥 Dùng Thử Miễn Phí", heroCta2: "Xem Phương Pháp →", heroCta3: "Câu Chuyện Thành Công" },
    th: { navTools: "เครื่องมือ", navMethods: "วิธีการ", navStories: "เรื่องราวความสำเร็จ", navStart: "เริ่มต้น", navCta: "เริ่มฟรี →", heroCta1: "🔥 ทดลองฟรี", heroCta2: "ดูวิธีการ →", heroCta3: "เรื่องราวความสำเร็จ" },
    id: { navTools: "Alat", navMethods: "Metode", navStories: "Kisah Sukses", navStart: "Mulai", navCta: "Mulai Gratis →", heroCta1: "🔥 Coba Gratis", heroCta2: "Lihat Metode →", heroCta3: "Kisah Sukses" },
    hi: { navTools: "टूल्स", navMethods: 