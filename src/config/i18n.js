// i18n configuration for Astro SSG multi-language architecture
// 16 languages with localized platforms and currencies

export const i18nConfig = {
  defaultLocale: 'en',
  locales: [
    { code: 'en', label: 'English', flag: '🇺🇸', rtl: false, tier: 'core' },
    { code: 'zh-cn', label: '简体中文', flag: '🇨🇳', rtl: false, tier: 'core' },
    { code: 'zh-tw', label: '繁體中文', flag: '🇹🇼', rtl: false, tier: 'core' },
    { code: 'es', label: 'Español', flag: '🇪🇸', rtl: false, tier: 'core' },
    { code: 'ja', label: '日本語', flag: '🇯🇵', rtl: false, tier: 'longtail' },
    { code: 'pt', label: 'Português', flag: '🇧🇷', rtl: false, tier: 'longtail' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', rtl: false, tier: 'longtail' },
    { code: 'th', label: 'ภาษาไทย', flag: '🇹🇭', rtl: false, tier: 'longtail' },
    { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false, tier: 'longtail' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳', rtl: false, tier: 'longtail' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', rtl: false, tier: 'longtail' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', rtl: false, tier: 'longtail' },
    { code: 'ko', label: '한국어', flag: '🇰🇷', rtl: false, tier: 'longtail' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦', rtl: true, tier: 'longtail' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺', rtl: false, tier: 'longtail' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷', rtl: false, tier: 'longtail' },
  ]
};

// Currency configuration by locale
export const currencyConfig = {
  'en': { symbol: '$', rate: 0.14, suffix: '/month', platforms: ['Upwork', 'Fiverr', 'Freelancer'] },
  'zh-cn': { symbol: '￥', rate: 1, suffix: '/月', platforms: ['闲鱼', '小红书', '淘宝'] },
  'zh-tw': { symbol: 'NT$', rate: 4.5, suffix: '/月', platforms: ['Upwork', 'Fiverr', 'Facebook Marketplace'] },
  'es': { symbol: '€', rate: 0.13, suffix: '/mes', platforms: ['Upwork', 'Fiverr', 'Workana'] },
  'ja': { symbol: '¥', rate: 21, suffix: '/月', platforms: ['Upwork', 'Fiverr', 'CrowdWorks'] },
  'pt': { symbol: 'R$', rate: 0.72, suffix: '/mês', platforms: ['Upwork', 'Fiverr', 'Workana'] },
  'vi': { symbol: '₫', rate: 3500, suffix: '/tháng', platforms: ['Upwork', 'Fiverr', 'VietnamWorks'] },
  'th': { symbol: '฿', rate: 5, suffix: '/เดือน', platforms: ['Upwork', 'Fiverr', 'Thaijob'] },
  'id': { symbol: 'Rp', rate: 2200, suffix: '/bulan', platforms: ['Upwork', 'Fiverr', 'Sribu'] },
  'hi': { symbol: '₹', rate: 12, suffix: '/महीना', platforms: ['Upwork', 'Fiverr', 'Internshala'] },
  'de': { symbol: '€', rate: 0.13, suffix: '/Monat', platforms: ['Upwork', 'Fiverr', 'Freelancer.de'] },
  'fr': { symbol: '€', rate: 0.13, suffix: '/mois', platforms: ['Upwork', 'Fiverr', 'Malt'] },
  'ko': { symbol: '₩', rate: 190, suffix: '/월', platforms: ['Upwork', 'Fiverr', 'Wishket'] },
  'ar': { symbol: 'د.إ', rate: 0.52, suffix: '/شهر', platforms: ['Upwork', 'Fiverr', 'Nabbesh'] },
  'ru': { symbol: '₽', rate: 13, suffix: '/мес', platforms: ['Upwork', 'Fiverr', 'FL.ru'] },
  'tr': { symbol: '₺', rate: 4.8, suffix: '/ay', platforms: ['Upwork', 'Fiverr', 'Bionluk'] },
};

// Format income based on locale
export function formatIncome(min, max, locale = 'en') {
  const config = currencyConfig[locale] || currencyConfig['en'];
  const minLocal = Math.round(min * config.rate);
  const maxLocal = Math.round(max * config.rate);
  return `${config.symbol}${minLocal.toLocaleString()}-${maxLocal.toLocaleString()}${config.suffix}`;
}

// Get platforms for locale
export function getPlatforms(locale = 'en') {
  return currencyConfig[locale]?.platforms || currencyConfig['en'].platforms;
}
