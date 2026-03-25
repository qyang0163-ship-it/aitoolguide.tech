import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.aitoolguide.tech',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          'en': 'en',
          'zh-cn': 'zh-CN',
          'zh-tw': 'zh-TW',
          'es': 'es',
          'ja': 'ja',
          'pt': 'pt',
          'vi': 'vi',
          'th': 'th',
          'id': 'id',
          'hi': 'hi',
          'de': 'de',
          'fr': 'fr',
          'ko': 'ko',
          'ar': 'ar',
          'ru': 'ru',
          'tr': 'tr'
        }
      }
    })
  ]
});
