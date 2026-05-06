import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.ai2424.com',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    locales: ['zh-CN', 'en'],
    defaultLocale: 'zh-CN',
    routing: {
      prefixDefaultLocale: false,
      strategy: 'pathname'
    }
  }
});
