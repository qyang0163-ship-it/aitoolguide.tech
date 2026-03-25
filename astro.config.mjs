import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.aitoolguide.tech',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    locales: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar', 'hi', 'th', 'tr', 'vi', 'id'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      strategy: 'pathname'
    }
  }
});
