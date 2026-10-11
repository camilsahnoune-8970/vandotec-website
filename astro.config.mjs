import { defineConfig } from 'astro/config';
import imgDimensions from './integrations/img-dimensions.mjs';

// Static sitemap.xml lives in public/ — no plugin dependency needed.
export default defineConfig({
  output: 'static',
  outDir: 'dist',
  trailingSlash: 'never',
  site: 'https://www.vandotec.be',
  integrations: [imgDimensions()],
});
