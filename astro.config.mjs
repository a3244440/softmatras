import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://softmatras.kz',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const u = item.url;
        if (u === 'https://softmatras.kz/') item.priority = 1.0;
        else if (/\/(almaty|astana)\/$/.test(u)) item.priority = 0.9;
        else if (/matras-\d+x200/.test(u) || /katalog\//.test(u)) item.priority = 0.8;
        else item.priority = 0.6;
        return item;
      },
    }),
  ],
});
