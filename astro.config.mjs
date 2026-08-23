import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foysalabdullah.com', // Add your actual website URL here
  integrations: [sitemap()],
});