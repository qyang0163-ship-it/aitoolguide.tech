import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.aitoolguide.tech',
  build: {
    format: 'directory'
  }
});
