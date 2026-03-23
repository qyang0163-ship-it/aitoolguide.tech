import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://aitoolguide-tech.vercel.app',
  build: {
    format: 'directory'
  }
});
