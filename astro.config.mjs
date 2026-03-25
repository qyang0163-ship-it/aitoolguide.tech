import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.aitoolguide.tech',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
