// i18n configuration for chip platform - zh-CN (default) and en only
export const i18nConfig = {
  defaultLocale: 'zh-CN',
  locales: [
    { code: 'zh-CN', label: '简体中文', flag: '🇨🇳', rtl: false, tier: 'core' },
    { code: 'en',    label: 'English',    flag: '🇺🇸', rtl: false, tier: 'core' }
  ]
};

export const currencyConfig = {
  'zh-CN': { symbol: '￥', rate: 1, suffix: '/月',   platforms: ['华为昇腾', '寒武纪', '海光'] },
  'en':    { symbol: '$',  rate: 0.14, suffix: '/month', platforms: ['NVIDIA', 'AMD', 'Intel'] }
};

export function formatIncome(min, max, locale = 'zh-CN') {
  const config = currencyConfig[locale] || currencyConfig['zh-CN'];
  const minLocal = Math.round(min * config.rate);
  const maxLocal = Math.round(max * config.rate);
  return `${config.symbol}${minLocal.toLocaleString()}-${maxLocal.toLocaleString()}${config.suffix}`;
}

export function getPlatforms(locale = 'zh-CN') {
  return currencyConfig[locale]?.platforms || currencyConfig['zh-CN'].platforms;
}
